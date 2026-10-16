import { Controller, Post,Body } from "@nestjs/common";
import { ApiTags,ApiOperation, ApiResponse } from "@nestjs/swagger";
import { CriarProdutoDto } from "./dto/criar-produto.dto.js";

@ApiTags('produtos')
@Controller('produtos')
export class ProdutosControllerr{
    @Post()
    @ApiOperation({
        summary:'Cadastrar um novo produto nop estoque',
    })
    @ApiResponse({
         status: 201,
         description:'Produto Cadastrado com sucesso.',
    })
    @ApiResponse({
        status:400,
        description:'Playload enviado contem dados mal formatados e/ou invalidos.'
    })
    async criar(@Body() criarprodutodto: CriarProdutoDto){
        return{
            id:67,
            ...criarprodutodto,
            criadoEm: new Date().toLocaleDateString(),
        };
    }
}