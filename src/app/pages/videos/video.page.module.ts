import { NgModule } from '@angular/core';
import { VideoListComponent } from './video-list.component';
import {CommonModule} from '@angular/common';
import { searchPipe } from 'src/app/services/search.pipe';
import { FormsModule } from '@angular/forms';
import { AddVideoComponent } from './add-video.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [
    searchPipe,
    VideoListComponent,
    AddVideoComponent
  ],
  exports: [
    VideoListComponent,
    AddVideoComponent
  ],
  providers: []
})
export class videoPageModule { }
