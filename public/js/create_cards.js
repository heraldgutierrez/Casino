$(document).ready(function() {
	// drawCard($('#cardA'), 'ace', 'diamond', 100);
	// drawCard($('#card2'), 'two', 'spade', 100);
	// drawCard($('#card3'), 'three', 'spade', 100);
	// drawCard($('#card4'), 'four', 'spade', 100);
	// drawCard($('#card5'), 'five', 'spade', 100);
	// drawCard($('#card6'), 'six', 'spade', 100);
	// drawCard($('#card7'), 'seven', 'spade', 100);
	// drawCard($('#card8'), 'eight', 'spade', 100);
	// drawCard($('#card9'), 'nine', 'spade', 100);
	// drawCard($('#card10'), 'ten', 'spade', 100);
	// drawCard($('#cardJ'), 'jack', 'club', 100);
	// drawCard($('#cardQ'), 'queen', 'spade', 100);
	// drawCard($('#cardK'), 'king', 'spade', 100);
});

function drawCard(target, rank, suit, width) {
	var RANKS = {
		ace: 'A',
		two: '2',
		three: '3',
		four: '4',
		five: '5',
		six: '6',
		seven: '7',
		eight: '8',
		nine: '9',
		ten: '10',
		jack: 'J',
		queen: 'Q',
		king: 'K'
	};

	var SUITS = {
		club: '&clubs;',
		diamond: '&diams;',
		spade: '&spades;',
		heart: '&hearts;'
	};

	var spans = new Array();
    
	spans.push('<div class="corner top"><span class="number">' + RANKS[rank] + '</span><span>' + SUITS[suit] + '</span></div>');

	if (rank == 'ace') {
		spans.push('<span class="suit middle_center">' + SUITS[suit] + '</span>');
	}

	else if ((rank == 'two') || (rank == 'three')) {
		spans.push('<span class="suit top_center">' + SUITS[suit] + '</span>');

		if (rank == 'three') {
			spans.push('<span class="suit middle_center">' + SUITS[suit] + '</span>');
		}

		spans.push('<span class="suit bottom_center">' + SUITS[suit] + '</span>');
	}

	else if ((rank == 'four') || (rank == 'five') || (rank == 'six') || (rank == 'seven') || (rank == 'eight')  || (rank == 'nine') || (rank == 'ten')) {
		spans.push('<span class="suit top_left">' + SUITS[suit] + '</span>');
		spans.push('<span class="suit top_right">' + SUITS[suit] + '</span>');

		if (rank == 'five') {
			spans.push('<span class="suit middle_center">' + SUITS[suit] + '</span>');
		}

		else if ((rank == 'six') || (rank == 'seven') || (rank == 'eight')) {
			spans.push('<span class="suit middle_left">' + SUITS[suit] + '</span>');

			if ((rank == 'seven') || (rank == 'eight')) {
				spans.push('<span class="suit middle_top">' + SUITS[suit] + '</span>');

				if (rank == 'eight') {
					spans.push('<span class="suit middle_bottom">' + SUITS[suit] + '</span>');
				}
			}

			spans.push('<span class="suit middle_right">' + SUITS[suit] + '</span>');
		}

		else if ((rank == 'nine') || (rank == 'ten')) {
			spans.push('<span class="suit middle_top_left">' + SUITS[suit] + '</span>');
			spans.push('<span class="suit middle_top_right">' + SUITS[suit] + '</span>');

			if (rank == 'nine') {
				spans.push('<span class="suit middle_bottom">' + SUITS[suit] + '</span>');
			}

			else if (rank == 'ten') {
				spans.push('<span class="suit middle_top_center">' + SUITS[suit] + '</span>');
				spans.push('<span class="suit middle_bottom_center">' + SUITS[suit] + '</span>');
			}

			spans.push('<span class="suit middle_bottom_left">' + SUITS[suit] + '</span>');
			spans.push('<span class="suit middle_bottom_right">' + SUITS[suit] + '</span>');
		}

		spans.push('<span class="suit bottom_left">' + SUITS[suit] + '</span>');
		spans.push('<span class="suit bottom_right">' + SUITS[suit] + '</span>');
	}

	else if (rank == 'jack') {
		spans.push('<span class="face middle_center"><img src="img/face-jack-' + suit + '.png"></span>');
	}

	else if (rank == 'queen') {
		spans.push('<span class="face middle_center"><img src="img/face-queen-' + suit + '.png"></span>');
	}

	else if (rank == 'king') {
		spans.push('<span class="face middle_center"><img src="img/face-king-' + suit + '.png"></span>');
	}

	spans.push('<div class="corner bottom"><span class="number">' + RANKS[rank] + '</span><span>' + SUITS[suit] + '</span></div>');

	if (width != null) {
		target.css({
			'width': width,
			'font-size': width * 12.5 / 200
		});
	}

	target.addClass('card'); target.html('<div class="card-' + rank + ' ' + suit + '">' + spans.join("\n") + '</div>');
}