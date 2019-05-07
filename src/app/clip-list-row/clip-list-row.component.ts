import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { ClipModel, ClipService } from '../services/clip-service';
import { LocalStorageServiceService } from '../services/local-storage-service.service';
import {Subject} from 'rxjs';
import {concatMap, debounceTime} from 'rxjs/operators';

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


  private editSubject$ = new Subject<string>();
  constructor(private clipService:ClipService ,private localStorage: LocalStorageServiceService) {

    this.editSubject$
      .pipe(
        debounceTime(1000),
        concatMap(arg => this.clipService.updateRow(this.localStorage.getAccessToken(), this.clip.rowNumber, arg))
      ).subscribe(cm => {
      console.log('updated', cm);
      this.clip = cm;
    });

  }

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
    this.editSubject$.next(this.clip.value);
  }
}
