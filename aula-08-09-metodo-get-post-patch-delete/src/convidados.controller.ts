import { Controller, Get, Post, Body, Patch, Delete, Param, HttpCode } from "@nestjs/common"
import { CriarConvidadoDto } from "./criar-convitado.dto.js"
import { ConvidadosService } from "./convidados.service.js";

@Controller('convidados')
export class ConvidadosController {

    constructor(private readonly convidadoService : ConvidadosService){}

    @Get()
    listaConvidados(){
        return this.convidadoService.listarConvidados();
    }

    @Post()
    criarConvidado(@Body() criarConvidado: CriarConvidadoDto){
        console.log(`[OPERADOR NAYRA] Convidado(a) Resgitrado: ${criarConvidado.nome}`);

        return{
            mensagem: `Convidado(a) ${criarConvidado.nome}, foi adicionado(a) com sucesso!`,
            dados: criarConvidado
        }
    }
    @Patch(':id')
    atualizarIdade(@Param('id') id: string, @Body('idade') idade: number) {
        console.log(`[ADMINISTRADOR] Atualizando idade do ID ${id}`);
        return this.convidadoService.atualizarIdade(+id, idade);
    }

@Delete(':id')
@HttpCode(204)
removerConvidado(@Param('id') id:string){
    console.log(`[ADMINISTRADOR] Convidado com ID $ID ${id} removido com Sucesso!`);
    this.convidadoService.removerConvidadoLista(+id);
}

}