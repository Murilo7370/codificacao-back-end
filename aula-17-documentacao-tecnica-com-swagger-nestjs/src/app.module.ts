import { Module } from '@nestjs/common';
import { ProdutosControllerr } from './produtos/produtos.controller.js';


@Module({
  imports: [],
  controllers: [ProdutosControllerr],
  providers: [],
})
export class AppModule {}
