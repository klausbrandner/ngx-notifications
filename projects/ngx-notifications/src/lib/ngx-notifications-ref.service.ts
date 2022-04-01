import { ApplicationRef, ComponentFactoryResolver, ComponentRef, EmbeddedViewRef, Injectable, Injector } from '@angular/core';
import { NgxNotificationListComponent } from './ngx-notification-list/ngx-notification-list.component';

@Injectable({
  providedIn: 'root'
})
export class NgxNotificationsRefService {

  private componentRef: ComponentRef<NgxNotificationListComponent> | undefined;
  
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) { }

  checkForNotificationList(): void {
    // Create notification list component if it does not exist
    if (!this.componentRef) this._addNotificationListToBody();
  }

  private _addNotificationListToBody(): void {
    console.log("### ADDING NOTIFICATION LIST TO BODY ###");

    // 1. Create a component reference from the component 
    this.componentRef = this.componentFactoryResolver
      .resolveComponentFactory(NgxNotificationListComponent)
      .create(this.injector);

    // 2. Attach component to the appRef so that it's inside the ng component tree
    this.appRef.attachView(this.componentRef.hostView);

    // 3. Get DOM element from component
    const domElem = (this.componentRef.hostView as EmbeddedViewRef<any>)
    .rootNodes[0] as HTMLElement;

    // 4. Append DOM element to the body
    document.body.appendChild(domElem);
  }
}
