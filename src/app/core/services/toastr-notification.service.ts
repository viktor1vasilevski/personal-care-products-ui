import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastrNotificationService {

  constructor(private toastr: ToastrService) {}

  showNotification(response: any) {
    const position = {
      timeOut: 4000,
      positionClass: 'toast-bottom-right',
    };
  
    switch (response.notificationType) {
      case 0:
        this.toastr.success(response.message, 'Success', position);
        break;
      case 1:
        this.toastr.error(response.message, 'Error', position);
        break;
      case 2:
        this.toastr.info(response.message, 'Info', position);
        break;
      case 3:
        this.toastr.warning(response.message, 'Warning', position);
        break;
      default:
        this.toastr.info(response.message, 'Info', position);
        break;
    }
  }
  
}
