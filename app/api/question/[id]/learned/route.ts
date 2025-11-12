import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

// PATCH /api/question/[id]/learned
export async function PATCH(
  req: Request,
  props: { params: Promise<{ id: string }> }
) {
  // Await params trước khi sử dụng
  const params = await props.params;
  const { id } = params;

  try {
    const updated = await prisma.question.update({
      where: { id },
      data: {
        isReviewed: true,
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
