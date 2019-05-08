import { Component, OnInit } from '@angular/core';
import { ClipService, ClipModel } from '../services/clip-service';
import { LocalStorageServiceService } from '../services/local-storage-service.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { AddNewDialog, DialogData } from './add-new-dialog';
import { ClipListViewModel } from './clip-list-view-model';

@Component({
  selector: 'app-clip-list',
  templateUrl: './clip-list.component.html',
  styleUrls: ['./clip-list.component.css']
})
export class ClipListComponent implements OnInit {
  model = new ClipListViewModel();

  constructor(private clipService: ClipService , 
    private localStorage: LocalStorageServiceService , public dialog: MatDialog) { 


  }
  
  ngOnInit() {
    this.clipService.getClips(this.localStorage.getAccessToken())
      .subscribe(result => this.model.bindData(result));
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
    let maxRow = this.model.getMaxRow();
    this.clipService.append(arg.value , this.localStorage.getAccessToken(),maxRow).subscribe(cm=>{
      this.model.appendFront(cm);
    });
    //console.log("Adding " , arg);  
  }

  onDelete(cm:ClipModel){
    console.log("deleting" , cm);
    this.clipService.deleteRow(this.localStorage.getAccessToken() , cm.rowNumber)
    .subscribe(response => this.model.bindData(response));
  }

}
