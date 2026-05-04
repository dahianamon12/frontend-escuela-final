import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { GradoCreate, GradoResponse, GradoUpdate } from '../../models/api.models';

@Injectable({ providedIn: 'root' })
export class GradoService {
  private readonly base = `${environment.apiUrl}/grados`;

  constructor(private readonly http: HttpClient) {}

  list(): Observable<GradoResponse[]> {
    const params = new HttpParams().set('skip', 0).set('limit', 500);
    return this.http.get<GradoResponse[]>(`${this.base}/`, { params });
  }

  get(id: string): Observable<GradoResponse> {
    return this.http.get<GradoResponse>(`${this.base}/${id}`);
  }

  create(body: GradoCreate): Observable<GradoResponse> {
    return this.http.post<GradoResponse>(`${this.base}/`, body);
  }

  update(id: string, body: GradoUpdate): Observable<GradoResponse> {
    return this.http.put<GradoResponse>(`${this.base}/${id}`, body);
  }

  delete(id: string): Observable<void> {
    return this.http.delete(`${this.base}/${id}`, { observe: 'response' }).pipe(map(() => undefined));
  }
}