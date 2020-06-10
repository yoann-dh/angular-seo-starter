import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRouting } from './layout.routing';
import { LayoutComponent } from './containers/layout.component';


@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    LayoutRouting,
  ]
})
export class LayoutModule { }
