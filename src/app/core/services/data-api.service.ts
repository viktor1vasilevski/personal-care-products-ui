import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataApiService<T> {

  constructor(private _http: HttpClient) {}

  getAll(url: string, params?: HttpParams): Observable<T[]> {
    return this._http.get<T[]>(url, { params });
  }

  getById(apiUrl: string, id: number): Observable<T> {
    return this._http.get<T>(`${apiUrl}/${id}`);
  }

  create(apiUrl: string, item: T): Observable<T> {
    return this._http.post<T>(apiUrl, item);
  }

  update(apiUrl: string, id: number, item: T): Observable<T> {
    return this._http.put<T>(`${apiUrl}/${id}`, item);
  }

  delete(apiUrl: string, id: number): Observable<void> {
    return this._http.delete<void>(`${apiUrl}/${id}`);
  }
}
