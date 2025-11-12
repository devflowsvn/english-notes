import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

// PATCH /api/question/[id]/learned
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;

  try {
    const updated = await prisma.question.update({
      where: { id },
      data: {
        isReviewed: true, // cập nhật thời gian hiện tại
      },
    });

    return NextResponse.json({ success: true, question: updated });
  } catch (error) {
    console.error("Error updating learnedAt:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update" },
      { status: 500 }
    );
  }
}
