"use server";

import bcrypt from "bcrypt";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { AuthError } from "next-auth";

import { signIn } from "@/auth";
import { createUser, getUser } from "@/services/user.service";

const registerSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: z
    .string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
  confirmPassword: z
    .string({ required_error: "Confirm Password is required" })
    .min(1, "Confirm Password is required"),
});

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    console.log("formData", formData);
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

// left off: do PG stuff here
// check out the nextjs-dashboard example app for form validation
export type RegisterFormState = {
  errors?: {
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
  };
  message?: string | null;
};

export async function register(
  prevState: RegisterFormState,
  formData: FormData
) {
  try {
    const validatedFields = registerSchema.safeParse({
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    });

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
      console.log("validated", validatedFields.error);
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: "Missing Fields.",
      };
    }

    const { email, password } = validatedFields.data;

    const user = await getUser(email);
    if (user) {
      return { message: `User with email ${email} already exists.` };
    }
    await bcrypt.hash(password, 10, async (_err, hash) => {
      await createUser(email, hash);
    });
  } catch (e: any) {
    return { message: "Something went wrong" };
  }

  revalidatePath("/");
  redirect("/");
}
