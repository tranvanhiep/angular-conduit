import {
  Directive,
  TemplateRef,
  ViewContainerRef,
  Input,
  OnInit,
} from '@angular/core';
import { UserService } from '../services';
import { Store, select } from '@ngrx/store';
import { State } from '../reducers';

@Directive({
  selector: '[appShowAuthed]',
})
export class ShowAuthedDirective implements OnInit {
  condition: boolean;

  constructor(
    private template: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private userService: UserService,
    private store: Store<State>
  ) {}

  ngOnInit() {
    this.store
      .pipe(select(this.userService.isAuthenticated))
      .subscribe(isAuthenticated => {
        if (
          (isAuthenticated && this.condition) ||
          (!isAuthenticated && !this.condition)
        ) {
          this.viewContainer.createEmbeddedView(this.template);
        } else {
          this.viewContainer.clear();
        }
      });
  }

  @Input() set appShowAuthed(condition: boolean) {
    this.condition = condition;
  }
}
