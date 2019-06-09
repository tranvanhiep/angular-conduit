import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services';
import { User, Errors } from 'src/app/models';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  user: User;
  settingsForm: FormGroup;
  errors: Errors = { errors: {} };
  isSubmitting = false;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.settingsForm = this.fb.group({
      image: ['', Validators.required],
      username: ['', Validators.required],
      bio: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.user = this.userService.getCurrentUser();
    this.settingsForm.patchValue(this.user);
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
