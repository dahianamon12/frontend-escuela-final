import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { ProfesorCreate, ProfesorResponse, ProfesorUpdate } from '../../models/api.models';

@Injectable({ providedIn: 'root' })
export class ProfesorService {
  private readonly base = `${environment.apiUrl}/profesores`;

  constructor(private readonly http: HttpClient) {}

  list(): Observable<ProfesorResponse[]> {
    const params = new HttpParams().set('skip', 0).set('limit', 500);
    return this.http.get<ProfesorResponse[]>(`${this.base}/`, { params });
  }

  get(id: string): Observable<ProfesorResponse> {
    return this.http.get<ProfesorResponse>(`${this.base}/${id}`);
  }

  create(body: ProfesorCreate): Observable<ProfesorResponse> {
    return this.http.post<ProfesorResponse>(`${this.base}/`, body);
  }

  update(id: string, body: ProfesorUpdate): Observable<ProfesorResponse> {
    return this.http.put<ProfesorResponse>(`${this.base}/${id}`, body);
  }

  delete(id: string): Observable<void> {
    return this.http.delete(`${this.base}/${id}`, { observe: 'response' }).pipe(map(() => undefined));
  }
}