const typingText = document.querySelector('.typing-text p');
const time = document.querySelector('.time span b');
const mistakes = document.querySelector('.mistakes span');
const wpm = document.querySelector('.wpm span');
const cpm = document.querySelector('.cpm span');
const button = document.querySelector('button');
const input = document.querySelector('.wrapper .input-field');  

let timer;
let maxTime=60;
let timeLeft = maxTime;
let charIndex=0;
let mistake=0;
let isTyping=false;


function loadParagraph(){
    const paragraph= ["Follow Me I you want more such code ",
        "Do you knoe who a i",
        "Jai Mata di lets Rock",
        "I need jobb someone hire me",
        "I want to be a bussiness men what should i do"];

    const randomIndex = Math.floor(Math.random()*paragraph.length);
    typingText.innerHTML='';
    for(const char of paragraph[randomIndex]){
        console.log(char);
        typingText.innerHTML +=`<span>${char}</span>`;
    }

    typingText.querySelectorAll('span')[0].classList.add('active');
    document.addEventListener('keydown',()=>
    input.focus());
    typingText.addEventListener('click',()=>{
        input.focus()
    })
}

// function initTyping(){
//     const char = typingText.querySelectorAll('span');
//     const typedChar = input.value.charAt(charIndex);
//     if(charIndex < char.length && timeLeft >0 ){

//         if(isTyping ){
//             timer = setInterval(initTime,1000);
//             isTyping = true;
//         }
//         if(char[charIndex].innerHTML === typedChar){
//             char[charIndex].classList.add('correct');
//         }else{
//             mistake++;
//             char[charIndex].classList.add('incorrect');
//         }
//         charIndex++;
        
//         char[charIndex].classList.add('active');
//         mistakes.innerText = mistake;
//         cpm.innerHTML = charIndex - mistake;

//     }else{
//         clearInterval(timer);
//         input.value='';
//     }
//}

function initTyping() {
    if (!isTyping) {
        timer = setInterval(initTime, 1000);
        isTyping = true;
    }
    const char = typingText.querySelectorAll('span');
    const typedChar = input.value.charAt(charIndex);

    if (charIndex < char.length && timeLeft > 0) {
        if (char[charIndex].innerText === typedChar) {
            char[charIndex].classList.add('correct');
        } else {
            mistake++;
            char[charIndex].classList.add('incorrect');
        }
        char[charIndex].classList.remove('active');
        charIndex++;
        if (charIndex < char.length) char[charIndex].classList.add('active');

        mistakes.innerText = mistake;
        cpm.innerText = charIndex - mistake;
    } else {
        clearInterval(timer);
        input.value = '';
    }
}


// function initTime(){
//     if(timeLeft>0){
//         timeLeft--;
//         time.innerHTML = timeLeft;
//         let wpmVal = Math.round((charIndex-mistake)/5(maxTime-timeLeft)*60);
//         wpm.innerHTML = wpmVal;
//     }
//     else{
//         clearInterval(timer);
//     }
// }


function initTime() {
    if (timeLeft > 0) {
        timeLeft--;
        time.innerHTML = timeLeft;

        let wpmVal = Math.round(((charIndex - mistake) / 5) / ((maxTime - timeLeft) / 60));
        wpm.innerHTML = wpmVal > 0 ? wpmVal : 0;
    } else {
        clearInterval(timer);
    }
}


// function reset(){
//     loadParagraph();
//     clearInterval(timer);
//     timeLeft = maxTime;
//     time.innerHTML = timeLeft;
//     input.value='';
//     charIndex=0;
//     mistake=0;
//     isTyping=false;
//     wpm.innerHTML = 0;
//     cpm.innerHTML = 0;
//     mistakes.innerHTML = 0;
// }


function reset() {
    clearInterval(timer);
    loadParagraph();
    timeLeft = maxTime;
    time.innerHTML = timeLeft;
    charIndex = mistake = 0;
    isTyping = false;
    wpm.innerHTML = cpm.innerHTML = mistakes.innerHTML = 0;
    input.value = '';
}


input.addEventListener("input",initTyping);
button.addEventListener("click",reset);
loadParagraph();