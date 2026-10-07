# ⚡ Aula — Edge Runtime e Função Executada na Borda

## 📚 Introdução

Nesta aula foi desenvolvido um exemplo de **função executada no Edge Runtime**, utilizando TypeScript e o objeto `Request` da Web API.

O objetivo foi compreender como uma aplicação pode executar funções mais próximas do usuário por meio de uma infraestrutura de borda de rede, além de praticar o retorno de informações através de uma resposta HTTP no formato **JSON**.

A implementação também apresenta informações como o horário de execução, a região configurada e o tempo necessário para executar a função.

---

## 🛠️ Desenvolvimento

Durante a aula foi criada uma função utilizando a configuração:

```typescript
export const config = {
    runtime: 'edge',
};
```

Essa configuração define que a função será executada utilizando o **Edge Runtime**, permitindo que ela seja executada em uma infraestrutura distribuída de borda.

Em seguida, foi criado um handler assíncrono responsável por receber uma requisição HTTP:

```typescript
export default async function handler(req: Request) {
```

No início da execução, foi registrado o horário para posteriormente calcular o tempo necessário para processar a função:

```typescript
const inicio = new Date();
```

A função retorna uma resposta HTTP utilizando `Response`, contendo um objeto convertido para JSON:

```typescript
return new Response(
    JSON.stringify({
        mensagem: 'Funçao executada na borda de rede',
        horarioDoServidor: new Date().toISOString(),
        regiao: 'local-dev',
        tempoDeExecuçao: `${Date.now() - inicio.getTime()}ms`,
    }),
```

### 📌 Informações retornadas

A resposta apresenta quatro informações principais:

* **mensagem:** informa que a função foi executada na borda de rede;
* **horarioDoServidor:** apresenta o horário em que a função foi executada;
* **regiao:** identifica a região utilizada no ambiente de desenvolvimento;
* **tempoDeExecuçao:** informa quanto tempo a função levou para ser executada.

Também foi configurado o status HTTP como `200`, indicando que a requisição foi processada com sucesso:

```typescript
status: 200,
```

Para informar que o conteúdo retornado está no formato JSON, foi definido o cabeçalho:

```typescript
headers: {
    'content-type': 'application/json',
},
```

Dessa forma, o cliente que realiza a requisição consegue interpretar corretamente o conteúdo retornado pela API.

---

## 💻 Tecnologias e conceitos utilizados

Durante a implementação foram utilizados:

* **TypeScript**
* **Edge Runtime**
* **Request**
* **Response**
* **JSON**
* **HTTP Status Code**
* **HTTP Headers**
* **Date**
* **Funções assíncronas**
* **Execução em borda de rede**

---

## 📋 Exemplo de resposta

Ao executar a função, uma resposta semelhante a esta pode ser recebida:

```json
{
    "mensagem": "Funçao executada na borda de rede",
    "horarioDoServidor": "2026-10-06T00:00:00.000Z",
    "regiao": "local-dev",
    "tempoDeExecuçao": "1ms"
}
```

Os valores de `horarioDoServidor` e `tempoDeExecuçao` podem variar de acordo com o momento e o ambiente em que a função for executada.

---

## 🎯 Objetivo da aula

O principal objetivo da aula foi compreender o funcionamento de uma função executada em um ambiente de **Edge Runtime**, praticando a criação de um handler HTTP e o envio de uma resposta estruturada em JSON.

Além disso, foi possível aprender como medir o tempo de execução de uma função e como configurar corretamente o status HTTP e os cabeçalhos da resposta.

---

## ✅ Conclusão

Nesta aula foi possível compreender na prática como criar uma função utilizando **Edge Runtime**, receber uma requisição HTTP e retornar uma resposta no formato JSON.

Também foi praticado o uso de `Date` para registrar o horário de execução e calcular o tempo necessário para processar a função. A configuração do status `200` e do cabeçalho `content-type` permitiu criar uma resposta HTTP adequada para o cliente.

Com essa implementação, foi possível reforçar conhecimentos sobre **APIs, HTTP, JSON, TypeScript e execução em ambientes de borda**, conceitos importantes para o desenvolvimento de aplicações modernas e distribuídas.
