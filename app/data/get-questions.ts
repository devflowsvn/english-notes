import { prisma } from "@/lib/db";

export async function getQuestionsOver12Hours() {
  // Tính mốc thời gian 12 tiếng trước hiện tại
  const twelveHoursAgo = new Date(Date.now() - 12 * 60 * 60 * 1000);

  // Lấy những câu hỏi mà learnedAt < twelveHoursAgo
  const questions = await prisma.question.findMany({
    where: {
      learnedAt: {
        lt: twelveHoursAgo,
      },
    },
    select: {
      id: true,
      question: true,
      answer: true,
      learnedAt: true,
    },
  });

  return questions;
}
