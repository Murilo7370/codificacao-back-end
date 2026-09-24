# 🎮 Aula 10 — Rotas Dinâmicas com NestJS

## 📚 Descrição

Nesta aula foi desenvolvido um projeto utilizando **NestJS** com o objetivo de compreender o funcionamento das **rotas dinâmicas** e o uso de parâmetros enviados pela URL.

Foi criado um sistema simples de consulta de jogos, no qual é possível informar o **ID de um jogo** na rota e receber suas informações.

Durante o desenvolvimento foram trabalhados conceitos importantes de desenvolvimento backend, como **Controllers, Services, injeção de dependência, parâmetros de rota, Pipes e tratamento de exceções**.

---

## 🎯 Objetivos da Aula

- Compreender o funcionamento das rotas dinâmicas;
- Criar endpoints utilizando o método `GET`;
- Receber parâmetros através da URL;
- Utilizar `@Param()` para acessar parâmetros da rota;
- Utilizar `ParseIntPipe` para conversão e validação do parâmetro;
- Separar responsabilidades entre Controller e Service;
- Trabalhar com injeção de dependência;
- Utilizar `NotFoundException` para tratamento de erros;
- Organizar os componentes no `AppModule`.

---

## 🛠️ Tecnologias Utilizadas

- **Node.js**
- **NestJS**
- **TypeScript**
- **JavaScript**
- **Visual Studio Code**

---

# 📁 Estrutura do Projeto

```text
aula-10-rotas-dinamicas/
│
├── src/
│   ├── app.controller.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   ├── jogos.controller.ts
│   └── jogos.service.ts
│
├── package.json
├── tsconfig.json
└── README.md
Resultado Final

Ao final da aula, foi desenvolvida uma API capaz de receber um ID de jogo através da URL, realizar a busca desse jogo e retornar suas informações.

A implementação permitiu compreender, na prática, como funciona uma rota dinâmica no NestJS, utilizando o parâmetro :id para realizar diferentes consultas através de uma única rota.

Também foi possível entender a importância da separação entre Controller e Service. O Controller ficou responsável pelo recebimento das requisições, enquanto o Service concentrou a lógica de busca dos jogos.

Além disso, foi implementado o ParseIntPipe para trabalhar corretamente com o parâmetro recebido e o NotFoundException para tratar situações em que o jogo solicitado não está cadastrado.

Conclusão

A aula foi importante para aprofundar os conhecimentos sobre o desenvolvimento de APIs utilizando NestJS. Através da implementação das rotas dinâmicas, foi possível entender como uma aplicação backend pode receber informações diretamente pela URL e utilizá-las para realizar operações específicas.

O desenvolvimento também reforçou conceitos fundamentais da arquitetura do NestJS, principalmente a utilização de Controllers, Services e Injeção de Dependência, mostrando como cada parte da aplicação possui uma responsabilidade específica.

Com essa prática, foi possível construir uma API mais organizada e compreender melhor o fluxo de uma requisição desde o momento em que ela chega ao Controller até a execução da lógica no Service e o retorno da resposta ao cliente.