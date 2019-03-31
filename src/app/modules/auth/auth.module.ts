import { NgModule } from '@angular/core';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { SharedModule } from 'src/app/shared';

@NgModule({
  declarations: [AuthComponent],
  imports: [SharedModule, AuthRoutingModule],
})
export class AuthModule {}
