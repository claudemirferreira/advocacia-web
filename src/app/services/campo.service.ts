import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Campo } from '../models/campo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CampoService {

  private apiUrl = 'http://localhost:8080/';

  constructor(private http: HttpClient) { }

  findAll(): Observable<Campo[]> {
    return this.http.get<Campo[]>(this.apiUrl+'campo/');
  }

  save(campo: Campo): Observable<Campo> {
    return this.http.post<Campo>(this.apiUrl+'campo/', campo);
  }

  deleteById(id: number): Observable<any> {
    return this.http.delete<any>(this.apiUrl+`campo/${id}`);
  }

  findById(id: string): Observable<Campo> {
    return this.http.get<Campo>(this.apiUrl+'campo/'+id);
  }

}
