import { ApiProperty } from "@nestjs/swagger";

export class CriarProdutoDto{
    //!nome do produto
    @ApiProperty({
        example:'Cafe Grão de Ouro 500g',
        description:'Nome comercial do produto cadastrado.',

    })
    nome:string;

    //!Preço do produto
    @ApiProperty({
        example:9.99,
        description:'Preço unirtario do produto',

    })
    preco:number;

    //!genero do produto

    @ApiProperty({
        example:'Alimentos',
        description:'Categoria do Produto'

    })
    categoria:string;
}