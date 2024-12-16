"use client";
import React, { startTransition, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AuthCard } from "./AuthCard";
import { FormError } from "../form/FormError";
import { FormWarning } from "../form/FormWarning";
import { FormSuccess } from "../form/FormSuccess";
import { ResetPasswordSchema } from "@/schemas";

import { resetPassword } from "@/actions/reset-password";
import router from "next/router";

export const ResetPasswordForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error" | "warning";
    message: string | null;
  }>({ type: "success", message: null });

  type ResetPasswordSchemaType = z.infer<typeof ResetPasswordSchema>;

  const form = useForm<ResetPasswordSchemaType>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: ResetPasswordSchemaType) {
    setIsLoading(true);
    setFeedback({ type: "warning", message: "Processing your reset request..." });
    
    startTransition(() => {
      resetPassword(values).then((result) => {
        if (result.error) {
          setFeedback({ type: "error", message: result.error });
        } else {
          setFeedback({ type: "success", message: result.success || "Reset password request sent" });
        }
        setIsLoading(false);
        if (result.redirect) {
          setTimeout(() => {
            router.push(result.redirect);
          }, 3000);
        }
      }).catch((error) => {
        // Handle any unexpected errors
        setFeedback({ type: "error", message: "An unexpected error occurred" });
        setIsLoading(false);
      });
    });

  }

  return (
    <AuthCard title="Reset Password" description="Enter your email to reset your password">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    placeholder="Enter your email"
                    {...field}
                    className="transition-all duration-300 ease-in-out hover:border-primary focus:border-primary focus:ring-primary"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Feedback Section */}
          {feedback.message && feedback.type === "error" && (
            <FormError message={feedback.message} />
          )}
          {feedback.message && feedback.type === "warning" && (
            <FormWarning message={feedback.message} />
          )}
          {feedback.message && feedback.type === "success" && (
            <FormSuccess message={feedback.message} />
          )}

          <Button
            type="submit"
            className="w-full bg-[#8A2BE2] hover:bg-[#7B27CC]"
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Reset Password"}
          </Button>
        </form>
      </Form>

      <div className="mt-4 text-center text-sm">
        Remember your password?{" "}
        <Link href="/auth/login" className="text-primary hover:underline">
          Back to Login
        </Link>
      </div>
    </AuthCard>
  );
};