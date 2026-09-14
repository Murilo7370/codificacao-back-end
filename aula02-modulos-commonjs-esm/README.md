 Aula 02: Módulos e CommonJS vs. ESM — Guia Completo

![NodeJS](https://img.shields.io/badge/Node.js-v18%2B-green?style=for-the-badge&logo=node.js)
![JavaScript](https://img.shields.io/badge/ECMAScript-ESM-yellow?style=for-the-badge&logo=javascript)
![UC](https://img.shields.io/badge/UC-Codificação_para_Back--End-blue?style=for-the-badge)
![SENAI](https://img.shields.io/badge/SENAI-AMAPÁ-orange?style=for-the-badge)

Documentação completa da *Aula 02* da Unidade Curricular de *Codificação para Back-End* (SENAI - AMAPÁ). Esta aula aborda a arquitetura de modularização do Node.js, a transição do ecossistema *CommonJS* para *ES Modules (ESM)*, e a manipulação prática do sistema operacional usando módulos nativos (path e fs).

---

## Por Que Modularizar?

A modularização é um dos pilares do desenvolvimento Back-End profissional. Dividir uma aplicação monolítica em módulos independentes oferece três grandes vantagens:

1. *Divisão de Responsabilidades (Single Responsibility Principle):* Cada arquivo cuida de uma única parte da lógica. Isso mantém o código previsível e isolado.
2. *Reutilização de Código:* Funções utilitárias, validações e conexões com banco de dados podem ser reaproveitadas em múltiplos pontos da aplicação.
3. *Manutenibilidade:* Corrigir bugs ou refatorar um módulo de 50 linhas é incomparavelmente mais rápido e seguro do que alterar um arquivo único com milhares de linhas.

---

## Comparativo Técnico: CommonJS vs. ECMAScript Modules (ESM)

O Node.js suporta dois sistemas de módulos. O conhecimento de ambos é essencial para trabalhar com código legado e aplicações modernas.

| Característica | CommonJS (CJS) | ES Modules (ESM) |
| :--- | :--- | :--- |
| *Sintaxe de Importação* | const modulo = require('./modulo'); | import modulo from './modulo.js'; |
| *Sintaxe de Exportação* | module.exports = { ... }; | export default ... ou export { ... } |
| *Padrão de Origem* | Tradicional e histórico do Node.js | Padrão oficial do JavaScript (Browsers e Node) |
| *Carregamento* | *Síncrono* (Bloqueia até carregar) | *Assíncrono* (Otimizado para parsing) |
| *Ativação no Node.js* | Padrão ativado em arquivos .js | "type": "module" no package.json ou extensão .mjs |
| *Suporte a Top-level Await* | ❌ Não suportado | ✅ Suportado nativamente no nível raiz |

---

## Módulos Nativos do Node.js

O Node.js possui ferramentas integradas para interagir com o ambiente do servidor sem a necessidade de instalar pacotes externos.

### 1. Módulo path (Manipulação de Caminhos)
Lida de forma multiplataforma com estruturas de diretórios (diferenças de barras entre Windows \ e Linux/macOS /).

* *path.join(...paths)*: Une segmentos de caminho de forma segura.
* *path.extname(path)*: Extrai a extensão do arquivo (ex: .js, .log, .json).
* *path.resolve(...paths)*: Resolve um caminho absoluto a partir do diretório atual.

### 2. Módulo fs (File System)
Permite ler, criar, atualizar, renomear e excluir arquivos e pastas no servidor.

* *Síncrono (Bloqueante):* fs.readFileSync(), fs.writeFileSync(), fs.existsSync(), fs.mkdirSync().
* *Assíncrono via Promises (Recomendado):* fs.promises.readFile(), fs.promises.writeFile().

---

## Atividade Prática: O Organizador de Logs

Aplicação de um sistema automático para verificação de diretórios, formatação de timestamps e gravação de logs do sistema em disco.

### Estrutura do Projeto

text
aula02-organizador-logs/
├── logs/
│   └── system.log          # Gerado automaticamente na execução
├── package.json            # Configuração do projeto habilitando ESM
├── utils.js                # Módulo utilitário de formatação
└── index.js                # Ponto de entrada do script principal

## Implementação dos Arquivos

Este projeto demonstra a utilização de *ESM (ECMAScript Modules)* e dos módulos nativos fs e path do Node.js para criar um sistema simples de organização de logs.

## Estrutura do Projeto

text
aula02-organizador-logs/
├── package.json
├── index.js
├── utils.js
└── logs/
    └── system.log


---

## 1. package.json

Configurado com "type": "module" para permitir a utilização da sintaxe import e export.

json
{
  "name": "aula02-modulos-commonjs-esm",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "Matheus de Sousa dos Santos",
  "license": "ISC",
  "type": "module"
}



---

## 2. utils.js — Módulo de Utilidade

Exporta uma função responsável por formatar uma mensagem de log com a data atual no formato:

text
[YYYY-MM-DD HH:MM:SS] - Mensagem


javascript
/**
 * Formata uma mensagem adicionando o timestamp atual.
 * @param {string} mensagem - Texto da mensagem a ser formatada.
 * @returns {string} Mensagem formatada com timestamp.
 */
export function formatLog (mensagem) { 
    const dataAtual = new Date().toISOString().split('T')[0];
    const horaAtual = new Date().toLocaleTimeString();
    return `[${dataAtual} ${horaAtual}]  - ${mensagem}`;
}


---

## 3. index.js — Módulo Principal

Importa o módulo de utilidade, verifica a existência da pasta logs/ utilizando os módulos nativos path e fs e registra uma mensagem no arquivo system.log.

javascript
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { formatLog } from './utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function salvarLogSystem(mensagemLog){
    try {
        const pastaLog = path.join(__dirname, 'logs');
        const arquivoLog = path.join(pastaLog, 'system.log');

        await fs.mkdir(pastaLog, {recursive:true});
        const registroLog = formatLog(mensagemLog);
        await fs.appendFile(arquivoLog, registroLog, 'utf-8');

        console.log('Log Registrado com sucesso!');
    } catch(erro){
        console.error('Erro ao Registrar Log: ', erro);
    }
}
salvarLogSystem('Inicialização do servidor concluída!\n');
salvarLogSystem('Conexão com o banco de dados estabelecida!\n');


---

# ▶️ Executando o Projeto

No terminal, acesse a pasta do projeto e execute:

bash
npm start


Ou, alternativamente:

bash
node index.js


---

## ✅ Resultado Esperado

Ao executar o projeto pela primeira vez, a pasta logs/ será criada automaticamente.

Dentro dela será criado o arquivo:

text
logs/system.log


O arquivo conterá uma mensagem semelhante a:

text
[2026-09-11 16:16:46]  - Inicialização do servidor concluída!
[2026-09-11 16:16:46]  - Conexão com o banco de dados estabelecida! operando.


A cada nova execução do projeto, uma nova mensagem será adicionada ao final do arquivo system.log.