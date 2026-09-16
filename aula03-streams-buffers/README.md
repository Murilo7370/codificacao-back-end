# 📡 Node.js Streams & Buffers - Processamento Avançado de Logs

Este repositório contém uma aplicação prática focada no estudo de **Streams**, **Buffers** e gerenciamento de memória em **Node.js**. O objetivo do projeto é demonstrar como manipular grandes volumes de dados (Big Data / Large Text Files) de forma assíncrona e performática, evitando estouro de memória (*Out of Memory Errors*).

---

## 🎯 Objetivos de Aprendizado

* Entender o funcionamento de **Streams de Escrita (`WriteStream`)** para gerar grande volume de dados.
* Implementar **Streams de Leitura (`ReadStream`)** integradas ao módulo `readline` para processamento linha a linha.
* Aplicar filtros de texto em tempo real sem carregar todo o arquivo na memória RAM.
* Monitorar o consumo de memória (*Resident Set Size* - RSS e *Heap Memory*) durante o ciclo de vida do processo Node.js.

---

## 🛠️ Tecnologias Utilizadas

* **Node.js** (Ambiente de execução JavaScript)
* **ES Modules** (`import/export`)
* **Módulo `fs`** (File System - Streams nativas)
* **Módulo `readline`** (Interface para leitura iterativa por linha)
* **Módulo `process`** (Análise de consumo de memória em tempo real)

---

## 📂 Arquivos do Projeto

| Arquivo / Pasta | Tipo | Descrição |
| :--- | :--- | :--- |
| `gerarLogGigante.js` | Código Fonte | Script responsável por gerar 40.000 linhas simuladas de log de servidor de forma eficiente. |
| `processarLogs.js` | Código Fonte | Script principal que lê o log em *stream*, filtra apenas eventos de erro e monitora a memória RAM. |
| `servidor.log` | Dado Gerado | Arquivo bruto contendo todo o histórico de logs gerados (múltiplas ocorrências `INFO` e `ERROR`). |
| `apenas_erros.log` | Dado Gerado | Arquivo resultante contendo exclusivamente os registros de erro extraídos pelo filtro. |
| `README.md` | Documentação | Documentação detalhada da estrutura e funcionamento do projeto. |

---

## ⚙️ Como Funciona o Algoritmo

### 1. Geração dos Dados (`gerarLogGigante.js`)
O script cria uma stream de escrita para o arquivo `servidor.log`. Através de um laço de repetição de 40.000 iterações, ele grava registros no formato:
`[YYYY-MM-DD - HH:MM:SS] Linha X:status 200 - Mensagem de teste TYPE`

A cada 7 iterações, o tipo de log alterna para `ERROR`, garantindo um padrão de dados realista para testes.

### 2. Filtragem e Análise (`processarLogs.js`)
Em vez de ler os megabytes de arquivo usando `fs.readFileSync` (o que alocaria o arquivo inteiro na memória), o script faz o seguinte:
1. Registra o consumo inicial de memória RAM via `process.memoryUsage()`.
2. Cria uma `ReadStream` acoplada à interface `readline`.
3. Executa um loop assíncrono `for await (const linha of leitorLinhaALinha)` processando linha a linha à medida que os *chunks* chegam do disco.
4. Grava na `WriteStream` do `apenas_erros.log` somente as linhas que contêm a substring `'ERROR'`.
5. Exibe no final a contagem total de erros e o consumo final de memória RAM