// API 키 관리
let OPENAI_API_KEY = localStorage.getItem('openai_api_key') || '';

// API 키 저장
function saveApiKey() {
    const apiKey = document.getElementById('apiKey').value.trim();
    if (apiKey) {
        OPENAI_API_KEY = apiKey;
        localStorage.setItem('openai_api_key', apiKey);
        showToast('API 키가 저장되었습니다!', 'success');
    }
}

// API 키 표시/숨기기 토글
function toggleApiKeyVisibility() {
    const apiKeyInput = document.getElementById('apiKey');
    const eyeIcon = document.querySelector('#apiKeySection .bi-eye');
    if (apiKeyInput.type === 'password') {
        apiKeyInput.type = 'text';
        eyeIcon.classList.replace('bi-eye', 'bi-eye-slash');
    } else {
        apiKeyInput.type = 'password';
        eyeIcon.classList.replace('bi-eye-slash', 'bi-eye');
    }
}

// 다크 모드 설정
const darkModeToggle = document.getElementById('darkModeToggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// 사용자의 테마 설정 불러오기
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.body.setAttribute('data-theme', savedTheme);
    darkModeToggle.checked = savedTheme === 'dark';
} else {
    darkModeToggle.checked = prefersDarkScheme.matches;
    if (prefersDarkScheme.matches) {
        document.body.setAttribute('data-theme', 'dark');
    }
}

// 다크 모드 토글 이벤트
darkModeToggle.addEventListener('change', function() {
    if (this.checked) {
        document.body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }
});

// 데모 루틴 데이터
const demoRoutines = {
    "맑음_happy": `1. 아침 루틴 (6:00 - 9:00)
- 일출과 함께 상쾌한 조깅 30분
- 테라스에서 따뜻한 모닝 커피
- 가벼운 요가 스트레칭

2. 오전 활동 (9:00 - 12:00)
- 창가에서 집중력 있는 업무/공부
- 10분 명상으로 긍정 에너지 충전
- 좋아하는 음악과 함께하는 업무

3. 점심 시간 (12:00 - 14:00)
- 공원에서 도시락 피크닉
- 가벼운 산책
- 좋아하는 책 읽기

4. 오후 활동 (14:00 - 18:00)
- 카페에서 창의적인 작업
- 친구와 영상 통화
- 취미 프로젝트 진행

5. 저녁 루틴 (18:00 - 22:00)
- 가벼운 저녁 식사
- 감사 일기 작성
- 아로마 캔들과 함께하는 반신욕`,
    "비_sad": `1. 아침 루틴 (6:00 - 9:00)
- 따뜻한 차 한잔과 함께 명상
- 실내 스트레칭으로 몸 깨우기
- 영양가 있는 따뜻한 아침 식사

2. 오전 활동 (9:00 - 12:00)
- 비 소리를 배경음으로 독서
- 실내 정리정돈으로 마음 정돈
- 따뜻한 음료와 함께 일기 쓰기

3. 점심 시간 (12:00 - 14:00)
- 온기 있는 수프 요리
- 좋아하는 음악 감상
- 창가에서 비 구경하며 휴식

4. 오후 활동 (14:00 - 18:00)
- 온라인 강의나 배움 활동
- 친구에게 안부 연락하기
- 실내 취미 활동 (그림, 공예 등)

5. 저녁 루틴 (18:00 - 22:00)
- 따뜻한 허브티와 함께 하는 독서
- 아늑한 조명 아래 음악 감상
- 푹신한 이불 속에서 감상적인 영화 감상`
};

