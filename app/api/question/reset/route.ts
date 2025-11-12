import { prisma } from "@/lib/db";

export async function PATCH(request: Request) {
  try {
    await prisma.question.updateMany({
      data: {
        isReviewed: false,
      },
    });

    return new Response(
      JSON.stringify({ message: "Reset all questions successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ message: "Failed to reset questions" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
