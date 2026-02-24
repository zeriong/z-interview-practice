import { useCallback, useEffect, useRef, useState } from "react";
import { useQuizStore } from "@/entities/quiz/model";
import { INTERVIEW_DATA } from "@/shared/constants";

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
