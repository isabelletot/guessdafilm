/**
 * Created by isabelle on 09/08/15.
 */

function updateScore() {

    var obj = localStorage.getItem('score');
    //alert("You're not wrong!");

    if (obj != null) {
        var objN = JSON.parse(localStorage.getItem('score'));
        var newScore = objN['score']+50;
        var obj = {
            score: newScore
        };

        localStorage.setItem('score', JSON.stringify(obj));
        $('#score span').text("Score: "+obj['score']);
    } else {
        var obj = {
            score: 50
        };
        //alert(obj);
        localStorage.setItem('score', JSON.stringify(obj));
        $('#score span').text("Score: "+obj['score']);

    }


}

function updateLives() {

    var obj = localStorage.getItem('lives');


    if (obj != null) {
        var objN = JSON.parse(localStorage.getItem('lives'));
        var newLives = objN['lives']-1;

        var obj = {
            lives: newLives
        };

        localStorage.setItem('lives', JSON.stringify(obj));
        $('#lives span').text("Lives: "+obj['lives']);

        if(newLives<1) {
            $('#lives span').text("Lives: 0");
        }

    } else {
        var obj = {
            lives: 2
        };
        //alert(obj);
        localStorage.setItem('lives', JSON.stringify(obj));
        $('#lives span').text("Lives: "+obj['lives']);

    }


}

function guessedRight(button){

    var gameIsOn = localStorage.getItem('gameOn');

    if (gameIsOn=="true") {
        localStorage.setItem("gameOn","false");
        document.getElementById(button).style.backgroundColor = "#00e025"; updateScore(); setTimeout(function(){ document.getElementById(button).style.backgroundColor = "#428bca";
            localStorage.setItem("gameOn","true");getFilms();}, 1800);
    }
}

function guessedWrong(button){

    var gameIsOn = localStorage.getItem('gameOn');
    if (gameIsOn=="true") {
        document.getElementById(button).style.backgroundColor = "#D80000 ";
        updateLives();
        var objN = JSON.parse(localStorage.getItem('lives'));
        var newLives = objN['lives'];

        if(newLives > 0){
            localStorage.setItem("gameOn","false");
            setTimeout(function(){ document.getElementById(button).style.backgroundColor = "#428bca"; localStorage.setItem("gameOn","true"); getFilms();}, 1800);
        }else{
            $('#end span').text("YOU KNOW NOTHING!");
            localStorage.setItem("gameOn","false");
            $('but1').addClass('btn-disabled');
            $('but1').prop('disabled', true);
            $('but2').prop('disabled', true);
            $('but2').addClass('btn-disabled');
            $('but3').prop('disabled', true);
            $('but3').addClass('btn-disabled');
            $('but4').prop('disabled', true);
            $('but4').addClass('btn-disabled');

            var objN = JSON.parse(localStorage.getItem('score'));
            var uScore = objN['score'];

            if(uScore > 0){
                var person = prompt("Enter your name to add the score", "Jon Snow");

                var GameScore = Parse.Object.extend("GameScore");
                var gameScore = new GameScore();

                gameScore.set("score", uScore);
                gameScore.set("playerName", person);

                gameScore.save(null, {
                    success: function(gameScore) {
                        // Execute any logic that should take place after the object is saved.
                        //alert('New object created with objectId: ' + gameScore.id);
                    },
                    error: function(gameScore, error) {
                        // Execute any logic that should take place if the save fails.
                        // error is a Parse.Error with an error code and message.
                        alert('Failed to add score!' + error.message);
                    }
                });
            }

        }
    }

}


