"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { LoginInput, SignupInput } from "../validations/auth";

export async function login(values: LoginInput) {
  try {
    await signIn("credentials", {
      ...values,
      redirectTo: "/dashboard",
    });
    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials." };
        default:
          return { error: "Something went wrong." };
      }
    }
    throw error;
  }
}

export async function signup(values: SignupInput) {
  try {
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const error = await response.json();
      return { error: error.message };
    }

    await signIn("credentials", {
      ...values,
      redirectTo: "/dashboard",
    });

    return { success: true };
  } catch (error) {
    return { error: "Something went wrong." };
  }
} 