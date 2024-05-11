// This does not work for now... fix it later
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ToastrModule, provideToastr } from 'ngx-toastr';


@NgModule({
  declarations: [],
  providers: [
    provideToastr({
      positionClass: 'toast-bottom-right'
    }), // T
  ],
  imports: [
    CommonModule,
    ToastrModule

  ],
  exports: [
    ToastrModule
  ]
})
export class SharedModule { }
