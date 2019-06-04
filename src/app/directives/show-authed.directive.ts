import {
  Directive,
  TemplateRef,
  ViewContainerRef,
  Input,
  OnInit,
} from '@angular/core';
import { UserService } from '../services';

@Directive({
  selector: '[appShowAuthed]',
})
export class ShowAuthedDirective implements OnInit {
  condition: boolean;

  constructor(
    private template: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.userService.isAuthenticated.subscribe(isAuthenticated => {
      if (
        (isAuthenticated && this.condition) ||
        (!isAuthenticated && !this.condition)
      ) {
        this.viewContainer.createEmbeddedView(this.template);
        console.log('created', this.condition, isAuthenticated);
      } else {
        this.viewContainer.clear();
        console.log('clear', this.condition, isAuthenticated);
      }
    });
  }

  @Input() set appShowAuthed(condition: boolean) {
    this.condition = condition;
    console.log('condition', condition);
  }
}
