import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Modelo } from '../models/modelo';
import { CampoValor } from '../models/campo-valor';
import { ModeloDocumento } from '../models/modelo-documento';

@Injectable({
  providedIn: 'root',
})
export class ModeloService {
  private apiUrl = 'http://localhost:8080/';

  constructor(private http: HttpClient) {}

  findAll(): Observable<Modelo[]> {
    return this.http.get<Modelo[]>(this.apiUrl + 'modelo/');
  }

  findAllCampoValor(): Observable<CampoValor[]> {
    return this.http.get<CampoValor[]>(this.apiUrl + 'modelo/campo-valor');
  }

  save(modelo: Modelo): Observable<Modelo> {
    return this.http.post<Modelo>(this.apiUrl + 'modelo/', modelo);
  }

  deleteById(id: number): Observable<any> {
    return this.http.delete<any>(this.apiUrl + `modelo/${id}`);
  }

  findById(id: string): Observable<Modelo> {
    return this.http.get<Modelo>(this.apiUrl + 'modelo/' + id);
  }

  download(): Observable<Blob> {
    return this.http.get(`http://localhost:8080/modelo/1/download`, {
      responseType: 'blob', // Define o tipo de resposta como Blob
    });
  }

  gerarDocumento(modeloDocumento: ModeloDocumento): Observable<Blob> {
    return this.http.post(
      `http://localhost:8080/modelo/campo-valor`,
      modeloDocumento,
      {
        responseType: 'blob', // Define o tipo de resposta como Blob
      }
    );
  }

  upload(file: File, id: number): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    const req = new HttpRequest(
      'POST',
      `${this.apiUrl}modelo/${id}/savefile`,
      formData,
      {
        reportProgress: true,
        responseType: 'json',
      }
    );
    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this.http.get(`${this.apiUrl}/files`);
  }
}
