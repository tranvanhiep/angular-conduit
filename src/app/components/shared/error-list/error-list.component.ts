import { Component, OnInit, Input } from '@angular/core';
import { Errors } from 'src/app/models';

@Component({
  selector: 'app-error-list',
  templateUrl: './error-list.component.html',
  styleUrls: ['./error-list.component.scss'],
})
export class ErrorListComponent implements OnInit {
  formattedErrors: Array<string>;

  constructor() {}

  ngOnInit() {}

  @Input()
  set errors(errorList: Errors) {
    this.formattedErrors = Object.keys(errorList.errors || {}).map(key => {
      return `${key} ${errorList[key]}`;
    });
  }

  get errorList() {
    return this.formattedErrors;
  }
}
