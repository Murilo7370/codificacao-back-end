# Aula 16 – Validação com Schemas usando Zod no NestJS

## 📌 Introdução

Em toda API, nunca devemos confiar nos dados que chegam do cliente. Campos vazios, e-mails malformados ou valores fora do esperado podem causar bugs e problemas de segurança.

Nesta aula foi desenvolvida a **validação de dados de entrada** em uma API NestJS utilizando o **[Zod](https://zod.dev/)**, uma biblioteca de validação baseada em **schemas**. Foi criado um cadastro de **colaboradores**, em que cada campo possui regras próprias e mensagens de erro personalizadas, e um **Pipe customizado** (`ZodValidationPipe`) que aplica o schema às requisições antes que elas cheguem ao controller.

## 🎯 Objetivos da aula

- Entender o que é um schema de validação;
- Definir regras para cada campo com o Zod;
- Criar mensagens de erro personalizadas;
- Inferir o tipo TypeScript a partir do schema (`z.infer`);
- Criar um Pipe genérico e reutilizável no NestJS;
- Formatar os erros de validação em um padrão claro para o cliente;
- Aplicar o pipe em uma rota `POST` com `@UsePipes`;
- Testar requisições válidas e inválidas.

## 🛠️ Tecnologias utilizadas

- [NestJS](https://nestjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Zod](https://zod.dev/)
- [Vitest](https://vitest.dev/) (testes)
- [Oxlint](https://oxc.rs/docs/guide/usage/linter) e [Prettier](https://prettier.io/) (qualidade e formatação de código)

## 📁 Estrutura do projeto

```
aula-16-validacao-schemas-com-zod-nestjs/
├── src/
│   ├── app.controller.ts
│   ├── app.controller.spec.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   ├── colaborador.schema.ts          # Schema Zod + tipo Colaborador
│   ├── colaboradores.controller.ts    # Rota POST /colaboradores
│   ├── zod-validation.pipe.ts         # Pipe genérico de validação
│   └── main.ts
├── test/                              # Testes e2e
├── vitest.config.ts
├── vitest.config.e2e.ts
├── .oxlintrc.json
├── .prettierrc
├── nest-cli.json
├── tsconfig.json
└── package.json
```

## 🚀 Desenvolvimento

### Etapa 1 – Criação do projeto

```bash
nest new aula-16-validacao-schemas-com-zod-nestjs
cd aula-16-validacao-schemas-com-zod-nestjs
```

### Etapa 2 – Instalação do Zod

```bash
npm install zod
```

### Etapa 3 – Criação do schema (`colaborador.schema.ts`)

O schema define a **forma** esperada de um colaborador e as **regras** de cada campo:

```ts
import { z } from 'zod';

export const coloboradorSchema = z.object({
  nome: z
    .string()
    .min(3, { message: 'O nome deve ter no minimo 3 letras!' }),
  email: z.email({ message: 'O email deve ser valido!' }),
  idade: z
    .number({ message: 'A idade minima deve ser um numero valido!' })
    .min(18, { message: 'A idade minima permitida e 18 anos!' })
    .max(65, { message: 'A idade maxima permitida e 65 anos!' }),
  departamento: z.enum(['TI', 'RH', 'Comercial', 'Financeiro'], {
    error: () => ({
      message:
        'Departamento deve ser obrigatorimente TI, RH , Comercial ou Financeiro',
    }),
  }),
});

export type Colaborador = z.infer<typeof coloboradorSchema>;
```

| Campo          | Regra                                           |
| -------------- | ----------------------------------------------- |
| `nome`         | Texto com no mínimo 3 letras                    |
| `email`        | Deve ser um e-mail válido                       |
| `idade`        | Número entre 18 e 65 anos                       |
| `departamento` | Somente `TI`, `RH`, `Comercial` ou `Financeiro` |

Com `z.infer`, o tipo `Colaborador` é gerado **automaticamente** a partir do schema, evitando manter uma interface separada.

### Etapa 4 – Criação do Pipe de validação (`zod-validation.pipe.ts`)

O pipe implementa `PipeTransform` e recebe qualquer schema Zod pelo construtor, o que o torna **reutilizável** em outras rotas.

```ts
import {
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { z } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private z: z.ZodType) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    if (metadata.type !== 'body') return value;

    const parseResult = this.z.safeParse(value);

    if (!parseResult.success) {
      const formatedErrors = parseResult.error.issues.map((issue) => ({
        campo: issue.path.join('.'),
        mensagem: issue.message,
      }));

      throw new BadRequestException({
        statusCode: 400,
        erros: formatedErrors,
      });
    }

    return parseResult.data;
  }
}
```

**Como funciona:**

1. `if (metadata.type !== 'body') return value;` → o pipe só valida o **corpo** da requisição; parâmetros de rota e query passam direto.
2. `safeParse(value)` → valida sem lançar exceção, devolvendo um objeto com `success` e `data` ou `error`.
3. Se a validação falhar, cada `issue` é transformado em `{ campo, mensagem }` e uma `BadRequestException` (**400**) é lançada com a lista de erros.
4. Se passar, retorna `parseResult.data`, os dados já validados.

### Etapa 5 – Aplicação no controller (`colaboradores.controller.ts`)

```ts
import { Controller, Post, Body, UsePipes } from '@nestjs/common';
import { coloboradorSchema } from './colaborador.schema.js';
import { ZodValidationPipe } from './zod-validation.pipe.js';
import type { Colaborador } from './colaborador.schema.js';

@Controller('colaboradores')
export class ColaboradoresController {
  @Post()
  @UsePipes(new ZodValidationPipe(coloboradorSchema))
  async create(@Body() body: Colaborador) {
    return {
      mensagem: 'Colaborador cadastrado com sucesso',
      dados: body,
    };
  }
}
```

O `@UsePipes` garante que o `body` só chega ao método `create` **depois de validado**. Se os dados forem inválidos, o método nem é executado.

### Etapa 6 – Registro no módulo (`app.module.ts`)

O `ColaboradoresController` foi adicionado ao array `controllers` do `AppModule`.

### Etapa 7 – Execução da aplicação

```bash
npm install
npm run start:dev
```

A API fica disponível em `http://localhost:3000`.

## 🧪 Testes realizados

Os testes foram feitos com requisições `POST` para `http://localhost:3000/colaboradores`.

### ✅ Teste 1 – Dados válidos

```json
{
  "nome": "Maria Silva",
  "email": "maria@empresa.com",
  "idade": 28,
  "departamento": "TI"
}
```

**Resposta:** `201 Created`

```json
{
  "mensagem": "Colaborador cadastrado com sucesso",
  "dados": {
    "nome": "Maria Silva",
    "email": "maria@empresa.com",
    "idade": 28,
    "departamento": "TI"
  }
}
```

### ❌ Teste 2 – Nome com menos de 3 letras

```json
{ "nome": "Jo", "email": "jo@empresa.com", "idade": 30, "departamento": "RH" }
```

**Resposta:** `400 Bad Request`

```json
{
  "statusCode": 400,
  "erros": [{ "campo": "nome", "mensagem": "O nome deve ter no minimo 3 letras!" }]
}
```

### ❌ Teste 3 – E-mail inválido

```json
{ "nome": "João Souza", "email": "joao-email", "idade": 30, "departamento": "RH" }
```

**Resposta:** `400 Bad Request`

```json
{
  "statusCode": 400,
  "erros": [{ "campo": "email", "mensagem": "O email deve ser valido!" }]
}
```

### ❌ Teste 4 – Idade abaixo do mínimo

```json
{ "nome": "Ana Lima", "email": "ana@empresa.com", "idade": 17, "departamento": "Comercial" }
```

**Resposta:** `400 Bad Request`

```json
{
  "statusCode": 400,
  "erros": [{ "campo": "idade", "mensagem": "A idade minima permitida e 18 anos!" }]
}
```

### ❌ Teste 5 – Idade acima do máximo

```json
{ "nome": "Carlos Pereira", "email": "carlos@empresa.com", "idade": 70, "departamento": "Financeiro" }
```

**Resposta:** `400 Bad Request`

```json
{
  "statusCode": 400,
  "erros": [{ "campo": "idade", "mensagem": "A idade maxima permitida e 65 anos!" }]
}
```

### ❌ Teste 6 – Idade não numérica

```json
{ "nome": "Paula Reis", "email": "paula@empresa.com", "idade": "vinte", "departamento": "TI" }
```

**Resposta:** `400 Bad Request`

```json
{
  "statusCode": 400,
  "erros": [{ "campo": "idade", "mensagem": "A idade minima deve ser um numero valido!" }]
}
```

### ❌ Teste 7 – Departamento inexistente

```json
{ "nome": "Bruno Alves", "email": "bruno@empresa.com", "idade": 35, "departamento": "Marketing" }
```

**Resposta:** `400 Bad Request`

```json
{
  "statusCode": 400,
  "erros": [
    {
      "campo": "departamento",
      "mensagem": "Departamento deve ser obrigatorimente TI, RH , Comercial ou Financeiro"
    }
  ]
}
```

### ❌ Teste 8 – Vários erros ao mesmo tempo

```json
{ "nome": "Al", "email": "invalido", "idade": 10, "departamento": "Outro" }
```

**Resposta:** `400 Bad Request` com **todos** os campos inválidos listados:

```json
{
  "statusCode": 400,
  "erros": [
    { "campo": "nome", "mensagem": "O nome deve ter no minimo 3 letras!" },
    { "campo": "email", "mensagem": "O email deve ser valido!" },
    { "campo": "idade", "mensagem": "A idade minima permitida e 18 anos!" },
    {
      "campo": "departamento",
      "mensagem": "Departamento deve ser obrigatorimente TI, RH , Comercial ou Financeiro"
    }
  ]
}


### 📊 Resumo dos testes

| # | Cenário                  | Status        |
| - | ------------------------ | ------------- |
| 1 | Dados válidos            | `201 Created` |
| 2 | Nome curto               | `400`         |
| 3 | E-mail inválido          | `400`         |
| 4 | Idade menor que 18       | `400`         |
| 5 | Idade maior que 65       | `400`         |
| 6 | Idade não numérica       | `400`         |
| 7 | Departamento inexistente | `400`         |
| 8 | Múltiplos erros          | `400`         |

## ✅ Conclusão

Nesta aula foi possível construir uma validação completa de dados em uma API NestJS usando Zod. Com um único schema e um pipe customizado, conseguimos:

- Definir **regras de negócio** para cada campo (tamanho, formato, faixa de valores e valores permitidos);
- Devolver ao cliente **erros claros e padronizados**, indicando o `campo` e a `mensagem` de cada problema;
- Gerar o **tipo TypeScript** automaticamente com `z.infer`, mantendo validação e tipagem sincronizadas;
- **Reaproveitar** o `ZodValidationPipe` em qualquer rota com qualquer schema;
- Manter o controller **limpo**, já que ele só recebe dados que já passaram pela validação.

Com isso, a API fica mais **segura, previsível e fácil de manter**, pois dados inválidos são barrados logo na entrada, antes de chegarem à regra de negócio.
