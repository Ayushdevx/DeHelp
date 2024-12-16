import { LoginForm } from "@/components/auth/LoginForm";
import { Suspense } from "react";
import { BeatLoader } from "react-spinners";

export default function LoginPage() {
  return (    
  <Suspense fallback={<BeatLoader color="#8A2BE2" />}>
    <LoginForm />
  </Suspense>
  );
}