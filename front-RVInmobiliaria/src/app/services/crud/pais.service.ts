import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../base/http.service';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  private urlName = "paises";

  constructor(
    private _httpService: HttpService,
  ) { }

  getAllPais(): Observable<any> {
    let url: string = `${this.urlName}`;
    return this._httpService.httpGet(url);
  }

  postPais(data: any): Observable<any> {
    let url: string = this.urlName;
    return this._httpService.httpPost(url, data);
  }

  patchPais(id:string, data: any): Observable<any> {
    let url: string = `${this.urlName}/${id}`;
    return this._httpService.httpPatch(url, data);
  }
}
