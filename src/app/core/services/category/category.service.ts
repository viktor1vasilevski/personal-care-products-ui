import { Injectable } from '@angular/core';
import { environment } from '../../../../enviroment/enviroment.dev';
import { DataApiService } from '../data-api.service';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { RESOURCE_PATH } from '../../../shared/constants/endpoints/resource-path';
import { API_ENDPOINTS } from '../../../shared/constants/endpoints/api-endpoints';
import { QueryResponse } from '../../../models/responses/query-response.model';
import { Category } from '../../../models/category/category.model';
import { SingleResponse } from '../../../models/responses/single-response.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseUrl = environment.apiUrl;

  constructor(private _dataApiService: DataApiService<any>) {}

  getCategories(paramsObj: { [key: string]: any } = {}): Observable<QueryResponse<Category[]>> {
    const params = new HttpParams({ fromObject: paramsObj });
    const url = `${this.baseUrl}/${RESOURCE_PATH.CATEGORY}/${API_ENDPOINTS.GET}`;
    return this._dataApiService.getAll<QueryResponse<Category[]>>(url, params);
  }
  
  createCategory(categoryData: { name: string }): Observable<any> {
    const url = `${this.baseUrl}/${RESOURCE_PATH.CATEGORY}/${API_ENDPOINTS.CREATE}`;
    return this._dataApiService.create(url, categoryData);
  }
  
  deleteCategory(id: string): Observable<SingleResponse<Category>> {
    const url = `${this.baseUrl}/${RESOURCE_PATH.CATEGORY}/${API_ENDPOINTS.DELETE}/${id}`;
    return this._dataApiService.delete(url);
  }

  getCategoryById(id: string): Observable<any> {
    const url = `${this.baseUrl}/${RESOURCE_PATH.CATEGORY}/${API_ENDPOINTS.GET_BY_ID}`;
    return this._dataApiService.getById(url, id);
  }

  updateCategory(id: string, categoryData: { name: string }): Observable<any> {
    const url = `${this.baseUrl}/${RESOURCE_PATH.CATEGORY}/${API_ENDPOINTS.UPDATE}/${id}`;
    return this._dataApiService.update(url, categoryData);
  }
  
  
  
}
