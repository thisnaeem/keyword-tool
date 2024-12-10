import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { feedbackSchema } from "@/lib/validations/feedback";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session || !session.user || !session.user.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const validated = feedbackSchema.safeParse(body);

    if (!validated.success) {
      return new NextResponse("Invalid input", { status: 400 });
    }

    const feedback = await prisma.feedback.create({
      data: {
        description: validated.data.description,
        title: validated.data.title,
        type: validated.data.type,
        userId: session.user.id,
        status: "pending",
      },
    });

    return NextResponse.json(feedback);
  } catch (error) {
    console.error("Error creating feedback:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await auth();
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const feedbacks = await prisma.feedback.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(feedbacks);
  } catch (error) {
    console.error("Error fetching feedback:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
