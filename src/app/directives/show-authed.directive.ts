import { Directive, TemplateRef, ViewContainerRef, Input } from '@angular/core';
import { UserService } from '../services';

@Directive({
  selector: '[appShowAuthed]',
})
export class ShowAuthedDirective {
  condition: boolean;

  constructor(
    private template: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private userService: UserService
  ) {
    this.userService.isAuthenticated.subscribe(isAuthenticated => {
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
