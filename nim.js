const selectMode = document.querySelector(".select-mode");
const chooseSettings = document.querySelector(".choose-settings");
const startingGame = document.querySelector(".starting-game");
const startinMode1 = document.querySelector(".modeg1");
const startinMode2 = document.querySelector(".modeg2");
const restartBtn = document.querySelector(".restart");
const startingBtn = document.querySelector(".starting");
const playerStart = document.querySelector("#playerStart");
const computerStart = document.querySelector("#computerStart");
const backBtn = document.querySelector(".back");

const form = document.querySelector("form");

const maxNum = document.querySelector("#max-num");

const mode1 = document.querySelector(".mode1");
const mode2 = document.querySelector(".mode2");

const inputumber = document.querySelector("#input-number");

const stickPile = document.querySelector(".stickPile");
const output = document.querySelector(".output");
const maxSticks = document.querySelector(".maxSticks");
const stickleft = document.querySelector(".stickleft");
const play = document.querySelector(".play");

const winText = document.querySelector(".win-effect-H1");
const X = document.querySelector("#X");

const settingsDiv = document.querySelector(".settingsDiv");


let sum = 0;
let stickArr = [];
let mode = 0;
let turn = 0;
//........................MODE 2..................................

const play2Btn = document.querySelector(".play2");
const restart2Btn = document.querySelector(".restart2");
const maxSticks2Div = document.querySelector(".maxSticks2");
const stickPile2Div = document.querySelector(".stickPile2");
const stickleft2 = document.querySelector(".stickleft2");
const output2 = document.querySelector(".output2");
const numInp2 = document.querySelector(" #input-number2");

const winEffect = document.querySelector(".win-effect");
function randomNum(num) {
    return Math.floor(Math.random() * num) + 1;
}

function createFile(maxFile, pile) {

    for (let i = 0; i < maxFile; i++) {
        const stick = document.createElement("div");
        stick.classList.add("stick");
        stick.style.marginLeft = "4%";
        stick.style.top = `${randomNum(85)}%`;
        stick.style.left = `${randomNum(90)}%`;
        stick.style.bottom = `${randomNum(75)}%`;

        stick.style.transform = `rotate(${randomNum(360)}deg)`;
        pile.appendChild(stick);
        stickArr.push(stick);
        console.log(stickArr.length);
    }
}

function modeChoose(mode) {
    startinMode1.classList.add("hide");
    startinMode2.classList.add("hide");
    selectMode.classList.add("hide");
    chooseSettings.classList.add("hide");
    startingGame.classList.add("hide");

    mode.classList.remove("hide");
}

function restart() {
    mode = 0;
    sum = 0;
    stickArr = [];
    computerStart.checked = false;
    playerStart.checked = false;
    maxNum.value = "";
    settingsDiv.innerHTML = ""
    //......MODE1....
    inputumber.value = "";
    stickPile.innerHTML = "";

    //.......MODE2....
    maxSticks2Div.value = "";
    stickleft2.innerHTML = "";
    numInp2.value = "";
    modeChoose(selectMode);
    startingGame.classList.add("hide");
}

function setup() {
    console.log(maxNum.value);
    createFile(maxNum.value, stickPile);
    output.textContent = "Enter a number from 1 to 9";
    stickleft.textContent = `${maxNum.value}/${sum}`;
    inputumber.disabled = false;
    play.disabled = false;
    if (mode === 1) {
        if (computerStart.checked) {
            eazyModeMachine();
        } else {
            turn = 2;
        }
    }
}

//....MODE2....
function setupSmartMode() {


    createFile(maxNum.value, stickPile2Div);

    output2.textContent = "Enter a number from 1 to 9";
    stickleft2.textContent = `${maxNum.value}/${sum}`;
    numInp2.disabled = false;
    play2Btn.disabled = false;
    if (computerStart.checked) {
        machineTurn();
    } else {
        turn = 2;
    }
}

//the smart mode
function machineTurn() {
    console.log("hey its machine turn");
    turn = 2
    let machine = 10 - (sum % 10);

    if (machine === 10 || machine === 0) {
        if ((+maxNum.value - sum) > 9) {
            machine = randomNum(9);

        } else {
            machine = randomNum(+maxNum.value - sum);
        }
    }

    output2.textContent = `🤔🤔🤔`;
    numInp2.disabled = true;
    play2Btn.disabled = true;

    sum += machine;
    setTimeout(() => {
        output2.textContent = `The machine chose to take out ${machine} sticks`;
        calcTurn(machine);
        stickleft2.textContent = `${Math.abs(maxNum.value)}/${sum}`;
        setTimeout(() => {
            output2.textContent = "Your turn";
            numInp2.disabled = false;
            play2Btn.disabled = false;
            whoWin2();
        }, 950);
    }, 1000);
}

