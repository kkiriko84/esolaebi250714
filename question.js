// 문제 데이터 (추가 문제.txt 기반)
const quizData = [
    // 예시 문제.txt 기반 문제 추가
    {
        question: '1. 다음 단어의 뜻을 구별해 주는 요소로 알맞지 않은 것은?',
        choices: [
            '① 곰, 솜 - 자음',
            '② 종, 공 - 자음',
            '③ 돌, 돈 - 모음',
            '④ 산, 선 - 모음',
            '⑤ 밥, 법 - 모음'
        ],
        answer: 0 // ① 곰, 솜 - 자음 (정답: 실제는 모음)
    },
    {
        question: '2. 국어의 음운에 대한 설명으로 적절하지 않은 것은?',
        choices: [
            '① 음운의 종류에는 자음과 모음이 있다.',
            '② 말의 뜻을 구별해 주는 소리의 단위이다.',
            '③ 모음은 공기가 그대로 흘러나오는 소리이다.',
            '④ 자음은 모음 없이 홀로 소리 낼 수 있는 음운이다.',
            '⑤ 음운에 따라 소리 낼 때의 느낌이 달라질 수 있다.'
        ],
        answer: 3 // ④ 자음은 모음 없이 홀로 소리 낼 수 있는 음운이다. (적절하지 않음)
    },
    {
        question: '3. 말의 뜻을 구별해 주는 소리의 가장 작은 단위는?',
        choices: [
            '① 음운',
            '② 음절',
            '③ 단어',
            '④ 문장',
            '⑤ 형태소'
        ],
        answer: 0 // ① 음운
    },
    {
        question: "4. '돌'의 음운 중 하나를 골라 다른 음운으로 바꾼 단어가 아닌 것은?",
        choices: [
            '① 솔',
            '② 달',
            '③ 덕',
            '④ 돈',
            '⑤ 독'
        ],
        answer: 2 // ③ 덕 (정답: 음운 하나만 바꾼 것이 아님)
    },
    {
        question: '5. 음운에 대한 설명으로 알맞지 않은 것은?',
        choices: [
            '① 단어의 음운을 바꾸어 쓰면 의미가 달라진다.',
            '② 우리말의 음운은 자음과 모음으로 이루어진다.',
            '③ 자음은 공기가 방해를 받으며 나오는 소리이다.',
            '④ 말의 뜻을 구별해 주는 소리의 가장 작은 단위이다.',
            '⑤ 모음은 홀로 소리 낼 수 없어 자음을 만나야만 소리를 낼 수 있다.'
        ],
        answer: 4 // ⑤ 모음은 홀로 소리 낼 수 없어 자음을 만나야만 소리를 낼 수 있다. (정답: 모음은 홀로 소리 낼 수 있음)
    },
    // 기존 추가 문제.txt 기반 문제
    {
        question: '6. 단어에 사용된 음운의 개수가 잘못 연결된 것은?',
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
        question: '7. 다음 중 국어의 자음에 대한 설명으로 적절하지 않은 것은?',
        choices: [
            '① 자음의 개수는 모두 19개이다.',
            '② 모음을 만나야 소리 낼 수 있다.',
            '③ 공기가 방해를 받으며 나오는 소리이다.',
            '④ 입안의 공명 현상을 거쳐서 나온다는 특징이 있다.',
            '⑤ 말의 뜻을 구별해 주는 소리의 가장 작은 단위에 속한다.'
        ],
        answer: 3 // ④ 입안의 공명 현상을 거쳐서 나온다는 특징이 있다. (적절하지 않음)
    }
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
