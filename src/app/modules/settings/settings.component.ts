import { Component, OnInit, OnDestroy } from '@angular/core';
import { User, Errors } from 'src/app/models';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { State } from 'src/app/reducers';
import { updateUser, loadUser, resetSettings, logout } from 'src/app/actions';
import { UserService } from 'src/app/services';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit, OnDestroy {
  user: User;
  settingsForm: FormGroup;
  errors: Errors;
  isSubmitting = false;
  loading = false;
  private subscriptions: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private store: Store<State>,
    private userService: UserService,
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
    this.store.dispatch(loadUser());

    const authSub = this.store
      .pipe(select(this.userService.isAuthenticated))
      .subscribe(isAuthed => {
        if (!isAuthed) {
          this.router.navigate(['/login']);
        }
      });

    const userSub = this.store
      .pipe(select(state => state.app))
      .subscribe(({ currentUser }) => {
        this.user = currentUser;
        if (this.user) {
          this.settingsForm.patchValue(this.user);
        }
      });

    const settingsSub = this.store
      .pipe(select(state => state.settings))
      .subscribe(settingsState => {
        const { isSubmitting, errors, loading } = settingsState;
        this.isSubmitting = isSubmitting;
        this.errors = errors;
        this.loading = loading;
      });

    this.subscriptions.push(authSub, userSub, settingsSub);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
    this.store.dispatch(resetSettings());
  }

  logout() {
    this.store.dispatch(logout());
  }

  submit() {
    this.isSubmitting = true;
    this.user = { ...this.user, ...this.settingsForm.value };

    this.store.dispatch(updateUser({ user: this.user }));
  }
}
