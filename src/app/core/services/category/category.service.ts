import { Injectable } from '@angular/core';
import { environment } from '../../../../enviroment/enviroment.dev';
import { DataApiService } from '../data-api.service';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { API_ENDPOINTS } from '../../../shared/constants/api-endpoints';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseUrl = environment.apiUrl;

  constructor(private _dataApiService: DataApiService<any>) {}

  getCategories(paramsObj: { [key: string]: any } = {}): Observable<any[]> {
    const params = new HttpParams({ fromObject: paramsObj });
    const url = `${this.baseUrl}${API_ENDPOINTS.CATEGORY}${API_ENDPOINTS.GET}`;
    return this._dataApiService.getAll(url, params);
  }

  createCategory(categoryData: { name: string }): Observable<any> {
    const url = `${this.baseUrl}${API_ENDPOINTS.CATEGORY}${API_ENDPOINTS.CREATE}`;
    return this._dataApiService.create(url, categoryData);  // Pass categoryData as an object
  }
  
  deleteCategory(id: string): Observable<any> {
    const url = `${this.baseUrl}${API_ENDPOINTS.CATEGORY}${API_ENDPOINTS.DELETE}/${id}`;
    return this._dataApiService.delete(url);
  }
  
  
}
