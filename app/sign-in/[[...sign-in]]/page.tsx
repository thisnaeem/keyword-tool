"use client";

import { SignIn } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";

export default function SignInPage() {
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect_url") || "/";

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <SignIn redirectUrl={redirectUrl} />
    </div>
  );
}
