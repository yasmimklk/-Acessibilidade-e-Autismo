
/* SEMÁFORO INTERATIVO */

const lightButtons = document.querySelectorAll(".light-card");
const messageBox = document.getElementById("light-message");

const messages = {

    red: {
        title: "🔴 Vermelho — Pare e reavalie",
        color: "#dc2626",
        subtitle: "EVITE ESSAS ATITUDES",
        items: [
            "Não grite ou pressione para obter uma resposta.",
            "Não desrespeite o tempo e os limites da pessoa.",
            "Não utilize textos confusos ou difíceis de entender.",
            "Não presuma que todas as pessoas autistas são iguais."
        ]
    },

    yellow: {
        title: "🟡 Amarelo — Atenção e adaptação",
        color: "#a87900",
        subtitle: "OBSERVE E ADAPTE",
        items: [
            "Verifique se a explicação foi compreendida.",
            "Reduza informações excessivas na tela.",
            "Evite estímulos visuais desnecessários.",
            "Ofereça alternativas de comunicação."
        ]
    },

    green: {
        title: "🟢 Verde — Comunicação acolhedora",
        color: "#16a34a",
        subtitle: "PODE CONTINUAR",
        items: [
            "Fale com respeito e clareza.",
            "Dê tempo para a pessoa responder.",
            "Utilize imagens, textos e instruções objetivas.",
            "Respeite as diferentes formas de comunicação."
        ]
    }

};

lightButtons.forEach(button => {

    button.addEventListener("click", () => {

        const color = button.dataset.color;
        const data = messages[color];

        lightButtons.forEach(item => {
            item.classList.remove("selected");
        });

        button.classList.add("selected");

        const title = document.createElement("h3");
        title.textContent = data.title;

        const subtitle = document.createElement("p");
        subtitle.textContent = data.subtitle;
        subtitle.style.fontWeight = "bold";
        subtitle.style.color = data.color;
        subtitle.style.marginBottom = "12px";

        const list = document.createElement("ul");

        data.items.forEach(item => {
            const li = document.createElement("li");
            li.textContent = item;
            list.appendChild(li);
        });

        messageBox.replaceChildren(title, subtitle, list);
        messageBox.style.borderLeftColor = data.color;

    });

});


/* QUIZ EDUCATIVO */

const questions = [

    {
        question: "1. O que é acessibilidade digital?",
        answers: [
            "Criar sites somente para computadores.",
            "Permitir que diferentes pessoas utilizem conteúdos e serviços digitais.",
            "Utilizar somente imagens coloridas."
        ],
        correct: 1,
        explanation: "A acessibilidade digital permite que todas as pessoas possam acessar e utilizar conteúdos digitais."
    },

    {
        question: "2. Como devemos nos comunicar com uma pessoa autista?",
        answers: [
            "Falar com clareza e respeitar seu tempo.",
            "Gritar para chamar sua atenção.",
            "Exigir respostas imediatas."
        ],
        correct: 0,
        explanation: "A comunicação deve respeitar as necessidades e o tempo de cada pessoa."
    },

    {
        question: "3. O que representa a luz verde?",
        answers: [
            "Evitar a comunicação.",
            "Comunicação acolhedora.",
            "Ignorar as diferenças."
        ],
        correct: 1,
        explanation: "A luz verde representa atitudes positivas e uma comunicação acolhedora."
    },

    {
        question: "4. O que devemos fazer quando precisamos adaptar a comunicação?",
        answers: [
            "Insistir sempre na mesma explicação.",
            "Ignorar as dificuldades.",
            "Observar e oferecer alternativas."
        ],
        correct: 2,
        explanation: "A luz amarela ensina a observar as necessidades e adaptar a comunicação."
    },

    {
        question: "5. Por que não devemos depender apenas das cores em um site?",
        answers: [
            "Porque algumas pessoas podem ter dificuldade em distinguir cores.",
            "Porque as cores não podem ser utilizadas.",
            "Porque os sites não precisam de informações."
        ],
        correct: 0,
        explanation: "Textos, ícones e descrições também são importantes para transmitir informações."
    },

    {
        question: "6. Qual atitude deve ser evitada?",
        answers: [
            "Respeitar o tempo de resposta.",
            "Utilizar instruções objetivas.",
            "Pressionar a pessoa para responder."
        ],
        correct: 2,
        explanation: "Pressionar ou desrespeitar os limites da pessoa não é uma atitude inclusiva."
    },

    {
        question: "7. Para que serve o GitHub?",
        answers: [
            "Somente para editar fotografias.",
            "Para armazenar, organizar e compartilhar projetos de programação.",
            "Para substituir o HTML."
        ],
        correct: 1,
        explanation: "O GitHub permite armazenar e compartilhar códigos e projetos."
    },

    {
        question: "8. Qual é o principal objetivo do projeto?",
        answers: [
            "Avaliar o comportamento das pessoas autistas.",
            "Ensinar que todas as pessoas são iguais.",
            "Promover respeito, comunicação e inclusão."
        ],
        correct: 2,
        explanation: "O projeto busca conscientizar sobre acessibilidade, respeito e inclusão."
    }

];


