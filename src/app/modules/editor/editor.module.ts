import { NgModule } from '@angular/core';

import { EditorRoutingModule } from './editor-routing.module';
import { SharedModule } from '../shared.module';
import { EditorComponent } from './editor.component';

@NgModule({
  declarations: [EditorComponent],
  imports: [SharedModule, EditorRoutingModule],
})
export class EditorModule {}
