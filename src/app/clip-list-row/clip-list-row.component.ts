import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-clip-list-row',
  templateUrl: './clip-list-row.component.html',
  styleUrls: ['./clip-list-row.component.css']
})
export class ClipListRowComponent implements OnInit {
  @Input()
  public clip: string;
  
  @ViewChild('myinput')
  private input:ElementRef;

  constructor() { }

  ngOnInit() {
  }


  public copy():void{
    this.input.nativeElement.select();
    document.execCommand("copy");
  }
}
