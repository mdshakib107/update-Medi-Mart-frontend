/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginUser, reCaptchaTokenVerification } from "@/services/AuthService";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeClosed } from "lucide-react";
import Link from "next/link";
import {
  // useRouter,
  useSearchParams,
} from "next/navigation";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { loginSchema } from "./loginValidation";

export default function LoginForm() {
  //* react hook form
  const form = useForm({
    resolver: zodResolver(loginSchema),
  });

  //* toggle password
  const [showPassword, setShowPassword] = useState(false);

  const [reCaptchaStatus, setReCaptchaStatus] = useState(false);

  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirectPath");
  // const router = useRouter();

  const {
    formState: { isSubmitting },
  } = form;

  const handleReCaptcha = async (value: string | null) => {
    try {
      const res = await reCaptchaTokenVerification(value!);
      if (res?.success) {
        setReCaptchaStatus(true);
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    // reCaptchaStatus check
    if (!reCaptchaStatus) {
      toast.error("Please complete the reCAPTCHA first.");
      return; // Block submission
    }

    try {
      const res = await loginUser(data);
      if (res?.success) {
        toast.success(res?.message);
        if (typeof window !== "undefined") {
          localStorage.setItem("authToken", res?.token);
        }
        console.log(res?.token);
        window.location.href = redirect || "/";

        // router.push(redirect || "/");
      } else {
        toast.error(res?.message);
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  //! Function to fill credentials
  const fillCredentials = (type: "admin" | "user") => {
    const credentials = {
      admin: {
        email: "mina@mail.com",
        password: "1234",
      },
      user: {
        email: "nina@mail.com",
        password: "1234",
      },
    };

    form.setValue("email", credentials[type].email);
    form.setValue("password", credentials[type].password);
  };

  return (
    <div className="border-2 border-gray-300 rounded-xl flex-grow max-w-md w-full p-5 space-y-6">
      {/* logo */}

      <div className="text-center ">
        <div>
          <h1 className="text-4xl font-extrabold text-center mb-2 p-2 bg-gradient-to-r from-[#4F46E5] to-rose-500 bg-clip-text text-transparent tracking-wide">
            Login
          </h1>
          <p className="text-sm text-[#4F46E5]">Welcome back dear user!</p>
        </div>
      </div>

      {/* Buttons to fill credentials */}
      <div className="flex justify-around space-x-2">
        <button
          className=" mt-4 w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-indigo-500 hover:to-blue-600 text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-0.5 active:scale-95"
          onClick={() => fillCredentials("admin")}
        >
          Admin Credentials
        </button>
        <button
          className=" mt-4 w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-indigo-500 hover:to-blue-600 text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-0.5 active:scale-95"
          onClick={() => fillCredentials("user")}
        >
          User Credentials
        </button>
      </div>

      {/* form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} value={field.value || ""} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      {...field}
                      value={field.value || ""}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-600"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? <Eye /> : <EyeClosed />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex mt-3 w-full">
            <ReCAPTCHA
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_CLIENT_KEY!}
              onChange={handleReCaptcha}
              onExpired={() => setReCaptchaStatus(false)}
              className="mx-auto"
            />
          </div>

          {/* <CustomButton
            disabled={reCaptchaStatus ? false : true}
            type="submit"
            className="mt-5! w-full"
            textName={isSubmitting ? "Logging...." : "Login"}
          /> */}
          <div className="text-center">
            <button
              disabled={!reCaptchaStatus}
              className={`mt-4 w-full text-white font-semibold px-6 py-2 rounded-lg shadow-md transition-all duration-300 ease-in-out transform
      ${
        reCaptchaStatus
          ? "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-indigo-500 hover:to-blue-600 hover:shadow-xl hover:-translate-y-0.5 active:scale-95"
          : "bg-gray-400 cursor-not-allowed opacity-50"
      }
    `}
              type="submit"
            >
              {isSubmitting ? "Logging..." : "Login"}
            </button>
          </div>
        </form>
      </Form>
      <p className="text-sm text-gray-600 text-center my-3">
        Do not have any account?
        <Link href="/register" className="text-[#4F46E5] ml-2">
          Register
        </Link>
      </p>
      <p className="text-sm text-gray-600 text-center my-3">
        If you come here by mistack Plase go
        <Link href="/" className="text-[#4F46E5] ml-2">
          Home Page
        </Link>
      </p>
    </div>
  );
}
