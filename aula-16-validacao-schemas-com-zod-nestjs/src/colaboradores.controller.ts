import { Controller, Post, Body, UsePipes } from "@nestjs/common";
import { coloboradorSchema} from "./colaborador.schema.js";
import { ZodValidationPipe } from "./zod-validation.pipe.js";
import type { Colaborador } from "./colaborador.schema.js";
import { create } from "domain";

@Controller('colaboradores')
export class ColaboradoresController {
    @Post()
    @UsePipes(new ZodValidationPipe(coloboradorSchema))
    async create(@Body() body: Colaborador){
        return{
            mensagem: 'Colaborador cadastrado com sucesso',
            dados: body,
        }
    }
}


