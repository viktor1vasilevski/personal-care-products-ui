import { Injectable, ComponentRef, ViewContainerRef } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService<T> {

  private componentRef!: ComponentRef<any>;
  private componentSubscriber!: Subject<any>;

  constructor() {}

  // Use a generic modal handler that takes any component type (T) as a parameter
  openModal(entry: ViewContainerRef, component: new (...args: any[]) => any, data?: any, enableResponse?: boolean): Observable<any> {
    this.componentRef = entry.createComponent(component);

    if (data && enableResponse) {
      (this.componentRef.instance as any).data = data;  // Set the data on the instance
      (this.componentRef.instance as any).closeMeEvent.subscribe(() => this.closeModal());
      (this.componentRef.instance as any).confirmEvent.subscribe((response: any) => this.confirm(response));
    } else if(data && !enableResponse) {
      (this.componentRef.instance as any).data = data;
      (this.componentRef.instance as any).closeMeEvent.subscribe(() => this.closeModal());
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
