import { SignInButton } from "@clerk/nextjs";
import { IconLock, IconUser, IconBrandGoogle } from "@tabler/icons-react";

export default function UnauthorizedState() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] p-8">
      <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
        <div className="text-center space-y-4">
          <div className="inline-flex p-4 bg-red-50 dark:bg-red-900/20 rounded-full">
            <IconLock className="w-8 h-8 text-red-500 dark:text-red-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Access Restricted
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Please sign in to access the full features
          </p>
        </div>

        <div className="space-y-4">
          <SignInButton
            forceRedirectUrl={
              typeof window !== "undefined" ? window.location.origin : ""
            }
            mode="modal"
          >
            <button className="w-full flex items-center justify-center gap-2 px-6 py-3 text-white bg-[#97ef39] hover:bg-[#88d633] rounded-lg transition-all duration-200 shadow-md hover:shadow-lg">
              <IconUser className="w-5 h-5" />
              <span>Sign In with Email</span>
            </button>
          </SignInButton>

          <SignInButton
            forceRedirectUrl={
              typeof window !== "undefined" ? window.location.origin : ""
            }
            mode="modal"
          >
            <button className="w-full flex items-center justify-center gap-2 px-6 py-3 text-gray-700 dark:text-white bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 border border-gray-300 dark:border-gray-600 rounded-lg transition-all duration-200">
              <IconBrandGoogle className="w-5 h-5 text-red-500" />
              <span>Continue with Google</span>
            </button>
          </SignInButton>
        </div>

        <div className="pt-4 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}

