"use client";

import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "./PasswordInput";
import { AuthCard } from "./AuthCard";
import { SignInOption } from "./SignInOption";
import { FormError } from "../form/FormError";
import { FormSuccess } from "../form/FormSuccess";
import { FormWarning } from "../form/FormWarning";

import { SignupSchema } from "@/schemas";
import { signup } from "@/actions/signup";

export const SignupForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState<{
    type: "success" | "error" | "warning";
    message: string | null;
  }>({ type: "success", message: null });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  type SignupSchemaType = z.infer<typeof SignupSchema>;

  const form = useForm<SignupSchemaType>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  

  const preventPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    setFeedback({
      type: "warning",
      message: "Copy-paste is disabled for security reasons",
    });
  };

  async function onSubmit(values: SignupSchemaType) {

    setIsLoading(true);
    startTransition(() => {
      signup(values).then((result) => {
        if (result.error) {
          setFeedback({ type: "error", message: result.error });
        } else {
          setFeedback({ type: "success", message: "Email Verification Sent. Please check your inbox." });
        }
      });
      setIsLoading(false);
    });}

  return (
    <AuthCard title="Sign Up" description="Join our community of Self Help Groups">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your name"
                    {...field}
                    className="transition-all duration-300 ease-in-out hover:border-primary focus:border-primary focus:ring-primary"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your email"
                    {...field}
                    className="transition-all duration-300 ease-in-out hover:border-primary focus:border-primary focus:ring-primary"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <PasswordInput
                field={field}
                label="Password"
                placeholder="Create a password"
                showPassword={showPassword}
                onToggleVisibility={() => setShowPassword(!showPassword)}
              />
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <PasswordInput
                field={field}
                label="Confirm Password"
                placeholder="Confirm your password"
                showPassword={showConfirmPassword}
                onToggleVisibility={() => setShowConfirmPassword(!showConfirmPassword)}
                onPaste={preventPaste}
              />
            )}
          />
          {/* Feedback Section */}
          {feedback.message && feedback.type === "error" && (
            <FormError message={feedback.message} />
          )}
          {feedback.message && feedback.type === "success" && (
            <FormSuccess message={feedback.message} />
          )}
          {feedback.message && feedback.type === "warning" && (
            <FormWarning message={feedback.message} />
          )}

          <Button
            type="submit"
            className="w-full bg-[#8A2BE2] hover:bg-[#7B27CC]"
            disabled={isLoading}
          >
            {isLoading ? "Creating Account..." : "Sign Up"}
          </Button>
        </form>
      </Form>

      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t"></span>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-gray-500 dark:bg-gray-800">
            Or continue with
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <SignInOption
          provider="google"
          variant="outline"
        />
        <SignInOption
          provider="github"
          variant="outline"
        />
      </div>

      <div className="mt-4 text-center text-sm">
        Already have an account?{" "}
        <Link href="/auth/login" className="text-primary hover:underline">
          Login
        </Link>
      </div>
    </AuthCard>
  );
  };
