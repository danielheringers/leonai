import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | LeonAI",
  description: "Faça login para acessar a plataforma LeonAI",
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen">{children}</div>;
}
