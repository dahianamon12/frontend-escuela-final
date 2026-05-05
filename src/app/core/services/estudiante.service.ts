import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { EstudianteCreate, EstudianteResponse, EstudianteUpdate } from '../../models/api.models';

@Injectable({ providedIn: 'root' })
export class EstudianteService {
  private readonly base = `${environment.apiUrl}/estudiantes`;

  constructor(private readonly http: HttpClient) {}

  list(): Observable<EstudianteResponse[]> {
    const params = new HttpParams().set('skip', 0).set('limit', 500);
    return this.http.get<EstudianteResponse[]>(`${this.base}/`, { params });
  }

  get(id: string): Observable<EstudianteResponse> {
    return this.http.get<EstudianteResponse>(`${this.base}/${id}`);
  }

  create(body: EstudianteCreate): Observable<EstudianteResponse> {
    return this.http.post<EstudianteResponse>(`${this.base}/`, body);
  }

  update(id: string, body: EstudianteUpdate): Observable<EstudianteResponse> {
    return this.http.put<EstudianteResponse>(`${this.base}/${id}`, body);
  }

  delete(id: string): Observable<void> {
    return this.http.delete(`${this.base}/${id}`, { observe: 'response' }).pipe(map(() => undefined));
  }
}