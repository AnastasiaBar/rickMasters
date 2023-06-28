import {Injectable} from '@angular/core';
import {Subject} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class ComponentInteractionService {

  state = new Subject();
  public state$ = this.state.asObservable();

  constructor() {

  }

  stateSidebar(item? : any){
    this.state.next(item)
  }
}


