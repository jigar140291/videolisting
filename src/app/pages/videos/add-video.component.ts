import { Component, OnInit, Type } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'add-video',
  templateUrl: './add-video.component.html'
})

export class AddVideoComponent implements OnInit{
  ngOnInit(){}
}
