import { Injectable } from '@angular/core';
import { environment } from '../../../../enviroment/enviroment.dev';
import { DataApiService } from '../data-api.service';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { API_ENDPOINTS } from '../../../shared/constants/api-endpoints';

@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {

  private baseUrl = environment.apiUrl;

  constructor(private _dataApiService: DataApiService<any>) {}

  getSubcategories(paramsObj: { [key: string]: any } = {}): Observable<any[]> {
    const params = new HttpParams({ fromObject: paramsObj });
    const url = `${this.baseUrl}${API_ENDPOINTS.SUBCATEGORY}${API_ENDPOINTS.GET}`;
    return this._dataApiService.getAll(url, params);
  }
}
