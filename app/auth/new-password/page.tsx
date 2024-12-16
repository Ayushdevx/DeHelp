// app/auth/new-password/page.tsx

import { NewPasswordForm } from "@/components/auth/NewPasswordForm";
import { Suspense } from "react";
import { BeatLoader } from "react-spinners";

export default function NewPasswordPage() {
  return (  
  <Suspense fallback={<BeatLoader color="#8A2BE2" />}>
     <NewPasswordForm />
  </Suspense>
  );

}