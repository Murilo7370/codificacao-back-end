import { Controller, Get, Post, Body } from "@nestjs/common"
import { CriarConvidadoDto } from "./criar-convitado.dto.js"

@Controller('convidados')
export class ConvidadosController {

    @Get()
    listaConvidados(){
        return[
            'Rebeca',
            'Liam',
            'Cauê',
            'Emanuelly',
            'Jamilly',
            'Vitoria',

        ];
    }

    @Post()
    criarConvidado(@Body() criarConvidado: CriarConvidadoDto){
        console.log(`[OPERADOR NAYRA] Convidado(a) Resgitrado: ${criarConvidado.nome}`);

        return{
            mensagem: `Convidado(a) ${criarConvidado.nome}, foi adicionado(a) com sucesso!`,
            dados: criarConvidado
        }
    }
}