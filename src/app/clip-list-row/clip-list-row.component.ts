import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-clip-list-row',
  templateUrl: './clip-list-row.component.html',
  styleUrls: ['./clip-list-row.component.css']
})
export class ClipListRowComponent implements OnInit {
  @Input()
  public clip: string;
  constructor() { }

  ngOnInit() {
  }

}
