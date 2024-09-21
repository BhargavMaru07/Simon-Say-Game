let gameseq = [];
let userseq = [];
let HighestScore = 0; 
let btns = ["yellow", "red", "purple", "green"];
let started = false;
let level = 0;

let h2 = document.querySelector("h2");
let span = document.querySelector("span");



document.addEventListener("dblclick", function () {
    if (!started) {
        started = true;
        level = 0; 
        levelup();
    }
});



function levelup() {
    userseq = []; // Reset user's sequence
    level++; // Increment level
    h2.innerText = `Level ${level}`;
    span.innerText = `Highest Score: ${HighestScore}`; 

    let random = Math.floor(Math.random() * 4); 
    let randcolor = btns[random];
    let randbtn = document.querySelector(`.${randcolor}`);

    gameseq.push(randcolor);
    btnflash(randbtn);
}


function btnflash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 200);
}



let allbtns = document.querySelectorAll(".btn");
for (let pbtn of allbtns) {
    pbtn.addEventListener("click", btnpress);
}


function btnpress() {
    if (started) {
        let btn = this;
        btnflash(btn);
        let usercolor = btn.getAttribute("id"); 
        userseq.push(usercolor);

        checkans(userseq.length - 1);
    }
}


// Check user's sequence and game sequence
function checkans(idx) {
    if (userseq[idx] === gameseq[idx]) {
        if (userseq.length === gameseq.length) {
            setTimeout(function () {
                levelup(); 
            }, 500);
        }
    } else {
        if (level - 1 > HighestScore) {
            HighestScore = level - 1; 
        }
        h2.innerHTML = `Game over! <b>Your score is ${level - 1}</b>. Double click to start again.`;
        span.innerText = `Highest Score: ${HighestScore}`; 
        reset(); 
    }
}


function reset() {
    started = false;
    gameseq = [];
    userseq = [];
}
