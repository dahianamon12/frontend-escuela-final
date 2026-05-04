import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { AsistenciaCreate, AsistenciaResponse, AsistenciaUpdate } from '../../models/api.models';

@Injectable({ providedIn: 'root' })
export class AsistenciaService {
  private readonly base = `${environment.apiUrl}/asistencias`;

  constructor(private readonly http: HttpClient) {}

  list(): Observable<AsistenciaResponse[]> {
    const params = new HttpParams().set('skip', 0).set('limit', 500);
    return this.http.get<AsistenciaResponse[]>(`${this.base}/`, { params });
  }

  get(id: string): Observable<AsistenciaResponse> {
    return this.http.get<AsistenciaResponse>(`${this.base}/${id}`);
  }

  create(body: AsistenciaCreate): Observable<AsistenciaResponse> {
    return this.http.post<AsistenciaResponse>(`${this.base}/`, body);
  }

  update(id: string, body: AsistenciaUpdate): Observable<AsistenciaResponse> {
    return this.http.put<AsistenciaResponse>(`${this.base}/${id}`, body);
  }

  delete(id: string): Observable<void> {
    return this.http.delete(`${this.base}/${id}`, { observe: 'response' }).pipe(map(() => undefined));
  }
}