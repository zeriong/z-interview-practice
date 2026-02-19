import type { InterviewItem } from '@/shared/types/interview';

export const INTERVIEW_DATA: InterviewItem[] = [
  {
    question: '가상 DOM(Virtual DOM)이란 무엇이며, 왜 사용하나요?',
    answer:
      '가상 DOM은 실제 DOM의 메모리 내 자바스크립트 표현입니다. React는 상태가 변경되면 새로운 가상 DOM 트리를 생성하고, 이전 트리와 비교(Diffing)하여 변경된 부분만 실제 DOM에 반영합니다. 실제 DOM 조작은 비용이 크기 때문에, 변경이 필요한 최소한의 노드만 업데이트하여 성능을 최적화합니다.',
    children: [
      {
        question: 'Reconciliation(재조정) 알고리즘이란 무엇인가요?',
        answer:
          'Reconciliation은 React가 이전 가상 DOM과 새로운 가상 DOM을 비교하여 실제 DOM 업데이트를 최소화하는 알고리즘입니다. React는 두 트리가 다른 타입의 루트 요소를 가지면 전체 트리를 재구축하고, 같은 타입이면 속성만 업데이트합니다. O(n³)의 복잡도를 O(n)으로 줄이기 위해 같은 레벨에서만 비교하는 휴리스틱을 사용합니다.',
      },
      {
        question: 'key prop이 왜 필요하며 잘못 사용하면 어떤 문제가 생기나요?',
        answer:
          'key prop은 React가 리스트에서 어떤 항목이 변경, 추가, 삭제되었는지 식별하는 데 사용됩니다. index를 key로 사용하면 리스트 순서 변경 시 React가 잘못된 컴포넌트를 재사용하여 의도치 않은 상태 버그가 발생할 수 있습니다. 순서가 변경될 수 있는 리스트에서는 고유하고 안정적인 ID를 key로 사용해야 합니다.',
      },
      {
        question: 'React Fiber는 기존 Stack Reconciler와 어떻게 다른가요?',
        answer:
          'React Fiber는 React 16에서 도입된 새로운 Reconciliation 엔진입니다. 기존 Stack Reconciler는 동기적으로 전체 트리를 업데이트하여 큰 트리에서 UI가 멈추는 문제가 있었습니다. Fiber는 작업을 작은 단위로 쪼개고 우선순위를 부여하여 작업을 중단하고 나중에 재개할 수 있습니다. 이를 통해 사용자 인터랙션 같은 고우선순위 작업을 먼저 처리하는 Concurrent 렌더링이 가능해졌습니다.',
      },
    ],
  },
  {
    question: 'JavaScript의 이벤트 루프(Event Loop)에 대해 설명해주세요.',
    answer:
      '자바스크립트는 싱글 스레드 언어지만 이벤트 루프를 통해 비동기 작업을 처리합니다. 콜 스택에서 현재 코드 실행이 끝나면, 이벤트 루프가 마이크로태스크 큐(Promise, MutationObserver)를 먼저 비우고, 그 다음 매크로태스크 큐(setTimeout, setInterval, I/O)에서 하나씩 가져와 실행합니다. 이 사이클이 반복되며 비동기 작업을 처리합니다.',
    children: [
      {
        question: '마이크로태스크와 매크로태스크의 차이점은 무엇인가요?',
        answer:
          '마이크로태스크는 현재 태스크가 완료된 직후 즉시 처리되는 작업으로, Promise의 .then(), .catch(), queueMicrotask() 등이 해당됩니다. 매크로태스크는 다음 이벤트 루프 사이클에서 처리되는 작업으로, setTimeout(), setInterval(), I/O 이벤트 등이 해당됩니다. 마이크로태스크 큐는 항상 매크로태스크보다 먼저, 그리고 완전히 비워질 때까지 처리됩니다.',
      },
      {
        question: 'Promise와 setTimeout의 실행 순서를 예시로 설명해주세요.',
        answer:
          "console.log('1'); setTimeout(() => console.log('2'), 0); Promise.resolve().then(() => console.log('3')); console.log('4'); 실행 결과는 1 → 4 → 3 → 2 순서입니다. '1'과 '4'는 동기 코드로 즉시 실행되고, Promise는 마이크로태스크 큐에, setTimeout은 매크로태스크 큐에 들어갑니다. 동기 코드 완료 후 마이크로태스크인 Promise가 먼저 실행되고, 그 다음 매크로태스크인 setTimeout이 실행됩니다.",
      },
      {
        question: 'async/await는 내부적으로 어떻게 동작하나요?',
        answer:
          'async/await는 Promise를 기반으로 한 문법적 설탕(Syntactic Sugar)입니다. async 함수는 항상 Promise를 반환하며, await 키워드는 Promise가 처리될 때까지 함수 실행을 일시 중단합니다. await 이후의 코드는 .then() 콜백처럼 마이크로태스크 큐에 등록됩니다. 이를 통해 비동기 코드를 동기 코드처럼 읽기 쉽게 작성할 수 있습니다.',
      },
    ],
  },
  {
    question:
      'CSS Flexbox와 Grid의 차이점과 각각 언제 사용하는지 설명해주세요.',
    answer:
      'Flexbox는 주로 1차원(단일 축) 레이아웃에 사용되며, 요소들의 정렬과 공간 분배에 탁월합니다. Grid는 2차원(행과 열) 레이아웃을 다루며 복잡한 레이아웃 구성에 적합합니다. 내비게이션 바나 버튼 그룹처럼 단순히 나란히 배치할 때는 Flexbox를, 카드 갤러리나 전체 페이지 레이아웃처럼 행과 열이 모두 필요할 때는 Grid를 사용합니다.',
    children: [
      {
        question: 'flex-grow, flex-shrink, flex-basis의 역할을 설명해주세요.',
        answer:
          'flex-basis는 Flex 아이템의 초기 크기를 설정합니다. flex-grow는 남은 공간을 얼마나 차지할지의 비율로, 0이면 늘어나지 않고 1 이상이면 남은 공간을 가져갑니다. flex-shrink는 공간이 부족할 때 얼마나 줄어들지의 비율로, 0이면 줄어들지 않습니다. flex: 1은 flex-grow: 1, flex-shrink: 1, flex-basis: 0%의 단축 표현으로 남은 공간을 균등하게 나눕니다.',
      },
      {
        question:
          'CSS Grid에서 auto-fill과 auto-fit의 차이점은 무엇인가요?',
        answer:
          '두 키워드 모두 repeat() 함수에서 사용하여 컨테이너 크기에 따라 열 수를 자동으로 결정합니다. auto-fill은 아이템 수가 적어도 열 공간을 유지하여 빈 열이 생깁니다. auto-fit은 빈 열을 제거하고 실제 아이템들이 남은 공간을 채우도록 늘어납니다. 아이템이 적을 때 공간을 채워야 한다면 auto-fit, 그리드 구조를 고정적으로 유지해야 한다면 auto-fill을 사용합니다.',
      },
      {
        question:
          '반응형 레이아웃 구현 시 Flexbox와 Grid 선택 기준은 무엇인가요?',
        answer:
          '콘텐츠 중심 레이아웃(내용에 따라 크기가 결정)에는 Flexbox가, 레이아웃 중심(미리 정의된 격자에 배치)에는 Grid가 적합합니다. 실제로는 두 가지를 함께 사용하는 것이 일반적입니다. 전체 페이지 레이아웃은 Grid로, 개별 컴포넌트 내부 정렬은 Flexbox로 구현합니다. 또한 Grid는 겹치는 요소 배치가 가능하다는 장점도 있습니다.',
      },
    ],
  },
  {
    question: 'React의 상태 관리 방법들을 비교해서 설명해주세요.',
    answer:
      'React의 상태 관리는 목적에 따라 구분합니다. 컴포넌트 내부 상태는 useState나 useReducer를, 전역 상태는 Context API, Zustand, Redux 등을 사용합니다. 서버 상태(데이터 페칭, 캐싱)는 TanStack Query나 SWR 같은 전용 라이브러리로 분리하는 것이 현재 트렌드입니다. 상태의 범위와 복잡도에 맞는 도구를 선택하는 것이 중요합니다.',
    children: [
      {
        question:
          'Context API와 Zustand를 비교했을 때 각각의 장단점은 무엇인가요?',
        answer:
          'Context API는 추가 라이브러리 없이 React에 내장되어 있고 소규모 앱에 적합하지만, 컨텍스트 값이 변경될 때 해당 컨텍스트를 구독하는 모든 컴포넌트가 리렌더링되는 성능 문제가 있습니다. Zustand는 경량 라이브러리로 선택적 구독을 지원하여 불필요한 리렌더링을 방지합니다. 복잡한 전역 상태나 성능이 중요한 경우 Zustand를 선택합니다.',
      },
      {
        question: 'useReducer는 언제 useState 대신 사용하면 좋을까요?',
        answer:
          'useReducer는 상태 업데이트 로직이 복잡하거나, 여러 관련 상태가 함께 변경되거나, 다음 상태가 이전 상태에 의존하는 경우에 유리합니다. 예를 들어 폼 상태 관리나 장바구니처럼 여러 액션(추가, 삭제, 수정, 초기화)이 있을 때 switch문으로 로직을 명확히 분리할 수 있습니다. useState를 여러 개 사용하다가 관련 상태들이 흩어지고 업데이트 로직이 복잡해진다면 useReducer 전환을 고려합니다.',
      },
      {
        question:
          '서버 상태와 클라이언트 상태를 분리해서 관리하는 이유는 무엇인가요?',
        answer:
          '서버 상태는 원격에 저장되며 비동기 요청을 통해 가져오고, 클라이언트 상태는 UI 상태(모달 열림 여부, 필터 선택 등)처럼 로컬에만 존재합니다. 이를 분리하면 각각에 최적화된 도구를 사용할 수 있습니다. TanStack Query는 서버 상태의 캐싱, 재검증, 동기화를 자동으로 처리하며, Zustand나 useState는 클라이언트 상태 관리에 집중합니다.',
      },
    ],
  },
  {
    question: '브라우저의 렌더링 과정에 대해 설명해주세요.',
    answer:
      '브라우저의 렌더링은 다음 순서로 진행됩니다. ① HTML 파싱 → DOM 트리 생성 ② CSS 파싱 → CSSOM 트리 생성 ③ DOM + CSSOM 결합 → 렌더 트리 생성 ④ 레이아웃(Reflow): 요소의 크기와 위치 계산 ⑤ 페인트(Repaint): 픽셀 채우기 ⑥ 합성(Compositing): 레이어 합성. JavaScript는 파싱을 차단하므로 defer나 async 속성을 활용해 최적화합니다.',
    children: [
      {
        question:
          'Reflow와 Repaint의 차이점과 최적화 방법을 설명해주세요.',
        answer:
          'Reflow는 요소의 크기, 위치, 레이아웃이 변경될 때 발생하며 전체 렌더링 과정을 다시 실행합니다. Repaint는 레이아웃 변경 없이 색상, 배경색 등 시각적 속성만 변경될 때 발생합니다. Reflow는 비용이 더 크기 때문에 최적화가 중요합니다. 최적화 방법으로는 width/height 대신 transform 사용, 여러 스타일 변경을 한번에 처리, will-change CSS 속성으로 GPU 레이어 분리 등이 있습니다.',
      },
      {
        question:
          'Critical Rendering Path(CRP) 최적화 방법에는 어떤 것들이 있나요?',
        answer:
          'CRP는 브라우저가 첫 번째 픽셀을 화면에 표시하기까지의 과정입니다. 최적화 방법으로는 ① 렌더링 차단 리소스(CSS, JS) 최소화 - 중요 CSS를 인라인으로 포함 ② JS에 defer/async 속성 추가 ③ CSS 미디어 쿼리로 불필요한 스타일시트 조건부 로딩 ④ 중요 리소스를 preload로 미리 가져오기 ⑤ 초기 HTML 크기를 최소화하여 파싱 시간 단축 등이 있습니다.',
      },
      {
        question:
          '웹 성능 지표(LCP, FID, CLS)란 무엇이며 어떻게 개선할 수 있나요?',
        answer:
          'Core Web Vitals의 세 가지 핵심 지표입니다. LCP(Largest Contentful Paint)는 뷰포트에서 가장 큰 콘텐츠 요소가 렌더링되는 시간으로, 이미지 최적화와 서버 응답 시간 단축으로 개선합니다. FID(First Input Delay)는 사용자의 첫 상호작용에 대한 브라우저 응답 시간으로, JS 번들 크기 줄이기와 긴 태스크 분할로 개선합니다. CLS(Cumulative Layout Shift)는 예상치 못한 레이아웃 이동으로, 이미지에 크기 속성 지정으로 개선합니다.',
      },
    ],
  },
];
