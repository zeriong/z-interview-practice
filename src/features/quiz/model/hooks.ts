import type { PointerEvent } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useQuizStore } from "@/entities/quiz/model";
import { INTERVIEW_DATA } from "@/shared/constants";

interface SwipeState {
  startX: number;
  startY: number;
  swiping: boolean;
  locked: boolean;
  direction: number;
  currentAngle: number;
}

export function useSwipeFlip(
  flipped: boolean,
  setFlipped: React.Dispatch<React.SetStateAction<boolean>>,
) {
  const cardRef = useRef<HTMLDivElement>(null);
  const swipeFinishing = useRef(false);
  const isFirstRender = useRef(true);
  const swipeRef = useRef<SwipeState>({
    startX: 0,
    startY: 0,
    swiping: false,
    locked: false,
    direction: 1,
    currentAngle: 0,
  });

  // 인라인 스타일로 각도를 즉시 전환 (애니메이션 없음)
  const setAngleImmediate = useCallback((deg: number) => {
    if (!cardRef.current) return;
    cardRef.current.style.transition = "none";
    cardRef.current.style.transform = `rotateY(${deg}deg)`;
    void cardRef.current.offsetHeight;
    cardRef.current.style.transition = "";
  }, []);

  // 훅이 transform을 단독 제어:
  // - 스와이프 완료 → 정규 각도(0/180)로 즉시 전환 (애니메이션 없음)
  // - 버튼 클릭 → 정규 각도로 애니메이션 전환
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (!cardRef.current) return;

    const target = flipped ? 180 : 0;

    if (swipeFinishing.current) {
      swipeFinishing.current = false;
      setAngleImmediate(target);
    } else {
      cardRef.current.style.transition = "transform 500ms ease";
      cardRef.current.style.transform = `rotateY(${target}deg)`;
    }
  }, [flipped, setAngleImmediate]);

  const onPointerDown = useCallback(
    (e: PointerEvent<HTMLElement>) => {
      swipeRef.current = {
        startX: e.clientX,
        startY: e.clientY,
        swiping: true,
        locked: false,
        direction: 1,
        currentAngle: flipped ? 180 : 0,
      };
      e.currentTarget.setPointerCapture(e.pointerId);
    },
    [flipped],
  );

  const onPointerMove = useCallback(
    (e: PointerEvent<HTMLElement>) => {
      const s = swipeRef.current;
      if (!s.swiping) return;

      const dx = e.clientX - s.startX;
      const adx = Math.abs(dx);
      const ady = Math.abs(e.clientY - s.startY);

      // 방향 잠금: 최초 유의미한 이동에서 한 번만 판정
      if (!s.locked) {
        if (adx < 5 && ady < 5) return;
        if (ady > adx) {
          s.swiping = false;
          return;
        }
        s.locked = true;
        s.direction = dx >= 0 ? 1 : -1;
        if (cardRef.current) cardRef.current.style.transition = "none";
      }

      // 드래그 방향에 따라 회전 방향 결정
      const base = flipped ? 180 : 0;
      const w = cardRef.current?.offsetWidth ?? 300;
      const progress = Math.min(adx / w, 1);
      const angle = base + s.direction * progress * 180;
      s.currentAngle = angle;

      if (cardRef.current) {
        cardRef.current.style.transform = `rotateY(${angle}deg)`;
      }
    },
    [flipped],
  );

  const onPointerUp = useCallback(
    (_e: PointerEvent<HTMLElement>) => {
      const s = swipeRef.current;
      const wasLocked = s.locked;
      s.swiping = false;
      s.locked = false;

      if (!wasLocked || !cardRef.current) return;

      const el = cardRef.current;
      const base = flipped ? 180 : 0;
      // 50% 기준: base에서 90도 이상 벗어나면 플립 완료, 아니면 스냅백
      const shouldComplete = Math.abs(s.currentAngle - base) > 90;
      const target = shouldComplete ? base + s.direction * 180 : base;

      // 스냅 애니메이션 (나머지 각도까지 이동)
      el.style.transition = "transform 300ms ease-out";
      el.style.transform = `rotateY(${target}deg)`;

      let done = false;
      const finish = () => {
        if (done) return;
        done = true;
        el.removeEventListener("transitionend", finish);

        if (shouldComplete) {
          // 스와이프 플립 완료 → useEffect에서 정규화 (애니메이션 없이)
          swipeFinishing.current = true;
          setFlipped(!flipped);
        } else {
          // 스냅백 → 정규 각도로 즉시 복귀
          setAngleImmediate(base);
        }
      };
      el.addEventListener("transitionend", finish, { once: true });
      setTimeout(finish, 350);
    },
    [flipped, setFlipped, setAngleImmediate],
  );

  const onPointerCancel = useCallback(() => {
    swipeRef.current.swiping = false;
    swipeRef.current.locked = false;
    setAngleImmediate(flipped ? 180 : 0);
  }, [flipped, setAngleImmediate]);

  return {
    cardRef,
    swipeHandlers: { onPointerDown, onPointerMove, onPointerUp, onPointerCancel },
  };
}

function getKoreanVoice(): SpeechSynthesisVoice | null {
  const voices = window.speechSynthesis.getVoices();
  return (
    voices.find((v) => v.lang === "ko-KR" && v.localService === false) ??
    voices.find((v) => v.lang === "ko-KR") ??
    null
  );
}

export function useQuizSpeech() {
  const { currentId, voiceEnabled, setVoiceEnabled } = useQuizStore();
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null);
  const isFirstEntry = useRef(true);
  const pendingTextRef = useRef<string | null>(null);
  const [voicesReady, setVoicesReady] = useState(
    () => window.speechSynthesis.getVoices().length > 0,
  );

  useEffect(() => {
    const loadVoices = () => {
      voiceRef.current = getKoreanVoice();
      setVoicesReady(true);
    };
    loadVoices();
    window.speechSynthesis.addEventListener("voiceschanged", loadVoices);
    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", loadVoices);
    };
  }, []);

  const speak = useCallback((text: string) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ko-KR";
    utterance.rate = 1;
    if (voiceRef.current) utterance.voice = voiceRef.current;
    window.speechSynthesis.speak(utterance);
  }, []);

  // 음성 소스 준비 후: 첫 진입은 pending 저장, 이후는 즉시 재생
  useEffect(() => {
    if (!voicesReady || !voiceEnabled || !currentId) return;
    const item = INTERVIEW_DATA.find((i) => i.id === currentId);
    if (!item) return;

    if (isFirstEntry.current) {
      isFirstEntry.current = false;
      pendingTextRef.current = item.question;
      return;
    }

    speak(item.question);
  }, [voicesReady, currentId, voiceEnabled, speak]);

  // Chrome autoplay 정책 대응:
  // 첫 진입 시 pending된 음성을 사용자의 첫 클릭에서 재생
  useEffect(() => {
    const handleClick = () => {
      if (pendingTextRef.current) {
        speak(pendingTextRef.current);
        pendingTextRef.current = null;
        document.removeEventListener("click", handleClick);
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [speak]);

  useEffect(() => {
    return () => window.speechSynthesis.cancel();
  }, []);

  const handleToggleVoice = useCallback(() => {
    const nextVal = !voiceEnabled;
    setVoiceEnabled(nextVal);
    if (!nextVal) {
      window.speechSynthesis.cancel();
    }
  }, [voiceEnabled, setVoiceEnabled]);

  return { handleToggleVoice };
}
