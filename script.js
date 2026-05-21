let hits = 0;
let mistakes = 0;
let totalAnswered = 0;

let currentQuestion = {};
let currentDifficulty = "easy";

// Rastreia perguntas já usadas por nível (sem repetição)
let usedQuestions = { easy: [], medium: [], hard: [] };

const questions = {

    easy:[

        {
            question:"Qual planeta é conhecido como o planeta vermelho?",
            options:["Marte","Terra","Júpiter","Saturno"],
            answer:"Marte"
        },

        {
            question:"Quanto é 5 + 3?",
            options:["6","7","8","9"],
            answer:"8"
        },

        {
            question:"Qual é a capital do Brasil?",
            options:["Brasília","Rio de Janeiro","São Paulo","Salvador"],
            answer:"Brasília"
        },

        {
            question:"Quantos continentes existem no mundo?",
            options:["5","6","7","8"],
            answer:"7"
        },

        {
            question:"Qual é o maior oceano do mundo?",
            options:["Atlântico","Índico","Ártico","Pacífico"],
            answer:"Pacífico"
        }

    ],

    medium:[

        {
            question:"Qual a função da mitocôndria?",
            options:[
                "Produzir energia",
                "Controlar respiração",
                "Armazenar DNA",
                "Produzir sangue"
            ],
            answer:"Produzir energia"
        },

        {
            question:"Quanto é 12 x 8?",
            options:["82","96","88","102"],
            answer:"96"
        },

        {
            question:"Quem escreveu Dom Casmurro?",
            options:[
                "Machado de Assis",
                "Clarice Lispector",
                "José de Alencar",
                "Carlos Drummond"
            ],
            answer:"Machado de Assis"
        },

        {
            question:"Em que ano o Brasil declarou independência?",
            options:["1788","1808","1822","1889"],
            answer:"1822"
        },

        {
            question:"Qual o símbolo químico do ouro?",
            options:["Or","Go","Au","Ag"],
            answer:"Au"
        }

    ],

    hard:[

        {
            question:"Qual é a principal função do RNA mensageiro?",
            options:[
                "Transportar informação genética",
                "Produzir energia",
                "Controlar hormônios",
                "Defender o organismo"
            ],
            answer:"Transportar informação genética"
        },

        {
            question:"Quanto é a raiz quadrada de 625?",
            options:["20","22","25","30"],
            answer:"25"
        },

        {
            question:"Qual filósofo escreveu 'A República'?",
            options:[
                "Platão",
                "Aristóteles",
                "Sócrates",
                "Descartes"
            ],
            answer:"Platão"
        },

        {
            question:"Qual partícula subatômica não possui carga elétrica?",
            options:["Próton","Elétron","Nêutron","Pósitron"],
            answer:"Nêutron"
        },

        {
            question:"Qual a fórmula química da glicose?",
            options:["C6H12O6","H2O","CO2","C12H22O11"],
            answer:"C6H12O6"
        }

    ]
};


function loadQuestion(){

    let list = questions[currentDifficulty];

    // Filtra perguntas ainda não usadas neste nível
    let available = list.filter(
        q => !usedQuestions[currentDifficulty].includes(q.question)
    );

    // Se todas já foram usadas, reinicia o ciclo do nível
    if(available.length === 0){
        usedQuestions[currentDifficulty] = [];
        available = list;
    }

    currentQuestion =
        available[Math.floor(Math.random() * available.length)];

    // Marca como usada
    usedQuestions[currentDifficulty].push(currentQuestion.question);

    document.getElementById("question").innerHTML =
        currentQuestion.question;

    let optionsHTML = "";

    currentQuestion.options.forEach(option => {

        optionsHTML += `
            <div class="option"
            onclick="checkAnswer(this,'${option}')">
                ${option}
            </div>
        `;
    });

    document.getElementById("options").innerHTML = optionsHTML;

    document.getElementById("feedback").innerHTML = "";
}


function checkAnswer(element, selected){

    let allOptions = document.querySelectorAll(".option");

    allOptions.forEach(option => {
        option.style.pointerEvents = "none";
    });

    totalAnswered++;

    if(selected === currentQuestion.answer){

        element.classList.add("correct");

        hits++;

        document.getElementById("hits").innerHTML = hits;

        document.getElementById("feedback").innerHTML =
            "✅ Muito bem! Você acertou.";

    }else{

        element.classList.add("wrong");

        mistakes++;

        document.getElementById("mistakes").innerHTML = mistakes;

        document.getElementById("feedback").innerHTML =
            "❌ Você errou. A resposta correta é: <strong>"
            + currentQuestion.answer + "</strong>";

        // Destaca a resposta correta em verde
        allOptions.forEach(opt => {
            if(opt.textContent.trim() === currentQuestion.answer){
                opt.classList.add("correct");
            }
        });
    }

    document.getElementById("total").innerHTML = totalAnswered;

    updateProgress();
}


function updateProgress(){

    let percentage = Math.min(totalAnswered * 10, 100);

    document.getElementById("progress").style.width =
        percentage + "%";

    document.getElementById("progTxt").innerHTML =
        percentage + "%";
}


function changeDifficulty(level){

    currentDifficulty = level;

    updateDifficulty();

    loadQuestion();
}


function updateDifficulty(){

    let level = document.getElementById("level");

    level.className = "level";

    if(currentDifficulty === "easy"){
        level.innerHTML = "Nível Fácil";
        level.classList.add("easy-level");
    }

    if(currentDifficulty === "medium"){
        level.innerHTML = "Nível Médio";
        level.classList.add("medium-level");
    }

    if(currentDifficulty === "hard"){
        level.innerHTML = "Nível Difícil";
        level.classList.add("hard-level");
    }
}


function nextQuestion(){
    loadQuestion();
}


function resetGame(){

    hits = 0;
    mistakes = 0;
    totalAnswered = 0;

    document.getElementById("hits").innerHTML = 0;
    document.getElementById("mistakes").innerHTML = 0;
    document.getElementById("total").innerHTML = 0;

    document.getElementById("progress").style.width = "0%";
    document.getElementById("progTxt").innerHTML = "0%";

    // Reseta o histórico de perguntas usadas
    usedQuestions = { easy: [], medium: [], hard: [] };

    currentDifficulty = "easy";

    document.querySelector(".select-level").value = "easy";

    updateDifficulty();

    loadQuestion();

    document.getElementById("feedback").innerHTML = "";
}


updateDifficulty();

loadQuestion();
