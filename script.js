/* =====================================================
   QUICK MATH VARIABLES
===================================================== */

let quickScore = 0;
let quickTime = 10;
let quickAnswer = 0;
let quickTimer = null;
let quickGameRunning = false;


/* =====================================================
   BALLOON POP VARIABLES
===================================================== */

let balloonScore = 0;
let balloonLevel = 1;
let balloonTime = 10;
let balloonTimer = null;
let balloonGameRunning = false;

let balloonValues = [];
let nextBalloonIndex = 0;


/* =====================================================
   START GAME
===================================================== */

function startGame(game) {

    if (game === "quick") {

        startQuickMath();

    }

    else if (game === "balloon") {

        startBalloonPop();

    }

    else if (game === "rocket") {

        alert("🚀 ROCKET TRACK will be added next!");

    }

    else if (game === "key") {

        alert("🔑 KEY FINDER will be added next!");

    }

}


/* =====================================================
   QUICK MATH
===================================================== */

function startQuickMath() {

    stopAllGames();

    document
        .getElementById("menuScreen")
        .classList.add("hidden");

    document
        .getElementById("quickScreen")
        .classList.remove("hidden");


    quickScore = 0;

    quickGameRunning = true;


    document
        .getElementById("quickScore")
        .innerText = "SCORE: 0";


    document
        .getElementById("quickMessage")
        .innerText = "";


    startQuickQuestion();
}


/* =====================================================
   NEW QUICK MATH QUESTION
===================================================== */

function startQuickQuestion() {

    if (!quickGameRunning) {
        return;
    }


    let number1 =
        Math.floor(Math.random() * 10) + 1;

    let number2 =
        Math.floor(Math.random() * 10) + 1;


    quickAnswer =
        number1 * number2;


    document
        .getElementById("question")
        .innerText =
        number1 + " × " + number2 + " = ?";


    createAnswers();

    startQuickTimer();
}


/* =====================================================
   CREATE QUICK MATH ANSWERS
===================================================== */

function createAnswers() {

    let answers = [];


    /* Correct answer */

    answers.push(quickAnswer);


    /* Wrong answers */

    while (answers.length < 4) {

        let wrongAnswer =
            Math.floor(Math.random() * 100) + 1;


        if (!answers.includes(wrongAnswer)) {

            answers.push(wrongAnswer);

        }

    }


    /* Shuffle */

    answers.sort(
        () => Math.random() - 0.5
    );


    let container =
        document.getElementById("answers");


    container.innerHTML = "";


    for (let answer of answers) {

        let button =
            document.createElement("button");


        button.className =
            "answer-btn";


        button.innerText =
            answer;


        button.onclick = function () {

            checkQuickAnswer(answer);

        };


        container.appendChild(button);

    }
}


/* =====================================================
   QUICK MATH TIMER
===================================================== */

function startQuickTimer() {

    clearInterval(quickTimer);


    quickTime = 10;


    document
        .getElementById("quickTimer")
        .innerText =
        "TIME: 10";


    quickTimer = setInterval(function () {

        quickTime--;


        document
            .getElementById("quickTimer")
            .innerText =
            "TIME: " + quickTime;


        if (quickTime <= 0) {

            clearInterval(quickTimer);

            gameOver("TIME'S UP!");

        }

    }, 1000);
}


/* =====================================================
   CHECK QUICK MATH ANSWER
===================================================== */

function checkQuickAnswer(answer) {

    if (!quickGameRunning) {
        return;
    }


    /* Correct */

    if (answer === quickAnswer) {

        clearInterval(quickTimer);


        quickScore += 10;


        document
            .getElementById("quickScore")
            .innerText =
            "SCORE: " + quickScore;


        document
            .getElementById("quickMessage")
            .innerText =
            "+10";


        setTimeout(function () {

            if (!quickGameRunning) {
                return;
            }


            document
                .getElementById("quickMessage")
                .innerText = "";


            startQuickQuestion();

        }, 300);

    }


    /* Wrong */

    else {

        gameOver("WRONG ANSWER!");

    }
}


/* =====================================================
   BALLOON POP
===================================================== */

function startBalloonPop() {

    stopAllGames();


    document
        .getElementById("menuScreen")
        .classList.add("hidden");


    document
        .getElementById("balloonScreen")
        .classList.remove("hidden");


    balloonScore = 0;

    balloonLevel = 1;

    balloonGameRunning = true;


    document
        .getElementById("balloonScore")
        .innerText =
        "SCORE: 0";


    startBalloonLevel();
}


