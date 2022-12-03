import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus
  } from '@nestjs/common';
  import { isArray } from 'lodash'
  
  
  @Catch()
  export class AllExceptionFilter implements ExceptionFilter {
  
    catch(exception: any, host: ArgumentsHost) {
      const ctx       = host.switchToHttp();
      const response  = ctx.getResponse();
      const request   = ctx.getRequest();
  
      const statusCode =
        exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR;
  
      const _exception =
        exception instanceof HttpException ? exception.getResponse() : exception;
  
      let message = 
        _exception && _exception.statusCode  && _exception.statusCode == 400 ? 'Debes ingresar el nombre de la banda!' :
        _exception && _exception.statusCode  && _exception.statusCode == 404 ? 'Ruta no encontrada.' :
        _exception && _exception.statusCode  && _exception.statusCode == 500 ? 'Error interno.' :
        _exception && _exception.message && !isArray(_exception.message) ? _exception.message : '';
    
      response.status(statusCode).json({
        code: statusCode,
        message,
        data: [],
        errors: _exception,
      });
  
    }
  }
  