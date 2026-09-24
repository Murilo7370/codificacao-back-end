import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class JogosService {
    private jogos = [
        {id: 1, titulo: 'Minecraft', estudio:'Mojang Studio'},
        {id:2, titulo: 'The Legend of Zelda: Ocarina of time', estudio:'Nintendo'},
        {id:3, titulo: 'Grand theft Auto V', estudio:'Rockstar North'},
        {id:4, titulo: 'Elden Ring', estudio: 'FromSofware'},
        {id:5, titulo: 'God of War', estudio: 'Santa Monica Studio'},

    ];

    buscarPorId(id:number){
        const jogo = this.jogos.find((j) => j.id === id);
        if(!jogo){
            throw new NotFoundException(`Jogo com ID ${id} nao localizado em nosso estoque.`);
        }
        return jogo;
    }
}