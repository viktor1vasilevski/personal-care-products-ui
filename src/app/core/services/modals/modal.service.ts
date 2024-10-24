import { Injectable, ComponentRef, ViewContainerRef } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { IModalComponent } from '../../../models/modal.interface';

@Injectable({
  providedIn: 'root'
})
export class ModalService<T> {

  private componentRef!: ComponentRef<any>;
  private componentSubscriber!: Subject<any>;

  constructor() {}

  // Use a generic modal handler that takes any component type (T) as a parameter
  openModal(entry: ViewContainerRef, component: new (...args: any[]) => any, data?: any): Observable<any> {
    this.componentRef = entry.createComponent(component);

    if (data) {
      (this.componentRef.instance as any).data = data;  // Set the data on the instance
      (this.componentRef.instance as any).closeMeEvent.subscribe(() => this.closeModal());
      (this.componentRef.instance as any).confirmEvent.subscribe((response: any) => this.confirm(response));
    } else {
      (this.componentRef.instance as any).closeMeEvent.subscribe(() => this.closeModal());
      (this.componentRef.instance as any).confirmEvent.subscribe((response: any) => this.confirm(response));
    }

    // Assuming the component has "closeMeEvent" and "confirmEvent"



    // Initialize the Subject and return as Observable
    this.componentSubscriber = new Subject<any>();
    return this.componentSubscriber.asObservable();  // This ensures it returns an Observable
  }

  closeModal() {
    this.componentSubscriber.complete();
    this.componentRef.destroy();
  }

  confirm(response: any) {
    this.componentSubscriber.next(response);
    this.closeModal();
  }
}
