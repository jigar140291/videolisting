import { NgModule } from '@angular/core';
import { VideoListComponent } from './video-list.component';
import {CommonModule} from '@angular/common';

@NgModule({
  imports: [CommonModule],
  declarations: [
    VideoListComponent
  ],
  exports: [
    VideoListComponent
  ],
  providers: []
})
export class videoPageModule { }
