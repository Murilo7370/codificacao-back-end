import { Controller,
         Get, 
         Post, 
         Body, 
         Patch, 
         Param, 
         Delete,
         Query,
         DefaultValuePipe,
         ParseIntPipe} from '@nestjs/common';
import { AlunosService } from './alunos.service.js';
import { CreateAlunoDto } from './dto/create-aluno.dto.js';
import { UpdateAlunoDto } from './dto/update-aluno.dto.js';
import { ApiTags,
    ApiResponse,
    ApiOperation,
    ApiQuery } from '@nestjs/swagger';

    @ApiTags('alunos')
    @Controller('alunos')
export class AlunosController{
   constructor(private readonly alunosService: AlunosService){}

   @Post()
   @ApiOperation({
    summary: 'Criar a Matricula do aluno'
   })
   @ApiResponse({
    status: 201,
    description: 'Aluno criado com sucesso',
   })
   @ApiResponse({
    status: 400,
    description: 'Requisição invalida ou dados de entrada incorretos/mal formatada'
   })
    create(@Body()createAlunoDto: CreateAlunoDto){
        return this.alunosService.create(createAlunoDto);
    }

    //@Get()
    //@ApiOperation({
       // summary: 'Listar todos os alunos',
    //})
    //@ApiResponse({
        //status: 200,
        //description:'Lista de alunos retornada com sucesso',
   // })
    //@ApiResponse({
       // status: 404,
        //description: 'Nenhum aluno encontrado',
    //})
    //findAll(){
        //return this.alunosService.findAll();
    //}

    @Get()
    @ApiOperation({
        summary: 'Listar alunos com paginação',
    }) 
    @ApiResponse({
        status: 200,
        description: 'Lista de alunos retornada com sucesso',
    })
    @ApiResponse({
        status:500,
        description: 'Erro interno no servidor',
    })
    @ApiQuery({
        name:'page',
        required:false,
        type: Number,
        description: 'Numero da pagina (padrão:1)',
    })
    @ApiQuery({
        name: 'limit',
        required: false,
        type: Number,
        description: 'Numero de itens por pagina (padrão: 10)',
    })

    @ApiQuery({
        name: 'nome',
        required: false,
        type: String,
        description: 'Filtrar alunos pelo nome (ex: Jamilly)',
    })

    @ApiQuery({
        name: 'curso',
        required: false,
        type: String,
        description: 'Filtrar alunos pelo curso (ex: Engenharia Civil)',
    })
    findPage(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number, 
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('nome')nome?:string,
    @Query('curso')curso?:string
    ){
        return this.alunosService.findPage(page, limit, nome, curso);
    }

    @Get(':id')
    @ApiOperation({
        summary: 'Obter detalhes de um especifico',
    })
    @ApiResponse({
        status:200,
        description:'Detalhes do aluno retornados com sucesso',
    })
    @ApiResponse({
        status:404,
        description: 'Aluno não encontrado',
    })
    findOne(@Param('id') id: string){
        return this.alunosService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({
        summary:'Atualizar informaçoes de um aluno especifico',
    })
    @ApiResponse({
        status:200,
        description: 'Informaçoes do aluno atualizadas com sucesso',
    })
    @ApiResponse({
        status:404,
        description:'Aluno nao encontrado'
    })
    update(@Param('id') id: string, @Body() updateAlunoDto : UpdateAlunoDto){
        return this.alunosService.update(id, updateAlunoDto);
    }

    @Delete(":id")
    @ApiOperation({
        summary:'Remover um aluno especifico',
    })
    @ApiResponse({
        status: 200,
        description:'Aluno removido com sucesso',
    })
    @ApiResponse({
        status:404,
        description:'Aluno nao encontrado',
    })
    remove(@Param('id') id: string){
        return this.alunosService.remove(id);
    }
}