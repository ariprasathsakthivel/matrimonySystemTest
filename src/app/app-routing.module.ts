import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GalleryComponent } from './gallery/gallery.component';
import { AudioRecorderComponent } from './audio-recorder/audio-recorder.component';

const routes: Routes = [
  { path: 'gallery', component: GalleryComponent },
  { path: 'audio-recorder', component: AudioRecorderComponent },
  { path: '', redirectTo: '/gallery', pathMatch: 'full' },
  { path: '**', redirectTo: '/gallery' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
