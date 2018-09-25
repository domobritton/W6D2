class View {
  constructor(game, $el) {
    this.game = game;
    this.$el = $el;
  }

  bindEvents() {
    const $squares = $('.square');
    
    $squares.on('click', e => {
      let pos = $(e.currentTarget).data('numSquare').split(' ');

      try {
        this.game.playMove(pos);
      } catch (error) {
      alert('Invalid Move!');
      }
    
      $(e.currentTarget).addClass("selected");
      const $mark = $(`<p>${this.game.currentPlayer}</p>`);
      $mark.css({
        'font-size': '65px',
        'margin-top': '4px',
        'font-weight': '700'
      });
      if (this.game.currentPlayer === 'x') {
        $mark.css("color","red");
      } else {
        $mark.css("color","blue");
      }
      $(e.currentTarget).append($mark);
      $(e.currentTarget).css("background-color","white");
      if (this.game.isOver()) {
        console.log(this.game.winner());
        console.log(this.game.currentPlayer);
        if (this.game.winner() === null) {
          let winMessage = $('<h2>Its a tie!!</h2>');
            $('body').append(winMessage);
        } else {
          let winMessage = $(`<h2>${this.game.currentPlayer} wins!!</h2>`);
            $('body').append(winMessage);
        }
      } 
    });
  }

  makeMove($square) {}

  setupBoard() {
    const $group = $('<div class="group"></div>'); 
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        let $square = $('<div></div>');
        $square.css({
          'width': '100px', 
          'height': '100px', 
          'margin-top':'-8px', 
          'background-color': 'gray', 
          'border': '6px solid black', 
          'display': 'inline-block',
          'overflow': 'hidden'
        });
        $square.data('numSquare', `${i} ${j}`);
        $square.addClass('square');
        $group.append($square);
      }
      const $newLine = $('<br />');
      $newLine.css({
        "display" : "block",
        "margin" : "0 0"
      });
      $group.append($newLine);
    }
    $group.css({'width': '336px', 'margin': '0 auto', 'height': '336'});
    this.$el.append($group);
    
    $('.square').on('mouseenter', e => {
      if(!$(e.currentTarget).hasClass("selected")) {
        $(e.currentTarget).css('background-color', 'yellow');

      }
    });
    $('.square').on('mouseleave', e => {
      if(!$(e.currentTarget).hasClass("selected")) {
        $(e.currentTarget).css('background-color', 'gray');

      }
    });
    this.bindEvents();
  }
}

module.exports = View;
