///btnNext проверить 

let data = null;

const startingMessage = document.querySelector('.start-message'),
      btnStart = document.querySelector('.btn-start'),
      questionBlock = document.querySelector('.question'),
      number = document.querySelector('.number'),
      title = document.querySelector('.title'),
      picture = document.querySelector('.question-img'),
      options = document.querySelector('.options'),
      btnNext = document.querySelector('.btn-next'),
      reactionImg = document.querySelector('.reaction'),
      modalNext = document.querySelector('.modal-next'),
      modal = document.querySelector('.modal'),
      noteText = document.querySelector('.note'),
      results = document.querySelector('.results'),
      pointsBlock = document.querySelector('.points'),
      congratsBlock = document.querySelector('.congrats'),
      questionImg = document.querySelector('.info-img');

let questionNumber = 0;
let points = 0;

//clicking next

btnNext.addEventListener('click', nextBtnHandler)

function nextBtnHandler() {
    console.log(data.length);
    if (questionNumber < data.length) {
        fillQuestion(questionNumber)
    } else {
        showResults()
    }
}

function showResults() {
    console.log(points);
    questionBlock.classList.add('hidden');
    results.classList.remove('hidden');
    pointsBlock.innerHTML = `Ты набрал очков: ${points} `;
    if (points/data.length >= 0.8) {
        congratsBlock.innerHTML = 'Блестящая работа! Отличные знания техник, героев и сюжета. Теперь вперед, на миссию А-ранга!'
    } else if (points/data.length <= 0.4) {
        congratsBlock.innerHTML = 'Видимо тебе нужно пересмотреть Наруто! Но не сдавайся, ведь даже, если захотеть, можно стать Хокаге!'
    } else [
        congratsBlock.innerHTML = 'Неплохая работа, но кое-что повторить не мешает. Но это потом, сейчас тебе пора на миссию В-ранга!'
    ]

}

//getting data

function getData() {
    fetch('../../questions.json')
        .then(data => data.json())
        .then(data => {
            console.log(data)
            saveData(data)
        })
    
}

//saving data
function saveData(receviedData) {
    data = receviedData
}

getData();

//starting test
btnStart.addEventListener('click', btnStartHandler)

function btnStartHandler() {
    startingMessage.classList.add('hidden');
    questionBlock.classList.remove('hidden');
    
    if (data) {
        fillQuestion(questionNumber)
    }
}

//filling the questionBlock
function fillQuestion(questionNumber) {
    //checking image existence
    if (data[questionNumber].hasOwnProperty('picture')) {
        questionImg.classList.remove('hidden');
        //fill the src
        questionImg.src = data[questionNumber].picture

    } 
    let { answers: answersText, title: titleText } =  data[questionNumber];
    title.innerHTML = titleText;
    id.innerHTML = questionNumber + 1;
    let answers = answersText.map(answer => {
        return `<button class="answer">${answer}</button>` 
    })
    options.innerHTML = answers.join('');
    options.addEventListener('click', optionsHandler); 
}

//checking the answer

function optionsHandler(event) {
    let {isCorrect} = data[questionNumber];
    let answerBtns = Array.from(options.children);
    answerBtns.map(answerBtn => answerBtn.style.pointerEvents = "none");
    if (event.path[0].tagName == 'BUTTON') {
        answerBtns[isCorrect].style.borderColor = 'green';
        answerBtns[isCorrect].style.borderWidth = '7px';
        if (answerBtns.indexOf(event.target) == isCorrect) {
            gifsCorrect(data[questionNumber]['answerImg'] || "../../gifs/correct.gif"); 
        } else {
            gifsIncorrect(data[questionNumber]['answerImg'] || "../../gifs/incorrect.gif");
            event.target.style.borderColor = 'red';
            event.target.style.borderWidth = '7px';
        } 
        //btn to Посмотреть результаты
        if (data.length == questionNumber + 1) {
            btnNext.innerHTML = "Посмотреть результаты";
            btnNext.addEventListener('click', showResults)
        }
    }
}

//gifs

function gifsCorrect(src) {
    body.classList.add('lock');
    modal.classList.remove('hidden');
    modal.style.backgroundColor = "#2ecc71";
    
    reactionImg.src = src;
    noteText.innerHTML = "Верно!";

    modalNext.onclick = function() {
        modal.classList.add('hidden');
        body.classList.remove('lock');
        questionNumber = questionNumber + 1;
    }

    points = points + 1

}

function gifsIncorrect(src) {
    body.classList.add('lock');
    modal.classList.remove('hidden');
    modal.style.backgroundColor = "#e74c3c";
    noteText.innerHTML = "Неверно!";
    reactionImg.src = src;
    modalNext.onclick = function() {
        modal.classList.add('hidden');
        body.classList.remove('lock');
        questionNumber = questionNumber + 1;
    }

}

function srcChange(src) {
    reactionImg.src = src;
}


// function imgCheck()


// function modalClose() {   
//     if (!event.target.closest('.modal') || event.target.closest('.modal-next')) {
//         console.log(modal)

//     }  
// }

// body.addEventListener('click', event => {
//     if (event.target.closest('.btn-next') || event.target.closest('.modal-next')) {
//         body.classList.remove('lock');
//         modal.classList.add('hidden');
//         introText.classList.add('hidden');
//         i++;

//         //display block elements

//         number.style.display = "block";
//         title.style.display = "block";

