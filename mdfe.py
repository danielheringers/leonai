from locust import HttpUser, TaskSet, task, between
import json
import random

# Payloads base
PAYLOAD_BILLING = [
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


PAYLOAD_MDFE = {
  "MDFe": {
    "versao": "3.00",
    "branchId": "d1540357-5a30-41dd-bb6a-be3f7a363660",
    "logo": "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",
    "ide": {
      "cUF": "52",
      "tpAmb": "1",
      "tpEmit": "1",
      "mod": "58",
      "serie": "1",
      "nMDF": "3228",
      "cMDF": "00000001",
      "cDV": "6",
      "modal": "1",
      "dhEmi": "2018-06-08T14:36:40-03:00",
      "tpEmis": "1",
      "procEmi": "0",
      "verProc": "1.0",
      "UFIni": "GO",
      "UFFim": "AL",
      "infMunCarrega": {
        "cMunCarrega": "5208707",
        "xMunCarrega": "GOIANIA - DEC-MATRIZ"
      },
      "infPercurso": [
        {
          "UFPer": "MG"
        }
      ],
      "dhIniViagem": "2024-10-28T16:09:37-03:00"
    },
    "emit": {
      "CNPJ": "01543354000145",
      "IE": "100402607",
      "xNome": "EXPRESSO SAO LUIZ LTDA",
      "xFant": "EXPRESSO SAO LUIZ",
      "enderEmit": {
        "xLgr": "RUA DOS FERROVIARIOS",
        "nro": "123",
        "xCpl": "CH.01",
        "xBairro": "ESPLANDA DO ANICUNS",
        "cMun": "5208707",
        "xMun": "Goiania",
        "CEP": "74433090",
        "UF": "GO",
        "fone": "6232722300",
        "email": "danielheringer@email.com"
      }
    },
    "infModal": {
      "rodo": {
        "infANTT": {
          "RNTRC": "12345678",
          "infCIOT": [
            {
              "CIOT": "123456789012",
              "CNPJ": "50671894000110"
            }
          ],
          "valePed": {
            "disp": [
              {
                "CNPJForn": "04088208000165",
                "CNPJPg": "09524024000114",
                "nCompra": "100001",
                "vValePed": "22.00",
                "tpValePed": "01"
              },
              {
                "CNPJForn": "04088208000165",
                "CNPJPg": "09524024000114",
                "nCompra": "100001",
                "vValePed": "22.00",
                "tpValePed": "01"
              },
              {
                "CNPJForn": "04088208000165",
                "CNPJPg": "09524024000114",
                "nCompra": "100001",
                "vValePed": "22.00",
                "tpValePed": "01"
              },
              {
                "CNPJForn": "04088208000165",
                "CNPJPg": "09524024000114",
                "nCompra": "100001",
                "vValePed": "22.00",
                "tpValePed": "01"
              }
            ],
            "categCombVeic": None
          },
          "infContratante": [
            {
              "CNPJ": "40131411000130",
              "idEstrangeiro": None,
              "xNome": "TESTE"
            }
          ]
        },
        "veicTracao": {
          "cInt": "7960",
          "placa": "PQS3383",
          "RENAVAM": "00000416640",
          "tara": "24500",
          "capKG": "0",
          "capM3": "0",
          "condutor": {
            "xNome": "MANOEL CARDOSO DA SILVA",
            "CPF": "33282609191"
          },
          "tpRod": "04",
          "tpCar": "00",
          "UF": "GO"
        },
        "veicReboque": [
          {
            "cInt": "2",
            "placa": "BBB0010",
            "RENAVAM": "36915788382",
            "tara": "4000",
            "capKG": "14000",
            "capM3": "22",
            "tpCar": "02",
            "UF": "RO"
          }
        ]
      },
      "_versaoModal": "3.00"
    },
    "infDoc": {
      "infMunDescarga": [
        {
          "cMunDescarga": "2700300",
          "xMunDescarga": "Arapiraca",
          "infCTe": [
            {
              "chCTe": "52180601543354000145570010000522751000522756"
            }
          ],
          "infNFe": [
            {
              "chNFe": "35241003030482000110550010000101311000050990"
            }
          ]
        }
      ]
    },
    "seg": {
      "infResp": {
        "respSeg": "1",
        "CNPJ": "01543354000145"
      },
      "infSeg": {
        "xSeg": "EXPRESSO SAO LUIZ LTDA",
        "CNPJ": "01543354000145"
      },
      "nApol": "999999",
      "nAver": "0"
    },
    "tot": {
      "qCTe": "1",
      "qNFe": "1",
      "vCarga": "1753.82",
      "cUnid": "02",
      "qCarga": "390.0000"
    },
    "infAdic": {
      "infCpl": "Seg.: EXPRESSO SAO LUIZ LTDA CNPJ: 01543354000145 Apol.: 999999 RENAVAM CAVALO: 00000416640"
    },
    "infMDFeSupl": {
      "qrCodMDFe": "1"
    }
  },
  "retMDFe": {
    "attributes": {
      "versao": "3.00"
    },
    "tpAmb": "2",
    "cUF": "35",
    "verAplic": "RS20240709143551",
    "cStat": "100",
    "xMotivo": "Autorizado o uso do MDF-e",
    "protMDFe": {
      "attributes": {
        "versao": "3.00"
      },
      "infProt": {
        "attributes": {
          "Id": "MDFe935240000073884"
        },
        "tpAmb": "2",
        "verAplic": "RS20241029090346",
        "chMDFe": "35241007792897000182580010000000371186286982",
        "dhRecbto": "2024-10-29T21:58:09-03:00",
        "nProt": "935240000073884",
        "digVal": "UNYYEhdjO4Y0hwdnNq6UeQjJHfg=",
        "cStat": "100",
        "xMotivo": "Autorizado o uso do MDF-e"
      }
    }
  }
}

# Funções para gerar payloads dinâmicos
def generate_billing_payload():
    payload = PAYLOAD_BILLING[0].copy()
    payload["billing"]["buyer"]["cpf_cnpj"] = f"{random.randint(10000000000, 99999999999)}"
    payload["billing"]["billing_internal_number"] = f"{random.randint(100000, 999999)}"
    return [payload]

def generate_mdfe_payload():
    payload = PAYLOAD_MDFE.copy()
    payload["MDFe"]["ide"]["nMDF"] = f"{random.randint(1000, 9999)}"
    payload["MDFe"]["ide"]["dhEmi"] = "2024-12-13T10:30:00-03:00"
    return payload

# TaskSet com duas rotas
class UserBehavior(TaskSet):
    @task(1)
    def send_boleto_request(self):
        payload = generate_billing_payload()
        headers = {
            "tenantid": "8eb69728-763a-4543-8689-c7f6c70ce74f",
            "Content-Type": "application/json"
        }
        with self.client.post(
            "/fast-pdf-service/charges/boleto",
            headers=headers,
            json=payload,
            catch_response=True
        ) as response:
            if response.status_code == 200:
                response.success()
            else:
                response.failure(f"Failed with status code {response.status_code}")

    @task(1)
    def send_mdfe_request(self):
        payload = generate_mdfe_payload()
        headers = {
            "tenantid": "8eb69728-763a-4543-8689-c7f6c70ce74f",
            "accept": "application/pdf",
            "Content-Type": "application/json"
        }
        with self.client.post(
            "/fast-pdf-service/dfes/mdfe/damdfe",
            headers=headers,
            json=payload,
            catch_response=True
        ) as response:
            if response.status_code == 200:
                response.success()
            else:
                response.failure(f"Failed with status code {response.status_code}")

# Configuração do usuário do Locust
class APIUser(HttpUser):
    tasks = [UserBehavior]
    wait_time = between(0.2, 1)  # Intervalo entre requisições
    host = "https://ingress.hom.orbitspot.com"
