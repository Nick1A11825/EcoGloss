// Banco de dados contendo as perguntas do quiz de forma estruturada
const quizDatabase = [
    {
        question: "Qual o maior obstáculo para a reciclagem de embalagens convencionais de gloss?",
        options: [
            "O tamanho reduzido e a mistura complexa de materiais (acrílicos, metais e esponjas).",
            "O fato de o vidro temperado não poder ser derretido novamente.",
            "As cores fortes das embalagens que impedem a triagem óptica automatizada."
        ],
        correct: 0
    },
    {
        question: "Na indústria cosmética limpa (Green Chemistry), que ativos substituem os compostos derivados do petróleo?",
        options: [
            "Polímeros plásticos purificados e silicones sintéticos de alta durabilidade.",
            "Óleos vegetais nobres prensados a frio e ceras naturais biodegradáveis.",
            "Soluções aquosas enriquecidas com corantes artificiais e conservantes pesados."
        ],
        correct: 1
    },
    {
        question: "Por que a mineração convencional da Mica (que dá brilho ao cosmético) gera preocupações éticas?",
        options: [
            "Porque ela emite radiação nociva durante o manuseio no laboratório.",
            "Porque frequentemente envolve trabalho infantil e condições análogas à escravidão em minas ilegais.",
            "Porque altera permanentemente o sabor e fixação do gloss nos lábios."
        ],
        correct: 2
    },
    {
        question: "Qual ação prática caracteriza o comportamento de consumo responsável por parte do cliente?",
        options: [
            "Comprar todas as edições sazonais e limitadas das marcas para colecionar.",
            "Descartar o produto na metade do frasco para adquirir uma fórmula mais nova.",
            "Adotar produtos multifuncionais, usar até o final e participar de programas de logística reversa."
        ],
        correct: 3
    }
];

let activeQuestionIndex = 0;
let finalScore = 0;

// Mapeamento dos elementos gráficos do HTML via DOM
const questionEl = document.getElementById('quiz-question');
const optionsContainerEl = document.getElementById('quiz-options');
const nextButtonEl = document.getElementById('btn-next');
const resultDisplayEl = document.getElementById('quiz-result');
const progressBarEl = document.getElementById('progress-bar');

function startQuiz() {
    activeQuestionIndex = 0;
    finalScore = 0;
    resultDisplayEl.innerText = "";
    displayQuestion();
}

function displayQuestion() {
    clearOptionsState();
    
    // Atualização matemática e visual da barra de progresso do quiz
    const actualProgress = (activeQuestionIndex / quizDatabase.length) * 100;
    progressBarEl.style.width = `${actualProgress}%`;

    const currentData = quizDatabase[activeQuestionIndex];
    questionEl.innerText = `${activeQuestionIndex + 1}. ${currentData.question}`;

    // Laço para renderizar as opções estruturadas em botões
    currentData.options.forEach((optionText, index) => {
        const optionButton = document.createElement('button');
        optionButton.innerText = optionText;
        optionButton.classList.add('quiz-btn');
        optionButton.addEventListener('click', () => evaluateSelection(optionButton, index));
        optionsContainerEl.appendChild(optionButton);
    });
}

function clearOptionsState() {
    nextButtonEl.style.display = 'none';
    optionsContainerEl.innerHTML = '';
}

function evaluateSelection(selectedButton, indexChosen) {
    const correctAnswerIndex = quizDatabase[activeQuestionIndex].correct;
    const totalOptionsElements = optionsContainerEl.children;

    // Desativa a possibilidade de múltiplos cliques após a primeira escolha
    for (let buttonElement of totalOptionsElements) {
        buttonElement.style.pointerEvents = 'none';
    }

    if (indexChosen === correctAnswerIndex) {
        selectedButton.classList.add('correct-choice');
        finalScore++;
    } else {
        selectedButton.classList.add('incorrect-choice');
        // Exibe didaticamente a opção correta para fixação do conteúdo
        totalOptionsElements[correctAnswerIndex].classList.add('correct-choice');
    }

    nextButtonEl.style.display = 'block';
}

// Ouvinte de evento anexado ao botão para avançar etapas
nextButtonEl.addEventListener('click', () => {
    activeQuestionIndex++;
    if (activeQuestionIndex < quizDatabase.length) {
        displayQuestion();
    } else {
        renderFinalSummary();
    }
});

function renderFinalSummary() {
    clearOptionsState();
    progressBarEl.style.width = '100%';
    questionEl.innerText = "Parabéns por concluir a avaliação!";
    
    let feedbackPhrase = "";
    if (finalScore === quizDatabase.length) {
        feedbackPhrase = "✨ Excelente! Você possui plena consciência socioambiental e sabe escolher seus cosméticos de forma ética.";
    } else if (finalScore >= quizDatabase.length / 2) {
        feedbackPhrase = "🌿 Bom progresso! Você demonstra bons hábitos estruturais, mas vale a pena ler mais sobre a logística reversa.";
    } else {
        feedbackPhrase = "🔍 É hora de repensar! Procure marcas transparentes e busque reduzir o descarte precoce de embalagens plásticas.";
    }

    resultDisplayEl.innerHTML = `<p>Sua pontuação: <strong>${finalScore} de ${quizDatabase.length} acertos</strong>.</p>
                                 <p style="font-size: 0.95rem; font-weight: normal; margin-top: 12px; color: #554044;">${feedbackPhrase}</p>`;
}

// Execução inicializada do Quiz após o carregamento estrutural
startQuiz();