//         answers.forEach(answer => {
//             answer.style.display = "block";
//         });

//         //замена текста кнопки

//         btnNext.classList.remove('center');
//         btnNext.innerHTML = "Дальше";
//         btnNext.classList.add('hidden');

//         //сброс цвета ответов

//         document.querySelectorAll('.answer').forEach(answer => {
//                 answer.style.backgroundColor = "transparent";    
//         });

//         //сброс запрета кликов

//         document.getElementById("first").style.pointerEvents = "auto"; 
//         document.getElementById("second").style.pointerEvents = "auto";  
//         document.getElementById("third").style.pointerEvents = "auto";  

//         //исчезновение картинки

//         picture.classList.add('hidden');

//         //запрос json

//         let xhttp = new XMLHttpRequest();
//         xhttp.onreadystatechange = function() {
//             if (this.readyState == 4 && this.status == 200) {
//             // Typical action to be performed when the document is ready:
//                 if (JSON.parse(xhttp.responseText).length > i) {

//                     if (typeof JSON.parse(xhttp.responseText)[i].picture !== 'undefined') {
//                         //picture
//                         picture.classList.remove('hidden');
//                         picture.src = JSON.parse(xhttp.responseText)[i].picture;
//                     }

//                     if (typeof JSON.parse(xhttp.responseText)[i].answerImg !== 'undefined') {
//                         //answerImg
//                         // reactionImg.setAttribute("src", JSON.parse(xhttp.responseText)[i].answerImg); 
//                         // reactionImg.src = JSON.parse(xhttp.responseText)[i].answerImg; 
//                         // console.log(JSON.parse(xhttp.responseText)[i].answerImg);
//                         srcChange(JSON.parse(xhttp.responseText)[i].answerImg);
//                         console.log(reactionImg);

//                     } else {
//                         srcChange('../../gifs/1.gif');
//                     }

//                     //number
//                     document.getElementById("id").innerHTML = JSON.parse(xhttp.responseText)[i].id;

//                     //title
//                     document.getElementById("title").innerHTML = JSON.parse(xhttp.responseText)[i].title;

//                     //answers
//                     document.getElementById("first").innerHTML = JSON.parse(xhttp.responseText)[i].answers[0].text;

//                     document.getElementById("second").innerHTML = JSON.parse(xhttp.responseText)[i].answers[1].text;

//                     document.getElementById("third").innerHTML = JSON.parse(xhttp.responseText)[i].answers[2].text;

//                 }

//                 //correct answer

//                 document.body.addEventListener('click', event => {

//                     switch (event.target.closest('.answer')) {

//                         case document.getElementById("first"):

//                             if (JSON.parse(xhttp.responseText)[i].answers[0].isCorrect) {
                                    
//                                 event.target.closest('.answer').style.backgroundColor = "green";

//                                 points++;
//                                 console.log(points);


//                                 gifsCorrect()

//                             } else {           
//                                     event.target.closest('.answer').style.backgroundColor = "red";

//                                     gifsIncorrect()
//                             }

//                             document.getElementById("second").style.pointerEvents = "none"; 
//                             document.getElementById("third").style.pointerEvents = "none"; 
                            
//                             break;

//                         case document.getElementById("second"):

//                             if (JSON.parse(xhttp.responseText)[i].answers[1].isCorrect) {
                                    
//                                 event.target.closest('.answer').style.backgroundColor = "green";

//                                 points++;
//                                 console.log(points);

//                                 gifsCorrect()

//                             } else {           
//                                 event.target.closest('.answer').style.backgroundColor = "red";

//                                 gifsIncorrect()
//                             }

//                             document.getElementById("first").style.pointerEvents = "none"; 
//                             document.getElementById("third").style.pointerEvents = "none";     

//                             break;
                            
//                         case document.getElementById("third"):

//                             if (JSON.parse(xhttp.responseText)[i].answers[2].isCorrect) {
                                    
//                                 event.target.closest('.answer').style.backgroundColor = "green";

//                                 points++;
//                                 console.log(points);

//                                 gifsCorrect()

//                             } else {           
//                                 event.target.closest('.answer').style.backgroundColor = "red";

//                                 gifsIncorrect()
//                             }

//                             document.getElementById("first").style.pointerEvents = "none"; 
//                             document.getElementById("second").style.pointerEvents = "none";          

//                             break;                        

//                     }

                    
                
//                 })

//                 // document.body.addEventListener('click', event => { 

//                 //     if (event.target.closest('.answer').style.backgroundColor == "green") {
//                 //         points++;
//                 //         console.log(points);
//                 //     } 

//                 // })

                

//                 if (JSON.parse(xhttp.responseText).length === i + 1 ) {
                
//                     btnNext.innerHTML = "Результаты";
//                     modalNext.innerHTML = "Результаты";
//                 }

//                 if (i === JSON.parse(xhttp.responseText).length) {
//                     console.log('последний вопрос')
                    
//                             results.style.display = "block";

//                             number.style.display = "none";
//                             title.style.display = "none";
//                             btnNext.style.display = "none";

//                             answers.forEach(answer => {
//                                 answer.style.display = "none";
//                             });

//                             console.log(points)
//                             pointsBlock.innerHTML = `Заработано очков: ${points}`                    
//                 }
                        
//             }
//         };   
            
//         xhttp.open("GET", "questions.json", true);
//         xhttp.send();
//     }

// })





