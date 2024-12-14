import asyncio
from websockets import connect
from rich.console import Console
from rich.table import Table
from rich.layout import Layout
from rich.live import Live
from datetime import datetime
import json
import psutil

# Configurações
LOGS_ENDPOINT = "ws://127.0.0.1:8004/logs/ws"

# Gerenciamento de logs
class LogManager:
    def __init__(self):
        self.logs = []
        self.metrics_data = []
        self.total_requests = 0  # Armazena o total de requisições recebido via WS

    async def fetch_logs(self):
        async with connect(LOGS_ENDPOINT) as websocket:
            while True:
                try:
                    log_text = await websocket.recv()
                    data = json.loads(log_text)
                    
                    log_data = data.get("log", {})
                    metrics_data = data.get("metrics", [])
                    total_requests = data.get("total_requests", 0)

                    # Atualiza o total de requisições
                    self.total_requests = total_requests

                    # Se o log_data não estiver vazio, adicionamos à lista de logs
                    if log_data:
                        self.logs.append(log_data)
                        # Mantém apenas os últimos 18 logs
                        if len(self.logs) > 18:
                            self.logs.pop(0)

                    # Atualiza as métricas recebidas
                    self.metrics_data = metrics_data
                    
                except json.JSONDecodeError:
                    print(f"Erro ao decodificar log: {log_text}")
                except Exception as e:
                    print(f"Erro inesperado no WebSocket: {e}")
                    break

def create_dashboard(logs, metrics_data, total_requests):
    # Cálculo de métricas a partir dos logs atuais (opcional, se quiser)
    if logs:
        cpu_values = [l.get("cpu_usage", 0) for l in logs if isinstance(l.get("cpu_usage"), (int, float))]
        mem_values = [l.get("memory_usage", 0) for l in logs if isinstance(l.get("memory_usage"), (int, float))]

        cpu_avg = (sum(cpu_values)/len(cpu_values)) if cpu_values else 0
        mem_avg = (sum(mem_values)/len(mem_values)) if mem_values else 0

        response_times = []
        for l in logs:
            rt = l.get("response_time_ms", 0)
            try:
                rt_float = float(rt)
                response_times.append(rt_float)
            except:
                pass
        avg_response_time = (sum(response_times)/len(response_times)/1000) if response_times else 0.0
    else:
        cpu_avg = 0
        mem_avg = 0
        avg_response_time = 0.0

    # Agora usamos total_requests enviado pelo servidor
    # Tabela de métricas gerais
    table = Table(title="FAST PDF SERVICE - Métricas Gerais", style="cyan")
    table.add_column("Métrica", justify="left")
    table.add_column("Valor", justify="right")
    table.add_row("CPU (Servidor)", f"{cpu_avg:.2f}%")
    table.add_row("Memória (Servidor)", f"{mem_avg:.2f}%")
    table.add_row("Total de Requisições (desde o início)", str(total_requests))
    table.add_row("Tempo Médio (s)", f"{avg_response_time:.2f}")

    # Adiciona as métricas externas na mesma tabela, se existirem

    table.add_row("---- Métricas Por Rota ----", "")
    for m in metrics_data:
        route = m.get("route", "N/A")
        status = m.get("status", "N/A")
        count = m.get("count", "N/A")

        # Determina a cor da linha com base no status
        row_style = None
        if status.isdigit():
            status_code = int(status)
            if 200 <= status_code < 300:
                row_style = "green"
            elif 300 <= status_code < 400:
                row_style = "blue"
            elif 400 <= status_code < 500:
                row_style = "yellow"
            elif 500 <= status_code < 600:
                row_style = "red"

        metric_name = f"Rota: {route} | Status: {status}"
        table.add_row(metric_name, str(count), style=row_style)

    # Tabela de logs
    log_table = Table(title="Logs Detalhados", style="magenta", expand=True)
    log_table.add_column("Timestamp", justify="center", style="dim")
    log_table.add_column("Método", justify="center")
    log_table.add_column("Rota", justify="left")
    log_table.add_column("Status", justify="center")
    log_table.add_column("Tempo (ms)", justify="center")
    log_table.add_column("CPU (%)", justify="center")
    log_table.add_column("Memória (%)", justify="center")
    log_table.add_column("IP", justify="center")
    log_table.add_column("Origem", justify="left")
    log_table.add_column("TenantId", justify="left")

    for l in logs:
        status_str = str(l.get("status", "N/A"))

        # Determina a cor da linha com base no status
        row_style = None
        if status_str.isdigit():
            status_code = int(status_str)
            if 200 <= status_code < 300:
                row_style = "green"
            elif 300 <= status_code < 400:
                row_style = "blue"
            elif 400 <= status_code < 500:
                row_style = "yellow"
            elif 500 <= status_code < 600:
                row_style = "red"

        log_table.add_row(
            l.get("timestamp", "N/A"),
            l.get("method", "N/A"),
            l.get("route", "N/A"),
            status_str,
            f"{l.get('response_time_ms', 'N/A')}",
            f"{l.get('cpu_usage', 'N/A')}",
            f"{l.get('memory_usage', 'N/A')}",
            l.get("ip", "N/A"),
            l.get("referer", "N/A"),
            l.get("tenant_id", "N/A"),
            style=row_style
        )

    # Layout do painel
    layout = Layout()
    layout.split_column(
        Layout(table, name="metrics", ratio=2),
        Layout(log_table, name="logs", ratio=3),
    )

    return layout

async def main():
    console = Console()
    log_manager = LogManager()

    # Inicia a coleta de logs
    asyncio.create_task(log_manager.fetch_logs())

    with Live(console=console, refresh_per_second=2, screen=True) as live:
        while True:
            dashboard = create_dashboard(log_manager.logs, log_manager.metrics_data, log_manager.total_requests)
            live.update(dashboard)
            await asyncio.sleep(1)

if __name__ == "__main__":
    asyncio.run(main())
