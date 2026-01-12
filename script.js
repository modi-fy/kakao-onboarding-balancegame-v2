// 질문 데이터
const questions = [
    // 1구간 (R/I) - 가치관
    {
        text: "지금 바로 레이 vs 5년 후 벤츠",
        left: { text: "지금 바로 레이", value: "R" },
        right: { text: "5년 후 벤츠", value: "I" }
    },
    {
        text: "100% 확률로 5천만 원 vs 1% 확률로 5억",
        left: { text: "100% 확률로 5천만 원", value: "R" },
        right: { text: "1% 확률로 5억", value: "I" }
    },
    {
        text: "내 흑역사 전부 삭제 vs 로또 번호 0.05초 보기",
        left: { text: "내 흑역사 전부 삭제", value: "R" },
        right: { text: "로또 번호 0.05초 보기", value: "I" }
    },
    {
        text: "재벌 2세랑 결혼인데 매일 싸움 vs 백수랑 결혼인데 영혼의 단짝",
        left: { text: "재벌 2세랑 결혼인데 매일 싸움", value: "R" },
        right: { text: "백수랑 결혼인데 영혼의 단짝", value: "I" }
    },
    {
        text: "배송예정일 미정 맛집 두쫀쿠 주문 vs 후기 0개 두쫀쿠 주문",
        left: { text: "배송예정일 미정 맛집 두쫀쿠", value: "I" },
        right: { text: "후기 0개 두쫀쿠", value: "R" }
    },
    // 2구간 (S/A) - 라이프스타일
    {
        text: "평생 내 방에서만 생존 (배달은 됨) vs 평생 밖에서만 생존 (집 출입 금지)",
        left: { text: "평생 내 방에서만 (배달은 됨)", value: "S" },
        right: { text: "평생 밖에서만 (집 출입 금지)", value: "A" }
    },
    {
        text: "평생 백반집 한 곳만 vs 매끼 새로운 음식점 (웨이팅 필수)",
        left: { text: "평생 백반집 한 곳만", value: "S" },
        right: { text: "매끼 새로운 음식점 (웨이팅 필수)", value: "A" }
    },
    {
        text: "10년째 레고만 조립 vs 무조건 매달 새 취미 입문",
        left: { text: "10년째 레고만 조립", value: "S" },
        right: { text: "무조건 매달 새 취미 입문", value: "A" }
    },
    {
        text: "라면 물 무조건 550ml 계량 vs 대충 물 붓기",
        left: { text: "라면 물 무조건 550ml 계량", value: "S" },
        right: { text: "대충 물 붓기", value: "A" }
    },
    {
        text: "태어난 동네에서 무덤까지 vs 1년마다 다른 나라로 강제 이사",
        left: { text: "태어난 동네에서 무덤까지", value: "S" },
        right: { text: "1년마다 다른 나라로 강제 이사", value: "A" }
    }
];

// 결과 유형 데이터
const results = {
    RS: {
        type: "RS",
        name: "서울 자가 대기업 김부장냥이",
        image: "images/RS.png",
        partner: "RA",
        partnerName: "레이타고 전국일주 모험냥이"
    },
    RA: {
        type: "RA",
        name: "레이타고 전국일주 모험냥이",
        image: "images/RA.png",
        partner: "RS",
        partnerName: "서울 자가 대기업 김부장냥이"
    },
    IS: {
        type: "IS",
        name: "로또사고 집콕 몽상냥이",
        image: "images/IS.png",
        partner: "IA",
        partnerName: "인생은 한방 타짜냥이"
    },
    IA: {
        type: "IA",
        name: "인생은 한방 타짜냥이",
        image: "images/IA.png",
        partner: "IS",
        partnerName: "로또사고 집콕 몽상냥이"
    }
};

// 게임 상태
let currentQuestion = 0;
let scores = {
    R: 0,
    I: 0,
    S: 0,
    A: 0
};

// DOM 요소
const startScreen = document.getElementById('start-screen');
const questionScreen = document.getElementById('question-screen');
const resultScreen = document.getElementById('result-screen');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const choiceLeft = document.getElementById('choice-left');
const choiceRight = document.getElementById('choice-right');
const questionText = document.getElementById('question-text');
const progressFill = document.getElementById('progress-fill');
const progressText = document.getElementById('progress-text');
const resultImage = document.getElementById('result-image');
const resultType = document.getElementById('result-type');
const resultName = document.getElementById('result-name');
const partnerImage = document.getElementById('partner-image');
const partnerType = document.getElementById('partner-type');

// 화면 전환
function showScreen(screen) {
    startScreen.classList.remove('active');
    questionScreen.classList.remove('active');
    resultScreen.classList.remove('active');
    screen.classList.add('active');
}

// 질문 표시
function showQuestion() {
    const q = questions[currentQuestion];
    questionText.textContent = q.text;
    choiceLeft.textContent = q.left.text;
    choiceRight.textContent = q.right.text;

    // 진행률 업데이트
    const progress = ((currentQuestion) / questions.length) * 100;
    progressFill.style.width = `${progress}%`;
    progressText.textContent = `${currentQuestion + 1} / ${questions.length}`;
}

// 선택 처리
function handleChoice(choice) {
    const q = questions[currentQuestion];
    const value = choice === 'left' ? q.left.value : q.right.value;
    scores[value]++;

    currentQuestion++;

    if (currentQuestion >= questions.length) {
        showResult();
    } else {
        showQuestion();
    }
}

// 결과 계산 및 표시
function showResult() {
    // 1구간: R vs I
    const firstLetter = scores.R >= scores.I ? 'R' : 'I';
    // 2구간: S vs A
    const secondLetter = scores.S >= scores.A ? 'S' : 'A';

    const resultCode = firstLetter + secondLetter;
    const result = results[resultCode];

    resultImage.src = result.image;
    resultType.textContent = result.type;
    resultName.textContent = result.name;
    partnerImage.src = results[result.partner].image;
    partnerType.textContent = `${result.partner} - ${result.partnerName}`;

    showScreen(resultScreen);
}

// 게임 초기화
function resetGame() {
    currentQuestion = 0;
    scores = { R: 0, I: 0, S: 0, A: 0 };
}

// 이벤트 리스너
startBtn.addEventListener('click', () => {
    resetGame();
    showScreen(questionScreen);
    showQuestion();
});

restartBtn.addEventListener('click', () => {
    resetGame();
    showScreen(startScreen);
});

choiceLeft.addEventListener('click', () => handleChoice('left'));
choiceRight.addEventListener('click', () => handleChoice('right'));
