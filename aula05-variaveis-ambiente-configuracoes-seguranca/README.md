# Aula 05 — Variáveis de Ambiente, Configurações e Segurança

Este projeto foi desenvolvido durante a **Aula 05**, com o objetivo de praticar conceitos relacionados a **variáveis de ambiente, configurações e segurança** em uma aplicação Node.js.

## 📁 Estrutura do Projeto

A pasta do projeto possui os seguintes arquivos:

```text
aula05-variaveis-ambiente-configuracoes-seguranca/
│
├── .env.example
├── .gitignore
├── README.md
├── app.js
├── package-lock.json
└── package.json
```

## 📄 Descrição dos Arquivos

### `.env.example`

Arquivo utilizado como modelo para as variáveis de ambiente necessárias para executar a aplicação.

Ele serve para indicar quais configurações devem ser utilizadas sem expor informações sensíveis, como senhas, chaves ou tokens.

### `.gitignore`

Arquivo responsável por definir quais arquivos e pastas não devem ser enviados para o Git.

Um dos principais objetivos é impedir que arquivos com informações sensíveis, como o `.env`, sejam versionados no repositório.

### `README.md`

Arquivo responsável por documentar o projeto, apresentando sua finalidade, estrutura e instruções para execução.

### `app.js`

Arquivo principal da aplicação Node.js. É responsável pela execução do código e pelas configurações necessárias para o funcionamento do projeto.

### `package.json`

Arquivo de configuração do projeto Node.js.

Nele ficam informações como:

* Nome do projeto;
* Versão;
* Scripts de execução;
* Dependências utilizadas;
* Configurações do projeto.

### `package-lock.json`

Arquivo gerado pelo npm que registra as versões específicas das dependências instaladas no projeto, garantindo maior consistência na instalação dos pacotes.

## 🔐 Segurança

Durante a aula, foi trabalhada a importância de não deixar informações sensíveis diretamente no código-fonte.

As variáveis de ambiente podem ser utilizadas para armazenar informações de configuração, como:

```text
PORT=3000
DATABASE_URL=...
API_KEY=...
```

O arquivo `.env` deve permanecer fora do controle de versão quando contiver informações reais e sensíveis.

Por isso, o `.gitignore` é utilizado para evitar que esse arquivo seja enviado ao repositório.

## ⚙️ Tecnologias Utilizadas

* **Node.js**
* **JavaScript**
* **npm**
* **Git e GitHub**
* **Variáveis de ambiente**

## ▶️ Como Executar o Projeto

### 1. Acessar a pasta do projeto

```bash
cd aula05-variaveis-ambiente-configuracoes-seguranca
```

### 2. Instalar as dependências

```bash
npm install
```

### 3. Configurar as variáveis de ambiente

Crie um arquivo `.env` com base no arquivo `.env.example`.

Exemplo:

```bash
cp .env.example .env
```

No Windows, também é possível criar o arquivo `.env` manualmente copiando o conteúdo do `.env.example`.

### 4. Executar a aplicação

Dependendo da configuração definida no `package.json`, utilize:

```bash
npm start
```

ou:

```bash
node app.js
```

## 🎯 Objetivos da Aula

O projeto teve como principais objetivos:

* Compreender o uso de variáveis de ambiente;
* Separar configurações do código da aplicação;
* Evitar o compartilhamento de informações sensíveis;
* Utilizar corretamente o `.gitignore`;
* Configurar um projeto Node.js;
* Trabalhar com o npm e suas dependências;
* Organizar e documentar uma aplicação.

## ✅ Conclusão

A atividade permitiu colocar em prática conceitos importantes para o desenvolvimento de aplicações Node.js, principalmente relacionados à **organização das configurações e segurança das informações**.

A utilização de arquivos como `.env`, `.env.example` e `.gitignore` contribui para manter o projeto mais organizado e reduzir o risco de informações sensíveis serem expostas no repositório.
