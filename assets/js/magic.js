$("document").ready(function () {

    $("i").on("click", handler);

});

let timeleft = 0;
let bLen = 300;
let sLen = 1500;
let isRunning = false;
let isBreak = false;
let pomoRun = "";
let num = 1500;
let horn = new Audio('assets/audio/horn.mp3');

function handler(k) {
    var button = k.target.parentElement.id;

    console.log("clicked: " + button);
    switch (button) {
        case ("start_stop"):

            if (isRunning == false) {
                isRunning = true;
                pomoCounter(num);
            } else {
                clearInterval(pomoRun);
                num = timeleft;
                isRunning = false;
            }
            break;
        case ("pause"):
            clearInterval(pomoRun);
            num = timeleft;
            isRunning = false;
            break;
        case ("reset"):
            clearInterval(pomoRun);
            sLen = 1500;
            bLen = 300;
            isRunning = false;
            isBreak = false
            $("#time-left").text("25:00");
            $("#break-length").text("5");
            $("#session-length").text("25");
            horn.play();
            break;
        case ("break-increment"):
            if (bLen < 3600) {
                bLen = bLen + 60;
                console.log(bLen);
            } else {
                blen = 3600;
            }
            $("#break-length").text(bLen / 60);
            break;
        case ("break-decrement"):
            if (bLen > 60) {
                bLen = bLen - 60;
                console.log(bLen);
            } else {
                bLen = 60;
            }
            $("#break-length").text(bLen / 60);
            break;
        case ("session-increment"):
            if (sLen < 3600) {
                sLen = sLen + 60;
                num = sLen;
                console.log(sLen);
            } else {
                sLen = 3600;
                num = sLen;
            }
            $("#session-length").text(sLen / 60);
            $("#time-left").text(Math.floor(sLen / 60) + ":00");
            break;
        case ("session-decrement"):
            if (sLen > 60) {
                sLen = sLen - 60;
                num = sLen;
                console.log(sLen);
            } else {
                sLen = 60;
                num = sLen;
            }
            $("#session-length").text(sLen / 60);
            $("#time-left").text(Math.floor(sLen / 60) + ":00");
            break;
    }
}

function pomodoro() {
    if (isBreak == false) {
        console.log("entering break");
        $("#time-left").text("ENTERING BREAK")
        $("#timer-label").text("BREAK");
        horn.play();
        isBreak = true;
        pomoCounter(bLen);
    } else {
        console.log("back to session")
        $("#time-left").text("BACK TO SESSION")
        $("#timer-label").text("SESSION");
        isBreak = false;
        pomoCounter(sLen);
    }
}

function pomoCounter(num) {
    timeleft = num;

    pomoRun = setInterval(function () {
        timeleft--;
        //console.log(timeleft)
        var minutes = Math.floor(timeleft / 60);
        var seconds = timeleft - minutes * 60;
        var twoDigitsSecs = seconds.toLocaleString(undefined,{minimumIntegerDigits: 2});
        $("#time-left").text(minutes + ":" + twoDigitsSecs);
        console.log(minutes + ":" + twoDigitsSecs);
        if (timeleft < 0) {
            clearInterval(pomoRun);
            pomodoro();
        }
    }, 1000);
}