/* =====================================================
   START BALLOON LEVEL
===================================================== */

function startBalloonLevel() {

    if (!balloonGameRunning) {
        return;
    }


    balloonTime = 10;

    nextBalloonIndex = 0;

    balloonValues = [];


    document
        .getElementById("balloonLevel")
        .innerText =
        "LEVEL: " + balloonLevel;


    document
        .getElementById("balloonTimer")
        .innerText =
        "TIME: 10";


    document
        .getElementById("balloonMessage")
        .innerText = "";


    createBalloons();

    startBalloonTimer();
}


/* =====================================================
   CREATE BALLOONS
===================================================== */

function createBalloons() {

    let area =
        document.getElementById("balloonArea");


    area.innerHTML = "";


    let balloons = [];


    /*
     * Create 3 different calculations
     */

    for (let i = 0; i < 3; i++) {

        let calculation;


        do {

            calculation =
                createCalculation();

        }

        while (
            balloons.some(
                b => b.value === calculation.value
            )
        );


        balloons.push(calculation);

    }


    /*
     * Store calculated values
     */

    balloonValues =
        balloons.map(
            b => b.value
        );


    /*
     * Sort values from smallest to largest
     */

    let sortedValues =
        [...balloonValues].sort(
            (a, b) => a - b
        );


    /*
     * Create balloon elements
     */

    for (let i = 0; i < 3; i++) {

        let balloon =
            document.createElement("div");


        balloon.className =
            "balloon";


        /*
         * Show calculation
         *
         * Example:
         * 8 + 5
         * 20 - 7
         * 4 × 6
         */

        balloon.innerText =
            balloons[i].question;


        /*
         * Store answer internally
         */

        balloon.dataset.value =
            balloons[i].value;


        /*
         * Balloon positions
         */

        if (i === 0) {

            balloon.style.left =
                "70px";

            balloon.style.top =
                "170px";

        }

        else if (i === 1) {

            balloon.style.left =
                "300px";

            balloon.style.top =
                "60px";

        }

        else {

            balloon.style.left =
                "530px";

            balloon.style.top =
                "190px";

        }


        /*
         * Click event
         */

        balloon.onclick = function () {

            clickBalloon(
                balloon,
                sortedValues
            );

        };


        area.appendChild(balloon);

    }
}


/* =====================================================
   CREATE CALCULATION
===================================================== */

function createCalculation() {

    /*
     * Difficulty increases with level
     */

    let maxNumber;


    if (balloonLevel <= 2) {

        maxNumber = 10;

    }

    else if (balloonLevel <= 4) {

        maxNumber = 20;

    }

    else if (balloonLevel <= 6) {

        maxNumber = 50;

    }

    else if (balloonLevel <= 8) {

        maxNumber = 100;

    }

    else {

        maxNumber = 200;

    }


    /*
     * Choose operation
     *
     * 0 = +
     * 1 = -
     * 2 = ×
     * 3 = ÷
     * 4 = %
     */

    let operation =
        Math.floor(Math.random() * 5);


    let a;

    let b;

    let value;

    let question;


    /* =================================================
       ADDITION
    ================================================= */

    if (operation === 0) {

        a =
            Math.floor(
                Math.random() * maxNumber
            ) + 1;


        b =
            Math.floor(
                Math.random() * maxNumber
            ) + 1;


        value =
            a + b;


        question =
            a + " + " + b;

    }


    /* =================================================
       SUBTRACTION
    ================================================= */

    else if (operation === 1) {

        a =
            Math.floor(
                Math.random() * maxNumber
            ) + 1;


        b =
            Math.floor(
                Math.random() * maxNumber
            ) + 1;


        /*
         * Keep answer positive
         */

        if (a < b) {

            let temp = a;

            a = b;

            b = temp;

        }


        value =
            a - b;


        question =
            a + " - " + b;

    }


    /* =================================================
       MULTIPLICATION
    ================================================= */

    else if (operation === 2) {

        /*
         * Multiplication numbers
         * become harder with levels
         */

        let multiplyLimit =
            Math.min(
                5 + balloonLevel * 2,
                20
            );


        a =
            Math.floor(
                Math.random() * multiplyLimit
            ) + 1;


        b =
            Math.floor(
                Math.random() * multiplyLimit
            ) + 1;


        value =
            a * b;


        question =
            a + " × " + b;

    }


    /* =================================================
       DIVISION
    ================================================= */

    else if (operation === 3) {

        /*
         * Create division with
         * a whole number answer
         */

        b =
            Math.floor(
                Math.random() *
                Math.min(10, 3 + balloonLevel)
            ) + 2;


        value =
            Math.floor(
                Math.random() *
                Math.min(maxNumber, 30)
            ) + 1;


        a =
            value * b;


        question =
            a + " ÷ " + b;

    }


    /* =================================================
       MODULO %
    ================================================= */

    else {

        b =
            Math.floor(
                Math.random() * 9
            ) + 2;


        a =
            Math.floor(
                Math.random() * maxNumber
            ) + b;


        value =
            a % b;


        question =
            a + " % " + b;

    }


    /*
     * Return calculation
     */

    return {

        question: question,

        value: value

    };
}


