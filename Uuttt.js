var gameScreen;
var squares;
var turn;
var constraintA = "none";
var constraintB = "none";
var cursorX;
var cursorY;
document.onmousemove = function(e) {
    cursorX = e.pageX;
    cursorY = e.pageY;
}

function newGame() {
    //prep game screen
    gameScreen = document.createElement("CANVAS");
    gameScreen.id = "gameScreen";
    gameScreen.style.position = "absolute";
    gameScreen.style.left = "0px";
    gameScreen.style.top = "0px";
    gameScreen.width = window.innerWidth;
    gameScreen.height = window.innerHeight;
    gameScreen.style.backgroundColor = "black";
    gameScreen.onclick = function() {
        gameScreenClicked()
    };
    document.body.appendChild(gameScreen);
    //prep the array squares
    squares = [];
    for(i = 0; i < 9; i++) {
        squares.push([]);
        for(e = 0; e < 9; e++) {
            squares[i].push([]);
            for(o = 0; o < 9; o++) {
                squares[i][e].push([0]);
            }
        }
    }
    turn = -1;
}

function drawsquares() {
    var pos = [0, 0];
    var ctx = gameScreen.getContext("2d");
    if(squares == 1) {
        for(i = 0; i < 9; i++) {
            for(e = 0; e < 9; e++) {
                for(o = 0; o < 9; o++) {
                    pos[0] = Math.floor(i / 3) * 225;
                    pos[1] = i % 3 * 225;
                    pos[0] += Math.floor(e / 3) * 75;
                    pos[1] += e % 3 * 75;
                    pos[0] += Math.floor(o / 3) * 25;
                    pos[1] += o % 3 * 25;
                    ctx.fillStyle = "rgba(200,100,100,1)";
                    ctx.fillRect(pos[1], pos[0], 24, 24);
                    ctx.stroke();
                }
            }
        }
    } else if(squares == -1) {
        for(i = 0; i < 9; i++) {
            for(e = 0; e < 9; e++) {
                for(o = 0; o < 9; o++) {
                    pos[0] = Math.floor(i / 3) * 225;
                    pos[1] = i % 3 * 225;
                    pos[0] += Math.floor(e / 3) * 75;
                    pos[1] += e % 3 * 75;
                    pos[0] += Math.floor(o / 3) * 25;
                    pos[1] += o % 3 * 25;
                    ctx.fillStyle = "rgba(100,200,100,1)";
                    ctx.fillRect(pos[1], pos[0], 24, 24);
                    ctx.stroke();
                }
            }
        }
    } else
        for(i = 0; i < 9; i++) {
            if(squares[i] == 1) {
                for(e = 0; e < 9; e++) {
                    for(o = 0; o < 9; o++) {
                        pos[0] = Math.floor(i / 3) * 225;
                        pos[1] = i % 3 * 225;
                        pos[0] += Math.floor(e / 3) * 75;
                        pos[1] += e % 3 * 75;
                        pos[0] += Math.floor(o / 3) * 25;
                        pos[1] += o % 3 * 25;
                        ctx.fillStyle = "rgba(200,100,100,1)";
                        ctx.fillRect(pos[1], pos[0], 24, 24);
                        ctx.stroke();
                    }
                }
            } else if(squares[i] == -1) {
                for(e = 0; e < 9; e++) {
                    for(o = 0; o < 9; o++) {
                        pos[0] = Math.floor(i / 3) * 225;
                        pos[1] = i % 3 * 225;
                        pos[0] += Math.floor(e / 3) * 75;
                        pos[1] += e % 3 * 75;
                        pos[0] += Math.floor(o / 3) * 25;
                        pos[1] += o % 3 * 25;
                        ctx.fillStyle = "rgba(100,200,100,1)";
                        ctx.fillRect(pos[1], pos[0], 24, 24);
                        ctx.stroke();
                    }
                }
            } else
                for(e = 0; e < 9; e++) {
                    if(squares[i][e] == 1) {
                        for(o = 0; o < 9; o++) {
                            pos[0] = Math.floor(i / 3) * 225;
                            pos[1] = i % 3 * 225;
                            pos[0] += Math.floor(e / 3) * 75;
                            pos[1] += e % 3 * 75;
                            pos[0] += Math.floor(o / 3) * 25;
                            pos[1] += o % 3 * 25;
                            ctx.fillStyle = "rgba(200,100,100,1)";
                            ctx.fillRect(pos[1], pos[0], 24, 24);
                            ctx.stroke();
                        }
                    } else if(squares[i][e] == -1) {
                        for(o = 0; o < 9; o++) {
                            pos[0] = Math.floor(i / 3) * 225;
                            pos[1] = i % 3 * 225;
                            pos[0] += Math.floor(e / 3) * 75;
                            pos[1] += e % 3 * 75;
                            pos[0] += Math.floor(o / 3) * 25;
                            pos[1] += o % 3 * 25;
                            ctx.fillStyle = "rgba(100,200,100,1)";
                            ctx.fillRect(pos[1], pos[0], 24, 24);
                            ctx.stroke();
                        }
                    } else
                        for(o = 0; o < 9; o++) {
                            pos[0] = Math.floor(i / 3) * 225;
                            pos[1] = i % 3 * 225;
                            pos[0] += Math.floor(e / 3) * 75;
                            pos[1] += e % 3 * 75;
                            pos[0] += Math.floor(o / 3) * 25;
                            pos[1] += o % 3 * 25;
                            ctx.fillStyle = (squares[i][e][o] == 1) ? "rgba(200,100,100,1)" : (squares[i][e][o] == -1) ? "rgba(100,200,100,1)" : ((constraintA == i || constraintA == "none") && (constraintB == e || constraintB == "none")) ? "rgba(200,200,100,1)" : "rgba(100,100,100,1)";
                            ctx.fillRect(pos[1], pos[0], 24, 24);
                            ctx.stroke();
                        }
                }
        }
    ctx.beginPath();
    ctx.moveTo(0, 75);
    ctx.lineTo(675, 75);
    ctx.moveTo(0, 150);
    ctx.lineTo(675, 150);
    ctx.moveTo(0, 300);
    ctx.lineTo(675, 300);
    ctx.moveTo(0, 375);
    ctx.lineTo(675, 375);
    ctx.moveTo(0, 525);
    ctx.lineTo(675, 525);
    ctx.moveTo(0, 600);
    ctx.lineTo(675, 600);
    ctx.moveTo(75, 0);
    ctx.lineTo(75, 675);
    ctx.moveTo(150, 0);
    ctx.lineTo(150, 675);
    ctx.moveTo(300, 0);
    ctx.lineTo(300, 675);
    ctx.moveTo(375, 0);
    ctx.lineTo(375, 675);
    ctx.moveTo(525, 0);
    ctx.lineTo(525, 675);
    ctx.moveTo(600, 0);
    ctx.lineTo(600, 675);
    ctx.strokeStyle = "rgba(0,0,256,1)";
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, 225);
    ctx.lineTo(675, 225);
    ctx.moveTo(225, 0);
    ctx.lineTo(225, 675);
    ctx.moveTo(450, 0);
    ctx.lineTo(450, 675);
    ctx.moveTo(0, 450);
    ctx.lineTo(675, 450);
    ctx.strokeStyle = "rgba(0,256,0,1)";
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(675, 0);
    ctx.moveTo(0, 0);
    ctx.lineTo(0, 675);
    ctx.moveTo(675, 0);
    ctx.lineTo(675, 675);
    ctx.moveTo(0, 675);
    ctx.lineTo(675, 675);
    ctx.strokeStyle = "rgba(256,0,0,1)";
    ctx.lineWidth = 3;
    ctx.stroke();
}

