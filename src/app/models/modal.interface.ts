import { Subject } from "rxjs";

export interface IModalComponent {
    closeMeEvent: Subject<void>;
    confirmEvent: Subject<any>;
  }