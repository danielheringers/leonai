"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";

interface ClientUsage {
  id: string;
  name: string;
  totalUsage: number;
  mostUsedPersona: string;
  topQuestions: string[];
  averageResponseTime: number;
  satisfactionRate: number;
  lastActive: string;
  totalConversations: number;
}

const COST_PER_INPUT_TOKEN = 0.000015;
const COST_PER_OUTPUT_TOKEN = 0.000058;

export function ClientUsageMetrics() {
  const [clientUsage, setClientUsage] = useState<ClientUsage[]>([
    {
      id: "1",
      name: "Empresa A",
      totalUsage: 5000,
      mostUsedPersona: "Assistente Geral",
      topQuestions: [
        "Como posso melhorar minha estratégia de marketing?",
        "Quais são as tendências atuais no meu setor?",
        "Como otimizar meu processo de vendas?",
      ],
      averageResponseTime: 2.3,
      satisfactionRate: 92,
      lastActive: "2023-11-22T14:30:00Z",
      totalConversations: 150,
    },
    {
      id: "2",
      name: "Empresa B",
      totalUsage: 3500,
      mostUsedPersona: "Especialista em Marketing",
      topQuestions: [
        "Como criar uma campanha viral?",
        "Quais são as melhores práticas de SEO?",
        "Como medir o ROI das minhas campanhas de marketing?",
      ],
      averageResponseTime: 1.8,
      satisfactionRate: 88,
      lastActive: "2023-11-22T16:45:00Z",
      totalConversations: 120,
    },
    {
      id: "3",
      name: "Empresa C",
      totalUsage: 4200,
      mostUsedPersona: "Analista de Dados",
      topQuestions: [
        "Como interpretar esses dados de vendas?",
        "Quais métricas devo acompanhar para o meu negócio?",
        "Como prever tendências futuras com base nesses dados?",
      ],
      averageResponseTime: 3.1,
      satisfactionRate: 95,
      lastActive: "2023-11-22T10:15:00Z",
      totalConversations: 180,
    },
    {
      id: "4",
      name: "Empresa D",
      totalUsage: 2800,
      mostUsedPersona: "Suporte Técnico",
      topQuestions: [
        "Como resolver problemas de conexão com o servidor?",
        "Quais são as etapas para atualizar o software?",
        "Como configurar as permissões de usuário?",
      ],
      averageResponseTime: 1.5,
      satisfactionRate: 90,
      lastActive: "2023-11-22T09:00:00Z",
      totalConversations: 200,
    },
    {
      id: "5",
      name: "Empresa E",
      totalUsage: 3900,
      mostUsedPersona: "Consultor Financeiro",
      topQuestions: [
        "Como otimizar o fluxo de caixa da empresa?",
        "Quais são as melhores opções de investimento para o próximo trimestre?",
        "Como reduzir custos operacionais?",
      ],
      averageResponseTime: 2.7,
      satisfactionRate: 93,
      lastActive: "2023-11-22T13:20:00Z",
      totalConversations: 140,
    },
  ]);

  const calculateCost = (totalUsage: number) => {
    const inputTokens = totalUsage / 2;
    const outputTokens = totalUsage / 2;
    const cost =
      inputTokens * COST_PER_INPUT_TOKEN + outputTokens * COST_PER_OUTPUT_TOKEN;
    return cost.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("pt-BR", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Detalhes de Uso por Cliente</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>Uso Total</TableHead>
                <TableHead>Custo</TableHead>
                <TableHead>Persona Mais Usada</TableHead>
                <TableHead>Tempo Médio de Resposta</TableHead>
                <TableHead>Taxa de Satisfação</TableHead>
                <TableHead>Última Atividade</TableHead>
                <TableHead>Total de Conversas</TableHead>
                <TableHead>Perguntas Frequentes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clientUsage.map((client) => (
                <TableRow key={client.id}>
                  <TableCell className="font-medium">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className="truncate max-w-[150px]">
                          {client.name}
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{client.name}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                  <TableCell>{client.totalUsage.toLocaleString()}</TableCell>
                  <TableCell>{calculateCost(client.totalUsage)}</TableCell>
                  <TableCell>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className="truncate max-w-[150px]">
                          <Badge variant="outline" className="p-1">
                            {client.mostUsedPersona}
                          </Badge>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{client.mostUsedPersona}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                  <TableCell align="center">
                    {client.averageResponseTime.toFixed(1)}s
                  </TableCell>
                  <TableCell align="center">
                    {client.satisfactionRate}%
                  </TableCell>
                  <TableCell>{formatDate(client.lastActive)}</TableCell>
                  <TableCell align="center">
                    {client.totalConversations}
                  </TableCell>
                  <TableCell>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className="truncate max-w-[200px]">
                          {client.topQuestions[0]}
                        </TooltipTrigger>
                        <TooltipContent>
                          <ul className="list-disc pl-4">
                            {client.topQuestions.map((question, index) => (
                              <li key={index} className="text-sm">
                                {question}
                              </li>
                            ))}
                          </ul>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
