import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { catchError, Observable, tap } from 'rxjs';
import { randomUUID } from 'crypto';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const traceId = randomUUID();
    const className = context.getClass().name;
    const handlerName = context.getHandler().name;
    const request = context.switchToHttp().getRequest();
    const methodArguments = {
      params: request.params,
      query: request.query,
      body: request.body,
    };
    const timestamp = new Date().toISOString();
    return next.handle().pipe(
      tap(() =>
        console.log(
          `[${timestamp}] traceId=${traceId} class=${className}, method=${handlerName}, params=${this.safeStringify(methodArguments)}`,
        ),
      ),
      catchError((err) => {
        console.log(
          `[${timestamp}] traceId=${traceId} - Error in class=${className}, method=${handlerName}, error=${err.message}`,
        );
        throw err;
      }),
    );
  }

  private safeStringify(obj: any): string {
    const seen = new WeakSet();
    return JSON.stringify(obj, (_key, value) => {
      if (typeof value === 'object' && value !== null) {
        if (seen.has(value)) {
          return;
        }
        seen.add(value);
      }
      return value;
    });
  }
}
