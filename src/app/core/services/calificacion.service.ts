import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { CalificacionCreate, CalificacionResponse, CalificacionUpdate } from '../../models/api.models';

@Injectable({ providedIn: 'root' })
export class CalificacionService {
  private readonly base = `${environment.apiUrl}/calificaciones`;

  constructor(private readonly http: HttpClient) {}

  list(): Observable<CalificacionResponse[]> {
    const params = new HttpParams().set('skip', 0).set('limit', 500);
    return this.http.get<CalificacionResponse[]>(`${this.base}/`, { params });
  }

  get(id: string): Observable<CalificacionResponse> {
    return this.http.get<CalificacionResponse>(`${this.base}/${id}`);
  }

  create(body: CalificacionCreate): Observable<CalificacionResponse> {
    return this.http.post<CalificacionResponse>(`${this.base}/`, body);
  }

  update(id: string, body: CalificacionUpdate): Observable<CalificacionResponse> {
    return this.http.put<CalificacionResponse>(`${this.base}/${id}`, body);
  }

  delete(id: string): Observable<void> {
    return this.http.delete(`${this.base}/${id}`, { observe: 'response' }).pipe(map(() => undefined));
  }
}