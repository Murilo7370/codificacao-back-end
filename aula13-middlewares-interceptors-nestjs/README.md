# Aula - Logger Middleware no NestJS

## 📚 Sobre a aula

Nesta aula foi desenvolvido um **Logger Middleware** utilizando o framework **NestJS**.

O objetivo foi aprender como utilizar middlewares para interceptar as requisições da aplicação e registrar informações importantes sobre o acesso às rotas.

---

## 🛠️ O que foi desenvolvido

Durante a aula foram realizadas as seguintes atividades:

- Criação de um **Logger Middleware**;
- Organização do middleware dentro da pasta `logger`;
- Configuração do middleware na aplicação NestJS;
- Interceptação das requisições HTTP;
- Registro de informações das requisições realizadas;
- Criação de arquivo de teste para o middleware;
- Manutenção da estrutura padrão do projeto NestJS.

---

## 📁 Estrutura do projeto

```text
src/
├── logger/
│   ├── logger.middleware.spec.ts
│   └── logger.middleware.ts
│
├── app.controller.spec.ts
├── app.controller.ts
├── app.module.ts
├── app.service.ts
└── main.ts

📁 logger.middleware.ts

Neste arquivo foi desenvolvido o middleware responsável por trabalhar com as requisições recebidas pela aplicação.

O Logger Middleware pode ser utilizado para acompanhar informações como:

Método HTTP utilizado;
Rota acessada;
Momento em que a requisição foi realizada;
Fluxo das requisições dentro da API.
📁 logger.middleware.spec.ts

Foi criado o arquivo de testes do middleware, seguindo a estrutura de testes utilizada pelo NestJS.

Esse arquivo permite verificar o comportamento esperado do Logger Middleware.

📁 app.module.ts

O módulo principal da aplicação é responsável pela organização dos componentes do projeto e pela configuração necessária para utilização do middleware.

📁 app.controller.ts

O controller continua sendo responsável por receber e processar as requisições direcionadas às rotas da aplicação.

📁 app.service.ts

O service mantém a lógica de serviço utilizada pela aplicação.

📁 main.ts

Arquivo responsável pela inicialização da aplicação NestJS.

🔎 O que é um Middleware?

Um Middleware é uma função executada durante o processamento de uma requisição.

No NestJS, ele pode ser utilizado para executar determinadas ações antes que a requisição seja encaminhada para o controller.

Um exemplo de utilização é o registro de logs:

Requisição recebida
       ↓
Logger Middleware
       ↓
Controller
       ↓
Service
       ↓
Resposta

Dessa forma, o middleware consegue acompanhar o fluxo das requisições da aplicação.

💻 Tecnologias utilizadas
Node.js
NestJS
TypeScript
VS Code
HTTP Middleware
📂 Organização do projeto

A organização do projeto foi mantida de forma modular, separando o Logger Middleware dos demais componentes da aplicação.

Essa organização facilita a manutenção, leitura e evolução do código.

🚀 Como executar o projeto

Instale as dependências:

npm install

Execute a aplicação em modo de desenvolvimento:

npm run start:dev

Após iniciar, a API estará disponível localmente na porta configurada pelo projeto.

🧪 Testes

Para executar os testes da aplicação:

npm run test

Para executar os testes com cobertura:

npm run test:cov
📌 Aprendizados

Ao final da aula, foi possível compreender melhor:

O funcionamento dos middlewares;
Como criar um middleware personalizado no NestJS;
Como organizar arquivos de middleware;
Como acompanhar requisições HTTP;
A importância dos logs durante o desenvolvimento;
A utilização de arquivos de teste no NestJS;
A estrutura e organização de uma aplicação NestJS.
✅ Conclusão

Nesta aula foi desenvolvido um Logger Middleware utilizando NestJS, colocando em prática o conceito de middleware e seu funcionamento dentro do ciclo de uma requisição HTTP.

A atividade permitiu compreender como interceptar requisições, organizar um middleware de forma adequada e utilizar logs para acompanhar o comportamento da aplicação.

O conhecimento adquirido nesta aula é importante para o desenvolvimento de APIs mais organizadas, facilitando o monitoramento, depuração e manutenção do sistema durante o processo de desenvolvimento.