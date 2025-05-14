import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GalleryComponent } from './gallery/gallery.component';
import { AudioRecorderComponent } from './audio-recorder/audio-recorder.component';
import { register } from 'swiper/element/bundle';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMicRecorderModule } from 'ngx-mic-recorder';
register();

@NgModule({
  declarations: [
    AppComponent,
    GalleryComponent,
    AudioRecorderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgxMicRecorderModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
