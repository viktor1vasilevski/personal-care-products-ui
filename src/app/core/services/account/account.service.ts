import { Injectable } from '@angular/core';
import { environment } from '../../../../enviroment/enviroment.dev';
import { HttpClient } from '@angular/common/http';
import { LoginModel } from '../../components/modals/login/login.model';
import { API_ENDPOINTS } from '../../../shared/constants/api-endpoints';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private baseUrl = environment.apiUrl;

  constructor(private _http: HttpClient) { }

  loginUser(model: LoginModel) {
    return this._http.post<any>(`${this.baseUrl}${API_ENDPOINTS.ACCOUNT}${API_ENDPOINTS.LOGIN_USER}`, 
    {
      username: model.username,
      password: model.password
    })
  }

  logoutUser() {
    return this._http.post(`${this.baseUrl}${API_ENDPOINTS.ACCOUNT}${API_ENDPOINTS.LOGOUT_USER}`, {})
  }

  registerUser(model: any) {
    return this._http.post<any>(`${this.baseUrl}${API_ENDPOINTS.ACCOUNT}${API_ENDPOINTS.REGISTER}`, 
      {
        username: model.username,
        password: model.password,
        email: model.email,
        confirmPassword: model.confirmPassword
      })
  }
}
