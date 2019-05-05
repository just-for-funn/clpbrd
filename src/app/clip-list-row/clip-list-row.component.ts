import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { ClipModel, ClipService } from '../services/clip-service';
import { LocalStorageServiceService } from '../services/local-storage-service.service';

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

  constructor(private clipService:ClipService ,private localStorage: LocalStorageServiceService) { }

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

  onEdit(){
    console.log("model" , this.clip.value);
    this.clipService.updateRow(this.localStorage.getAccessToken() , this.clip.rowNumber , this.clip.value)
    .subscribe(cm=>{
      console.log("updated" , cm);
      this.clip = cm;
    });
  }
}
