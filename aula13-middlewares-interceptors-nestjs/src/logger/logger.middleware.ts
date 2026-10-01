import { Injectable, NestMiddleware } from '@nestjs/common';
import type { Request, Response , NextFunction} from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const currentUrl = req.originalUrl || req.url;
    console.log(`[LOG] Metodo: ${req.method} | Rota: ${req.path}`);
    if(currentUrl.startsWith('/admin')){
      const base = req.headers['x-user-base'];
      if(base !== 'Administrator'){
        return res.status(403).json({
          Codigo: 403,
          message: 'Acesso negado: Previlegio de Administrator necessario',
          registro: new Date,
        })
      }
    }
    next();
  }
}
