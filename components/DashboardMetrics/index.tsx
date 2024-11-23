import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, MessageSquare, Users, Zap } from "lucide-react";

export function DashboardMetrics() {
  const calculateCost = (inputTokens: number, outputTokens: number) => {
    const inputCost = inputTokens * 0.000015;
    const outputCost = outputTokens * 0.000058;
    return inputCost + outputCost;
  };

  // Estes dados devem vir de uma API ou estado global na aplicação real
  const metrics = {
    tokenUsage: 1234567,
    outputTokens: 987654,
    personasCreated: 15,
    totalResponses: 9876,
    totalCost: calculateCost(1234567, 987654),
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Uso de Tokens</CardTitle>
          <Zap className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {metrics.tokenUsage.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground">
            Tokens utilizados este mês
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Personas Criadas
          </CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{metrics.personasCreated}</div>
          <p className="text-xs text-muted-foreground">Total de personas</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Respostas Geradas
          </CardTitle>
          <MessageSquare className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {metrics.totalResponses.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground">Total de respostas</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Custo Total</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {metrics.totalCost.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </div>
          <p className="text-xs text-muted-foreground">Gasto total em tokens</p>
        </CardContent>
      </Card>
    </div>
  );
}
