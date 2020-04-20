import { Component, OnInit, Type } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { forkJoin } from 'rxjs';

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
    cloneVideos: any;

    constructor(private HttpService: HttpService){}

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
          if(res && res[0] && res[1]){
            this.categories = res[0];
            this.authors = res[1];

            this.videos = this.constructVideoList(this.authors, this.categories);

            console.log(this.videos);
          }
        }, (err) => {
          this.categories = [];
          this.authors = [];
        })
    }

    private constructVideoList(authors, categories){
      let allVideos = [];
      
      authors.forEach((author) => {
        let video = author['videos'];
        if(video.length) {
          video = video.map((vid: video) => {
            let {name, id} = author;
            let {formats, catIds} = vid;

            let _vid = {
              authorName: name,
              authorId: id,
              formats: this.getQualityForamt(formats),
              catIds: this.getCategories(catIds, categories)
            };

            return Object.assign(vid, _vid);
          });
          allVideos = [...allVideos, ...video];
        }  
      })
      return allVideos;
    }

    public getCategories(catArray, categories): string{
      let videoCat = [];
      categories.forEach((category) => {
        let id = category['id'];
        if(catArray.includes(id)){
          videoCat.push(category['name']);
        }
      });

      return videoCat.join(',');
    }

    public getQualityForamt(formats){
      let maxQuality:any = {
        "key": "",
        "res": "0p",
        "size": 0
      };

      for (let [key, value] of Object.entries(formats)) {
        let currentQuality = Object.assign(value, {key});
        if(this.compareQuality(maxQuality, currentQuality)) {
          maxQuality = currentQuality;
        }
      }

      return `${maxQuality.key} ${maxQuality.res}`;
    }

    private compareQuality(maxQuality, currentQuality) : boolean {
      let maxFormat = maxQuality.res.replace('p','');
      let currentFormat = currentQuality.res.replace('p','');

      if(parseInt(currentFormat) > parseInt(maxFormat)){
        return true;
      } else if(parseInt(currentFormat) == parseInt(maxFormat)){
        return currentQuality.size > maxQuality.size;
      }
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
