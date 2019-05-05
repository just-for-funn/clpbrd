import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { ClipModel } from '../services/clip-service';

@Component({
  selector: 'app-clip-list-row',
  templateUrl: './clip-list-row.component.html',
  styleUrls: ['./clip-list-row.component.css']
})
export class ClipListRowComponent implements OnInit {
  @Input()
  public clip: ClipModel;
  
  @ViewChild('myinput')
  private input:ElementRef;

  @Output()
  deleteClick: EventEmitter<ClipModel> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }


  public copy():void{
    this.input.nativeElement.select();
    document.execCommand("copy");
  }

  onDeleteClicked(){
    console.log("sending delete" , this.clip);
    this.deleteClick.emit(this.clip);
  }
}
