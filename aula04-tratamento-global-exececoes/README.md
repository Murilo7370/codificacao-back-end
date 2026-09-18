# Projeto de Tratamento de Erros com Node.js e Express

Este projeto foi desenvolvido utilizando Node.js e Express com o objetivo de demonstrar o funcionamento de uma API e o tratamento de diferentes tipos de erros.

A aplicação possui um servidor Express configurado para receber requisições no formato JSON e executar diferentes rotas para demonstrar situações de sucesso e de erro.

Foram criadas três rotas principais:

* `/sucesso`: demonstra uma operação realizada com sucesso e retorna uma mensagem em formato JSON.
* `/erro-sincrono`: demonstra o tratamento de um erro síncrono utilizando `try/catch` e o encaminhamento do erro através do `next()`.
* `/erro-assincrono`: demonstra o tratamento de um erro assíncrono utilizando `async/await`, `Promise.reject()` e `try/catch`.

Também foi implementado um middleware centralizado para tratamento de erros. Esse middleware recebe os erros através do `next()` e retorna uma resposta padronizada contendo o status e a mensagem do erro.

Além disso, o projeto possui mecanismos para registrar erros que podem ocorrer no processo do Node.js, utilizando `uncaughtException` para exceções não capturadas e `unhandledRejection` para Promises rejeitadas que não foram tratadas.

O servidor foi configurado para funcionar na porta 3000.

Para executar o projeto, é necessário instalar as dependências utilizando o comando `npm install` e depois iniciar o servidor com `node server.js`.

Após iniciar o servidor, as rotas podem ser testadas através do navegador, Postman, Insomnia ou Thunder Client.

O projeto tem como finalidade demonstrar boas práticas básicas de tratamento e registro de erros em uma aplicação desenvolvida com Node.js e Express.
