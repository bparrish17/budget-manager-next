"use server";

import { AuthError } from "next-auth";
import { z } from "zod";
import postgres from "postgres";
import { signIn } from "@/auth";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

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
    .min(1, "Confirm Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
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

export async function register(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    const validatedFields = registerSchema.safeParse({
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    });
    console.log("authorizing...", validatedFields, {
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    });

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
      console.log('validated', validatedFields.error)
      return "Missing Fields. Failed to Register User."
    }

    const { email, password } = validatedFields.data;

    return 'Hello world'

    // const user = await getUser(email);
    // if (user) {
    //   return `User with email ${email} already exists.`;
    // }
    // await bcrypt.hash(password, 10, async (err, hash) => {
    //   await createUser(email, hash);
    //   revalidatePath("/");
    //   redirect("/");
    // });
  } catch (e: any) {
    return "Something went wrong"
  }
}
