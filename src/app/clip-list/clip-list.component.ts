import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clip-list',
  templateUrl: './clip-list.component.html',
  styleUrls: ['./clip-list.component.css']
})
export class ClipListComponent implements OnInit {

  constructor() { }
  public clips: string [] = [];
  ngOnInit() {
    this.clips = ["test" , "test2" , "test3" , "test4" , "test5"];
  }

}