// 감정별 맞춤 루틴과 해결 방안
const emotionalRoutines = {
    happy: {
        title: "행복한 마음 루틴 😊",
        morning: {
            title: "🌅 활기찬 아침 루틴 (06:00 - 09:00)",
            activities: [
                "밝은 음악과 함께 스트레칭",
                "감사일기 작성하기",
                "활력 있는 아침 식사"
            ]
        },
        afternoon: {
            title: "☀️ 즐거운 오후 루틴 (12:00 - 15:00)",
            activities: [
                "좋아하는 사람과 대화하기",
                "취미 활동 즐기기",
                "작은 목표 달성하기"
            ]
        },
        evening: {
            title: "🌙 여유로운 저녁 루틴 (19:00 - 22:00)",
            activities: [
                "하루의 행복했던 순간 되돌아보기",
                "가족과 시간 보내기",
                "편안한 음악 감상"
            ]
        },
        tips: [
            "행복한 감정을 주변과 나누어보세요",
            "긍정적인 순간들을 기록해보세요",
            "감사한 일들을 떠올려보세요"
        ],
        activities: [
            "좋아하는 음악 듣기",
            "산책하기",
            "친구와 대화하기",
            "취미 활동하기"
        ]
    },
    sad: {
        title: "마음 치유 루틴 💝",
        morning: {
            title: "🌅 포근한 아침 루틴 (06:00 - 09:00)",
            activities: [
                "따뜻한 차 한잔과 함께 깊은 호흡하기",
                "창가에서 5분간 스트레칭하기",
                "좋아하는 음악 들으며 가벼운 운동하기"
            ]
        },
        afternoon: {
            title: "☀️ 위로의 오후 루틴 (12:00 - 15:00)",
            activities: [
                "15분 동안 햇살 받으며 산책하기",
                "마음을 달래주는 따뜻한 음식 먹기",
                "좋아하는 취미 활동 30분 하기"
            ]
        },
        evening: {
            title: "🌙 마음 정리 루틴 (19:00 - 22:00)",
            activities: [
                "감정 일기 작성하기",
                "아로마 테라피와 함께 명상하기",
                "따뜻한 반신욕으로 하루 마무리"
            ]
        },
        tips: [
            "혼자 있는 시간을 줄이고 주변 사람들과 소통하세요",
            "작은 성취감을 느낄 수 있는 일부터 시작해보세요",
            "자연과 함께하는 시간을 가져보세요"
        ],
        activities: [
            "좋아하는 반려동물과 시간 보내기",
            "정원 가꾸기나 식물 돌보기",
            "가벼운 요가나 스트레칭",
            "그림 그리기나 색칠하기"
        ]
    },
    angry: {
        title: "분노 다스리기 루틴 🧘‍♂️",
        morning: {
            title: "🌅 에너지 조절 루틴 (06:00 - 09:00)",
            activities: [
                "격한 운동으로 에너지 해소하기",
                "차가운 물로 세안하며 마음 가라앉히기",
                "명상과 함께하는 호흡 운동"
            ]
        },
        afternoon: {
            title: "☀️ 마음 진정 루틴 (12:00 - 15:00)",
            activities: [
                "조용한 장소에서 깊은 호흡하기",
                "시원한 음료와 함께 휴식하기",
                "감정 정리를 위한 글쓰기"
            ]
        },
        evening: {
            title: "🌙 평화로운 저녁 루틴 (19:00 - 22:00)",
            activities: [
                "잔잔한 음악과 함께 스트레칭",
                "따뜻한 허브티 마시기",
                "감정 해소를 위한 일기 쓰기"
            ]
        },
        tips: [
            "즉각적인 반응을 하기 전에 10까지 숫자를 세어보세요",
            "상황에서 잠시 벗어나 진정할 시간을 가지세요",
            "분노의 근본 원인을 찾아보세요"
        ],
        activities: [
            "격렬한 운동으로 에너지 해소하기",
            "드럼이나 악기 연주하기",
            "샌드백 치기",
            "달리기나 자전거 타기"
        ]
    },
    anxious: {
        title: "불안 완화 루틴 🍃",
        morning: {
            title: "🌅 안정감 있는 아침 루틴 (06:00 - 09:00)",
            activities: [
                "5-4-3-2-1 감각 인식 운동하기",
                "차분한 음악과 함께 요가하기",
                "마음을 정리하는 아침 일기쓰기"
            ]
        },
        afternoon: {
            title: "☀️ 평온한 오후 루틴 (12:00 - 15:00)",
            activities: [
                "규칙적인 호흡 운동하기",
                "불안한 생각 기록하고 분석하기",
                "짧은 산책으로 환기하기"
            ]
        },
        evening: {
            title: "🌙 편안한 저녁 루틴 (19:00 - 22:00)",
            activities: [
                "라벤더 향과 함께하는 명상",
                "따뜻한 허브티 마시기",
                "감사한 일 3가지 적기"
            ]
        },
        tips: [
            "현재 이 순간에만 집중하세요",
            "걱정되는 것을 구체적으로 적어보세요",
            "규칙적인 운동으로 불안을 해소하세요"
        ],
        activities: [
            "정원 가꾸기나 식물 돌보기",
            "만다라 색칠하기",
            "점진적 근육 이완법",
            "명상 앱 사용하기"
        ]
    },
    tired: {
        title: "활력 충전 루틴 🔋",
        morning: {
            title: "🌅 에너지 충전 루틴 (06:00 - 09:00)",
            activities: [
                "가벼운 스트레칭으로 몸 깨우기",
                "상쾌한 샤워로 피로 해소",
                "영양가 있는 아침 식사"
            ]
        },
        afternoon: {
            title: "☀️ 활력 회복 루틴 (12:00 - 15:00)",
            activities: [
                "10분 파워낮잠",
                "가벼운 산책으로 환기하기",
                "건강한 간식으로 에너지 보충"
            ]
        },
        evening: {
            title: "🌙 휴식 루틴 (19:00 - 22:00)",
            activities: [
                "일찍 저녁 식사 마치기",
                "편안한 스트레칭",
                "충분한 수면 준비하기"
            ]
        },
        tips: [
            "무리한 활동은 피하고 적절한 휴식을 취하세요",
            "충분한 수분을 섭취하세요",
            "가능한 일찍 취침하세요"
        ],
        activities: [
            "가벼운 요가",
            "충분한 수면",
            "건강한 식사",
            "적절한 휴식"
        ]
    },
    excited: {
        title: "긍정 에너지 루틴 ✨",
        morning: {
            title: "🌅 활력 넘치는 아침 루틴 (06:00 - 09:00)",
            activities: [
                "신나는 음악과 함께 운동하기",
                "에너지 넘치는 아침 식사",
                "하루 목표 설정하기"
            ]
        },
        afternoon: {
            title: "☀️ 창의적인 오후 루틴 (12:00 - 15:00)",
            activities: [
                "새로운 도전 시도하기",
                "친구들과 즐거운 시간 보내기",
                "창의적인 활동 하기"
            ]
        },
        evening: {
            title: "🌙 에너지 정리 루틴 (19:00 - 22:00)",
            activities: [
                "하루 성과 정리하기",
                "차분한 음악 감상",
                "내일을 위한 계획 세우기"
            ]
        },
        tips: [
            "긍정적인 에너지를 주변과 나누세요",
            "과도한 흥분은 적절히 조절하세요",
            "창의적인 활동에 에너지를 집중해보세요"
        ],
        activities: [
            "새로운 취미 도전",
            "친구들과 만남",
            "에너지 넘치는 운동",
            "창의적인 프로젝트"
        ]
    }
};

