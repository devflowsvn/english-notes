"use client";

import { Button } from "@/components/ui/button";
import { LucideTicketPlus, Send, SkipForward } from "lucide-react";
import { useEffect, useState } from "react";

type Question = {
  id: string;
  question: string;
  answer: string;
  isReviewed: boolean;
};

const HomePage = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [remainingQuestions, setRemainingQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState("");

  const pickRandomQuestion = (list: Question[]) => {
    if (list.length === 0) return null;
    return list[Math.floor(Math.random() * list.length)];
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch("/api/question/");
        const data = await res.json();
        const qList = data.questions as Question[];
        setQuestions(qList);
        setRemainingQuestions(qList);
        setCurrentQuestion(pickRandomQuestion(qList));
      } catch (error) {
        console.error(error);
      }
    };
    fetchQuestions();
  }, []);

  const speakText = (text: string) => {
    if ("speechSynthesis" in window) {
      const voices = window.speechSynthesis.getVoices();
      const utterance = new SpeechSynthesisUtterance(text);
      const voice = voices.find(
        (v) => v.lang === "en-US" && v.name.includes("Female")
      );
      if (voice) utterance.voice = voice;
      utterance.rate = 1;
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSubmit = async () => {
    if (!currentQuestion) return;

    const correct =
      userAnswer.trim().toLowerCase() ===
      currentQuestion.answer.trim().toLowerCase();

    if (correct) {
      setFeedback("✅ Chính xác!");
      speakText(currentQuestion.answer);

      try {
        // Update DB
        await fetch(`/api/question/${currentQuestion.id}/learned`, {
          method: "PATCH",
        });

        setQuestions((prev) =>
          prev.map((q) =>
            q.id === currentQuestion.id ? { ...q, isReviewed: true } : q
          )
        );

        const updatedRemaining = remainingQuestions.filter(
          (q) => q.id !== currentQuestion.id
        );
        setRemainingQuestions(updatedRemaining);

        setCurrentQuestion(pickRandomQuestion(updatedRemaining));
        setUserAnswer("");
        setTimeout(() => setFeedback(""), 800);
      } catch {
        setFeedback("❌ Lỗi khi lưu câu hỏi!");
      }
    } else {
      setFeedback("❌ Sai rồi, thử lại nhé!");
    }
  };

  const handleSkip = () => {
    if (remainingQuestions.length <= 1) return;
    const next = pickRandomQuestion(
      remainingQuestions.filter((q) => q.id !== currentQuestion?.id)
    );
    setCurrentQuestion(next);
    setFeedback("");
    setUserAnswer("");
  };

  const handleRenew = async () => {
    try {
      await fetch("/api/question/reset", { method: "PATCH" });
      const data = await fetch("/api/question/").then((res) => res.json());
      const qList = data.questions as Question[];
      setQuestions(qList);
      setRemainingQuestions(qList);
      setCurrentQuestion(pickRandomQuestion(qList));
      setUserAnswer("");
      setFeedback("");
    } catch (error) {
      console.error(error);
    }
  };

  const progress =
    questions.length === 0
      ? 0
      : (questions.filter((q) => q.isReviewed).length / questions.length) * 100;

  const currentIndex = questions.filter((q) => q.isReviewed).length + 1;

  return (
    <div className="flex flex-col gap-6 items-center w-full max-w-xl p-6 bg-zinc-950 ">
      <h2 className="font-extrabold text-5xl text-white drop-shadow-lg">
        Question?
      </h2>
      <p className="text-xl text-zinc-400">Dịch từ sau đây thành tiếng Anh:</p>

      {/* Progress */}
      <div className="w-full flex justify-between items-center mb-2 text-sm text-zinc-400">
        <span>
          Câu hỏi {currentQuestion ? currentIndex : questions.length}/
          {questions.length}
        </span>
        <span>{Math.round(progress)}%</span>
      </div>
      <div className="w-full bg-zinc-700 rounded-full h-4 mb-4 overflow-hidden">
        <div
          className="bg-green-500 h-4 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Question Card */}
      <div className="w-full text-center text-2xl flex items-center justify-center p-8 border bg-zinc-900 shadow-xl rounded-xl min-h-[120px] transition-transform duration-300 hover:scale-[1.02]">
        {currentQuestion
          ? currentQuestion.question
          : "Bạn đã trả lời xong tất cả câu hỏi!"}
      </div>

      {/* Input */}
      <input
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        disabled={!currentQuestion}
        className="w-full rounded-xl py-4 px-6 bg-zinc-800 border border-zinc-700 placeholder:text-zinc-400 text-xl focus:outline-none focus:ring-2 focus:ring-green-500 transition"
        placeholder="Đáp án của bạn..."
      />

      {/* Feedback */}
      {feedback && (
        <p
          className={`text-lg font-semibold mt-2 ${
            feedback.includes("✅") ? "text-green-400" : "text-red-500"
          } drop-shadow-md`}
        >
          {feedback}
        </p>
      )}

      {/* Buttons */}
      <div className="flex flex-wrap gap-3 justify-center mt-4">
        <Button
          onClick={handleSubmit}
          disabled={!currentQuestion}
          className="flex items-center gap-2 px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-medium rounded-xl shadow-md transition"
        >
          <Send /> Gửi đáp án
        </Button>

        <Button
          onClick={handleSkip}
          disabled={!currentQuestion || remainingQuestions.length <= 1}
          className="flex items-center gap-2 px-8 py-4 bg-yellow-700 hover:bg-yellow-800 text-white font-medium rounded-xl shadow-md transition"
        >
          <SkipForward /> Skip
        </Button>

        <Button
          onClick={handleRenew}
          className="flex items-center gap-2 px-8 py-4 bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-xl shadow-md transition"
        >
          <LucideTicketPlus /> Làm mới
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
