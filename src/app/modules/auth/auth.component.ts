import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { Errors } from 'src/app/models';
import { Store, select } from '@ngrx/store';
import { State } from 'src/app/reducers';
import { login, register, resetAuth } from 'src/app/actions';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit, OnDestroy {
  authType: string;
  title: string;
  authForm: FormGroup;
  isSubmitting = false;
  errors: Errors;
  private subscriptions: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private store: Store<State>,
    private userService: UserService,
    private router: Router
  ) {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    const authSub = this.store
      .pipe(select(this.userService.isAuthenticated))
      .subscribe(isAuthed => {
        if (isAuthed) {
          this.router.navigate(['/']);
        }
      });

    const routeSub = this.store
      .pipe(select(state => state.router))
      .subscribe(router => {
        const { url } = router.state;
        this.authType = url.replace(/\/(login|register)$/, '$1');
        this.title = this.authType === 'login' ? 'Sign in' : 'Sign up';
      });

    if (this.authType === 'register') {
      this.authForm.addControl(
        'username',
        new FormControl('', Validators.required)
      );
    }

    const storeSub = this.store
      .pipe(select(state => state.auth))
      .subscribe(authState => {
        const { isSubmitting, errors } = authState;
        this.isSubmitting = isSubmitting;
        this.errors = errors;
      });

    this.subscriptions.push(authSub, routeSub, storeSub);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
    this.store.dispatch(resetAuth());
  }

  get email() {
    return this.authForm && this.authForm.get('email');
  }

  get password() {
    return this.authForm && this.authForm.get('password');
  }

  get username() {
    return this.authForm && this.authForm.get('username');
  }

  submit() {
    const credentials = this.authForm.value;

    this.isSubmitting = true;
    if (this.authType === 'login') {
      this.store.dispatch(login(credentials));
    } else {
      this.store.dispatch(register(credentials));
    }
  }
}
