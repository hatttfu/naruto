const btnNext = document.querySelector('.btn-next'),
      modalNext = document.querySelector('.modal-next'),
      answers = document.querySelectorAll('.answer'),
      title = document.querySelector('.title'),
      picture = document.querySelector('.info-img'),
      number = document.querySelector('.number'),
      results = document.querySelector('.results'),
      pointsBlock = document.querySelector('.points'),
      modal = document.querySelector('.modal'),
      body = document.getElementById('body'),
      reactionImg = document.querySelector('.reaction'),
      introText = document.querySelector('.intro-text'),
      noteText = document.querySelector('.note');


let i = -1;

let points = 0;

//gifs

function gifsCorrect() {
    body.classList.add('lock');
    modal.classList.remove('hidden');
    modal.style.backgroundColor = "#2ecc71";
    
    reactionImg.src = "../../gifs/correct.gif";
    noteText.innerHTML = "Верно!"

    modalClose();
}

function gifsIncorrect() {
    body.classList.add('lock');
    modal.classList.remove('hidden');
    modal.style.backgroundColor = "#e74c3c";
    reactionImg.src = "../../gifs/incorrect.gif";
    noteText.innerHTML = "Неверно!"

    modalClose();
}

function modalClose() {
    body.addEventListener('click', event => {
        if (!event.target.closest('.modal')) {
            body.classList.remove('lock');
            modal.classList.add('hidden');
        }
    })
}

body.addEventListener('click', event => {
    if (event.target.closest('.btn-next') || event.target.closest('.modal-next')) {
        console.log(points);
        body.classList.remove('lock');
        modal.classList.add('hidden');
        introText.classList.add('hidden');
        i++;

        //display block elements

        number.style.display = "block";
        title.style.display = "block";

        answers.forEach(answer => {
            answer.style.display = "block";
        });

        //замена текста кнопки

        btnNext.classList.remove('center');
        btnNext.innerHTML = "Дальше"

        //сброс цвета ответов

        document.querySelectorAll('.answer').forEach(answer => {
                answer.style.backgroundColor = "transparent";    
        });

        //сброс запрета кликов

        document.getElementById("first").style.pointerEvents = "auto"; 
        document.getElementById("second").style.pointerEvents = "auto";  
        document.getElementById("third").style.pointerEvents = "auto";  

        //исчезновение картинки

        picture.classList.add('hidden');

        //запрос json

        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
            // Typical action to be performed when the document is ready:
                if (JSON.parse(xhttp.responseText).length > i) {

                    if (typeof JSON.parse(xhttp.responseText)[i].picture !== 'undefined') {
                        //picture
                        picture.classList.remove('hidden');
                        picture.src = JSON.parse(xhttp.responseText)[i].picture;
                    }

                    if (typeof JSON.parse(xhttp.responseText)[i].answerImg !== 'undefined') {
                        //amswerImg
                        reactionImg.src = JSON.parse(xhttp.responseText)[i].answerImg; 
                    }

                    //number
                    document.getElementById("id").innerHTML = JSON.parse(xhttp.responseText)[i].id;

                    //title
                    document.getElementById("title").innerHTML = JSON.parse(xhttp.responseText)[i].title;

                    //answers
                    document.getElementById("first").innerHTML = JSON.parse(xhttp.responseText)[i].answers[0].text;

                    document.getElementById("second").innerHTML = JSON.parse(xhttp.responseText)[i].answers[1].text;

                    document.getElementById("third").innerHTML = JSON.parse(xhttp.responseText)[i].answers[2].text;

                }

                //correct answer

                document.body.addEventListener('click', event => {

                    switch (event.target.closest('.answer')) {

                        case document.getElementById("first"):

                            if (JSON.parse(xhttp.responseText)[i].answers[0].isCorrect) {
                                    
                                event.target.closest('.answer').style.backgroundColor = "green";

                                points++;

                                gifsCorrect()

                            } else {           
                                    event.target.closest('.answer').style.backgroundColor = "red";

                                    gifsIncorrect()
                            }

                            document.getElementById("second").style.pointerEvents = "none"; 
                            document.getElementById("third").style.pointerEvents = "none"; 
                            
                            break;

                        case document.getElementById("second"):

                            if (JSON.parse(xhttp.responseText)[i].answers[1].isCorrect) {
                                    
                                event.target.closest('.answer').style.backgroundColor = "green";

                                points++;

                                gifsCorrect()

                            } else {           
                                event.target.closest('.answer').style.backgroundColor = "red";

                                gifsIncorrect()
                            }

                            document.getElementById("first").style.pointerEvents = "none"; 
                            document.getElementById("third").style.pointerEvents = "none";     

                            break;
                            
                        case document.getElementById("third"):

                            if (JSON.parse(xhttp.responseText)[i].answers[2].isCorrect) {
                                    
                                event.target.closest('.answer').style.backgroundColor = "green";

                                points++;

                                gifsCorrect()

                            } else {           
                                event.target.closest('.answer').style.backgroundColor = "red";

                                gifsIncorrect()
                            }

                            document.getElementById("first").style.pointerEvents = "none"; 
                            document.getElementById("second").style.pointerEvents = "none";          

                            break;                        

                    }

                    
                
                })

                if (JSON.parse(xhttp.responseText).length === i + 1 ) {
                
                    btnNext.innerHTML = "Результаты";
                    modalNext.innerHTML = "Результаты";
                }

                if (i === JSON.parse(xhttp.responseText).length) {
                    console.log('последний вопрос')
                    
                            results.style.display = "block";

                            number.style.display = "none";
                            title.style.display = "none";
                            btnNext.style.display = "none";

                            answers.forEach(answer => {
                                answer.style.display = "none";
                            });

                            console.log(points)
                            pointsBlock.innerHTML = `Заработано очков: ${points}`                    
                }
                        
            }
        };   
            
        xhttp.open("GET", "questions.json", true);
        xhttp.send();
    }

})





