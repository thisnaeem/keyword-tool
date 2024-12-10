import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const session = await auth();
    if (!session || session.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { status } = body;

    const feedback = await prisma.feedback.update({
      where: { id: id },
      data: { status },
    });

    return NextResponse.json(feedback);
  } catch (error) {
    console.error("Error updating feedback:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
