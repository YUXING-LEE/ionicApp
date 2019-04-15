import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ApiEndpoint } from '../consts/api-endpoint.const';

import { book } from '../models/book.model';

@Injectable()
export class BookService extends BaseService {

    serverURL = "https://leehome.herokuapp.com";

    public getBooks(): Observable<book[]> {
        return this.http.get(this.serverURL + '/api/book', this.getRequestOptions())
            .pipe(map(ApiEndpoint.ExtractData),
                catchError(ApiEndpoint.HandleError));
    }

    public saveBook(book: object): Observable<any> {
        return this.http.post(this.serverURL + '/api/book', book, this.getRequestOptions())
            .pipe(map(ApiEndpoint.ExtractData),
                catchError(ApiEndpoint.HandleError));
    }

    public getBookDetail(id: string): Observable<book> {
        return this.http.get(this.serverURL + '/api/book/' + id, this.getRequestOptions())
            .pipe(map(ApiEndpoint.ExtractData),
                catchError(ApiEndpoint.HandleError));
    }

    public deletebook(id: string): Observable<any> {
        return this.http.delete(this.serverURL + '/api/book/' + id, this.getRequestOptions())
            .pipe(map(ApiEndpoint.ExtractData),
                catchError(ApiEndpoint.HandleError));
    }

    public updateBook(id: string, book: book): Observable<book> {
        return this.http.put(this.serverURL + '/api/book/' + id, book, this.getRequestOptions())
            .pipe(map(ApiEndpoint.ExtractData),
                catchError(ApiEndpoint.HandleError));
    }

}
