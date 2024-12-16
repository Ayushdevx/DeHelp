"use client";

import React, { useCallback, useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { BeatLoader } from "react-spinners";
import { AuthCard } from "./AuthCard";
import { FormError } from "../form/FormError";
import { FormSuccess } from "../form/FormSuccess";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { newVerification } from "@/actions/new-verification";

const NewVerificationFormContent = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (success || error) return;

    if (!token) {
      setError("Missing verification token!");
      return;
    }

    newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError("Something went wrong!");
      });
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <AuthCard 
      title="Email Verification" 
      description="Confirming your verification"
    >
      <div className="flex items-center w-full justify-center py-2">
        {!success && !error && (
          <BeatLoader color="#8A2BE2" />
        )}
        <FormError message={error} />
        <FormSuccess message={success} />
      </div>
      <div className="mt-2 space-y-2">
        <Button 
          variant="outline" 
          asChild 
          className="w-full dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          <Link href="/auth/login">
            Back to Login
          </Link>
        </Button>
      </div>
    </AuthCard>
  );
};

export const NewVerificationForm = () => {
  return (
    <Suspense fallback={<BeatLoader color="#8A2BE2" />}>
      <NewVerificationFormContent />
    </Suspense>
  );
};