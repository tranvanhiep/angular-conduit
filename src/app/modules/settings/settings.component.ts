import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/services';
import { User, Errors } from 'src/app/models';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit, OnDestroy {
  user: User;
  settingsForm: FormGroup;
  errors: Errors = { errors: {} };
  isSubmitting = false;

  private subscription: Subscription;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.settingsForm = this.fb.group({
      image: [''],
      username: ['', Validators.required],
      bio: [''],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.subscription = this.userService.currentUser.subscribe(user => {
      this.user = user;
    });
    this.settingsForm.patchValue(this.user);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  logout() {
    this.userService.purgeAuth();
    this.router.navigate(['/']);
  }

  submit() {
    this.isSubmitting = true;
    this.user = { ...this.user, ...this.settingsForm.value };

    this.userService.updateCurrentUser(this.user).subscribe(
      user => {
        this.isSubmitting = false;
        this.router.navigate(['/profile', user.username]);
      },
      err => {
        this.isSubmitting = false;
        this.errors = err;
      }
    );
  }
}
