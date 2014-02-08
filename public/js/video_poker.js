var CARD_SIZE = 'sizeXL';
var HAND = new Array();
var HOLDS = [false, false, false, false, false];
var NEW_GAME = false;

$(document).ready(function() {
	// var myID = ($(location).attr('pathname')).replace(/\//, '');
	var myID = 1;

	// need to get url for socket.io
	var url = $(location).attr('origin');
	var socket = io.connect(url);

	socket.emit('createNewDeck', { numberDecks : 1, id : myID });
	startGame(socket, myID);
	setTimeout(turnOverCards, 500);

	socket.on('dealtNewCard', function(card, id, cardID) {
		if(myID === id) {
			HAND[cardID] = card;
			createCard(cardID, card);
		}
	});

	// Hold a card
	$('.hold').click(function() {
		var cardNum = $(this).attr('cardNum');
		HOLDS[cardNum] = !HOLDS[cardNum];

		if(HOLDS[cardNum])
			$('#hold-' + cardNum).show();
		else
			$('#hold-' + cardNum).hide();
	});

	// Deal card
	$('#deal').click(function() {
		// change cards
		if(NEW_GAME) {
			NEW_GAME = false;
			changeCards(socket, myID);
			$(this).html('New Game');
		} else {
			// check hand
			$(this).html('Draw');
			startGame(socket, myID)
		}

		setTimeout(turnOverCards, 500);
	});
});

function startGame(socket, myID) {
	$('.lbl-holding').hide();
	socket.emit('shuffleDeck', { id : myID });

	for(var i = 0; i < 5; i++) {
		HOLDS[i] = false;
		socket.emit('dealCard', { id : myID, cardID : i });
	}

	NEW_GAME = true;
}

function createCard(cardID, card) {
	var html = '<div class="flip-container ' + CARD_SIZE + ' flipped">';
	html += '<div class="flipper">';
	html += '<div id="#card-' + cardID + '-front" class="front">';
	html += card.frontHtml;			
	html += '</div>';
	html += '<div class="back">';
	html += card.backHtml;
	html += '</div>';
	html += '</div>';
	html += '</div>';

	$('#card-' + cardID).html('');
	$('#card-' + cardID).html(html);
	$('.card').addClass(CARD_SIZE);
}

function turnOverCards() {
	var card;

	for(var i = 0; i < 5; i++) {
		card = $('#card-' + i).children('.flip-container');

		if(card.hasClass('flipped'))
			card.removeClass('flipped');
	}
}

function changeCards(socket, myID) {
	for(var i = 0; i < 5; i++) {
		// if not holding card i, change for a new card
		if(!HOLDS[i]) {
			socket.emit('dealCard', { id : myID, cardID : i });
		}
	}
}