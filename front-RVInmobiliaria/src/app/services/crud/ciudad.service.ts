import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../base/http.service';

@Injectable({
  providedIn: 'root'
})
export class CiudadService {

  private urlName = "ciudades";

  constructor(
    private _httpService: HttpService,
  ) { }

  getAllCiudad(): Observable<any> {
    let url: string = `${this.urlName}`;
    return this._httpService.httpGet(url);
  }

  getAllCiudadWithAllData(): Observable<any> {
    let url: string = `${this.urlName}?filter={"include":[{"relation":"seEncuentraEn","scope":{"include":[{"relation":"miPaisEs"}]}}]}`;
    return this._httpService.httpGet(url);
  }

  getCiudadByIdWithAllData(id: number): Observable<any> {
    let url: string = `${this.urlName}/${id}?filter={"include":[{"relation":"seEncuentraEn","scope":{"include":[{"relation":"miPaisEs"}]}}]}`;
    return this._httpService.httpGet(url);
  }

  postCiudad(data: any): Observable<any> {
    let url: string = this.urlName;
    return this._httpService.httpPost(url, data);
  }

  patchCiudad(id:string, data: any): Observable<any> {
    let url: string = `${this.urlName}/${id}`;
    return this._httpService.httpPatch(url, data);
  }
}
