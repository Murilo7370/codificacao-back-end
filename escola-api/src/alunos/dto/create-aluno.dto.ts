import { IsString,
    IsNotEmpty,
    IsInt,
    Min,
    IsArray,
    ArrayMinSize } from "class-validator";


export class CreateAlunoDto {
    @IsString()
    @IsNotEmpty({
        message:'O nome é obrigatorio e não pode esta vazio!'
    })
    nome: string;

    @IsInt({
        message:'A idade deve ser um nome inteiro'
    })
    @Min(0,{
        message:'A idade não pode ser negativa'
    })

    idade: number;

    @IsString()
    @IsNotEmpty({
        message:'A matricula e obrigatória'
    })
    matricula: string;

    @IsString({each: true, message:'Cada curso deve ser um texto'})
    @IsArray()
    @ArrayMinSize(1,{
        message:'O aluno deve esta matriculado em pelo menos um curso'
    })
    cursos: string[];

}