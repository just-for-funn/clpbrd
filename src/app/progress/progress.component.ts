import { Component, OnInit } from '@angular/core';
import { ProgressService } from './progress.service';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements OnInit {

  isBusy:boolean = false;
  constructor(private progressService:ProgressService) { }

  ngOnInit() {
    this.progressService.progress$.subscribe(isBusy =>{
      this.isBusy = isBusy;
    });
  }

}
