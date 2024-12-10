"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { LoginInput, SignupInput, signupSchema } from "../validations/auth";
import { prisma } from "../prisma";
import { hash } from "bcryptjs";


export async function signup(values: SignupInput) {
  try {
    // validate signup input
    const validated = signupSchema.safeParse(values);
    if (!validated.success) {
      return { error: validated.error.message };
    }

    // check if user already exists
    const user = await prisma.user.findUnique({
      where: { email: values.email },
    });
    if (user) {
      return { error: "User already exists." };
    }

    // create user
    await prisma.user.create({
      data: {
        ...values,
        password: await hash(values.password, 10),
      },
    });


    return { success: true };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong." };
  }
} 