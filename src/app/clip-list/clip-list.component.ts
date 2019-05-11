import { Component, OnInit } from '@angular/core';
import { ClipService, ClipModel } from '../services/clip-service';
import { LocalStorageServiceService } from '../services/local-storage-service.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { AddNewDialog, DialogData } from './add-new-dialog';
import { ClipListViewModel } from './clip-list-view-model';
import { ProgressService } from '../progress/progress.service';

@Component({
  selector: 'app-clip-list',
  templateUrl: './clip-list.component.html',
  styleUrls: ['./clip-list.component.css']
})
export class ClipListComponent implements OnInit {
  model = new ClipListViewModel();

  constructor(private clipService: ClipService , 
    private localStorage: LocalStorageServiceService , public dialog: MatDialog , private progressService:ProgressService) { 


  }
  
  ngOnInit() {
    this.progressService.notifyBusy();
    this.clipService.getClips(this.localStorage.getAccessToken())
      .subscribe(result => {
        this.model.bindData(result);
        this.progressService.notifyProgressCompleted();
      } , error=> this.progressService.notifyProgressCompleted());
  }

  

 

  openAddDialoag(){
    const dialogRef = this.dialog.open(AddNewDialog, {
      width: '450px',
      data: { value:""}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result)
      {
        this.addNewClip(result as DialogData);
      }
    });
  }

  addNewClip(arg: DialogData) {
    this.progressService.notifyBusy();
    let maxRow = this.model.getMaxRow();
    this.clipService.append(arg.value , this.localStorage.getAccessToken(),maxRow).subscribe(cm=>{
      this.model.appendFront(cm);
      this.progressService.notifyProgressCompleted();
    } , err => this.progressService.notifyProgressCompleted());
    //console.log("Adding " , arg);  
  }

  onDelete(cm:ClipModel){
    console.log("deleting" , cm);
    this.progressService.notifyBusy();
    this.clipService.deleteRow(this.localStorage.getAccessToken() , cm.rowNumber)
    .subscribe(response =>{
      this.model.bindData(response);
      this.progressService.notifyProgressCompleted();
    } , err => this.progressService.notifyProgressCompleted());
  }

}
