"use client";

import React from "react";
import { useState } from "react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaFacebook } from "react-icons/fa";
import ButtonLink from "./ButtonLink";
import { register, signIn } from "@/app/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/store/store";

interface AuthFormProps {
  type: "signin" | "register";
}

export default function AuthForm({ type }: AuthFormProps) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSeller, setIsSeller] = useState(false);

  const router = useRouter();

  const resetFields = () => {
    setUsername("");
    setEmail("");
    setPassword("");
    setIsSeller(false);
  };
  const { checkAuthStatus, isAuthenticatedState, signIn } = useAppStore();

  React.useEffect(() => {
    if (isAuthenticatedState) {
      router.push("/");
    }
  }, [isAuthenticatedState, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (type === "signin") {
      signIn({ email, password });
    } else {
      console.log("Registering:", {
        username,
        email,
        password,
        isSeller,
      });

      try {
        const response = await register({
          username,
          email,
          password,
          is_seller: isSeller,
        });
        if (response.success) {
          toast.success("Registered successfully, Please signin");
          router.push("/signin");
        } else {
          const errorResponse = response.error as any;
          const errors = errorResponse.errors;
          if (errors && Array.isArray(errors)) {
            errors.forEach((error) => {
              toast.error(error);
            });
          }
        }
      } catch (error) {
        console.error("Registration error:", error);
        toast.error("An error occurred during registration.");
      }
    }
  };

  const headerText =
    type === "signin" ? "Sign in to continue" : "Create Your Account";
  const buttonText = type === "signin" ? "Sign in" : "Register";

  return (
    <div className="max-w-md mx-auto py-8 px-4">
      <h1 className="text-2xl font-medium ">{headerText}</h1>
      {type === "register" && (
        <p className="text-gray-600 text-sm">Registration is easy.</p>
      )}

      <form onSubmit={handleSubmit} className="mt-6">
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500"
            required
          />
        </div>

        {type === "register" && (
          <>
            {" "}
            {/* Use a fragment to group multiple elements */}
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium mb-1"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500"
                required
              />
            </div>
          </>
        )}

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500"
            required
          />
        </div>

        {/* Register as Seller Checkbox - Moved Here */}
        {type === "register" && (
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="isSeller"
              checked={isSeller}
              onChange={(e) => setIsSeller(e.target.checked)}
              className="mr-2 h-4 w-4 text-black border-gray-300 rounded focus:ring-black"
            />
            <label htmlFor="isSeller" className="text-sm font-medium">
              Register me as a seller
            </label>
          </div>
        )}

        <div className="flex justify-between items-center mb-6">
          {/* <div className="flex items-center">
            <div
              className={`w-5 h-5 border ${
                staySignedIn ? "bg-black border-black" : "border-gray-500"
              } rounded flex items-center justify-center cursor-pointer`}
              onClick={() => setStaySignedIn(!staySignedIn)}
            >
              {staySignedIn && <Check className="w-4 h-4 text-white" />}
            </div>
            <label
              htmlFor="stay-signed-in"
              className="ml-2 text-sm cursor-pointer"
              onClick={() => setStaySignedIn(!staySignedIn)}
            >
              Stay signed in
            </label>
          </div> */}

          {type === "signin" && (
            <Link
              href="#"
              className="text-xsm text-gray-700 underline! font-light underline-offset-2"
            >
              Forgot your password?
            </Link>
          )}
        </div>
        {type === "register" && (
          <p className="text-sm text-gray-700 mb-4">
            By clicking {buttonText}, Continue with Google, Facebook, or Apple,
            you agree to Dynamite&apos;s{" "}
            <Link href="#" className="text-[#4d6bc6] underline!">
              Terms of Use
            </Link>{" "}
            and{" "}
            <Link href="#" className="text-[#4d6bc6] underline!">
              Privacy Policy
            </Link>
            .
          </p>
        )}

        <ButtonLink type="submit" btnClassName="w-full">
          {buttonText}
        </ButtonLink>
      </form>

      {/* Trouble Signing In Link (common to both, or could be specific to signin) */}
      {type === "signin" && (
        <div className="mt-4 text-center">
          <Link
            href="#"
            className="text-xsm text-gray-700 underline! font-light underline-offset-2"
          >
            Trouble signing in?
          </Link>
        </div>
      )}

      {/* OR Divider (common to both) */}
      <div className="flex items-center my-6">
        <div className="flex-grow h-px bg-gray-300"></div>
        <span className="px-4 text-sm text-gray-500">OR</span>
        <div className="flex-grow h-px bg-gray-300"></div>
      </div>

      {/* Social Sign-in Buttons (common to both) */}
      <div className="space-y-3">
        <ButtonLink btnClassName="w-full gap-3 border-gray-300" outline>
          <FcGoogle size={24} />
          Continue with Google
        </ButtonLink>

        <ButtonLink btnClassName="w-full gap-3 border-gray-300" outline>
          <FaFacebook fill="#1877F2" size={24} />
          Continue with Facebook
        </ButtonLink>

        <ButtonLink btnClassName="w-full gap-3 border-gray-300" outline>
          <FaApple size={24} />
          Continue with Apple
        </ButtonLink>
      </div>

      {/* Terms and Privacy Text (common to both) */}
      <div className="mt-6 text-sm text-gray-700">
        {type === "signin" && (
          <p>
            By clicking {buttonText}, Continue with Google, Facebook, or Apple,
            you agree to Dynamite&apos;s{" "}
            <Link href="#" className="text-black hover:underline">
              Terms of Use
            </Link>{" "}
            and{" "}
            <Link href="#" className="text-black hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
        )}
        <p className="mt-2">
          Dynamite may send you communications; you may change your preferences in
          your account settings. We&apos;ll never post without your permission.
        </p>
      </div>
    </div>
  );
}
