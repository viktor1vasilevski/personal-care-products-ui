import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataApiService<T> {

  constructor(private _http: HttpClient) {}

  getAll(apiUrl: string, params?: HttpParams): Observable<T[]> {
    return this._http.get<T[]>(apiUrl, { params });
  }

  getById(apiUrl: string, id: string): Observable<T> {
    return this._http.get<T>(`${apiUrl}/${id}`);
  }

  create(apiUrl: string, item: any): Observable<T> {
    return this._http.post<T>(apiUrl, item, {
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  update(apiUrl: string, id: number, item: T): Observable<T> {
    return this._http.put<T>(`${apiUrl}/${id}`, item);
  }

  delete(apiUrl: string): Observable<T> {
    return this._http.delete<T>(apiUrl);
  }
  
}
