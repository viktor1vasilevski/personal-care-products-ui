import { Injectable, ComponentRef, ViewContainerRef } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService<T> {

  private componentRef!: ComponentRef<T>;
  private componentSubscriber!: Subject<any>;

  constructor() {}

  // Use a generic modal handler that takes any component type (T) as a parameter
  openModal(entry: ViewContainerRef, component: new (...args: any[]) => T): Observable<any> {
    this.componentRef = entry.createComponent(component);

    // Assuming the component has "closeMeEvent" and "confirmEvent"
    (this.componentRef.instance as any).closeMeEvent.subscribe(() => this.closeModal());
    (this.componentRef.instance as any).confirmEvent.subscribe((response: any) => this.confirm(response));

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
