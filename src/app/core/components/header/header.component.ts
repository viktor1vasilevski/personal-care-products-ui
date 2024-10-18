import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Subscription } from 'rxjs';
import { LoginService } from '../../services/modals/login.service';
import { AccountService } from '../../services/account/account.service';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RegisterService } from '../../services/modals/register.service';
import { ModalService } from '../../services/modals/modal.service';
import { RegisterComponent } from '../modals/register/register.component';
import { LoginComponent } from '../modals/login/login.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ CommonModule, FormsModule, RouterOutlet, RouterLink, RouterLinkActive ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean = false;
  user: any = {};

  @ViewChild('loginModal', { read: ViewContainerRef })
  loginEntry!: ViewContainerRef;
  loginSub!: Subscription;

  @ViewChild('registerModal', { read: ViewContainerRef })
  registerEntry!: ViewContainerRef;
  registerSub!: Subscription;

  constructor(private _authService: AuthService,
    private _loginService: LoginService,
    private _accountService: AccountService,
    private _toastr: ToastrService,
    private _router: Router,
    private _registerService: RegisterService,
    private _modalService: ModalService<any>
  ) {}

  ngOnInit(): void {
    this._router.navigate(['/home'])
  }

  openLoginModal() {
    this.loginSub = this._modalService.openModal(this.loginEntry, LoginComponent).subscribe((data: any) => {
      this._accountService.loginUser(data).subscribe((response: any) => {
        if(response.success) {
          const token = response.data.token; 

          this.user.username = response.data.username; 
          this.user.role = response.data.role;
          this.user.id = response.data.userId;
        
          this._authService.setSession(token, this.user);
          this.isLoggedIn = true;
          
          if(this.user.role == 'Admin') {
            this._router.navigate(['/admin/product'])
          } else {
            this._router.navigate(['/soaps/beard'])
          }

          this._toastr.success(response.message, 'Success', { timeOut: 3500, positionClass: 'toast-bottom-right' });
        } else {
          this._toastr.error(response.message, 'Error', { timeOut: 3500, positionClass: 'toast-bottom-right' });
        }

        
      })
      
    })
  }

  logout() {
    this._accountService.logoutUser().subscribe((response: any) => {
      if(response.success) {
        this._authService.logout();
        this.isLoggedIn = false;
        this.user = {};
        this._router.navigate(['/home'])
        this._toastr.success(response.message, 'Success', { timeOut: 3500, positionClass: 'toast-bottom-right' });
      } else {
        this._toastr.error(response.message, 'Error', { timeOut: 3500, positionClass: 'toast-bottom-right' });
      }
    })
  }

  openRegisterModal() {
    this.registerSub = this._modalService.openModal(this.registerEntry, RegisterComponent).subscribe((model) => {
      this._accountService.registerUser(model).subscribe((response: any) => {
             
        this._toastr.success(`User ${response.userName} registered!`, 'Success', { timeOut: 3000, positionClass: 'toast-bottom-right' });
      })
      
    })
    
  }

}
