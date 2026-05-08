import { LendsqrLogo } from "@/assets/Icons";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  remember: z.boolean().default(false),
});

type LoginFormValues = z.infer<typeof loginSchema>;
type LoginFormInput = z.input<typeof loginSchema>;

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInput, unknown, LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    } satisfies LoginFormInput,
  });

  const onSubmit = async () => {
    await new Promise((resolve) => setTimeout(resolve, 450));
    navigate("/users");
  };

  return (
    <main className="login">
      <section
        className="login__visual"
        aria-label="Lendsqr welcome illustration"
      >
        <LendsqrLogo className="login__brand-logo" />
        <div className="login__illustration" aria-hidden="true">
          <img src="/login-illustration.webp" alt="" />
        </div>
      </section>
      <section className="login__panel">
        <LendsqrLogo className="login__mobile-logo" />
        <form
          className="login__form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <h1>Welcome!</h1>
          <p>Enter details to login.</p>
          <Input
            label="Email"
            type="email"
            autoComplete="email"
            error={errors.email?.message}
            {...register("email")}
          />
          <div className="password-field">
            <Input
              label="Password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              error={errors.password?.message}
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
            >
              {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
              <span>{showPassword ? "Hide" : "Show"}</span>
            </button>
          </div>
          <div className="login__meta">
            <a href="#forgot-password">Forgot password?</a>
          </div>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Logging in..." : "Log in"}
          </Button>
        </form>
      </section>
    </main>
  );
}
