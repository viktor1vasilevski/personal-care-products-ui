import { ComponentFactoryResolver, ComponentRef, Injectable, ViewContainerRef } from '@angular/core';
import { CategoryModalComponent } from '../../components/modals/category-modal/category-modal.component';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryModalService {

  private componentRef!: ComponentRef<CategoryModalComponent>;
  private componentSubscriber!: Subject<any>;
  constructor(private resolver: ComponentFactoryResolver) {}

  openModal(entry: ViewContainerRef) {
    let factory = this.resolver.resolveComponentFactory(CategoryModalComponent);
    this.componentRef = entry.createComponent(factory);
    this.componentRef.instance.closeMeEvent.subscribe(() => this.closeModal());
    this.componentRef.instance.confirmEvent.subscribe((response) => this.confirm(response));
    this.componentSubscriber = new Subject<any>();
    return this.componentSubscriber.asObservable();
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
