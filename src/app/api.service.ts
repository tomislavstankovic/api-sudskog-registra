import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

   httpOptions = {
    headers: new HttpHeaders({
      'Ocp-Apim-Subscription-Key': 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
    })
  };

  constructor(private _http: HttpClient) { }

  sudskiRegistarOIB(oib:any) {
    return this._http.get('https://sudreg-api.pravosudje.hr/javni/subjekt_detalji?tipIdentifikatora=oib&identifikator='+oib+'&expand_relations=true', this.httpOptions)
      .pipe(map((res: any) => res ));
  }

  sudskiRegistarMBS(mbs:any) {
    return this._http.get('https://sudreg-api.pravosudje.hr/javni/subjekt_detalji?tipIdentifikatora=mbs&identifikator='+mbs+'&expand_relations=true', this.httpOptions)
      .pipe(map((res: any) => res ));
  }

}