import { Injectable } from '@angular/core';
import { environment } from '../../../../enviroment/enviroment.dev';
import { DataApiService } from '../data-api.service';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { RESOURCE_PATH } from '../../../shared/constants/endpoints/resource-path';
import { API_ENDPOINTS } from '../../../shared/constants/endpoints/api-endpoints';
import { Product } from '../../../models/product/product.model';
import { QueryResponse } from '../../../models/responses/query-response.model';
import { ProductRequest } from '../../../models/requests/product-request.model';
import { SingleResponse } from '../../../models/responses/single-response.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = environment.apiUrl;

  constructor(private _dataApiService: DataApiService<any>) {}

  getProducts(request: ProductRequest): Observable<QueryResponse<Product[]>> {
    const params = new HttpParams()
      .set('name', request.name.toString())
      .set('brand', request.brand.toString())
      .set('edition', request.edition.toString())
      .set('scent', request.scent.toString())
      .set('categoryId', request.categoryId)
      .set('subcategoryId', request.subcategoryId)
      .set('skip', request.skip.toString())
      .set('take', request.take.toString())
      .set('sort', request.sort);

    const url = `${this.baseUrl}/${RESOURCE_PATH.PRODUCT}/${API_ENDPOINTS.GET}`;
    return this._dataApiService.getAll<QueryResponse<Product[]>>(url, params);
  }

  getProductById(id: string): Observable<SingleResponse<Product>> {
    const url = `${this.baseUrl}/${RESOURCE_PATH.PRODUCT}/${API_ENDPOINTS.GET_BY_ID}`;
    return this._dataApiService.getById<SingleResponse<Product>>(url, id);
  }

  deleteProduct(id: string): Observable<any> {
    const url = `${this.baseUrl}/${RESOURCE_PATH.PRODUCT}/${API_ENDPOINTS.DELETE}/${id}`;
    return this._dataApiService.delete(url);
  }

  /**
   * Create a new product
   * @param productData Object containing product creation data
   * @returns Observable of the created product response
   */
  createProduct(productData: {
    name: string;
    brand: string;
    description: string;
    unitPrice: number;
    unitQuantity: number;
    volume?: number;
    scent?: string;
    edition?: string;
    image: string; // Assuming the image is sent as a binary array
    subcategoryId: string;
  }): Observable<any> {
    const url = `${this.baseUrl}/${RESOURCE_PATH.PRODUCT}/${API_ENDPOINTS.CREATE}`;
    return this._dataApiService.create(url, productData);
  }
  
}
