# Aula 17 - Documentação Técnica com Swagger (NestJS)

API de estoque de alimentos construída com **NestJS**, com documentação técnica interativa gerada pelo **Swagger** (`@nestjs/swagger`).

## O que foi desenvolvido

- Configuração do Swagger no `main.ts` (título, descrição, versão, tag e autenticação Bearer)
- Módulo raiz (`AppModule`) registrando o controller de produtos
- Controller `produtos` com a rota `POST /produtos` para cadastrar um produto, documentada com `@ApiTags`, `@ApiOperation` e `@ApiResponse`
- DTO `CriarProdutoDto` com as propriedades documentadas via `@ApiProperty` (descrição e exemplo)

## Estrutura do projeto

```
aula-17-documentacao-tecnica-com-swagger-nestjs/
└── src/
    ├── main.ts
    ├── app.module.ts
    └── produtos/
        ├── produtos.controller.ts
        └── dto/
            └── criar-produto.dto.ts
```

## Detalhes por arquivo

### `src/main.ts`

Cria a aplicação Nest, monta a documentação com `DocumentBuilder` e publica a interface do Swagger na rota `/docs`. A API sobe na porta **3000**.

```ts
import {
  NestFactory,
} from "@nestjs/core";
import {
  AppModule,
} from "./app.module.js";
import {
  DocumentBuilder,
} from "@nestjs/swagger";
import {
  SwaggerModule,
} from "@nestjs/swagger";

const config = new DocumentBuilder()
  .setTitle('API de estoque de Alimentos')
  .setDescription('Documentação tecnica interativa para integraçao')
  .setVersion('1.0')
  .addTag('Produtos')
  .addBearerAuth()
  .build();

const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('docs', app, document);

await app.listen(3000);
```

| Configuração     | Valor                                           |
| ---------------- | ----------------------------------------------- |
| Título           | API de estoque de Alimentos                     |
| Descrição        | Documentação técnica interativa para integração |
| Versão           | 1.0                                             |
| Tag              | Produtos                                        |
| Autenticação     | Bearer (`addBearerAuth`)                        |
| Rota do Swagger  | `/docs`                                         |
| Porta            | 3000                                            |

### `src/app.module.ts`

Módulo raiz que registra o controller de produtos (sem `imports` nem `providers` por enquanto).

```ts
@Module({
  imports: [],
  controllers: [ProdutosControllerr],
  providers: [],
})
export class AppModule {}
```

### `src/produtos/produtos.controller.ts`

Controller com a rota `POST /produtos`, que recebe um `CriarProdutoDto` no corpo da requisição.

Decorators do Swagger utilizados:

- `@ApiTags('produtos')`: agrupa as rotas na interface do Swagger
- `@ApiOperation({ summary })`: descreve a operação ("Cadastrar um novo produto no estoque")
- `@ApiResponse` com status **201**: produto cadastrado com sucesso
- `@ApiResponse` com status **400**: payload com dados mal formatados e/ou inválidos

O método `criar` retorna um objeto simulado (ainda sem banco de dados):

```ts
return {
  id: 67,
  ...criarprodutodto,
  criadoEm: new Date().toLocaleDateString(),
};
```

### `src/produtos/dto/criar-produto.dto.ts`

DTO que define o formato do corpo da requisição, com `@ApiProperty` em cada campo para exibir descrição e exemplo no Swagger.

| Campo       | Tipo     | Exemplo               | Descrição                        |
| ----------- | -------- | --------------------- | -------------------------------- |
| `nome`      | `string` | `Cafe Grão de Ouro 500g` | Nome comercial do produto cadastrado |
| `preco`     | `number` | `9.99`                | Preço unitário do produto        |
| `categoria` | `string` | `Alimentos`           | Categoria do produto             |

## Como executar

```bash
npm install
npm run start:dev
```

Depois acesse a documentação interativa em: **http://localhost:3000/docs**

## Exemplo de requisição

`POST /produtos`

```json
{
  "nome": "Cafe Grão de Ouro 500g",
  "preco": 9.99,
  "categoria": "Alimentos"
}
```

Resposta esperada (`201`):

```json
{
  "id": 67,
  "nome": "Cafe Grão de Ouro 500g",
  "preco": 9.99,
  "categoria": "Alimentos",
  "criadoEm": "16/10/2026"
}
```

## Conceitos praticados

- Documentação de APIs com Swagger/OpenAPI no NestJS
- Decorators `@ApiTags`, `@ApiOperation`, `@ApiResponse` e `@ApiProperty`
- DTOs para tipar e documentar o corpo das requisições
- Organização em módulos e controllers
- Autenticação Bearer na documentação

## Pontos de atenção

- O nome da classe do controller está como `ProdutosControllerr` (com dois "r"); vale renomear para `ProdutosController` no controller e no `app.module.ts`.
- O texto do `summary` contém um erro de digitação ("nop estoque"), assim como "Playload" na descrição do 400 (o correto é "Payload").
- O `id` retornado está fixo (`67`) e os dados não são persistidos; o próximo passo natural é criar um service e integrar um banco de dados.
- Não há validação automática dos campos; pode-se adicionar `class-validator` com `ValidationPipe` para que o retorno 400 documentado realmente aconteça.

## Conclusão

A aula 17 mostrou que documentar uma API pode acontecer junto com o desenvolvimento. Com o `@nestjs/swagger`, a documentação nasce no próprio código e se mantém atualizada. Ao configurar o `DocumentBuilder` no `main.ts` e publicar a interface na rota `/docs`, a API ganhou uma página interativa onde qualquer pessoa pode entender e testar os endpoints sem ler o código-fonte.

No controller de produtos, os decorators `@ApiTags`, `@ApiOperation` e `@ApiResponse` deixaram a rota `POST /produtos` autoexplicativa, documentando os cenários de sucesso (201) e de erro (400). No `CriarProdutoDto`, o `@ApiProperty` descreve cada campo e traz um exemplo, o que ajuda quem for integrar com a API.

Como a lógica ainda é simulada (id fixo, sem banco de dados e sem validação dos campos), os próximos passos são criar um service, integrar um banco de dados, adicionar validação com `class-validator` e corrigir os detalhes de nomenclatura e digitação.
