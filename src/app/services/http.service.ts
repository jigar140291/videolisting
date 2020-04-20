import {Injectable, Inject} from '@angular/core';
import {Http, Response, RequestOptions, Request, Headers} from '@angular/http';

declare let ApiUrl:any;

@Injectable()
export class httpService {
    constructor(private http:Http) {
    }
    readonly apiUrl: string = "";
    
    getHeader = () => {
        let headers = new Headers();
        headers.append("Content-Type", 'application/json');

        return headers;
    };

    request = (req) => {
        let baseUrl = ApiUrl,
            requestOptions = new RequestOptions({
                method: req.method,
                url: `${this.apiUrl}/${req.endPoint}`,
                body: req.params
            });

        return this.http.request(new Request(requestOptions));
    }
}