import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { HorarioCreate, HorarioResponse, HorarioUpdate } from '../../models/api.models';

@Injectable({ providedIn: 'root' })
export class HorarioService {
  private readonly base = `${environment.apiUrl}/horarios`;

  constructor(private readonly http: HttpClient) {}

  list(): Observable<HorarioResponse[]> {
    const params = new HttpParams().set('skip', 0).set('limit', 500);
    return this.http.get<HorarioResponse[]>(`${this.base}/`, { params });
  }

  get(id: string): Observable<HorarioResponse> {
    return this.http.get<HorarioResponse>(`${this.base}/${id}`);
  }

  create(body: HorarioCreate): Observable<HorarioResponse> {
    return this.http.post<HorarioResponse>(`${this.base}/`, body);
  }

  update(id: string, body: HorarioUpdate): Observable<HorarioResponse> {
    return this.http.put<HorarioResponse>(`${this.base}/${id}`, body);
  }

  delete(id: string): Observable<void> {
    return this.http.delete(`${this.base}/${id}`, { observe: 'response' }).pipe(map(() => undefined));
  }
}