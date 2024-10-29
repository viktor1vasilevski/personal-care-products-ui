import { Injectable } from '@angular/core';
import { environment } from '../../../../enviroment/enviroment.dev';
import { DataApiService } from '../data-api.service';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { RESOURCE_PATH } from '../../../shared/constants/endpoints/resource-path';
import { QueryResponse } from '../../../models/responses/query-response.model';
import { Subcategory } from '../../../models/subcategory/subcategory.model';
import { API_ENDPOINTS } from '../../../shared/constants/endpoints/api-endpoints';

@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {

  private baseUrl = environment.apiUrl;

  constructor(private _dataApiService: DataApiService<any>) {}

  getSubcategories(paramsObj: { [key: string]: any } = {}): Observable<QueryResponse<Subcategory[]>> {
    const params = new HttpParams({ fromObject: paramsObj });
    const url = `${this.baseUrl}/${RESOURCE_PATH.SUBCATEGORY}/${API_ENDPOINTS.GET}`;
    return this._dataApiService.getAll(url, params);
}


  getByIdSubcategory(id: string): Observable<any> {
    const url = `${this.baseUrl}${RESOURCE_PATH.SUBCATEGORY}${API_ENDPOINTS.GET_BY_ID}`;
    return this._dataApiService.getById(url, id);
  }
}
