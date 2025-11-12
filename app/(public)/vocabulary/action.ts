"use server";
import { prisma } from "@/lib/db";
import { vocabularySchemaType } from "@/lib/zod-shemas";

export async function CreateVocabulary(data: vocabularySchemaType) {
  const vocacbularyExists = await prisma.question.findFirst({
    where: {
      question: data.question,
    },
  });

  if (vocacbularyExists) {
    return { message: "Từ vựng đã tồn tại", code: 400 };
  }

  await prisma.question.create({
    data: {
      ...data,
    },
  });
  return { message: "Thêm từ vựng thành công", code: 200 };
}