function hardModeHuman(inpValue) {
    turn = 1
    sum += inpValue
    calcTurn(inpValue)
    turn = 1;
    numInp2.value = ""
    stickleft2.textContent = `${maxNum.value}/${sum}`;
    whoWin2()
}

function calcTurn(x) {
    for (let i = 0; i < x; i++) {
        stickArr[stickArr.length - 1].classList.add("hide");
        stickArr.pop();
        console.log(stickArr.length);
    }
}

function eazyModeHuman(inpValue) {
    sum += inpValue;
    calcTurn(inpValue);
    turn = 1;
    inputumber.value = "";
    stickleft.textContent = `${maxNum.value}/${sum}`;
    whoWin();
}

function eazyModeMachine() {
    turn = 2;
    output.textContent = `🤔🤔🤔`;
    inputumber.disabled = true;
    play.disabled = true;
    let machine;
    if ((+maxNum.value - sum) > 9) {
        machine = randomNum(9);

    } else {
        machine = randomNum(+maxNum.value - sum);
    }
    console.log(machine);
    sum += machine;

    setTimeout(() => {
        output.textContent = `The machine chose to take out ${machine} sticks`;
        calcTurn(machine)
        stickleft.textContent = `${Math.abs(maxNum.value)}/${sum}`;
        setTimeout(() => {
            output.textContent = "Youre turn";
            inputumber.disabled = false;
            play.disabled = false;
            whoWin();
        }, 950);
    }, 1000);
}

function whoWin() {
    if (sum === +maxNum.value) {
        winEffect.classList.remove("hide");
        winText.textContent = `${turn === 1 ? "Player" : "Computer"} Won`;
        inputumber.disabled = true;
        play.disabled = true;

    }
    else {
        if (turn === 1) {
            eazyModeMachine();
        }
    }
}

function whoWin2() {
    if (sum === +maxNum.value) {
        winEffect.classList.remove("hide");
        winText.textContent = `${turn === 1 ? "Player" : "Computer"} Won`;
        numInp2.disabled = true;
        play2Btn.disabled = true;

    }
    else {
        if (turn === 1) {
            console.log("check if comp win2+ the arr of stiks");
            console.log(stickArr.length);
            machineTurn();
        }
    }
}

//מסך ראשון כפתור בחירת mode
mode1.addEventListener("click", () => {
    modeChoose(chooseSettings);
    mode = 1;
})
//מסך ראשון כפתור בחירת mode
mode2.addEventListener("click", () => {
    modeChoose(chooseSettings);
    mode = 2;
})

//מעבר מהמסך של בחירת סטינג למסך של המשחק
form.addEventListener("submit", (e) => {

    if ((+maxNum.value % 10 !== 0) || (+maxNum.value < 10)) {
        settingsDiv.textContent = "Enter a round number!";
    } else {
        if (mode === 1) {
            modeChoose(startinMode1);
            setup();
        } else {
            modeChoose(startinMode2);
            setupSmartMode();
        }
        startingGame.classList.remove("hide");
    }

    e.preventDefault();
})

backBtn.addEventListener("click", restart);
restartBtn.addEventListener("click", restart);

play.addEventListener("click", () => {

    while (+inputumber.value % 1 != 0 || +inputumber.value <= 0 || +inputumber.value > 9) {
        console.log("while 2");
        return output.textContent = "Enter a round number between 1 and 9";
    }

    while (+inputumber.value > (+maxNum.value - sum)) {
        console.log("while 1");
        return output.textContent = `Enter a round number between 1 and ${+maxNum.value - sum}`;
    }
    eazyModeHuman(+inputumber.value);
})

inputumber.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        while (+inputumber.value % 1 != 0 || +inputumber.value <= 0 || +inputumber.value > 9) {
            return output.textContent = "Enter a round number between 1 and 9";
        }
        while (+inputumber.value > (+maxNum.value - sum)) {
            console.log("while 1");
            return output.textContent = `Enter a round number between 1 and ${+maxNum.value - sum}`;
        }
        eazyModeHuman(+inputumber.value);
    }
});

play2Btn.addEventListener("click", () => {
    console.log(+maxNum.value);
    while (+numInp2.value % 1 != 0 || +numInp2.value <= 0 || +numInp2.value > 9) {
        return output2.textContent = "Enter a round number between 1 and 9";
    }

    while (+numInp2.value > (+maxNum.value - sum)) {
        return output2.textContent = `Enter a round number between 1 and ${+maxSticks2Div.value - sum}`;
    }

    hardModeHuman(+numInp2.value);
})
restart2Btn.addEventListener("click", restart);

X.addEventListener("click", () => {
    winEffect.classList.add("hide");
})