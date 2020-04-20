import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'search' })
export class searchPipe implements PipeTransform {
  transform(videos, searchQuery) {

    console.log("videos",videos);
    return videos.filter((video) => video.name.includes(searchQuery));
  }
}