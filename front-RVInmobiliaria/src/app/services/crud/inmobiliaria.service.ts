import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../base/http.service';

@Injectable({
  providedIn: 'root'
})
export class InmobiliariaService {

  private urlName = "inmuebles";

  constructor(
    private _httpService: HttpService,
  ) { }

  getAllInmueble(): Observable<any> {
    let url: string = `${this.urlName}`;
    return this._httpService.httpGet(url);
  }

  getAllInmuebleWithAllData(): Observable<any> {
    let url: string = `${this.urlName}?filter={"include":[{"relation":"miCiudadEs","scope":{"include":[{"relation":"seEncuentraEn","scope":{"include":[{"relation":"miPaisEs"}]}}]}}]}`;
    return this._httpService.httpGet(url);
  }

  getInmuebleByIdWithAllData(id: number): Observable<any> {
    let url: string = `${this.urlName}/${id}?filter={"include":[{"relation":"miCiudadEs","scope":{"include":[{"relation":"seEncuentraEn","scope":{"include":[{"relation":"miPaisEs"}]}}]}}]}`;
    return this._httpService.httpGet(url);
  }

  postInmueble(data: any): Observable<any> {
    let url: string = this.urlName;
    return this._httpService.httpPost(url, data);
  }

  patchInmueble(id:string, data: any): Observable<any> {
    let url: string = `${this.urlName}/${id}`;
    return this._httpService.httpPatch(url, data);
  }
}
