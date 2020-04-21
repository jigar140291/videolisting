import { Component, OnInit, Type } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { forkJoin } from 'rxjs';
import {videoService } from './services/video.service';

interface requesttype {
  method: string,
  endPoint: string;
}

interface category {
  id: number;
  name: string;
}

interface video {
  authorId: number;
  authorName: string;
  catIds: string;
  formats: string;
  releaseDate: string;
  id: number;
  name: string;
}

@Component({
  selector: 'video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.less']
})

export class VideoListComponent implements OnInit{
    categories: Array<category> = [];
    videos = [];
    authors = [];
    searchQuery: string = "";

    constructor(
      private HttpService: HttpService,
      private videoService: videoService
      ){}

    ngOnInit(){
        let categoryParams: requesttype = {
          method: 'GET',
          endPoint: 'categories'
        };

        let authorsParams: requesttype = {
          method: 'GET',
          endPoint: 'authors'
        };

        forkJoin(
          this.HttpService.request(categoryParams),
          this.HttpService.request(authorsParams)
        ).subscribe((res) => {
          if(res && res.length){
            this.categories = res[0];
            this.authors = res[1];

            this.videos = this.videoService.constructVideoList(this.authors, this.categories);
            console.log(this.videos);
          }
        }, (err) => {
          this.categories = [];
          this.authors = [];
        })
    }

    public removeEntry(videos, idx){
      /**
       * Handle it with http request
       */
      var deleteText = confirm("Are you sure you want to delete it!");
      if (deleteText == true) {
        let {authorId, id} = videos;
        let authorsParams: requesttype = {
          method: 'POST',
          endPoint: `authors?id=${authorId}&videos.id=${id}`
        };
       this.videos.splice(idx, 1);
      }
    }
}
