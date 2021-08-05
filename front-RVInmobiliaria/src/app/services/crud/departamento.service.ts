import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../base/http.service';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  private urlName = "departamentos";

  constructor(
    private _httpService: HttpService,
  ) { }

  getAllDepartamento(): Observable<any> {
    let url: string = `${this.urlName}`;
    return this._httpService.httpGet(url);
  }

  getAllDepartamentoWithAllData(): Observable<any> {
    let url: string = `${this.urlName}?filter={"include":[{"relation":"miPaisEs"}]}`;
    return this._httpService.httpGet(url);
  }

  getDepartamentoByIdWithAllData(id: number): Observable<any> {
    let url: string = `${this.urlName}/${id}?filter={"include":[{"relation":"miPaisEs"}]}`;
    return this._httpService.httpGet(url);
  }

  postDepartamento(data: any): Observable<any> {
    let url: string = this.urlName;
    return this._httpService.httpPost(url, data);
  }

  patchDepartamento(id:string, data: any): Observable<any> {
    let url: string = `${this.urlName}/${id}`;
    return this._httpService.httpPatch(url, data);
  }
}