/* ELEMENTOS DO QUIZ */

const questionNumber = document.getElementById("question-number");
const questionTitle = document.getElementById("question");
const answersContainer = document.getElementById("answers");
const feedback = document.getElementById("feedback");

const nextButton = document.getElementById("next-button");
const quizContent = document.getElementById("quiz-content");
const quizResult = document.getElementById("quiz-result");

const scoreText = document.getElementById("score");
const restartButton = document.getElementById("restart-button");


/* CONTROLE DO QUIZ */

let currentQuestion = 0;
let score = 0;
let answered = false;


/* MOSTRAR PERGUNTA */

function showQuestion() {

    answered = false;

    const current = questions[currentQuestion];

    questionNumber.textContent =
        `Pergunta ${currentQuestion + 1} de ${questions.length}`;

    questionTitle.textContent = current.question;

    answersContainer.replaceChildren();

    feedback.textContent = "";

    nextButton.disabled = true;

    current.answers.forEach((answer, index) => {

        const button = document.createElement("button");

        button.className = "answer-button";
        button.textContent = answer;

        button.addEventListener("click", () => {
            checkAnswer(index);
        });

        answersContainer.appendChild(button);

    });

}


/* CORRIGIR RESPOSTA */

function checkAnswer(selected) {

    if (answered) return;

    answered = true;

    const current = questions[currentQuestion];

    const buttons = answersContainer.querySelectorAll("button");

    buttons.forEach((button, index) => {

        button.disabled = true;

        if (index === current.correct) {
            button.classList.add("correct");
        }

        if (index === selected && selected !== current.correct) {
            button.classList.add("wrong");
        }

    });

    if (selected === current.correct) {

        score++;

        feedback.textContent = "✅ Resposta correta! " +
            current.explanation;

        feedback.style.color = "#15803d";

    } else {

        feedback.textContent = "❌ Resposta incorreta. " +
            current.explanation;

        feedback.style.color = "#dc2626";

    }

    nextButton.disabled = false;

}


/* PRÓXIMA PERGUNTA */

nextButton.addEventListener("click", () => {

    currentQuestion++;

    if (currentQuestion < questions.length) {

        showQuestion();

    } else {

        showResult();

    }

});


/* RESULTADO */

function showResult() {

    quizContent.hidden = true;
    quizResult.hidden = false;

    scoreText.textContent =
        `Você acertou ${score} de ${questions.length} perguntas!`;

    const percentage = (score / questions.length) * 100;

    const resultMessage = document.createElement("p");

    if (percentage === 100) {
        resultMessage.textContent =
            "Excelente! Você demonstrou conhecer muito bem a acessibilidade e a inclusão.";
    } else if (percentage >= 60) {
        resultMessage.textContent =
            "Muito bem! Continue aprendendo sobre respeito e comunicação inclusiva.";
    } else {
        resultMessage.textContent =
            "Continue estudando! Aprender sobre inclusão é importante para todos.";
    }

    quizResult.insertBefore(resultMessage, restartButton);

}


/* REINICIAR */

restartButton.addEventListener("click", () => {

    currentQuestion = 0;
    score = 0;

    quizResult.hidden = true;
    quizContent.hidden = false;

    const oldMessage = quizResult.querySelector("p:not(#score)");

    if (oldMessage) {
        oldMessage.remove();
    }

    showQuestion();

});


/* INICIAR QUIZ */

showQuestion();
