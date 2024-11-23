"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { ModeToggle } from "../DarkModeToggle";

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      const result = await signIn("google", {
        callbackUrl: "/dashboard",
        redirect: false,
      });

      if (result?.error) {
        toast({
          title: "Erro de Login",
          description: "Ocorreu um erro ao fazer login. Tente novamente.",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Erro de Conexão",
        description: "Erro ao conectar com o Google. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>
            Entre para acessar a plataforma LeonAI.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex gap-6 justify-between">
          <Button
            onClick={handleGoogleLogin}
            className="w-full h-12 text-lg"
            disabled={isLoading}
          >
            {isLoading ? (
              <motion.div
                className="w-5 h-5 border-t-2 rounded-full animate-spin"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            ) : (
              <>
                <FcGoogle className="mr-2 h-5 w-5" />
                Entrar com Google
              </>
            )}
          </Button>
          <ModeToggle />
        </CardContent>
        <CardFooter className="justify-center">
          <p className="text-sm">
            Ao entrar, você concorda com nossos{" "}
            <a href="#" className="underline">
              Termos de Serviço
            </a>{" "}
            e{" "}
            <a href="#" className="underline">
              Política de Privacidade
            </a>
            .
          </p>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