// 날씨별 맞춤형 루틴 데이터
const weatherRoutines = {
    "맑음": {
        title: "맑은 날의 활기찬 루틴 ☀️",
        morning: {
            title: "🌅 상쾌한 아침 루틴 (06:00 - 09:00)",
            activities: [
                "일출과 함께 가벼운 조깅 30분",
                "테라스나 공원에서 스트레칭",
                "비타민D 충전을 위한 햇빛 쬐기"
            ]
        },
        afternoon: {
            title: "☀️ 활력 충전 루틴 (12:00 - 15:00)",
            activities: [
                "야외에서 점심 식사하기",
                "공원에서 가벼운 산책",
                "자전거 타기나 야외 운동"
            ]
        },
        evening: {
            title: "🌙 여유로운 저녁 루틴 (18:00 - 22:00)",
            activities: [
                "선선한 저녁에 가벼운 조깅",
                "베란다에서 차 마시기",
                "하늘을 보며 하루 마무리하기"
            ]
        }
    },
    "흐림": {
        title: "흐린 날의 차분한 루틴 ☁️",
        morning: {
            title: "🌅 포근한 아침 루틴 (06:00 - 09:00)",
            activities: [
                "실내에서 가벼운 요가",
                "따뜻한 차와 함께 독서",
                "창가에서 스트레칭"
            ]
        },
        afternoon: {
            title: "☁️ 실내 활동 루틴 (12:00 - 15:00)",
            activities: [
                "실내 카페에서 휴식",
                "집에서 취미 활동 하기",
                "온라인 강의 수강하기"
            ]
        },
        evening: {
            title: "🌙 아늑한 저녁 루틴 (18:00 - 22:00)",
            activities: [
                "집에서 영화 감상",
                "따뜻한 허브티 마시기",
                "독서와 함께 휴식"
            ]
        }
    },
    "비": {
        title: "비 오는 날의 아늑한 루틴 🌧️",
        morning: {
            title: "🌅 실내 아침 루틴 (06:00 - 09:00)",
            activities: [
                "창가에서 빗소리 들으며 명상",
                "실내 스트레칭",
                "따뜻한 차와 함께 독서"
            ]
        },
        afternoon: {
            title: "🌧️ 실내 활동 루틴 (12:00 - 15:00)",
            activities: [
                "따뜻한 스프 만들어 먹기",
                "실내 정리정돈하기",
                "좋아하는 음악 들으며 휴식"
            ]
        },
        evening: {
            title: "🌙 포근한 저녁 루틴 (18:00 - 22:00)",
            activities: [
                "아로마 캔들과 함께 휴식",
                "따뜻한 반신욕하기",
                "일기 쓰기"
            ]
        }
    },
    "눈": {
        title: "눈 오는 날의 특별한 루틴 🌨️",
        morning: {
            title: "🌅 포근한 아침 루틴 (06:00 - 09:00)",
            activities: [
                "창밖 눈구경하며 명상",
                "따뜻한 핫초코 마시기",
                "실내 스트레칭"
            ]
        },
        afternoon: {
            title: "🌨️ 겨울 활동 루틴 (12:00 - 15:00)",
            activities: [
                "따뜻한 겨울 음식 만들기",
                "실내 취미 활동",
                "창가에서 독서하기"
            ]
        },
        evening: {
            title: "🌙 따뜻한 저녁 루틴 (18:00 - 22:00)",
            activities: [
                "따뜻한 차와 함께 영화 보기",
                "겨울 음악과 함께 휴식",
                "따뜻한 반신욕"
            ]
        }
    },
    "안개": {
        title: "안개 낀 날의 신비로운 루틴 🌫️",
        morning: {
            title: "🌅 차분한 아침 루틴 (06:00 - 09:00)",
            activities: [
                "실내 요가와 명상",
                "따뜻한 차와 함께 창밖 보기",
                "조용한 음악과 함께 스트레칭"
            ]
        },
        afternoon: {
            title: "🌫️ 실내 활동 루틴 (12:00 - 15:00)",
            activities: [
                "실내에서 독서하기",
                "조용한 음악 감상",
                "취미 활동 하기"
            ]
        },
        evening: {
            title: "🌙 고요한 저녁 루틴 (18:00 - 22:00)",
            activities: [
                "아로마 테라피와 함께 휴식",
                "따뜻한 차 마시기",
                "일기 쓰기"
            ]
        }
    }
};

// 활동 상세 정보 데이터
const activityDetails = {
    "정원 가꾸기나 식물 돌보기": {
        title: "정원 가꾸기 & 식물 돌보기 가이드 🌱",
        description: "식물을 돌보는 것은 마음의 안정과 성취감을 줄 수 있는 훌륭한 활동입니다.",
        steps: [
            "1. 식물 선택하기",
            "- 초보자 추천 식물: 스파티필름, 몬스테라, 산세베리아",
            "- 공기정화 식물: 뱅갈고무나무, 아레카야자, 안스리움",
            "- 행운을 주는 식물: 금전수, 개운죽, 호접란"
        ],
        tips: [
            "🌿 식물 관리 기본 팁",
            "- 각 식물에 맞는 물주기 주기를 지켜주세요",
            "- 적절한 햇빛 양을 확인하세요",
            "- 계절에 따라 관리 방법을 조절하세요",
            "- 영양분 보충을 위한 비료 사용을 고려하세요"
        ],
        benefits: [
            "🌟 기대효과",
            "- 스트레스 감소",
            "- 집중력 향상",
            "- 공기 정화",
            "- 습도 조절",
            "- 심리적 안정"
        ]
    },
    "가벼운 요가나 스트레칭": {
        title: "초보자를 위한 요가 & 스트레칭 가이드 🧘‍♀️",
        description: "간단한 요가와 스트레칭으로 몸과 마음의 균형을 찾아보세요.",
        steps: [
            "1. 준비 운동",
            "- 목 돌리기 (각 방향 5회)",
            "- 어깨 돌리기 (앞뒤 각 10회)",
            "- 발목 돌리기 (각 발 10회)",
            "",
            "2. 기본 요가 동작",
            "- 산 자세 (1분)",
            "- 고양이-소 자세 (10회)",
            "- 다운독 자세 (30초)",
            "- 차일드 포즈 (1분)"
        ],
        tips: [
            "🌟 요가 & 스트레칭 팁",
            "- 무리하지 않는 범위에서 실시",
            "- 호흡에 집중하기",
            "- 편안한 복장 착용",
            "- 가능하면 빈 속에서 실시"
        ],
        benefits: [
            "💪 기대효과",
            "- 유연성 향상",
            "- 근력 강화",
            "- 스트레스 해소",
            "- 자세 교정",
            "- 혈액순환 개선"
        ]
    },
    "그림 그리기나 색칠하기": {
        title: "창의적 미술 활동 가이드 🎨",
        description: "그림 그리기와 색칠하기는 마음을 진정시키고 창의성을 높이는 좋은 방법입니다.",
        steps: [
            "1. 준비물",
            "- 스케치북 또는 도화지",
            "- 색연필, 사인펜, 또는 수채화 물감",
            "- 컬러링북 (선택사항)",
            "",
            "2. 시작하기",
            "- 편안한 장소 선택",
            "- 마음에 드는 주제 정하기",
            "- 간단한 스케치부터 시작",
            "- 천천히 색칠하며 진행"
        ],
        tips: [
            "🎨 미술 활동 팁",
            "- 결과물에 대한 부담 내려놓기",
            "- 마음이 가는 대로 자유롭게 표현",
            "- 다양한 색상 사용해보기",
            "- 음악과 함께하면 더욱 효과적"
        ],
        benefits: [
            "✨ 기대효과",
            "- 스트레스 해소",
            "- 창의성 향상",
            "- 집중력 강화",
            "- 성취감 경험",
            "- 감정 표현의 기회"
        ]
    },
    "좋아하는 음악 듣기": {
        title: "음악 테라피 가이드 🎵",
        description: "음악은 감정을 표현하고 마음을 치유하는 강력한 도구입니다.",
        steps: [
            "1. 음악 선택하기",
            "- 현재 감정에 맞는 장르 선택",
            "- 좋아하는 아티스트의 곡 찾기",
            "- 새로운 장르 탐험하기",
            "",
            "2. 감상 방법",
            "- 조용한 공간 찾기",
            "- 편안한 자세로 앉거나 눕기",
            "- 헤드폰/이어폰 사용 고려",
            "- 눈을 감고 집중해서 듣기"
        ],
        tips: [
            "🎧 음악 감상 팁",
            "- 가사에 집중해보기",
            "- 멜로디를 따라 허밍하기",
            "- 리듬에 맞춰 몸 움직이기",
            "- 감정 일기와 함께하기"
        ],
        benefits: [
            "🌈 기대효과",
            "- 스트레스 해소",
            "- 감정 정화",
            "- 집중력 향상",
            "- 긍정적 에너지 충전",
            "- 창의성 자극"
        ]
    },
    "산책하기": {
        title: "마음을 위한 산책 가이드 🚶‍♂️",
        description: "산책은 신체와 정신 건강을 모두 챙길 수 있는 완벽한 활동입니다.",
        steps: [
            "1. 산책 준비하기",
            "- 편안한 신발과 옷차림",
            "- 날씨에 맞는 준비물",
            "- 물 한 병과 간단한 간식",
            "",
            "2. 산책 방법",
            "- 천천히 시작하기",
            "- 깊은 호흡하며 걷기",
            "- 주변 환경 관찰하기",
            "- 15-30분부터 시작"
        ],
        tips: [
            "🌳 산책 팁",
            "- 자연이 있는 곳 선택하기",
            "- 휴대폰 사용 최소화하기",
            "- 규칙적인 시간에 하기",
            "- 좋아하는 음악과 함께해도 좋아요"
        ],
        benefits: [
            "💫 기대효과",
            "- 스트레스 해소",
            "- 기분 전환",
            "- 체력 향상",
            "- 창의성 증진",
            "- 숙면 도움"
        ]
    },
    "친구와 대화하기": {
        title: "치유를 위한 대화 가이드 💬",
        description: "친구와의 대화는 감정을 나누고 위로받을 수 있는 좋은 방법입니다.",
        steps: [
            "1. 대화 준비",
            "- 편안한 장소 선택",
            "- 충분한 시간 확보",
            "- 마음을 열고 시작하기",
            "",
            "2. 대화 방법",
            "- 진심으로 경청하기",
            "- 판단하지 않고 공감하기",
            "- 자신의 감정 솔직히 표현하기",
            "- 서로를 위한 해결책 찾기"
        ],
        tips: [
            "💝 대화 팁",
            "- 상대방 말에 집중하기",
            "- 긍정적인 피드백 주기",
            "- 비언어적 표현도 주의깊게 보기",
            "- 필요하다면 전문가 상담 추천하기"
        ],
        benefits: [
            "🌟 기대효과",
            "- 감정 해소",
            "- 새로운 관점 발견",
            "- 관계 강화",
            "- 자존감 향상",
            "- 문제 해결력 증진"
        ]
    }
};

