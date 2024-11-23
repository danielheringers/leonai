import { LoginForm } from "@/components/LoginForm";
import { WelcomeAnimation } from "@/components/WelcomeAnimation";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const session = await getServerSession();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="relative w-full h-screen">
      <WelcomeAnimation />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="z-20">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
