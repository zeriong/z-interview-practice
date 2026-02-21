import type { InterviewItem } from "@/shared/types";

export const INTERVIEW_DATA: InterviewItem[] = [
  {
    question: "가상 DOM(Virtual DOM)이란 무엇이며, 왜 사용하나요?",
    answer:
      "<p>가상 DOM은 실제 DOM의 메모리 내 자바스크립트 표현입니다. React는 상태가 변경되면 새로운 가상 DOM 트리를 생성하고, 이전 트리와 비교(Diffing)하여 변경된 부분만 실제 DOM에 반영합니다. 실제 DOM 조작은 비용이 크기 때문에, 변경이 필요한 최소한의 노드만 업데이트하여 성능을 최적화합니다.</p>" +
      "<br/>" +
      "<p><strong>Q1. 그렇다면 Diffing 알고리즘은 구체적으로 어떻게 동작하나요?</strong></p>" +
      "<p>React의 Diffing 알고리즘은 두 가지 휴리스틱에 기반합니다. 첫째, 서로 다른 타입의 엘리먼트는 다른 트리를 만든다고 가정합니다. 둘째, 개발자가 key prop을 통해 자식 엘리먼트의 안정적인 식별자를 제공할 수 있습니다. 이 전략 덕분에 일반적인 트리 비교의 O(n³) 복잡도를 O(n)으로 줄일 수 있습니다. 같은 타입의 DOM 엘리먼트일 경우 변경된 속성만 업데이트하고, 다른 타입이면 기존 트리를 완전히 해체한 뒤 새 트리를 구축합니다.</p>" +
      "<br/>" +
      "<p><strong>Q2. key prop이 Diffing 성능에 미치는 영향은 무엇인가요?</strong></p>" +
      "<p>key는 React가 리스트 렌더링 시 각 요소의 동일성을 판별하는 기준입니다. key가 없거나 배열 인덱스를 key로 사용하면, 리스트 중간에 요소가 삽입·삭제될 때 React는 변경되지 않은 요소까지 불필요하게 재렌더링합니다. 안정적이고 고유한 key(예: DB의 id)를 부여하면, React가 이동·추가·삭제를 정확히 파악하여 최소한의 DOM 조작만 수행합니다. 또한 key가 변경되면 컴포넌트가 완전히 언마운트 후 재마운트되므로, 강제 리셋 패턴으로 활용하기도 합니다.</p>" +
      "<br/>" +
      "<p><strong>Q3. Fiber 아키텍처와 기존 Stack Reconciler의 차이는 무엇인가요?</strong></p>" +
      "<p>기존 Stack Reconciler는 재귀적으로 트리를 탐색하며 동기적으로 모든 작업을 완료해야 했기 때문에, 큰 트리를 업데이트할 때 메인 스레드가 장시간 블로킹되어 사용자 입력이 끊기는 문제가 있었습니다. Fiber 아키텍처는 각 컴포넌트를 'fiber'라는 작업 단위(unit of work)로 분할하여 렌더링을 중단·재개할 수 있게 합니다. 이를 통해 우선순위 기반 스케줄링이 가능해져, 사용자 인터랙션 같은 긴급한 업데이트를 먼저 처리하고 덜 중요한 업데이트는 유휴 시간에 처리합니다. React 18의 Concurrent Features(startTransition, useDeferredValue 등)는 이 Fiber 아키텍처 위에 구현된 것입니다.</p>",
  },
  {
    question: "JavaScript의 이벤트 루프(Event Loop)에 대해 설명해주세요.",
    answer:
      "<p>자바스크립트는 싱글 스레드 언어지만 이벤트 루프를 통해 비동기 작업을 처리합니다. 콜 스택에서 현재 코드 실행이 끝나면, 이벤트 루프가 마이크로태스크 큐(Promise, MutationObserver)를 먼저 비우고, 그 다음 매크로태스크 큐(setTimeout, setInterval, I/O)에서 하나씩 가져와 실행합니다. 이 사이클이 반복되며 비동기 작업을 처리합니다.</p>" +
      "<br/>" +
      "<p><strong>Q1. 마이크로태스크와 매크로태스크의 실행 순서가 다른 이유는 무엇인가요?</strong></p>" +
      "<p>마이크로태스크(Promise.then, queueMicrotask, MutationObserver)는 현재 실행 중인 태스크가 완료된 직후, 렌더링 전에 큐가 완전히 비워질 때까지 실행됩니다. 반면 매크로태스크(setTimeout, setInterval, I/O 콜백)는 한 번에 하나씩만 처리되고, 그 사이에 렌더링 기회가 주어집니다. 이 설계는 Promise 체인 같은 비동기 흐름의 일관성을 보장하기 위함입니다. 만약 마이크로태스크 사이에 렌더링이 끼어들면, Promise 체인 중간에 예기치 않은 UI 상태가 노출될 수 있기 때문입니다.</p>" +
      "<br/>" +
      "<p><strong>Q2. 그렇다면 마이크로태스크가 무한히 쌓이면 렌더링이 영원히 블로킹될 수 있나요?</strong></p>" +
      "<p>네, 그렇습니다. 마이크로태스크 큐는 완전히 비워질 때까지 실행되므로, 마이크로태스크 안에서 새로운 마이크로태스크를 계속 추가하면 이벤트 루프가 렌더링 단계로 넘어가지 못해 UI가 완전히 멈춥니다. 이것이 <code>Promise.resolve().then(function recursive() { Promise.resolve().then(recursive); })</code> 같은 코드가 브라우저를 행(hang)시키는 이유입니다. 반면 <code>setTimeout(recursive, 0)</code>은 매 태스크 사이에 렌더링 기회가 보장되므로 UI가 멈추지 않습니다. 이러한 차이를 이해하고 적절한 스케줄링 API를 선택하는 것이 중요합니다.</p>" +
      "<br/>" +
      "<p><strong>Q3. requestAnimationFrame은 이벤트 루프에서 어디에 위치하나요?</strong></p>" +
      "<p>requestAnimationFrame(rAF)은 매크로태스크도 마이크로태스크도 아닌 별도의 단계에서 실행됩니다. 이벤트 루프의 한 사이클에서 매크로태스크 하나 실행 → 마이크로태스크 큐 비우기 → 렌더링 필요 여부 판단 → (렌더링이 필요하면) rAF 콜백 실행 → 레이아웃·페인트 순서로 진행됩니다. rAF는 브라우저의 실제 화면 갱신 주기(보통 60fps, 약 16.6ms)에 맞춰 호출되므로, 애니메이션 로직에 최적화되어 있습니다. 반면 requestIdleCallback은 프레임에 여유 시간이 있을 때 실행되어, 우선순위가 낮은 작업(분석 전송, 캐시 정리 등)에 적합합니다.</p>",
  },
  {
    question:
      "CSS Flexbox와 Grid의 차이점과 각각 언제 사용하는지 설명해주세요.",
    answer:
      "<p>Flexbox는 주로 1차원(단일 축) 레이아웃에 사용되며, 요소들의 정렬과 공간 분배에 탁월합니다. Grid는 2차원(행과 열) 레이아웃을 다루며 복잡한 레이아웃 구성에 적합합니다. 내비게이션 바나 버튼 그룹처럼 단순히 나란히 배치할 때는 Flexbox를, 카드 갤러리나 전체 페이지 레이아웃처럼 행과 열이 모두 필요할 때는 Grid를 사용합니다.</p>" +
      "<br/>" +
      "<p><strong>Q1. Grid의 auto-fill과 auto-fit의 차이는 무엇인가요?</strong></p>" +
      "<p>둘 다 <code>repeat()</code> 함수 내에서 사용되어 컨테이너 크기에 따라 자동으로 트랙 수를 결정합니다. 핵심 차이는 남은 공간 처리 방식입니다. <code>auto-fill</code>은 남는 공간이 있으면 빈 트랙을 유지하여 그리드 구조를 보존합니다. 반면 <code>auto-fit</code>은 빈 트랙을 0으로 축소(collapse)하여 실제 아이템들이 남은 공간을 차지하도록 합니다. 예를 들어 <code>grid-template-columns: repeat(auto-fit, minmax(200px, 1fr))</code>은 아이템이 적을 때 각 아이템이 확장되어 전체 너비를 채우지만, <code>auto-fill</code>은 아이템 크기가 유지되고 우측에 빈 공간이 남습니다.</p>" +
      "<br/>" +
      "<p><strong>Q2. CSS Subgrid는 어떤 문제를 해결하며, 기존 Grid와 어떻게 다른가요?</strong></p>" +
      "<p>기존 Grid에서 자식 요소를 다시 Grid로 만들면, 부모 Grid의 트랙 라인과 자식 Grid의 트랙이 독립적으로 동작하여 정렬이 어긋나는 문제가 있었습니다. 예를 들어 카드 리스트에서 각 카드 내부의 제목·본문·버튼 영역을 카드 간에 일관되게 정렬하려면, 자식도 부모의 트랙을 상속받아야 합니다. <code>grid-template-rows: subgrid</code>를 사용하면 자식 그리드가 부모의 행 트랙을 그대로 참조하여, 형제 요소 간 내부 구조가 자동으로 정렬됩니다. 2024년 기준 모든 모던 브라우저에서 지원됩니다.</p>" +
      "<br/>" +
      "<p><strong>Q3. 컨테이너 쿼리(Container Queries)는 미디어 쿼리와 어떻게 다르며, Flexbox/Grid와 함께 어떻게 활용하나요?</strong></p>" +
      "<p>미디어 쿼리는 뷰포트(전체 화면) 크기에 반응하지만, 컨테이너 쿼리는 부모 컨테이너의 크기에 반응합니다. 이는 컴포넌트 기반 설계에서 핵심적인 차이입니다. 같은 카드 컴포넌트가 사이드바(좁은 컨테이너)에서는 세로 레이아웃으로, 메인 영역(넓은 컨테이너)에서는 가로 레이아웃으로 자동 전환되어야 할 때, 미디어 쿼리로는 컴포넌트의 배치 맥락을 알 수 없습니다. <code>container-type: inline-size</code>를 선언하고 <code>@container (min-width: 400px)</code>로 조건을 걸면, Grid의 <code>grid-template-columns</code>를 컨테이너 크기에 따라 동적으로 변경할 수 있어 진정한 컴포넌트 단위의 반응형 설계가 가능합니다.</p>",
  },
  {
    question: "React의 상태 관리 방법들을 비교해서 설명해주세요.",
    answer:
      "<p>React의 상태 관리는 목적에 따라 구분합니다. 컴포넌트 내부 상태는 useState나 useReducer를, 전역 상태는 Context API, Zustand, Redux 등을 사용합니다. 서버 상태(데이터 페칭, 캐싱)는 TanStack Query나 SWR 같은 전용 라이브러리로 분리하는 것이 현재 트렌드입니다. 상태의 범위와 복잡도에 맞는 도구를 선택하는 것이 중요합니다.</p>" +
      "<br/>" +
      "<p><strong>Q1. Context API를 전역 상태 관리로 사용할 때의 리렌더링 문제는 무엇이며, 어떻게 해결하나요?</strong></p>" +
      "<p>Context의 value가 변경되면 해당 Context를 구독하는 모든 컴포넌트가 리렌더링됩니다. value 객체 안의 특정 프로퍼티만 사용하는 컴포넌트도 예외 없이 리렌더링되는데, 이는 Context가 값의 부분 구독(selector)을 지원하지 않기 때문입니다. 해결 방법으로는 Context를 관심사별로 분리하거나, <code>React.memo</code>와 <code>useMemo</code>로 불필요한 리렌더링을 차단할 수 있습니다. 또는 Zustand 같은 외부 스토어 라이브러리를 사용하면 selector를 통해 상태의 특정 슬라이스만 구독하여 해당 값이 변경될 때만 리렌더링되도록 최적화할 수 있습니다.</p>" +
      "<br/>" +
      "<p><strong>Q2. useSyncExternalStore는 어떤 문제를 해결하기 위해 등장했나요?</strong></p>" +
      "<p>React 18의 Concurrent Rendering 도입으로 'tearing' 문제가 발생할 수 있게 되었습니다. Tearing이란 하나의 렌더 과정에서 외부 스토어의 값이 중간에 변경되어, 같은 상태를 구독하는 컴포넌트들이 서로 다른 값을 표시하는 현상입니다. <code>useSyncExternalStore</code>는 외부 스토어의 읽기를 React의 렌더링 사이클과 동기화하여 이 문제를 해결합니다. Zustand, Redux 같은 외부 상태 관리 라이브러리가 내부적으로 이 훅을 사용하여 Concurrent 모드에서도 일관된 UI를 보장합니다. subscribe 함수와 getSnapshot 함수를 인자로 받아, 스냅샷이 렌더 중간에 변경되면 동기적으로 재렌더링을 강제합니다.</p>" +
      "<br/>" +
      "<p><strong>Q3. 서버 상태와 클라이언트 상태를 분리해야 하는 이유는 무엇인가요?</strong></p>" +
      "<p>서버 상태는 클라이언트 상태와 본질적으로 다른 특성을 가집니다. 서버 상태는 원격에 저장되어 있어 항상 최신 상태를 보장할 수 없고, 다른 사용자에 의해 변경될 수 있으며, 캐싱·재검증·동기화·백그라운드 갱신 같은 고유한 문제를 가집니다. 이를 Redux 같은 클라이언트 상태 관리 도구로 다루면, 로딩/에러/캐시 관리를 위한 보일러플레이트가 과도하게 늘어납니다. TanStack Query는 stale-while-revalidate 전략, 자동 백그라운드 갱신, 옵티미스틱 업데이트, 무한 스크롤 쿼리 등 서버 상태에 특화된 기능을 제공합니다. 결과적으로 전역 스토어에는 UI 상태(모달 열림, 테마 설정 등)만 남게 되어 코드가 훨씬 단순해집니다.</p>",
  },
  {
    question: "브라우저의 렌더링 과정에 대해 설명해주세요.",
    answer:
      "<p>브라우저의 렌더링은 다음 순서로 진행됩니다. ① HTML 파싱 → DOM 트리 생성 ② CSS 파싱 → CSSOM 트리 생성 ③ DOM + CSSOM 결합 → 렌더 트리 생성 ④ 레이아웃(Reflow): 요소의 크기와 위치 계산 ⑤ 페인트(Repaint): 픽셀 채우기 ⑥ 합성(Compositing): 레이어 합성. JavaScript는 파싱을 차단하므로 defer나 async 속성을 활용해 최적화합니다.</p>" +
      "<br/>" +
      "<p><strong>Q1. Reflow(Layout)를 최소화하기 위한 구체적인 방법에는 어떤 것들이 있나요?</strong></p>" +
      "<p>Reflow는 요소의 기하학적 속성(위치, 크기)이 변경될 때 발생하며, 부모·자식·형제 요소에 연쇄적으로 영향을 미치는 비용이 큰 연산입니다. 최소화 방법으로는: ① DOM 변경을 배치(batch)하여 한 번에 처리하기 — <code>DocumentFragment</code>나 <code>display: none</code> 상태에서 변경 후 다시 보이기 ② <code>offsetHeight</code>, <code>getBoundingClientRect()</code> 같은 레이아웃 속성 읽기를 DOM 변경과 분리하기(읽기-쓰기를 인터리빙하면 강제 동기 레이아웃 발생) ③ width/top 대신 <code>transform</code>을 사용하여 합성(composite) 단계에서만 처리하기 ④ <code>contain: layout</code>으로 Reflow 범위를 특정 서브트리로 제한하기 등이 있습니다.</p>" +
      "<br/>" +
      "<p><strong>Q2. 합성 레이어(Compositing Layer)는 어떤 조건에서 생성되며, 성능에 어떤 영향을 주나요?</strong></p>" +
      "<p>브라우저는 특정 조건을 만족하는 요소를 별도의 합성 레이어로 승격(promote)합니다. 주요 조건으로는 <code>transform: translateZ(0)</code>, <code>will-change: transform</code>, <code>opacity</code> 애니메이션, <code>position: fixed</code>, <code>&lt;video&gt;</code>/<code>&lt;canvas&gt;</code> 요소 등이 있습니다. 합성 레이어의 장점은 해당 레이어만 GPU에서 독립적으로 합성할 수 있어, 애니메이션 시 Reflow/Repaint 없이 처리가 가능하다는 것입니다. 그러나 레이어가 과도하게 많아지면 GPU 메모리 소비가 증가하고, 레이어 간 합성 비용이 커져서 오히려 성능이 저하됩니다. Chrome DevTools의 Layers 패널에서 레이어 수와 메모리 사용량을 확인할 수 있습니다.</p>" +
      "<br/>" +
      "<p><strong>Q3. will-change 속성을 사용할 때 주의해야 할 점은 무엇인가요?</strong></p>" +
      "<p><code>will-change</code>는 브라우저에게 특정 속성이 곧 변경될 것임을 미리 알려 최적화를 준비하게 하는 힌트입니다. 그러나 남용하면 심각한 문제를 초래합니다. 첫째, 모든 요소에 <code>will-change: transform</code>을 적용하면 각 요소가 별도 합성 레이어로 승격되어 GPU 메모리가 급증합니다. 둘째, CSS에 영구적으로 선언하면 브라우저가 최적화 리소스를 계속 유지하므로, JavaScript로 애니메이션 시작 전에 추가하고 완료 후 제거하는 것이 바람직합니다. 셋째, <code>will-change: auto</code> 외의 값은 새로운 스태킹 컨텍스트(stacking context)를 생성하여 z-index 동작에 영향을 줄 수 있습니다. 실제 성능 병목이 확인된 요소에만 선택적으로 적용하는 것이 원칙입니다.</p>",
  },
];
