import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { UserService } from 'src/app/services';
import { Errors } from 'src/app/models';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  authType: string;
  title: string;
  authForm: FormGroup;
  isSubmitting = false;
  errors: Errors = { errors: {} };

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {
    this.route.url.subscribe(data => {
      this.authType = data[data.length - 1].path;
      this.title = this.authType === 'login' ? 'Sign in' : 'Sign up';
    });

    if (this.authType === 'register') {
      this.authForm.addControl(
        'username',
        new FormControl('', Validators.required)
      );
    }
  }

  get email() {
    return this.authForm.get('email');
  }

  get password() {
    return this.authForm.get('password');
  }

  get username() {
    return this.authForm.get('username');
  }

  submit() {
    const credentials = this.authForm.value;

    this.isSubmitting = true;
    this.errors = { errors: {} };
    this.userService.attempAuth(this.authType, credentials).subscribe(
      res => {
        this.router.navigate(['/']);
      },
      err => {
        this.isSubmitting = false;
        this.errors = err;
      }
    );
  }
}
