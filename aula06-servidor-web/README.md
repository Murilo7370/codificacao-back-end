🌐 Servidor Web com Node.js
📌 Sobre o projeto

Este projeto consiste no desenvolvimento de um servidor web utilizando Node.js e o módulo nativo http.

O objetivo do trabalho foi criar um servidor capaz de receber requisições HTTP, identificar as rotas acessadas e retornar respostas adequadas para cada situação.

O servidor possui uma rota /status, utilizada para verificar se a aplicação está funcionando corretamente, além de um tratamento para rotas que não existem.

🛠️ Tecnologias utilizadas

Node.js

JavaScript

Módulo http

Visual Studio Code

📁 Estrutura do projeto
projeto/
├── server.js
├── package.json
└── README.md

⚙️ Funcionamento

O servidor é executado na porta 3000.

Ao receber uma requisição, o sistema registra no terminal o método HTTP utilizado e a rota acessada.

Exemplo:

[LOG] Método Recebido: GET | Rota: /status

🔎 Rota /status

Acessando:

http://localhost:3000/status


O servidor retorna:

{
  "servidorWeb": "Online"
}


com o status HTTP 200.

❌ Rotas inexistentes

Quando uma rota que não existe é acessada, o servidor retorna o status HTTP 404 juntamente com uma mensagem em JSON:

{
  "erro": "Página não encontrada!"
}

▶️ Como executar

Primeiramente, é necessário ter o Node.js instalado.

No terminal do VS Code, execute:

npm install


Depois, inicie o servidor:

node server.js


Ao iniciar corretamente, será exibido:

Servidor Web ativo!
Porta: 3000


Após isso, o servidor estará disponível em:

http://localhost:3000

🛡️ Segurança

Foram adicionados headers HTTP básicos de segurança:

X-Content-Type-Options: nosniff
X-Frame-Options: DENY


Além disso, as respostas da aplicação são enviadas utilizando o formato JSON.

🧪 Testes realizados

Durante o desenvolvimento, foram realizados testes para verificar:

Inicialização correta do servidor.

Funcionamento da rota /status.

Retorno do código HTTP 200.

Retorno do código HTTP 404 para rotas inexistentes.

Exibição dos logs das requisições no terminal.

Funcionamento dos headers de segurança.

✅ Conclusão

Ao final do desenvolvimento, foi possível concluir a implementação de um servidor web funcional utilizando Node.js e o módulo nativo http.

O projeto permitiu compreender na prática conceitos fundamentais do funcionamento de servidores HTTP, como requisições, respostas, métodos HTTP, rotas, códigos de status e headers.

Também foi possível aplicar boas práticas básicas de desenvolvimento, como a organização do código, utilização de respostas em JSON, registro das requisições e tratamento de rotas inexistentes.

Dessa forma, o trabalho foi concluído com o servidor funcionando corretamente e atendendo aos requisitos propostos.

👨‍💻 Status do projeto

Concluído ✅