function getFilms(){

    localStorage.setItem("gameOn","true");

    $('#end span').text("");
    var image;

    $.getJSON("./template_files/films.json", function(data) {
        image = data;

        // checar se imagem ja saiu TODO

        var arr = []
        var randomnumber=  Math.floor(Math.random() * (234 - 0 + 1)) + 0;
        arr[0] = randomnumber;
        var i = 1;

        while(i < 4){

            randomnumber =  Math.floor(Math.random() * (234 - 0 + 1)) + 0;
            if(randomnumber != arr[0]){
                arr[i] = randomnumber;
                i++;
            }
        }

        var nButton = Math.floor(Math.random() * (3 - 0 + 1)) + 0;
        var imgName = setName(arr[0],image[parseInt(arr[0])]['name']);
        var imgName2 = setName(arr[1],image[parseInt(arr[1])]['name'])
        var imgName3 = setName(arr[2],image[parseInt(arr[2])]['name'])
        var imgName4 = setName(arr[3],image[parseInt(arr[3])]['name'])

        $("#image").attr("src", "./filmes/"+image[parseInt(arr[0])]['filepath']);
        //updateScore();
        if(nButton == 0){
            $('#but1 span').text(imgName);
            document.getElementById("but1").onclick = function() { guessedRight("but1"); };

            $('#but2 span').text(imgName2);
            document.getElementById("but2").onclick = function() {  guessedWrong("but2"); };
            $('#but3 span').text(imgName3);
            document.getElementById("but3").onclick = function() {  guessedWrong("but3"); };
            $('#but4 span').text(imgName4);
            document.getElementById("but4").onclick = function() {  guessedWrong("but4"); };

        }else if(nButton == 1) {
            $('#but2 span').text(imgName);
            document.getElementById("but2").onclick = function() { guessedRight("but2"); };

            $('#but1 span').text(imgName2);
            document.getElementById("but1").onclick = function() { guessedWrong("but1"); };
            $('#but3 span').text(imgName3);
            document.getElementById("but3").onclick = function() { guessedWrong("but3"); };
            $('#but4 span').text(imgName4);
            document.getElementById("but4").onclick = function() { guessedWrong("but4"); };

        }else if(nButton == 2) {
            $('#but3 span').text(imgName);
            document.getElementById("but3").onclick = function() { guessedRight("but3"); };

            $('#but1 span').text(imgName2);
            document.getElementById("but1").onclick = function() {  guessedWrong("but1"); };
            $('#but2 span').text(imgName3);
            document.getElementById("but2").onclick = function() {  guessedWrong("but2"); };
            $('#but4 span').text(imgName4);
            document.getElementById("but4").onclick = function() {  guessedWrong("but4"); };

        }else if(nButton == 3) {
            $('#but4 span').text(imgName);
            document.getElementById("but4").onclick = function() { guessedRight("but4"); };

            $('#but1 span').text(imgName2);
            document.getElementById("but1").onclick = function() {  guessedWrong("but1"); };
            $('#but2 span').text(imgName3);
            document.getElementById("but2").onclick = function() {  guessedWrong("but2"); };
            $('#but3 span').text(imgName4);
            document.getElementById("but3").onclick = function() {  guessedWrong("but3"); };
        }

        //randomizar vetor de 0 a 234

        //
    });

    return image;
}

function setName(arrN,name){

    var nImage = arrN;
    var imgName = name;
    imgName = imgName.replace(/-/g, ' ');
    imgName = imgName.toLowerCase();

    return imgName;
}


function setHighScores(){
    var GameScore = Parse.Object.extend("GameScore");
    var query = new Parse.Query(GameScore);
    query.descending("score");
    query.limit(10);
    query.find({
        success: function(results) {

            var object = results[0];
            $('#player1 span').text(object.get('playerName'));
            $('#score1 span').text(object.get('score'));

            var object = results[1];
            $('#player2 span').text(object.get('playerName'));
            $('#score2 span').text(object.get('score'));

            var object = results[2];
            $('#player3 span').text(object.get('playerName'));
            $('#score3 span').text(object.get('score'));

            var object = results[3];
            $('#player4 span').text(object.get('playerName'));
            $('#score4 span').text(object.get('score'));

            var object = results[4];
            $('#player5 span').text(object.get('playerName'));
            $('#score5 span').text(object.get('score'));

            var object = results[5];
            $('#player6 span').text(object.get('playerName'));
            $('#score6 span').text(object.get('score'));

            var object = results[6];
            $('#player7 span').text(object.get('playerName'));
            $('#score7 span').text(object.get('score'));

            var object = results[7];
            $('#player8 span').text(object.get('playerName'));
            $('#score8 span').text(object.get('score'));

            var object = results[8];
            $('#player9 span').text(object.get('playerName'));
            $('#score9 span').text(object.get('score'));

            var object = results[9];
            $('#player10 span').text(object.get('playerName'));
            $('#score10 span').text(object.get('score'));
        },
        error: function(error) {
            alert("Error: " + error.code + " " + error.message);
        }
    });
}