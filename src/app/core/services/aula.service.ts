import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { AulaCreate, AulaResponse, AulaUpdate } from '../../models/api.models';

@Injectable({ providedIn: 'root' })
export class AulaService {
  private readonly base = `${environment.apiUrl}/aulas`;

  constructor(private readonly http: HttpClient) {}

  list(): Observable<AulaResponse[]> {
    const params = new HttpParams().set('skip', 0).set('limit', 500);
    return this.http.get<AulaResponse[]>(`${this.base}/`, { params });
  }

  get(id: string): Observable<AulaResponse> {
    return this.http.get<AulaResponse>(`${this.base}/${id}`);
  }

  create(body: AulaCreate): Observable<AulaResponse> {
    return this.http.post<AulaResponse>(`${this.base}/`, body);
  }

  update(id: string, body: AulaUpdate): Observable<AulaResponse> {
    return this.http.put<AulaResponse>(`${this.base}/${id}`, body);
  }

  delete(id: string): Observable<void> {
    return this.http.delete(`${this.base}/${id}`, { observe: 'response' }).pipe(map(() => undefined));
  }
}