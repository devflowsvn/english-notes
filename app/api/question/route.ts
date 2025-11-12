import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // Tính mốc thời gian 12 tiếng trước hiện tại
  const twelveHoursAgo = new Date(Date.now() - 12 * 60 * 60 * 1000);

  // Lấy những câu hỏi mà learnedAt < twelveHoursAgo
  const questions = await prisma.question.findMany({
    where: {
      isReviewed: false,
    },
    select: {
      id: true,
      question: true,
      answer: true,
      isReviewed: true,
    },
  });
  return NextResponse.json(
    {
      questions: questions,
    },
    {
      status: 200,
    }
  );
}
