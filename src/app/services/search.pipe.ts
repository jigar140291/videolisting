import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'search' })
export class searchPipe implements PipeTransform {
  transform(videos, searchQuery) {
    return videos.filter((video) => video.name.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase()));
  }
}