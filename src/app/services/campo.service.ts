import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Campo } from '../models/campo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CampoService {

  private apiUrl = 'http://localhost:8080/campo/';

  constructor(private http: HttpClient) { }

  findAll(): Observable<Campo[]> {
    return this.http.get<Campo[]>(this.apiUrl);
  }
}
