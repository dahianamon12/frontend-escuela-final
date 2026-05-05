import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { DepartamentoCreate, DepartamentoResponse, DepartamentoUpdate } from '../../models/api.models';

@Injectable({ providedIn: 'root' })
export class DepartamentoService {
  private readonly base = `${environment.apiUrl}/departamentos`;

  constructor(private readonly http: HttpClient) {}

  list(): Observable<DepartamentoResponse[]> {
    const params = new HttpParams().set('skip', 0).set('limit', 500);
    return this.http.get<DepartamentoResponse[]>(`${this.base}/`, { params });
  }

  get(id: string): Observable<DepartamentoResponse> {
    return this.http.get<DepartamentoResponse>(`${this.base}/${id}`);
  }

  create(body: DepartamentoCreate): Observable<DepartamentoResponse> {
    return this.http.post<DepartamentoResponse>(`${this.base}/`, body);
  }

  update(id: string, body: DepartamentoUpdate): Observable<DepartamentoResponse> {
    return this.http.put<DepartamentoResponse>(`${this.base}/${id}`, body);
  }

  delete(id: string): Observable<void> {
    return this.http.delete(`${this.base}/${id}`, { observe: 'response' }).pipe(map(() => undefined));
  }
}