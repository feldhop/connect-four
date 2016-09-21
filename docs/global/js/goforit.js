$(document).ready(function () {

    // global variables
    var connectFour = [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0]
    ];
    var count = 0;

    //winning scenarios
    const wins = {
        checkWin: {
            horz: function(r, c){
                return connectFour[r][c] + connectFour[r][c+1] + connectFour[r][c+2] + connectFour[r][c+3];
            },
            vert: function(r, c){
                return connectFour[r][c] + connectFour[r+1][c] + connectFour[r+2][c] + connectFour[r+3][c];
            },
            diagForw: function(r, c){
                return connectFour[r][c] + connectFour[r+1][c+1] + connectFour[r+2][c+2] + connectFour[r+3][c+3];
            },
            diagBack: function(r, c){
                return connectFour[r][c] + connectFour[r+1][c-1] + connectFour[r+2][c-2] + connectFour[r+3][c-3];
            }
        },
        markWin: {
            horz: function(r, c){
                return [[r, c],[r, c+1],[r, c+2],[r, c+3]];
            },
            vert: function(r, c){
                return [[r, c],[r+1, c],[r+2, c],[r+3, c]];
            },
            diagForw: function(r, c){
                return [[r, c],[r+1, c+1],[r+2, c+2],[r+3, c+3]];
            },
            diagBack: function(r, c){
                return [[r, c],[r+1, c-1],[r+2, c-2],[r+3, c-3]];
            }
        }
    };

    // on click events
    $(".slot").click(function () {
        var column = ($(this).attr('data-column') - 1);
        dropChip(column);
        if (count !== false){
            computerPlayer(column);
        }
    });

    $("button").click(function() {
        reset();
    });

    //drop chip
    function dropChip(column){
        var row = checkRow(column);
        if (count % 2 == 0 && count !== false && row < 7) {
            animateDrop(row, column, 'red');
            connectFour[row][column] = 1;
            count += 1;
            check();
        } else if (count % 2 !== 0 && count !== false && row < 7){
            animateDrop(row, column, 'black');
            connectFour[row][column] = 7;
            count += 1;
            check();
        }
    };

     //checks to find empty row
    function checkRow(column){
        for (var i = 6; i  >= 0; i--){
            if (connectFour[i][column] === 0){
                return i;
            }
        }
    };

    //animate chip drop
    function animateDrop(row, column, color){
        color === 'red' ? $('#chip-color').css('background-color', 'black') : $('#chip-color').css('background-color', 'red');
        var k = 0;
        var int = setInterval(function(){
            $('.slot[data-column="' + (column + 1) + '"][data-row="' + (k) + '"]').css('background-color', 'white');
            $('.slot[data-column="' + (column + 1) + '"][data-row="' + (k + 1) + '"]').css('background-color', color);
            k++;
            if(k > row) clearInterval(int);
        }, 100);
    };

    //checks to see if there is a winner or to check computer move for block/attack
    function check() {
    
        //checks horizontally
        for (var c=0; c<4; c++) {
            for (var r=0; r<7; r++) {
                if (wins.checkWin.horz(r, c) === 4) {
                    winner('red', wins.markWin.horz(r, c));
                } else if (wins.checkWin.horz(r, c) === 28) {
                    winner('black', wins.markWin.horz(r, c));
                } else if (count % 2 !== 0 && wins.checkWin.horz(r, c) === 21){
                    for (i = 0; i < 4; i++){
                        if (connectFour[r][c + i] === 0){
                            return (c + i);
                        }                 
                    }
                } else if (count % 2 !== 0 && wins.checkWin.horz(r, c) === 3){
                    for (i = 0; i < 4; i++){
                        if (connectFour[r][c + i] === 0){
                            return (c + i);
                        }                 
                    }
                }
            }
        }

        //checks vertically
        for (var r=0; r<4; r++) {
            for (var c=0; c<7; c++) {
                if (wins.checkWin.vert(r, c) === 4) {
                    winner('red', wins.markWin.vert(r, c));
                } else if (wins.checkWin.vert(r, c) === 28) {
                    winner('black', wins.markWin.vert(r, c));
                } else if (count % 2 !== 0 && wins.checkWin.vert(r, c) === 21){
                    for (i = 0; i < 4; i++){
                        if (connectFour[r + i][c] === 0){
                            return c;
                        }                 
                    }
                } else if (count % 2 !== 0 && wins.checkWin.vert(r, c) === 3){
                    for (i = 0; i < 4; i++){
                        if (connectFour[r + i][c] === 0){
                            return c;
                        }                 
                    }
                }
            }
        }

        //checks diagonally
        for (var r=0; r<4; r++) {
            for (var c=0; c<4; c++) {
                if (wins.checkWin.diagForw(r, c) === 4) {
                    winner('red', wins.markWin.diagForw(r, c));
                } else if (wins.checkWin.diagForw(r, c) === 28) {
                    winner('black', wins.markWin.diagForw(r, c));
                }
            }
            for (var c=6; c>2; c--) {
                if (wins.checkWin.diagBack(r, c) === 4) {
                    winner('red', wins.markWin.diagBack(r, c));
                } else if (wins.checkWin.diagBack(r, c) === 28) {
                    winner('black', wins.markWin.diagBack(r, c));
                }
            }
        }

        //checks for a draw
        if (connectFour[0][0] && connectFour[0][1] && connectFour[0][2] && connectFour[0][3] && connectFour[0][4] && connectFour[0][5] && connectFour[0][6] > 0) {
            alert('DRAW!');
            if (confirm("Would you like to play again?")) {
                reset();
            }
        }

    };

    //notifies winner and shows location of win
    function winner(color, winLocation){
        count = false;
        $('#winner>h2[data-winner="' + color + '"]').show();
        $('#winner').show();
        for (i = 0; i < 4; i++){
            $('.slot[data-row="' + ((winLocation[i][0]) + 1) + '"][data-column="' + ((winLocation[i][1]) + 1) + '"]').addClass('win-location');
        }
    };
    
    //computer drop
    function computerPlayer(column){
        var move = check();
        if (count % 2 !== 0 && move === undefined){
            if (column === 0){
                var max = column + 1;
                var min = column;
            } else if (column === 6){
                var max = column;
                var min = column - 1;
            } else {
                var max = column + 1;
                var min = column - 1; 
            }
            var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
            setTimeout(function() { 
                dropChip(randomNumber); 
            }, 1000);   
        } else {
            setTimeout(function() {
                console.log('I meant to do that', move)
                dropChip(move);
            }, 1000); 
        }
    };

    //resets game to beginning
    function reset(color) {
        connectFour = [
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0]
        ];
        count = 0;
        for (var i = 0; i <= 6; i++) {
            for (var k = 0; k <= 6; k++){
                $('.slot[data-column="' + (i + 1) + '"]' + '[data-row="' + (k + 1) + '"]').css('background-color', 'white');
            }
        }
        $('#chip-color').css('background-color', 'red');
        $('#winner>h2').hide();
        $('#winner').hide();
        $('.win-location').removeClass('win-location');
    };

});

