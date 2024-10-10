import { Injectable } from '@angular/core';
import { environment } from '../../../../enviroment/enviroment.dev';
import { DataApiService } from '../data-api.service';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../../../shared/constants/api-endpoints';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = environment.apiUrl;

  constructor(private _dataApiService: DataApiService<any>) {}

  getProducts(paramsObj: { [key: string]: any } = {}): Observable<any[]> {
    const params = new HttpParams({ fromObject: paramsObj });
    const url = `${this.baseUrl}${API_ENDPOINTS.PRODUCT}${API_ENDPOINTS.GET}`;
    return this._dataApiService.getAll(url, params);
  }
}
