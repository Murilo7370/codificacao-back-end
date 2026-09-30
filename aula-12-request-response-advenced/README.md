# 🔐 Aula — Segurança com API Key no NestJS

## 📚 Sobre a aula

Nesta aula foi desenvolvido um mecanismo simples de **autenticação utilizando uma API Key** em uma rota do NestJS.

A aplicação recebe uma chave de acesso através do **Header da requisição**, verifica se ela é válida e, de acordo com o resultado, permite ou bloqueia o acesso a uma área protegida da API.

---

## 🎯 Objetivos

Durante a aula foram trabalhados os seguintes conceitos:

* Criação de um Controller no NestJS;
* Criação de uma rota protegida;
* Utilização do decorator `@Controller()`;
* Utilização do decorator `@Get()`;
* Leitura de Headers através do `@Headers()`;
* Utilização do `@Res()` para controlar a resposta HTTP;
* Validação de uma API Key;
* Retorno de diferentes códigos HTTP;
* Configuração de Headers na resposta;
* Retorno de objetos JSON;
* Utilização de `Date()` para registrar o momento da tentativa de acesso.

---

## 📂 Controller de Segurança

Foi criado o arquivo responsável pelo controle da área protegida:

```typescript
import { Controller, Get, Headers, Res } from "@nestjs/common";
import type { Response } from "express";

@Controller('secret')
export class SegurancaController {

    @Get()
    acessAreaSecret(
        @Headers('y-api-key') apiKey: string,
        @Res() res: Response
    ) {

        if (apiKey === 'FULLSTACK-2026') {

            res.setHeader('y-auth-status', 'verificado');

            return res.status(200).json({
                mensagem: 'Acesso concedido a Area Secreta!',
            });
        }

        return res.status(403).json({
            erro: 'Forbidden',
            mensagem: 'Chave API invalida ou ausente',
            log: new Date(),
        });
    }
}
```

---

## 🔑 Como funciona a autenticação

A API espera receber uma chave através do Header:

```text
y-api-key
```

A chave utilizada durante a aula foi:

```text
FULLSTACK-2026
```

O código recupera essa informação através do:

```typescript
@Headers('y-api-key')
```

Depois, a chave recebida é comparada com a chave esperada:

```typescript
if (apiKey === 'FULLSTACK-2026')
```

Se as duas forem iguais, o acesso é permitido.

---

## ✅ Acesso autorizado

Quando a API Key está correta, a aplicação retorna o status:

```text
200 OK
```

Também é adicionado um Header na resposta:

```text
y-auth-status: verificado
```

E a API retorna:

```json
{
  "mensagem": "Acesso concedido a Area Secreta!"
}
```

Isso demonstra que a chave enviada pelo cliente foi validada corretamente.

---

## ❌ Acesso negado

Caso a chave esteja incorreta ou não seja enviada, a aplicação retorna:

```text
403 Forbidden
```

Com a seguinte resposta:

```json
{
  "erro": "Forbidden",
  "mensagem": "Chave API invalida ou ausente",
  "log": "data da tentativa"
}
```

O campo `log` utiliza:

```typescript
new Date()
```

para registrar a data e horário em que a tentativa de acesso ocorreu.

---

## 🧪 Testando a API

A rota criada foi:

```text
GET /secret
```

### 🔓 Teste com API Key correta

No Insomnia, Postman ou outra ferramenta de teste, faça uma requisição:

```text
GET http://localhost:3000/secret
```

No Header, adicione:

| Nome        | Valor            |
| ----------- | ---------------- |
| `y-api-key` | `FULLSTACK-2026` |

A resposta esperada é:

```json
{
  "mensagem": "Acesso concedido a Area Secreta!"
}
```

E o Header da resposta deverá conter:

```text
y-auth-status: verificado
```

---

### 🔒 Teste com API Key incorreta

Utilizando, por exemplo:

```text
y-api-key: 123456
```

A API deverá bloquear o acesso e retornar:

```text
403 Forbidden
```

Com:

```json
{
  "erro": "Forbidden",
  "mensagem": "Chave API invalida ou ausente"
}
```

---

### 🚫 Teste sem API Key

Também é possível testar sem enviar o Header `y-api-key`.

Nesse caso, a API identifica que a chave está ausente e retorna:

```text
403 Forbidden
```

---

## 🧩 Principais conceitos utilizados

### `@Controller()`

Define o Controller responsável por determinada rota:

```typescript
@Controller('secret')
```

Nesse caso, todas as rotas desse Controller começam com:

```text
/secret
```

### `@Get()`

Define que o método será executado através de uma requisição HTTP GET:

```typescript
@Get()
```

### `@Headers()`

Permite acessar informações enviadas nos Headers da requisição:

```typescript
@Headers('y-api-key') apiKey: string
```

### `@Res()`

Permite controlar diretamente a resposta utilizando o objeto `Response` do Express:

```typescript
@Res() res: Response
```

Com ele foi possível definir o status HTTP e retornar um JSON:

```typescript
res.status(200).json(...)
```

### `setHeader()`

Foi utilizado para adicionar uma informação personalizada ao Header da resposta:

```typescript
res.setHeader('y-auth-status', 'verificado');
```

---

## 📊 Fluxo da autenticação

```text
Cliente
   │
   │ GET /secret
   │
   │ Header: y-api-key
   ▼
NestJS
   │
   ▼
Verifica a API Key
   │
   ├── API Key correta
   │       │
   │       ▼
   │    200 OK
   │    Acesso concedido
   │
   └── API Key incorreta/ausente
           │
           ▼
        403 Forbidden
        Acesso negado
```

---

## 🛡️ Importância da segurança

A utilização de API Keys é uma forma simples de controlar o acesso a determinados recursos de uma API.

Neste exercício, uma chave é exigida para acessar a rota `/secret`. Isso permite compreender conceitos básicos de **autenticação, Headers HTTP e autorização de acesso**.

> ⚠️ Em uma aplicação real, não é recomendado deixar uma API Key diretamente escrita no código-fonte. O ideal é utilizar variáveis de ambiente e mecanismos de segurança mais robustos.

---

## 📝 Conclusão

Nesta aula foi implementada uma rota protegida utilizando **API Key no NestJS**. Foi possível aprender como receber informações através dos Headers da requisição, validar uma chave de acesso e retornar diferentes respostas de acordo com o resultado da autenticação.

Também foram utilizados códigos HTTP `200` para indicar acesso autorizado e `403` para representar uma tentativa de acesso proibida. Além disso, foi configurado um Header personalizado para indicar que a autenticação foi verificada.

Com essa atividade, foi possível compreender na prática os fundamentos de **segurança, autenticação e controle de acesso em APIs desenvolvidas com NestJS**.
