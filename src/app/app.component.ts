import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from './services';
import { Store } from '@ngrx/store';
import { State } from './reducers';
import { resetApp } from './actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private userService: UserService, private store: Store<State>) {}

  ngOnInit() {
    this.userService.populate();
  }

  ngOnDestroy() {
    this.store.dispatch(resetApp());
  }
}
