import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrentViewService {

  // true indicates initial view grid
  private view = new BehaviorSubject(true);

  // currentView handle the data as an Observable
  currentView = this.view.asObservable();

  private xyz: boolean;
  private changedView: boolean;
  constructor() { }

  onViewChange(): void {
    this.currentView.subscribe(
      responce => {
        // assiging default(initial value which is true (Grid view))
        this.changedView = responce;
      }
    );
    this.view.next(!this.changedView);

  }
}
