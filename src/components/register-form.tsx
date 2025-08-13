"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { ShieldAlert } from "lucide-react";
import { register, RegisterFormState } from "@/lib/actions/user.actions";

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const [state, formAction, isPending] = useActionState(register, {
    message: null,
    errors: {},
  } as RegisterFormState);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Create your account</CardTitle>
          <CardDescription>
            Enter your email and credentials below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  aria-describedby="email-error"
                />
                <FieldError state={state} fieldName="email" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  aria-describedby="password-error"
                />
                <FieldError state={state} fieldName="password" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  aria-describedby="confirmPassword-error"
                />
                <FieldError state={state} fieldName="confirmPassword" />
              </div>
              <div className="flex flex-col gap-3">
                <Button
                  type="submit"
                  className="w-full"
                  aria-disabled={isPending}
                >
                  Register
                </Button>
                {/* <Button variant="outline" className="w-full">
                  Login with Google
                </Button> */}
              </div>
            </div>
            {state.message && (
              <div className="flex justify-center gap-1 mt-5">
                <ShieldAlert className="h-5 w-5 text-red-500" />
                <p className="text-sm text-red-500">{state.message}</p>
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

function FieldError({
  fieldName,
  state,
}: {
  fieldName: "email" | "password" | "confirmPassword";
  state: RegisterFormState;
}) {
  if (state?.errors?.[fieldName]) {
    return (
      <div id={`${fieldName}-error`} aria-live="polite" aria-atomic="true">
        {state.errors[fieldName].map((error: string) => (
          <p className="text-sm text-red-500" key={error}>
            {error}
          </p>
        ))}
      </div>
    );
  }
}

/*

'(state: string | undefined, formData: FormData) => Promise<{ errors: { email?: string[] | undefined; password?: string[] | undefined; confirmPassword?: string[] | undefined; }; message: string; } | { ...; } | undefined>' 
'(state: { errors: { email?: string[] | undefined; password?: string[] | undefined; confirmPassword?: string[] | undefined; }; message: string; } | { message: string; errors?: undefined; } | undefined) => { ...; } | ... 2 more ... | undefined'.
*/
