import { Component, OnInit } from '@angular/core';
import { Profile } from 'src/app/models';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services';
import { concatMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profile: Profile;
  isUser = false;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.route.data
      .pipe(
        concatMap(data => {
          this.profile = data.profile;

          return this.userService.currentUser.pipe(
            tap(user => {
              this.isUser = user.username === data.profile.username;
            })
          );
        })
      )
      .subscribe();
  }

  onToggleFollowing(following: boolean) {
    this.profile.following = following;
  }
}
