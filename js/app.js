var board = [['', '', ''], ['', '', ''], ['', '', '']];

var gameStarted = false;

var player1Emblem = "";
var player2Emblem = "";

var turnCounter = 0;

var name1;
var name2;

var player1Score = 0;
var player2Score = 0;


function emblemGiver() {
    var randomNumber = Math.floor(Math.random() * 2) + 1;
    if (randomNumber == 1) {
        player1Emblem = 'X';
        player2Emblem = 'O';
    }
    else {
        player1Emblem = 'O';
        player2Emblem = 'X';
    }
}

function indexTaken(index) {
    if (gameStarted == true) {
        var clickIndex = document.getElementsByTagName("td")[index].getAttribute("index");
        boardInserter(clickIndex);
        boardUpdate();
        winChecker();
        restartButtonNonVisible();
        scoreNullNonVisible();
    }
}

function boardUpdate() {

    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board.length; j++) {
            document.getElementsByTagName("td")[i * board.length + j].innerHTML = board[i][j];
            if (board[i][j] == 'O') {
                document.getElementsByTagName("td")[i * board.length + j].style.color = "#6A748B";
            }
            if (board[i][j] == 'X') {
                document.getElementsByTagName("td")[i * board.length + j].style.color = "#545454";
            }
        }
    }

}

function scoreBoardUpdate() {
    $('#player1Emblem').html(player1Emblem);
    $('#player2Emblem').html(player2Emblem);
    $('#player1Score').html(player1Score);
    $('#player2Score').html(player2Score);
    $('#player1Name').html(name1);
    $('#player2Name').html(name2);
}

function whoWon() {
    for (var i = 0; i < board.length; i++) {
        var flag = true;
        for (var j = 1; j < board[i].length; j++) {
            if (board[i][0] != board[i][j] || board[i][0] == "") {
                flag = false;
                break;
            }
        }
        if (flag) {
            return board[i][0];
        }

        flag = true;
        for (j = 1; j < board[i].length; j++) {
            if (board[0][i] != board[j][i] || board[0][i] == "") {
                flag = false;
                break;
            }
        }
        if (flag) {
            return board[0][i];
        }

    }
    flag = true;
    for (i = 0; i < board.length; i++) {
        if (board[0][0] != board[i][i] || board[i][i] == "") {
            flag = false;
            break;
        }
    }
    if (flag) {
        return board[0][0];
    }

    flag = true;
    for (i = board.length - 1; i >= 0; i--) {
        if (board[i][(board.length - 1) - i] != board[0][board.length - 1] || board[i][(board.length - 1) - i] == "") {
            flag = false;
            break;
        }
    }

    if (flag) {
        return board[0][board.length - 1];
    }

    return null;
}

function winChecker() {
    if (whoWon() == null) {
        if (turnCounter == 9) {
            setTimeout(alertTie, 10);
            gameStarted = false;
        }

    }
    else {
        setTimeout(alertWinner, 10);
        gameStarted = false;
    }
}

function alertWinner() {
    if (whoWon() != null) {
        var message = "";
        switch (player1Emblem) {
            case 'X':
                winAlertColorChangeGreen();
                message = "<strong style='color: #353333'>" + "Player_1: " + "</strong>" + name1 + " is Won!";
                document.getElementById("winMessage").innerHTML = message;
                alertWinnerMessage();
                gameStarted = false;
                player1Score++;
                scoreBoardUpdate();
                break;

            case 'O':
                winAlertColorChangeGreen();
                message = "<strong style='color: #353333'>" + "Player_2: " + "</strong>" + name2 + " is Won!";
                document.getElementById("winMessage").innerHTML = message;
                alertWinnerMessage();
                gameStarted = false;
                player2Score++;
                scoreBoardUpdate();
                break;

        }
    }
}

function alertTie() {
    winAlertColorChangeYellow();
    document.getElementById("winMessage").innerHTML = "<strong style='color: #353333; text-align: center;'>" + "Tie!" + "</strong>";
    alertWinnerMessage();
    gameStarted = false;
}

function boardInserter(clickIndex) {
    var row = parseInt(clickIndex / 3);
    var column = clickIndex - (row * 3);
    if (board[row][column] == '') {
        if (turnCounter % 2 == 0) {
            board[row][column] = 'X';
        }
        else {
            board[row][column] = 'O';
        }
        turnCounter++;
    }
}

function restartGame() {
    board = [['', '', ''], ['', '', ''], ['', '', '']];
    turnCounter = 0;
    emblemGiver();
    scoreBoardUpdate();
    restartButtonHidden();
    scoreNullButtonHidden();
    boardUpdate();
    closeWinAlert();
    gameStarted = true;

}

function NullScore() {
    player1Score = 0;
    player2Score = 0;
    scoreBoardUpdate();
    restartGame();
}

function insertChecker() {
    if (gameStarted == false) {
        name1 = document.getElementById("insertPlayer1").value;
        name2 = document.getElementById("insertPlayer2").value;
        var name1Length = name1.length;
        var name2Length = name2.length;
        var errorMsg = "";
        if (name1Length != 0 || name2Length != 0) {
            if (name1 == name2) {
                errorMsg = "Same names. ";
            }
        }
        if (name1Length == 0) {
            errorMsg += "First player name is empty. ";
        }
        if (name2Length == 0) {
            errorMsg += "Second player name is empty. ";
        }

        if (name1Length > 10) {
            errorMsg += "First player name too long. ";
        }
        if (name2Length > 10) {
            errorMsg += "Second player name too long. ";
        }

        if (errorMsg != "") {
            document.getElementById("errorMessage").innerHTML = "<strong style='color: #353333'>Errors: </strong>" + errorMsg;
            document.getElementById("errorMsg").style.visibility = "visible";
        }
        else {
            errorMessageHidding();
            setTimeout(registerNonVisible, 10);
            setTimeout(borderNon, 500);
            setTimeout(scoreBoardNonInvisible, 500);
            gameStarted = true;
            emblemGiver();
            scoreBoardUpdate();

        }
    }
}

function borderNon() {
    $("#gameTable").animate({
        height: 'toggle'
    });

}

function scoreBoardNonInvisible() {
    $("#scoreTable").animate({
        height: 'toggle'
    });

}

function scoreNullNonVisible() {
    if (gameStarted == false) {
        document.getElementById("Null Score").style.visibility = "visible";
    }
}

function restartButtonNonVisible() {
    if (gameStarted == false) {
        document.getElementById('restartButton').style.visibility = 'visible';
    }
}

function restartButtonHidden() {
    document.getElementById("restartButton").style.visibility = "hidden";
}

function scoreNullButtonHidden() {
    document.getElementById("Null Score").style.visibility = "hidden";
}

function errorMessageHidding() {
    document.getElementById("errorMsg").style.display = "none";
}

function registerNonVisible() {
    $("#register").animate({
        height: 'toggle'
    });
}

function alertWinnerMessage() {
    document.getElementById("winMsg").style.visibility = "visible";
}

function closeWinAlert() {
    document.getElementById("winMsg").style.visibility = "hidden";
}

function winAlertColorChangeYellow() {
    document.getElementById("winMsg").style.backgroundColor = "#FADD24";
    document.getElementById("winMsg").style.textAlign = "center";
}

function winAlertColorChangeGreen() {
    document.getElementById("winMsg").style.backgroundColor = "#0EEA2F";
    document.getElementById("winMsg").style.textAlign = "center";
}