// 루틴 생성 함수 수정
async function generateRoutine() {
    const weatherType = document.getElementById('weather-type').value;
    const emotion = document.getElementById('emotion').value;

    // 입력 검증
    if (!weatherType || !emotion) {
        showToast('날씨와 감정을 모두 선택해주세요!', 'warning');
        return;
    }

    const routineDisplay = document.getElementById('routine-display');
    const loadingHtml = `
        <div class="text-center p-5">
            <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <p class="mt-3">AI가 맞춤형 루틴을 생성하고 있습니다...</p>
        </div>
    `;
    routineDisplay.innerHTML = loadingHtml;

    try {
        // 날씨별 기본 루틴 가져오기
        const weatherRoutine = weatherRoutines[weatherType];
        const emotionRoutine = emotionalRoutines[emotion];
        
        if (!weatherRoutine || !emotionRoutine) {
            throw new Error('날씨 또는 감정에 맞는 루틴을 찾을 수 없습니다.');
        }

        // 날씨와 감정을 조합한 맞춤형 루틴 생성
        const combinedRoutine = {
            title: `${weatherRoutine.title} + ${emotionRoutine.title}`,
            morning: combineTimeBlock(weatherRoutine.morning, emotionRoutine.morning),
            afternoon: combineTimeBlock(weatherRoutine.afternoon, emotionRoutine.afternoon),
            evening: combineTimeBlock(weatherRoutine.evening, emotionRoutine.evening)
        };

        // 활동 섹션 수정
        const activitiesHtml = emotionRoutine.activities.map(activity => `
            <div class="activity-item" onclick="showActivityDetail('${activity}')">
                <span class="activity-text">${activity}</span>
                ${activityDetails[activity] ? `
                    <small>
                        자세히 보기
                        <i class="bi bi-arrow-right-circle"></i>
                    </small>
                ` : ''}
            </div>
        `).join('');

        // 루틴 표시
        routineDisplay.innerHTML = `
            <div class="routine-container" style="font-family: 'Noto Sans KR', sans-serif;">
                <h2 style="color: #2c3e50; text-align: center; margin-bottom: 25px;">${combinedRoutine.title}</h2>
                
                <div class="time-block">
                    ${formatTimeBlock(combinedRoutine.morning)}
                </div>
                
                <div class="time-block">
                    ${formatTimeBlock(combinedRoutine.afternoon)}
                </div>
                
                <div class="time-block">
                    ${formatTimeBlock(combinedRoutine.evening)}
                </div>
                
                <div class="tips-section" style="margin-top: 30px; background: #f8f9fa; padding: 20px; border-radius: 10px;">
                    <h3 style="color: #34495e; margin-bottom: 15px;">💡 오늘의 맞춤 팁</h3>
                    <ul style="list-style-type: none; padding-left: 0;">
                        ${getCombinedTips(weatherType, emotion).map(tip => 
                            `<li style="margin-bottom: 10px; color: #576574;">• ${tip}</li>`
                        ).join('')}
                    </ul>
                </div>

                <div class="emotion-tips-section" style="margin-top: 20px; background: #fff3e0; padding: 20px; border-radius: 10px;">
                    <h3 style="color: #34495e; margin-bottom: 15px;">💝 감정 관리 팁</h3>
                    <ul style="list-style-type: none; padding-left: 0;">
                        ${emotionRoutine.tips.map(tip => 
                            `<li style="margin-bottom: 10px; color: #576574;">• ${tip}</li>`
                        ).join('')}
                    </ul>
                </div>

                <div class="activities-section" style="margin-top: 20px;">
                    <h3 style="color: #34495e; margin-bottom: 15px;">🎯 추천 활동</h3>
                    <div style="display: flex; flex-wrap: wrap; gap: 10px;">
                        ${activitiesHtml}
                    </div>
                </div>
            </div>
        `;
        
        // 저장/공유 버튼 표시
        document.querySelector('.routine-actions').style.display = 'flex';
        
        // 성공 메시지 표시
        showToast('맞춤형 루틴이 생성되었습니다!', 'success');
    } catch (error) {
        console.error('루틴을 생성하는데 실패했습니다:', error);
        routineDisplay.innerHTML = `
            <div class="text-center text-danger p-5">
                <i class="bi bi-exclamation-triangle display-4"></i>
                <p class="mt-3">죄송합니다. 루틴을 생성하는데 실패했습니다.<br>잠시 후 다시 시도해주세요.</p>
            </div>
        `;
        showToast('루틴 생성에 실패했습니다.', 'error');
    }
}