function gameScreenClicked() {
    var closestSquare = [0, 0, 0]
    var closestSquareDist = 10000;
    var currentDist;
    var pos = [0, 0];
    for(i = 0; i < 9; i++) {
        for(e = 0; e < 9; e++) {
            for(o = 0; o < 9; o++) {
                pos[0] = Math.floor(i / 3) * 225;
                pos[1] = i % 3 * 225;
                pos[0] += Math.floor(e / 3) * 75;
                pos[1] += e % 3 * 75;
                pos[0] += Math.floor(o / 3) * 25;
                pos[1] += o % 3 * 25;
                pos[0] += 12;
                pos[1] += 12;
                var currentDist = Math.sqrt(Math.pow(pos[1] - cursorX, 2) + Math.pow(pos[0] - cursorY, 2));
                if(currentDist < closestSquareDist) {
                    closestSquare = [i, e, o];
                    closestSquareDist = currentDist;
                }
            }
        }
    }
    if( /*If there are no constraints*/ ((constraintA == "none" && constraintB == "none") || /*If there are 2 constraints*/ (constraintA == closestSquare[0] && constraintB == closestSquare[1]) || /*If there is one constraint*/ (constraintA == closestSquare[0] && constraintB == "none")) && squares[closestSquare[0]][closestSquare[1]][closestSquare[2]] == 0) {
        squares[closestSquare[0]][closestSquare[1]][closestSquare[2]] = turn;
        if(squares[closestSquare[1]] != -1 && squares[closestSquare[1]] != 1) {
            constraintA = closestSquare[1];
            if(squares[closestSquare[1]][closestSquare[2]] != 1 && squares[closestSquare[1]][closestSquare[2]] != -1) constraintB = closestSquare[2];
            else constraintB = "none";
        } else {
            constraintA = "none";
            constraintB = "none";
        }
        checkForWin();
        turn *= -1;
    }
}

