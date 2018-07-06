    
const gameBoard = [[], [], [], [], [], [], [], [], [], [], [], []];  
let matchList = [];
let canList = []; 
let score = 21;
let playing = true;

$(document).ready(function() {   

   class cell {
        constructor(x, y, id) {
           this.x = x;
           this.y = y;
           this.id = id;
           this.color = '';
           
           this.generateColor();            
        };

        generateColor () {
            let colorOptions = ['#537938', '#F9D42C', '#F17105', '#D11149', '#6610F2', '#1A8FE3'];
            let color = Math.floor(Math.random() * colorOptions.length);
            this.color = colorOptions[color];
        }

        setCssColor() {
            $('#' + this.id).css('background-color', this.color);
        }
    };
 

    for(y = 0; y < 12; y++) {
        for(x = 0; x < 12; x++) {
            let name = "cell-" + x + "-" + y;
            $(".grid-container").append('<div class="grid-item" id="' + name +'"></div>');
            gameBoard[x][y] = new cell(x, y, name);
            $("#" + name).css('background-color', gameBoard[x][y].color);
            $('#' + name).on('click', function(){
                let selectedCell = findCellById(name);
                if(gameBoard[0][0].color == selectedCell.color) {

                } else {                
                    if(playing == false) {
                        return;
                    }

                    play(selectedCell.color);
                    if(canList.includes(selectedCell.color)) {
                        for(let i in matchList) {
                            matchList[i].color = selectedCell.color;
                            matchList[i].setCssColor();
                        }
  
                        matchList = [];
                        canList = [];
                        score = score - 1;
                        $('#moves').text('Moves: ' + score);
                        //$(this).animate(1000).setCssColor();


                        if(score >= 0 && gameOver() == true ) {
                            $('#winLoss').text('You Win!');
                            playing = false;
                            return;
                        }

                        if(score === 0) {
                            $('#winLoss').text('Game Over');
                            playing = false;
                            return;
                        }

                    }
                }
            });
        }
    };
 
    const gameOver = () => {
        for(let y = 0; y < 12; y++) {
            for(x =0; x < 12; x++) {
                if(gameBoard[x][y].color != gameBoard[0][0].color) {
                    return false;
                } 
            }
        }
        return true;
    }


    const findCellById = (id) => {
        for(y = 0; y < 12; y++) {
            for(x = 0; x < 12; x++) {
                if(gameBoard[x][y].id == id) {
                    return gameBoard[x][y];
                    
                }
            }
        }
    };

    const play = (color, id = "cell-0-0") => {
        let cell = findCellById(id);
        matchList.push(gameBoard[0][0]);
        
        
        //RIGHT
        if(cell.x < 11) {
            if(!matchList.includes(gameBoard[cell.x + 1][cell.y])) { 
                if(gameBoard[cell.x + 1][cell.y].color == cell.color) {
                    matchList.push(gameBoard[cell.x + 1][cell.y]);
                    play(color, gameBoard[cell.x + 1][cell.y].id);
                } else {
                    if(!canList.includes(gameBoard[cell.x + 1][cell.y].color)) {
                        canList.push(gameBoard[cell.x + 1][cell.y].color);
                    } 
                }
            }
        }   
        //DOWN
        if(cell.y < 11) {
            if(!matchList.includes(gameBoard[cell.x][cell.y + 1])) { 
                if(gameBoard[cell.x][cell.y + 1].color == cell.color) {
                    matchList.push(gameBoard[cell.x][cell.y + 1]);
                    play(color, gameBoard[cell.x][cell.y + 1].id);
                } else {
                    if(!canList.includes(gameBoard[cell.x][cell.y + 1].color)) {
                        canList.push(gameBoard[cell.x][cell.y + 1].color);
                    } 
                }
        }
            }
        //LEFT
        if(cell.x > 0){
            if(!matchList.includes(gameBoard[cell.x - 1][cell.y])) { 
                if(gameBoard[cell.x - 1][cell.y].color == cell.color) {
                    matchList.push(gameBoard[cell.x - 1][cell.y]);
                    play(color, gameBoard[cell.x - 1][cell.y].id);
                } else {
                    if(!canList.includes(gameBoard[cell.x - 1][cell.y].color)) {
                        canList.push(gameBoard[cell.x - 1][cell.y].color);
                    } 
                }
            }
        }   
        //UP
        if(cell.y > 0){
           if(!matchList.includes(gameBoard[cell.x][cell.y - 1])) { 
                if(gameBoard[cell.x][cell.y - 1].color == cell.color) {
                    matchList.push(gameBoard[cell.x][cell.y - 1]);
                    play(color, gameBoard[cell.x][cell.y - 1].id);
                } else {
                    if(!canList.includes(gameBoard[cell.x][cell.y - 1].color)) {
                        canList.push(gameBoard[cell.x][cell.y - 1].color);
                    }
                }
            } 
        }

    }

    $('.btn').on('click', () => {
        location.reload();
    });

    $('.instructHover').mouseenter('.instruct').mouseleave('.instruct');

    

});




        