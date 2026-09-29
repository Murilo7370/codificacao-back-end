# 📷 Aula 11 - API de Upload de Imagens

## 📚 Sobre a aula

Nesta aula foi desenvolvido uma **API para upload de imagens utilizando NestJS**.

O objetivo foi aprender como receber arquivos através de uma requisição HTTP, utilizando o formato `multipart/form-data`, e realizar o armazenamento da imagem dentro de uma pasta do projeto.

Os testes da API foram realizados utilizando o **Insomnia**.

---

## 🚀 Tecnologias utilizadas

- Node.js
- NestJS
- TypeScript
- Multer
- Insomnia
- Git
- GitHub

---

## 📁 Estrutura do projeto

```text
aula-11-api-upload-imagm/
│
├── src/
│   ├── imagem.controller.ts
│   ├── imagem.module.ts
│   ├── app.controller.ts
│   ├── app.module.ts
│   └── app.service.ts
│
├── uploads/
│   └── e8a98f3a-908a-4c40-9a6c-2f3c85ebe325.jpg
│
├── package.json
├── package-lock.json
├── nest-cli.json
├── .gitignore
└── README.md
✅ Conclusão

Nesta aula foi possível desenvolver uma API de upload de imagens utilizando NestJS, colocando em prática conceitos de requisições HTTP, criação de rotas e manipulação de arquivos.

Também foi possível utilizar o Multer para receber e processar a imagem enviada através do Insomnia. Após o envio, o arquivo foi armazenado corretamente na pasta uploads do projeto.

Com essa atividade, foi possível compreender na prática como uma API pode receber arquivos enviados pelo usuário e realizar seu armazenamento, servindo como base para o desenvolvimento de aplicações que trabalham com imagens e outros tipos de arquivos.