# 🚀 Aula 08-09 — Métodos HTTP com NestJS

Projeto desenvolvido durante as aulas 08 e 09 com **NestJS**, com o objetivo de praticar a criação de uma API e o funcionamento dos principais métodos HTTP.

## 🎯 Objetivos

Durante a aula foram trabalhados:

- Criação de uma API com NestJS;
- Métodos HTTP `GET`, `POST`, `PATCH` e `DELETE`;
- Criação de Controllers;
- Criação de Services;
- Utilização de DTO;
- Organização da estrutura do projeto;
- Testes da aplicação.

## 🛠️ Tecnologias

- Node.js
- NestJS
- TypeScript
- npm
- Vitest
- Prettier
- OXLint

## 📁 Estrutura do projeto

```text
aula-08-09-metodo-get-post-patch-delete/
│
├── src/
│   ├── app.controller.ts
│   ├── app.controller.spec.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   ├── convidados.controller.ts
│   ├── criar-convidado.dto.ts
│   └── main.ts
│
├── test/
│   └── app.e2e-spec.ts
│
├── .gitignore
├── .oxlintrc.json
├── .prettierrc
├── nest-cli.json
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
```

## 🌐 Métodos HTTP

| Método | Função |
|---|---|
| `GET` | Consultar informações |
| `POST` | Criar um novo registro |
| `PATCH` | Atualizar informações |
| `DELETE` | Remover um registro |

As operações foram aplicadas ao gerenciamento de **convidados** através do arquivo:

```text
src/convidados.controller.ts
```

## 📦 DTO

Foi criado o arquivo:

```text
src/criar-convidado.dto.ts
```

O DTO (**Data Transfer Object**) é utilizado para organizar e definir os dados recebidos para criação de um convidado.

## 🧪 Testes

Foram adicionados testes para a aplicação:

```text
src/app.controller.spec.ts
test/app.e2e-spec.ts
```

Os testes podem ser executados através dos comandos configurados no `package.json`.

## ▶️ Como executar

Instale as dependências:

```bash
npm install
```

Execute o projeto em modo de desenvolvimento:

```bash
npm run start:dev
```

Para executar os testes:

```bash
npm run test
```

## 📌 Resultado

Ao final da aula, foi desenvolvida uma estrutura de API utilizando NestJS, praticando os métodos **GET, POST, PATCH e DELETE**, além de Controllers, DTOs, Services e testes.

## 👨‍💻 Projeto

Projeto desenvolvido para fins educacionais durante as aulas de desenvolvimento Back-End.