import express from 'express';

const app = express();
app.use(express.json());

process.on('uncaughtException', (err) =>{
    console.error('[ERRO DE PROCESSO - uncaughtException]:', err.message);
});

process.on('unhadledRejection', (reason) =>{
    console.error('[PROMISE REJEITADA - unhandledRejrction]:', reason);
});

app.get('/sucesso', (req, res) => {
    res.json({success: true, message: 'Operação Realizada com sucesso'});
});

app.get('/erro-sincrono',(req, res, next) => {
    try{
        throw new Error('Falha ao Processo a Regra de Negocio');
    }catch(erro){
        next(erro);
    }
    });

    app.get('erro-assincrono',async (req, res, next) => {
        try{
            await Promise.reject(new Error('Erro na consulta no banco de dados externo'));
        }catch(erro){
            next(erro);
        }
    });