// 시간대별 블록 조합 함수
function combineTimeBlock(weatherBlock, emotionBlock) {
    return {
        title: weatherBlock.title,
        activities: [
            ...weatherBlock.activities,
            ...emotionBlock.activities.slice(0, 2) // 감정 관련 활동 2개 추가
        ]
    };
}

// 날씨와 감정에 따른 조합된 팁 생성
function getCombinedTips(weatherType, emotion) {
    const weatherTips = getWeatherTips(weatherType);
    const emotionTips = emotionalRoutines[emotion]?.tips || [];
    
    // 날씨와 감정에 따른 특별 팁 추가
    const specialTips = {
        "맑음": {
            "happy": ["밝은 날씨와 함께 긍정적인 에너지를 더욱 발산해보세요"],
            "sad": ["따뜻한 햇살을 받으며 마음을 달래보세요"],
            "angry": ["시원한 바람을 맞으며 마음을 진정시켜보세요"],
            "anxious": ["맑은 하늘을 보며 깊은 호흡을 해보세요"],
            "tired": ["적당한 햇빛은 활력을 되찾는데 도움이 됩니다"]
        },
        "흐림": {
            "happy": ["흐린 날씨에도 긍정적인 마음을 유지해보세요"],
            "sad": ["잔잔한 음악과 함께 휴식을 취해보세요"],
            "angry": ["차분한 실내 활동으로 마음을 다스려보세요"],
            "anxious": ["따뜻한 차와 함께 마음을 달래보세요"],
            "tired": ["조용한 휴식으로 에너지를 충전하세요"]
        },
        "비": {
            "happy": ["실내에서 취미 활동을 즐겨보세요"],
            "sad": ["빗소리를 들으며 마음을 달래보세요"],
            "angry": ["빗소리와 함께 깊은 호흡을 해보세요"],
            "anxious": ["아늑한 공간에서 안정을 취해보세요"],
            "tired": ["비 오는 날의 여유를 즐겨보세요"]
        },
        "눈": {
            "happy": ["눈 내리는 풍경을 감상하며 기분을 더욱 업해보세요"],
            "sad": ["따뜻한 음료와 함께 포근한 시간을 가져보세요"],
            "angry": ["하얀 눈을 보며 마음을 정화해보세요"],
            "anxious": ["포근한 실내에서 안정을 취해보세요"],
            "tired": ["따뜻한 실내에서 휴식을 취해보세요"]
        },
        "안개": {
            "happy": ["안전한 실내에서 취미 활동을 즐겨보세요"],
            "sad": ["차분한 음악과 함께 휴식을 취해보세요"],
            "angry": ["안개 낀 날씨에 맞춰 마음도 차분히 가라앉혀보세요"],
            "anxious": ["조용한 실내에서 안정을 찾아보세요"],
            "tired": ["흐릿한 날씨에 맞춰 휴식을 취해보세요"]
        }
    };

    const combinedTips = [
        ...(specialTips[weatherType]?.[emotion] || []),
        ...weatherTips.slice(0, 2),
        ...emotionTips.slice(0, 2)
    ];

    return combinedTips;
}

// 날씨별 팁 반환 함수
function getWeatherTips(weatherType) {
    const tips = {
        "맑음": [
            "자외선 차단제를 꼭 바르세요",
            "충분한 수분을 섭취하세요",
            "야외 활동을 적극적으로 즐기세요"
        ],
        "흐림": [
            "실내 조명을 밝게 유지하세요",
            "가벼운 실내 운동을 추천합니다",
            "집중력 향상을 위한 활동을 해보세요"
        ],
        "비": [
            "우산과 레인부츠를 준비하세요",
            "실내 습도 관리에 신경 쓰세요",
            "차분한 음악과 함께 휴식을 취하세요"
        ],
        "눈": [
            "따뜻한 옷차림을 준비하세요",
            "실내 난방 온도를 적절히 유지하세요",
            "미끄러운 길 조심하세요"
        ],
        "안개": [
            "운전 시 안전에 특히 주의하세요",
            "실내 공기를 자주 환기하세요",
            "시야가 좋지 않으니 외출 시 주의하세요"
        ]
    };
    
    return tips[weatherType] || [
        "오늘도 건강한 하루 보내세요",
        "규칙적인 생활을 유지하세요",
        "충분한 휴식을 취하세요"
    ];
}

// 시간대별 루틴 포맷팅
function formatTimeBlock(timeBlock) {
    return `
    <div style="margin-bottom: 25px;">
        <h3 style="color: #34495e; margin-bottom: 15px;">${timeBlock.title}</h3>
        <ul style="list-style-type: none; padding-left: 0;">
            ${timeBlock.activities.map(activity => 
                `<li style="margin-bottom: 10px; color: #576574; display: flex; align-items: center;">
                    <span style="margin-right: 10px;">•</span>
                    ${activity}
                </li>`
            ).join('')}
        </ul>
    </div>`;
}

