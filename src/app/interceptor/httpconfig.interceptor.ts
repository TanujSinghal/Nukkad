import { Injectable } from '@angular/core';
import { SpinnerService } from '../spinner.service';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError, timer } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { MessageService } from 'primeng/api';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
    reqestCount = 0;
    constructor(private spinnerService: SpinnerService, private messageService: MessageService) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.reqestCount++;
        this.spinnerService.show();
        return timer(100).pipe(
            switchMap(()=> next.handle(request).pipe(
                map((event: HttpEvent<any>) => {
                    // if (event instanceof HttpResponse) {
                    //     console.log('event--->>>', event);
                    // }
                    if(event.type == 4) this.reqestCount--;
                    if (this.reqestCount == 0) this.spinnerService.hide();
                    return event;
                }),
                catchError((error: HttpErrorResponse) => {
                    let data = {};
                    data = {
                        reason: error && error.error && error.error.reason ? error.error.reason : '',
                        status: error.status
                    };
                    // console.log(data);
                    this.messageService.add({key: 'custom', severity: 'error', summary: 'Erorr', detail: error.message});
                    this.reqestCount--;
                    if (this.reqestCount == 0) this.spinnerService.hide();
                    return throwError(error);
                })
            ))
        );
    }
}