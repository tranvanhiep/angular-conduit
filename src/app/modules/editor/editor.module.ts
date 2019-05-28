import { NgModule } from '@angular/core';

import { EditorRoutingModule } from './editor-routing.module';
import { SharedModule } from 'src/app/shared';
import { EditorComponent } from './editor.component';

@NgModule({
  declarations: [EditorComponent],
  imports: [SharedModule, EditorRoutingModule],
})
export class EditorModule {}