// 루틴 저장하기
function saveRoutine() {
    const routineContainer = document.querySelector('.routine-container');
    if (!routineContainer) {
        showToast('저장할 루틴이 없습니다.', 'warning');
        return;
    }

    const routineData = {
        weather: document.getElementById('weather-type').value,
        emotion: document.getElementById('emotion').value,
        content: routineContainer.innerHTML,
        timestamp: new Date().toISOString()
    };
    
    // 로컬 스토리지에 저장
    let savedRoutines = JSON.parse(localStorage.getItem('savedRoutines') || '[]');
    savedRoutines.push(routineData);
    localStorage.setItem('savedRoutines', JSON.stringify(savedRoutines));
    
    showToast('루틴이 저장되었습니다!', 'success');
}

// 루틴 공유하기
function shareRoutine() {
    const routineContainer = document.querySelector('.routine-container');
    if (!routineContainer) {
        showToast('공유할 루틴이 없습니다.', 'warning');
        return;
    }

    const weatherType = document.getElementById('weather-type').value;
    const emotion = document.getElementById('emotion').value;
    
    const shareText = `[AI 루틴 마스터 Pro - ${weatherType} + ${emotion} 맞춤 루틴]\n\n` + 
                     routineContainer.textContent.replace(/\s+/g, ' ').trim();
    
    if (navigator.share) {
        navigator.share({
            title: 'AI 루틴 마스터 Pro - 맞춤형 루틴',
            text: shareText
        }).then(() => {
            showToast('루틴을 공유했습니다!', 'success');
        }).catch(error => {
            console.error('공유 실패:', error);
            copyToClipboard(shareText);
        });
    } else {
        copyToClipboard(shareText);
    }
}

// 클립보드에 복사하는 함수
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast('루틴이 클립보드에 복사되었습니다!', 'success');
    }).catch(error => {
        console.error('클립보드 복사 실패:', error);
        showToast('클립보드 복사에 실패했습니다.', 'error');
    });
}

