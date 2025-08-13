import { RegisterForm } from "@/components/register-form";
import { Suspense } from "react";

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-muted">
      <div className="w-full max-w-sm">
        <Suspense>
          <RegisterForm />
        </Suspense>
      </div>
    </div>
  );
}
