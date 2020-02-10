import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'src/app/models';
import { Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { State } from 'src/app/reducers';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  currentUser: User;
  appName: string;

  private subscription: Subscription;
  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.subscription = this.store
      .pipe(select(state => state.app))
      .subscribe(({ currentUser, appName }) => {
        this.currentUser = currentUser;
        this.appName = appName;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