/* =====================================================
   CLICK BALLOON
===================================================== */

function clickBalloon(
    balloon,
    sortedValues
) {

    if (!balloonGameRunning) {
        return;
    }


    let value =
        Number(
            balloon.dataset.value
        );


    let correctValue =
        sortedValues[nextBalloonIndex];


    /*
     * Correct balloon
     */

    if (value === correctValue) {

        balloonScore += 10;

        nextBalloonIndex++;


        document
            .getElementById("balloonScore")
            .innerText =
            "SCORE: " + balloonScore;


        /*
         * Pop animation
         */

        balloon.classList.add("pop");


        setTimeout(function () {

            balloon.remove();

        }, 250);


        /*
         * All balloons completed
         */

        if (nextBalloonIndex >= 3) {

            completeBalloonLevel();

        }

    }


    /*
     * Wrong balloon
     */

    else {

        gameOver("WRONG BALLOON!");

    }
}


/* =====================================================
   BALLOON LEVEL COMPLETE
===================================================== */

function completeBalloonLevel() {

    balloonGameRunning = false;


    clearInterval(balloonTimer);


    /*
     * Level completion bonus
     */

    balloonScore += 10;


    document
        .getElementById("balloonScore")
        .innerText =
        "SCORE: " + balloonScore;


    document
        .getElementById("balloonMessage")
        .innerText =
        "🎉 LEVEL COMPLETE!";


    /*
     * Start next level
     */

    setTimeout(function () {

        balloonLevel++;

        balloonGameRunning = true;

        startBalloonLevel();

    }, 1000);
}


/* =====================================================
   BALLOON TIMER
===================================================== */

function startBalloonTimer() {

    clearInterval(balloonTimer);


    balloonTimer =
        setInterval(function () {

            balloonTime--;


            document
                .getElementById("balloonTimer")
                .innerText =
                "TIME: " + balloonTime;


            /*
             * Time over
             */

            if (balloonTime <= 0) {

                clearInterval(balloonTimer);

                gameOver("TIME'S UP!");

            }

        }, 1000);
}


/* =====================================================
   GAME OVER
===================================================== */

function gameOver(reason) {

    quickGameRunning = false;

    balloonGameRunning = false;


    clearInterval(quickTimer);

    clearInterval(balloonTimer);


    let finalScore = quickScore;


    /*
     * Check which game is active
     */

    if (
        !document
            .getElementById("balloonScreen")
            .classList
            .contains("hidden")
    ) {

        finalScore =
            balloonScore;

    }


    document
        .getElementById("gameOverReason")
        .innerText =
        reason;


    document
        .getElementById("gameOverScore")
        .innerText =
        "FINAL SCORE: " + finalScore;


    document
        .getElementById("gameOverScreen")
        .classList
        .remove("hidden");
}


/* =====================================================
   RESTART CURRENT GAME
===================================================== */

function restartCurrentGame() {

    document
        .getElementById("gameOverScreen")
        .classList
        .add("hidden");


    /*
     * Restart Balloon Pop
     */

    if (
        !document
            .getElementById("balloonScreen")
            .classList
            .contains("hidden")
    ) {

        startBalloonPop();

    }


    /*
     * Otherwise restart Quick Math
     */

    else {

        startQuickMath();

    }
}


/* =====================================================
   STOP ALL GAMES
===================================================== */

function stopAllGames() {

    quickGameRunning = false;

    balloonGameRunning = false;


    clearInterval(quickTimer);

    clearInterval(balloonTimer);
}


/* =====================================================
   MAIN MENU
===================================================== */

function showMenu() {

    stopAllGames();


    document
        .getElementById("gameOverScreen")
        .classList
        .add("hidden");


    document
        .getElementById("quickScreen")
        .classList
        .add("hidden");


    document
        .getElementById("balloonScreen")
        .classList
        .add("hidden");


    document
        .getElementById("menuScreen")
        .classList
        .remove("hidden");
}