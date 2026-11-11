import { IsString,
    IsNotEmpty,
    IsInt,
    Min,
    IsArray,
    ArrayMinSize } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateAlunoDto {

@ApiProperty({
    example:"Matheus Souza",
    description:'nome do aluno',
})

    @IsString()
    @IsNotEmpty({
        message:'O nome é obrigatorio e não pode esta vazio!'
    })
    nome:string;

    @IsInt({
        message:'A idade deve ser um nome inteiro'
    })

    @Min(0,{
        message:'A idade não pode ser negativa'
    })

    @ApiProperty({
        example:30,
        description:'idade do aluno'
    })

    idade:number;

    @ApiProperty({
        example:9999,
        description:'Matricula do aluno'
    })
    @IsString()
    @IsNotEmpty({
        message:'A matricula e obrigatória'
    })
    
    matricula:string;

    @ApiProperty({
        example:['Ciencia da computaçao', 'Letras Portgues'],
        description:'Cursos em que o aluno esta matriculado'
    })

    @IsString({each: true, message:'Cada curso deve ser um texto'})
    @IsArray()
    @ArrayMinSize(1,{
        message:'O aluno deve esta matriculado em pelo menos um curso'
    })
    cursos:string[];
}