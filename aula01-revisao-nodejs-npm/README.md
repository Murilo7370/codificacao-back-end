# Aula 01 - Revisão Node.js e NPM

## Descrição do projeto

Este projeto foi desenvolvido como parte da revisão dos conceitos básicos de Node.js e NPM. 
O objetivo foi criar um pequeno diagnóstico do servidor/computador, utilizando recursos 
nativos do Node.js para obter informações sobre o sistema operacional, memória RAM e 
processador.

## O que foi desenvolvido

Foi criado o arquivo `diagnostico.js`, responsável por realizar a coleta de informações 
do sistema utilizando o módulo nativo `os` do Node.js.

No início do código, foi utilizado:

const os = require('os');

Esse comando importa o módulo `os`, que permite acessar informações relacionadas ao 
sistema operacional e aos recursos do computador.

## Informações coletadas

O programa realiza a coleta das seguintes informações:

- Arquitetura e sistema operacional da máquina;
- Memória RAM total;
- Memória RAM disponível/livre;
- Quantidade de processadores;
- Modelo do processador;
- Velocidade do processador.

Para isso, foram utilizados os seguintes recursos do módulo `os`:

- `os.platform()` para identificar a plataforma/sistema operacional;
- `os.totalmem()` para obter a quantidade total de memória RAM;
- `os.freemem()` para obter a quantidade de memória RAM disponível;
- `os.cpus()` para obter informações sobre os processadores.

Os valores de memória foram convertidos de bytes para gigabytes utilizando:

(1024 ** 3)

e apresentados com duas casas decimais através do método:

.toFixed(2)

## Exibição dos resultados

As informações coletadas são exibidas no terminal utilizando `console.log()`.

O programa apresenta um título:

=== DIAGNOSTICO DO SERVIDOR ===

Depois são mostradas as informações referentes à arquitetura do sistema, memória RAM, 
quantidade de processadores, modelo do processador e velocidade do processador.

## Configuração do projeto

Também foi configurado o arquivo `package.json`.

Nesse arquivo foram definidos:

- Nome do projeto: `aula01-revisao-nodejs-npm`;
- Versão: `1.0.0`;
- Arquivo principal: `index.js`;
- Autor: Sergio Murilo Ferreira Rocha;
- Licença: ISC;
- Tipo de módulo: CommonJS.

O projeto também possui uma configuração inicial de script para testes utilizando NPM.

## Estrutura do projeto

A estrutura apresentada é:

aula01-revisao-nodejs-npm/
│
├── diagnostico.js
├── package.json
└── README.md

## Tecnologias utilizadas

- Node.js
- JavaScript
- NPM
- Módulo nativo `os`

## Resultado

Ao executar o arquivo `diagnostico.js`, o programa realiza o diagnóstico da máquina e 
exibe no terminal informações sobre o sistema operacional, memória RAM e processador.

Dessa forma, foi possível praticar a utilização de módulos nativos do Node.js, comandos 
JavaScript, manipulação de informações do sistema e configuração de um projeto através 
do NPM.

## Conclusão

A atividade permitiu revisar conceitos fundamentais do Node.js e compreender como o 
módulo `os` pode ser utilizado para obter informações do computador. Também foi 
praticada a configuração básica de um projeto utilizando o arquivo `package.json` e 
a organização dos arquivos do projeto.