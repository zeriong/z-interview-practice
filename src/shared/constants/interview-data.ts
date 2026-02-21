import type { InterviewItem } from "@/shared/types";

export const INTERVIEW_DATA: InterviewItem[] = [
  {
    question: "가상 DOM(Virtual DOM)이란 무엇이며, 왜 사용하나요?",
    answer:
      "가상 DOM은 실제 DOM의 메모리 내 자바스크립트 표현입니다. React는 상태가 변경되면 새로운 가상 DOM 트리를 생성하고, 이전 트리와 비교(Diffing)하여 변경된 부분만 실제 DOM에 반영합니다. 실제 DOM 조작은 비용이 크기 때문에, 변경이 필요한 최소한의 노드만 업데이트하여 성능을 최적화합니다.",
  },
  {
    question: "JavaScript의 이벤트 루프(Event Loop)에 대해 설명해주세요.",
    answer:
      "자바스크립트는 싱글 스레드 언어지만 이벤트 루프를 통해 비동기 작업을 처리합니다. 콜 스택에서 현재 코드 실행이 끝나면, 이벤트 루프가 마이크로태스크 큐(Promise, MutationObserver)를 먼저 비우고, 그 다음 매크로태스크 큐(setTimeout, setInterval, I/O)에서 하나씩 가져와 실행합니다. 이 사이클이 반복되며 비동기 작업을 처리합니다.",
  },
  {
    question:
      "CSS Flexbox와 Grid의 차이점과 각각 언제 사용하는지 설명해주세요.",
    answer:
      "Flexbox는 주로 1차원(단일 축) 레이아웃에 사용되며, 요소들의 정렬과 공간 분배에 탁월합니다. Grid는 2차원(행과 열) 레이아웃을 다루며 복잡한 레이아웃 구성에 적합합니다. 내비게이션 바나 버튼 그룹처럼 단순히 나란히 배치할 때는 Flexbox를, 카드 갤러리나 전체 페이지 레이아웃처럼 행과 열이 모두 필요할 때는 Grid를 사용합니다.",
  },
  {
    question: "React의 상태 관리 방법들을 비교해서 설명해주세요.",
    answer:
      "React의 상태 관리는 목적에 따라 구분합니다. 컴포넌트 내부 상태는 useState나 useReducer를, 전역 상태는 Context API, Zustand, Redux 등을 사용합니다. 서버 상태(데이터 페칭, 캐싱)는 TanStack Query나 SWR 같은 전용 라이브러리로 분리하는 것이 현재 트렌드입니다. 상태의 범위와 복잡도에 맞는 도구를 선택하는 것이 중요합니다.",
  },
  {
    question: "브라우저의 렌더링 과정에 대해 설명해주세요.",
    answer:
      "브라우저의 렌더링은 다음 순서로 진행됩니다. ① HTML 파싱 → DOM 트리 생성 ② CSS 파싱 → CSSOM 트리 생성 ③ DOM + CSSOM 결합 → 렌더 트리 생성 ④ 레이아웃(Reflow): 요소의 크기와 위치 계산 ⑤ 페인트(Repaint): 픽셀 채우기 ⑥ 합성(Compositing): 레이어 합성. JavaScript는 파싱을 차단하므로 defer나 async 속성을 활용해 최적화합니다.",
  },
];
