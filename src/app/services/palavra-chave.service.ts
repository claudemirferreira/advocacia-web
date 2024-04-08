import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PalavraChave } from '../models/palavra-chave';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PalavraChaveService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  findAll(): Observable<PalavraChave[]> {
    return this.http.get<PalavraChave[]>(this.apiUrl+'palavra-chave/');
  }

  save(palavraChave: PalavraChave): Observable<PalavraChave> {
    return this.http.post<PalavraChave>(this.apiUrl+'palavra-chave/', palavraChave);
  }

  deleteById(id: number): Observable<any> {
    return this.http.delete<any>(this.apiUrl+`palavra-chave/${id}`);
  }

  findById(id: string): Observable<PalavraChave> {
    return this.http.get<PalavraChave>(this.apiUrl+'palavra-chave/'+id);
  }

}
