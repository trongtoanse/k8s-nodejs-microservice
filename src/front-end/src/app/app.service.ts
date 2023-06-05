import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Worker } from "../model/worker.model";

@Injectable()
export class AppService {
  constructor(private http: HttpClient) {
  }

  getData(userId: string) {
    let headers = new HttpHeaders({
      "User-Id": userId
    });
    return this.http.get<Worker>(environment.worker + `/api/data`, { headers: headers });
  }
}