// 토스트 메시지 표시
function showToast(message, type = 'info') {
    const toastContainer = document.createElement('div');
    toastContainer.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 1000;
    `;
    document.body.appendChild(toastContainer);

    const toast = document.createElement('div');
    toast.className = `toast show align-items-center text-white bg-${type === 'success' ? 'success' : type === 'error' ? 'danger' : type === 'warning' ? 'warning' : 'primary'}`;
    toast.setAttribute('role', 'alert');
    toast.innerHTML = `
        <div class="d-flex">
            <div class="toast-body">
                ${message}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
        </div>
    `;
    toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.remove();
        if (!toastContainer.hasChildNodes()) {
            toastContainer.remove();
        }
    }, 3000);
}

// 초기 시스템 메시지 설정
const systemMessage = {
    role: "system",
    content: `당신은 전문 상담사입니다. 다음 원칙에 따라 사용자와 대화해주세요:

1. 상담 기본 원칙:
   - 경청과 공감을 최우선으로 합니다
   - 판단하지 않고 수용적인 태도를 유지합니다
   - 사용자의 감정을 인정하고 존중합니다
   - 긍정적이고 희망적인 관점을 제시합니다

2. 대화 방식:
   - 공감: "그런 상황에서 그런 감정을 느끼시는 게 당연합니다."
   - 경청: "말씀해주신 내용을 보면..."
   - 탐색: "어떤 부분이 가장 힘드신가요?"
   - 요약: "지금까지 말씀하신 내용을 정리해보면..."

3. 상황별 대응:
   - 우울할 때: 공감하고 작은 성취부터 시작하도록 격려
   - 불안할 때: 현재에 집중하고 호흡법 등 실질적 도움 제공
   - 화가 날 때: 감정을 인정하고 건설적인 해결방안 모색
   - 혼란스러울 때: 함께 상황을 정리하고 우선순위 설정

4. 실천적 조언:
   - 구체적이고 실행 가능한 작은 단계들을 제시
   - 사용자의 강점과 자원을 활용한 해결책 제안
   - 필요한 경우 전문가 상담 추천

5. 안전 고려사항:
   - 위험 신호 감지 시 전문가 상담 적극 권유
   - 자해/자살 위험이 있는 경우 긴급전화 안내
   - 극단적 감정이나 생각에 대해 진지하게 대응

대화 스타일:
- 따뜻하고 친근하되 전문가다운 어조 유지
- 적절한 공감 표현과 반영적 경청 사용
- 명확하고 이해하기 쉬운 언어 사용
- 필요할 때 적절한 침묵과 기다림 제공`
};

// 채팅 기능
let chatHistory = [systemMessage];

// 기본 감정 분류와 응답
const emotionalResponses = {
    sad: {
        keywords: /(슬프|우울|힘들|외롭|지친|무기력)/,
        empathy: [
            "많이 힘드셨겠어요. 그런 감정을 느끼시는 게 당연합니다.",
            "그런 상황에서 슬픔을 느끼시는 건 자연스러운 일이에요.",
            "함께 이야기 나눠주셔서 감사해요."
        ],
        morning: {
            title: "🌅 따뜻한 아침 루틴",
            activities: [
                "창문을 열어 햇빛과 함께 시작하기",
                "따뜻한 차 한잔과 깊은 호흡하기",
                "가벼운 스트레칭으로 몸 깨우기"
            ]
        },
        afternoon: {
            title: "☀️ 위로의 오후 루틴",
            activities: [
                "좋아하는 음악 들으며 짧은 산책하기",
                "마음을 달래주는 따뜻한 음식 먹기",
                "감정 일기 작성하기"
            ]
        },
        evening: {
            title: "🌙 마음 정리 루틴",
            activities: [
                "아로마 캔들과 함께하는 반신욕",
                "좋아하는 책이나 영화로 기분 전환",
                "일찍 취침 준비하기"
            ]
        },
        tips: [
            "혼자 있는 시간을 줄이고 주변 사람들과 소통해보세요",
            "작은 성취감을 느낄 수 있는 일부터 시작해보세요",
            "규칙적인 수면과 식사로 기본 리듬을 지켜주세요"
        ]
    },
    angry: {
        keywords: /(화|짜증|분노|답답|억울|밉)/,
        empathy: [
            "그런 상황에서 화가 나시는 게 당연합니다.",
            "많이 답답하고 화가 나셨겠어요.",
            "그런 감정이 드는 게 너무나 자연스러워요."
        ],
        morning: {
            title: "🌅 에너지 해소 루틴",
            activities: [
                "격한 운동으로 에너지 발산하기",
                "차가운 물로 세안하며 마음 가라앉히기",
                "심호흡과 함께하는 명상 10분"
            ]
        },
        afternoon: {
            title: "☀️ 마음 진정 루틴",
            activities: [
                "조용한 장소에서 깊은 호흡하기",
                "시원한 음료와 함께 휴식하기",
                "감정 정리를 위한 글쓰기"
            ]
        },
        evening: {
            title: "🌙 평화로운 저녁 루틴",
            activities: [
                "잔잔한 음악과 함께 스트레칭",
                "따뜻한 허브티 마시기",
                "감정 해소를 위한 일기 쓰기"
            ]
        },
        tips: [
            "즉각적인 반응을 하기 전에 10까지 숫자를 세어보세요",
            "잠시 자리를 피해 마음을 진정시켜보세요",
            "운동이나 취미 활동으로 에너지를 해소해보세요"
        ]
    },
    anxious: {
        keywords: /(불안|걱정|두려|떨리|조마조마|긴장)/,
        empathy: [
            "그런 불안한 감정이 드시는 게 당연해요.",
            "많이 걱정되고 불안하시겠어요.",
            "그런 상황에서 불안을 느끼시는 건 자연스러운 일이에요."
        ],
        morning: {
            title: "🌅 안정감 있는 아침 루틴",
            activities: [
                "5-4-3-2-1 감각 인식 운동하기",
                "차분한 음악과 함께 요가하기",
                "마음을 정리하는 아침 일기쓰기"
            ]
        },
        afternoon: {
            title: "☀️ 평온한 오후 루틴",
            activities: [
                "규칙적인 호흡 운동하기",
                "불안한 생각 기록하고 분석하기",
                "짧은 산책으로 환기하기"
            ]
        },
        evening: {
            title: "🌙 편안한 저녁 루틴",
            activities: [
                "라벤더 향과 함께하는 명상",
                "따뜻한 허브티 마시기",
                "감사한 일 3가지 적기"
            ]
        },
        tips: [
            "현재 이 순간에만 집중해보세요",
            "걱정되는 것을 구체적으로 적어보세요",
            "규칙적인 운동으로 불안을 해소해보세요"
        ]
    },
    happy: {
        keywords: /(행복|기쁘|좋아|신나|즐거워|설레)/,
        empathy: [
            "정말 기분 좋으시겠어요!",
            "그 기쁜 마음이 잘 느껴져요.",
            "행복한 순간을 함께 나눠주셔서 감사해요."
        ],
        morning: {
            title: "🌅 활기찬 아침 루틴",
            activities: [
                "밝은 음악과 함께 스트레칭",
                "감사일기 작성하기",
                "상쾌한 산책하기"
            ]
        },
        afternoon: {
            title: "☀️ 즐거운 오후 루틴",
            activities: [
                "좋아하는 사람과 대화하기",
                "창의적인 취미 활동하기",
                "작은 목표 달성하기"
            ]
        },
        evening: {
            title: "🌙 여유로운 저녁 루틴",
            activities: [
                "하루의 행복했던 순간 되돌아보기",
                "소중한 사람들과 시간 보내기",
                "평화로운 음악 감상하기"
            ]
        },
        tips: [
            "행복한 감정을 주변과 나누어보세요",
            "이 순간의 기쁨을 사진이나 글로 기록해보세요",
            "긍정적인 에너지를 다른 활동에도 활용해보세요"
        ]
    }
};

// CBT 기반 자가 점검 질문
const cbtQuestions = [
    "그 생각이 사실인지 어떻게 알 수 있을까요?",
    "다른 관점에서 보면 어떨까요?",
    "가장 최악의 상황은 무엇일까요? 그걸 견딜 수 있을까요?",
    "친구가 같은 상황이라면 뭐라고 조언해주고 싶으신가요?",
    "이 생각이 도움이 되나요? 다르게 생각할 수 있는 방법이 있을까요?"
];

// 일상 루틴 추천
const routineRecommendations = {
    morning: [
        "창문을 열어 환기하기",
        "따뜻한 물 한잔 마시기",
        "3분 스트레칭하기",
        "오늘의 감정 기록하기"
    ],
    evening: [
        "하루 감정 돌아보기",
        "감사한 일 3가지 적기",
        "가벼운 스트레칭하기",
        "따뜻한 차 마시며 휴식하기"
    ]
};

// 감정 일기 가이드
const emotionalJournalGuide = [
    "지금 느끼는 감정은 무엇인가요?",
    "그 감정의 강도는 어느 정도인가요? (1-10)",
    "어떤 상황에서 이런 감정이 들었나요?",
    "그때 어떤 생각이 들었나요?",
    "그 생각이 100% 사실인가요?",
    "다른 관점에서 볼 수 있는 방법이 있을까요?"
];

// 랜덤 아이템 선택 함수
function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// 메시지 처리 및 응답 생성 함수 수정
function processMessage(message) {
    // 감정 상태 확인
    let detectedEmotion = null;
    for (const [emotion, data] of Object.entries(emotionalResponses)) {
        if (data.keywords.test(message)) {
            detectedEmotion = emotion;
            break;
        }
    }

    if (detectedEmotion) {
        const emotionData = emotionalResponses[detectedEmotion];
        const response = [
            getRandomItem(emotionData.empathy),
            "",
            "현재 감정 상태에 맞는 맞춤형 루틴을 추천해드릴게요:",
            "",
            "🌅 아침",
            emotionData.morning.activities.map(activity => `• ${activity}`).join('\n'),
            "",
            "☀️ 오후",
            emotionData.afternoon.activities.map(activity => `• ${activity}`).join('\n'),
            "",
            "🌙 저녁",
            emotionData.evening.activities.map(activity => `• ${activity}`).join('\n'),
            "",
            "💝 도움이 될 만한 팁",
            emotionData.tips.map(tip => `• ${tip}`).join('\n'),
            "",
            "이 루틴들을 시도해보시고, 편하실 때 다시 이야기 나누어요. 더 자세한 이야기가 필요하시다면 언제든 말씀해주세요."
        ].join("\n");
        
        return response;
    }

    return [
        "말씀해 주셔서 감사합니다.",
        "",
        "지금 어떤 감정을 느끼고 계신지 더 자세히 이야기해주실 수 있나요?",
        "예를 들어 '힘들어요', '화가 나요', '불안해요', '기분이 좋아요' 등",
        "함께 이야기를 나누면서 도움이 될 만한 맞춤 루틴을 찾아보면 좋겠습니다."
    ].join("\n");
}

// 메시지 전송 함수 수정
async function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    appendMessage(message, 'user');
    input.value = '';
    adjustTextareaHeight(input);

    input.disabled = true;
    document.querySelector('.chat-input-area .btn').disabled = true;

    try {
        const response = processMessage(message);
        await new Promise(resolve => setTimeout(resolve, 1000));
        appendMessage(response, 'ai');
    } catch (error) {
        console.error('메시지 전송 실패:', error);
        appendMessage('죄송합니다. 일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.', 'ai', true);
    } finally {
        input.disabled = false;
        document.querySelector('.chat-input-area .btn').disabled = false;
        input.focus();
    }
}

// 메시지 표시 개선
function appendMessage(message, type, isError = false) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}-message`;
    
    let messageHTML = '';
    if (type === 'ai') {
        messageHTML += `
            <div class="avatar">
                <i class="bi bi-robot"></i>
            </div>
        `;
    }
    
    messageHTML += `<div class="message-content"></div>`;
    messageDiv.innerHTML = messageHTML;
    
    chatMessages.appendChild(messageDiv);
    
    const messageContent = messageDiv.querySelector('.message-content');
    
    if (type === 'user') {
        // 사용자 메시지는 바로 표시
        messageContent.innerHTML = formatMessage(message);
        scrollToBottom();
    } else {
        // AI 메시지는 타이핑 효과 적용
        const typingIndicator = document.createElement('div');
        typingIndicator.className = 'typing-indicator';
        typingIndicator.innerHTML = '<span></span><span></span><span></span>';
        messageContent.appendChild(typingIndicator);
        
        scrollToBottom();
        
        // 타이핑 효과로 메시지 표시
        setTimeout(() => {
            typeMessage(messageContent, formatMessage(message), isError);
        }, 500);
    }
}

