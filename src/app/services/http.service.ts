import {Injectable, Inject} from '@angular/core';
import {Http, Response, RequestOptions, Request, Headers} from '@angular/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

@Injectable({
    providedIn: 'root',
})

export class HttpService {
    readonly apiUrl: string = "http://localhost:3000";

    constructor(private http:Http) {}
    
    getHeader = () => {
        let headers = new Headers();
        headers.append("Content-Type", 'application/json');

        return headers;
    };

    request = (req) => {
        let {method, endPoint} = req;
        
        let options = new RequestOptions({
            method: method,
            url: `${this.apiUrl}/${endPoint}`,
            headers: this.getHeader(),
            body: req.params || {}
        });

        return this.http.request(new Request(options))
            .pipe(map(res => res.json()));
        
    }
}