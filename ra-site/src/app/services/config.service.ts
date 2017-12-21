import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigSettings } from '../model/ConfigSettings';

@Injectable()
export class ConfigService {

    private _config: ConfigSettings;

    constructor(private http: HttpClient){}

    load(): Promise<any>{
        return this.http.get('assets/apiUrl.json')
              .toPromise()
              .then(data => {
                  this._config = <ConfigSettings>data;
                  return data;
               })
    }
    
    get config(): ConfigSettings {
        return this._config;
    }
}