// 메시지 포맷팅
function formatMessage(message) {
    return message
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/`(.*?)`/g, '<code>$1</code>')
        .replace(/\n/g, '<br>');
}

// 타이핑 효과
function typeMessage(element, message, isError = false) {
    element.innerHTML = '';
    if (isError) element.classList.add('text-danger');
    
    const words = message.split(' ');
    let currentWord = 0;
    
    function typeWord() {
        if (currentWord < words.length) {
            element.innerHTML += (currentWord > 0 ? ' ' : '') + words[currentWord];
            currentWord++;
            scrollToBottom();
            
            // 다음 단어 타이핑
            const delay = Math.random() * 50 + 20;  // 20-70ms 랜덤 딜레이
            setTimeout(typeWord, delay);
        }
    }
    
    typeWord();
}

// 부드러운 스크롤
function scrollToBottom() {
    const chatMessages = document.getElementById('chatMessages');
    chatMessages.scrollTo({
        top: chatMessages.scrollHeight,
        behavior: 'smooth'
    });
}

// 텍스트 영역 자동 크기 조절
function adjustTextareaHeight(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 200) + 'px';
}

// 키 입력 처리
function handleKeyPress(event) {
    const textarea = event.target;
    
    // 자동 크기 조절
    adjustTextareaHeight(textarea);
    
    // Shift + Enter는 줄바꿈
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
    }
}

// 초기 텍스트 영역 설정
document.addEventListener('DOMContentLoaded', () => {
    const textarea = document.getElementById('chatInput');
    textarea.addEventListener('input', () => adjustTextareaHeight(textarea));
});

// 대화 초기화 개선
function clearChat() {
    if (confirm('대화 내용을 모두 지우시겠습니까?')) {
        document.getElementById('chatMessages').innerHTML = `
            <div class="message ai-message">
                안녕하세요! 저는 당신의 감정을 이해하고 조언해주는 AI 상담사입니다.
                편안한 마음으로 어떤 이야기든 나누어 주세요. 당신의 이야기를 경청하고 함께 고민하며,
                실질적인 도움이 될 수 있는 방법을 찾아보도록 하겠습니다.
            </div>
        `;
        chatHistory = [systemMessage];
    }
}

// 엔터 키 이벤트 처리
document.getElementById('chatInput')?.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

// 활동 상세 정보 표시 함수
function showActivityDetail(activity) {
    const details = activityDetails[activity];
    if (!details) {
        showToast('해당 활동의 상세 정보가 없습니다.', 'warning');
        return;
    }

    const modalContent = document.getElementById('activityDetailContent');
    const modalTitle = document.getElementById('activityDetailModalLabel');
    
    modalTitle.textContent = details.title;
    
    let content = `
        <div class="activity-detail">
            <p class="lead mb-4">${details.description}</p>
            
            <div class="steps-section mb-4">
                <h4 class="section-title"><i class="bi bi-list-check"></i>단계별 가이드</h4>
                ${details.steps.map(step => `<p>${step}</p>`).join('')}
            </div>
            
            <div class="tips-section mb-4">
                <h4 class="section-title"><i class="bi bi-lightbulb"></i>활동 팁</h4>
                ${details.tips.map(tip => `<p>${tip}</p>`).join('')}
            </div>
            
            <div class="benefits-section">
                <h4 class="section-title"><i class="bi bi-star"></i>기대효과</h4>
                ${details.benefits.map(benefit => `<p>${benefit}</p>`).join('')}
            </div>
        </div>
    `;
    
    modalContent.innerHTML = content;

    // 모달 요소 가져오기
    const modalElement = document.getElementById('activityDetailModal');
    
    // 기존 모달 인스턴스 제거 (있다면)
    const existingModal = bootstrap.Modal.getInstance(modalElement);
    if (existingModal) {
        existingModal.dispose();
    }
    
    // 새 모달 인스턴스 생성 및 표시
    const modal = new bootstrap.Modal(modalElement, {
        backdrop: true,
        keyboard: true,
        focus: true
    });
    
    // 모달이 완전히 표시된 후 애니메이션 시작
    modalElement.addEventListener('shown.bs.modal', function () {
        const sections = modalContent.querySelectorAll('.steps-section, .tips-section, .benefits-section');
        sections.forEach((section, index) => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            setTimeout(() => {
                section.style.transition = 'all 0.5s ease';
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }, { once: true });
    
    modal.show();
} 