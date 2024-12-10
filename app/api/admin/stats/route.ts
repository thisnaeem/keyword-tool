import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await auth();
    
    if (!session || session.user.role !== "ADMIN") {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Get total users count and monthly growth
    const totalUsers = await prisma.user.count();
    const lastMonthUsers = await prisma.user.count({
      where: {
        createdAt: {
          lt: new Date(),
          gte: new Date(new Date().setMonth(new Date().getMonth() - 1)),
        },
      },
    });

    // Calculate monthly growth percentage
    const previousMonthUsers = totalUsers - lastMonthUsers;
    const growthPercentage = previousMonthUsers === 0 
      ? 100 
      : ((lastMonthUsers - previousMonthUsers) / previousMonthUsers * 100).toFixed(1);

    return NextResponse.json({
      totalUsers,
      userGrowth: `+${growthPercentage}%`,
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
} 