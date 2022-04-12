import { UseInterceptors, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { plainToInstance } from "class-transformer";

interface ClassConstructor {
    new (...args: any[]): {}
}


export function Serialize(dto: ClassConstructor) {
    return UseInterceptors(new SerializeInterceptor(dto));
}

/*The class that the app uses to intercept response objects across all routes in order to remove extraneous values*/

export class SerializeInterceptor implements NestInterceptor{
    constructor(private dto: any){}

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
        return next.handle().pipe(
            map((data: any) => {
               return plainToInstance(this.dto, data, {
                   excludeExtraneousValues: true
               })
            })
        );
    }
}