function checkForWin() {
    var winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]
    //NOTE TO SELF: the error in this code comes from the for loop checking squares that have already been captured, and are thus not part of the array!
    //I need to ad code to make it not check in squares that have already been captured!
    for(i = 0; i < 9; i++) {
        for(e = 0; e < 9; e++) {
            //check all small squares for winners!
            if(squares[i][e] != -1 && squares[i][e] != 1) {
                for(o = winConditions.length - 1; o > -1; o--) {
                    if(squares[i][e][winConditions[o][0]] == -1 && squares[i][e][winConditions[o][1]] == -1 && squares[i][e][winConditions[o][2]] == -1) {
                        squares[i][e] = -1;
                        alert(squares[i][e]);
                    }
                }
                for(o = winConditions.length - 1; o > -1; o--) {
                    if(squares[i][e][winConditions[o][0]] == 1 && squares[i][e][winConditions[o][1]] == 1 && squares[i][e][winConditions[o][2]] == 1) {
                        squares[i][e] = 1;
                        alert(squares[i][e]);
                    }
                }
            }
        }
        //check all medium squares for winners
        if(squares[i] != -1 && squares[i] != 1) {
            for(o = winConditions.length - 1; o > -1; o--) {
                if(squares[i][winConditions[o][0]] == -1 && squares[i][winConditions[o][1]] == -1 && squares[i][winConditions[o][2]] == -1) {
                    squares[i] = -1;
                    alert(squares[i]);
                }
            }
            for(o = winConditions.length - 1; o > -1; o--) {
                if(squares[i][winConditions[o][0]] == 1 && squares[i][winConditions[o][1]] == 1 && squares[i][winConditions[o][2]] == 1) {
                    squares[i] = 1;
                    alert(squares[i]);
                }
            }
        }
    }
    //check if someone has won the game!
    for(o = winConditions.length - 1; o > -1; o--) {
        if(squares[winConditions[o][0]] == -1 && squares[winConditions[o][1]] == -1 && squares[winConditions[o][2]] == -1) {
            squares = -1;
            alert(squares);
            //Ad code to brag about the winner!
            var winBox = document.createElement("DIV");
            winBox.innerHTML = "P1 VICTORY!";
            winBox.style.width = "100px";
            winBox.style.height = "50px";
            winBox.style.left = "700px";
            winBox.style.top = "400px";
            document.body.appendChild(winBox);
        }
    }
    for(o = winConditions.length - 1; o > -1; o--) {
        if(squares[winConditions[0]] == 1 && squares[winConditions[o][1]] == 1 && squares[winConditions[o][2]] == 1) {
            squares = 1;
            alert(squares);
        }
    }
}

function update() {
    drawsquares();
    window.requestAnimationFrame(update);
}
newGame();
update();
