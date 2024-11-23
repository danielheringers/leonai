"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";

interface Persona {
  id: string;
  name: string;
  tokenUsage: number;
  outputTokens: number;
  model: string;
  responsesGenerated: number;
  isActive: boolean;
}

export function PersonaList() {
  // Este estado deve ser gerenciado por um estado global ou obtido de uma API em uma aplicação real
  const [personas, setPersonas] = useState<Persona[]>([
    {
      id: "1",
      name: "Assistente Geral",
      tokenUsage: 50000,
      outputTokens: 30000,
      model: "GPT-4",
      responsesGenerated: 1200,
      isActive: true,
    },
    {
      id: "2",
      name: "Especialista em Marketing",
      tokenUsage: 30000,
      outputTokens: 20000,
      model: "GPT-3.5",
      responsesGenerated: 800,
      isActive: true,
    },
    {
      id: "3",
      name: "Analista de Dados",
      tokenUsage: 40000,
      outputTokens: 25000,
      model: "GPT-4",
      responsesGenerated: 950,
      isActive: false,
    },
    {
      id: "4",
      name: "Suporte Técnico",
      tokenUsage: 25000,
      outputTokens: 15000,
      model: "GPT-3.5",
      responsesGenerated: 1500,
      isActive: true,
    },
    {
      id: "5",
      name: "Consultor Financeiro",
      tokenUsage: 35000,
      outputTokens: 22000,
      model: "GPT-4",
      responsesGenerated: 600,
      isActive: true,
    },
  ]);

  const handleToggleActive = (id: string) => {
    setPersonas(
      personas.map((persona) =>
        persona.id === id
          ? { ...persona, isActive: !persona.isActive }
          : persona
      )
    );
  };

  const calculateCost = (inputTokens: number, outputTokens: number) => {
    const inputCost = inputTokens * 0.000015;
    const outputCost = outputTokens * 0.000058;
    return (inputCost + outputCost).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lista de Personas</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Uso de Tokens</TableHead>
              <TableHead>Custo</TableHead>
              <TableHead>Modelo</TableHead>
              <TableHead>Respostas Geradas</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Ação</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {personas.map((persona) => (
              <TableRow key={persona.id}>
                <TableCell className="font-medium">{persona.name}</TableCell>
                <TableCell>{persona.tokenUsage.toLocaleString()}</TableCell>
                <TableCell>
                  {calculateCost(persona.tokenUsage, persona.outputTokens)}
                </TableCell>
                <TableCell>{persona.model}</TableCell>
                <TableCell>
                  {persona.responsesGenerated.toLocaleString()}
                </TableCell>
                <TableCell>
                  <Badge variant={persona.isActive ? "default" : "destructive"}>
                    {persona.isActive ? "Ativo" : "Desativado"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Switch
                    checked={persona.isActive}
                    onCheckedChange={() => handleToggleActive(persona.id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
