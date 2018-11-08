$("document").ready(function () {

    $("i").on("click", handler);

});

let timeleft = 0;
let brk = 300;
let sess = 1500;
let toCheck = 0;
let isRunning = false;
let pomoRun = "";
let horn = new Audio('assets/audio/horn.mp3');

function handler(k) {
    var button = k.target.parentElement.id;

    console.log("has pulsao: " + button);
    switch (button) {
        case ("start_stop"):
            if (isRunning == false) {
                isRunning = true;
                console.log("activo el pomodorcio");
                pomodoro(brk, sess);
            } else {
                clearInterval(pomoRun);
                sess = timeleft;
                isRunning = false;
            }
            break;
        case ("pause"):
            clearInterval(pomoRun);
            sess = timeleft;
            isRunning = false;
            break;
        case ("reset"):
            clearInterval(pomoRun);
            sess = 1500;
            brk = 300;
            isRunning = false;
            $("#time-left").text("25:00");
            $("#break-length").text("5");
            $("#session-length").text("25");
            horn.play();
            break;
        case ("break-increment"):
            brk = brk + 60;
            console.log(brk);
            $("#break-length").text(brk / 60);
            break;
        case ("break-decrement"):
            if (brk > 0) {
                brk = brk - 60;
                console.log(brk);
            } else {
                brk = 0;
            }
            $("#break-length").text(brk / 60);
            break;
        case ("session-increment"):
            sess = sess + 60;
            console.log(sess);
            $("#session-length").text(sess / 60);
            $("#time-left").text(Math.floor(sess / 60) + ":00");
            break;
        case ("session-decrement"):
            if (sess > 0) {
                sess = sess - 60;
                console.log(sess);
            } else {
                sess = 0;
            }
            $("#session-length").text(sess / 60);
            $("#time-left").text(Math.floor(sess / 60) + ":00");
            break;
    }
}

function pomodoro(brk, sess) {
    timeleft = sess;
    brk = brk;
    toCheck = timeleft - brk;
    console.log("tocheck is: " + toCheck);
    pomoRun = setInterval(function () {
        pomoBreak();
        timeleft--;
        //console.log(timeleft)
        var minutes = Math.floor(timeleft / 60);
        var seconds = timeleft - minutes * 60;
        console.log(minutes + ":" + seconds);
        $("#time-left").text(minutes + ":" + seconds);
        if (timeleft < 0) {
            clearInterval(pomoRun);
            $("#time-left").text("25:00");
            isRunning = false;
        }
    }, 1000);
}

function pomoBreak() {

    if (timeleft === toCheck) {
        console.log("llegamos al break!");
        $("#logo").css("color", "forestgreen");
        horn.play();
        $("#logo").css("color", "");
        toCheck = timeleft - brk;
    }
}

/**
function pausePomo() {
    clearInterval(pomoRun);
    sess = timeleft;
    isRunning = false;
}
**/
