import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import { FormsModule }   from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import { CurrentTimeComponent } from './current-time.component';

@NgModule({
  declarations: [
    CurrentTimeComponent
  ],
  imports: [
    BrowserModule,
	FormsModule,
	HttpClientModule
  ],
  providers: [],
  bootstrap: [CurrentTimeComponent]
})
export class AppModule { }
