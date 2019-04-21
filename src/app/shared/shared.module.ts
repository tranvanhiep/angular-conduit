import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ErrorListComponent } from './error-list/error-list.component';
import { ShowAuthedDirective } from '../directives';

@NgModule({
  declarations: [ErrorListComponent, ShowAuthedDirective],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ErrorListComponent,
    ShowAuthedDirective,
  ],
})
export class SharedModule {}
