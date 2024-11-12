import { Injectable } from '@angular/core';
import { environment } from '../../../../enviroment/enviroment.dev';
import { DataApiService } from '../data-api.service';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { RESOURCE_PATH } from '../../../shared/constants/endpoints/resource-path';
import { QueryResponse } from '../../../models/responses/query-response.model';
import { Subcategory } from '../../../models/subcategory/subcategory.model';
import { API_ENDPOINTS } from '../../../shared/constants/endpoints/api-endpoints';
import { SingleResponse } from '../../../models/responses/single-response.model';
import { SubcategoryRequest } from '../../../models/requests/subcategory-request.model';

@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {

  private baseUrl = environment.apiUrl;

  constructor(private _dataApiService: DataApiService<any>) {}

  // getSubcategories(paramsObj: { [key: string]: any } = {}): Observable<QueryResponse<Subcategory[]>> {
  //   const params = new HttpParams({ fromObject: paramsObj });
  //   const url = `${this.baseUrl}/${RESOURCE_PATH.SUBCATEGORY}/${API_ENDPOINTS.GET}`;
  //   return this._dataApiService.getAll<QueryResponse<Subcategory[]>>(url, params);
  // }

  getSubcategories(request: SubcategoryRequest): Observable<QueryResponse<Subcategory[]>> {
    const params = new HttpParams()
      .set('skip', request.skip.toString())
      .set('take', request.take.toString())
      .set('sort', request.sort)
      .set('category', request.category)

    const url = `${this.baseUrl}/${RESOURCE_PATH.SUBCATEGORY}/${API_ENDPOINTS.GET}`;
    return this._dataApiService.getAll<QueryResponse<Subcategory[]>>(url, params);
  }


  getSubcategoryById(id: string): Observable<SingleResponse<Subcategory>> {
    const url = `${this.baseUrl}/${RESOURCE_PATH.SUBCATEGORY}/${API_ENDPOINTS.GET_BY_ID}`;
    return this._dataApiService.getById<SingleResponse<Subcategory>>(url, id);
  }


  deleteSubcategory(id: string): Observable<SingleResponse<Subcategory>> {
    const url = `${this.baseUrl}/${RESOURCE_PATH.SUBCATEGORY}/${API_ENDPOINTS.DELETE}/${id}`;
    return this._dataApiService.delete(url);
  }

  // updateSubcategory(id: string, categoryData: { name: string }): Observable<any> {
  //   const url = `${this.baseUrl}/${RESOURCE_PATH.CATEGORY}/${API_ENDPOINTS.UPDATE}/${id}`;
  //   return this._dataApiService.update(url, categoryData);
  // }


}
