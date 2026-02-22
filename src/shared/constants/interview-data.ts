import type { InterviewItem } from "@/shared/types";

export const INTERVIEW_DATA: InterviewItem[] = [
  // ─────────────────────────────────────────────
  // 기존 항목 (가상 DOM, 이벤트 루프, Flexbox/Grid, 상태관리, 렌더링)
  // ─────────────────────────────────────────────
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
      "<p>네, 그렇습니다. 마이크로태스크 큐는 완전히 비워질 때까지 실행되므로, 마이크로태스크 안에서 새로운 마이크로태스크를 계속 추가하면 이벤트 루프가 렌더링 단계로 넘어가지 못해 UI가 완전히 멈춥니다. 이것이 <code>Promise.resolve().then(function recursive() { Promise.resolve().then(recursive); })</code> 같은 코드가 브라우저를 행(hang)시키는 이유입니다. 반면 <code>setTimeout(recursive, 0)</code>은 매 태스크 사이에 렌더링 기회가 보장되므로 UI가 멈추지 않습니다.</p>" +
      "<br/>" +
      "<p><strong>Q3. requestAnimationFrame은 이벤트 루프에서 어디에 위치하나요?</strong></p>" +
      "<p>requestAnimationFrame(rAF)은 매크로태스크도 마이크로태스크도 아닌 별도의 단계에서 실행됩니다. 이벤트 루프의 한 사이클에서 매크로태스크 하나 실행 → 마이크로태스크 큐 비우기 → 렌더링 필요 여부 판단 → (렌더링이 필요하면) rAF 콜백 실행 → 레이아웃·페인트 순서로 진행됩니다. rAF는 브라우저의 실제 화면 갱신 주기(보통 60fps, 약 16.6ms)에 맞춰 호출되므로, 애니메이션 로직에 최적화되어 있습니다. 반면 requestIdleCallback은 프레임에 여유 시간이 있을 때 실행되어, 우선순위가 낮은 작업에 적합합니다.</p>",
  },
  {
    question:
      "CSS Flexbox와 Grid의 차이점과 각각 언제 사용하는지 설명해주세요.",
    answer:
      "<p>Flexbox는 주로 1차원(단일 축) 레이아웃에 사용되며, 요소들의 정렬과 공간 분배에 탁월합니다. Grid는 2차원(행과 열) 레이아웃을 다루며 복잡한 레이아웃 구성에 적합합니다. 내비게이션 바나 버튼 그룹처럼 단순히 나란히 배치할 때는 Flexbox를, 카드 갤러리나 전체 페이지 레이아웃처럼 행과 열이 모두 필요할 때는 Grid를 사용합니다.</p>" +
      "<br/>" +
      "<p><strong>Q1. Grid의 auto-fill과 auto-fit의 차이는 무엇인가요?</strong></p>" +
      "<p>둘 다 <code>repeat()</code> 함수 내에서 사용되어 컨테이너 크기에 따라 자동으로 트랙 수를 결정합니다. 핵심 차이는 남은 공간 처리 방식입니다. <code>auto-fill</code>은 남는 공간이 있으면 빈 트랙을 유지하여 그리드 구조를 보존합니다. 반면 <code>auto-fit</code>은 빈 트랙을 0으로 축소(collapse)하여 실제 아이템들이 남은 공간을 차지하도록 합니다.</p>" +
      "<br/>" +
      "<p><strong>Q2. CSS Subgrid는 어떤 문제를 해결하며, 기존 Grid와 어떻게 다른가요?</strong></p>" +
      "<p>기존 Grid에서 자식 요소를 다시 Grid로 만들면, 부모 Grid의 트랙 라인과 자식 Grid의 트랙이 독립적으로 동작하여 정렬이 어긋나는 문제가 있었습니다. <code>grid-template-rows: subgrid</code>를 사용하면 자식 그리드가 부모의 행 트랙을 그대로 참조하여, 형제 요소 간 내부 구조가 자동으로 정렬됩니다.</p>" +
      "<br/>" +
      "<p><strong>Q3. 컨테이너 쿼리(Container Queries)는 미디어 쿼리와 어떻게 다르며, Flexbox/Grid와 함께 어떻게 활용하나요?</strong></p>" +
      "<p>미디어 쿼리는 뷰포트(전체 화면) 크기에 반응하지만, 컨테이너 쿼리는 부모 컨테이너의 크기에 반응합니다. 이는 컴포넌트 기반 설계에서 핵심적인 차이입니다. <code>container-type: inline-size</code>를 선언하고 <code>@container (min-width: 400px)</code>로 조건을 걸면, Grid의 <code>grid-template-columns</code>를 컨테이너 크기에 따라 동적으로 변경할 수 있어 진정한 컴포넌트 단위의 반응형 설계가 가능합니다.</p>",
  },
  {
    question: "React의 상태 관리 방법들을 비교해서 설명해주세요.",
    answer:
      "<p>React의 상태 관리는 목적에 따라 구분합니다. 컴포넌트 내부 상태는 useState나 useReducer를, 전역 상태는 Context API, Zustand, Redux 등을 사용합니다. 서버 상태(데이터 페칭, 캐싱)는 TanStack Query나 SWR 같은 전용 라이브러리로 분리하는 것이 현재 트렌드입니다. 상태의 범위와 복잡도에 맞는 도구를 선택하는 것이 중요합니다.</p>" +
      "<br/>" +
      "<p><strong>Q1. Context API를 전역 상태 관리로 사용할 때의 리렌더링 문제는 무엇이며, 어떻게 해결하나요?</strong></p>" +
      "<p>Context의 value가 변경되면 해당 Context를 구독하는 모든 컴포넌트가 리렌더링됩니다. Context가 값의 부분 구독(selector)을 지원하지 않기 때문입니다. 해결 방법으로는 Context를 관심사별로 분리하거나, <code>React.memo</code>와 <code>useMemo</code>로 불필요한 리렌더링을 차단할 수 있습니다. 또는 Zustand 같은 외부 스토어 라이브러리를 사용하면 selector를 통해 상태의 특정 슬라이스만 구독하여 해당 값이 변경될 때만 리렌더링되도록 최적화할 수 있습니다.</p>" +
      "<br/>" +
      "<p><strong>Q2. useSyncExternalStore는 어떤 문제를 해결하기 위해 등장했나요?</strong></p>" +
      "<p>React 18의 Concurrent Rendering 도입으로 'tearing' 문제가 발생할 수 있게 되었습니다. Tearing이란 하나의 렌더 과정에서 외부 스토어의 값이 중간에 변경되어, 같은 상태를 구독하는 컴포넌트들이 서로 다른 값을 표시하는 현상입니다. <code>useSyncExternalStore</code>는 외부 스토어의 읽기를 React의 렌더링 사이클과 동기화하여 이 문제를 해결합니다.</p>" +
      "<br/>" +
      "<p><strong>Q3. 서버 상태와 클라이언트 상태를 분리해야 하는 이유는 무엇인가요?</strong></p>" +
      "<p>서버 상태는 원격에 저장되어 있어 항상 최신 상태를 보장할 수 없고, 다른 사용자에 의해 변경될 수 있으며, 캐싱·재검증·동기화·백그라운드 갱신 같은 고유한 문제를 가집니다. TanStack Query는 stale-while-revalidate 전략, 자동 백그라운드 갱신, 옵티미스틱 업데이트 등 서버 상태에 특화된 기능을 제공합니다. 결과적으로 전역 스토어에는 UI 상태(모달 열림, 테마 설정 등)만 남게 되어 코드가 훨씬 단순해집니다.</p>",
  },
  {
    question: "브라우저의 렌더링 과정에 대해 설명해주세요.",
    answer:
      "<p>브라우저의 렌더링은 다음 순서로 진행됩니다. ① HTML 파싱 → DOM 트리 생성 ② CSS 파싱 → CSSOM 트리 생성 ③ DOM + CSSOM 결합 → 렌더 트리 생성 ④ 레이아웃(Reflow): 요소의 크기와 위치 계산 ⑤ 페인트(Repaint): 픽셀 채우기 ⑥ 합성(Compositing): 레이어 합성. JavaScript는 파싱을 차단하므로 defer나 async 속성을 활용해 최적화합니다.</p>" +
      "<br/>" +
      "<p><strong>Q1. Reflow(Layout)를 최소화하기 위한 구체적인 방법에는 어떤 것들이 있나요?</strong></p>" +
      "<p>Reflow는 요소의 기하학적 속성이 변경될 때 발생하며, 부모·자식·형제 요소에 연쇄적으로 영향을 미치는 비용이 큰 연산입니다. 최소화 방법으로는: ① DOM 변경을 배치(batch)하여 한 번에 처리 ② <code>offsetHeight</code>, <code>getBoundingClientRect()</code> 같은 레이아웃 속성 읽기를 DOM 변경과 분리하기 ③ width/top 대신 <code>transform</code>을 사용하여 합성 단계에서만 처리하기 ④ <code>contain: layout</code>으로 Reflow 범위를 제한하기 등이 있습니다.</p>" +
      "<br/>" +
      "<p><strong>Q2. 합성 레이어(Compositing Layer)는 어떤 조건에서 생성되며, 성능에 어떤 영향을 주나요?</strong></p>" +
      "<p>브라우저는 특정 조건을 만족하는 요소를 별도의 합성 레이어로 승격합니다. 주요 조건으로는 <code>transform: translateZ(0)</code>, <code>will-change: transform</code>, <code>opacity</code> 애니메이션 등이 있습니다. 합성 레이어는 GPU에서 독립적으로 합성할 수 있어 애니메이션 시 Reflow/Repaint 없이 처리가 가능하지만, 레이어가 과도하면 GPU 메모리 소비가 증가하여 오히려 성능이 저하됩니다.</p>" +
      "<br/>" +
      "<p><strong>Q3. will-change 속성을 사용할 때 주의해야 할 점은 무엇인가요?</strong></p>" +
      "<p><code>will-change</code>는 브라우저에게 특정 속성이 곧 변경될 것임을 알려 최적화를 준비하게 하는 힌트입니다. 그러나 모든 요소에 적용하면 각 요소가 별도 합성 레이어로 승격되어 GPU 메모리가 급증합니다. CSS에 영구적으로 선언하면 리소스를 계속 유지하므로, JavaScript로 애니메이션 시작 전에 추가하고 완료 후 제거하는 것이 바람직합니다. 실제 성능 병목이 확인된 요소에만 선택적으로 적용하는 것이 원칙입니다.</p>",
  },
  // ─────────────────────────────────────────────
  // JavaScript 기초
  // ─────────────────────────────────────────────
  {
    question: "==과 ===의 차이점은 무엇인가요?",
    answer:
      "<p><code>==</code>(동등 연산자)는 비교 전에 타입 변환(type coercion)을 수행하여 두 값을 같은 타입으로 맞춘 뒤 비교합니다. 반면 <code>===</code>(일치 연산자)는 타입 변환 없이 값과 타입 모두 동일해야 true를 반환합니다. 예를 들어 <code>'1' == 1</code>은 true이지만 <code>'1' === 1</code>은 false입니다. 실무에서는 예측 가능성을 위해 항상 <code>===</code>를 사용하는 것이 권장됩니다.</p>" +
      "<br/>" +
      "<p><strong>Q1. ==에서 타입 변환이 일어나는 구체적인 규칙은 무엇인가요?</strong></p>" +
      "<p>ECMAScript 명세의 Abstract Equality Comparison 알고리즘에 따라 변환됩니다. null과 undefined는 서로만 동등하고 다른 타입과는 false입니다. 숫자와 문자열 비교 시 문자열이 숫자로 변환됩니다. 불리언은 먼저 숫자로 변환됩니다(true→1, false→0). 객체와 원시값 비교 시 객체의 <code>[Symbol.toPrimitive]</code>, <code>valueOf()</code>, <code>toString()</code> 순으로 원시값 변환을 시도합니다. 이 복잡한 규칙이 <code>[] == false</code>가 true인 이유입니다.</p>" +
      "<br/>" +
      "<p><strong>Q2. Object.is()는 ===와 어떻게 다른가요?</strong></p>" +
      "<p><code>Object.is()</code>는 <code>===</code>와 거의 동일하지만 두 가지 예외가 있습니다. <code>NaN === NaN</code>은 false이지만 <code>Object.is(NaN, NaN)</code>은 true입니다. <code>+0 === -0</code>은 true이지만 <code>Object.is(+0, -0)</code>은 false입니다. React의 상태 비교에서 <code>Object.is()</code>를 사용하며, 이것이 <code>setState(currentValue)</code>로 같은 값을 설정해도 리렌더링이 발생하지 않는 근거입니다.</p>" +
      "<br/>" +
      "<p><strong>Q3. 린터에서 eqeqeq 규칙을 강제하는 이유와 예외적으로 ==가 유용한 상황이 있나요?</strong></p>" +
      "<p>ESLint/Biome의 eqeqeq 규칙은 암묵적 타입 변환으로 인한 버그를 예방합니다. 유일하게 <code>== null</code>은 관용적으로 허용되는데, <code>value == null</code>은 <code>value === null || value === undefined</code>와 동일하여 null/undefined 동시 체크의 축약형으로 유용합니다. TypeScript에서는 strictNullChecks와 함께 optional chaining(<code>?.</code>)과 nullish coalescing(<code>??</code>)이 더 안전한 대안입니다.</p>",
  },
  {
    question: "const, let, var의 차이점은 무엇인가요?",
    answer:
      "<p><code>var</code>는 함수 스코프를 가지며 호이스팅 시 undefined로 초기화됩니다. <code>let</code>과 <code>const</code>는 블록 스코프를 가지며 호이스팅되지만 TDZ(Temporal Dead Zone)로 인해 선언 전 접근 시 ReferenceError가 발생합니다. <code>const</code>는 재할당이 불가하지만 객체의 내부 프로퍼티 변경은 가능합니다. ES6 이후 <code>const</code>를 기본으로, 재할당이 필요한 경우에만 <code>let</code>을 사용하는 것이 관례입니다.</p>" +
      "<br/>" +
      "<p><strong>Q1. TDZ(Temporal Dead Zone)란 정확히 무엇이며 왜 존재하나요?</strong></p>" +
      "<p>TDZ는 변수가 스코프에 진입한 시점부터 실제 선언문이 실행되는 시점까지의 구간입니다. 이 구간에서 변수에 접근하면 ReferenceError가 발생합니다. TDZ가 존재하는 이유는 <code>var</code>의 호이스팅으로 인한 혼란(선언 전 접근 시 undefined)을 방지하기 위함입니다. <code>typeof</code> 연산자도 TDZ 내의 변수에 대해 ReferenceError를 발생시킵니다. 이는 개발자가 변수를 사용하기 전에 반드시 선언하도록 강제하여 코드의 예측 가능성을 높입니다.</p>" +
      "<br/>" +
      "<p><strong>Q2. const로 선언한 객체의 불변성을 완전히 보장하려면 어떻게 해야 하나요?</strong></p>" +
      "<p><code>const</code>는 바인딩의 불변성만 보장하고 값의 불변성은 보장하지 않습니다. <code>Object.freeze()</code>로 1단계 동결이 가능하지만 중첩 객체는 동결되지 않습니다. 깊은 동결은 재귀적으로 <code>Object.freeze()</code>를 적용하거나, Immer 라이브러리로 불변 업데이트를 수행합니다. TypeScript에서는 <code>as const</code>로 타입 레벨에서 readonly를 강제할 수 있습니다.</p>" +
      "<br/>" +
      "<p><strong>Q3. var가 여전히 사용되는 레거시 코드에서 어떤 문제가 발생하며, 어떻게 마이그레이션하나요?</strong></p>" +
      "<p>var의 대표적 문제는 for 루프 클로저 이슈입니다. <code>for (var i = 0; i < 5; i++) { setTimeout(() => console.log(i), 0) }</code>는 모두 5를 출력하는데, var가 함수 스코프이므로 하나의 i를 공유하기 때문입니다. <code>let</code>으로 바꾸면 각 반복이 독립 스코프를 가져 0,1,2,3,4가 출력됩니다. 마이그레이션은 ESLint의 <code>no-var</code> 규칙과 <code>--fix</code> 옵션으로 자동화할 수 있습니다.</p>",
  },
  {
    question: "왜 let과 var는 다르게 쓰이는가?",
    answer:
      "<p>let과 var의 핵심 차이는 스코프입니다. var는 함수 레벨 스코프로, if문이나 for문 블록 안에서 선언해도 함수 전체에서 접근 가능합니다. let은 블록 레벨 스코프로, 선언된 블록 내에서만 유효합니다. 이 차이 때문에 var는 의도치 않은 변수 공유와 오염 문제를 일으킬 수 있어, ES6부터 let과 const가 도입되어 더 안전한 스코프 관리가 가능해졌습니다.</p>" +
      "<br/>" +
      "<p><strong>Q1. var의 함수 스코프가 실무에서 일으킬 수 있는 구체적인 버그 사례를 설명해주세요.</strong></p>" +
      "<p>가장 흔한 사례는 이벤트 핸들러 등록 루프입니다. <code>for (var i = 0; i < buttons.length; i++) { buttons[i].onclick = function() { alert(i); } }</code>에서 모든 버튼이 같은 i값(buttons.length)을 참조합니다. 또한 if 블록 안의 var 선언이 함수 전체를 오염시켜, 다른 개발자가 같은 변수명을 사용할 때 예기치 않은 덮어쓰기가 발생합니다.</p>" +
      "<br/>" +
      "<p><strong>Q2. 모듈 시스템(ESM)에서 var의 동작은 스크립트 태그와 어떻게 다른가요?</strong></p>" +
      '<p>일반 <code>&lt;script&gt;</code> 태그에서 var로 선언한 변수는 전역 객체(window)의 프로퍼티가 됩니다. 반면 ES 모듈(<code>&lt;script type="module"&gt;</code>)에서는 var로 선언해도 모듈 스코프에 갇혀 전역 객체를 오염시키지 않습니다. 이는 ESM이 각 모듈을 독립적인 스코프로 감싸기 때문입니다.</p>' +
      "<br/>" +
      "<p><strong>Q3. const를 기본값으로 사용하고 let은 최소한으로 쓰는 전략의 근거는 무엇인가요?</strong></p>" +
      "<p>const를 기본으로 사용하면 코드 리뷰 시 '이 변수는 재할당되지 않는다'는 의도가 명확해져 가독성이 높아집니다. 재할당이 필요한 경우(카운터, 누적값, 조건부 할당)에만 let을 사용하면 변수의 변경 가능성을 한눈에 파악할 수 있습니다. 또한 JavaScript 엔진이 const를 최적화하기 유리합니다. 단, const 객체의 프로퍼티 변경은 허용되므로, 진정한 불변성이 필요하면 Object.freeze나 Immer를 사용해야 합니다.</p>",
  },
  // ─────────────────────────────────────────────
  // JavaScript 비동기 / 이벤트 / 메모리
  // ─────────────────────────────────────────────
  {
    question: "자바스크립트가 어떻게 비동기적으로 실행될 수 있는지?",
    answer:
      "<p>자바스크립트는 싱글 스레드 언어임에도 비동기 실행이 가능한 이유는, 실제 비동기 작업(네트워크 요청, 타이머, I/O)을 브라우저 또는 Node.js의 Web API/libuv가 별도 스레드에서 처리하기 때문입니다. 자바스크립트 엔진(V8)은 콜 스택 하나만 가지고 있지만, 비동기 작업을 위임한 뒤 그 결과물인 콜백·Promise 핸들러가 태스크 큐에 적재되고, 이벤트 루프가 콜 스택이 비어있는 시점에 꺼내 실행하는 구조를 통해 블로킹 없이 여러 작업을 처리합니다.</p>" +
      "<br/>" +
      "<p><strong>Q1. Web API와 자바스크립트 엔진의 경계가 실제 코드에서 어떻게 나타나나요?</strong></p>" +
      "<p><code>setTimeout(callback, 1000)</code>을 호출하면, 자바스크립트 엔진은 Web API에 타이머 등록만 하고 즉시 다음 코드로 넘어갑니다. 1초 후 Web API가 타이머를 완료하면 callback을 매크로태스크 큐에 넣고, 이벤트 루프가 콜 스택이 비면 꺼내 실행합니다. <code>fetch(url).then(cb)</code>도 마찬가지로 네트워크 요청은 브라우저가 처리하고 응답이 오면 cb가 마이크로태스크 큐에 적재됩니다.</p>" +
      "<br/>" +
      "<p><strong>Q2. Node.js 환경에서의 비동기 실행 구조는 브라우저와 어떻게 다른가요?</strong></p>" +
      "<p>브라우저는 Web API를 제공하지만, Node.js는 libuv라는 C++ 라이브러리가 파일 I/O, 네트워크, 타이머 등을 스레드 풀(기본 4개)로 처리합니다. Node.js의 이벤트 루프는 timers → pending callbacks → idle/prepare → poll → check → close callbacks 6단계 페이즈를 순환합니다. <code>setImmediate()</code>는 check 페이즈에서, <code>process.nextTick()</code>은 각 페이즈 전환 시마다 실행되는 Node.js 고유 동작이 있습니다.</p>" +
      "<br/>" +
      "<p><strong>Q3. async/await은 내부적으로 어떻게 비동기 실행을 구현하나요?</strong></p>" +
      "<p>async/await은 제너레이터(Generator)와 Promise를 기반으로 한 문법 설탕입니다. <code>await</code>을 만나면 현재 함수의 실행이 일시 중단되고, 해당 Promise가 마이크로태스크 큐를 통해 처리됩니다. 중요한 점은 <code>await</code> 이후 코드는 항상 마이크로태스크로 스케줄링되므로, 동기 코드보다 늦게 실행되며, 같은 async 함수 내에서도 <code>await</code> 개수만큼 마이크로태스크 큐를 거칩니다.</p>",
  },
  {
    question:
      "왜 자바스크립트를 실행하는 구조가 마이크로 큐, 매크로 큐, 콜스택 아키텍팅을 가지고 있는지?",
    answer:
      "<p>이 3단계 아키텍처는 '우선순위가 다른 비동기 작업들을 공정하고 예측 가능하게 처리'하기 위한 설계입니다. 콜 스택은 현재 실행 컨텍스트를 관리하고, 마이크로태스크 큐는 현재 태스크와 강하게 연관된 연속 작업(Promise 체인, MutationObserver)을 렌더링 전에 모두 완료해 일관된 상태를 보장합니다. 매크로태스크 큐는 각 태스크 사이에 렌더링 기회를 제공하여 UI 블로킹 없이 독립된 작업을 처리합니다.</p>" +
      "<br/>" +
      "<p><strong>Q1. 마이크로태스크 큐가 렌더링보다 먼저 실행되는 것이 실무에서 어떤 이점을 가져오나요?</strong></p>" +
      "<p>DOM 변경을 감지하는 <code>MutationObserver</code>가 마이크로태스크로 처리되기 때문에, 여러 DOM 변경이 일어나도 렌더링 전에 모든 변경사항을 일괄 감지하여 처리할 수 있습니다. Promise 체이닝으로 구성된 비동기 플로우도 렌더링 개입 없이 순차 완료되어, 중간 상태가 사용자에게 노출되지 않습니다. React 18의 automatic batching도 이 원리를 활용합니다.</p>" +
      "<br/>" +
      "<p><strong>Q2. 매크로태스크가 하나씩 처리되는 설계가 왜 중요한가요?</strong></p>" +
      "<p>매크로태스크를 하나씩 처리하는 이유는 각 태스크 사이에 '렌더링 체크포인트'를 두기 위함입니다. 만약 모든 매크로태스크를 한 번에 처리한다면, 대량의 타이머 콜백이 쌓인 경우 사용자 입력이 수십 ms 이상 무시될 수 있습니다. 이 설계는 '각 매크로태스크가 16ms 이하여야 60fps를 유지할 수 있다'는 성능 원칙의 근거이기도 합니다.</p>" +
      "<br/>" +
      "<p><strong>Q3. 현대 브라우저에서 이 아키텍처를 보완하는 스케줄링 API에는 무엇이 있나요?</strong></p>" +
      "<p><code>requestAnimationFrame</code>은 렌더링 직전에 실행되는 별도 단계입니다. <code>requestIdleCallback</code>은 프레임에 여유 시간이 있을 때 실행됩니다. 최신 Scheduling API(<code>scheduler.postTask()</code>)는 태스크에 우선순위(user-blocking, user-visible, background)를 부여할 수 있습니다. React 18의 Concurrent 기능도 이 스케줄링 개념을 React 렌더링 내부에 적용한 것입니다.</p>",
  },
  {
    question: "이벤트 버블링은 무엇인가?",
    answer:
      "<p>이벤트 버블링은 특정 DOM 요소에서 이벤트가 발생했을 때, 해당 이벤트가 부모 요소를 거쳐 최상위(window)까지 순차적으로 전파되는 현상입니다. 예를 들어 <code>&lt;button&gt;</code>을 클릭하면 button → div → body → html → document → window 순서로 click 이벤트가 전파됩니다. <code>event.stopPropagation()</code>으로 버블링을 중단할 수 있으며, focus, blur, scroll 같은 일부 이벤트는 버블링되지 않습니다.</p>" +
      "<br/>" +
      "<p><strong>Q1. 이벤트 버블링을 활용한 이벤트 위임(Event Delegation) 패턴을 설명해주세요.</strong></p>" +
      "<p>이벤트 위임은 개별 자식 요소마다 이벤트 리스너를 등록하는 대신, 공통 부모 요소에 하나의 리스너를 등록하여 자식들의 이벤트를 처리하는 패턴입니다. <code>event.target</code>으로 실제 클릭된 요소를 식별합니다. 리스트 아이템이 수천 개라도 ul에만 리스너를 등록하면 되어 메모리 효율이 높고, 동적으로 추가되는 요소에도 자동으로 작동합니다.</p>" +
      "<br/>" +
      "<p><strong>Q2. stopPropagation과 stopImmediatePropagation의 차이는 무엇인가요?</strong></p>" +
      "<p><code>stopPropagation()</code>은 현재 요소의 나머지 핸들러는 모두 실행하되, 부모로의 버블링만 막습니다. <code>stopImmediatePropagation()</code>은 같은 요소에 등록된 나머지 핸들러 실행까지 모두 중단합니다. 같은 버튼에 두 개의 click 리스너(A, B)가 있을 때, A에서 stopPropagation을 호출하면 B는 실행되지만, stopImmediatePropagation을 호출하면 B도 실행되지 않습니다.</p>" +
      "<br/>" +
      "<p><strong>Q3. React에서 네이티브 이벤트의 stopPropagation이 React 합성 이벤트에 영향을 주는 방식은 어떻게 변화했나요?</strong></p>" +
      "<p>React 17 이전에는 모든 이벤트가 document에 위임되었기 때문에, 자식의 네이티브 addEventListener에서 stopPropagation을 호출하면 React 이벤트가 아예 동작하지 않는 문제가 있었습니다. React 17부터는 루트 컨테이너에 이벤트를 위임하여 이 문제를 개선했습니다. 그럼에도 네이티브와 합성 이벤트 시스템이 혼재하면 예상치 못한 동작이 발생할 수 있으므로 경계를 명확히 이해해야 합니다.</p>",
  },
  {
    question: "이벤트 캡쳐링은 무엇인가?",
    answer:
      "<p>이벤트 캡처링은 이벤트가 최상위(window)에서 시작하여 실제 이벤트가 발생한 요소(target)까지 DOM 트리를 따라 내려오는 단계입니다. 기본적으로 이벤트 리스너는 버블링 단계에서 실행되지만, <code>addEventListener</code>의 세 번째 인자를 <code>true</code>로 설정하거나 <code>{ capture: true }</code> 옵션을 주면 캡처링 단계에서 실행됩니다.</p>" +
      "<br/>" +
      "<p><strong>Q1. 이벤트 캡처링이 실무에서 유용하게 쓰이는 상황은 어떤 것들이 있나요?</strong></p>" +
      "<p>캡처링은 이벤트가 target에 도달하기 전에 가로채야 할 때 유용합니다. 모달 외부 클릭 감지를 캡처링으로 구현하면 내부 클릭이 stopPropagation으로 버블링을 막더라도 감지할 수 있습니다. 접근성 키보드 트랩 구현, 드래그 앤 드롭에서 마우스 이동 추적, 폼 제출 전 전역 유효성 검사에도 활용됩니다.</p>" +
      "<br/>" +
      "<p><strong>Q2. 캡처링 단계의 이벤트 리스너를 제거할 때 주의할 점은 무엇인가요?</strong></p>" +
      "<p><code>removeEventListener</code>는 등록 시와 동일한 옵션을 전달해야 합니다. <code>{ capture: true }</code>로 등록한 리스너는 제거할 때도 같은 옵션이 필요합니다. 옵션이 다르면 같은 콜백이라도 제거되지 않습니다. 또한 익명 함수는 참조할 수 없어 제거가 불가능하므로, 반드시 named function을 사용해야 합니다.</p>" +
      "<br/>" +
      "<p><strong>Q3. preventDefault와 stopPropagation의 차이를 설명해주세요.</strong></p>" +
      "<p><code>preventDefault()</code>는 브라우저 기본 동작(링크 이동, 폼 제출)만 막고 전파는 막지 않습니다. <code>stopPropagation()</code>은 이후 전파를 막지만 기본 동작은 막지 않습니다. 두 메서드는 독립적입니다. 전파를 막는 것이 바람직하지 않은 이유는, 전역 이벤트 핸들러(애널리틱스 추적, 접근성 리스너)가 해당 이벤트를 수신하지 못하게 만들기 때문입니다.</p>",
  },
  {
    question:
      "두가지를 모두(버블링/캡쳐링) 가지고 있는 요소에서 이벤트가 발생하면 어느 것이 먼저 실행되는가?",
    answer:
      "<p>이벤트 전파는 캡처링 → 타겟 → 버블링 3단계로 진행됩니다. 따라서 캡처링 단계의 핸들러가 먼저 실행됩니다. 단, 이벤트가 발생한 요소(target) 자체에 캡처링과 버블링 리스너가 모두 등록된 경우, target 단계에서는 캡처링/버블링 구분 없이 <strong>등록 순서</strong>대로 실행됩니다. 부모 요소에서는 명확하게 캡처링 리스너 → 버블링 리스너 순서가 보장됩니다.</p>" +
      "<br/>" +
      "<p><strong>Q1. target 단계에서 등록 순서로 실행된다는 것이 코드에서 어떻게 나타나나요?</strong></p>" +
      "<p><code>button.addEventListener('click', A, true)</code>와 <code>button.addEventListener('click', B, false)</code>를 순서대로 등록하면, button 클릭 시 A가 먼저, B가 나중에 실행됩니다. 캡처링 옵션임에도 target에서는 등록 순서가 우선합니다. 반면 부모 div에 같은 방식으로 등록하면, 캡처링 핸들러가 먼저, 버블링 핸들러가 나중에 실행됩니다.</p>" +
      "<br/>" +
      "<p><strong>Q2. event.eventPhase 속성으로 현재 단계를 어떻게 확인할 수 있나요?</strong></p>" +
      "<p><code>event.eventPhase</code>는 현재 핸들러가 실행되는 단계를 나타냅니다. Event.CAPTURING_PHASE(1): 캡처링, Event.AT_TARGET(2): 타겟, Event.BUBBLING_PHASE(3): 버블링입니다. scroll, focus, blur처럼 버블링이 없는 이벤트는 1, 2단계만 존재합니다.</p>" +
      "<br/>" +
      "<p><strong>Q3. 이벤트 위임 시 캡처링과 버블링 중 어느 것을 사용하는 것이 더 나은가요?</strong></p>" +
      "<p>일반적으로 버블링 단계에서 구현합니다. 버블링이 기본값이어서 코드가 직관적이고, 대부분의 DOM 이벤트가 버블링을 지원합니다. 캡처링 위임은 내부 핸들러의 stopPropagation을 우회해야 할 때나, 버블링되지 않는 focus/blur 이벤트를 위임할 때 사용합니다. 단, 캡처링은 남용하면 하위 컴포넌트의 이벤트 처리를 의도치 않게 방해할 수 있습니다.</p>",
  },
  {
    question: "event.target과 event.currentTarget의 차이점은 무엇인가요?",
    answer:
      "<p><code>event.target</code>은 이벤트가 실제로 발생한 요소(클릭된 요소 자체)를 가리키며, 이벤트 전파 과정에서 변하지 않습니다. <code>event.currentTarget</code>은 현재 이벤트 핸들러가 등록된 요소로, 이벤트가 전파되면서 각 핸들러마다 달라집니다. 예를 들어 ul에 클릭 핸들러를 등록했을 때, li를 클릭하면 <code>event.target</code>은 li이고 <code>event.currentTarget</code>은 ul입니다.</p>" +
      "<br/>" +
      "<p><strong>Q1. 이벤트 위임에서 event.target을 안전하게 사용하기 위한 방법은?</strong></p>" +
      "<p><code>event.target</code>이 항상 원하는 요소가 아닐 수 있습니다. <code>&lt;button&gt;&lt;span&gt;클릭&lt;/span&gt;&lt;/button&gt;</code>에서 텍스트 클릭 시 target이 span이 됩니다. <code>event.target.closest('.button-class')</code>를 사용하면 가장 가까운 대상 요소를 안전하게 찾을 수 있습니다.</p>" +
      "<br/>" +
      "<p><strong>Q2. React 합성 이벤트에서 target/currentTarget의 동작이 네이티브와 다른 점이 있나요?</strong></p>" +
      "<p>React 17 이전에는 이벤트 풀링(Event Pooling) 때문에 핸들러 완료 후 SyntheticEvent가 null로 초기화되어, 비동기 컨텍스트에서 event.target 참조 시 null이 되는 문제가 있었습니다. React 17부터 풀링이 제거되어 해결되었습니다. <code>event.nativeEvent.currentTarget</code>은 React 이벤트 위임 루트를 가리키므로 컴포넌트 내 요소와 다릅니다.</p>" +
      "<br/>" +
      "<p><strong>Q3. 이벤트 핸들러에서 this와 currentTarget의 관계는 어떻게 되나요?</strong></p>" +
      "<p>일반 함수로 핸들러를 작성하면 <code>this</code>는 <code>event.currentTarget</code>과 동일합니다. 그러나 화살표 함수는 렉시컬 스코프의 this를 따르므로 다를 수 있습니다. React 클래스 컴포넌트에서는 메서드를 JSX에 전달하면 this가 undefined가 되므로, 생성자에서 bind하거나 화살표 함수를 사용해야 합니다.</p>",
  },
  {
    question:
      "자바스크립트는 싱글 스레드 언어인데, 어떻게 동시에 여러 작업들을 수행하나요?",
    answer:
      "<p>자바스크립트 엔진 자체는 싱글 스레드이지만, 실제 비동기 작업은 호스팅 환경(브라우저/Node.js)이 별도 스레드나 OS 레벨에서 처리합니다. fetch()는 브라우저 네트워크 레이어가, 파일 I/O는 Node.js libuv의 스레드 풀이 담당합니다. 자바스크립트는 이 작업들을 '위임'하고, 이벤트 루프를 통해 결과를 콜백으로 받아 처리합니다. 즉, '싱글 스레드로 실행되지만 비동기 I/O를 통해 동시성(concurrency)을 달성'합니다.</p>" +
      "<br/>" +
      "<p><strong>Q1. 동시성(Concurrency)과 병렬성(Parallelism)의 차이 관점에서 자바스크립트는 어디에 해당하나요?</strong></p>" +
      "<p>병렬성은 여러 작업이 물리적으로 동시에 실행되는 것(멀티코어)이고, 동시성은 여러 작업이 논리적으로 동시에 진행되는 것(Context switching)입니다. 자바스크립트 메인 스레드는 동시성 모델이지만, Web Worker를 사용하면 별도 스레드에서 코드를 실행하여 병렬성을 달성할 수 있습니다.</p>" +
      "<br/>" +
      "<p><strong>Q2. Promise.all과 Promise.allSettled의 차이를 설명해주세요.</strong></p>" +
      "<p><code>Promise.all</code>은 모든 Promise가 이행되면 결과 배열을 반환하고, 하나라도 거부되면 즉시 거부됩니다. <code>Promise.allSettled</code>는 모든 Promise의 결과(이행/거부)를 기다려 각각의 상태와 값을 반환합니다. 부분 실패가 허용되는 병렬 요청에는 allSettled가 적합합니다.</p>" +
      "<br/>" +
      "<p><strong>Q3. CPU 집약적인 작업을 UI 블로킹 없이 처리하는 방법은 무엇인가요?</strong></p>" +
      "<p>Web Worker를 사용하여 별도 스레드에서 실행하고 결과만 postMessage로 받습니다. 또는 작업을 작은 청크로 분할하여 <code>setTimeout(processChunk, 0)</code>으로 이벤트 루프가 중간에 렌더링할 기회를 줍니다. <code>requestIdleCallback</code>으로 유휴 시간에 분산 처리하는 방법도 있습니다. React 18의 <code>startTransition</code>도 유사한 원리로 렌더링을 분할합니다.</p>",
  },
  {
    question: "Javascript의 Promise에 대해서 아는대로 설명해주세요.",
    answer:
      "<p>Promise는 비동기 작업의 최종 완료 또는 실패를 나타내는 객체입니다. 세 가지 상태(pending → fulfilled/rejected)를 가지며, 한 번 settled되면 변경되지 않습니다. <code>.then()</code>으로 이행/거부 핸들러를 등록하고, <code>.catch()</code>로 에러를, <code>.finally()</code>로 정리 로직을 처리합니다. Promise 체이닝은 각 <code>.then()</code>이 새로운 Promise를 반환하여 콜백 지옥을 해결합니다. <code>Promise.all</code>, <code>Promise.race</code>, <code>Promise.any</code>, <code>Promise.allSettled</code> 등의 정적 메서드로 여러 Promise를 조합합니다.</p>" +
      "<br/>" +
      "<p><strong>Q1. Promise 체이닝에서 에러 전파 방식을 설명해주세요.</strong></p>" +
      "<p>Promise 체인에서 에러가 발생하면 가장 가까운 <code>.catch()</code>까지 전파됩니다. <code>.catch()</code> 이후에도 체인을 이어갈 수 있으며, catch가 에러를 다시 throw하지 않으면 이후 then은 정상 실행됩니다. 잡히지 않은 Promise 거부는 <code>unhandledrejection</code> 이벤트를 발생시킵니다.</p>" +
      "<br/>" +
      "<p><strong>Q2. Promise 생성자의 executor가 동기적으로 실행된다는 것은 어떤 의미인가요?</strong></p>" +
      "<p><code>new Promise((resolve, reject) => { ... })</code>에서 executor는 즉시 동기적으로 실행됩니다. 그러나 <code>.then()</code> 핸들러는 항상 마이크로태스크로 비동기 실행됩니다. 이미 이행된 Promise도 핸들러는 비동기로 실행되어, '때로는 동기, 때로는 비동기'인 Zalgo 문제를 방지합니다.</p>" +
      "<br/>" +
      "<p><strong>Q3. Promise.race와 Promise.any의 차이를 실무 사례와 함께 설명해주세요.</strong></p>" +
      "<p><code>Promise.race()</code>는 가장 먼저 settled(이행 또는 거부)되는 Promise를 따릅니다. 타임아웃 구현에 적합합니다: <code>Promise.race([fetch(url), timeout(5000)])</code>. <code>Promise.any()</code>는 가장 먼저 이행된 Promise만 따르고, 모든 거부 시 AggregateError를 던집니다. 여러 CDN 중 가장 빠른 곳에서 리소스를 가져오는 장애 허용 요청에 적합합니다.</p>",
  },
  // ─────────────────────────────────────────────
  // JavaScript 기초 (계속)
  // ─────────────────────────────────────────────
  {
    question: "프로토타입(Prototype)이란 무엇인가요?",
    answer:
      "<p>프로토타입은 자바스크립트 객체가 다른 객체로부터 메서드와 프로퍼티를 상속받는 메커니즘입니다. 모든 자바스크립트 객체는 <code>[[Prototype]]</code>이라는 내부 슬롯을 가지며, 이를 통해 부모 객체(프로토타입)에 연결됩니다. 프로퍼티를 찾을 때 객체 자신에 없으면 프로토타입 체인을 따라 올라가며 검색합니다. <code>Object.getPrototypeOf()</code>로 접근하거나, 비표준이지만 <code>__proto__</code>로 접근할 수 있습니다.</p>" +
      "<br/>" +
      "<p><strong>Q1. 프로토타입 체인의 끝은 어디이며, 속성 검색 성능에 어떤 영향을 주나요?</strong></p>" +
      "<p>프로토타입 체인의 최상위는 <code>Object.prototype</code>이고 그 위는 <code>null</code>입니다. 속성 검색은 체인을 따라 순차적으로 진행되므로 체인이 길수록 탐색 비용이 증가합니다. 그러나 V8 같은 현대 엔진은 'Hidden Class(Shape)'와 인라인 캐시(Inline Cache)를 사용해 반복적인 속성 접근을 최적화합니다. <code>hasOwnProperty()</code>로 자체 속성만 확인하면 프로토타입 체인 탐색을 건너뛸 수 있습니다.</p>" +
      "<br/>" +
      "<p><strong>Q2. __proto__와 prototype 프로퍼티의 차이를 설명해주세요.</strong></p>" +
      "<p><code>__proto__</code>는 모든 객체가 가지는 접근자로, 해당 객체의 프로토타입(부모)을 가리킵니다. <code>prototype</code>은 함수(생성자)만 가지는 프로퍼티로, <code>new</code>로 생성할 인스턴스의 프로토타입이 될 객체입니다. 즉 <code>function Foo() {}</code>에서 <code>new Foo().__proto__ === Foo.prototype</code>입니다. <code>__proto__</code>는 비표준이므로 <code>Object.getPrototypeOf()</code>를 사용하는 것이 권장됩니다.</p>" +
      "<br/>" +
      "<p><strong>Q3. Object.create(null)로 만든 객체는 일반 객체와 어떻게 다른가요?</strong></p>" +
      "<p><code>Object.create(null)</code>은 프로토타입이 null인 순수 사전(dictionary) 객체를 생성합니다. <code>toString</code>, <code>hasOwnProperty</code> 같은 Object.prototype의 메서드가 없어 프로토타입 오염(prototype pollution) 공격에 안전합니다. Map 등장 전에 순수 해시맵 용도로 사용되었으며, 현재는 <code>Map</code>이나 <code>Object.hasOwn()</code> 사용이 권장됩니다.</p>",
  },
  {
    question: "프로토타입과 클래스의 차이는 무엇인가요?",
    answer:
      "<p>자바스크립트의 <code>class</code>는 프로토타입 기반 상속의 문법적 설탕(syntactic sugar)입니다. 내부적으로 프로토타입 체인을 사용하지만, 클래스 구문으로 더 직관적으로 작성할 수 있습니다. 차이점으로는: ① class는 호이스팅되지 않고 TDZ가 적용됩니다 ② class 내 메서드는 자동으로 non-enumerable입니다 ③ class는 항상 strict mode로 실행됩니다 ④ new 없이 호출하면 TypeError가 발생합니다.</p>" +
      "<br/>" +
      "<p><strong>Q1. 클래스의 static 메서드는 프로토타입 관점에서 어디에 존재하나요?</strong></p>" +
      "<p>static 메서드는 인스턴스의 프로토타입 체인이 아닌 생성자 함수 자체에 직접 할당됩니다. <code>class Foo { static bar() {} }</code>에서 <code>Foo.bar</code>는 접근 가능하지만 <code>new Foo().bar</code>는 undefined입니다. 내부적으로 <code>Foo.bar = function() {}</code>와 동일하며, 서브클래스에서 <code>super</code>를 통해 접근 가능합니다. 이는 팩토리 메서드, 유틸리티 함수에 주로 사용됩니다.</p>" +
      "<br/>" +
      "<p><strong>Q2. extends 키워드의 내부 동작을 프로토타입 체인으로 설명해주세요.</strong></p>" +
      "<p><code>class Child extends Parent</code>는 두 개의 프로토타입 체인을 설정합니다. ① <code>Child.prototype.__proto__ === Parent.prototype</code> (인스턴스 메서드 상속) ② <code>Child.__proto__ === Parent</code> (static 메서드 상속). <code>super()</code>는 부모 생성자를 호출하여 <code>this</code>를 초기화하며, 파생 클래스에서는 super() 호출 전에 this 접근이 불가능합니다.</p>" +
      "<br/>" +
      "<p><strong>Q3. 프로토타입 기반 언어와 클래스 기반 언어(Java, C++)의 근본적인 차이는 무엇인가요?</strong></p>" +
      "<p>클래스 기반 언어에서 클래스는 인스턴스의 '설계도(blueprint)'이며 런타임에 변경할 수 없습니다. 프로토타입 기반 언어에서는 '클래스'도 실제 객체이므로 런타임에 메서드를 추가·삭제·수정할 수 있습니다. 자바스크립트에서 <code>Array.prototype.myMethod = ...</code>으로 모든 배열에 메서드를 추가할 수 있는 것이 이 유연성의 예이며, 동시에 프로토타입 오염 위험의 원인이기도 합니다.</p>",
  },
  {
    question: "프로토타입 상속은 어떻게 동작하나요?",
    answer:
      "<p>프로토타입 상속은 객체가 다른 객체의 프로퍼티와 메서드를 직접 참조하여 사용하는 메커니즘입니다. 객체에서 프로퍼티를 읽을 때 자신에게 없으면 <code>[[Prototype]]</code>을 따라 올라가며 탐색합니다. 쓰기는 항상 자체 프로퍼티에 수행되어 프로토타입을 오염시키지 않습니다. <code>Object.create(proto)</code>로 특정 객체를 프로토타입으로 하는 새 객체를 생성하거나, 생성자 함수의 <code>prototype</code> 프로퍼티를 통해 상속 관계를 설정합니다.</p>" +
      "<br/>" +
      "<p><strong>Q1. 프로토타입 체인에서 프로퍼티 쓰기(shadowing)는 어떻게 동작하나요?</strong></p>" +
      "<p>프로토타입에 같은 이름의 프로퍼티가 있을 때 객체 자체에 프로퍼티를 쓰면 '섀도잉(shadowing)'이 발생합니다. 자체 프로퍼티가 프로토타입 프로퍼티를 가리게 됩니다. 단, 프로토타입의 프로퍼티가 setter이거나 writable: false인 경우 동작이 다릅니다. setter가 있으면 setter가 호출되고, writable: false이면 strict mode에서 TypeError가 발생합니다.</p>" +
      "<br/>" +
      "<p><strong>Q2. 다중 상속이 불가능한 프로토타입 체인에서 믹스인(Mixin) 패턴은 어떻게 구현하나요?</strong></p>" +
      "<p>프로토타입 체인은 단일 상속만 지원하므로, <code>Object.assign(Target.prototype, mixin1, mixin2)</code>으로 여러 객체의 메서드를 복사하여 다중 상속을 흉내냅니다. 함수형 믹스인은 <code>const Serializable = (Base) => class extends Base { serialize() {...} }</code>처럼 고차 함수로 클래스를 래핑하는 패턴입니다. TypeScript에서는 인터페이스로 타입 수준의 다중 상속을 지원합니다.</p>" +
      "<br/>" +
      "<p><strong>Q3. 프로토타입 상속과 컴포지션(Composition)의 장단점을 비교해주세요.</strong></p>" +
      "<p>'상속보다 합성을 선호하라(Favor composition over inheritance)'는 객체지향 설계 원칙입니다. 프로토타입 상속은 is-a 관계에 적합하지만, 깊은 상속 체인은 유지보수가 어렵고 부모 변경이 모든 자식에 영향을 줍니다. 컴포지션은 has-a 관계로 기능을 조립하여 유연성이 높습니다. React도 클래스 상속 대신 컴포지션(props, children, 커스텀 훅)을 권장합니다.</p>",
  },
  {
    question: "함수 선언식과 함수 표현식의 차이는 무엇인가요?",
    answer:
      "<p>함수 선언식(<code>function foo() {}</code>)은 호이스팅되어 선언 전에 호출 가능합니다. 함수 표현식(<code>const foo = function() {}</code>)은 변수 호이스팅 규칙을 따라, var는 undefined로 초기화되고 const/let은 TDZ가 적용됩니다. 화살표 함수(<code>() => {}</code>)는 항상 표현식이며, 자체 this/arguments/super/new.target 바인딩이 없습니다.</p>" +
      "<br/>" +
      "<p><strong>Q1. 화살표 함수와 일반 함수의 this 바인딩 차이가 실무에서 어떤 영향을 미치나요?</strong></p>" +
      "<p>화살표 함수는 렉시컬 this를 따르므로, 콜백에서 별도의 bind 없이 외부 this를 참조할 수 있어 React 이벤트 핸들러에서 주로 사용됩니다. 그러나 객체 메서드로 사용하면 의도와 다른 this가 바인딩됩니다. <code>const obj = { name: 'A', greet: () => this.name }</code>에서 this는 obj가 아닌 상위 스코프입니다. 프로토타입 메서드, 이벤트 핸들러에서 동적 this가 필요하면 일반 함수를 써야 합니다.</p>" +
      "<br/>" +
      "<p><strong>Q2. IIFE(즉시 실행 함수 표현식)가 ES 모듈 이전에 중요했던 이유는 무엇인가요?</strong></p>" +
      "<p>ES 모듈이 없던 시절, var는 함수 스코프만 가지므로 전역 오염을 방지할 방법이 IIFE뿐이었습니다. <code>(function() { var private = 'secret'; })()</code>으로 스코프를 격리하여 모듈 패턴을 구현했습니다. jQuery 플러그인, UMD 번들이 이 패턴을 사용했습니다. 현재는 ESM의 모듈 스코프가 이 역할을 대체하여 IIFE 사용이 크게 줄었습니다.</p>" +
      "<br/>" +
      "<p><strong>Q3. 함수 선언식의 호이스팅이 조건문 안에서 어떻게 동작하는지 아시나요?</strong></p>" +
      "<p>조건문 안의 함수 선언은 브라우저마다 동작이 달랐으며, ES2015 이후 strict mode에서는 블록 스코프로 제한됩니다. <code>if (true) { function foo() { return 1; } }</code>에서 strict mode에서는 foo가 블록 밖에서 접근 불가합니다. 이런 혼란 때문에 조건부 함수 정의에는 함수 표현식을 사용하는 것이 안전하며, 린터도 이를 경고합니다.</p>",
  },
  {
    question:
      "접근제어자(public, private, protected)를 JavaScript에서 어떻게 구현하나요?",
    answer:
      "<p>ES2022부터 클래스에서 <code>#</code> 접두사로 진정한 private 필드/메서드를 선언할 수 있습니다. <code>class Foo { #secret = 42; getSecret() { return this.#secret; } }</code>처럼 사용하며, 외부에서 접근 시 SyntaxError가 발생합니다. public은 기본값이며, protected는 언어 차원에서 지원하지 않아 관례적으로 <code>_</code> 접두사를 사용하거나 TypeScript의 protected 키워드를 활용합니다.</p>" +
      "<br/>" +
      "<p><strong>Q1. # private 필드와 WeakMap을 이용한 private 구현의 차이점은 무엇인가요?</strong></p>" +
      "<p><code>#</code> private 필드는 하드 프라이빗으로, 클래스 외부에서는 어떤 방법으로도 접근 불가합니다. WeakMap 방식은 <code>const _private = new WeakMap()</code>으로 인스턴스를 키로 사용하여 비공개 데이터를 저장합니다. WeakMap은 가비지 컬렉션이 가능하지만 코드가 장황합니다. <code>#</code> 필드는 <code>in</code> 연산자로 브랜드 체킹(brand checking)이 가능한 장점도 있습니다.</p>" +
      "<br/>" +
      "<p><strong>Q2. TypeScript의 private과 JavaScript의 #private의 차이를 설명해주세요.</strong></p>" +
      "<p>TypeScript의 <code>private</code>은 컴파일 타임에만 검사되고, 트랜스파일 후 JavaScript에서는 아무 제약 없이 접근 가능합니다. <code>#</code> private은 런타임에서도 실제로 접근이 차단됩니다. TypeScript 4.3+에서는 <code>#</code> 문법도 지원하므로, 런타임 보장이 필요하면 <code>#</code>을, 개발 편의성만 필요하면 TypeScript <code>private</code>을 선택합니다.</p>" +
      "<br/>" +
      "<p><strong>Q3. 클로저를 활용한 정보 은닉은 어떻게 구현하며, 클래스의 #private과 비교하면 어떤가요?</strong></p>" +
      "<p>클로저 방식은 <code>function createCounter() { let count = 0; return { increment() { count++; }, getCount() { return count; } }; }</code>처럼 외부에서 count에 직접 접근할 수 없게 합니다. 이 방식은 인스턴스마다 메서드 복사본이 생겨 메모리 효율이 낮지만, 프로토타입 체인 없이도 정보 은닉이 가능합니다. 클래스의 <code>#</code>은 프로토타입 메서드에서도 private 필드에 접근 가능하여 메모리 효율과 캡슐화를 모두 만족합니다.</p>",
  },
  {
    question: "실행 컨텍스트(Execution Context)란 무엇인가요?",
    answer:
      "<p>실행 컨텍스트는 자바스크립트 코드가 실행되는 환경을 추상화한 개념입니다. 세 가지 종류가 있습니다: ① 전역 실행 컨텍스트(Global) ② 함수 실행 컨텍스트 ③ eval 실행 컨텍스트. 각 컨텍스트는 변수 환경(Variable Environment), 렉시컬 환경(Lexical Environment), this 바인딩을 포함합니다. 함수가 호출될 때마다 새 실행 컨텍스트가 생성되어 콜 스택에 쌓이고, 실행이 끝나면 제거됩니다.</p>" +
      "<br/>" +
      "<p><strong>Q1. 렉시컬 환경(Lexical Environment)의 구조를 자세히 설명해주세요.</strong></p>" +
      "<p>렉시컬 환경은 두 부분으로 구성됩니다. ① 환경 레코드(Environment Record): 현재 스코프의 식별자(변수, 함수)와 그 값의 매핑을 저장합니다. ② 외부 렉시컬 환경 참조(Outer Lexical Environment Reference): 상위 스코프에 대한 참조로, 스코프 체인을 형성합니다. 변수 탐색은 현재 환경 레코드에서 시작하여 외부 참조를 따라 전역까지 올라갑니다. 이것이 클로저의 동작 원리입니다.</p>" +
      "<br/>" +
      "<p><strong>Q2. 호이스팅(Hoisting)을 실행 컨텍스트 관점에서 설명해주세요.</strong></p>" +
      "<p>호이스팅은 실행 컨텍스트 생성 단계에서 발생합니다. 컨텍스트 생성 시 환경 레코드에 모든 선언을 먼저 등록합니다. var는 undefined로 초기화하지만, let/const는 등록만 하고 초기화하지 않아 TDZ가 발생합니다. 함수 선언문은 전체 함수 객체가 초기화되므로 선언 전 호출이 가능합니다. 이 '생성 → 실행' 2단계 과정이 호이스팅의 실체입니다.</p>" +
      "<br/>" +
      "<p><strong>Q3. 실행 컨텍스트 스택(콜 스택)이 오버플로우되는 상황과 해결 방법은?</strong></p>" +
      "<p>재귀 함수가 종료 조건 없이 반복 호출되면 콜 스택이 가득 차서 'Maximum call stack size exceeded' 에러가 발생합니다. 해결 방법으로는: ① 꼬리 재귀 최적화(TCO, Safari만 지원) ② 트램폴린(trampoline) 패턴으로 재귀를 반복문으로 변환 ③ 반복문(while/for)으로 알고리즘 재작성 ④ <code>setTimeout(fn, 0)</code>으로 콜 스택을 비우고 재개하는 비동기 재귀가 있습니다.</p>",
  },
  {
    question: "클로저(Closure)란 무엇이며, 왜 사용하나요?",
    answer:
      "<p>클로저는 함수가 선언된 렉시컬 스코프 밖에서 실행되더라도, 선언 당시의 렉시컬 환경에 대한 참조를 유지하는 것을 말합니다. 내부 함수가 외부 함수의 변수에 접근할 수 있는 현상입니다. 클로저는 데이터 캡슐화(private 변수), 상태 유지(카운터, 캐시), 콜백/이벤트 핸들러에서 컨텍스트 보존, 함수 팩토리 패턴에 활용됩니다.</p>" +
      "<br/>" +
      "<p><strong>Q1. 클로저로 인한 메모리 누수가 발생하는 구체적인 사례와 해결 방법은?</strong></p>" +
      "<p>대표적으로 DOM 요소를 참조하는 이벤트 핸들러 클로저가 있습니다. 핸들러가 외부 변수로 큰 객체를 참조하면, 핸들러가 제거되지 않는 한 해당 객체가 GC되지 않습니다. 타이머(<code>setInterval</code>) 콜백 내 클로저도 clear하지 않으면 참조가 유지됩니다. 해결 방법은 불필요한 참조를 null로 설정하거나, 이벤트 리스너를 적시에 제거하고, WeakRef를 사용하는 것입니다.</p>" +
      "<br/>" +
      "<p><strong>Q2. React의 useCallback/useMemo가 클로저와 어떤 관계가 있나요?</strong></p>" +
      "<p>React 함수 컴포넌트는 렌더링마다 새로 실행되므로, 핸들러 함수도 매번 새로 생성되어 새로운 클로저를 형성합니다. <code>useCallback</code>은 의존성이 변경되지 않으면 이전 클로저를 재사용하여 자식 컴포넌트의 불필요한 리렌더링을 방지합니다. 주의할 점은 오래된(stale) 클로저 문제입니다. 의존성 배열에 값을 누락하면 이전 렌더의 값을 참조하는 버그가 발생합니다.</p>" +
      "<br/>" +
      "<p><strong>Q3. 클로저의 '오래된 값 참조(Stale Closure)' 문제를 설명하고 해결 방법을 알려주세요.</strong></p>" +
      "<p>Stale closure는 클로저가 업데이트 이전의 값을 계속 참조하는 문제입니다. <code>useEffect(() => { setInterval(() => console.log(count), 1000) }, [])</code>에서 count는 항상 초기값입니다. 해결 방법: ① useEffect 의존성 배열에 count 추가 ② setState의 함수형 업데이트(<code>setCount(prev => prev + 1)</code>) ③ useRef로 최신 값 유지 ④ useEffect 내에서 cleanup으로 이전 타이머 정리가 있습니다.</p>",
  },
  {
    question: "커링(Currying)이란 무엇인가요?",
    answer:
      "<p>커링은 여러 인자를 받는 함수를 하나의 인자만 받는 함수들의 체인으로 변환하는 기법입니다. <code>f(a, b, c)</code>를 <code>f(a)(b)(c)</code>로 변환합니다. 부분 적용(Partial Application)과 유사하지만, 커링은 항상 단항 함수로 변환하는 반면 부분 적용은 일부 인자만 고정합니다. 이벤트 핸들러 팩토리, 설정 함수, 로깅 미들웨어 등에서 유용합니다.</p>" +
      "<br/>" +
      "<p><strong>Q1. 커링과 부분 적용(Partial Application)의 정확한 차이점은 무엇인가요?</strong></p>" +
      "<p>커링은 <code>f(a, b, c)</code>를 반드시 <code>f(a)(b)(c)</code>로 변환하여 각 호출이 정확히 하나의 인자를 받습니다. 부분 적용은 <code>f(a, b, c)</code>에서 일부 인자를 미리 고정한 새 함수를 반환합니다: <code>partial(f, a)(b, c)</code>. JavaScript의 <code>Function.prototype.bind</code>가 부분 적용의 대표적 구현입니다. 실무에서는 두 개념이 혼용되는 경우가 많습니다.</p>" +
      "<br/>" +
      "<p><strong>Q2. 함수형 프로그래밍에서 커링이 중요한 이유는 무엇인가요?</strong></p>" +
      "<p>커링은 함수 합성(composition)을 용이하게 합니다. <code>pipe(filter(isActive), map(getName), sort(byDate))</code>처럼 단항 함수 체인을 구성할 수 있습니다. 또한 포인트프리(point-free) 스타일을 가능하게 하여 코드의 선언적 표현을 돕습니다. Ramda, lodash/fp 같은 함수형 라이브러리는 모든 함수가 자동 커링(auto-curried)되어 있습니다.</p>" +
      "<br/>" +
      "<p><strong>Q3. 실무에서 커링 패턴이 활용되는 구체적인 사례를 들어주세요.</strong></p>" +
      "<p>① 이벤트 핸들러 팩토리: <code>const handleChange = (field) => (e) => setState({[field]: e.target.value})</code> ② 미들웨어 패턴: Redux의 <code>store => next => action</code> ③ 로깅: <code>const log = (level) => (module) => (msg) => console.log(level, module, msg)</code> ④ API 클라이언트: <code>const api = (baseUrl) => (endpoint) => (params) => fetch(baseUrl + endpoint, params)</code>. React에서 HOC 패턴도 커링의 응용입니다.</p>",
  },
  {
    question: "this 키워드는 어떻게 동작하나요?",
    answer:
      "<p><code>this</code>는 함수가 호출되는 방식에 따라 동적으로 결정됩니다. ① 전역 컨텍스트: window(브라우저) 또는 global(Node.js) ② 메서드 호출: 해당 객체 ③ 일반 함수 호출: window(non-strict) 또는 undefined(strict) ④ 생성자(new): 새로 생성된 인스턴스 ⑤ call/apply/bind: 명시적으로 지정된 객체 ⑥ 화살표 함수: 렉시컬 스코프의 this. 우선순위는 new > call/apply/bind > 메서드 > 일반 함수 순입니다.</p>" +
      "<br/>" +
      "<p><strong>Q1. call, apply, bind의 차이와 각각의 활용 사례를 설명해주세요.</strong></p>" +
      "<p><code>call</code>은 함수를 즉시 실행하며 인자를 쉼표로 전달합니다. <code>apply</code>도 즉시 실행하지만 인자를 배열로 전달합니다. <code>bind</code>는 this가 바인딩된 새 함수를 반환합니다. <code>Math.max.apply(null, [1,2,3])</code>은 배열을 인자로 풀어서 전달하는 고전적 패턴이며(현재는 스프레드 연산자 사용), <code>bind</code>는 이벤트 핸들러에서 this를 고정할 때 사용합니다.</p>" +
      "<br/>" +
      "<p><strong>Q2. 화살표 함수의 렉시컬 this가 문제가 되는 상황은 어떤 것들이 있나요?</strong></p>" +
      "<p>화살표 함수는 자체 this가 없어 다음 상황에서 문제가 됩니다: ① 객체 메서드: <code>{ name: 'A', greet: () => this.name }</code>에서 this가 객체가 아님 ② DOM 이벤트 핸들러: <code>addEventListener</code>에서 this가 이벤트 대상이 아님 ③ 프로토타입 메서드: 동적 this 바인딩이 필요한 상속 구조 ④ 생성자: 화살표 함수는 <code>new</code>와 함께 사용 불가(TypeError)</p>" +
      "<br/>" +
      "<p><strong>Q3. 클래스 필드에서 화살표 함수 메서드 vs bind 패턴의 차이는 무엇인가요?</strong></p>" +
      "<p>클래스 필드 화살표 함수(<code>handleClick = () => {}</code>)는 인스턴스마다 새 함수가 생성되어 메모리를 더 사용하지만, this가 항상 인스턴스에 바인딩됩니다. 생성자에서 bind(<code>this.handleClick = this.handleClick.bind(this)</code>)도 인스턴스당 함수를 생성하지만 프로토타입 메서드를 바인딩하는 것입니다. React에서는 함수 컴포넌트와 훅의 도입으로 두 패턴 모두 사용 빈도가 크게 줄었습니다.</p>",
  },
  {
    question: "불변성(Immutability)이란 무엇이며, 왜 중요한가요?",
    answer:
      "<p>불변성은 데이터가 생성된 후 변경되지 않는 성질입니다. 자바스크립트에서 원시값(string, number 등)은 불변이지만, 객체와 배열은 기본적으로 가변(mutable)입니다. 불변성이 중요한 이유는: ① 예측 가능한 상태 변화 ② 변경 감지의 효율성(참조 비교만으로 충분) ③ 동시성 문제 방지 ④ 디버깅 용이(상태 히스토리 추적). React에서 상태 불변성은 리렌더링 최적화의 핵심입니다.</p>" +
      "<br/>" +
      "<p><strong>Q1. React에서 상태를 직접 변경(mutation)하면 어떤 문제가 발생하나요?</strong></p>" +
      "<p>React는 상태 변경을 <code>Object.is()</code>로 감지합니다. 객체를 직접 수정(예: <code>state.items.push(newItem)</code>)하면 참조가 동일하므로 React가 변경을 감지하지 못해 리렌더링이 발생하지 않습니다. 반드시 새 객체/배열을 생성해야 합니다: <code>setItems([...items, newItem])</code>. 또한 mutation은 React DevTools의 시간여행 디버깅, 이전 상태와 현재 상태 비교를 불가능하게 만듭니다.</p>" +
      "<br/>" +
      "<p><strong>Q2. 깊은 중첩 객체의 불변 업데이트를 효율적으로 하는 방법은?</strong></p>" +
      "<p>스프레드 연산자의 수동 중첩은 <code>{...state, nested: {...state.nested, deep: newValue}}</code>처럼 장황해집니다. Immer 라이브러리는 Proxy를 사용해 <code>produce(state, draft => { draft.nested.deep = newValue })</code>처럼 mutation 문법으로 불변 업데이트를 수행합니다. Zustand에서도 Immer 미들웨어를 통합하여 사용할 수 있습니다.</p>" +
      "<br/>" +
      "<p><strong>Q3. 구조적 공유(Structural Sharing)란 무엇이며, 불변 데이터의 성능 문제를 어떻게 해결하나요?</strong></p>" +
      "<p>구조적 공유는 변경되지 않은 부분의 참조를 재사용하는 기법입니다. 깊은 객체에서 하나의 값만 변경할 때, 변경된 경로의 노드만 새로 생성하고 나머지는 기존 객체를 그대로 참조합니다. Immer가 이 전략을 사용하며, Immutable.js는 HAMT(Hash Array Mapped Trie) 자료구조로 이를 구현합니다. TanStack Query도 서버 응답의 구조적 공유로 불필요한 리렌더링을 최소화합니다.</p>",
  },
  {
    question:
      "제너레이터(Generator)와 이터레이터(Iterator)에 대해 설명해주세요.",
    answer:
      "<p>이터레이터는 <code>{ value, done }</code>을 반환하는 <code>next()</code> 메서드를 가진 객체로, 순차적 데이터 접근 프로토콜입니다. 이터러블은 <code>[Symbol.iterator]()</code> 메서드로 이터레이터를 반환하는 객체(Array, Map, Set, String 등)입니다. 제너레이터는 <code>function*</code>으로 선언하며, <code>yield</code>로 실행을 일시 중단하고 값을 반환할 수 있는 특수한 이터레이터를 생성합니다.</p>" +
      "<br/>" +
      "<p><strong>Q1. 제너레이터의 양방향 통신(next에 값 전달)은 어떻게 동작하나요?</strong></p>" +
      "<p><code>gen.next(value)</code>에서 전달한 value는 이전에 중단된 <code>yield</code> 표현식의 결과값이 됩니다. <code>const x = yield 'hello'</code>에서 첫 next() 호출 시 'hello'가 반환되고, 두 번째 <code>next(42)</code> 호출 시 x에 42가 할당됩니다. 이 양방향 통신이 co 라이브러리와 같은 비동기 제어 흐름의 기반이었으며, async/await의 전신이기도 합니다.</p>" +
      "<br/>" +
      "<p><strong>Q2. 무한 시퀀스(Infinite Sequence)를 제너레이터로 구현하면 어떤 이점이 있나요?</strong></p>" +
      "<p>제너레이터는 지연 평가(lazy evaluation)를 통해 필요한 값만 생성합니다. <code>function* fibonacci() { let [a, b] = [0, 1]; while (true) { yield a; [a, b] = [b, a + b]; } }</code>는 무한 피보나치 수열이지만 메모리를 거의 사용하지 않습니다. 이를 <code>take(5, fibonacci())</code>처럼 조합하면 함수형 프로그래밍의 무한 스트림을 표현할 수 있습니다.</p>" +
      "<br/>" +
      "<p><strong>Q3. async 이터레이터/제너레이터(<code>for await...of</code>)는 어떤 상황에서 사용하나요?</strong></p>" +
      "<p>비동기 이터레이터(<code>Symbol.asyncIterator</code>)는 각 <code>next()</code>가 Promise를 반환합니다. <code>for await (const chunk of readableStream)</code>처럼 스트림 데이터를 순차 처리할 때 유용합니다. SSE(Server-Sent Events) 처리, 대용량 파일의 청크 읽기, 페이지네이션된 API 응답 순회에 활용됩니다. Node.js의 Readable 스트림은 async 이터러블을 기본 지원합니다.</p>",
  },
  // ─────────────────────────────────────────────
  // React 핵심
  // ─────────────────────────────────────────────
  {
    question:
      "지도(Map) 렌더링에서 requestAnimationFrame을 사용하는 이유는 무엇인가요?",
    answer:
      "<p>지도 라이브러리(Google Maps, Mapbox 등)에서 대량의 마커나 오버레이를 렌더링할 때 <code>requestAnimationFrame(rAF)</code>을 사용하면 브라우저의 화면 갱신 주기(보통 60fps, ~16.6ms)에 맞춰 렌더링을 동기화할 수 있습니다. 한 프레임에 모든 마커를 그리면 UI가 멈추지만, rAF를 통해 프레임 단위로 분할 렌더링하면 지도 인터랙션(드래그, 줌)이 부드럽게 유지됩니다.</p>" +
      "<br/>" +
      "<p><strong>Q1. requestAnimationFrame 대신 setTimeout(fn, 16)을 쓰면 안 되나요?</strong></p>" +
      "<p><code>setTimeout(fn, 16)</code>은 16ms 후 매크로태스크 큐에 넣는 것이므로, 실제 실행 시점은 보장되지 않습니다. 다른 태스크가 밀려있으면 지연됩니다. 또한 디스플레이의 실제 갱신 주기(VSYNC)와 동기화되지 않아 프레임 건너뛰기(jank)가 발생할 수 있습니다. rAF는 브라우저가 다음 페인트 직전에 콜백을 호출하므로 화면 갱신과 정확히 동기화됩니다.</p>" +
      "<br/>" +
      "<p><strong>Q2. 대량 마커(수천 개)를 효율적으로 렌더링하는 전략은?</strong></p>" +
      "<p>① 클러스터링(Clustering): 근접 마커를 그룹화하여 줌 레벨에 따라 대표 마커만 표시 ② Canvas/WebGL 렌더링: DOM 노드 대신 canvas에 직접 그려 렌더링 비용 절감 ③ 가상화: 뷰포트 내 마커만 렌더링하고 나머지는 지연 로딩 ④ Web Worker로 좌표 계산을 오프로드. Mapbox GL JS는 WebGL을 기본 사용하여 수만 개의 마커도 부드럽게 처리합니다.</p>" +
      "<br/>" +
      "<p><strong>Q3. React와 지도 라이브러리를 함께 사용할 때 주의할 점은?</strong></p>" +
      "<p>지도 라이브러리는 자체적으로 DOM을 직접 조작하므로 React의 가상 DOM과 충돌할 수 있습니다. 지도 컨테이너를 <code>useRef</code>로 관리하고, 지도 인스턴스 생성/소멸을 <code>useEffect</code>에서 처리해야 합니다. 마커 업데이트 시 React 상태와 지도 상태를 동기화하는 것이 핵심이며, <code>react-map-gl</code> 같은 래퍼 라이브러리가 이를 선언적으로 처리합니다.</p>",
  },
  {
    question: "setTimeout과 requestAnimationFrame의 차이점은 무엇인가요?",
    answer:
      "<p><code>setTimeout</code>은 지정한 시간 후 콜백을 매크로태스크 큐에 넣어 실행하며, 정확한 시간 보장이 없습니다. <code>requestAnimationFrame</code>은 브라우저의 다음 화면 갱신(repaint) 직전에 콜백을 실행하여 디스플레이 주사율과 동기화됩니다. setTimeout은 범용 지연 실행에, rAF는 시각적 애니메이션과 DOM 업데이트에 최적화되어 있습니다. 비활성 탭에서 rAF는 일시 중지되어 리소스를 절약합니다.</p>" +
      "<br/>" +
      "<p><strong>Q1. rAF 기반 애니메이션에서 시간 보정(delta time)은 왜 필요한가요?</strong></p>" +
      "<p>rAF 콜백은 보통 16.6ms 간격이지만, 다른 작업으로 프레임이 지연되면 간격이 불규칙해집니다. 고정 값(<code>x += 5px</code>)으로 애니메이션하면 프레임이 떨어질 때 느려지고, 고주사율 모니터(144Hz)에서는 빨라집니다. <code>rAF(timestamp)</code>의 타임스탬프로 delta time을 계산하여 <code>x += speed * deltaTime</code>으로 프레임률과 무관하게 일정한 속도를 유지해야 합니다.</p>" +
      "<br/>" +
      "<p><strong>Q2. CSS 애니메이션/트랜지션 vs rAF JavaScript 애니메이션의 장단점은?</strong></p>" +
      "<p>CSS 애니메이션은 브라우저가 합성 레이어에서 GPU로 처리하여 메인 스레드를 차단하지 않아 성능이 우수합니다. transform, opacity 속성은 특히 최적화됩니다. rAF JavaScript 애니메이션은 복잡한 물리 시뮬레이션, 조건부 애니메이션, 스크롤 연동 등 동적 제어가 필요할 때 적합합니다. Web Animations API(WAAPI)는 양쪽의 장점을 결합합니다.</p>" +
      "<br/>" +
      "<p><strong>Q3. requestIdleCallback은 rAF과 어떻게 다르며, 각각 언제 사용하나요?</strong></p>" +
      "<p><code>rAF</code>는 매 프레임 렌더링 전에 호출되어 시각적 업데이트에 적합합니다. <code>requestIdleCallback</code>은 브라우저가 유휴(idle) 상태일 때 호출되어 우선순위 낮은 작업(분석 데이터 전송, 프리페칭, lazy 초기화)에 적합합니다. deadline 파라미터로 남은 유휴 시간을 확인할 수 있습니다. React의 Concurrent Mode도 유사한 우선순위 스케줄링 개념을 내부적으로 구현합니다.</p>",
  },
  {
    question: "setState 이후 리렌더링 과정을 설명해주세요.",
    answer:
      "<p>setState가 호출되면: ① React는 업데이트를 스케줄링합니다 ② 같은 이벤트 핸들러 내 여러 setState는 자동으로 배치(batch)됩니다 ③ React가 컴포넌트 함수를 다시 호출하여 새로운 React Element 트리(가상 DOM)를 생성합니다 ④ 이전 트리와 비교(Reconciliation/Diffing)하여 변경 사항을 계산합니다 ⑤ 계산된 변경 사항만 실제 DOM에 커밋(Commit Phase)합니다. 이 과정은 Render Phase(순수, 중단 가능)와 Commit Phase(DOM 변경, 동기적)로 나뉩니다.</p>" +
      "<br/>" +
      "<p><strong>Q1. Render Phase와 Commit Phase의 차이를 자세히 설명해주세요.</strong></p>" +
      "<p>Render Phase는 컴포넌트를 호출하여 React Element를 생성하고 Diffing하는 단계입니다. 이 단계는 '순수'해야 하며 사이드이펙트가 없어야 합니다. Concurrent Mode에서는 중단·재개·폐기가 가능합니다. Commit Phase는 계산된 변경사항을 실제 DOM에 적용하고, useLayoutEffect → DOM 업데이트 → useEffect 순으로 이펙트를 실행합니다. Commit Phase는 항상 동기적으로 실행됩니다.</p>" +
      "<br/>" +
      "<p><strong>Q2. 함수형 업데이트(setState(prev => ...))는 언제 사용해야 하나요?</strong></p>" +
      "<p>이전 상태에 기반한 업데이트에서 사용합니다. <code>setCount(count + 1)</code>을 여러 번 호출하면 배치 처리로 인해 같은 count 값을 기반으로 계산하여 한 번만 증가합니다. <code>setCount(prev => prev + 1)</code>은 큐에 업데이터 함수를 넣어 순차적으로 적용하므로, 여러 번 호출해도 정확히 그만큼 증가합니다. 비동기 콜백, 타이머에서도 항상 최신 상태를 보장합니다.</p>" +
      "<br/>" +
      "<p><strong>Q3. React 18에서 자동 배치(Automatic Batching)의 범위가 어떻게 확장되었나요?</strong></p>" +
      "<p>React 17까지는 React 이벤트 핸들러 내에서만 배치가 적용되었고, setTimeout, fetch.then, 네이티브 이벤트 핸들러에서는 setState마다 리렌더링이 발생했습니다. React 18의 <code>createRoot</code>부터는 모든 컨텍스트에서 자동으로 배치됩니다. 배치를 강제로 해제하려면 <code>flushSync()</code>를 사용합니다. 이로 인해 불필요한 리렌더링이 크게 감소합니다.</p>",
  },
  {
    question: "React Fiber 아키텍처란 무엇인가요?",
    answer:
      "<p>Fiber는 React 16에서 도입된 새로운 재조정(Reconciliation) 엔진입니다. 각 컴포넌트를 'fiber' 노드라는 작업 단위로 표현하여, 렌더링 작업을 작은 조각으로 분할하고 우선순위에 따라 스케줄링할 수 있게 합니다. 기존 Stack Reconciler의 동기적, 재귀적 렌더링을 대체하여 중단·재개·폐기가 가능한 증분(incremental) 렌더링을 구현합니다. React 18의 Concurrent Features는 이 Fiber 위에 구축되었습니다.</p>" +
      "<br/>" +
      "<p><strong>Q1. Fiber 노드는 어떤 정보를 담고 있나요?</strong></p>" +
      "<p>각 fiber 노드는 다음 정보를 포함합니다: ① type(컴포넌트 타입) ② key ③ stateNode(DOM 노드 또는 클래스 인스턴스) ④ child, sibling, return(트리 구조 참조) ⑤ pendingProps, memoizedProps ⑥ memoizedState(훅 연결 리스트) ⑦ updateQueue(상태 업데이트 큐) ⑧ effectTag(수행할 DOM 변경 유형). 이 링크드 리스트 구조 덕분에 재귀 없이 트리를 순회할 수 있습니다.</p>" +
      "<br/>" +
      "<p><strong>Q2. Fiber의 더블 버퍼링(Double Buffering) 기법을 설명해주세요.</strong></p>" +
      "<p>React는 current 트리와 workInProgress 트리 두 개를 유지합니다. current는 현재 화면에 렌더링된 상태이고, workInProgress는 다음 렌더링을 준비합니다. 렌더링이 완료되면 workInProgress가 새로운 current가 됩니다(포인터 교환). 이 기법은 불완전한 렌더링이 화면에 노출되는 것을 방지하고, 렌더링 도중 작업을 폐기해도 이전 화면이 유지되게 합니다.</p>" +
      "<br/>" +
      "<p><strong>Q3. Fiber의 우선순위 스케줄링은 구체적으로 어떻게 동작하나요?</strong></p>" +
      "<p>React는 업데이트에 'Lane'이라는 우선순위 비트마스크를 부여합니다. 사용자 입력(SyncLane)은 가장 높은 우선순위, <code>startTransition</code> 내 업데이트(TransitionLane)는 낮은 우선순위를 가집니다. 높은 우선순위 업데이트가 들어오면 낮은 우선순위 렌더링을 중단하고 긴급한 업데이트를 먼저 처리합니다. 이것이 타이핑 시 입력이 즉시 반응하면서 검색 결과 목록은 나중에 갱신되는 패턴의 원리입니다.</p>",
  },
  {
    question: "Fiber가 해결한 기존 문제는 무엇인가요?",
    answer:
      "<p>기존 Stack Reconciler는 트리를 재귀적으로 동기 탐색했기 때문에, 대규모 컴포넌트 트리의 업데이트가 시작되면 완료될 때까지 메인 스레드를 블로킹했습니다. 이로 인해 사용자 입력 지연, 애니메이션 끊김, 높은 TTI(Time to Interactive)가 발생했습니다. Fiber는 렌더링을 작은 단위로 분할하여 각 프레임 사이에 브라우저가 사용자 입력과 페인팅을 처리할 수 있게 하여 이 문제를 해결했습니다.</p>" +
      "<br/>" +
      "<p><strong>Q1. 구체적으로 사용자가 체감하는 개선점은 무엇이었나요?</strong></p>" +
      "<p>① 대규모 리스트 렌더링 중에도 타이핑, 스크롤이 즉시 반응 ② 복잡한 폼 업데이트에서 입력 필드의 반응성 유지 ③ 애니메이션과 데이터 업데이트가 동시에 발생할 때 애니메이션 우선 처리 ④ Suspense와 결합하여 로딩 상태의 부드러운 전환. React 18의 startTransition으로 '긴급한 업데이트'와 '전환 업데이트'를 명시적으로 분리할 수 있게 되었습니다.</p>" +
      "<br/>" +
      "<p><strong>Q2. Fiber 이전에는 이 문제를 어떻게 우회했었나요?</strong></p>" +
      "<p>① shouldComponentUpdate나 PureComponent로 불필요한 렌더링을 줄이기 ② 가상화(react-virtualized)로 렌더링 노드 수 제한 ③ 디바운스/스로틀로 업데이트 빈도 조절 ④ Web Worker로 연산 오프로드. 이 방법들은 여전히 유효하지만, Fiber 이전에는 '렌더링 자체의 분할'이 불가능했으므로 렌더링이 시작되면 완료될 때까지 기다려야 했습니다.</p>" +
      "<br/>" +
      "<p><strong>Q3. Concurrent Mode가 아닌 동기 모드(Legacy Mode)에서도 Fiber의 이점이 있나요?</strong></p>" +
      "<p>네. Fiber 아키텍처 자체는 React 16부터 적용되어, Concurrent Mode 없이도 ① Effect 리스트를 통한 효율적인 커밋 단계 ② Error Boundary의 안정적 구현 ③ Suspense의 기본 동작 ④ 개선된 메모리 관리(더블 버퍼링)를 제공합니다. Concurrent 기능은 Fiber의 '중단 가능한 렌더링' 특성을 활성화한 것이며, Legacy Mode에서는 여전히 동기적으로 완료합니다.</p>",
  },
  {
    question: "Fiber의 작업 단위(Unit of Work)란 무엇인가요?",
    answer:
      "<p>Fiber에서 각 컴포넌트는 하나의 'fiber 노드'로 표현되며, 이것이 곧 작업 단위입니다. React는 이 단위를 하나씩 처리하면서 자식→형제→부모 순서로 트리를 순회합니다. 각 작업 단위를 처리한 후 '다음 작업이 있는지, 시간이 남았는지'를 확인하여, 브라우저에게 제어권을 양보할 수 있습니다. 이것이 Fiber가 렌더링을 '중단 가능'하게 만드는 핵심 메커니즘입니다.</p>" +
      "<br/>" +
      "<p><strong>Q1. 작업 단위 순회 순서(child → sibling → return)를 설명해주세요.</strong></p>" +
      "<p>Fiber는 재귀 대신 while 루프로 트리를 순회합니다. 현재 fiber의 ① child가 있으면 child로 이동(beginWork) ② child가 없으면 자신의 작업 완료(completeWork) ③ sibling이 있으면 sibling으로 이동 ④ sibling도 없으면 return(부모)으로 올라가 completeWork. 이 DFS 순서를 링크드 리스트(child, sibling, return 포인터)로 구현하여 콜 스택 없이 순회합니다.</p>" +
      "<br/>" +
      "<p><strong>Q2. shouldYield()가 판단하는 기준은 무엇인가요?</strong></p>" +
      "<p>React Scheduler는 각 작업 단위 완료 후 <code>shouldYield()</code>를 호출하여 5ms 타임 슬라이스가 초과되었는지 확인합니다. 초과했으면 브라우저에게 제어를 양보하고, 남은 작업은 <code>MessageChannel</code>의 <code>postMessage</code>를 통해 다음 매크로태스크로 스케줄링합니다. 이 5ms는 사용자가 지연을 체감하지 못하는 임계값이며, 60fps(~16.6ms) 프레임 예산 내에서 여러 작업 단위를 처리할 수 있습니다.</p>" +
      "<br/>" +
      "<p><strong>Q3. 이 작업 분할 모델이 Suspense와 어떻게 결합되나요?</strong></p>" +
      "<p>Suspense 컴포넌트가 데이터를 기다리며 Promise를 throw하면, React는 해당 fiber 서브트리의 렌더링을 '일시 중단'하고 fallback UI를 보여줍니다. 데이터가 도착하면 중단된 지점부터 렌더링을 '재개'합니다. 이 중단/재개가 가능한 이유가 바로 fiber의 작업 단위 모델입니다. Stack Reconciler에서는 콜 스택을 중간에 멈출 수 없었으므로 이 패턴이 불가능했습니다.</p>",
  },
  {
    question: "Fiber와 Concurrent Mode의 관계는 무엇인가요?",
    answer:
      "<p>Fiber는 React의 내부 재조정 엔진(아키텍처)이고, Concurrent Mode(현재는 Concurrent Features)는 이 Fiber 위에 구축된 기능 집합입니다. Fiber가 렌더링을 '분할 가능'하게 만들었고, Concurrent Features가 이를 활성화하여 우선순위 기반 렌더링, 중단 가능한 렌더링을 실제로 사용할 수 있게 합니다. <code>createRoot</code>를 사용하면 Concurrent Features가 활성화됩니다.</p>" +
      "<br/>" +
      "<p><strong>Q1. startTransition과 useDeferredValue의 차이와 사용 시기를 설명해주세요.</strong></p>" +
      "<p><code>startTransition</code>은 상태 업데이트를 '전환(transition)'으로 표시하여 낮은 우선순위로 처리합니다. 검색 입력 → 필터링 결과 갱신 시 입력은 즉시, 필터링은 전환으로 처리합니다. <code>useDeferredValue</code>는 값 자체를 지연시킵니다. 외부에서 받는 props를 직접 제어할 수 없을 때 유용합니다. startTransition은 '업데이트를 지연', useDeferredValue는 '값을 지연'합니다.</p>" +
      "<br/>" +
      "<p><strong>Q2. Concurrent Features가 기존 코드에 호환성 문제를 일으킬 수 있나요?</strong></p>" +
      "<p>Concurrent Rendering에서 Render Phase가 여러 번 실행될 수 있으므로, render 중 사이드이펙트를 수행하면 문제가 됩니다. <code>useRef</code>에 render 중 값을 쓰거나, 전역 변수를 수정하거나, 외부 스토어를 직접 읽으면 tearing이 발생할 수 있습니다. React.StrictMode의 이중 렌더링은 이런 문제를 사전에 감지하기 위한 장치입니다.</p>" +
      "<br/>" +
      "<p><strong>Q3. use() 훅과 Suspense의 관계를 설명해주세요.</strong></p>" +
      "<p>React 19의 <code>use()</code>는 Promise나 Context를 읽을 수 있는 새로운 훅입니다. <code>use(fetchData())</code>는 Promise가 미결이면 가장 가까운 Suspense boundary에 fallback을 표시하고, 이행되면 값을 반환합니다. 기존 useEffect + useState 패턴을 대체하여 데이터 페칭을 더 선언적으로 만듭니다. 조건문/반복문 안에서도 호출 가능한 유일한 훅입니다.</p>",
  },
  {
    question: "useEffect의 이름은 왜 useEffect인가요?",
    answer:
      "<p>'Effect'는 함수형 프로그래밍에서 '사이드이펙트(Side Effect)'를 의미합니다. 순수 함수의 관점에서 React 컴포넌트의 렌더링(JSX 반환)은 순수해야 하며, DOM 조작, 데이터 페칭, 구독 설정, 타이머 등 '외부 세계와의 상호작용'은 사이드이펙트입니다. <code>useEffect</code>는 이러한 사이드이펙트를 렌더링과 분리하여 관리하는 훅이라는 의미에서 'Effect'라는 이름이 붙었습니다.</p>" +
      "<br/>" +
      "<p><strong>Q1. useEffect와 useLayoutEffect의 실행 시점 차이는 무엇인가요?</strong></p>" +
      "<p><code>useEffect</code>는 브라우저가 화면을 그린(paint) 후 비동기적으로 실행됩니다. <code>useLayoutEffect</code>는 DOM 변경 후, 브라우저가 화면을 그리기 전에 동기적으로 실행됩니다. DOM 측정(요소 크기, 위치)이나 즉시 반영해야 하는 DOM 조작(깜빡임 방지)에는 useLayoutEffect를 사용합니다. useLayoutEffect가 오래 걸리면 화면 그리기 자체가 지연되므로 최소한으로 사용해야 합니다.</p>" +
      "<br/>" +
      "<p><strong>Q2. useEffect의 클린업(cleanup) 함수는 정확히 언제, 왜 실행되나요?</strong></p>" +
      "<p>클린업은 ① 컴포넌트 언마운트 시 ② 의존성이 변경되어 이펙트가 재실행되기 직전에 실행됩니다. 이전 이펙트의 '정리'를 담당합니다. 이벤트 리스너 해제, 타이머 취소, 구독 해제 등 리소스 해제가 목적입니다. 클린업은 이전 렌더의 값(클로저)으로 실행되므로, 이전 상태의 구독을 정확히 해제할 수 있습니다.</p>" +
      "<br/>" +
      "<p><strong>Q3. React 문서에서 '이펙트가 필요하지 않을 수도 있다(You Might Not Need an Effect)'라고 말하는 이유는?</strong></p>" +
      "<p>많은 경우 useEffect가 과용됩니다. ① props/state에서 파생 가능한 값은 렌더링 중 계산(또는 useMemo) ② 이벤트에 의한 작업은 이벤트 핸들러에서 처리 ③ 외부 스토어 동기화는 useSyncExternalStore ④ 데이터 페칭은 프레임워크의 데이터 로딩 메커니즘 사용. useEffect는 '외부 시스템과의 동기화'가 진정으로 필요한 경우에만 사용해야 합니다.</p>",
  },
  {
    question: "React Hooks에 use 접두사를 쓰는 이유는 무엇인가요?",
    answer:
      "<p><code>use</code> 접두사는 두 가지 목적을 가집니다. ① 린터/정적 분석이 훅의 규칙(Rules of Hooks) 위반을 자동 감지할 수 있게 합니다(조건문/반복문 내 호출 금지, 최상위에서만 호출). ② 개발자에게 '이 함수는 훅이며, 훅의 규칙을 따라야 한다'는 시각적 신호를 줍니다. 커스텀 훅도 use 접두사를 붙여야 React가 내부 훅 호출을 추적할 수 있습니다.</p>" +
      "<br/>" +
      "<p><strong>Q1. 훅의 규칙(Rules of Hooks)이 존재하는 이유를 내부 구현 관점에서 설명해주세요.</strong></p>" +
      "<p>React는 훅 상태를 배열(링크드 리스트)로 관리하며, 호출 순서로 각 훅을 식별합니다. 조건문 안에서 훅을 호출하면 렌더링마다 호출 순서가 달라져 훅 상태가 뒤섞입니다. 예: 첫 렌더에서 useState A → useEffect B 순서였는데, 조건에 의해 두 번째 렌더에서 useEffect B가 건너뛰면 세 번째 훅이 B의 상태를 읽게 됩니다. 이 순서 의존성이 규칙의 근거입니다.</p>" +
      "<br/>" +
      "<p><strong>Q2. 커스텀 훅을 만들 때의 설계 원칙은 무엇인가요?</strong></p>" +
      "<p>① 단일 책임: 하나의 관심사만 캡슐화(예: useAuth, useLocalStorage) ② 반환값은 배열(useState 패턴) 또는 객체(여러 값)로 일관성 유지 ③ 내부에서 다른 훅을 자유롭게 사용하되, 불필요한 리렌더링을 최소화 ④ 제네릭 타입으로 재사용성 확보. 상태와 로직을 컴포넌트에서 추출하여 여러 컴포넌트에서 공유하는 것이 커스텀 훅의 핵심 가치입니다.</p>" +
      "<br/>" +
      "<p><strong>Q3. React 19의 use() 훅이 기존 훅 규칙의 예외인 이유는 무엇인가요?</strong></p>" +
      "<p><code>use()</code>는 조건문이나 반복문 안에서도 호출 가능한 유일한 훅입니다. 이는 <code>use()</code>가 내부적으로 다른 훅처럼 호출 순서에 의존하지 않고, Promise/Context의 참조 자체로 상태를 관리하기 때문입니다. 조건부 데이터 페칭(<code>if (shouldFetch) use(promise)</code>)이 가능해져 코드가 더 자연스러워집니다.</p>",
  },
  {
    question: "useRef는 어떤 경우에 사용하나요?",
    answer:
      "<p><code>useRef</code>는 두 가지 주요 용도로 사용됩니다. ① DOM 요소에 직접 접근: <code>ref={inputRef}</code>로 DOM 노드를 참조하여 포커스, 스크롤, 측정 등을 수행합니다. ② 렌더링 사이에 값을 유지하되 리렌더링을 트리거하지 않는 '변수': 이전 값 저장, 타이머 ID 보관, 마운트 여부 추적 등. <code>ref.current</code>는 변경해도 리렌더링이 발생하지 않습니다.</p>" +
      "<br/>" +
      "<p><strong>Q1. useRef와 useState의 선택 기준은 무엇인가요?</strong></p>" +
      "<p>화면에 표시되는 값이면 useState, 표시되지 않는 내부 값이면 useRef입니다. 타이머 ID, 이전 props 저장, WebSocket 인스턴스 등은 ref가 적합합니다. ref.current 변경은 리렌더링을 발생시키지 않으므로 '렌더링에 영향 없는 가변 변수'로 사용됩니다. Render Phase에서 ref를 읽거나 쓰면 Concurrent Mode에서 예측 불가능한 동작이 발생할 수 있으므로, 이벤트 핸들러나 이펙트에서만 조작해야 합니다.</p>" +
      "<br/>" +
      "<p><strong>Q2. forwardRef와 useImperativeHandle은 어떤 문제를 해결하나요?</strong></p>" +
      "<p><code>forwardRef</code>는 부모가 자식 컴포넌트의 내부 DOM 요소에 ref를 전달할 수 있게 합니다. <code>useImperativeHandle</code>은 부모에 노출하는 ref 인터페이스를 커스터마이징하여, 내부 DOM을 직접 노출하는 대신 특정 메서드(focus, scrollTo 등)만 제공합니다. 이는 컴포넌트 캡슐화를 유지하면서 필수적인 imperative API만 노출하는 패턴입니다. React 19에서는 forwardRef 없이 props로 ref를 직접 전달할 수 있습니다.</p>" +
      "<br/>" +
      "<p><strong>Q3. callback ref 패턴은 무엇이며, 어떤 상황에서 유용한가요?</strong></p>" +
      "<p>ref prop에 함수를 전달하는 패턴입니다: <code>&lt;div ref={(node) => { ... }}&gt;</code>. 요소가 마운트되면 DOM 노드가 전달되고, 언마운트되면 null이 전달됩니다. 조건부로 렌더링되는 요소의 마운트/언마운트를 감지하거나, IntersectionObserver를 연결할 때 유용합니다. useRef와 달리 DOM이 실제로 연결/해제되는 시점을 콜백으로 알 수 있어 더 세밀한 제어가 가능합니다.</p>",
  },
  {
    question: "Error Boundary란 무엇인가요?",
    answer:
      "<p>Error Boundary는 자식 컴포넌트 트리에서 발생하는 JavaScript 에러를 포착하여, 깨진 UI 대신 대체(fallback) UI를 보여주는 React 컴포넌트입니다. 클래스 컴포넌트에서 <code>static getDerivedStateFromError()</code>와 <code>componentDidCatch()</code> 라이프사이클 메서드를 구현하여 만듭니다. 에러가 전체 앱을 크래시시키는 것을 방지하고, 영향 범위를 해당 boundary 내로 격리합니다.</p>" +
      "<br/>" +
      "<p><strong>Q1. Error Boundary가 포착하지 못하는 에러는 어떤 것들이 있나요?</strong></p>" +
      "<p>Error Boundary는 다음 에러를 포착하지 못합니다: ① 이벤트 핸들러 내 에러(try-catch로 직접 처리) ② 비동기 코드(setTimeout, Promise) ③ 서버 사이드 렌더링(SSR) ④ Error Boundary 자체에서 발생한 에러. 이벤트 핸들러 에러는 렌더링 과정이 아닌 사용자 상호작용에서 발생하므로 React 트리의 에러 전파 메커니즘에 포함되지 않습니다.</p>" +
      "<br/>" +
      "<p><strong>Q2. Error Boundary를 어느 단위로 배치하는 것이 적절한가요?</strong></p>" +
      "<p>전략적 배치가 중요합니다: ① 최상위: 전체 앱 크래시 방지(최후의 방어선) ② 라우트 단위: 한 페이지의 에러가 다른 페이지에 영향 없음 ③ 위젯 단위: 독립적인 기능 블록 격리 ④ 외부 데이터 의존 컴포넌트. 너무 세분화하면 UX가 파편화되고, 너무 넓으면 정상 부분까지 영향받습니다. 사용자 영향도를 기준으로 적절한 격리 단위를 결정합니다.</p>" +
      "<br/>" +
      "<p><strong>Q3. 함수 컴포넌트에서 Error Boundary를 구현할 수 없는 이유와 대안은?</strong></p>" +
      "<p>현재 <code>getDerivedStateFromError</code>와 <code>componentDidCatch</code>에 대응하는 훅이 존재하지 않아 함수 컴포넌트로는 구현이 불가합니다. 대안으로 <code>react-error-boundary</code> 라이브러리가 널리 사용되며, 함수 컴포넌트 친화적인 API(<code>useErrorBoundary</code> 훅, <code>ErrorBoundary</code> 컴포넌트)를 제공합니다. React 팀은 향후 함수 컴포넌트용 에러 처리 훅을 도입할 가능성을 시사하고 있습니다.</p>",
  },
  {
    question: "Error Boundary의 한계점은 무엇인가요?",
    answer:
      "<p>Error Boundary의 주요 한계는: ① 이벤트 핸들러, 비동기 코드, SSR의 에러를 포착하지 못합니다 ② 클래스 컴포넌트로만 구현 가능합니다 ③ 에러 복구(recovery) 메커니즘이 제한적입니다. '다시 시도' 기능을 위해 key를 변경하여 리마운트하거나, 상태를 리셋해야 합니다 ④ 하위 컴포넌트의 모든 상태가 소실됩니다. 에러 발생 시 해당 boundary 내의 컴포넌트 트리가 완전히 언마운트되기 때문입니다.</p>" +
      "<br/>" +
      "<p><strong>Q1. 이벤트 핸들러 에러를 체계적으로 관리하는 방법은?</strong></p>" +
      "<p>① 개별 try-catch로 처리하되 공통 에러 핸들러 함수로 추출 ② <code>react-error-boundary</code>의 <code>useErrorBoundary</code> 훅으로 이벤트 핸들러 에러를 가장 가까운 Error Boundary에 전달: <code>const { showBoundary } = useErrorBoundary()</code> ③ 전역 에러 이벤트(<code>window.onerror</code>, <code>unhandledrejection</code>)로 미포착 에러 모니터링 ④ Sentry 같은 에러 트래킹 서비스와 통합.</p>" +
      "<br/>" +
      "<p><strong>Q2. Error Boundary와 Suspense의 에러 처리를 함께 설계하는 방법은?</strong></p>" +
      "<p>Suspense는 로딩 상태를, Error Boundary는 에러 상태를 처리합니다. 일반적으로 Error Boundary가 Suspense를 감싸서, 데이터 페칭 실패 시 에러 UI를 표시합니다. <code>&lt;ErrorBoundary fallback={&lt;ErrorUI /&gt;}&gt;&lt;Suspense fallback={&lt;Loading /&gt;}&gt;&lt;DataComponent /&gt;&lt;/Suspense&gt;&lt;/ErrorBoundary&gt;</code> 패턴이 표준적입니다.</p>" +
      "<br/>" +
      "<p><strong>Q3. 프로덕션에서 Error Boundary를 효과적으로 활용하기 위한 전략은?</strong></p>" +
      "<p>① componentDidCatch에서 에러 로깅 서비스(Sentry)로 에러 정보 전송 ② 사용자 친화적인 fallback UI에 '다시 시도' 버튼 제공 ③ 개발 환경에서는 에러 오버레이를 표시하고, 프로덕션에서는 graceful degradation ④ Error Boundary의 fallback에서도 에러가 발생할 수 있으므로 fallback을 최대한 단순하게 유지. react-error-boundary의 resetKeys로 특정 상태 변경 시 자동 리셋도 가능합니다.</p>",
  },
  {
    question: "Batching Update란 무엇인가요?",
    answer:
      "<p>Batching은 여러 상태 업데이트를 하나의 리렌더링으로 묶어 처리하는 React의 최적화 기법입니다. 이벤트 핸들러에서 <code>setA(1); setB(2); setC(3)</code>을 연속 호출해도 3번이 아닌 1번만 리렌더링됩니다. React 18부터는 setTimeout, Promise, 네이티브 이벤트 핸들러 등 모든 컨텍스트에서 자동 배치(Automatic Batching)가 적용됩니다.</p>" +
      "<br/>" +
      "<p><strong>Q1. React 18 이전의 배치 동작과 어떤 차이가 있나요?</strong></p>" +
      "<p>React 17까지는 React 이벤트 핸들러(onClick 등) 내에서만 배치가 작동했습니다. setTimeout 콜백, fetch.then 핸들러, DOM 이벤트 리스너에서는 각 setState마다 즉시 리렌더링이 발생했습니다. <code>unstable_batchedUpdates()</code>로 명시적 배치는 가능했지만 번거로웠습니다. React 18의 createRoot를 사용하면 모든 상황에서 자동 배치되어 성능이 향상됩니다.</p>" +
      "<br/>" +
      "<p><strong>Q2. flushSync를 사용해 배치를 해제해야 하는 경우는 어떤 것이 있나요?</strong></p>" +
      "<p><code>flushSync(() => setState(value))</code>는 해당 업데이트를 즉시 DOM에 반영합니다. 드문 경우에 필요합니다: ① 상태 변경 직후 DOM 측정이 필요한 경우 ② 접근성(aria) 속성이 상태 변경 즉시 업데이트되어야 하는 경우 ③ 서드파티 라이브러리가 동기적 DOM 업데이트를 요구하는 경우. 그러나 대부분의 경우 useLayoutEffect로 해결 가능하므로 flushSync는 최후의 수단입니다.</p>" +
      "<br/>" +
      "<p><strong>Q3. 배치와 관련된 성능 측정은 어떻게 하나요?</strong></p>" +
      "<p>React DevTools의 Profiler로 리렌더링 횟수와 각 렌더의 소요 시간을 측정합니다. 'Highlight updates when components render' 옵션으로 시각적으로 확인할 수 있습니다. 배치가 제대로 동작하면 여러 setState 후 렌더가 한 번만 기록됩니다. <code>React.Profiler</code> 컴포넌트의 onRender 콜백으로 프로그래밍적 측정도 가능합니다. 성능 개선 효과는 불필요한 렌더 횟수 감소로 직접 확인됩니다.</p>",
  },
  {
    question: "React에서 컴포넌트란 무엇인가요?",
    answer:
      "<p>React 컴포넌트는 UI의 독립적이고 재사용 가능한 조각입니다. JavaScript 함수(또는 클래스)가 props를 받아 React Element(JSX)를 반환합니다. 컴포넌트는 자체 상태(state)를 가질 수 있고, 다른 컴포넌트를 조합하여 복잡한 UI를 구성합니다. 함수 컴포넌트가 현재 표준이며, 훅(Hooks)을 통해 상태 관리와 생명주기 기능을 사용합니다.</p>" +
      "<br/>" +
      "<p><strong>Q1. 함수 컴포넌트와 클래스 컴포넌트의 핵심 차이는 무엇인가요?</strong></p>" +
      "<p>함수 컴포넌트는 각 렌더링의 props/state 값을 클로저로 캡처하여 '불변의 스냅샷'을 가집니다. 클래스 컴포넌트는 <code>this.props</code>가 항상 최신 값을 가리키므로, 비동기 콜백에서 의도치 않게 새로운 props를 참조하는 문제가 발생할 수 있습니다. 함수 컴포넌트는 훅으로 상태 관리가 간결하고, 로직 재사용이 커스텀 훅으로 쉽게 가능합니다.</p>" +
      "<br/>" +
      "<p><strong>Q2. 컴포넌트 설계 시 단일 책임 원칙(SRP)을 어떻게 적용하나요?</strong></p>" +
      "<p>하나의 컴포넌트는 하나의 역할만 담당해야 합니다. 데이터 페칭과 표현을 분리(Container/Presentational 패턴 또는 커스텀 훅), 레이아웃과 콘텐츠 분리, 비즈니스 로직과 UI 분리가 핵심입니다. 컴포넌트가 200줄 이상이거나 props가 10개를 초과하면 분할을 고려합니다. FSD 아키텍처에서는 이 책임을 레이어별로 체계화합니다.</p>" +
      "<br/>" +
      "<p><strong>Q3. 컴포넌트 합성(Composition)이 상속보다 권장되는 이유는?</strong></p>" +
      "<p>React 팀은 상속 대신 합성을 공식적으로 권장합니다. <code>children</code> prop, render props, 커스텀 훅이 합성의 도구입니다. 상속은 is-a 관계를 강제하여 결합도가 높아지고, 다중 상속이 불가능하며, 클래스 컴포넌트에서만 사용 가능합니다. 합성은 has-a 관계로 유연하게 기능을 조합하고, 함수 컴포넌트와 훅 생태계에 자연스럽게 통합됩니다.</p>",
  },
  {
    question: "JSX란 무엇인가요?",
    answer:
      "<p>JSX(JavaScript XML)는 자바스크립트 안에서 HTML과 유사한 마크업을 작성할 수 있게 해주는 문법 확장입니다. Babel이나 TypeScript 컴파일러가 JSX를 <code>React.createElement()</code>(또는 React 17+의 자동 JSX 변환) 호출로 변환합니다. JSX는 필수가 아니지만, 컴포넌트의 구조를 시각적으로 표현하여 가독성을 높이고, HTML과 JavaScript 로직을 한 곳에서 관리할 수 있게 합니다.</p>" +
      "<br/>" +
      "<p><strong>Q1. JSX가 React.createElement로 변환되는 과정을 설명해주세요.</strong></p>" +
      "<p><code>&lt;div className=\"box\"&gt;&lt;span&gt;Hello&lt;/span&gt;&lt;/div&gt;</code>는 <code>React.createElement('div', { className: 'box' }, React.createElement('span', null, 'Hello'))</code>로 변환됩니다. React 17+의 새로운 JSX 변환은 <code>_jsx('div', { className: 'box', children: _jsx('span', { children: 'Hello' }) })</code>로 변환되어 <code>import React</code>가 불필요해졌습니다.</p>" +
      "<br/>" +
      "<p><strong>Q2. JSX에서 조건부 렌더링을 구현하는 패턴들과 각각의 장단점은?</strong></p>" +
      "<p>① 삼항 연산자: <code>{isLoggedIn ? &lt;Dashboard /&gt; : &lt;Login /&gt;}</code> - 두 가지 분기에 적합 ② 논리 AND: <code>{isVisible && &lt;Modal /&gt;}</code> - 간단하지만 falsy 값(0, '')이 렌더링될 수 있음 ③ 즉시 실행 함수/변수: 복잡한 조건에 적합 ④ 컴포넌트 분리: 조건 로직을 별도 컴포넌트로 추출. 0이 렌더링되는 문제는 <code>{count > 0 && ...}</code> 대신 <code>{!!count && ...}</code>로 방지합니다.</p>" +
      "<br/>" +
      "<p><strong>Q3. React에서 JSX 없이 UI를 구성하는 방법과 그 장단점은?</strong></p>" +
      "<p><code>React.createElement</code>를 직접 호출하면 JSX 없이도 React를 사용할 수 있습니다. 동적으로 컴포넌트 타입을 결정하거나, 빌드 도구 없이 React를 사용할 때 유용합니다. <code>htm</code> 라이브러리는 tagged template literal로 JSX 유사 문법을 빌드 없이 제공합니다. 그러나 JSX가 제공하는 시각적 구조 표현, 자동 완성, 타입 검사의 이점이 크므로 실무에서는 거의 항상 JSX를 사용합니다.</p>",
  },
  // ─────────────────────────────────────────────
  // CSS / HTML
  // ─────────────────────────────────────────────
  {
    question: "HTML과 CSS의 약자는 무엇인가요?",
    answer:
      "<p>HTML은 <strong>HyperText Markup Language</strong>의 약자로, 웹 페이지의 구조와 의미(시맨틱)를 정의하는 마크업 언어입니다. CSS는 <strong>Cascading Style Sheets</strong>의 약자로, HTML 요소의 시각적 표현(레이아웃, 색상, 폰트 등)을 담당합니다. 'Cascading'은 스타일 규칙이 우선순위에 따라 계단식으로 적용된다는 의미입니다.</p>" +
      "<br/>" +
      "<p><strong>Q1. CSS의 'Cascading'이 구체적으로 어떤 순서로 적용되나요?</strong></p>" +
      "<p>CSS 캐스케이드는 다음 순서로 우선순위가 결정됩니다: ① Origin(출처): 사용자 에이전트 → 사용자 → 작성자 스타일 ② Specificity(명시도): 인라인 > ID > 클래스/속성/의사클래스 > 요소/의사요소 ③ Order(선언 순서): 나중에 선언된 것이 우선. <code>!important</code>는 이 순서를 역전시킵니다. CSS Layers(<code>@layer</code>)는 캐스케이드에 명시적 레이어를 추가하여 라이브러리 스타일과 커스텀 스타일의 우선순위를 체계적으로 관리합니다.</p>" +
      "<br/>" +
      "<p><strong>Q2. 시맨틱 HTML이 중요한 이유를 설명해주세요.</strong></p>" +
      "<p>시맨틱 태그(<code>&lt;header&gt;</code>, <code>&lt;nav&gt;</code>, <code>&lt;main&gt;</code>, <code>&lt;article&gt;</code>, <code>&lt;section&gt;</code>)는 ① 스크린 리더가 문서 구조를 파악하여 접근성 향상 ② 검색 엔진이 콘텐츠의 의미를 이해하여 SEO 개선 ③ 개발자가 코드 구조를 직관적으로 파악 ④ 브라우저의 리더 모드 등 기능에서 올바른 콘텐츠 추출을 가능하게 합니다.</p>" +
      "<br/>" +
      "<p><strong>Q3. CSS 명시도(Specificity) 계산 방법을 설명해주세요.</strong></p>" +
      "<p>명시도는 (a, b, c) 형태로 계산됩니다. a: ID 선택자 수, b: 클래스/속성/의사클래스 수, c: 요소/의사요소 수. <code>#header .nav a:hover</code>는 (1,2,1)입니다. 인라인 스타일은 이보다 항상 우선하고, <code>!important</code>는 별도의 최상위 우선순위입니다. <code>:where()</code>는 명시도 0으로 계산되고, <code>:is()</code>는 인자 중 가장 높은 명시도로 계산됩니다.</p>",
  },
  {
    question: "DOCTYPE이란 무엇인가요?",
    answer:
      "<p><code>&lt;!DOCTYPE html&gt;</code>은 문서 형식 선언(Document Type Declaration)으로, 브라우저에게 HTML 버전을 알려줍니다. HTML5의 DOCTYPE은 간단히 <code>&lt;!DOCTYPE html&gt;</code>이며, 이를 통해 브라우저가 '표준 모드(Standards Mode)'로 렌더링하게 합니다. DOCTYPE이 없으면 '호환 모드(Quirks Mode)'로 동작하여 CSS 박스 모델 등이 비표준으로 처리됩니다.</p>" +
      "<br/>" +
      "<p><strong>Q1. 표준 모드와 호환 모드(Quirks Mode)의 구체적인 차이는 무엇인가요?</strong></p>" +
      "<p>호환 모드에서는 ① 박스 모델이 border-box처럼 동작(IE 구형 방식) ② 인라인 요소의 수직 정렬이 다름 ③ 테이블 셀 내 퍼센트 높이 계산이 다름 ④ 특정 CSS 속성의 해석이 달라짐. <code>document.compatMode</code>로 현재 모드를 확인할 수 있습니다('CSS1Compat'이면 표준, 'BackCompat'이면 호환). 현대 웹 개발에서는 반드시 표준 모드를 사용해야 합니다.</p>" +
      "<br/>" +
      "<p><strong>Q2. HTML5 이전의 DOCTYPE 선언은 왜 그렇게 길었나요?</strong></p>" +
      '<p>HTML 4.01과 XHTML은 SGML 기반이었기 때문에 DTD(Document Type Definition) 참조가 필요했습니다. <code>&lt;!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd"&gt;</code>처럼 긴 선언이 필요했습니다. HTML5는 SGML이 아닌 독립 스펙이므로 DTD 참조가 불필요하여 최소한의 선언만 남겼습니다.</p>' +
      "<br/>" +
      "<p><strong>Q3. 메타 태그(&lt;meta&gt;)의 주요 역할과 필수적인 것들을 설명해주세요.</strong></p>" +
      '<p>필수 메타 태그: ① <code>&lt;meta charset="UTF-8"&gt;</code>: 문자 인코딩 선언 ② <code>&lt;meta name="viewport" content="width=device-width, initial-scale=1"&gt;</code>: 모바일 반응형 필수. 추가로 <code>&lt;meta name="description"&gt;</code>은 SEO에 중요하고, <code>&lt;meta property="og:*"&gt;</code>는 소셜 미디어 공유 시 미리보기를 제어합니다. CSP(Content-Security-Policy) 메타 태그로 보안 정책도 설정 가능합니다.</p>',
  },
  {
    question: "HTML의 data 속성(data-*)이란 무엇인가요?",
    answer:
      '<p><code>data-*</code> 속성은 HTML 요소에 커스텀 데이터를 저장하는 표준 방법입니다. <code>&lt;div data-user-id="123" data-role="admin"&gt;</code>처럼 사용하며, JavaScript에서 <code>element.dataset.userId</code>로 접근합니다(kebab-case가 camelCase로 변환). CSS에서도 <code>[data-role="admin"]</code> 선택자나 <code>attr(data-user-id)</code>로 활용 가능합니다.</p>' +
      "<br/>" +
      "<p><strong>Q1. data 속성 사용 시 주의할 점은 무엇인가요?</strong></p>" +
      "<p>① 민감한 데이터를 저장하면 안 됩니다. DOM에 노출되므로 DevTools에서 누구나 확인 가능합니다 ② 대량의 데이터 저장에 부적합합니다. 복잡한 객체는 JavaScript 변수나 WeakMap에 저장해야 합니다 ③ 값은 항상 문자열이므로 숫자/불리언은 변환이 필요합니다 ④ 스크린 리더가 읽지 않으므로 접근성 정보는 aria-* 속성을 사용해야 합니다.</p>" +
      "<br/>" +
      "<p><strong>Q2. React에서 data 속성을 활용하는 패턴은 어떤 것이 있나요?</strong></p>" +
      "<p>이벤트 위임에서 <code>data-*</code>를 식별자로 활용합니다. 리스트 아이템에 <code>data-id={item.id}</code>를 부여하고, 부모의 onClick에서 <code>e.target.closest('[data-id]').dataset.id</code>로 클릭된 아이템을 식별합니다. 테스트에서도 <code>data-testid</code>로 요소를 선택하는 것이 클래스명보다 안정적이며, Testing Library가 이 패턴을 권장합니다.</p>" +
      "<br/>" +
      "<p><strong>Q3. data 속성 vs aria 속성 vs class 속성의 적절한 사용 구분은?</strong></p>" +
      "<p><code>data-*</code>는 JavaScript 로직에 필요한 커스텀 데이터, <code>aria-*</code>는 접근성 정보(스크린 리더), <code>class</code>는 스타일링 목적입니다. 스타일링에 data 속성을 사용하면(<code>[data-active]</code>) 상태와 스타일을 분리할 수 있지만, Tailwind CSS에서는 <code>data-[active]:bg-blue-500</code>처럼 직접 활용도 가능합니다.</p>",
  },
  {
    question: "웹에서 사용하는 이미지 포맷의 종류와 특징을 설명해주세요.",
    answer:
      "<p>주요 이미지 포맷: ① <strong>JPEG</strong>: 손실 압축, 사진에 적합, 투명도 미지원 ② <strong>PNG</strong>: 무손실 압축, 투명도 지원, 그래픽/스크린샷에 적합 ③ <strong>WebP</strong>: Google 개발, JPEG보다 25-35% 작은 크기, 투명도+애니메이션 지원 ④ <strong>AVIF</strong>: AV1 기반, WebP보다 더 높은 압축률, 점진적 브라우저 지원 ⑤ <strong>SVG</strong>: 벡터 포맷, 해상도 독립적, 아이콘/로고에 적합.</p>" +
      "<br/>" +
      "<p><strong>Q1. WebP와 AVIF가 JPEG/PNG를 완전히 대체하지 못하는 이유는?</strong></p>" +
      "<p>① 브라우저 호환성: AVIF는 Safari 16+부터 지원, 구형 브라우저 미지원 ② 인코딩 속도: AVIF 인코딩이 JPEG보다 현저히 느려 빌드 시간 증가 ③ 기존 에코시스템: CMS, 이미지 편집 도구, CDN이 JPEG/PNG를 기본 지원 ④ 특수 용도: 인쇄용 이미지는 여전히 고품질 JPEG/TIFF 필요. <code>&lt;picture&gt;</code> 태그로 포맷별 fallback을 제공하는 것이 현실적입니다.</p>" +
      "<br/>" +
      "<p><strong>Q2. SVG를 React 컴포넌트로 사용하는 방법과 장단점은?</strong></p>" +
      "<p>① import로 직접 사용: <code>import Logo from './logo.svg?react'</code>(Vite) ② 인라인: JSX에 SVG 마크업 직접 작성 ③ 외부 파일: <code>&lt;img src=\"logo.svg\"&gt;</code>. 인라인 SVG는 CSS/JS로 동적 스타일링 가능하고, fill/stroke을 currentColor로 설정하면 부모 color를 상속합니다. 단점으로 번들 크기가 증가하고 서버 캐싱 불가. sprite 방식으로 여러 아이콘을 하나의 SVG에 묶는 최적화도 있습니다.</p>" +
      "<br/>" +
      "<p><strong>Q3. 반응형 이미지를 위한 srcset과 sizes 속성은 어떻게 사용하나요?</strong></p>" +
      '<p><code>srcset</code>은 다양한 크기의 이미지를 제공하고, <code>sizes</code>는 뷰포트 크기별 이미지 표시 크기를 명시합니다. <code>&lt;img srcset="small.jpg 400w, medium.jpg 800w, large.jpg 1200w" sizes="(max-width: 600px) 100vw, 50vw"&gt;</code>. 브라우저가 기기 DPR과 뷰포트 크기를 고려하여 최적의 이미지를 자동 선택합니다. <code>&lt;picture&gt;</code> 태그는 아트 디렉션(뷰포트별 다른 크롭)에 사용합니다.</p>',
  },
  {
    question: "이미지 최적화 방법에는 어떤 것들이 있나요?",
    answer:
      '<p>이미지 최적화 전략: ① 적절한 포맷 선택(사진→WebP/AVIF, 아이콘→SVG) ② 반응형 이미지(srcset/sizes)로 기기별 최적 크기 전달 ③ lazy loading(<code>loading="lazy"</code>)으로 뷰포트 밖 이미지 지연 로딩 ④ width/height 명시로 CLS 방지 ⑤ CDN을 통한 이미지 변환/캐싱 ⑥ CSS <code>image-rendering</code>으로 렌더링 품질 제어.</p>' +
      "<br/>" +
      "<p><strong>Q1. Next.js/Vite 환경에서의 이미지 최적화 전략은?</strong></p>" +
      "<p>Next.js의 <code>&lt;Image&gt;</code> 컴포넌트는 자동으로 WebP/AVIF 변환, 크기 조정, lazy loading, blur placeholder를 제공합니다. Vite 환경에서는 <code>vite-plugin-image-optimizer</code>로 빌드 시 이미지를 최적화하고, <code>@squoosh/lib</code>이나 <code>sharp</code>로 서버 사이드 변환합니다. Cloudinary, imgix 같은 이미지 CDN은 URL 파라미터로 실시간 변환을 지원합니다.</p>" +
      "<br/>" +
      "<p><strong>Q2. CLS(Cumulative Layout Shift)를 방지하기 위한 이미지 처리는?</strong></p>" +
      "<p>이미지가 로딩되면서 레이아웃이 밀리는 현상을 방지하려면: ① <code>width</code>/<code>height</code> 속성을 명시하여 브라우저가 미리 공간 확보 ② <code>aspect-ratio</code> CSS로 비율 고정 ③ 플레이스홀더(blur-up, LQIP)로 로딩 전 공간 채우기 ④ <code>contain: size</code>로 요소 크기 고정. Core Web Vitals의 CLS 점수에 직접 영향을 미칩니다.</p>" +
      "<br/>" +
      "<p><strong>Q3. LCP(Largest Contentful Paint) 최적화를 위한 이미지 전략은?</strong></p>" +
      '<p>LCP 이미지는 가장 큰 콘텐츠 요소이므로: ① <code>fetchpriority="high"</code>로 우선 로딩 ② <code>loading="lazy"</code>를 사용하지 않음(above-the-fold 이미지) ③ <code>&lt;link rel="preload" as="image"&gt;</code>로 프리로드 ④ CDN에서 가까운 엣지 서버로 전달 ⑤ 적절한 압축으로 파일 크기 최소화. LCP 2.5초 이내가 \'Good\' 기준입니다.</p>',
  },
  {
    question: "img 태그의 alt 속성은 왜 중요한가요?",
    answer:
      '<p><code>alt</code> 속성은 이미지의 대체 텍스트(alternative text)로, ① 스크린 리더가 시각 장애 사용자에게 이미지 내용을 전달 ② 이미지 로딩 실패 시 대체 텍스트 표시 ③ 검색 엔진이 이미지 내용을 이해하여 SEO 향상. 장식용 이미지는 <code>alt=""</code>(빈 문자열)로 스크린 리더가 건너뛰게 하고, 정보를 담은 이미지는 그 의미를 설명하는 텍스트를 작성합니다.</p>' +
      "<br/>" +
      "<p><strong>Q1. 좋은 alt 텍스트를 작성하는 원칙은 무엇인가요?</strong></p>" +
      "<p>① 이미지의 '목적'을 설명합니다(시각적 묘사가 아닌 전달 의도) ② 간결하게 작성(125자 이내 권장) ③ '~의 이미지', '~의 사진' 같은 불필요한 표현 생략 ④ 링크 내 이미지는 목적지/동작을 설명 ⑤ 차트/그래프는 핵심 데이터를 텍스트로 제공 ⑥ 장식 이미지는 <code>alt=\"\"</code> + <code>role=\"presentation\"</code>. 컨텍스트에 따라 같은 이미지라도 다른 alt가 필요할 수 있습니다.</p>" +
      "<br/>" +
      "<p><strong>Q2. ARIA(Accessible Rich Internet Applications)에서 이미지 관련 속성은?</strong></p>" +
      '<p><code>aria-label</code>은 요소에 직접 레이블을, <code>aria-labelledby</code>는 다른 요소의 ID를 참조하여 레이블을 지정합니다. 복잡한 이미지(인포그래픽)는 <code>aria-describedby</code>로 긴 설명을 연결합니다. <code>role="img"</code>는 CSS 배경 이미지 같은 비-img 요소에 이미지 역할을 부여합니다. SVG 아이콘에는 <code>&lt;title&gt;</code>과 <code>aria-hidden="true"</code>(장식용)를 적절히 사용합니다.</p>' +
      "<br/>" +
      "<p><strong>Q3. 웹 접근성(a11y) 테스트 도구와 방법을 설명해주세요.</strong></p>" +
      "<p>① 자동 테스트: axe-core(브라우저 확장), Lighthouse의 접근성 감사, eslint-plugin-jsx-a11y ② 수동 테스트: 키보드만으로 네비게이션, 스크린 리더(VoiceOver, NVDA) 직접 사용 ③ CI 통합: jest-axe로 컴포넌트 단위 접근성 테스트 ④ Storybook의 a11y 애드온으로 개발 중 실시간 검사. WCAG 2.1 AA 수준이 일반적인 법적 요구사항입니다.</p>",
  },
  {
    question: "px, em, rem의 차이점은 무엇인가요?",
    answer:
      "<p><code>px</code>은 절대 단위로 고정 크기입니다. <code>em</code>은 부모 요소의 폰트 크기에 상대적입니다(중첩 시 누적됨). <code>rem</code>은 루트 요소(<code>&lt;html&gt;</code>)의 폰트 크기에 상대적입니다. 반응형 디자인에서는 rem을 기본 단위로 사용하고, 컴포넌트 내부 간격에 em을 활용합니다. 브라우저 기본 폰트 크기는 16px이므로 <code>1rem = 16px</code>입니다.</p>" +
      "<br/>" +
      "<p><strong>Q1. rem 기반 설계에서 62.5% 트릭이란 무엇이며, 현재도 권장되나요?</strong></p>" +
      "<p><code>html { font-size: 62.5% }</code>로 설정하면 1rem = 10px이 되어 px↔rem 변환이 쉬워집니다(16px → 1.6rem). 그러나 이 방식은 ① 사용자의 브라우저 기본 폰트 크기 설정을 무시할 수 있음 ② 모든 요소에 rem 재설정이 필요 ③ 서드파티 라이브러리와 충돌 가능성이 있습니다. 현재는 CSS 커스텀 프로퍼티나 <code>calc()</code>, clamp()로 유연하게 처리하는 것이 권장됩니다.</p>" +
      "<br/>" +
      "<p><strong>Q2. 뷰포트 단위(vw, vh, dvh)는 어떤 상황에서 사용하나요?</strong></p>" +
      "<p><code>vw/vh</code>는 뷰포트 너비/높이의 1%입니다. 전체 화면 섹션, 반응형 타이포그래피에 유용합니다. 그러나 모바일에서 <code>100vh</code>가 주소 표시줄을 포함하여 콘텐츠가 잘리는 문제가 있습니다. <code>dvh</code>(dynamic viewport height)는 주소 표시줄 표시/숨김에 따라 동적으로 변하고, <code>svh</code>(small)와 <code>lvh</code>(large)는 각각 최소/최대 뷰포트를 기준으로 합니다.</p>" +
      "<br/>" +
      "<p><strong>Q3. CSS clamp() 함수를 활용한 유동적 타이포그래피는 어떻게 구현하나요?</strong></p>" +
      "<p><code>clamp(min, preferred, max)</code>는 값의 범위를 제한합니다. <code>font-size: clamp(1rem, 2.5vw, 2rem)</code>은 뷰포트에 따라 유동적으로 변하되 1rem 미만, 2rem 초과가 되지 않습니다. 미디어 쿼리 없이 반응형 타이포그래피를 구현할 수 있어 모던 CSS에서 자주 사용됩니다. <code>clamp()</code>는 폰트뿐 아니라 간격, 너비 등 모든 CSS 값에 적용 가능합니다.</p>",
  },
  {
    question: "box-sizing 속성은 무엇이며, 왜 중요한가요?",
    answer:
      "<p><code>box-sizing</code>은 요소의 크기(width/height) 계산 방식을 결정합니다. <code>content-box</code>(기본값)는 width가 콘텐츠만 포함하여 padding과 border가 추가로 더해집니다. <code>border-box</code>는 width에 padding과 border가 포함되어 직관적입니다. 실무에서는 <code>*, *::before, *::after { box-sizing: border-box }</code>를 전역으로 설정하는 것이 표준입니다.</p>" +
      "<br/>" +
      "<p><strong>Q1. border-box가 기본값이 아닌 역사적 이유는 무엇인가요?</strong></p>" +
      "<p>W3C가 CSS 사양을 정할 때 content-box를 표준으로 채택했고, 이는 CSS의 수학적 모델에서 '콘텐츠 영역'이 기본 측정 단위라는 논리였습니다. 그러나 IE6는 비표준으로 border-box 방식을 사용했고, 실무에서는 IE의 방식이 더 직관적이었습니다. CSS3에서 box-sizing 속성이 추가되어 개발자가 선택할 수 있게 되었으며, 현재 모든 CSS 리셋/정규화 라이브러리가 border-box를 기본 적용합니다.</p>" +
      "<br/>" +
      "<p><strong>Q2. CSS의 마진 상쇄(Margin Collapsing) 현상을 설명해주세요.</strong></p>" +
      "<p>인접한 블록 요소의 수직 마진이 합쳐지는 현상입니다. 두 요소의 margin-bottom과 margin-top이 만나면 큰 값 하나만 적용됩니다. 부모-자식 간에도 발생하여 자식의 margin-top이 부모 밖으로 빠져나갈 수 있습니다. 방지 방법: ① 부모에 padding이나 border 추가 ② <code>overflow: hidden/auto</code> ③ Flexbox/Grid 컨텍스트 ④ <code>display: flow-root</code>. Flexbox/Grid에서는 마진 상쇄가 발생하지 않습니다.</p>" +
      "<br/>" +
      "<p><strong>Q3. 논리적 프로퍼티(Logical Properties)란 무엇인가요?</strong></p>" +
      "<p><code>margin-left</code> 대신 <code>margin-inline-start</code>, <code>padding-top</code> 대신 <code>padding-block-start</code>를 사용하는 CSS 논리적 프로퍼티는 RTL(우→좌) 언어에서 자동으로 방향이 전환됩니다. 국제화(i18n)를 지원하는 웹 앱에서 중요합니다. <code>inline</code>은 텍스트 흐름 방향(가로), <code>block</code>은 블록 쌓임 방향(세로)을 의미합니다.</p>",
  },
  {
    question: "CSS 쌓임 맥락(Stacking Context)이란 무엇인가요?",
    answer:
      "<p>쌓임 맥락은 요소가 z축에서 겹치는 순서를 결정하는 3차원 개념입니다. 새로운 쌓임 맥락은 다음 조건에서 생성됩니다: ① <code>position: relative/absolute/fixed</code> + z-index ② <code>opacity < 1</code> ③ <code>transform</code>, <code>filter</code>, <code>will-change</code> ④ <code>isolation: isolate</code>. 같은 쌓임 맥락 내에서만 z-index 비교가 이루어지며, 다른 맥락의 요소와는 부모의 순서로 결정됩니다.</p>" +
      "<br/>" +
      "<p><strong>Q1. z-index가 기대대로 동작하지 않는 흔한 원인은?</strong></p>" +
      "<p>가장 흔한 원인은 서로 다른 쌓임 맥락에 속한 요소를 비교하기 때문입니다. 요소 A(z-index: 9999)가 쌓임 맥락 X 안에 있고, 요소 B(z-index: 1)가 쌓임 맥락 Y 안에 있을 때, X와 Y의 z-index가 더 우선합니다. 또한 <code>position</code>이 static이면 z-index가 적용되지 않습니다. DevTools에서 '3D View'로 쌓임 순서를 시각적으로 확인할 수 있습니다.</p>" +
      "<br/>" +
      "<p><strong>Q2. 모달/드롭다운의 z-index 관리를 체계적으로 하는 방법은?</strong></p>" +
      "<p>① CSS 커스텀 프로퍼티로 z-index 토큰 정의: <code>--z-dropdown: 100; --z-modal: 200; --z-toast: 300</code> ② React Portal을 사용하여 DOM 트리 최상위에 렌더링하면 쌓임 맥락 문제를 우회 ③ <code>isolation: isolate</code>로 의도적으로 쌓임 맥락을 생성하여 범위를 제한. 무분별한 z-index: 999999를 피하고 설계 시스템에서 단계를 정의하는 것이 핵심입니다.</p>" +
      "<br/>" +
      "<p><strong>Q3. CSS isolation 속성은 어떤 문제를 해결하나요?</strong></p>" +
      "<p><code>isolation: isolate</code>는 새로운 쌓임 맥락을 명시적으로 생성하여, 내부 요소의 z-index가 외부에 영향을 주지 않게 격리합니다. transform이나 opacity 같은 부작용 없이 순수하게 쌓임 맥락만 생성합니다. 컴포넌트 라이브러리에서 내부 z-index가 사용자의 레이아웃을 방해하지 않도록 할 때 유용합니다.</p>",
  },
  {
    question: "CSS 의사 요소(Pseudo-element)란 무엇인가요?",
    answer:
      "<p>의사 요소는 선택한 요소의 특정 부분에 스타일을 적용하거나 콘텐츠를 추가하는 가상 요소입니다. <code>::before</code>와 <code>::after</code>는 요소 앞/뒤에 가상 콘텐츠를 삽입하고, <code>::first-line</code>과 <code>::first-letter</code>는 텍스트의 특정 부분을 선택합니다. <code>::placeholder</code>, <code>::selection</code>, <code>::marker</code> 등도 있습니다. 의사 클래스(<code>:hover</code>)는 상태를, 의사 요소(<code>::before</code>)는 구조를 나타냅니다.</p>" +
      "<br/>" +
      "<p><strong>Q1. ::before/::after의 실무 활용 패턴을 설명해주세요.</strong></p>" +
      "<p>① 장식 요소: 구분선, 인용 부호, 아이콘 추가 ② 클리어픽스(clearfix): 플로트 해제 ③ 오버레이: 이미지 위 반투명 레이어 ④ 커스텀 체크박스/라디오: 네이티브 요소 숨기고 의사 요소로 재구성 ⑤ 툴팁: content에 attr()로 data 속성값 표시. <code>content</code> 속성이 필수이며, 비어있어도 <code>content: ''</code>를 선언해야 합니다.</p>" +
      "<br/>" +
      "<p><strong>Q2. 의사 요소를 JavaScript로 제어하는 방법은?</strong></p>" +
      "<p>의사 요소는 DOM 요소가 아니므로 직접 선택할 수 없습니다. 대안으로: ① CSS 커스텀 프로퍼티를 JavaScript로 변경: <code>element.style.setProperty('--content', 'new value')</code>, CSS에서 <code>content: var(--content)</code> ② 부모 요소의 클래스를 토글하여 의사 요소 스타일 변경 ③ <code>getComputedStyle(element, '::before')</code>로 계산된 스타일 읽기.</p>" +
      "<br/>" +
      "<p><strong>Q3. Tailwind CSS에서 의사 요소를 어떻게 활용하나요?</strong></p>" +
      "<p>Tailwind은 <code>before:</code>와 <code>after:</code> 수정자(modifier)를 제공합니다. <code>before:content-[''] before:absolute before:inset-0 before:bg-black/50</code>처럼 사용합니다. <code>content-['텍스트']</code>로 content를 설정하고, <code>content-[attr(data-label)]</code>로 동적 content도 가능합니다. Tailwind 3.x부터 의사 요소에 <code>content-['']</code>이 자동 추가되지 않으므로 명시해야 합니다.</p>",
  },
  {
    question: "CSS 전처리기(Preprocessor)란 무엇인가요?",
    answer:
      "<p>CSS 전처리기는 변수, 중첩, 믹스인, 함수 등 프로그래밍 기능을 제공하여 CSS를 효율적으로 작성하게 해주는 도구입니다. 대표적으로 Sass(SCSS), Less, Stylus가 있습니다. 작성된 전처리기 코드는 빌드 시 표준 CSS로 컴파일됩니다. CSS 네이티브 중첩(2023)과 커스텀 프로퍼티의 등장으로 전처리기의 필요성이 줄어들고 있지만, 믹스인과 루프 같은 고급 기능은 여전히 유용합니다.</p>" +
      "<br/>" +
      "<p><strong>Q1. CSS 네이티브 기능(Custom Properties, Nesting)이 전처리기를 완전히 대체할 수 있나요?</strong></p>" +
      "<p>CSS Custom Properties(<code>--var</code>)는 Sass 변수와 달리 런타임에 동적이어서 JavaScript로 변경 가능하고 미디어 쿼리 내에서 재정의할 수 있습니다. CSS Nesting은 Sass의 중첩을 네이티브로 지원합니다. 그러나 ① 믹스인(코드 재사용 블록) ② 루프(@for, @each) ③ 조건문(@if) ④ 수학 함수는 여전히 전처리기만 제공합니다. PostCSS는 빌드 시 CSS 변환을 플러그인으로 처리하는 다른 접근법입니다.</p>" +
      "<br/>" +
      "<p><strong>Q2. CSS-in-JS와 전처리기의 장단점을 비교해주세요.</strong></p>" +
      "<p>CSS-in-JS(styled-components, Emotion): ① 컴포넌트 스코프 자동 적용 ② JavaScript 변수 직접 사용 ③ 동적 스타일링 용이 ④ 단점: 런타임 오버헤드, 번들 크기 증가. 전처리기: ① 빌드 시 변환으로 런타임 비용 없음 ② 학습 곡선 낮음 ③ 단점: 전역 스코프 관리 필요, 동적 스타일링 제한적. 최근 Tailwind CSS가 양쪽의 대안으로 부상하고 있습니다.</p>" +
      "<br/>" +
      "<p><strong>Q3. 제로 런타임 CSS-in-JS란 무엇이며, 어떤 것들이 있나요?</strong></p>" +
      "<p>빌드 시 CSS를 추출하여 런타임 오버헤드를 제거하는 방식입니다. Vanilla Extract, Linaria, Panda CSS가 대표적입니다. JavaScript로 스타일을 작성하되, 빌드 시 정적 CSS 파일로 변환합니다. TypeScript 타입 안전성, 컴포넌트 스코프, 테마 시스템을 제공하면서 런타임 비용이 없습니다. SSR에서도 추가 설정 없이 작동하는 장점이 있습니다.</p>",
  },
  {
    question: "transform과 position을 이용한 이동의 차이점은 무엇인가요?",
    answer:
      "<p><code>position</code>(top/left)으로 이동하면 레이아웃(Reflow)이 발생하여 주변 요소에 영향을 미치고 비용이 큽니다. <code>transform: translate()</code>은 합성(Compositing) 단계에서 GPU가 처리하므로 Reflow/Repaint 없이 부드럽게 이동합니다. 애니메이션에는 항상 transform을 사용해야 60fps를 유지할 수 있습니다. transform은 문서 흐름에 영향을 주지 않아 주변 요소가 밀리지 않습니다.</p>" +
      "<br/>" +
      "<p><strong>Q1. GPU 가속이 적용되는 CSS 속성은 어떤 것들이 있나요?</strong></p>" +
      "<p>합성 레이어에서 처리되는 속성: <code>transform</code>, <code>opacity</code>, <code>filter</code>, <code>will-change</code>로 힌트된 속성. 이 속성들의 변경은 레이아웃과 페인트를 건너뛰고 합성만 수행합니다. 반면 <code>width</code>, <code>height</code>, <code>top</code>, <code>left</code>, <code>margin</code>, <code>padding</code> 변경은 Reflow를 트리거합니다. <code>color</code>, <code>background-color</code> 변경은 Repaint만 발생합니다.</p>" +
      "<br/>" +
      "<p><strong>Q2. position: fixed와 transform의 관계에서 주의할 점은?</strong></p>" +
      "<p>부모 요소에 <code>transform</code>이 적용되면, 그 내부의 <code>position: fixed</code> 요소가 뷰포트 기준이 아닌 해당 부모 기준으로 동작합니다. transform이 새로운 containing block을 생성하기 때문입니다. <code>filter</code>, <code>perspective</code>, <code>will-change: transform</code>도 동일한 문제를 일으킵니다. 모달이나 고정 헤더가 의도대로 동작하지 않는 흔한 원인입니다.</p>" +
      "<br/>" +
      "<p><strong>Q3. CSS 애니메이션 성능을 Chrome DevTools로 프로파일링하는 방법은?</strong></p>" +
      "<p>① Performance 탭에서 레코딩하여 FPS, 레이아웃/페인트/합성 소요 시간 확인 ② Rendering 탭에서 'Paint flashing'으로 리페인트 영역 시각화 ③ 'Layer borders'로 합성 레이어 확인 ④ Layers 패널에서 레이어 수와 메모리 사용량 분석. 목표는 '합성만으로 애니메이션 처리'이며, 레이아웃이나 페인트가 발생하면 해당 속성을 transform/opacity로 대체합니다.</p>",
  },
  {
    question: "브라우저의 렌더링 순서를 설명해주세요.",
    answer:
      "<p>브라우저 렌더링 파이프라인: ① <strong>파싱</strong>: HTML→DOM 트리, CSS→CSSOM 트리 ② <strong>스타일 계산</strong>: DOM + CSSOM 결합하여 각 요소의 계산된 스타일 결정 ③ <strong>레이아웃(Reflow)</strong>: 요소의 크기, 위치 계산 ④ <strong>레이어 생성</strong>: 페인트할 레이어 결정 ⑤ <strong>페인트(Repaint)</strong>: 각 레이어의 픽셀 채우기(래스터화) ⑥ <strong>합성(Compositing)</strong>: 레이어를 합쳐 최종 화면 생성. JavaScript는 이 파이프라인의 어느 단계든 다시 트리거할 수 있습니다.</p>" +
      "<br/>" +
      "<p><strong>Q1. Critical Rendering Path 최적화 전략은 무엇인가요?</strong></p>" +
      '<p>CRP(Critical Rendering Path)는 첫 화면 렌더링까지의 경로입니다. 최적화: ① CSS를 &lt;head&gt;에 배치(렌더 블로킹이지만 필수) ② JavaScript에 defer/async 적용(파서 블로킹 방지) ③ 크리티컬 CSS 인라인화: 첫 화면에 필요한 CSS만 &lt;style&gt;에 인라인 ④ 폰트에 <code>font-display: swap</code> ⑤ <code>&lt;link rel="preload"&gt;</code>로 필수 리소스 우선 로딩. TTFB → FCP → LCP 시간을 최소화하는 것이 목표입니다.</p>' +
      "<br/>" +
      "<p><strong>Q2. defer와 async 스크립트의 차이를 설명해주세요.</strong></p>" +
      '<p><code>async</code>: 스크립트를 병렬 다운로드하고, 완료 즉시 실행(파싱 중단). 실행 순서가 보장되지 않아 독립적인 스크립트(분석, 광고)에 적합합니다. <code>defer</code>: 스크립트를 병렬 다운로드하되, HTML 파싱이 완료된 후 DOMContentLoaded 이전에 순서대로 실행합니다. DOM에 의존하는 스크립트에 적합합니다. <code>type="module"</code>은 기본적으로 defer 동작을 합니다.</p>' +
      "<br/>" +
      "<p><strong>Q3. Forced Synchronous Layout(강제 동기 레이아웃)이란 무엇이며, 어떻게 방지하나요?</strong></p>" +
      "<p>DOM을 수정한 직후 레이아웃 관련 속성(<code>offsetHeight</code>, <code>getBoundingClientRect()</code>)을 읽으면, 브라우저가 중간에 강제로 레이아웃을 계산합니다. 반복문 안에서 이를 수행하면 '레이아웃 스래싱(Layout Thrashing)'이 발생합니다. 방지법: ① 읽기와 쓰기를 분리(읽기 먼저, 쓰기 나중) ② <code>requestAnimationFrame</code>으로 배치 ③ <code>fastdom</code> 라이브러리로 읽기/쓰기 스케줄링.</p>",
  },
  {
    question: "Reflow(리플로우)란 무엇이며, 성능에 미치는 영향은?",
    answer:
      "<p>Reflow(Layout)는 요소의 기하학적 속성(크기, 위치, 마진 등)이 변경될 때 브라우저가 레이아웃을 다시 계산하는 과정입니다. Reflow는 해당 요소뿐 아니라 부모, 자식, 형제 요소에 연쇄적으로 영향을 미쳐 비용이 큽니다. 요소 추가/제거, 크기 변경, 폰트 변경, 윈도우 리사이즈 등에 의해 발생합니다. 반면 Repaint는 시각적 속성(색상, 그림자)만 변경될 때 발생하여 상대적으로 가볍습니다.</p>" +
      "<br/>" +
      "<p><strong>Q1. Reflow를 트리거하는 CSS 속성과 그렇지 않은 속성의 목록은?</strong></p>" +
      "<p>Reflow 트리거: <code>width</code>, <code>height</code>, <code>margin</code>, <code>padding</code>, <code>border</code>, <code>font-size</code>, <code>position</code>, <code>display</code>, <code>top/left/right/bottom</code>. Repaint만 트리거: <code>color</code>, <code>background-color</code>, <code>box-shadow</code>, <code>outline</code>. 합성만: <code>transform</code>, <code>opacity</code>. csstriggers.com에서 각 속성의 트리거 단계를 확인할 수 있습니다.</p>" +
      "<br/>" +
      "<p><strong>Q2. contain 속성으로 Reflow 범위를 어떻게 제한하나요?</strong></p>" +
      "<p><code>contain: layout</code>은 요소의 내부 레이아웃 변경이 외부에 영향을 주지 않음을 브라우저에 알립니다. <code>contain: size</code>는 자식 크기가 요소 크기에 영향을 주지 않음을, <code>contain: paint</code>는 자식의 페인트가 요소 밖으로 나가지 않음을 선언합니다. <code>contain: strict</code>(size + layout + paint)는 가장 강력한 격리입니다. 독립적인 위젯, 카드 목록에 적용하면 Reflow 범위가 해당 요소 내로 제한됩니다.</p>" +
      "<br/>" +
      "<p><strong>Q3. content-visibility 속성은 렌더링 성능에 어떤 영향을 주나요?</strong></p>" +
      "<p><code>content-visibility: auto</code>는 뷰포트 밖의 요소에 대해 레이아웃과 페인트를 건너뛰고, 뷰포트에 들어올 때만 렌더링합니다. 긴 페이지의 초기 렌더링 시간을 크게 줄입니다. <code>contain-intrinsic-size</code>와 함께 사용하여 스크롤바 크기 예측에 필요한 예상 크기를 제공합니다. Chrome에서 대규모 리스트의 렌더링 시간이 7배 이상 개선된 사례가 보고되었습니다.</p>",
  },
  // ─────────────────────────────────────────────
  // 네트워크 / API
  // ─────────────────────────────────────────────
  {
    question: "도메인 이름을 브라우저에 입력하면 어떤 일이 일어나나요?",
    answer:
      "<p>① DNS 조회: 도메인 → IP 주소 변환(캐시 확인 → 재귀적 DNS 쿼리) ② TCP 연결: 3-way handshake(SYN → SYN-ACK → ACK) ③ TLS 핸드셰이크(HTTPS): 인증서 교환, 세션 키 생성 ④ HTTP 요청: GET / 전송 ⑤ 서버 처리 및 응답 ⑥ HTML 파싱 → DOM 생성 ⑦ CSS/JS 로드 → CSSOM 생성 ⑧ 렌더 트리 → 레이아웃 → 페인트 → 합성 → 화면 표시.</p>" +
      "<br/>" +
      "<p><strong>Q1. DNS 조회 과정을 자세히 설명해주세요.</strong></p>" +
      '<p>① 브라우저 캐시 → OS 캐시 → 라우터 캐시 순서로 확인 ② 캐시 미스 시 ISP의 재귀적 DNS 서버에 질의 ③ 재귀 서버가 루트 DNS → TLD(.com) DNS → 권한 DNS 서버 순으로 조회 ④ IP 주소를 받아 TTL 동안 캐싱. <code>dns-prefetch</code>(<code>&lt;link rel="dns-prefetch" href="//api.example.com"&gt;</code>)로 사전 DNS 조회를 수행하여 지연을 줄일 수 있습니다.</p>' +
      "<br/>" +
      "<p><strong>Q2. HTTP/2와 HTTP/3가 이 과정에서 개선하는 점은?</strong></p>" +
      "<p>HTTP/1.1은 커넥션당 하나의 요청/응답만 처리하여 HOL(Head-of-Line) 블로킹이 발생합니다. HTTP/2는 하나의 TCP 연결에서 멀티플렉싱으로 여러 요청을 병렬 처리하고, 서버 푸시와 헤더 압축(HPACK)을 지원합니다. HTTP/3는 TCP 대신 QUIC(UDP 기반)을 사용하여 연결 수립 시간을 줄이고 TCP 레벨의 HOL 블로킹도 해결합니다.</p>" +
      "<br/>" +
      "<p><strong>Q3. 프론트엔드에서 초기 로딩 속도를 최적화하는 전략은?</strong></p>" +
      "<p>① 코드 스플리팅: 라우트 기반 동적 import ② 리소스 힌트: preload, prefetch, preconnect ③ 이미지 최적화: WebP, lazy loading, 적절한 크기 ④ Critical CSS 인라인화 ⑤ 번들 최소화: Tree Shaking, 압축(gzip/brotli) ⑥ CDN 활용 ⑦ HTTP/2 멀티플렉싱 ⑧ Service Worker 캐싱. Core Web Vitals(LCP, FID, CLS) 기준으로 성능을 측정합니다.</p>",
  },
  {
    question: "DNS 조회부터 브라우저 렌더링까지의 전체 과정을 설명해주세요.",
    answer:
      "<p>전체 과정: ① <strong>DNS</strong>: 도메인→IP 변환 ② <strong>TCP</strong>: 3-way handshake ③ <strong>TLS</strong>: 암호화 연결 ④ <strong>HTTP 요청/응답</strong>: HTML 수신 ⑤ <strong>HTML 파싱</strong>: DOM 트리 구축(script 만나면 중단) ⑥ <strong>CSS 파싱</strong>: CSSOM 구축 ⑦ <strong>렌더 트리</strong>: DOM + CSSOM 결합 ⑧ <strong>레이아웃</strong>: 크기/위치 계산 ⑨ <strong>페인트</strong>: 픽셀 채우기 ⑩ <strong>합성</strong>: GPU 레이어 합성 → 화면 표시.</p>" +
      "<br/>" +
      "<p><strong>Q1. 이 과정에서 JavaScript가 렌더링을 블로킹하는 시점은?</strong></p>" +
      "<p>&lt;script&gt; 태그를 만나면 HTML 파싱이 중단되고, 스크립트 다운로드+실행이 완료될 때까지 대기합니다. 이는 JavaScript가 DOM을 수정할 수 있기 때문입니다. <code>defer</code>는 다운로드를 병렬로 하되 파싱 완료 후 실행, <code>async</code>는 병렬 다운로드 후 즉시 실행(파싱 중단). CSS도 CSSOM이 완성될 때까지 JavaScript 실행을 블로킹합니다(JS가 스타일을 읽을 수 있으므로).</p>" +
      "<br/>" +
      "<p><strong>Q2. DOMContentLoaded와 load 이벤트의 차이는?</strong></p>" +
      "<p><code>DOMContentLoaded</code>는 HTML 파싱이 완료되어 DOM 트리가 구축된 시점에 발생합니다(스타일시트, 이미지 로딩 완료를 기다리지 않음). <code>load</code>는 모든 리소스(이미지, 폰트, iframe 등)가 완전히 로딩된 시점에 발생합니다. 일반적으로 DOM 조작은 DOMContentLoaded에, 전체 리소스 의존 작업은 load에 등록합니다. React 앱에서는 이 이벤트를 직접 사용할 일이 드뭅니다.</p>" +
      "<br/>" +
      "<p><strong>Q3. 스트리밍 렌더링(Streaming Rendering)이 이 과정을 어떻게 변경하나요?</strong></p>" +
      "<p>전통적으로 서버는 완성된 HTML을 한 번에 전송하지만, 스트리밍 렌더링은 HTML을 청크(chunk) 단위로 점진적으로 전송합니다. 브라우저는 첫 청크를 받는 즉시 파싱을 시작하여 TTFB → FCP 시간이 단축됩니다. React 18의 <code>renderToPipeableStream</code>은 Suspense와 결합하여 준비된 부분부터 스트리밍합니다. HTTP/2 Server Push와 결합하면 더욱 효과적입니다.</p>",
  },
  {
    question: "CORS(Cross-Origin Resource Sharing)란 무엇인가요?",
    answer:
      "<p>CORS는 웹 브라우저의 동일 출처 정책(Same-Origin Policy)을 안전하게 완화하여, 다른 출처(도메인, 포트, 프로토콜)의 리소스에 접근할 수 있게 하는 HTTP 헤더 기반 메커니즘입니다. 서버가 <code>Access-Control-Allow-Origin</code> 헤더로 허용할 출처를 명시하면 브라우저가 응답을 허용합니다. CORS는 브라우저에서만 적용되며, 서버 간 통신에는 영향을 주지 않습니다.</p>" +
      "<br/>" +
      "<p><strong>Q1. 단순 요청(Simple Request)과 프리플라이트(Preflight) 요청의 차이는?</strong></p>" +
      "<p>단순 요청은 GET, HEAD, POST 중 하나이고, Content-Type이 text/plain, multipart/form-data, application/x-www-form-urlencoded인 경우 프리플라이트 없이 직접 전송됩니다. 그 외(PUT, DELETE, custom headers, JSON Content-Type 등)는 OPTIONS 메서드로 프리플라이트 요청을 먼저 보내 서버의 허용 여부를 확인합니다.</p>" +
      "<br/>" +
      "<p><strong>Q2. CORS 에러를 해결하는 구체적인 방법은?</strong></p>" +
      "<p>① 서버에 적절한 CORS 헤더 설정(<code>Access-Control-Allow-Origin</code>, <code>Access-Control-Allow-Methods</code>, <code>Access-Control-Allow-Headers</code>) ② 개발 환경에서 프록시 설정(Vite의 <code>server.proxy</code>) ③ 서버리스 함수로 API 프록시 ④ <code>Access-Control-Allow-Credentials: true</code>로 쿠키 전송 허용(이 경우 와일드카드 * 사용 불가). 클라이언트에서는 해결할 수 없으며 항상 서버 설정이 필요합니다.</p>" +
      "<br/>" +
      "<p><strong>Q3. 동일 출처 정책(Same-Origin Policy)이 존재하는 보안적 이유는?</strong></p>" +
      "<p>SOP가 없다면 악성 사이트가 사용자의 브라우저를 통해 다른 사이트(은행, 이메일)의 API를 호출하고 응답을 읽을 수 있습니다. 사용자가 로그인한 상태라면 쿠키가 자동 전송되어 인증된 요청이 됩니다(CSRF 공격). SOP는 스크립트가 다른 출처의 응답을 읽는 것을 차단하여 이를 방지합니다. 요청 자체는 전송될 수 있어 CSRF 토큰이 추가로 필요합니다.</p>",
  },
  {
    question: "CORS의 프리플라이트 요청은 왜 필요한가요?",
    answer:
      "<p>프리플라이트(Preflight)는 실제 요청이 서버에 영향을 미치기 전에, 해당 요청이 허용되는지 미리 확인하는 안전장치입니다. PUT, DELETE 같은 요청은 서버 데이터를 변경할 수 있으므로, OPTIONS 메서드로 먼저 허용 여부를 확인하고, 서버가 승인하면 실제 요청을 전송합니다. 이는 CORS 이전에 작성된 서버가 예기치 않은 cross-origin 요청으로부터 보호되도록 합니다.</p>" +
      "<br/>" +
      "<p><strong>Q1. 프리플라이트 응답을 캐싱하는 방법과 효과는?</strong></p>" +
      "<p><code>Access-Control-Max-Age</code> 헤더로 프리플라이트 결과를 캐싱할 수 있습니다. 예: <code>Access-Control-Max-Age: 86400</code>(24시간). 이 기간 동안 같은 요청에 대해 프리플라이트를 반복하지 않아 네트워크 왕복이 줄어듭니다. 브라우저마다 최대값이 다르며(Chrome: 7200초), 캐시는 URL, 메서드, 헤더 조합을 키로 합니다.</p>" +
      "<br/>" +
      "<p><strong>Q2. 프리플라이트를 피하기 위한 전략은?</strong></p>" +
      "<p>① 단순 요청 조건 충족: GET/POST + 허용된 Content-Type 사용 ② 커스텀 헤더 대신 표준 헤더 활용 ③ JSON 대신 FormData로 전송(단, 실용적이지 않은 경우가 많음) ④ 같은 출처로 프록시하여 CORS 자체를 회피. 실무에서는 프리플라이트를 피하기보다 Max-Age 캐싱으로 영향을 최소화하는 것이 더 현실적입니다.</p>" +
      "<br/>" +
      "<p><strong>Q3. CORS와 CSRF 보호의 관계를 설명해주세요.</strong></p>" +
      "<p>CORS는 응답 읽기를 제한하지만, 요청 전송 자체는 막지 않습니다(단순 요청의 경우). CSRF(Cross-Site Request Forgery)는 인증된 사용자의 브라우저를 이용해 의도치 않은 요청을 보내는 공격입니다. CORS만으로는 CSRF를 완전히 방지할 수 없으므로, CSRF 토큰, SameSite 쿠키, 커스텀 헤더 검증 등 추가 방어가 필요합니다.</p>",
  },
  {
    question: "REST API란 무엇인가요?",
    answer:
      "<p>REST(Representational State Transfer)는 자원(Resource)을 URI로 표현하고, HTTP 메서드(GET, POST, PUT, DELETE)로 CRUD 작업을 수행하는 아키텍처 스타일입니다. 핵심 원칙: ① 클라이언트-서버 분리 ② 무상태(Stateless) ③ 캐시 가능 ④ 계층적 시스템 ⑤ 균일한 인터페이스. RESTful API는 <code>/users/123</code>처럼 리소스 중심 URL과 HTTP 메서드의 의미를 정확히 사용합니다.</p>" +
      "<br/>" +
      "<p><strong>Q1. REST API 설계 시 URI 네이밍 규칙과 모범 사례는?</strong></p>" +
      "<p>① 복수형 명사 사용: <code>/users</code>, <code>/products</code> ② 계층 관계 표현: <code>/users/123/orders</code> ③ 동사 대신 HTTP 메서드: <code>DELETE /users/123</code>(O), <code>POST /deleteUser</code>(X) ④ 필터링은 쿼리 파라미터: <code>/products?category=electronics&sort=price</code> ⑤ kebab-case: <code>/user-profiles</code> ⑥ API 버전: <code>/api/v1/users</code>. HATEOAS(Hypermedia As The Engine Of Application State)는 응답에 관련 링크를 포함하는 성숙한 REST 수준입니다.</p>" +
      "<br/>" +
      "<p><strong>Q2. REST API의 한계와 GraphQL이 해결하는 문제는?</strong></p>" +
      "<p>REST의 한계: ① Over-fetching: 필요 이상의 데이터 반환 ② Under-fetching: 여러 엔드포인트를 호출해야 완성되는 데이터 ③ 엔드포인트 폭발: 리소스 조합마다 새 엔드포인트 필요. GraphQL은 클라이언트가 필요한 데이터를 정확히 쿼리하여 이를 해결합니다. 그러나 GraphQL은 캐싱이 복잡하고, 파일 업로드가 불편하며, 간단한 CRUD에는 과도할 수 있습니다.</p>" +
      "<br/>" +
      "<p><strong>Q3. API 에러 응답을 어떻게 설계해야 하나요?</strong></p>" +
      '<p>① 적절한 HTTP 상태 코드 사용: 400(잘못된 요청), 401(미인증), 403(권한 없음), 404(리소스 없음), 422(검증 실패), 500(서버 오류) ② 일관된 에러 응답 형식: <code>{ error: { code: "VALIDATION_ERROR", message: "이메일 형식이 올바르지 않습니다", details: [...] } }</code> ③ 민감 정보 노출 방지 ④ 요청 ID를 포함하여 디버깅 지원. RFC 7807(Problem Details)이 표준 에러 형식으로 널리 채택되고 있습니다.</p>',
  },
  {
    question: "REST API에서 멱등성(Idempotency)이란 무엇인가요?",
    answer:
      "<p>멱등성은 동일한 요청을 여러 번 보내도 결과가 같은 성질입니다. GET, PUT, DELETE는 멱등적이어야 합니다. <code>PUT /users/123 {name: 'John'}</code>을 10번 보내도 결과는 같습니다. POST는 멱등적이지 않습니다(10번 보내면 10개 생성). PATCH는 구현에 따라 다릅니다. 멱등성은 네트워크 오류로 요청이 중복 전송되었을 때 안전하게 재시도할 수 있는지를 결정합니다.</p>" +
      "<br/>" +
      "<p><strong>Q1. 멱등성을 보장하기 위한 구현 전략은?</strong></p>" +
      "<p>① Idempotency Key: 클라이언트가 고유 키를 헤더에 전송(<code>Idempotency-Key: uuid</code>), 서버가 중복 요청 감지 ② PUT의 전체 교체 의미론 유지: 부분 업데이트는 PATCH로 분리 ③ DELETE의 존재하지 않는 리소스에 대해 404가 아닌 204 반환(멱등성 유지) ④ 결제 같은 중요 연산에서 트랜잭션 ID를 사용하여 중복 처리 방지.</p>" +
      "<br/>" +
      "<p><strong>Q2. PUT과 PATCH의 차이를 정확히 설명해주세요.</strong></p>" +
      "<p>PUT은 리소스를 <strong>전체 교체</strong>합니다. 전송하지 않은 필드는 기본값이나 null로 설정됩니다. PATCH는 <strong>부분 수정</strong>으로 전송한 필드만 업데이트합니다. PUT은 멱등적이지만 PATCH는 구현에 따라 다릅니다. 실무에서는 PATCH가 더 자주 사용되며, JSON Merge Patch(<code>application/merge-patch+json</code>)나 JSON Patch(<code>application/json-patch+json</code>) 형식을 사용합니다.</p>" +
      "<br/>" +
      "<p><strong>Q3. 안전한(Safe) 메서드와 멱등적(Idempotent) 메서드의 차이는?</strong></p>" +
      "<p>안전한 메서드는 서버 상태를 변경하지 않는 메서드입니다: GET, HEAD, OPTIONS. 멱등적 메서드는 여러 번 호출해도 같은 결과인 메서드입니다: GET, PUT, DELETE, HEAD, OPTIONS. POST와 PATCH는 안전하지도 멱등적이지도 않습니다. DELETE는 멱등적이지만 안전하지 않습니다(서버 상태를 변경하므로). 이 구분은 브라우저와 프록시의 캐싱, 재시도 정책에 영향을 줍니다.</p>",
  },
  {
    question: "OPTIONS 메서드는 무엇인가요?",
    answer:
      "<p>HTTP OPTIONS 메서드는 서버가 특정 URL에 대해 허용하는 통신 옵션(메서드, 헤더 등)을 조회합니다. CORS에서 프리플라이트 요청으로 주로 사용되어, 실제 요청 전에 서버가 해당 요청을 허용하는지 확인합니다. 응답에 <code>Allow</code> 헤더(허용된 HTTP 메서드)와 CORS 관련 헤더를 포함합니다. OPTIONS는 안전하고 멱등적인 메서드입니다.</p>" +
      "<br/>" +
      "<p><strong>Q1. OPTIONS 요청이 API 성능에 미치는 영향과 최적화 방법은?</strong></p>" +
      "<p>프리플라이트는 실제 요청 전 추가 왕복이므로 지연이 발생합니다. 최적화: ① <code>Access-Control-Max-Age</code>로 프리플라이트 결과 캐싱 ② 단순 요청 조건을 충족하여 프리플라이트 회피 ③ 같은 출처 프록시로 CORS 자체를 제거 ④ API Gateway 레벨에서 OPTIONS 응답을 빠르게 처리(Lambda 호출 없이). CDN에서 OPTIONS 응답을 캐싱하는 방법도 효과적입니다.</p>" +
      "<br/>" +
      "<p><strong>Q2. 서버에서 OPTIONS 요청을 올바르게 처리하는 방법은?</strong></p>" +
      "<p>Express/NestJS에서는 <code>cors</code> 미들웨어가 자동 처리합니다. 수동 구현 시: ① OPTIONS 요청에 대해 200 OK와 함께 CORS 헤더 반환 ② <code>Access-Control-Allow-Methods</code>: 허용할 메서드 목록 ③ <code>Access-Control-Allow-Headers</code>: 허용할 커스텀 헤더 ④ <code>Access-Control-Max-Age</code>: 캐시 시간 설정 ⑤ 본문(body) 없이 빈 응답.</p>" +
      "<br/>" +
      "<p><strong>Q3. Preflight 없이 인증 정보(쿠키/토큰)를 보내려면 어떻게 해야 하나요?</strong></p>" +
      "<p>인증 정보 전송 시: ① 서버에 <code>Access-Control-Allow-Credentials: true</code> 설정 ② <code>Access-Control-Allow-Origin</code>에 와일드카드(*) 사용 불가, 정확한 출처 명시 필요 ③ 클라이언트에서 <code>fetch(url, { credentials: 'include' })</code> 또는 <code>axios.defaults.withCredentials = true</code> 설정. 이 경우 프리플라이트가 발생하며, Max-Age 캐싱으로 성능 영향을 줄입니다.</p>",
  },
  {
    question: "HTTP Header에서 Access Token을 전달하는 방법은 무엇인가요?",
    answer:
      "<p>가장 표준적인 방법은 <code>Authorization</code> 헤더에 Bearer 스킴으로 전달하는 것입니다: <code>Authorization: Bearer eyJhbGciOiJIUzI1NiI...</code>. fetch에서는 <code>headers: { 'Authorization': 'Bearer ' + token }</code>으로 설정합니다. axios에서는 인터셉터로 자동 첨부하는 패턴이 일반적입니다. 쿠키에 토큰을 저장하면 자동 전송되지만 CSRF 위험이 있습니다.</p>" +
      "<br/>" +
      "<p><strong>Q1. Bearer 토큰과 다른 인증 스킴(Basic, API Key)의 차이는?</strong></p>" +
      "<p><code>Basic</code>: Base64(username:password)로 인코딩, 보안 취약(HTTPS 필수). <code>Bearer</code>: 토큰 기반, 주로 OAuth 2.0/JWT와 사용, 가장 널리 사용. <code>API Key</code>: 커스텀 헤더(<code>X-API-Key</code>)나 쿼리 파라미터로 전달, 서버 간 통신에 주로 사용. <code>Digest</code>: 비밀번호를 해시하여 전송, Basic보다 안전하지만 복잡. Bearer가 REST API에서 사실상 표준입니다.</p>" +
      "<br/>" +
      "<p><strong>Q2. 토큰 갱신(Refresh Token) 전략은 어떻게 구현하나요?</strong></p>" +
      "<p>Access Token은 짧은 수명(15분~1시간), Refresh Token은 긴 수명(7일~30일)으로 설정합니다. Access Token 만료 시 Refresh Token으로 새 Access Token을 발급받습니다. axios 인터셉터에서 401 응답 시 자동으로 토큰 갱신을 시도하고, 성공하면 원래 요청을 재시도합니다. Refresh Token은 httpOnly 쿠키에 저장하여 XSS 공격으로부터 보호합니다.</p>" +
      "<br/>" +
      "<p><strong>Q3. 여러 탭/요청에서 동시에 토큰 갱신이 발생하는 문제는 어떻게 해결하나요?</strong></p>" +
      "<p>여러 요청이 동시에 401을 받으면 각각 토큰 갱신을 시도하여 Refresh Token이 여러 번 사용되는 문제가 발생합니다. 해결: ① 첫 갱신 요청의 Promise를 저장하고, 이후 요청은 같은 Promise를 공유 ② 큐에 대기시키고 토큰 갱신 완료 후 일괄 재시도 ③ BroadcastChannel API로 여러 탭 간 토큰 동기화. Refresh Token Rotation(사용 시마다 새 토큰 발급)으로 보안을 강화합니다.</p>",
  },
  {
    question: "GET과 POST의 차이점은 무엇인가요?",
    answer:
      "<p>GET은 리소스를 <strong>조회</strong>하는 안전하고 멱등적인 메서드입니다. 데이터를 URL 쿼리 스트링으로 전달하며, 브라우저가 캐싱합니다. POST는 리소스를 <strong>생성</strong>하는 비안전/비멱등 메서드입니다. 데이터를 요청 본문(body)에 담으며, 캐싱되지 않습니다. GET은 북마크 가능하고 브라우저 히스토리에 남지만, POST는 그렇지 않습니다. URL 길이 제한(~2048자)이 있으므로 대량 데이터는 POST를 사용합니다.</p>" +
      "<br/>" +
      "<p><strong>Q1. GET 요청에 body를 담을 수 있나요?</strong></p>" +
      "<p>HTTP 사양(RFC 7231)은 GET 요청에 body를 금지하지 않지만, 서버가 body를 무시할 수 있다고 명시합니다. 대부분의 프록시, CDN, 웹 서버가 GET body를 처리하지 않거나 제거합니다. Elasticsearch의 <code>_search</code> API가 GET + body를 사용했지만, 이는 예외적 사례이며 POST로 대체하는 것이 표준적입니다. Fetch API에서 GET + body는 TypeError를 발생시킵니다.</p>" +
      "<br/>" +
      "<p><strong>Q2. POST 요청의 Content-Type별 차이를 설명해주세요.</strong></p>" +
      "<p><code>application/json</code>: JSON 형식, REST API 표준. <code>application/x-www-form-urlencoded</code>: key=value&key2=value2 형식, HTML 폼 기본값. <code>multipart/form-data</code>: 파일 업로드용, 바이너리 데이터 전송 가능. JSON이 아닌 Content-Type은 CORS 단순 요청 조건을 충족하여 프리플라이트를 피할 수 있습니다.</p>" +
      "<br/>" +
      "<p><strong>Q3. POST 요청이 GET보다 '보안적으로 안전하다'는 것은 사실인가요?</strong></p>" +
      "<p>부분적으로만 맞습니다. GET은 URL에 데이터가 노출되어 브라우저 히스토리, 서버 로그, Referer 헤더에 기록됩니다. POST는 body에 데이터를 담아 URL에 노출되지 않지만, HTTPS 없이는 네트워크에서 평문으로 전송됩니다. 진정한 보안은 HTTPS(TLS) 암호화이며, GET/POST 구분은 전송 방식의 차이일 뿐 암호화 수준은 동일합니다. 민감 데이터는 항상 HTTPS + POST + 적절한 헤더로 전송해야 합니다.</p>",
  },
  {
    question: "HTTP Header와 Body의 역할과 차이점은 무엇인가요?",
    answer:
      "<p><strong>Header</strong>는 요청/응답의 메타데이터를 담습니다: Content-Type, Authorization, Cache-Control, Cookie 등. <strong>Body</strong>는 실제 전송할 데이터(JSON, HTML, 파일 등)를 담습니다. Header는 모든 요청에 있지만, Body는 GET/HEAD에서는 일반적으로 비어있습니다. Header의 총 크기는 서버 설정에 따라 제한되며(Apache 기본 8KB, Nginx 기본 4KB~8KB), Body는 Content-Length로 크기를 명시합니다.</p>" +
      "<br/>" +
      "<p><strong>Q1. 자주 사용되는 HTTP 요청/응답 헤더를 분류해서 설명해주세요.</strong></p>" +
      "<p>① 인증: <code>Authorization</code>, <code>WWW-Authenticate</code> ② 캐싱: <code>Cache-Control</code>, <code>ETag</code>, <code>If-None-Match</code> ③ 콘텐츠: <code>Content-Type</code>, <code>Content-Length</code>, <code>Content-Encoding</code> ④ CORS: <code>Access-Control-*</code> ⑤ 보안: <code>Strict-Transport-Security</code>, <code>Content-Security-Policy</code>, <code>X-Frame-Options</code> ⑥ 쿠키: <code>Set-Cookie</code>, <code>Cookie</code>. 커스텀 헤더는 <code>X-</code> 접두사(현재는 비권장)를 사용하거나 서비스명을 접두사로 사용합니다.</p>" +
      "<br/>" +
      "<p><strong>Q2. Content-Type 헤더가 누락되면 어떤 문제가 발생하나요?</strong></p>" +
      "<p>서버가 요청 본문을 올바르게 파싱하지 못합니다. Express에서 <code>Content-Type: application/json</code> 없이 JSON을 보내면 <code>req.body</code>가 undefined입니다. 응답에서 Content-Type이 누락되면 브라우저가 콘텐츠를 MIME 스니핑으로 추측하여 보안 취약점이 될 수 있습니다. <code>X-Content-Type-Options: nosniff</code> 헤더로 MIME 스니핑을 차단합니다.</p>" +
      "<br/>" +
      "<p><strong>Q3. HTTP/2의 헤더 압축(HPACK)은 어떻게 동작하나요?</strong></p>" +
      "<p>HTTP/1.1은 매 요청마다 헤더를 평문으로 전송하여, 쿠키 등 반복 헤더가 수 KB가 될 수 있습니다. HTTP/2의 HPACK은 ① 정적 테이블: 자주 사용되는 헤더를 인덱스로 매핑 ② 동적 테이블: 연결 중 사용된 헤더를 인덱스로 추가 ③ 허프만 인코딩: 문자열을 이진 표현으로 압축합니다. 이로 인해 헤더 크기가 85-88% 감소하며, 특히 동일 연결의 반복 요청에서 효과가 큽니다.</p>",
  },
  {
    question: "Content-Type 헤더의 역할은 무엇인가요?",
    answer:
      "<p><code>Content-Type</code>은 HTTP 메시지 본문의 미디어 타입(MIME 타입)을 지정하는 헤더입니다. 서버와 클라이언트가 데이터를 올바르게 해석하는 데 필수적입니다. 요청에서는 보내는 데이터 형식을, 응답에서는 반환하는 데이터 형식을 명시합니다. 문자 인코딩도 포함할 수 있습니다: <code>Content-Type: application/json; charset=utf-8</code>.</p>" +
      "<br/>" +
      "<p><strong>Q1. 주요 MIME 타입과 사용 상황을 정리해주세요.</strong></p>" +
      "<p>① <code>application/json</code>: REST API JSON 데이터 ② <code>text/html</code>: HTML 문서 ③ <code>text/plain</code>: 평문 텍스트 ④ <code>multipart/form-data</code>: 파일 업로드 ⑤ <code>application/x-www-form-urlencoded</code>: HTML 폼 제출 ⑥ <code>application/octet-stream</code>: 바이너리 데이터 ⑦ <code>image/webp</code>, <code>image/avif</code>: 이미지. <code>Accept</code> 헤더는 클라이언트가 원하는 응답 형식을 명시합니다.</p>" +
      "<br/>" +
      "<p><strong>Q2. multipart/form-data의 내부 구조는 어떻게 되어 있나요?</strong></p>" +
      "<p>boundary 문자열로 각 파트를 구분합니다. 각 파트는 자체 Content-Disposition과 Content-Type 헤더를 가지며, 텍스트와 바이너리 데이터를 혼합하여 전송합니다. FormData API로 쉽게 구성: <code>const fd = new FormData(); fd.append('file', blob); fd.append('name', 'photo')</code>. fetch에서 FormData를 body로 전달하면 Content-Type이 자동 설정됩니다(수동 설정 금지, boundary가 누락됨).</p>" +
      "<br/>" +
      "<p><strong>Q3. Content Negotiation(콘텐츠 협상)이란 무엇인가요?</strong></p>" +
      "<p>클라이언트와 서버가 최적의 응답 형식을 협상하는 메커니즘입니다. 클라이언트가 <code>Accept: application/json, text/html;q=0.9</code>로 선호도를 전달하면, 서버가 가장 적합한 형식으로 응답합니다. <code>Accept-Language</code>로 언어, <code>Accept-Encoding</code>으로 압축 방식도 협상합니다. API에서 <code>.json</code>, <code>.xml</code> 확장자나 쿼리 파라미터로 형식을 지정하는 것은 비표준이지만 흔한 패턴입니다.</p>",
  },
  // ─────────────────────────────────────────────
  // 보안 / 인증
  // ─────────────────────────────────────────────
  {
    question: "TLS(Transport Layer Security)란 무엇인가요?",
    answer:
      "<p>TLS는 인터넷 통신을 암호화하는 프로토콜로, HTTPS의 기반입니다. 클라이언트와 서버 간 핸드셰이크를 통해 ① 서버 인증서 검증(신원 확인) ② 대칭 키 교환(세션 키 생성) ③ 암호화된 통신 채널 수립을 수행합니다. TLS 1.3(최신)은 핸드셰이크를 1-RTT로 줄이고 불안전한 암호화 알고리즘을 제거하여 보안과 성능을 모두 개선했습니다.</p>" +
      "<br/>" +
      "<p><strong>Q1. TLS 핸드셰이크 과정을 설명해주세요.</strong></p>" +
      "<p>TLS 1.3 기준: ① Client Hello: 지원하는 암호 스위트, 키 공유 전송 ② Server Hello: 선택된 암호 스위트, 서버 인증서, 키 공유 전송 ③ 클라이언트가 인증서 검증 후 세션 키 계산 ④ 양쪽이 동일한 세션 키를 공유하여 대칭 암호화 통신 시작. TLS 1.2는 2-RTT가 필요했으나 TLS 1.3은 1-RTT, 재연결 시 0-RTT도 가능합니다.</p>" +
      "<br/>" +
      "<p><strong>Q2. HTTPS에서 인증서(Certificate)의 역할은 무엇인가요?</strong></p>" +
      "<p>인증서는 CA(Certificate Authority)가 서버의 도메인 소유권을 검증한 디지털 문서입니다. 클라이언트는 인증서의 서명을 CA의 공개키로 검증하여 서버가 진짜인지 확인합니다. Let's Encrypt가 무료 인증서를 자동 발급하여 HTTPS 보급에 기여했습니다. 인증서는 공개키를 포함하여 초기 키 교환에 사용됩니다.</p>" +
      "<br/>" +
      "<p><strong>Q3. 프론트엔드 개발에서 HTTPS와 관련된 실무 이슈는?</strong></p>" +
      "<p>① Mixed Content: HTTPS 페이지에서 HTTP 리소스 로드 차단 ② HSTS(Strict-Transport-Security): HTTP→HTTPS 자동 리다이렉트 강제 ③ 개발 환경에서 자체 서명 인증서 사용(mkcert로 로컬 HTTPS) ④ Service Worker는 HTTPS(또는 localhost)에서만 동작 ⑤ Geolocation, 카메라 등 민감한 API는 Secure Context(HTTPS) 필수.</p>",
  },
  {
    question: "User-Agent 헤더란 무엇인가요?",
    answer:
      "<p><code>User-Agent</code>는 요청을 보내는 클라이언트(브라우저, 앱)의 정보를 담은 HTTP 헤더입니다. 브라우저 이름/버전, 운영체제, 렌더링 엔진 등을 포함합니다. 서버는 이를 통해 콘텐츠를 최적화하거나 통계를 수집합니다. 그러나 역사적으로 브라우저 호환성을 위해 User-Agent 문자열이 매우 복잡해졌으며, Client Hints API가 현대적 대안으로 등장했습니다.</p>" +
      "<br/>" +
      "<p><strong>Q1. User-Agent 스니핑의 문제점과 대안은?</strong></p>" +
      "<p>User-Agent 문자열로 브라우저를 판별(스니핑)하면: ① 문자열 파싱이 복잡하고 불안정 ② 새 브라우저/버전에 대응하지 못함 ③ 사용자가 위조 가능. 대안: ① 기능 감지(Feature Detection): <code>if ('IntersectionObserver' in window)</code> ② CSS <code>@supports</code> ③ Modernizr 라이브러리 ④ Client Hints: <code>Sec-CH-UA</code> 구조화된 헤더로 정확한 정보 제공.</p>" +
      "<br/>" +
      "<p><strong>Q2. Client Hints API란 무엇인가요?</strong></p>" +
      "<p>Client Hints는 User-Agent를 대체하는 구조화된 요청 헤더 시리즈입니다. <code>Sec-CH-UA</code>(브라우저), <code>Sec-CH-UA-Mobile</code>(모바일 여부), <code>Sec-CH-UA-Platform</code>(OS) 등을 개별 헤더로 전송합니다. 서버가 <code>Accept-CH</code> 응답 헤더로 필요한 정보를 요청하면 클라이언트가 다음 요청에 포함합니다. 개인정보 보호와 정확성을 모두 개선합니다.</p>" +
      "<br/>" +
      "<p><strong>Q3. 브라우저 호환성 처리를 위한 현대적 접근법은?</strong></p>" +
      "<p>① Browserslist + Babel/PostCSS: <code>.browserslistrc</code>로 타깃 브라우저 정의, 자동 폴리필/트랜스파일 ② <code>@supports</code>로 CSS 기능 감지 ③ 핵심 기능은 점진적 향상(Progressive Enhancement)으로 기본 경험 보장 ④ caniuse.com으로 기능 지원 범위 확인 ⑤ Core-js + Vite의 modern/legacy 빌드 분리. UA 스니핑 없이 기능 기반으로 처리하는 것이 원칙입니다.</p>",
  },
  {
    question: "XSS(Cross-Site Scripting) 공격이란 무엇인가요?",
    answer:
      "<p>XSS는 공격자가 웹 페이지에 악성 스크립트를 삽입하여 다른 사용자의 브라우저에서 실행시키는 공격입니다. ① <strong>Stored XSS</strong>: 악성 스크립트가 서버 DB에 저장되어 다른 사용자에게 전달 ② <strong>Reflected XSS</strong>: URL 파라미터에 스크립트를 넣어 피해자가 클릭하도록 유도 ③ <strong>DOM-based XSS</strong>: 클라이언트 JavaScript가 안전하지 않은 방식으로 DOM을 조작할 때 발생.</p>" +
      "<br/>" +
      "<p><strong>Q1. React에서 XSS를 방지하는 내장 메커니즘은 무엇인가요?</strong></p>" +
      '<p>React는 JSX에 포함된 값을 자동으로 이스케이프(escape)합니다. <code>{userInput}</code>을 렌더링하면 HTML 태그가 문자열로 표시됩니다. 그러나 <code>dangerouslySetInnerHTML</code>은 이 보호를 우회하므로 반드시 DOMPurify로 정화해야 합니다. <code>href="javascript:..."</code> 패턴이나 이벤트 핸들러에 사용자 입력을 전달하는 것도 위험합니다.</p>' +
      "<br/>" +
      "<p><strong>Q2. CSP(Content Security Policy)로 XSS를 어떻게 방어하나요?</strong></p>" +
      "<p>CSP는 HTTP 헤더로 브라우저가 실행할 수 있는 스크립트의 출처를 제한합니다. <code>Content-Security-Policy: script-src 'self' 'nonce-abc123'</code>은 같은 출처와 특정 nonce를 가진 스크립트만 허용합니다. 인라인 스크립트를 차단하여 주입된 스크립트 실행을 방지합니다. <code>report-uri</code>로 위반 보고를 수집할 수 있습니다.</p>" +
      "<br/>" +
      "<p><strong>Q3. XSS 외에 프론트엔드에서 주의해야 할 보안 취약점은?</strong></p>" +
      "<p>① CSRF: 인증된 사용자의 의도치 않은 요청 ② Clickjacking: iframe으로 UI를 덮어씌워 클릭 유도(<code>X-Frame-Options</code>으로 방어) ③ Open Redirect: URL 파라미터를 이용한 리다이렉트 악용 ④ Prototype Pollution: 객체 프로토타입 오염 ⑤ npm 패키지 공급망 공격: 악성 의존성 주입. OWASP Top 10을 기준으로 보안 점검을 수행합니다.</p>",
  },
  {
    question: "JWT(JSON Web Token)란 무엇인가요?",
    answer:
      "<p>JWT는 JSON 형식의 클레임을 안전하게 전달하기 위한 토큰 표준(RFC 7519)입니다. 세 부분으로 구성됩니다: ① <strong>Header</strong>: 알고리즘, 토큰 타입 ② <strong>Payload</strong>: 클레임(사용자 정보, 만료 시간 등) ③ <strong>Signature</strong>: 위변조 방지 서명. Base64URL로 인코딩되어 <code>header.payload.signature</code> 형태입니다. 서버가 세션을 저장하지 않아도 되는 Stateless 인증에 사용됩니다.</p>" +
      "<br/>" +
      "<p><strong>Q1. JWT의 보안 취약점과 주의할 점은?</strong></p>" +
      "<p>① Payload는 암호화되지 않고 Base64 인코딩만 되어 누구나 디코딩 가능 → 민감 정보 저장 금지 ② alg: none 공격: 서명 검증을 우회하는 취약점 ③ 토큰 탈취 시 만료까지 무효화 불가 → 짧은 만료 시간 + Refresh Token 패턴 ④ localStorage에 저장하면 XSS에 취약 → httpOnly 쿠키 권장 ⑤ 비밀 키가 약하면 브루트포스로 서명 위조 가능 → RS256(비대칭) 사용 권장.</p>" +
      "<br/>" +
      "<p><strong>Q2. JWT를 클라이언트에 저장하는 방법별 장단점은?</strong></p>" +
      "<p>① <code>localStorage</code>: XSS에 취약하지만 CSRF에 안전, 구현 간단 ② <code>httpOnly 쿠키</code>: XSS에 안전하지만 CSRF 위험 → SameSite=Strict으로 방어 ③ <code>메모리(변수)</code>: 가장 안전하지만 새로고침 시 소실 → Refresh Token과 병행 ④ <code>sessionStorage</code>: 탭 간 공유 불가. 최적의 전략은 Access Token은 메모리/짧은 만료, Refresh Token은 httpOnly 쿠키입니다.</p>" +
      "<br/>" +
      "<p><strong>Q3. JWT와 세션 기반 인증의 차이점은?</strong></p>" +
      "<p>세션: 서버가 세션 ID를 생성하고 서버 메모리/DB에 세션 데이터 저장, 쿠키로 세션 ID 전달. 장점: 서버에서 즉시 무효화 가능, 데이터 크기 작음. 단점: 서버 상태 유지 필요, 수평 확장 시 세션 공유 필요(Redis). JWT: 토큰 자체에 정보 포함, 서버 상태 없음. 장점: 수평 확장 용이, MSA에 적합. 단점: 토큰 크기 큼, 즉시 무효화 어려움. 현대 아키텍처에서는 JWT + Redis(블랙리스트)로 양쪽 장점을 취하기도 합니다.</p>",
  },
  {
    question: "인증(Authentication)과 인가(Authorization)의 차이는 무엇인가요?",
    answer:
      "<p><strong>인증(Authentication)</strong>은 '당신이 누구인지' 확인하는 과정입니다(로그인). <strong>인가(Authorization)</strong>는 '당신이 무엇을 할 수 있는지' 권한을 확인하는 과정입니다(접근 제어). 예를 들어 호텔에서 체크인(인증)하면 방 카드를 받고, 카드로 자신의 방에만 출입(인가)할 수 있습니다. 인증은 인가보다 항상 먼저 수행됩니다.</p>" +
      "<br/>" +
      "<p><strong>Q1. OAuth 2.0에서 인증과 인가의 흐름을 설명해주세요.</strong></p>" +
      "<p>OAuth 2.0은 인가(Authorization) 프레임워크입니다. Authorization Code Flow: ① 사용자가 Google 로그인 클릭 ② Google 인증 페이지로 리다이렉트(인증) ③ 사용자가 권한 승인(인가) ④ Authorization Code를 클라이언트에 전달 ⑤ 서버가 Code를 Access Token으로 교환. OpenID Connect(OIDC)는 OAuth 위에 인증 레이어를 추가하여 ID Token을 통해 사용자 정보를 제공합니다.</p>" +
      "<br/>" +
      "<p><strong>Q2. RBAC(Role-Based Access Control)과 ABAC의 차이는?</strong></p>" +
      "<p>RBAC: 역할(admin, editor, viewer)에 따라 권한 부여. 구현이 간단하고 직관적이지만 세밀한 제어가 어려움. ABAC(Attribute-Based): 사용자 속성, 리소스 속성, 환경 조건 등 다양한 속성으로 권한 결정. '본인이 작성한 게시물만 수정 가능'같은 세밀한 규칙 표현 가능. 프론트엔드에서는 RBAC가 주로 사용되며, 라우트 가드와 컴포넌트 조건부 렌더링으로 구현합니다.</p>" +
      "<br/>" +
      "<p><strong>Q3. 프론트엔드에서 인가 처리 시 주의할 점은?</strong></p>" +
      "<p>프론트엔드의 인가는 UX 목적일 뿐, 실제 보안은 서버에서 수행해야 합니다. 클라이언트 코드는 수정 가능하므로 버튼 숨기기만으로는 접근을 차단할 수 없습니다. 항상 API 레벨에서 권한 검증이 필수입니다. 프론트엔드 인가 패턴: ① 라우트 가드로 페이지 접근 제어 ② 권한별 UI 렌더링(<code>{canEdit && &lt;EditButton /&gt;}</code>) ③ API 응답에 permissions 필드 포함.</p>",
  },
  {
    question: "BFF(Backend For Frontend) 패턴이란 무엇인가요?",
    answer:
      "<p>BFF는 각 프론트엔드(웹, 모바일, IoT) 전용 백엔드 레이어를 두는 아키텍처 패턴입니다. 프론트엔드가 필요한 형태로 데이터를 가공하고, 여러 마이크로서비스의 응답을 하나로 합쳐 전달합니다. 프론트엔드와 백엔드의 결합도를 낮추고, 각 클라이언트에 최적화된 API를 제공하며, 프론트엔드 팀이 자체적으로 API를 조정할 수 있게 합니다.</p>" +
      "<br/>" +
      "<p><strong>Q1. BFF와 API Gateway의 차이점은 무엇인가요?</strong></p>" +
      "<p>API Gateway는 모든 클라이언트를 위한 단일 진입점으로 인증, 라우팅, 속도 제한 등 범용 기능을 제공합니다. BFF는 특정 프론트엔드를 위한 전용 레이어로, 데이터 가공/병합 등 클라이언트 맞춤 로직을 포함합니다. 일반적으로 API Gateway 뒤에 BFF를 두어, Gateway가 공통 관심사를, BFF가 클라이언트 특화 로직을 담당합니다.</p>" +
      "<br/>" +
      "<p><strong>Q2. Next.js/Remix의 서버 함수가 BFF 역할을 하는 방식은?</strong></p>" +
      "<p>Next.js의 Route Handlers(<code>app/api/...</code>)나 Server Actions, Remix의 loader/action은 서버에서 실행되어 마이크로서비스 호출 → 데이터 가공 → 프론트엔드 전달을 수행합니다. 별도 BFF 서버를 구축하지 않고도 같은 코드베이스에서 BFF 패턴을 구현할 수 있습니다. tRPC는 타입 안전한 BFF 통신을 가능하게 합니다.</p>" +
      "<br/>" +
      "<p><strong>Q3. BFF 패턴의 단점과 언제 도입해야 하는지?</strong></p>" +
      "<p>단점: ① 서비스 수 증가로 운영 복잡도 증가 ② 코드 중복(여러 BFF 간 유사 로직) ③ 추가 네트워크 홉으로 지연 증가 가능. 도입 기준: ① 다양한 클라이언트(웹, 앱)에 다른 API 필요 시 ② 마이크로서비스에서 여러 서비스를 조합해야 할 때 ③ 프론트엔드 팀이 API 스키마 제어권을 원할 때. 단일 클라이언트에 간단한 API라면 과도합니다.</p>",
  },
  {
    question: "쿠키(Cookie)와 세션(Session)의 차이점은 무엇인가요?",
    answer:
      "<p><strong>쿠키</strong>는 클라이언트(브라우저)에 저장되는 작은 데이터(최대 4KB)로, 서버가 <code>Set-Cookie</code> 헤더로 전달하면 이후 요청에 자동으로 포함됩니다. <strong>세션</strong>은 서버에 저장되는 사용자별 데이터로, 세션 ID만 쿠키에 저장하여 서버가 해당 세션을 식별합니다. 쿠키는 클라이언트, 세션은 서버에 데이터가 있다는 것이 핵심 차이입니다.</p>" +
      "<br/>" +
      "<p><strong>Q1. 쿠키의 보안 관련 속성(HttpOnly, Secure, SameSite)을 설명해주세요.</strong></p>" +
      "<p><code>HttpOnly</code>: JavaScript에서 접근 불가(XSS 방어). <code>Secure</code>: HTTPS에서만 전송. <code>SameSite</code>: Strict(같은 사이트만), Lax(안전한 메서드의 cross-site 허용, 기본값), None(모두 허용, Secure 필수). <code>Domain</code>과 <code>Path</code>로 쿠키 적용 범위를 제한합니다. <code>Max-Age</code>/<code>Expires</code>로 만료 시간을 설정하며, 없으면 세션 쿠키(브라우저 종료 시 삭제)가 됩니다.</p>" +
      "<br/>" +
      "<p><strong>Q2. 서드파티 쿠키 차단이 프론트엔드에 미치는 영향은?</strong></p>" +
      "<p>Chrome의 서드파티 쿠키 차단(Privacy Sandbox)으로: ① 크로스 도메인 추적/광고 타겟팅 불가 ② 소셜 로그인 위젯의 쿠키 동작 변경 ③ 임베디드 콘텐츠(iframe)의 인증 문제 ④ 분석 도구의 크로스 사이트 추적 제한. 대안으로 Topics API, Attribution Reporting API, CHIPS(Cookies Having Independent Partitioned State) 등이 제안되었습니다.</p>" +
      "<br/>" +
      "<p><strong>Q3. 세션 저장소로 Redis를 사용하는 이유는?</strong></p>" +
      "<p>서버 메모리에 세션을 저장하면 ① 서버 재시작 시 세션 소실 ② 여러 서버(수평 확장) 간 세션 공유 불가. Redis는 인메모리 DB로 읽기/쓰기가 매우 빠르고, TTL(자동 만료)을 지원하여 세션 관리에 최적화되어 있습니다. Redis Cluster로 고가용성도 확보 가능합니다. 또는 JWT를 사용하여 서버를 완전히 Stateless로 만드는 방법도 있습니다.</p>",
  },
  {
    question:
      "로컬 스토리지(localStorage)와 세션 스토리지(sessionStorage)의 차이는?",
    answer:
      "<p>둘 다 Web Storage API로 키-값 쌍을 저장하며 쿠키(4KB)보다 용량이 큽니다(5~10MB). <code>localStorage</code>는 브라우저를 닫아도 영구 저장되고 같은 출처의 모든 탭에서 공유됩니다. <code>sessionStorage</code>는 탭/윈도우 종료 시 삭제되며 탭 간 공유되지 않습니다. 문자열만 저장 가능하므로 객체는 <code>JSON.stringify/parse</code>로 변환합니다.</p>" +
      "<br/>" +
      "<p><strong>Q1. Web Storage에 민감한 데이터를 저장하면 안 되는 이유는?</strong></p>" +
      "<p>localStorage/sessionStorage는 JavaScript로 자유롭게 접근 가능하므로 XSS 공격에 취약합니다. 인증 토큰, 개인정보, 결제 정보 등을 저장하면 악성 스크립트가 탈취할 수 있습니다. httpOnly 쿠키는 JavaScript에서 접근 불가하여 더 안전합니다. 로컬 스토리지에는 사용자 선호 설정, 테마, 캐시된 비민감 데이터만 저장해야 합니다.</p>" +
      "<br/>" +
      "<p><strong>Q2. IndexedDB와 Web Storage의 차이점은?</strong></p>" +
      "<p>IndexedDB는 ① 용량이 훨씬 큼(수백MB~GB) ② 구조화된 데이터(객체, 배열, Blob) 직접 저장 ③ 인덱스와 쿼리 지원 ④ 비동기 API ⑤ 트랜잭션 기반. Web Storage는 간단한 키-값 문자열 저장에 적합하고, IndexedDB는 오프라인 앱, 대용량 캐시, 복잡한 데이터 구조에 적합합니다. Dexie.js 같은 래퍼 라이브러리가 IndexedDB를 더 쉽게 사용하게 합니다.</p>" +
      "<br/>" +
      "<p><strong>Q3. storage 이벤트를 활용한 탭 간 통신은 어떻게 구현하나요?</strong></p>" +
      "<p><code>window.addEventListener('storage', e => {...})</code>는 다른 탭에서 localStorage가 변경될 때 발생합니다(같은 탭에서는 발생하지 않음). 로그아웃 동기화에 유용합니다: 한 탭에서 로그아웃하면 다른 탭들도 감지하여 자동 로그아웃. BroadcastChannel API가 더 범용적인 탭 간 통신 수단이며, SharedWorker도 탭 간 상태 공유에 사용됩니다.</p>",
  },
  {
    question: "멀티프로세스와 멀티스레드의 차이점은 무엇인가요?",
    answer:
      "<p><strong>멀티프로세스</strong>는 독립된 메모리 공간을 가진 여러 프로세스가 병렬 실행되는 것입니다. 프로세스 간 통신(IPC)이 필요하지만 격리성이 높습니다. <strong>멀티스레드</strong>는 같은 프로세스 내에서 메모리를 공유하는 여러 스레드가 실행되는 것입니다. 통신이 빠르지만 동기화(race condition) 문제가 발생합니다. Chrome은 멀티프로세스 아키텍처를 사용하여 탭 간 격리를 보장합니다.</p>" +
      "<br/>" +
      "<p><strong>Q1. Chrome의 멀티프로세스 아키텍처를 설명해주세요.</strong></p>" +
      "<p>Chrome은 ① Browser Process: UI, 네트워크, 디스크 접근 ② Renderer Process: 웹 페이지 렌더링(탭별 또는 사이트별 분리) ③ GPU Process: 그래픽 처리 ④ Plugin Process: 플러그인 실행 ⑤ Utility Process: 부가 작업으로 분리합니다. 한 탭이 크래시되어도 다른 탭에 영향 없는 격리가 핵심 이점이며, Site Isolation은 cross-origin iframe도 별도 프로세스로 실행합니다.</p>" +
      "<br/>" +
      "<p><strong>Q2. Web Worker와 프로세스/스레드의 관계는?</strong></p>" +
      "<p>Web Worker는 브라우저가 제공하는 별도 스레드에서 JavaScript를 실행합니다. 메인 스레드와 메모리를 공유하지 않고 <code>postMessage()</code>로 데이터를 복사하여 통신합니다(구조화된 복제 알고리즘). <code>SharedArrayBuffer</code>를 사용하면 메모리를 공유할 수 있지만, <code>Atomics</code>로 동기화해야 합니다. Service Worker는 네트워크 프록시 역할의 특수한 Worker입니다.</p>" +
      "<br/>" +
      "<p><strong>Q3. SharedArrayBuffer와 Atomics는 어떤 문제를 해결하나요?</strong></p>" +
      "<p>Worker 간 <code>postMessage</code>는 데이터를 복사하므로 대용량 데이터 전송 시 오버헤드가 큽니다. <code>SharedArrayBuffer</code>는 여러 Worker가 같은 메모리를 직접 접근하여 복사 없이 데이터를 공유합니다. 그러나 공유 메모리는 race condition을 일으킬 수 있어, <code>Atomics.wait()</code>와 <code>Atomics.notify()</code>로 동기화합니다. Spectre 공격 이후 SharedArrayBuffer는 cross-origin isolation이 필요합니다.</p>",
  },
  {
    question: "웹 접근성(Web Accessibility)이란 무엇인가요?",
    answer:
      "<p>웹 접근성은 장애인, 고령자 등 모든 사용자가 웹 콘텐츠를 인식, 이해, 조작할 수 있도록 보장하는 것입니다. WCAG(Web Content Accessibility Guidelines)이 국제 표준이며, 4가지 원칙을 기반으로 합니다: ① 인식 가능(Perceivable) ② 조작 가능(Operable) ③ 이해 가능(Understandable) ④ 견고(Robust). 법적 요구사항이기도 하며, SEO에도 긍정적 영향을 줍니다.</p>" +
      "<br/>" +
      "<p><strong>Q1. 프론트엔드에서 구현해야 할 핵심 접근성 요구사항은?</strong></p>" +
      "<p>① 키보드 탐색: 모든 인터랙티브 요소가 Tab으로 접근 가능, 포커스 표시 유지 ② 시맨틱 HTML: 적절한 heading 계층, landmark 요소 ③ ARIA: 커스텀 위젯에 role, aria-label, aria-expanded 등 ④ 색상 대비: WCAG AA 기준 4.5:1(텍스트), 3:1(큰 텍스트) ⑤ 이미지 대체 텍스트 ⑥ 폼 레이블 연결 ⑦ 동적 콘텐츠에 aria-live로 스크린 리더 알림.</p>" +
      "<br/>" +
      "<p><strong>Q2. ARIA(Accessible Rich Internet Applications)를 사용할 때의 원칙은?</strong></p>" +
      "<p>'첫 번째 ARIA 규칙: ARIA를 사용하지 마라.' 네이티브 HTML 요소가 의미를 이미 가지고 있다면(<code>&lt;button&gt;</code>, <code>&lt;nav&gt;</code>) ARIA를 추가하지 않습니다. ARIA가 필요한 경우: ① 커스텀 위젯(드롭다운, 탭, 아코디언) ② 동적 상태 표현(aria-expanded, aria-selected) ③ 라이브 영역(aria-live). 잘못된 ARIA는 ARIA가 없는 것보다 나쁩니다.</p>" +
      "<br/>" +
      "<p><strong>Q3. 접근성 테스트를 자동화하는 방법은?</strong></p>" +
      "<p>① CI에 axe-core 통합: <code>jest-axe</code>로 컴포넌트 테스트 ② Storybook의 a11y 애드온으로 개발 중 실시간 감사 ③ Lighthouse CI로 자동 접근성 점수 검사 ④ eslint-plugin-jsx-a11y로 정적 분석 ⑤ Playwright/Cypress에서 axe-core 실행. 자동 도구는 전체 문제의 30-50%만 감지하므로, 키보드 테스트와 스크린 리더 수동 테스트를 병행해야 합니다.</p>",
  },
  {
    question: "HTTP 버전별 차이(HTTP/1.1, HTTP/2, HTTP/3)를 설명해주세요.",
    answer:
      "<p><strong>HTTP/1.1</strong>: 텍스트 프로토콜, 커넥션당 하나의 요청, 파이프라이닝(비실용적), HOL 블로킹. <strong>HTTP/2</strong>: 바이너리 프로토콜, 하나의 TCP에서 멀티플렉싱, 헤더 압축(HPACK), 서버 푸시, 스트림 우선순위. <strong>HTTP/3</strong>: TCP 대신 QUIC(UDP 기반), 연결 수립 0-RTT 가능, TCP HOL 블로킹 해결, 네트워크 전환 시 연결 유지.</p>" +
      "<br/>" +
      "<p><strong>Q1. HTTP/2에서 도메인 샤딩이 더 이상 필요 없는 이유는?</strong></p>" +
      "<p>HTTP/1.1에서 브라우저는 도메인당 동시 연결 수를 6개로 제한하므로, 리소스를 여러 도메인으로 분산(도메인 샤딩)하여 병렬 다운로드를 최대화했습니다. HTTP/2는 하나의 연결에서 수백 개의 요청을 멀티플렉싱하므로 샤딩이 불필요하며, 오히려 여러 연결을 만들어 자원을 낭비하게 됩니다. 스프라이트, 인라이닝, 번들링 같은 HTTP/1.1 최적화도 HTTP/2에서는 재검토가 필요합니다.</p>" +
      "<br/>" +
      "<p><strong>Q2. HTTP/3의 QUIC 프로토콜이 해결하는 문제는?</strong></p>" +
      "<p>TCP의 HOL 블로킹: HTTP/2에서 하나의 패킷이 손실되면 같은 TCP 연결의 모든 스트림이 차단됩니다. QUIC는 UDP 위에 구현하여 각 스트림이 독립적으로 동작합니다. 또한 TLS 1.3을 내장하여 연결 수립을 1-RTT(첫 연결)~0-RTT(재연결)로 단축합니다. 모바일 환경에서 Wi-Fi↔셀룰러 전환 시 Connection ID를 유지하여 끊김 없는 통신을 지원합니다.</p>" +
      "<br/>" +
      "<p><strong>Q3. 프론트엔드 개발자가 HTTP 버전별로 최적화 전략을 어떻게 조정해야 하나요?</strong></p>" +
      "<p>HTTP/1.1: 요청 수 최소화(번들링, 스프라이트, 인라이닝), 도메인 샤딩. HTTP/2: 작은 모듈 단위 로딩이 유리(코드 스플리팅), 캐시 무효화 세분화, 서버 푸시 활용. HTTP/3: 연결 수립 비용이 낮아 prefetch/preconnect가 더 효과적. 실무에서는 CDN(Cloudflare, AWS CloudFront)이 자동으로 HTTP/2~3을 지원하므로, 프론트엔드는 번들 전략에 집중합니다.</p>",
  },
  {
    question: "Core Web Vitals란 무엇인가요?",
    answer:
      "<p>Core Web Vitals는 Google이 정의한 웹 사용자 경험의 핵심 지표입니다. ① <strong>LCP(Largest Contentful Paint)</strong>: 가장 큰 콘텐츠 요소가 표시되는 시간(2.5초 이내 Good) ② <strong>INP(Interaction to Next Paint)</strong>: 사용자 인터랙션 후 다음 페인트까지의 지연(200ms 이내 Good) ③ <strong>CLS(Cumulative Layout Shift)</strong>: 예기치 않은 레이아웃 이동 누적값(0.1 이내 Good). Google 검색 순위에 반영됩니다.</p>" +
      "<br/>" +
      "<p><strong>Q1. LCP를 개선하는 구체적인 방법은?</strong></p>" +
      '<p>LCP 대상은 주로 히어로 이미지, 큰 텍스트 블록, 비디오입니다. 개선: ① <code>fetchpriority="high"</code>로 이미지 우선 로딩 ② <code>&lt;link rel="preload"&gt;</code>로 리소스 프리로드 ③ 이미지 최적화(WebP, 적절한 크기) ④ 서버 응답 시간(TTFB) 단축 ⑤ 렌더 블로킹 리소스 제거 ⑥ CDN 활용 ⑦ Critical CSS 인라인. Lazy loading은 above-the-fold 이미지에 적용하면 안 됩니다.</p>' +
      "<br/>" +
      "<p><strong>Q2. INP(Interaction to Next Paint)는 FID와 어떻게 다른가요?</strong></p>" +
      "<p>FID(First Input Delay)는 첫 번째 인터랙션의 입력 지연만 측정했습니다. INP는 페이지 전체 수명 동안의 모든 인터랙션 중 가장 느린 것(98번째 백분위수)을 측정합니다. 이는 더 정확한 반응성 지표입니다. 개선: ① 무거운 JavaScript 분할 ② <code>startTransition</code>으로 비긴급 업데이트 지연 ③ 긴 태스크를 <code>scheduler.yield()</code>로 분할 ④ Web Worker로 연산 오프로드.</p>" +
      "<br/>" +
      "<p><strong>Q3. CLS를 측정하고 디버깅하는 방법은?</strong></p>" +
      "<p>Chrome DevTools → Performance → Layout Shifts 영역에서 시각적으로 확인합니다. <code>web-vitals</code> 라이브러리로 실제 사용자 데이터(RUM)를 수집합니다. 흔한 CLS 원인: ① 크기 미지정 이미지/광고 ② 동적 콘텐츠 삽입 ③ FOUT/FOIT(폰트 로딩) ④ 비동기 로딩 컴포넌트. 해결: width/height 명시, aspect-ratio, font-display: optional, 스켈레톤 UI.</p>",
  },
  // ─────────────────────────────────────────────
  // 빌드 도구 / SSR
  // ─────────────────────────────────────────────
  {
    question: "npm과 pnpm의 차이점은 무엇인가요?",
    answer:
      "<p><code>npm</code>은 Node.js 기본 패키지 매니저로, node_modules에 중복 패키지를 설치합니다(hoisting으로 일부 완화). <code>pnpm</code>은 하드 링크와 심볼릭 링크를 사용하여 글로벌 저장소에 패키지를 한 번만 저장하고 프로젝트에서 참조합니다. 디스크 공간 절약(최대 50%), 빠른 설치 속도, 유령 의존성(phantom dependency) 방지가 pnpm의 핵심 장점입니다.</p>" +
      "<br/>" +
      "<p><strong>Q1. 유령 의존성(Phantom Dependency) 문제란 무엇인가요?</strong></p>" +
      "<p>npm의 호이스팅(hoisting)은 중복 패키지를 줄이기 위해 깊은 node_modules의 패키지를 최상위로 끌어올립니다. 이로 인해 package.json에 명시하지 않은 패키지를 우연히 import할 수 있습니다. 의존성이 업데이트되어 호이스팅이 바뀌면 갑자기 import가 실패합니다. pnpm은 엄격한 node_modules 구조로 직접 의존성만 접근 가능하게 하여 이 문제를 방지합니다.</p>" +
      "<br/>" +
      "<p><strong>Q2. pnpm의 Content-addressable Store는 어떻게 동작하나요?</strong></p>" +
      "<p>pnpm은 모든 패키지 파일을 해시 기반으로 글로벌 저장소(<code>~/.pnpm-store</code>)에 저장합니다. 프로젝트의 node_modules는 이 저장소의 파일을 하드 링크로 참조합니다. 같은 패키지 버전은 디스크에 단 한 번만 존재하여 10개 프로젝트가 같은 패키지를 사용해도 1배의 디스크만 차지합니다.</p>" +
      "<br/>" +
      "<p><strong>Q3. 모노레포 환경에서 pnpm workspace의 장점은?</strong></p>" +
      "<p>pnpm workspace는 <code>pnpm-workspace.yaml</code>로 모노레포를 지원합니다. 패키지 간 의존성을 <code>workspace:*</code> 프로토콜로 연결하고, 심볼릭 링크로 즉시 반영합니다. npm workspace보다 빠르고, Yarn Berry PnP보다 호환성이 좋습니다. <code>--filter</code> 옵션으로 특정 패키지만 빌드/테스트 가능하며, Turborepo/Nx와 결합하여 캐싱된 빌드 파이프라인을 구성합니다.</p>",
  },
  {
    question: "Yarn Berry(v2+)의 PnP(Plug'n'Play)란 무엇인가요?",
    answer:
      "<p>PnP는 node_modules 디렉토리를 완전히 제거하는 혁신적인 의존성 관리 방식입니다. <code>.pnp.cjs</code> 파일이 패키지 위치를 매핑하고, 패키지를 zip 파일로 <code>.yarn/cache</code>에 저장합니다. 이로써 ① 수만 개의 파일/폴더 대신 수백 개의 zip ② 의존성 설치 시간 대폭 단축(이미 캐시되어 있으므로) ③ 유령 의존성 완전 차단 ④ Git에 의존성을 커밋 가능(Zero-install)합니다.</p>" +
      "<br/>" +
      "<p><strong>Q1. PnP의 Zero-install이 가능한 원리와 장점은?</strong></p>" +
      "<p><code>.yarn/cache</code>와 <code>.pnp.cjs</code>를 Git에 커밋하면, <code>yarn install</code> 없이 clone 직후 바로 실행 가능합니다. node_modules는 수만 파일이라 Git에 부적합하지만, PnP의 zip 캐시는 수백 파일로 관리 가능합니다. CI에서 install 단계를 건너뛰어 빌드 시간이 크게 단축됩니다. 단점으로 저장소 크기가 증가합니다.</p>" +
      "<br/>" +
      "<p><strong>Q2. PnP 모드에서 호환성 문제가 발생하는 경우와 해결 방법은?</strong></p>" +
      "<p>node_modules의 파일 구조에 직접 의존하는 도구(Electron, React Native, 일부 IDE)에서 문제가 발생합니다. 해결: ① <code>packageExtensions</code>로 누락된 peer dependency 선언 ② <code>.yarnrc.yml</code>의 <code>nodeLinker: node-modules</code>로 전통적 방식 사용(PnP 장점 포기) ③ <code>pnpMode: loose</code>로 유령 의존성 경고만 표시. 점차 생태계 호환성이 개선되고 있습니다.</p>" +
      "<br/>" +
      "<p><strong>Q3. npm, pnpm, Yarn Berry를 비교하여 프로젝트별 적합한 선택 기준은?</strong></p>" +
      "<p><code>npm</code>: 가장 넓은 호환성, 초기 설정 불필요, 생태계 기본값. <code>pnpm</code>: 디스크 효율, 빠른 설치, 엄격한 의존성 관리, 모노레포에 적합. <code>Yarn Berry</code>: Zero-install, PnP의 혁신적 접근, 성숙한 모노레포 지원. 실무에서는 pnpm이 성능과 호환성의 균형이 가장 좋아 빠르게 채택이 늘고 있으며, 새 프로젝트에 권장됩니다.</p>",
  },
  {
    question: "CDN(Content Delivery Network)이란 무엇인가요?",
    answer:
      "<p>CDN은 전 세계에 분산된 서버 네트워크로, 사용자와 지리적으로 가까운 엣지 서버에서 콘텐츠를 제공하여 지연 시간을 줄입니다. 정적 자산(JS, CSS, 이미지, 폰트)을 캐싱하고, 오리진 서버의 트래픽 부하를 분산합니다. Cloudflare, AWS CloudFront, Vercel Edge Network 등이 대표적이며, 현대 웹 배포의 필수 인프라입니다.</p>" +
      "<br/>" +
      "<p><strong>Q1. CDN의 캐시 무효화(Cache Invalidation) 전략은?</strong></p>" +
      "<p>① 파일명 해싱: <code>app.a1b2c3.js</code>처럼 콘텐츠 해시를 파일명에 포함하여, 변경 시 새 URL → 자동 캐시 미스 ② Cache-Control 헤더: <code>max-age=31536000, immutable</code>(해시된 파일), <code>no-cache</code>(index.html) ③ CDN API로 수동 퍼지(purge) ④ Stale-while-revalidate: 캐시된 응답을 먼저 전달하고 백그라운드에서 갱신. Vite/Webpack이 빌드 시 자동으로 해시를 추가합니다.</p>" +
      "<br/>" +
      "<p><strong>Q2. Edge Computing과 CDN의 관계는?</strong></p>" +
      "<p>전통 CDN은 정적 파일 캐싱에 집중하지만, Edge Computing은 엣지 서버에서 코드를 실행합니다. Cloudflare Workers, Vercel Edge Functions, Deno Deploy가 대표적입니다. SSR을 엣지에서 수행하면 오리진 서버 왕복 없이 동적 콘텐츠를 빠르게 생성합니다. Next.js의 Edge Runtime, Remix의 Edge 배포가 이를 활용합니다.</p>" +
      "<br/>" +
      "<p><strong>Q3. CDN 사용 시 CORS와 캐싱 관련 주의점은?</strong></p>" +
      "<p>CDN은 첫 요청의 응답을 캐싱하는데, CORS 헤더가 없는 응답이 캐싱되면 이후 cross-origin 요청이 실패합니다. <code>Vary: Origin</code> 헤더를 포함하여 출처별로 별도 캐싱해야 합니다. 폰트 파일은 특히 CORS 설정이 필요합니다. 또한 <code>Set-Cookie</code> 헤더가 있는 응답은 캐싱하면 안 됩니다(다른 사용자에게 전달될 수 있음).</p>",
  },
  {
    question: "npm install과 npm ci의 차이점은 무엇인가요?",
    answer:
      "<p><code>npm install</code>은 package.json을 기반으로 의존성을 설치하며, 범위 내에서 최신 버전을 선택하고 lock 파일을 업데이트합니다. <code>npm ci</code>(Clean Install)는 package-lock.json을 정확히 따라 설치하며, lock 파일과 package.json이 불일치하면 에러를 발생시킵니다. CI/CD 환경에서는 재현 가능한 빌드를 위해 항상 <code>npm ci</code>를 사용해야 합니다.</p>" +
      "<br/>" +
      "<p><strong>Q1. lock 파일(package-lock.json, pnpm-lock.yaml)의 역할은?</strong></p>" +
      "<p>lock 파일은 설치된 패키지의 정확한 버전, 의존성 트리, 무결성 해시를 기록합니다. 모든 개발자와 CI 환경에서 동일한 의존성을 보장합니다. lock 파일이 없으면 <code>^1.2.3</code> 범위 내에서 개발자마다 다른 버전이 설치될 수 있습니다. lock 파일은 반드시 Git에 커밋해야 하며, 수동으로 수정해서는 안 됩니다.</p>" +
      "<br/>" +
      "<p><strong>Q2. dependencies, devDependencies, peerDependencies의 차이는?</strong></p>" +
      "<p><code>dependencies</code>: 프로덕션에 필요한 패키지(React, lodash). <code>devDependencies</code>: 개발/빌드에만 필요(TypeScript, ESLint, Vite). 빌드 후 번들에 포함되지 않음. <code>peerDependencies</code>: 호스트 프로젝트가 직접 설치해야 하는 의존성. 라이브러리가 호스트의 React를 사용할 때 선언합니다. npm 7+는 peerDependencies를 자동 설치합니다.</p>" +
      "<br/>" +
      "<p><strong>Q3. 보안 취약점이 있는 의존성을 관리하는 방법은?</strong></p>" +
      "<p>① <code>npm audit</code> / <code>pnpm audit</code>로 알려진 취약점 스캔 ② <code>npm audit fix</code>로 자동 업데이트(호환 범위 내) ③ Dependabot이나 Renovate Bot으로 자동 PR 생성 ④ <code>overrides</code>(npm) / <code>resolutions</code>(Yarn)으로 중첩 의존성 버전 강제 ⑤ Socket.dev로 공급망 공격 감지. lock 파일 리뷰도 중요합니다(악성 패키지 주입 방지).</p>",
  },
  {
    question: "SSR, CSR, SSG, ISR의 차이를 설명해주세요.",
    answer:
      "<p><strong>CSR</strong>(Client-Side Rendering): 빈 HTML + JavaScript 번들 전송, 브라우저에서 렌더링. 초기 로딩 느리지만 이후 빠른 인터랙션. <strong>SSR</strong>(Server-Side Rendering): 요청마다 서버에서 HTML 생성. 빠른 FCP, SEO 유리. <strong>SSG</strong>(Static Site Generation): 빌드 시 HTML 생성. 가장 빠른 응답, CDN 캐싱 용이. <strong>ISR</strong>(Incremental Static Regeneration): SSG + 백그라운드 재생성. 정적 속도 + 동적 데이터.</p>" +
      "<br/>" +
      "<p><strong>Q1. 각 렌더링 방식의 적합한 사용 케이스는?</strong></p>" +
      "<p>CSR: 대시보드, 내부 관리 도구(SEO 불필요, 인터랙션 중심). SSR: 소셜 미디어, 이커머스 상품 페이지(SEO 필수, 동적 콘텐츠). SSG: 블로그, 문서 사이트, 마케팅 페이지(정적, 변경 빈도 낮음). ISR: 뉴스 사이트, 이커머스 카탈로그(많은 페이지, 주기적 업데이트). 하이브리드 접근(같은 앱에서 페이지별 다른 전략)이 현대적 방식입니다.</p>" +
      "<br/>" +
      "<p><strong>Q2. Streaming SSR이 기존 SSR을 어떻게 개선하나요?</strong></p>" +
      "<p>기존 SSR은 전체 HTML이 완성될 때까지 응답을 보내지 않아 TTFB가 길어집니다. Streaming SSR은 HTML을 청크 단위로 점진 전송하여 ① 빠른 TTFB: 첫 부분이 즉시 전달 ② Suspense와 결합: 데이터가 준비된 컴포넌트부터 스트리밍 ③ 느린 데이터 소스가 전체를 블로킹하지 않음. React 18의 <code>renderToPipeableStream</code>이 이를 구현합니다.</p>" +
      "<br/>" +
      "<p><strong>Q3. React Server Components(RSC)는 SSR과 어떻게 다른가요?</strong></p>" +
      "<p>SSR은 서버에서 HTML을 생성하지만, 클라이언트에서 hydration으로 동일한 컴포넌트 코드를 다시 실행합니다. RSC는 서버에서만 실행되고 클라이언트 번들에 포함되지 않습니다. RSC의 결과는 React 직렬화 형식으로 전달되어 클라이언트 컴포넌트와 결합됩니다. RSC는 번들 크기를 줄이고 서버 리소스(DB, 파일)에 직접 접근할 수 있습니다.</p>",
  },
  {
    question: "Server Action이란 무엇인가요?",
    answer:
      "<p>Server Action은 React 19/Next.js의 기능으로, 서버에서 실행되는 비동기 함수를 클라이언트 컴포넌트에서 직접 호출할 수 있게 합니다. <code>'use server'</code> 지시어를 사용하며, 폼 제출, 데이터 변경(mutation) 등에 활용됩니다. 별도 API 엔드포인트를 만들지 않고도 서버 로직을 실행할 수 있어 풀스택 개발이 간소화됩니다.</p>" +
      "<br/>" +
      "<p><strong>Q1. Server Action의 동작 원리를 설명해주세요.</strong></p>" +
      "<p>빌드 시 <code>'use server'</code> 함수는 고유 ID가 할당되고, 클라이언트에서는 해당 ID로 서버에 HTTP POST 요청을 보냅니다. 서버가 함수를 실행하고 결과를 반환합니다. 폼의 <code>action</code> prop에 Server Action을 전달하면 JavaScript 없이도(Progressive Enhancement) 동작합니다. <code>useFormStatus</code>, <code>useOptimistic</code> 훅으로 로딩/낙관적 업데이트를 처리합니다.</p>" +
      "<br/>" +
      "<p><strong>Q2. Server Action에서 유효성 검증과 에러 처리는 어떻게 하나요?</strong></p>" +
      "<p>Server Action 내에서 Zod 같은 스키마 검증 라이브러리로 입력을 검증하고, 에러 시 에러 객체를 반환합니다. <code>useActionState</code> 훅으로 이전 상태와 에러 메시지를 관리합니다. 서버 검증은 필수이며(클라이언트 검증만으로는 불충분), <code>redirect()</code>나 <code>revalidatePath()</code>로 성공 후 처리를 수행합니다.</p>" +
      "<br/>" +
      "<p><strong>Q3. Server Action과 tRPC/REST API의 차이와 선택 기준은?</strong></p>" +
      "<p>Server Action: Next.js/React 생태계 한정, 폼 제출에 최적화, Progressive Enhancement, 별도 라우터 불필요. tRPC: TypeScript 타입 안전 RPC, 프레임워크 독립적, 양방향 타입 추론. REST API: 가장 범용적, 클라이언트 비의존적, 도구 지원 풍부. 단순 CRUD는 Server Action, 복잡한 클라이언트-서버 통신은 tRPC, 외부 공개 API는 REST가 적합합니다.</p>",
  },
  {
    question: "번들러(Bundler)란 무엇이며, 왜 필요한가요?",
    answer:
      "<p>번들러는 여러 모듈(JS, CSS, 이미지 등)을 하나 또는 최적화된 소수의 파일로 합치는 도구입니다. 필요한 이유: ① HTTP 요청 수 감소(HTTP/1.1에서 중요) ② 모듈 시스템 변환(ESM → 브라우저 호환) ③ 트랜스파일(TypeScript, JSX → JS) ④ 최소화(minification) ⑤ Tree Shaking(미사용 코드 제거) ⑥ 코드 스플리팅(지연 로딩). Webpack, Vite, Rollup, esbuild, Turbopack이 대표적입니다.</p>" +
      "<br/>" +
      "<p><strong>Q1. Vite가 Webpack보다 빠른 이유는 무엇인가요?</strong></p>" +
      "<p>① 개발 서버: Vite는 네이티브 ESM을 활용하여 번들링 없이 모듈을 직접 제공합니다. 변경된 파일만 HMR로 교체하여 대규모 앱에서도 즉시 반영됩니다. Webpack은 전체 의존성 그래프를 번들링합니다 ② 빌드: Vite는 esbuild(Go)로 의존성을 사전 번들링하고, Rollup으로 프로덕션 빌드합니다 ③ Cold Start: 모듈을 요청 시 변환하여 서버 시작이 빠릅니다.</p>" +
      "<br/>" +
      "<p><strong>Q2. Tree Shaking은 어떻게 동작하나요?</strong></p>" +
      "<p>Tree Shaking은 ESM의 정적 <code>import/export</code> 분석을 통해 사용되지 않는 export를 제거합니다. CommonJS의 <code>require()</code>는 동적이라 분석이 불가합니다. 효과적인 Tree Shaking을 위해: ① ESM 형식의 라이브러리 사용 ② package.json에 <code>\"sideEffects\": false</code> 선언 ③ 배럴 파일(index.ts)의 re-export 최적화 ④ <code>import { specific } from 'lib'</code> 방식으로 named import 사용.</p>" +
      "<br/>" +
      "<p><strong>Q3. 코드 스플리팅 전략과 최적화 방법은?</strong></p>" +
      "<p>① 라우트 기반: <code>React.lazy(() => import('./Page'))</code>로 페이지별 분할 ② 컴포넌트 기반: 모달, 차트 등 초기에 불필요한 컴포넌트 지연 로딩 ③ 벤더 스플리팅: node_modules를 별도 청크로 분리(캐싱 이점) ④ <code>import(/* webpackPrefetch: true */ './HeavyComponent')</code>로 유휴 시간에 프리페칭. Bundle Analyzer로 청크 크기와 중복을 시각적으로 분석합니다.</p>",
  },
  {
    question: "Service Worker와 PWA(Progressive Web App)란 무엇인가요?",
    answer:
      "<p>Service Worker는 브라우저 백그라운드에서 실행되는 스크립트로, 네트워크 요청을 가로채고, 캐싱하며, 오프라인 기능을 제공합니다. PWA는 Service Worker, Web App Manifest, HTTPS를 기반으로 네이티브 앱과 유사한 경험(오프라인, 설치, 푸시 알림)을 웹에서 제공하는 기술 집합입니다. HTTPS(또는 localhost)에서만 동작합니다.</p>" +
      "<br/>" +
      "<p><strong>Q1. Service Worker의 생명주기를 설명해주세요.</strong></p>" +
      "<p>① Install: <code>self.addEventListener('install', e => {...})</code> - 정적 자산 캐싱 ② Activate: 이전 캐시 정리, 새 버전 활성화 ③ Fetch: 네트워크 요청 가로채기 및 캐시 전략 적용 ④ Update: 바이트 단위 비교로 변경 감지, 대기 → 활성화. <code>skipWaiting()</code>과 <code>clients.claim()</code>으로 즉시 활성화할 수 있지만, 기존 탭과의 불일치 위험이 있습니다.</p>" +
      "<br/>" +
      "<p><strong>Q2. 캐싱 전략(Cache Strategy)에는 어떤 것들이 있나요?</strong></p>" +
      "<p>① Cache First: 캐시 우선, 없으면 네트워크(정적 자산) ② Network First: 네트워크 우선, 실패 시 캐시(API 응답) ③ Stale-While-Revalidate: 캐시 즉시 반환 + 백그라운드 갱신(자주 변하는 콘텐츠) ④ Network Only: 항상 네트워크(실시간 데이터) ⑤ Cache Only: 항상 캐시(오프라인 전용). Workbox 라이브러리가 이 전략들을 선언적으로 구현합니다.</p>" +
      "<br/>" +
      "<p><strong>Q3. PWA의 현재 한계와 네이티브 앱 대비 부족한 점은?</strong></p>" +
      "<p>① iOS의 제한적 지원: 백그라운드 동기화, 푸시 알림(iOS 16.4+부터 지원) 제한 ② 하드웨어 접근: Bluetooth, NFC, 카메라 고급 기능 제한적 ③ 앱 스토어 노출 어려움(PWABuilder로 일부 해결) ④ 저장 공간 제한(브라우저 정책에 따라 다름) ⑤ iOS에서 standalone 모드의 웹뷰 제약. 그러나 Project Fugu API로 점차 네이티브 기능 접근이 확대되고 있습니다.</p>",
  },
  {
    question: "마이크로 프론트엔드(Micro Frontend)란 무엇인가요?",
    answer:
      "<p>마이크로 프론트엔드는 마이크로서비스 개념을 프론트엔드에 적용한 아키텍처입니다. 대규모 웹 앱을 독립적으로 개발, 배포, 운영 가능한 작은 앱으로 분할합니다. 각 팀이 독립적인 기술 스택과 배포 주기를 가질 수 있습니다. Module Federation(Webpack 5), Single-SPA, iframe, Web Components 등으로 통합합니다.</p>" +
      "<br/>" +
      "<p><strong>Q1. Module Federation은 어떻게 동작하나요?</strong></p>" +
      "<p>Webpack 5의 Module Federation은 런타임에 여러 독립 빌드의 모듈을 동적으로 로드합니다. 각 앱은 자신의 모듈을 '노출(expose)'하고, 다른 앱의 모듈을 '소비(consume)'합니다. 공유 의존성(React 등)은 한 번만 로드됩니다. Vite에서는 @originjs/vite-plugin-federation으로 사용합니다. 빌드 타임이 아닌 런타임 통합이 핵심입니다.</p>" +
      "<br/>" +
      "<p><strong>Q2. 마이크로 프론트엔드의 단점과 복잡성은?</strong></p>" +
      "<p>① 운영 복잡도: 여러 앱의 빌드, 배포, 모니터링 ② 공유 상태 관리: 앱 간 데이터 동기화 어려움 ③ 스타일 충돌: CSS 격리 필요(Shadow DOM, CSS Modules) ④ 번들 크기 증가: 공유 의존성 관리 실패 시 중복 ⑤ 일관된 UX 유지 어려움. 소규모 팀이나 단일 앱에는 과도한 복잡성이며, 조직 규모와 팀 독립성 요구에 따라 도입을 결정해야 합니다.</p>" +
      "<br/>" +
      "<p><strong>Q3. 마이크로 프론트엔드 대안으로 모노레포 + 코드 스플리팅이 충분한 경우는?</strong></p>" +
      "<p>동일 기술 스택, 같은 배포 주기, 소수 팀이라면 모노레포(Turborepo/Nx) + 라우트 기반 코드 스플리팅이 더 간단합니다. 마이크로 프론트엔드는 ① 팀이 5개 이상으로 독립 배포가 필요 ② 기술 스택 다양성 허용 ③ 레거시와 신규 앱 점진적 마이그레이션 시 가치가 있습니다. '조직 확장' 문제를 해결하는 아키텍처임을 기억해야 합니다.</p>",
  },
  // ─────────────────────────────────────────────
  // TypeScript
  // ─────────────────────────────────────────────
  {
    question: "타입 단언(Type Assertion)이란 무엇인가요?",
    answer:
      "<p>타입 단언은 개발자가 TypeScript 컴파일러에게 '이 값의 타입을 내가 더 잘 안다'고 알려주는 것입니다. <code>value as Type</code> 또는 <code>&lt;Type&gt;value</code>(JSX와 충돌하여 비권장) 문법을 사용합니다. 타입 단언은 런타임에 아무런 영향을 미치지 않으며, 컴파일 타임에만 타입 검사를 변경합니다. 실제 타입 변환(casting)이 아니므로 잘못 사용하면 런타임 에러를 유발합니다.</p>" +
      "<br/>" +
      "<p><strong>Q1. 타입 단언이 위험한 이유와 안전한 대안은 무엇인가요?</strong></p>" +
      "<p>타입 단언은 컴파일러의 타입 체크를 우회하므로 런타임 에러를 숨깁니다. <code>const user = {} as User</code>하면 user.name 접근 시 런타임 에러 가능. 안전한 대안: ① 타입 가드(Type Guard): <code>if ('name' in obj)</code> ② <code>unknown</code>과 타입 검증: <code>const data: unknown = await fetch(...)</code> → 검증 후 사용 ③ Zod 같은 런타임 스키마 검증 라이브러리. 외부 데이터(API 응답)에서는 특히 타입 단언 대신 검증이 필수입니다.</p>" +
      "<br/>" +
      "<p><strong>Q2. const assertion(as const)은 어떻게 다른가요?</strong></p>" +
      "<p><code>as const</code>는 일반 타입 단언과 달리 값의 타입을 가장 좁은 리터럴 타입으로 추론합니다. <code>const colors = ['red', 'blue'] as const</code>는 <code>readonly ['red', 'blue']</code> 타입이 됩니다. 객체에 적용하면 모든 프로퍼티가 readonly가 되고 리터럴 타입으로 좁혀집니다. 상수 정의, 유니온 타입 생성, 라우트 정의 등에서 유용합니다.</p>" +
      "<br/>" +
      "<p><strong>Q3. Non-null assertion(!)과 optional chaining(?.)의 차이는?</strong></p>" +
      "<p><code>!</code>(non-null assertion)은 컴파일러에게 '이 값은 null/undefined가 아니다'라고 단언합니다. 런타임 검사가 없어 잘못되면 에러가 발생합니다. <code>?.</code>(optional chaining)은 런타임에 null/undefined를 안전하게 처리하여 undefined를 반환합니다. <code>user!.name</code>은 위험하고, <code>user?.name</code>은 안전합니다. 가능하면 optional chaining을 사용하고, !는 테스트 코드나 확실한 경우에만 사용합니다.</p>",
  },
  {
    question: "as const는 어떤 상황에서 사용하나요?",
    answer:
      "<p><code>as const</code>는 값을 가장 구체적인 리터럴 타입으로 고정합니다. 주요 사용 사례: ① 상수 배열에서 유니온 타입 추출: <code>const STATUSES = ['active', 'inactive'] as const; type Status = typeof STATUSES[number]</code> ② 객체를 읽기 전용 상수로: <code>const CONFIG = { api: '/api', timeout: 5000 } as const</code> ③ 함수 반환값의 타입을 좁힐 때: 튜플 반환 ④ enum 대안으로 사용.</p>" +
      "<br/>" +
      "<p><strong>Q1. as const와 enum의 차이, 그리고 어떤 것을 선호해야 하나요?</strong></p>" +
      "<p>enum은 런타임 객체를 생성하여 번들 크기를 증가시키고 Tree Shaking이 어렵습니다. <code>as const</code>는 컴파일 타임에만 존재하여 번들에 영향 없습니다. <code>const enum</code>은 인라인되지만 --isolatedModules과 호환 문제가 있습니다. 현재 TypeScript 커뮤니티에서는 <code>as const</code> 객체 + <code>typeof</code>를 enum 대안으로 권장합니다.</p>" +
      "<br/>" +
      "<p><strong>Q2. as const를 함수 인자와 함께 사용하는 패턴은?</strong></p>" +
      "<p><code>function createRoute&lt;const T extends string&gt;(path: T)</code>처럼 제네릭에 <code>const</code> 수정자를 사용하면 인자가 자동으로 리터럴 타입으로 추론됩니다(TS 5.0+). 이전에는 호출 시 <code>createRoute('/users' as const)</code>가 필요했지만, 이제 <code>createRoute('/users')</code>만으로 <code>'/users'</code> 리터럴 타입이 추론됩니다.</p>" +
      "<br/>" +
      "<p><strong>Q3. satisfies 연산자와 as const의 조합은 어떻게 사용하나요?</strong></p>" +
      "<p><code>satisfies</code>는 타입 호환성을 검증하면서도 추론된 타입을 유지합니다. <code>const palette = { red: [255,0,0], green: '#00ff00' } as const satisfies Record&lt;string, readonly number[] | string&gt;</code>에서 satisfies가 구조를 검증하고, as const가 리터럴 타입을 유지합니다. 타입 안전성과 좁은 타입 추론을 동시에 달성합니다.</p>",
  },
  {
    question: "TypeScript의 유틸리티 타입(Utility Types)에 대해 설명해주세요.",
    answer:
      "<p>유틸리티 타입은 기존 타입을 변환하여 새 타입을 생성하는 내장 제네릭 타입입니다. 주요 타입: <code>Partial&lt;T&gt;</code>(모든 프로퍼티 optional), <code>Required&lt;T&gt;</code>(모든 프로퍼티 필수), <code>Readonly&lt;T&gt;</code>(읽기 전용), <code>Pick&lt;T, K&gt;</code>(특정 프로퍼티만 선택), <code>Omit&lt;T, K&gt;</code>(특정 프로퍼티 제외), <code>Record&lt;K, V&gt;</code>(키-값 매핑).</p>" +
      "<br/>" +
      "<p><strong>Q1. Partial과 Required는 내부적으로 어떻게 구현되어 있나요?</strong></p>" +
      "<p><code>Partial</code>은 Mapped Type으로 구현됩니다: <code>type Partial&lt;T&gt; = { [P in keyof T]?: T[P] }</code>. <code>Required</code>는 <code>-?</code>로 optional을 제거합니다: <code>type Required&lt;T&gt; = { [P in keyof T]-?: T[P] }</code>. 이 패턴을 이해하면 커스텀 유틸리티 타입을 만들 수 있습니다. 예: <code>type Mutable&lt;T&gt; = { -readonly [P in keyof T]: T[P] }</code>.</p>" +
      "<br/>" +
      "<p><strong>Q2. 조건부 타입(Conditional Types)과 infer의 활용법은?</strong></p>" +
      "<p><code>T extends U ? X : Y</code> 형태의 조건부 타입으로 타입 레벨 로직을 구현합니다. <code>infer</code>는 패턴 매칭으로 타입을 추출합니다. <code>ReturnType&lt;T&gt;</code>의 구현: <code>type ReturnType&lt;T&gt; = T extends (...args: any[]) => infer R ? R : any</code>. Promise의 내부 타입 추출: <code>type Awaited&lt;T&gt; = T extends Promise&lt;infer R&gt; ? Awaited&lt;R&gt; : T</code>.</p>" +
      "<br/>" +
      "<p><strong>Q3. Template Literal Types는 어떻게 활용하나요?</strong></p>" +
      "<p>문자열 리터럴 타입을 조합하여 새 타입을 생성합니다. <code>type EventName = `on&#36;{Capitalize&lt;'click' | 'focus'&gt;}`</code>는 <code>'onClick' | 'onFocus'</code>가 됩니다. API 라우트 타입: <code>type Route = `/api/&#36;{string}`</code>. CSS 단위: <code>type CSSLength = `&#36;{number}&#36;{'px' | 'rem' | 'em'}`</code>. Intrinsic String Manipulation Types(<code>Uppercase</code>, <code>Lowercase</code>, <code>Capitalize</code>)와 결합하여 강력한 타입 안전성을 제공합니다.</p>",
  },
  {
    question: "satisfies 연산자는 무엇이며, 언제 사용하나요?",
    answer:
      "<p><code>satisfies</code>(TS 4.9+)는 값이 특정 타입을 만족하는지 검증하면서도, TypeScript가 추론한 더 구체적인 타입을 유지합니다. <code>const config = { port: 3000 } satisfies Config</code>에서 config.port는 number가 아닌 3000 리터럴 타입을 유지합니다. 타입 주석(<code>: Config</code>)은 타입을 넓히고, <code>as const</code>는 읽기 전용까지 강제하는 반면, satisfies는 검증만 수행합니다.</p>" +
      "<br/>" +
      "<p><strong>Q1. satisfies vs 타입 주석(:)의 구체적인 차이를 예시로 보여주세요.</strong></p>" +
      "<p><code>type Routes = Record&lt;string, { path: string }&gt;</code>일 때: ① <code>const routes: Routes = { home: { path: '/' } }</code> → <code>routes.home</code>은 <code>{ path: string }</code>으로 추론, 키 자동완성 없음. ② <code>const routes = { home: { path: '/' } } satisfies Routes</code> → <code>routes.home</code>이 존재함을 알고 자동완성 가능, 잘못된 구조 시 에러. satisfies는 '검증 + 좁은 타입 유지'를 동시에 달성합니다.</p>" +
      "<br/>" +
      "<p><strong>Q2. satisfies를 as const와 함께 사용하면 어떤 이점이 있나요?</strong></p>" +
      "<p><code>as const</code>만 사용하면 구조 검증이 없어 오타나 누락을 감지하지 못합니다. <code>satisfies</code>만 사용하면 리터럴 타입이 넓혀질 수 있습니다. 조합하면: <code>const COLORS = { primary: '#ff0000', secondary: '#00ff00' } as const satisfies Record&lt;string, `#&#36;{string}`&gt;</code> → 모든 값이 hex 색상인지 검증하면서 리터럴 타입도 유지합니다.</p>" +
      "<br/>" +
      "<p><strong>Q3. satisfies의 실무 활용 패턴을 더 알려주세요.</strong></p>" +
      "<p>① 라우트 설정: 모든 라우트가 필수 필드를 가지는지 검증 ② 테마 토큰: 디자인 시스템의 색상/크기 토큰이 스키마를 만족하는지 확인 ③ i18n 키: 번역 객체가 모든 필수 키를 포함하는지 검증 ④ 환경 변수: <code>process.env</code> 검증. 공통점은 '구조를 보장하면서 구체적인 값 타입을 유지'해야 하는 상황입니다.</p>",
  },
  {
    question: "TypeScript를 사용하는 이유는 무엇인가요?",
    answer:
      "<p>TypeScript는 JavaScript에 정적 타입 시스템을 추가하여: ① 컴파일 타임에 타입 에러를 감지하여 런타임 버그 예방 ② IDE의 자동 완성, 리팩토링, 네비게이션 지원으로 개발 생산성 향상 ③ 코드 자체가 문서 역할(타입 = 명세) ④ 대규모 코드베이스에서 안전한 리팩토링 ⑤ 팀 협업 시 인터페이스 계약으로 소통 비용 감소. 런타임 오버헤드 없이 컴파일 후 순수 JavaScript가 됩니다.</p>" +
      "<br/>" +
      "<p><strong>Q1. TypeScript의 구조적 타이핑(Structural Typing)은 무엇인가요?</strong></p>" +
      "<p>TypeScript는 타입 이름이 아닌 구조(shape)로 호환성을 판단합니다. <code>interface Cat { name: string }</code>과 <code>interface Dog { name: string }</code>은 구조가 같으므로 서로 호환됩니다. Java의 명목적 타이핑(Nominal Typing)에서는 이름이 달라 호환되지 않습니다. 이 특성이 JavaScript의 덕 타이핑과 자연스럽게 맞지만, 의도치 않은 호환으로 버그가 될 수 있어 Branded Types 패턴으로 방지하기도 합니다.</p>" +
      "<br/>" +
      "<p><strong>Q2. TypeScript의 strict 모드가 포함하는 옵션들은?</strong></p>" +
      "<p><code>strict: true</code>는 여러 엄격한 옵션을 한 번에 활성화합니다: ① <code>strictNullChecks</code>: null/undefined를 별도 타입으로 취급 ② <code>noImplicitAny</code>: 암시적 any 금지 ③ <code>strictFunctionTypes</code>: 함수 타입 공변/반공변 검사 ④ <code>strictPropertyInitialization</code>: 클래스 프로퍼티 초기화 강제 ⑤ <code>strictBindCallApply</code>: bind/call/apply 타입 검사. 새 프로젝트에서는 항상 strict: true로 시작하는 것이 권장됩니다.</p>" +
      "<br/>" +
      "<p><strong>Q3. TypeScript가 JavaScript 성능에 영향을 미치나요?</strong></p>" +
      "<p>TypeScript는 컴파일 후 모든 타입 정보가 제거되어 런타임 성능에 전혀 영향을 미치지 않습니다. 그러나 빌드 타임은 증가합니다. 빌드 속도 최적화: ① <code>tsc --noEmit</code>으로 타입 체크만 수행, esbuild/SWC로 트랜스파일 분리 ② 프로젝트 레퍼런스(Project References)로 증분 빌드 ③ <code>skipLibCheck: true</code>로 node_modules 타입 검사 건너뛰기 ④ Vite의 esbuild 트랜스파일이 tsc보다 20~30배 빠릅니다.</p>",
  },
  // ─────────────────────────────────────────────
  // 테스팅
  // ─────────────────────────────────────────────
  {
    question: "TDD(Test-Driven Development)란 무엇인가요?",
    answer:
      "<p>TDD는 테스트를 먼저 작성하고, 테스트를 통과하는 최소한의 코드를 구현한 뒤, 리팩토링하는 개발 방법론입니다. Red(실패하는 테스트 작성) → Green(테스트 통과하는 코드 작성) → Refactor(코드 개선) 사이클을 반복합니다. 요구사항을 테스트로 명확히 정의하고, 과잉 구현을 방지하며, 리팩토링에 대한 자신감을 제공합니다.</p>" +
      "<br/>" +
      "<p><strong>Q1. 프론트엔드에서 TDD를 적용하기 어려운 이유와 해결 방법은?</strong></p>" +
      "<p>어려운 이유: ① UI는 시각적이라 테스트로 표현하기 어려움 ② 빈번한 디자인 변경으로 테스트 유지보수 비용 ③ 브라우저 환경 의존성. 해결: ① 구현 세부사항이 아닌 사용자 행동 기반 테스트(Testing Library 철학) ② 비즈니스 로직(커스텀 훅, 유틸)에 TDD 집중 ③ UI 컴포넌트는 Storybook + 시각적 회귀 테스트 ④ integration 테스트 위주로 커버리지 확보.</p>" +
      "<br/>" +
      "<p><strong>Q2. 테스트 피라미드(Test Pyramid)와 테스트 트로피(Testing Trophy)의 차이는?</strong></p>" +
      "<p>테스트 피라미드(Martin Fowler): Unit(많음) → Integration(중간) → E2E(적음). 테스트 트로피(Kent C. Dodds): Static(타입/린트) → Unit(적음) → Integration(많음) → E2E(적음). 트로피는 프론트엔드에서 integration 테스트가 가장 높은 ROI를 제공한다고 봅니다. 사용자와 유사한 방식으로 컴포넌트를 렌더링하고 상호작용하는 테스트가 가장 효과적입니다.</p>" +
      "<br/>" +
      "<p><strong>Q3. 테스트 커버리지 100%를 목표로 해야 하나요?</strong></p>" +
      "<p>100% 커버리지는 비현실적이며, 의미 없는 테스트를 양산할 수 있습니다. 커버리지는 '어디를 테스트하지 않았는가'의 지표일 뿐, '테스트가 충분한가'의 지표가 아닙니다. 핵심 비즈니스 로직, 에러 처리, 엣지 케이스에 집중하는 것이 중요합니다. 실무에서는 70-80% 커버리지를 목표로 하되, 중요한 경로의 integration 테스트를 우선합니다.</p>",
  },
  {
    question: "E2E(End-to-End) 테스트란 무엇인가요?",
    answer:
      "<p>E2E 테스트는 사용자 관점에서 전체 애플리케이션 흐름을 실제 브라우저에서 테스트합니다. 회원가입 → 로그인 → 상품 구매 같은 전체 시나리오를 검증합니다. Playwright, Cypress가 대표적 도구입니다. 단위/통합 테스트로 잡지 못하는 브라우저 호환성, 네트워크 요청, 전체 흐름의 무결성을 확인하지만, 실행 속도가 느리고 불안정(flaky)할 수 있습니다.</p>" +
      "<br/>" +
      "<p><strong>Q1. Playwright와 Cypress의 차이점은 무엇인가요?</strong></p>" +
      "<p>Playwright: ① 멀티 브라우저(Chromium, Firefox, WebKit) ② 다중 탭/도메인 지원 ③ 자동 대기(auto-waiting) ④ 병렬 실행 내장 ⑤ API 테스트도 가능. Cypress: ① 브라우저 내에서 실행(같은 이벤트 루프) ② 실시간 리로드/디버깅 UI ③ 타임 트래블 디버깅 ④ 커뮤니티 플러그인 풍부. 현재는 Playwright가 기능성과 성능 면에서 더 선호되는 추세입니다.</p>" +
      "<br/>" +
      "<p><strong>Q2. E2E 테스트의 Flaky Test 문제를 어떻게 해결하나요?</strong></p>" +
      "<p>Flaky test는 동일 조건에서 때로 성공, 때로 실패하는 테스트입니다. 원인과 해결: ① 타이밍 이슈: <code>waitFor</code>, <code>toBeVisible()</code> 같은 명시적 대기 사용 ② 테스트 격리: 각 테스트가 독립적 상태로 시작(seed data 사용) ③ 네트워크 의존: 외부 API를 모킹(mock)하여 안정성 확보 ④ 선택자 안정성: data-testid 사용 ⑤ 재시도 설정: 실패 시 자동 재시도(최후의 수단).</p>" +
      "<br/>" +
      "<p><strong>Q3. E2E 테스트를 CI/CD에 통합하는 전략은?</strong></p>" +
      "<p>① PR마다 실행: 주요 사용자 경로만 포함한 스모크 테스트 ② 머지 후: 전체 E2E 스위트 실행 ③ 스케줄: 야간에 전체 크로스 브라우저 테스트 ④ Docker로 브라우저 환경 표준화 ⑤ 병렬 실행으로 시간 단축 ⑥ 실패 시 스크린샷/비디오 자동 저장. Playwright의 <code>--shard</code> 옵션으로 여러 CI 러너에 분산 실행하여 시간을 줄입니다.</p>",
  },
  {
    question: "단위 테스트(Unit Test)의 원칙과 모범 사례는 무엇인가요?",
    answer:
      "<p>단위 테스트는 개별 함수, 컴포넌트, 모듈을 격리하여 테스트합니다. FIRST 원칙: Fast(빠름), Isolated(격리됨), Repeatable(반복 가능), Self-validating(자가 검증), Timely(적시). AAA 패턴: Arrange(준비) → Act(실행) → Assert(검증). 외부 의존성은 모킹하여 격리하고, 하나의 테스트는 하나의 행동만 검증합니다.</p>" +
      "<br/>" +
      "<p><strong>Q1. React 컴포넌트를 테스트할 때 Testing Library의 철학은?</strong></p>" +
      "<p>'사용자가 사용하는 방식으로 테스트하라.' 구현 세부사항(state, props, 내부 메서드)이 아닌 사용자가 보고 상호작용하는 것을 테스트합니다. <code>getByRole</code>, <code>getByText</code>, <code>getByLabelText</code>로 접근성 트리 기반 쿼리를 사용합니다. <code>getByTestId</code>는 마지막 수단입니다. 이 접근법은 리팩토링에 강건한 테스트를 만들고, 동시에 접근성도 개선합니다.</p>" +
      "<br/>" +
      "<p><strong>Q2. 모킹(Mocking)을 언제, 어떻게 사용해야 하나요?</strong></p>" +
      "<p>모킹 대상: ① 외부 API 호출(네트워크) ② 타이머(setTimeout, Date) ③ 브라우저 API(localStorage, geolocation) ④ 무거운 의존성. 과도한 모킹은 '테스트가 모킹만 테스트'하는 문제를 일으킵니다. MSW(Mock Service Worker)는 네트워크 레벨에서 API를 모킹하여 구현 세부사항과 분리된 테스트를 가능하게 합니다.</p>" +
      "<br/>" +
      "<p><strong>Q3. Vitest와 Jest의 차이, 그리고 Vitest를 선택하는 이유는?</strong></p>" +
      "<p>Vitest: ① Vite의 설정/플러그인을 공유하여 별도 설정 불필요 ② ESM 네이티브 지원 ③ HMR 기반의 빠른 watch 모드 ④ Jest 호환 API ⑤ 병렬 실행과 스레드 지원. Jest: ① 성숙한 생태계 ② CRA, Next.js 기본 지원 ③ 풍부한 커뮤니티 리소스. Vite 프로젝트에서는 Vitest가 설정/성능 면에서 압도적으로 유리합니다.</p>",
  },
  {
    question: "Storybook이란 무엇이며, 왜 사용하나요?",
    answer:
      "<p>Storybook은 UI 컴포넌트를 앱과 독립적으로 개발, 테스트, 문서화하는 도구입니다. 각 컴포넌트의 다양한 상태(props 조합)를 'Story'로 정의하여 시각적으로 확인합니다. 디자이너와 협업, 컴포넌트 카탈로그 구축, 시각적 회귀 테스트(Chromatic), 접근성 검사(a11y addon)에 활용됩니다. CDD(Component-Driven Development)의 핵심 도구입니다.</p>" +
      "<br/>" +
      "<p><strong>Q1. Storybook의 CSF(Component Story Format) 3.0은 어떻게 사용하나요?</strong></p>" +
      "<p>CSF 3.0은 각 스토리를 객체로 정의합니다. <code>export default { component: Button, title: 'UI/Button' }</code>으로 메타를 선언하고, <code>export const Primary = { args: { variant: 'primary', label: 'Click' } }</code>으로 스토리를 작성합니다. <code>play</code> 함수로 인터랙션 테스트도 가능: <code>play: async ({ canvasElement }) => { const canvas = within(canvasElement); await userEvent.click(canvas.getByRole('button')); }</code></p>" +
      "<br/>" +
      "<p><strong>Q2. Storybook을 디자인 시스템과 통합하는 방법은?</strong></p>" +
      "<p>① Storybook을 컴포넌트 라이브러리의 문서 사이트로 배포(Chromatic 또는 정적 빌드) ② 디자인 토큰을 Storybook 테마에 적용 ③ Figma 연동 플러그인으로 디자인-코드 동기화 ④ Controls addon으로 props를 인터랙티브하게 조정 ⑤ MDX로 가이드라인 문서와 컴포넌트 데모를 통합. 디자이너가 직접 Storybook에서 컴포넌트를 확인하며 피드백합니다.</p>" +
      "<br/>" +
      "<p><strong>Q3. 시각적 회귀 테스트(Visual Regression Testing)란 무엇인가요?</strong></p>" +
      "<p>컴포넌트의 스크린샷을 기준(baseline)과 비교하여 의도하지 않은 시각적 변경을 감지합니다. Chromatic(Storybook 공식), Percy, Playwright의 <code>toHaveScreenshot()</code>이 대표적입니다. CSS 변경, 폰트 로딩, 반응형 레이아웃의 미묘한 변화를 자동으로 감지합니다. 픽셀 단위 비교로 사람 눈으로 놓칠 수 있는 변화를 잡아냅니다.</p>",
  },
  // ─────────────────────────────────────────────
  // 소프트 스킬 / 기타
  // ─────────────────────────────────────────────
  {
    question: "CI/CD란 무엇이며, 프론트엔드에서 어떻게 적용하나요?",
    answer:
      "<p><strong>CI(Continuous Integration)</strong>는 코드 변경을 자주 통합하고 자동 빌드/테스트하는 관행입니다. <strong>CD(Continuous Delivery/Deployment)</strong>는 테스트를 통과한 코드를 자동으로 스테이징/프로덕션에 배포합니다. 프론트엔드에서는 GitHub Actions, GitLab CI 등으로 PR마다 빌드 → 린트 → 타입 체크 → 테스트 → 프리뷰 배포를 자동화합니다.</p>" +
      "<br/>" +
      "<p><strong>Q1. 프론트엔드 CI 파이프라인에 포함되어야 할 단계는?</strong></p>" +
      "<p>① 의존성 설치(캐시 활용) ② 린트(ESLint/Biome) ③ 타입 체크(tsc --noEmit) ④ 단위/통합 테스트(Vitest) ⑤ 빌드(vite build) ⑥ E2E 테스트(Playwright) ⑦ 번들 크기 분석(size-limit) ⑧ 프리뷰 배포(Vercel Preview). 속도 최적화: 병렬 실행, 캐싱(node_modules, 빌드 결과물), 영향받은 파일만 테스트.</p>" +
      "<br/>" +
      "<p><strong>Q2. 프리뷰 배포(Preview Deployment)의 이점은?</strong></p>" +
      "<p>PR마다 독립된 환경에 배포하여 ① 코드 리뷰어가 실제 동작을 확인 ② 디자이너가 시각적 결과를 검토 ③ QA가 기능을 사전 테스트 ④ E2E 테스트를 실제 배포 환경에서 실행. Vercel, Netlify는 PR별 자동 프리뷰를 기본 제공합니다. 프리뷰 환경은 프로덕션과 최대한 동일한 설정을 사용해야 의미가 있습니다.</p>" +
      "<br/>" +
      "<p><strong>Q3. 배포 전략(Blue-Green, Canary, Rolling)의 차이는?</strong></p>" +
      "<p>Blue-Green: 두 환경을 유지하고 트래픽을 한 번에 전환. 롤백이 빠름. Canary: 트래픽의 일부(예: 5%)만 새 버전으로 보내고 점진적으로 확대. 문제 발생 시 영향 범위 최소화. Rolling: 서버를 순차적으로 업데이트. 프론트엔드에서는 CDN의 캐시 무효화와 결합하여, index.html은 즉시 갱신하고 해시된 정적 파일은 캐시를 유지하는 전략이 일반적입니다.</p>",
  },
  {
    question: "모노레포(Monorepo)란 무엇이며, 장단점은?",
    answer:
      "<p>모노레포는 여러 프로젝트/패키지를 하나의 Git 저장소에서 관리하는 전략입니다. Google, Meta, Microsoft가 대규모 모노레포를 운영합니다. 프론트엔드에서는 웹앱, 컴포넌트 라이브러리, 유틸리티, 설정 파일을 한 저장소에 두고 pnpm workspace + Turborepo(또는 Nx)로 관리합니다.</p>" +
      "<br/>" +
      "<p><strong>Q1. 모노레포의 장단점을 정리해주세요.</strong></p>" +
      "<p>장점: ① 코드 공유가 즉시 가능(publish 없이 workspace 참조) ② 의존성 일관성(한 버전의 React) ③ 원자적 변경(여러 패키지를 한 PR로) ④ 통일된 CI/CD. 단점: ① 저장소 크기 증가 ② 빌드 시간 증가(도구로 해결) ③ 코드 소유권 관리 복잡(CODEOWNERS) ④ IDE 성능 저하 가능 ⑤ 팀 간 의도치 않은 의존성 형성.</p>" +
      "<br/>" +
      "<p><strong>Q2. Turborepo와 Nx의 차이점은?</strong></p>" +
      "<p>Turborepo: ① Vercel 제작, 설정이 간단 ② 로컬/원격 캐싱 ③ 의존성 그래프 기반 병렬 실행 ④ 점진적 도입 용이. Nx: ① 풍부한 플러그인 생태계 ② 코드 생성기(generator) ③ 영향 분석(affected) ④ 그래프 시각화 ⑤ 스탠드얼론 프로젝트에도 사용 가능. 간단한 모노레포에는 Turborepo, 대규모 엔터프라이즈에는 Nx가 적합합니다.</p>" +
      "<br/>" +
      "<p><strong>Q3. 패키지 간 의존성 관리와 버전 관리 전략은?</strong></p>" +
      "<p>① 내부 패키지: <code>workspace:*</code> 프로토콜로 항상 최신 참조(버전 불필요) ② 외부 게시: Changesets로 시맨틱 버저닝 관리, 자동 changelog 생성 ③ 의존성 중복 방지: 공통 의존성을 루트 또는 공유 패키지로 통합 ④ TypeScript 프로젝트 레퍼런스로 증분 빌드. 패키지 간 순환 의존성을 피하고, 명확한 의존성 방향(앱 → 라이브러리 → 유틸)을 유지합니다.</p>",
  },
  {
    question: "팀 내에서 기술적 의견이 충돌할 때 어떻게 해결하나요?",
    answer:
      "<p>기술적 의견 충돌은 건강한 팀 문화의 신호입니다. 해결 접근법: ① 객관적 데이터로 논의(벤치마크, 사용자 지표, 코드 복잡도) ② 각 선택지의 장단점을 문서화하여 감정이 아닌 사실 기반으로 비교 ③ 프로토타입/PoC로 검증 ④ 결정이 안 되면 가역적인 선택을 하고 모니터링 ⑤ 최종 결정권자(Tech Lead)에게 위임. '틀린 결정을 내리는 것보다 결정을 못 내리는 것이 더 나쁘다'는 원칙을 따릅니다.</p>" +
      "<br/>" +
      "<p><strong>Q1. ADR(Architecture Decision Record)이란 무엇인가요?</strong></p>" +
      "<p>ADR은 중요한 기술적 결정을 문서로 기록하는 관행입니다. 제목, 상태(제안/승인/폐기), 맥락(왜 결정이 필요한가), 결정 내용, 대안 및 장단점, 결과를 포함합니다. 새 팀원이 '왜 이런 결정을 했는가'를 이해할 수 있게 하고, 같은 논의가 반복되는 것을 방지합니다. Git에 마크다운으로 관리하여 코드와 함께 버전 관리합니다.</p>" +
      "<br/>" +
      "<p><strong>Q2. 기술 부채(Technical Debt)를 팀에서 어떻게 관리하나요?</strong></p>" +
      "<p>① 기술 부채를 가시화: 이슈 트래커에 tech-debt 라벨로 추적 ② 스프린트마다 일정 비율(예: 20%)을 부채 상환에 할당 ③ 큰 리팩토링은 점진적으로(Strangler Pattern) ④ 새 코드가 부채를 쌓지 않도록 코드 리뷰와 CI에서 품질 게이트 설정 ⑤ 비즈니스 영향도로 우선순위 결정. 모든 부채를 갚을 수는 없으므로, ROI가 높은 부채를 식별하는 것이 핵심입니다.</p>" +
      "<br/>" +
      "<p><strong>Q3. 코드 리뷰를 효과적으로 하기 위한 원칙은?</strong></p>" +
      "<p>① 코드가 아닌 행동을 리뷰(개인 공격 금지) ② '왜'를 설명: 단순히 '이렇게 바꿔'가 아닌 이유 제시 ③ 가독성, 유지보수성, 성능, 보안 순으로 검토 ④ 너무 많은 코멘트보다 핵심 이슈 집중 ⑤ 'nit:' 접두사로 사소한 지적과 중요한 지적 구분 ⑥ 칭찬도 함께: 좋은 코드에 대한 긍정적 피드백. PR 크기를 작게 유지하는 것이 효과적 리뷰의 전제조건입니다.</p>",
  },
  {
    question:
      "React.memo, useMemo, useCallback의 차이와 사용 시기를 설명해주세요.",
    answer:
      "<p><code>React.memo</code>는 컴포넌트의 props가 변경되지 않으면 리렌더링을 건너뛰는 HOC입니다. <code>useMemo</code>는 계산 비용이 큰 값을 메모이제이션합니다. <code>useCallback</code>은 함수 참조를 메모이제이션합니다(useMemo의 함수 버전). 세 가지 모두 '불필요한 재계산/리렌더링 방지'가 목적이지만, 메모이제이션 자체에도 비용이 있으므로 실제 성능 병목이 있을 때만 사용해야 합니다.</p>" +
      "<br/>" +
      "<p><strong>Q1. React.memo를 사용해야 하는 구체적인 상황은?</strong></p>" +
      "<p>① 부모가 자주 리렌더링되지만 자식 props는 변하지 않을 때 ② 렌더링 비용이 큰 컴포넌트(큰 리스트, 차트, 맵) ③ Context 값이 자주 변하는 트리에서 영향받지 않는 자식 격리. 사용하면 안 되는 경우: props가 매번 새 참조(인라인 객체, 인라인 함수)라면 memo가 무용. 이 경우 부모에서 useMemo/useCallback으로 참조를 안정화해야 합니다.</p>" +
      "<br/>" +
      "<p><strong>Q2. useMemo의 남용이 오히려 성능을 악화시키는 경우는?</strong></p>" +
      "<p>단순한 계산(배열 필터링, 문자열 조합)을 useMemo로 감싸면 ① 의존성 배열 비교 오버헤드 ② 추가 메모리 사용 ③ GC 지연. React 팀도 'useMemo는 성능 최적화이지 의미 보장이 아니다'라고 명시합니다. React Compiler(React Forget)는 이런 메모이제이션을 자동화하여 개발자가 직접 관리할 필요를 줄이는 것이 목표입니다.</p>" +
      "<br/>" +
      "<p><strong>Q3. React Compiler(React Forget)가 이 문제를 어떻게 해결하나요?</strong></p>" +
      "<p>React Compiler는 빌드 타임에 컴포넌트를 분석하여 자동으로 메모이제이션을 삽입합니다. 개발자가 수동으로 memo, useMemo, useCallback을 작성할 필요가 없어집니다. 컴파일러가 '이 값은 의존성이 변하지 않으면 재계산 불필요'를 자동 판단합니다. 현재 Meta에서 프로덕션 사용 중이며 점진적으로 오픈소스 공개가 진행 중입니다.</p>",
  },
  {
    question: "React Server Components(RSC)란 무엇인가요?",
    answer:
      "<p>RSC는 서버에서만 실행되는 React 컴포넌트입니다. 클라이언트 번들에 포함되지 않아 번들 크기를 줄이고, 서버 리소스(DB, 파일 시스템)에 직접 접근할 수 있습니다. Next.js App Router에서 기본적으로 모든 컴포넌트가 Server Component이며, <code>'use client'</code> 지시어로 Client Component를 명시합니다. 서버 렌더링(SSR)과는 다른 개념입니다.</p>" +
      "<br/>" +
      "<p><strong>Q1. Server Component와 Client Component의 차이를 정리해주세요.</strong></p>" +
      "<p>Server Component: ① 서버에서만 실행 ② 번들에 미포함 ③ DB/파일 직접 접근 ④ useState/useEffect 사용 불가 ⑤ 이벤트 핸들러 불가. Client Component: ① 서버에서 프리렌더 + 클라이언트에서 hydration ② 번들에 포함 ③ 인터랙티브 기능(상태, 이벤트, 브라우저 API) ④ use client 지시어 필요. SC에서 CC를 children으로 전달하는 합성 패턴이 핵심입니다.</p>" +
      "<br/>" +
      "<p><strong>Q2. RSC의 직렬화(Serialization) 제약은 무엇인가요?</strong></p>" +
      "<p>Server Component에서 Client Component로 전달하는 props는 직렬화 가능해야 합니다. 함수, Date, Map, Set, 클래스 인스턴스 등은 전달 불가합니다. 허용: 문자열, 숫자, 불리언, 배열, 일반 객체, JSX(React Element), Server Action(함수지만 특별 처리). 이 제약이 SC/CC 경계 설계에 큰 영향을 미칩니다.</p>" +
      "<br/>" +
      "<p><strong>Q3. RSC가 기존 SSR과 다른 핵심 차이점은?</strong></p>" +
      "<p>SSR은 서버에서 HTML을 생성하지만 클라이언트에서 전체 컴포넌트 코드를 다시 실행(hydration)합니다. RSC는 서버 전용 코드가 클라이언트에 전혀 전달되지 않습니다. RSC의 결과는 HTML이 아닌 React의 직렬화 형식(RSC Payload)으로 전달되어 기존 클라이언트 상태를 유지하면서 서버 결과를 병합합니다. SSR + RSC를 결합하여 사용하는 것이 Next.js App Router의 기본 전략입니다.</p>",
  },
  {
    question: "100개의 API를 동시에 fetch해야 한다면 어떻게 하나요?",
    answer:
      "<p>100개를 동시에 보내면 브라우저의 동시 연결 제한(HTTP/1.1: 도메인당 6개)과 서버 부하 문제가 발생합니다. 전략: ① <code>Promise.allSettled</code>로 모든 요청의 성공/실패를 처리 ② 동시성 제한: 한 번에 5~10개씩 배치로 요청하는 풀(pool) 패턴 구현 ③ <code>p-limit</code> 라이브러리로 동시 실행 수 제어 ④ 서버 측에서 배치 API를 제공하여 요청 수 자체를 줄이는 것이 가장 좋습니다.</p>" +
      "<br/>" +
      "<p><strong>Q1. 동시성 제한 풀을 직접 구현하는 방법은?</strong></p>" +
      "<p><code>async function pool(limit, items, fn) { const executing = new Set(); for (const item of items) { const p = fn(item).then(() => executing.delete(p)); executing.add(p); if (executing.size >= limit) await Promise.race(executing); } return Promise.all(executing); }</code> 이 패턴은 항상 limit개의 요청이 진행 중이도록 유지합니다. 완료된 슬롯에 즉시 새 요청을 채워넣어 효율적입니다.</p>" +
      "<br/>" +
      "<p><strong>Q2. AbortController로 요청을 취소하는 패턴은?</strong></p>" +
      "<p><code>const controller = new AbortController(); fetch(url, { signal: controller.signal })</code>로 요청을 생성하고, <code>controller.abort()</code>로 취소합니다. React에서 컴포넌트 언마운트 시 진행 중인 요청을 취소하여 메모리 누수를 방지합니다. useEffect의 cleanup에서 abort를 호출합니다. 여러 요청을 하나의 controller로 묶어 일괄 취소할 수도 있습니다.</p>" +
      "<br/>" +
      "<p><strong>Q3. TanStack Query에서 대량 요청을 효율적으로 관리하는 방법은?</strong></p>" +
      "<p>TanStack Query의 <code>useQueries</code>로 여러 쿼리를 병렬 실행합니다. 자동 캐싱으로 같은 요청을 중복 방지하고, <code>staleTime</code>과 <code>gcTime</code>으로 캐시 정책을 설정합니다. <code>queryClient.prefetchQuery</code>로 사전 로딩도 가능합니다. Suspense와 결합하면 모든 쿼리가 완료될 때까지 로딩 UI를 자동으로 표시합니다.</p>",
  },
  {
    question: "디바운스(Debounce)와 스로틀(Throttle)의 차이점은 무엇인가요?",
    answer:
      "<p><strong>디바운스</strong>는 연속된 이벤트 중 마지막 이벤트 후 일정 시간이 지나야 실행합니다. 검색 입력에서 타이핑이 멈추면 API 호출. <strong>스로틀</strong>은 일정 시간 간격으로 최대 한 번만 실행합니다. 스크롤 이벤트에서 100ms마다 한 번씩 처리. 디바운스는 '마지막 이벤트를 기다림', 스로틀은 '주기적으로 실행'이 핵심 차이입니다.</p>" +
      "<br/>" +
      "<p><strong>Q1. React에서 디바운스를 구현하는 방법과 주의점은?</strong></p>" +
      "<p>① <code>useMemo(() => debounce(fn, 300), [])</code>로 함수 참조를 안정화 ② 컴포넌트 언마운트 시 <code>cleanup</code>에서 <code>debouncedFn.cancel()</code> 호출 필수 ③ <code>useDeferredValue</code>는 React 내장 디바운스 대안으로 렌더링 수준에서 동작. 주의: 매 렌더링마다 새 debounce 함수를 생성하면 이전 타이머가 취소되어 디바운스가 동작하지 않습니다.</p>" +
      "<br/>" +
      "<p><strong>Q2. requestAnimationFrame을 이용한 스로틀 패턴은?</strong></p>" +
      "<p>스크롤/리사이즈 이벤트를 rAF로 스로틀링하면 화면 갱신 주기(~16.6ms)에 맞춰 처리합니다: <code>let ticking = false; element.onscroll = () => { if (!ticking) { requestAnimationFrame(() => { handleScroll(); ticking = false; }); ticking = true; } }</code>. 시각적 업데이트에 최적화된 스로틀링입니다.</p>" +
      "<br/>" +
      "<p><strong>Q3. Leading edge vs Trailing edge 실행의 차이는?</strong></p>" +
      "<p>디바운스/스로틀의 실행 시점을 제어합니다. Trailing(기본): 지연 후 실행(타이핑 종료 후 검색). Leading: 첫 이벤트에서 즉시 실행(버튼 더블클릭 방지에 유용). 양쪽 모두 가능: 첫 이벤트에서 즉시 실행 + 마지막 이벤트 후 다시 실행. lodash의 debounce/throttle은 <code>{ leading: true, trailing: false }</code> 같은 옵션으로 이를 제어합니다.</p>",
  },
  {
    question: "Web Worker란 무엇이며, 어떤 상황에서 사용하나요?",
    answer:
      "<p>Web Worker는 메인 스레드와 별도의 백그라운드 스레드에서 JavaScript를 실행하는 API입니다. 메인 스레드의 UI 반응성을 유지하면서 CPU 집약적 작업을 처리할 수 있습니다. <code>postMessage()</code>로 데이터를 주고받으며, DOM에 접근할 수 없습니다. 이미지 처리, 데이터 파싱, 암호화, 복잡한 계산에 적합합니다.</p>" +
      "<br/>" +
      "<p><strong>Q1. Web Worker의 종류(Dedicated, Shared, Service)를 비교해주세요.</strong></p>" +
      "<p><code>Dedicated Worker</code>: 하나의 스크립트에서만 사용, 가장 일반적. <code>Shared Worker</code>: 여러 탭/윈도우에서 공유, 포트 기반 통신, 브라우저 지원 제한. <code>Service Worker</code>: 네트워크 프록시 역할, 오프라인/캐싱/푸시 알림, 페이지와 독립적 생명주기. 일반적인 연산 오프로드에는 Dedicated Worker, 탭 간 상태 공유에는 Shared Worker를 사용합니다.</p>" +
      "<br/>" +
      "<p><strong>Q2. Transferable Objects로 성능을 개선하는 방법은?</strong></p>" +
      "<p><code>postMessage</code>는 기본적으로 데이터를 구조화된 복제(Structured Clone)로 복사하여 대용량 데이터에서 오버헤드가 큽니다. <code>ArrayBuffer</code>, <code>MessagePort</code>, <code>OffscreenCanvas</code> 등은 Transferable Object로, 소유권을 이전하여 복사 없이 전달 가능합니다: <code>worker.postMessage(buffer, [buffer])</code>. 전송 후 원본은 사용 불가합니다.</p>" +
      "<br/>" +
      "<p><strong>Q3. React 프로젝트에서 Web Worker를 사용하는 패턴은?</strong></p>" +
      "<p>① Vite에서 <code>new Worker(new URL('./worker.ts', import.meta.url))</code>로 Worker 생성 ② comlink 라이브러리로 Worker 함수를 일반 async 함수처럼 호출 ③ 커스텀 훅으로 래핑: <code>useWorker(() => heavyComputation(data))</code> ④ useTransition과 결합하여 Worker 결과를 논블로킹으로 표시. Worker 내에서는 React를 사용할 수 없으므로 순수 연산 로직만 분리합니다.</p>",
  },
  {
    question: "Node와 Element의 차이점은 무엇인가요?",
    answer:
      "<p>DOM에서 <code>Node</code>는 모든 DOM 노드의 기본 인터페이스입니다. Element, Text, Comment, Document 등 모든 것이 Node입니다. <code>Element</code>는 Node의 하위 타입으로, HTML/SVG 태그를 나타냅니다. <code>childNodes</code>는 텍스트, 주석 등 모든 자식 Node를 반환하고, <code>children</code>은 Element 자식만 반환합니다. TypeScript에서 <code>HTMLDivElement extends HTMLElement extends Element extends Node</code> 계층입니다.</p>" +
      "<br/>" +
      "<p><strong>Q1. NodeList와 HTMLCollection의 차이는?</strong></p>" +
      "<p><code>NodeList</code>(<code>querySelectorAll</code> 반환): 정적(스냅샷), forEach 사용 가능. <code>HTMLCollection</code>(<code>getElementsByClassName</code> 반환): 라이브(DOM 변경 시 자동 업데이트), forEach 미지원(Array.from 변환 필요). 라이브 컬렉션은 반복문에서 DOM을 수정하면 무한 루프가 발생할 수 있어 주의가 필요합니다. 현대 코드에서는 <code>querySelectorAll</code>을 사용하는 것이 안전합니다.</p>" +
      "<br/>" +
      "<p><strong>Q2. DocumentFragment는 무엇이며, 왜 사용하나요?</strong></p>" +
      "<p><code>DocumentFragment</code>는 가벼운 Document 객체로, DOM 트리에 직접 연결되지 않습니다. 여러 DOM 요소를 Fragment에 추가한 후 한 번에 DOM에 삽입하면, 각 요소 삽입마다 발생하는 Reflow를 1회로 줄입니다. <code>template</code> 태그의 <code>content</code>도 DocumentFragment입니다. React의 <code>&lt;Fragment&gt;</code>(<code>&lt;&gt;&lt;/&gt;</code>)는 이름만 같을 뿐 DOM DocumentFragment와는 다릅니다.</p>" +
      "<br/>" +
      "<p><strong>Q3. React에서 DOM을 직접 조작해야 하는 경우는?</strong></p>" +
      "<p>① 포커스 관리: <code>inputRef.current.focus()</code> ② 스크롤 위치: <code>element.scrollIntoView()</code> ③ DOM 측정: <code>getBoundingClientRect()</code> ④ 서드파티 라이브러리 통합(지도, 에디터) ⑤ 캔버스/WebGL 조작. 이 경우 <code>useRef</code>로 DOM 참조를 가져오고, <code>useEffect</code>/<code>useLayoutEffect</code>에서 조작합니다. Render Phase에서는 절대 DOM을 조작하면 안 됩니다.</p>",
  },
  {
    question: "JavaScript의 메모리 관리와 가비지 컬렉션은 어떻게 동작하나요?",
    answer:
      "<p>JavaScript는 자동 메모리 관리를 사용합니다. 객체가 생성되면 메모리를 할당하고, 더 이상 참조되지 않으면 가비지 컬렉터(GC)가 자동으로 해제합니다. V8의 GC는 Generational Collection을 사용합니다: Young Generation(새로 생성된 객체, Scavenger로 빠르게 수집)과 Old Generation(오래 생존한 객체, Mark-Sweep-Compact로 수집). 대부분의 객체는 짧은 수명을 가져 Young Generation에서 빠르게 수집됩니다.</p>" +
      "<br/>" +
      "<p><strong>Q1. 메모리 누수(Memory Leak)가 발생하는 흔한 패턴은?</strong></p>" +
      "<p>① 해제되지 않은 이벤트 리스너 ② clearInterval/clearTimeout 미호출 ③ 클로저가 큰 객체를 참조 ④ DOM에서 제거되었지만 JavaScript에서 참조 유지(분리된 DOM 노드) ⑤ 전역 변수에 누적되는 데이터 ⑥ console.log가 참조를 유지(프로덕션에서). React에서는 useEffect cleanup 미구현이 가장 흔한 원인입니다.</p>" +
      "<br/>" +
      "<p><strong>Q2. Chrome DevTools로 메모리 누수를 디버깅하는 방법은?</strong></p>" +
      "<p>① Memory 탭 → Heap Snapshot: 객체별 메모리 사용량, Retained Size 확인 ② Allocation Timeline: 시간에 따른 메모리 할당/해제 추적 ③ Performance 탭: GC 빈도와 소요 시간 모니터링 ④ 두 시점의 Heap Snapshot을 비교(Comparison view)하여 증가하는 객체 식별 ⑤ 'Detached DOM elements' 필터로 분리된 DOM 노드 찾기.</p>" +
      "<br/>" +
      "<p><strong>Q3. WeakRef와 FinalizationRegistry는 어떤 상황에서 사용하나요?</strong></p>" +
      "<p><code>WeakRef</code>는 GC를 방해하지 않는 약한 참조를 생성합니다. 캐시 구현에서 참조가 없으면 자동으로 캐시에서 제거됩니다: <code>const ref = new WeakRef(largeObject)</code>. <code>FinalizationRegistry</code>는 객체가 GC될 때 콜백을 실행하여 리소스 정리를 자동화합니다. 두 API는 GC 타이밍이 비결정적이므로 핵심 로직에 의존해서는 안 되며, 최적화 목적으로만 사용합니다.</p>",
  },
  {
    question: "React에서 발생할 수 있는 메모리 누수와 해결 방법은?",
    answer:
      "<p>React에서 흔한 메모리 누수: ① useEffect에서 구독/타이머 설정 후 cleanup 미구현 ② 언마운트된 컴포넌트에서 setState 호출 시도 ③ 이벤트 리스너 미해제 ④ 큰 객체를 Context나 전역 상태에 누적 ⑤ 잘못된 클로저가 이전 상태를 계속 참조. 핵심 원칙: useEffect에는 항상 cleanup 함수를 반환하고, 비동기 작업에는 AbortController를 사용합니다.</p>" +
      "<br/>" +
      "<p><strong>Q1. useEffect cleanup이 중요한 구체적인 사례를 들어주세요.</strong></p>" +
      "<p>① WebSocket: <code>useEffect(() => { const ws = new WebSocket(url); return () => ws.close(); }, [url])</code> ② setInterval: <code>useEffect(() => { const id = setInterval(fn, 1000); return () => clearInterval(id); }, [])</code> ③ 이벤트 리스너: <code>useEffect(() => { window.addEventListener('resize', handler); return () => window.removeEventListener('resize', handler); }, [])</code>. cleanup이 없으면 리렌더링마다 리스너가 중첩됩니다.</p>" +
      "<br/>" +
      "<p><strong>Q2. 비동기 작업에서 컴포넌트 언마운트 후 setState를 방지하는 방법은?</strong></p>" +
      "<p>AbortController 패턴: <code>useEffect(() => { const controller = new AbortController(); fetch(url, { signal: controller.signal }).then(data => setState(data)).catch(e => { if (e.name !== 'AbortError') throw e; }); return () => controller.abort(); }, [url])</code>. React 18부터는 Strict Mode에서 이중 마운트/언마운트로 이 문제를 사전에 감지합니다.</p>" +
      "<br/>" +
      "<p><strong>Q3. React DevTools로 불필요한 리렌더링과 메모리 이슈를 진단하는 방법은?</strong></p>" +
      "<p>① Profiler: 각 렌더의 소요 시간과 원인(props/state/context 변경) 확인 ② 'Highlight updates when components render'로 리렌더링 시각화 ③ Components 탭에서 훅 상태와 props 실시간 확인 ④ 'Why did you render' 라이브러리로 불필요한 리렌더링 원인 자동 감지 ⑤ Chrome Memory 탭과 결합하여 특정 상호작용 후 메모리 증가 패턴 추적.</p>",
  },
  {
    question: "브라우저 뒤로가기 시 스크롤 위치를 복원하는 방법은?",
    answer:
      "<p>브라우저의 기본 <code>scrollRestoration</code>은 일반 네비게이션에서 자동 스크롤 복원을 제공하지만, SPA에서는 클라이언트 라우팅으로 인해 동작하지 않는 경우가 많습니다. 해결 방법: ① <code>history.scrollRestoration = 'manual'</code>로 브라우저 기본 복원 비활성화 ② 라우터의 스크롤 복원 기능 사용(TanStack Router, React Router) ③ 페이지 이탈 시 스크롤 위치 저장 → 복귀 시 복원.</p>" +
      "<br/>" +
      "<p><strong>Q1. SPA에서 스크롤 복원이 어려운 이유는?</strong></p>" +
      "<p>SPA는 실제 페이지 이동 없이 JavaScript로 콘텐츠를 교체하므로 ① 브라우저가 기본 스크롤 위치를 추적하지 못함 ② 비동기 데이터 로딩으로 콘텐츠 높이가 동적으로 변함 ③ 가상 스크롤(virtualized list)은 실제 DOM 높이가 다름. 정확한 복원을 위해 스크롤 위치 + 콘텐츠 로딩 상태를 함께 관리해야 합니다.</p>" +
      "<br/>" +
      "<p><strong>Q2. 무한 스크롤 목록에서 뒤로가기 시 복원은 어떻게 하나요?</strong></p>" +
      "<p>① 스크롤 위치와 함께 로딩된 페이지 수/오프셋을 저장 ② sessionStorage에 저장하여 새로고침에도 유지 ③ 가상 스크롤 라이브러리(react-virtuoso, @tanstack/react-virtual)의 initialOffset 옵션 활용 ④ 캐시된 데이터를 즉시 렌더링하고 스크롤 복원 후 백그라운드에서 갱신. TanStack Query의 캐시와 결합하면 데이터 재로딩 없이 즉시 복원 가능합니다.</p>" +
      "<br/>" +
      "<p><strong>Q3. TanStack Router의 스크롤 복원 메커니즘은?</strong></p>" +
      "<p>TanStack Router는 <code>ScrollRestoration</code> 컴포넌트로 자동 스크롤 복원을 제공합니다. 라우트 전환 시 스크롤 위치를 sessionStorage에 저장하고, 뒤로가기 시 복원합니다. <code>getKey</code> 옵션으로 캐싱 키를 커스터마이징하고, <code>scrollRestorationBehavior</code>로 동작을 세밀하게 제어합니다. Suspense와 함께 사용 시 콘텐츠 로딩 완료 후 복원됩니다.</p>",
  },
];
