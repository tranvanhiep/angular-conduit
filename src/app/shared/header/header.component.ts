import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services';
import { User } from 'src/app/models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  currentUser: User;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }
}
