import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/services';
import { User } from 'src/app/models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  currentUser: User;

  private subscription: Subscription;
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.subscription = this.userService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
