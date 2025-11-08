//Variable to check if the startButton is green
var isGreen = false;
//Variable to check if the startButton has been pressed
var isStarted = false;
//gets the start time from when startButton turns green
var startTime;
//the ending time from when the user clicks the button
var endTime;
//the scores from each run that the user has.
var scores = [];
//variable to keep track of what run the user is on
var run = 1;
//does something once the page loads
window.onload = function() {
    const startBtn = document.getElementById("startButton");
    const resetBtn = document.getElementById("resetButton");
    const scoreBtn = document.getElementById("scoresButton");

    if (startBtn) {
      startBtn.onclick = game;
    }
    if(resetBtn) {
        resetBtn.onclick = resetScores;
    }
    if(scoreBtn) {
        scoreBtn.onclick = goToScore;
    }
    currentScore();
    gameScores();
    
    //function that does something if the startButton is pressed
    function game() {
        if(isGreen == false && isStarted == false) {
        //get a random number that will be used to Timeout the program
        let time = Math.floor(Math.random() * 10000) + 5;
        //get the id of the startButton
        startBtn.textContent = "STARTED";
        startBtn.style.backgroundColor = "red";
        isStarted = true;
        //write the timeout function for the startButton
        setTimeout(function() {
            //once the Timeout function stops:
            //set the button to green
            startBtn.style.backgroundColor = "green";
            //change the buttons text to tell the user to click it
            startBtn.textContent = "CLICK ME!";
            isGreen = true;
            startTime = Date.now();
            }, time);
        } else if(isGreen == false && isStarted == true) {
            localStorage.clear();
            window.location.href = "lost.html";
        } else {
            endTime = Date.now() - startTime;
            scores = JSON.parse(localStorage.getItem("scores")) || [];
            let newScore = { run: run, score: endTime };
            if (scores.length > 0) {
                run = scores[scores.length - 1].run + 1;
            } else {
                run = 1;
            }
            newScore.run = run;
            scores.push(newScore);
            localStorage.setItem("scores", JSON.stringify(scores));
            window.location.href = "scores.html";
        }
    }

    function resetScores() {
        run = 1;
        localStorage.removeItem("scores");
    }

    function goToScore() {
        window.location.href = "scores.html";
    }
    
    function currentScore() {
        scores = JSON.parse(localStorage.getItem("scores")) || [];
        if (scores.length > 0) {
            let current = scores[scores.length-1].score;
            let currentList = document.getElementById("currentList");
            if(currentList) {
            currentList.innerHTML = `${current} ms`;
            }
        }
    }

    function gameScores() {
        scores = JSON.parse(localStorage.getItem("scores")) || [];
        let currentList = document.getElementById("gameList");
        scores.sort((a, b) => a.score - b.score);
        scores.forEach((score) => {
            var tr = document.createElement("tr");
            var td1 = document.createElement("td");
            var td2 = document.createElement("td");

            td1.textContent = ` ${score.run}`;
            td2.textContent = `${score.score} ms`;
            tr.appendChild(td1);
            tr.appendChild(td2);
            if(currentList) {
            currentList.appendChild(tr);
            }
        });
    }
}