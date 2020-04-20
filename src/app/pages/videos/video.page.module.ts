import { NgModule } from '@angular/core';
import { VideoListComponent } from './video-list.component';
import {CommonModule} from '@angular/common';
import { searchPipe } from 'src/app/services/search.pipe';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [
    searchPipe,
    VideoListComponent
  ],
  exports: [
    VideoListComponent
  ],
  providers: []
})
export class videoPageModule { }
