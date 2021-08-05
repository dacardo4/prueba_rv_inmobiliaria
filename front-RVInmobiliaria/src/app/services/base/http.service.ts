import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private urlHttp: string = 'http://localhost:3000/';

  constructor(
    private http: HttpClient
  ) { }

  httpGet(url: string): any {
    return this.http.get(this.urlHttp + url);
  }

  httpPost(url: string, data: any): any {
    return this.http.post(this.urlHttp + url, data);
  }

  httpPatch(url: string, data: any): any {
    return this.http.patch(this.urlHttp + url, data);
  }

  httpDelete(url: string): any {
    return this.http.delete(this.urlHttp + url);
  }
}
