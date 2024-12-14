from locust import HttpUser, TaskSet, task, between
import json
import random

# Payload base
PAYLOAD_TEMPLATE = [
  {
    "billing": {
      "billing_internal_number": "100115",
      "buyer": {
        "knowledgment_of_debt": "S",
        "address": {
          "city": "Belo Horizonte",
          "complement": "Não informado",
          "neighborhood": "123456789012345",
          "number": 123,
          "phone": "1234567890",
          "postal_code": "1",
          "state": "MG",
          "street_name": "Rua Ulhoa Cintra"
        },
        "cpf_cnpj": "14789524663",
        "name": "Selton Melo"
      },
      "bank_slip_type": "DV",
      "billing_id": "d3a3bf6f-2a97-4eb8-adef-d3b939842c4d",
      "billing_provider_number": "13002",
      "calendar": {
        "due_date": "28/07/2025",
        "expiration_date": "29/07/2025",
        "expedition_date": "24/09/2024"
      },
      "total": "10.00",
      "messages": []
    },
    "erp_id": "100115",
    "payment_info": {
      "bar_code": "000959611000000100003281872351404402978413256000",
      "digitable_line": "000903281872352140440297284132560008596110000001000",
      "qr_code_pix": "eyJpZCI6ICJkM2EzYmY2Zi0yYTk3LTRlYjgtYWRlZi1kM2I5Mzk4NDJjNGQiLCAiYW1vdW50IjogIjEwMDAiLCAiaXRlbXMiOiBbXX0=",
      "qr_code_url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAeoAAAHqAQAAAADjFjCXAAAERklEQVR4nO2dXWrrSBCFT40EfmyBF5ClSDvIkrKm7EC9FC/AID0KWpx56N/kchmwNCTGpx6UIPdHx1BU9akqKUYcMP/PERoQLly4cOHChQsXfi5uyXoAq1l7bwDgrYdNaw+b1rx0Om934S+KjyTJBYB/I+s9jAtgH9wsAx1J5iW/448X/mx4n36uAzB+AjbeDPTv9/gB/bDEBQQ2I1bAgC6cs7tw4QAAP3QE0DHm2vHWg/PawyZ0tOl/3l34i+JuS4c2PwA2uc1scgHww25/LP5tf7zwp8BzhnUEsAKIYQ57j/HzGuCHhfDDHcR6oQFAW1d+6u8u/IdxX/TqeOth03qJvmUftx72cbuU5LpHCXvq7sJfDE+iod7wb5vBv4UkH/zQxd8At1mKiaftLvw1ccQ6yLgAKGWRWEMZGeKFXDo2xZW6bn7q7y78p3Ak93EBgCNJBsRLvIeOnB2ZXS8AcAHyOuEn4B0x3noA64VJvq6X6IQA9ihkOa89OEfBcebuwl8KR5NS4UjOQAxzOQim+JeScBMTFeuEP2rZ61JtOLW7HHOpOFo515GMsW6U1wl/1KKGtXHejECqAxPYe8DdLbvdbsj3eozc8wdP/d2F/xSOHNxyDv0mVeeSdWs4nKVhhR+zeq5LHlaUK5euzaY1uUrDCj+GN+e6eklVuuqOALKvBbRO+NTfXfhP4U29Ll9KSMtxLYvbrmRiqQnhRyypCbiOlup1BsItoH9fgHEGgdWAcbmWEQCpCeGHLKqJklIRqyRLKZrUtsTS5ZKKo2Kd8DPwjvDWg3Ns8hcnXHuYDbtxdpulBu1NMyfCT8H36Gv2EdNsH6efAKRwaBMAm7DHiZSTdxf+Unjb+Ep1uCQpGtGQhGyX6irSsMKP4dnrkOslM9oqXRWtJEMreOV1wh+33JtIwS2HOaTaXLsu5KcVS9FOXif8EUvPTYyfBvq3zQDXfkysA+gnID4y4Q0A1gGqnAg/YDnDIvZhc1uMJcOSKczlykmeflKsE/6oZQfKbQl+mVtPJ7ylHW2vPimvE/6Y1VgXXapOcJbnJr6NtkvDCj+rN1HDHJnnAIonLrUjGxpMXif8GL6bmV0Yn4ydXIBNrk4V70beLrlfRr1dR/ghS7GujpE4NrPsuTZXgyCQaniKdcIftfLGic3orQs2LnufSiXu3jPNoVzjyyZy+7WjnbK78FfGa28iPpk4crP46rrJhdj9j8tjlVjdf+GHLM/XResCY2t/vTJGOD8s6WU73roArNcAvb9O+DH8i4YtE3RNR8wFVDVbe7PSsMIPWFYTQJ3lzGOcJfXWgU5A9Trhp3tdGTxpot7cVOm+SFp5nfBHrP9+ww9LEqjjDHx5dVgXDO4Og1tUrxN+xL6d65qUms5weQ5grE9h61wn/JhFr0uWp0rq8HDtjVVfYxkGkNcJf8SM/73m76b/XidcuHDhwoULF/5b8H8BLHRH5syzbtcAAAAASUVORK5CYII="
    },
    "bank_account": {
      "id": 2,
      "external_id": "a324703a-acd4-4a36-a7d4-ca1609d6e32b",
      "tenant_id": "c76a8e4c-fb81-480d-8997-dba7aa1a9f47",
      "name": "Seidor Véritas Sistema LTDA",
      "document_number": "15535155000108",
      "wallet_number": None,
      "convenant_code": 109,
      "agency": "5117-9",
      "account_number": 2171,
      "account_digit": 16,
      "pix_dict_key": "15535155000108",
      "pix_dict_key_type": "evp",
      "bank": "341",
      "provider": "shipay",
      "created_by": "igor.carvalho@seidor.com",
      "created_at": "2024-09-17T23:20:33.405Z",
      "updated_by": None,
      "updated_at": "2024-09-17T23:20:33.405Z",
      "client_accounts": [],
      "bank_slip_config": None
    },
    "bank_code": "341-7"
  }
]

# Função para gerar valores aleatórios no payload
def generate_random_payload():
    # Cria uma cópia profunda do template para evitar modificar o original
    payload_list = [payload.copy() for payload in PAYLOAD_TEMPLATE]
    
    for payload in payload_list:
        payload["billing"]["buyer"]["cpf_cnpj"] = f"{random.randint(10000000000, 99999999999)}"
        payload["billing"]["billing_internal_number"] = f"{random.randint(100000, 999999)}"
        payload["billing"]["calendar"]["due_date"] = "2025-07-28"
        payload["billing"]["calendar"]["expiration_date"] = "2025-07-29"
    
    return payload_list


class UserBehavior(TaskSet):
    @task
    def send_boleto_request(self):
        payload = generate_random_payload()
        headers = {
            "tenantid": "8eb69728-763a-4543-8689-c7f6c70ce74f",
            "Content-Type": "application/json"
        }
        with self.client.post(
            "charges/boleto",
            headers=headers,
            json=payload,
            catch_response=True
        ) as response:
            if response.status_code == 200:
                response.success()
            else:
                response.failure(f"Failed with status code {response.status_code}")


class APIUser(HttpUser):
    tasks = [UserBehavior]
    wait_time = between(0.2, 1)  # Intervalo entre as requisições
    host = "http://127.0.0.1:8004/"
