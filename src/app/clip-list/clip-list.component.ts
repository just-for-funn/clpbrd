import { Component, OnInit } from '@angular/core';
import { ClipService, ClipModel } from '../services/clip-service';
import { LocalStorageServiceService } from '../services/local-storage-service.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { AddNewDialog, DialogData } from './add-new-dialog';

@Component({
  selector: 'app-clip-list',
  templateUrl: './clip-list.component.html',
  styleUrls: ['./clip-list.component.css']
})
export class ClipListComponent implements OnInit {

  constructor(private clipService: ClipService , 
    private localStorage: LocalStorageServiceService , public dialog: MatDialog) { 


  }
  public clips: ClipModel [] = [];
  ngOnInit() {
    this.clipService.getClips(this.getAccessToken())
      .subscribe(result => this.bindData(result));
  }

  private bindData(rows: ClipModel[]):void {
     this.clips = rows.sort((a, b) => b.rowNumber - a.rowNumber);
  }

  private getAccessToken(): string {
    return this.localStorage.getOauthResponse().access_token;
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
    let maxRow = this.clips.reduce((a,b)=>a > b.rowNumber ? a : b.rowNumber , 0 );
    this.clipService.append(arg.value , this.getAccessToken(),maxRow).subscribe(cm=>{
      this.clips.unshift(cm);
    });
    //console.log("Adding " , arg);  
  }

  onDelete(cm:ClipModel){
    console.log("deleting" , cm);
    this.clipService.deleteRow(this.getAccessToken() , cm.rowNumber)
    .subscribe(response => this.bindData(response));
  }

}
