import { z } from 'zod';

export const coloboradorSchema = z.object({
    nome: z.string()
    .min(3, {message: 'O nome deve ter no minimo 3 letras!'}),
    email: z.email({message:'O email deve ser valido!'}),
    idade: z.number({message:'A idade minima deve ser um numero valido!'})
    .min(18, {message: 'A idade minima permitida e 18 anos!'})
    .max(65,{message: 'A idade maxima permitida e 65 anos!'}),
    departamento: z.enum(['TI', 'RH', 'Comercial', 'Financeiro'],{
        error: () => (
            {message: 'Departamento deve ser obrigatorimente TI, RH , Comercial ou Financeiro'}),
    }),
});

export type Colaborador = z.infer<typeof coloboradorSchema>;