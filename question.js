// 문제 데이터 (추가 문제.txt 기반)
const quizData = [
    {
        question: '1. 단어에 사용된 음운의 개수가 잘못 연결된 것은?',
        choices: [
            '① 누나 - 4개',
            '② 까꿍 - 6개',
            '③ 동생 - 6개',
            '④ 외삼촌 - 7개',
            '⑤ 할머니 - 7개'
        ],
        answer: 1 // ② 까꿍 - 6개 (정답: 실제는 4개)
    },
    {
        question: '2. 다음 중 국어의 자음에 대한 설명으로 적절하지 않은 것은?',
        choices: [
            '① 자음의 개수는 모두 19개이다.',
            '② 모음을 만나야 소리 낼 수 있다.',
            '③ 공기가 방해를 받으며 나오는 소리이다.',
            '④ 입안의 공명 현상을 거쳐서 나온다는 특징이 있다.',
            '⑤ 말의 뜻을 구별해 주는 소리의 가장 작은 단위에 속한다.'
        ],
        answer: 3 // ④ 입안의 공명 현상을 거쳐서 나온다는 특징이 있다. (적절하지 않음)
    }
    // 문제를 더 추가할 수 있습니다.
];

let current = 0;
let score = 0;
let selected = null;

const questionNumber = document.getElementById('question-number');
const questionText = document.getElementById('question-text');
const choicesList = document.getElementById('choices');
const nextBtn = document.getElementById('next-btn');
const resultBox = document.getElementById('result-box');
const quizBox = document.getElementById('quiz-box');
const scoreText = document.getElementById('score');
const restartBtn = document.getElementById('restart-btn');

function loadQuestion() {
    const q = quizData[current];
    questionNumber.textContent = `문제 ${current + 1} / ${quizData.length}`;
    questionText.textContent = q.question;
    choicesList.innerHTML = '';
    selected = null;
    nextBtn.disabled = true;
    q.choices.forEach((choice, idx) => {
        const li = document.createElement('li');
        const btn = document.createElement('button');
        btn.textContent = choice;
        btn.className = 'choice-btn';
        btn.onclick = () => selectChoice(idx, btn);
        li.appendChild(btn);
        choicesList.appendChild(li);
    });
}

function selectChoice(idx, btn) {
    if (selected !== null) return;
    selected = idx;
    const q = quizData[current];
    const btns = document.querySelectorAll('.choice-btn');
    btns.forEach((b, i) => {
        b.classList.remove('selected', 'correct', 'incorrect');
        if (i === idx) b.classList.add('selected');
    });
    nextBtn.disabled = false;
    // 정답 체크
    if (idx === q.answer) {
        btn.classList.add('correct');
        score++;
    } else {
        btn.classList.add('incorrect');
        btns[q.answer].classList.add('correct');
    }
}

nextBtn.onclick = () => {
    current++;
    if (current < quizData.length) {
        loadQuestion();
    } else {
        showResult();
    }
};

function showResult() {
    quizBox.style.display = 'none';
    resultBox.style.display = 'block';
    scoreText.textContent = `맞힌 개수: ${score} / ${quizData.length}`;
}

restartBtn.onclick = () => {
    current = 0;
    score = 0;
    quizBox.style.display = 'block';
    resultBox.style.display = 'none';
    loadQuestion();
};

// 첫 문제 로드
window.onload = loadQuestion;
