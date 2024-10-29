import { Injectable } from '@angular/core';
import { environment } from '../../../../enviroment/enviroment.dev';
import { DataApiService } from '../data-api.service';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { RESOURCE_PATH } from '../../../shared/constants/endpoints/resource-path';
import { API_ENDPOINTS } from '../../../shared/constants/endpoints/api-endpoints';
import { Product } from '../../../models/product/product.model';
import { QueryResponse } from '../../../models/responses/query-response.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = environment.apiUrl;

  constructor(private _dataApiService: DataApiService<any>) {}

  getProducts(paramsObj: { [key: string]: any } = {}): Observable<QueryResponse<Product[]>> {
    const params = new HttpParams({ fromObject: paramsObj });
    const url = `${this.baseUrl}/${RESOURCE_PATH.PRODUCT}/${API_ENDPOINTS.GET}`;
    return this._dataApiService.getAll<Product>(url, params);
  }
  
}
