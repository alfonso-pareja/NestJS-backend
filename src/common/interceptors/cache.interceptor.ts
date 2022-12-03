import {
    CacheInterceptor,
    ExecutionContext,
    Injectable,
} from '@nestjs/common';

@Injectable()
export class HttpCacheInterceptor extends CacheInterceptor {
    trackBy(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const { httpAdapter } = this.httpAdapterHost;
        const isGetRequest = httpAdapter.getRequestMethod(request) === 'GET';
        const excludePaths = [];
        if (
            !isGetRequest ||
            (isGetRequest &&
                excludePaths.includes(httpAdapter.getRequestUrl(request)))
        ) {
            return undefined;
        }
        return httpAdapter.getRequestUrl(request);
    }
}