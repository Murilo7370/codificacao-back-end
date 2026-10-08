Aula 15 – Tratamento de Erros e Status Codes (NestJS)
📖 Introdução

Nesta aula foi desenvolvida uma pequena API com NestJS e TypeScript para praticar o tratamento de erros e o uso correto dos status codes HTTP.

A ideia é simples: uma API de produtos (itens de mercado) que lista todos os produtos e busca um produto específico pelo ID. Quando algo dá errado, a API não "quebra": ela responde com o erro adequado e uma mensagem clara.

Conceitos praticados:

Controllers, Services e Modules do NestJS
Injeção de dependência
Rotas com parâmetros (@Param)
Exceções HTTP nativas do Nest (BadRequestException e NotFoundException)
Registro de logs com o Logger
🗂️ Estrutura do projeto
aula-15-tratamento-erros-status-codes/
├── dist/
├── node_modules/
└── src/
    ├── app.controller.spec.ts
    ├── app.controller.ts
    ├── app.module.ts
    ├── app.service.ts
    ├── main.ts
    ├── produtos.controller.ts
    └── produtos.service.ts

Os arquivos criados nesta aula foram o produtos.controller.ts e o produtos.service.ts, além do registro deles no app.module.ts.

🛠️ Desenvolvimento das etapas
Etapa 1 – Criar o Service de produtos

No arquivo produtos.service.ts foi criada a classe ProdutosService, marcada com @Injectable(), para que o Nest possa injetá-la em outras classes.

Ela guarda uma lista de produtos em memória (simulando um banco de dados) e possui o método listarProdutos(), que retorna essa lista.

ts
import { Injectable } from "@nestjs/common";

@Injectable()
export class ProdutosService {
    produtos = [
        { id: 2, nome: 'Feijão timbiras', preco: 7.99 },
        { id: 3, nome: 'Macarrão Galo', preco: 5.99 },
        { id: 4, nome: 'Açucar Uniao', preco: 4.99 },
        { id: 5, nome: 'Sal Lebre', preco: 2.99 },
        // ... demais produtos (cada um com id, nome e preco)
    ];

    listarProdutos() {
        return this.produtos;
    }
}

Cada produto tem id (number), nome (string) e preco (number).

Etapa 2 – Criar o Controller de produtos

No arquivo produtos.controller.ts foi criada a classe ProdutosController, com o prefixo de rota produtos (@Controller('produtos')).

Nela foram feitas duas coisas importantes:

Injeção do Service pelo construtor: private readonly produtosService: ProdutosService.
Criação de um Logger: new Logger(ProdutosController.name), usado para registrar avisos no console quando algo inesperado acontece.

O método produtos() apenas devolve a lista completa, chamando this.produtosService.listarProdutos().

Etapa 3 – Criar a rota de busca por ID

Foi criada a rota GET /produtos/:id, que recebe o ID pela URL com @Param('id').

Como parâmetros de URL chegam sempre como string, o valor é convertido com Number(idProduto).

ts
@Get(':id')
buscarProduto(@Param('id') idProduto: string) {
    const id = Number(idProduto);
    // validações abaixo...
}
Etapa 4 – Tratar os erros

Aqui está o foco da aula. Dois cenários de erro foram tratados:

❌ 400 – Bad Request (ID inválido)

Se o ID enviado não for um número (por exemplo /produtos/abc), o isNaN(id) identifica o problema. O erro é registrado no log e a API responde com BadRequestException.

ts
if (isNaN(id)) {
    this.logger.warn(`Tentativa de buscar com ID ${idProduto} não numerico.`);
    throw new BadRequestException('O ID do produto deve ser um numero inteiro.');
}
❌ 404 – Not Found (produto não existe)

Se o ID for válido, mas nenhum produto tiver esse ID (por exemplo /produtos/99), o log é registrado e a API responde com NotFoundException.

ts
const produto = this.produtos().find((produto) => produto.id === id);

if (!produto) {
    this.logger.warn(`Produto com ID ${id} não localizado.`);
    throw new NotFoundException(`Produto com ID ${id} não encontrado.`);
}

return produto;
✅ 200 – OK

Se o ID for válido e o produto existir, ele é retornado normalmente.

Etapa 5 – Registrar no Módulo

Por fim, no app.module.ts, o controller foi adicionado em controllers e o service em providers. Sem isso, o Nest não reconhece as novas classes.

ts
@Module({
    imports: [],
    controllers: [AppController, ProdutosController],
    providers: [AppService, ProdutosService],
})
export class AppModule {}

Observação: os imports usam a extensão .js (ex.: ./produtos.service.js), padrão de projetos TypeScript com ES Modules.

🧪 Resumo das respostas da API
Requisição	Situação	Status	Resultado
GET /produtos	Listagem	200	Lista de todos os produtos
GET /produtos/2	ID existente	200	Objeto do produto
GET /produtos/abc	ID não numérico	400	"O ID do produto deve ser um numero inteiro."
GET /produtos/99	ID inexistente	404	"Produto com ID 99 não encontrado."
✅ Conclusão

Nesta aula foi possível entender que tratar erros não é só evitar que a aplicação caia: é também comunicar com clareza o que aconteceu a quem consome a API.

Os principais aprendizados foram:

Usar o status code correto para cada situação (200, 400 e 404).
Aproveitar as exceções prontas do NestJS (BadRequestException e NotFoundException), que já montam a resposta HTTP certa.
Validar a entrada do usuário antes de usá-la (conversão e checagem com Number e isNaN).
Registrar logs com o Logger para facilitar a identificação de problemas.
Separar responsabilidades: o Service guarda os dados e o Controller cuida das rotas e das validações.