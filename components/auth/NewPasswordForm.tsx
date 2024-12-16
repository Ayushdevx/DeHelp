"use client";
import React, { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { AuthCard } from "./AuthCard";
import {
  Form,
  FormField,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "./PasswordInput";
import { FormError } from "../form/FormError";
import { FormWarning } from "../form/FormWarning";
import { FormSuccess } from "../form/FormSuccess";
import { NewPasswordSchema } from "@/schemas";
import {newPassword } from "@/actions/new-password";


export const NewPasswordForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [feedback, setFeedback] = useState<{
    type: "success" | "error" | "warning";
    message: string | null;
  }>({ type: "success", message: null });

  const router = useRouter();

  type NewPasswordSchemaType = z.infer<typeof NewPasswordSchema>;

  const form = useForm<NewPasswordSchemaType>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = async (values: NewPasswordSchemaType) => {
    setIsLoading(true);
    setFeedback({
      type: "warning",
      message: "Processing your request...",
    });
    startTransition(() => {
      newPassword(values, token).then((result) => {
        if (result?.error) {
          setFeedback({ type: "error", message: result.error });
        } else {
          setFeedback({ type: "success", message: result?.success || "Logged in successfully" });
        }
        if (result.redirect) {
          setTimeout(() => {
            router.push(result.redirect);
          }, 3000);
        }
      });
      setIsLoading(false);
    });
  };

  return (
    <AuthCard title="Reset Password" description="Enter your new password">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <PasswordInput
                field={field}
                label="New Password"
                placeholder="Enter new password"
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
                label="Confirm New Password"
                placeholder="Confirm new password"
                showPassword={showConfirmPassword}
                onToggleVisibility={() => setShowConfirmPassword(!showConfirmPassword)}
              />
            )}
          />

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
            {isLoading ? "Resetting..." : "Reset Password"}
          </Button>
        </form>
      </Form>
    </AuthCard>
  );
};
