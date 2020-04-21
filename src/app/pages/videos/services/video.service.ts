import {Injectable, Inject} from '@angular/core';
import {Http, Response, RequestOptions, Request, Headers} from '@angular/http';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";

@Injectable()
export class videoService {

    public constructVideoList(authors, categories){
        let allVideos = [];
        
        authors.forEach((author) => {
          let video = author['videos'];
          if(video.length) {
            video = video.map((vid) => {
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
  
      private getCategories(catArray, categories): string{
        let videoCat = [];
        categories.forEach((category) => {
          let id = category['id'];
          if(catArray.includes(id)){
            videoCat.push(category['name']);
          }
        });
  
        return videoCat.join(',');
      }
  
      private getQualityForamt(formats){
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
}