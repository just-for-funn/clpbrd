import { Component, OnInit } from '@angular/core';
import { ClipService } from '../services/clip-service';
import { LocalStorageServiceService } from '../services/local-storage-service.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { AddNewDialog } from './add-new-dialog';

@Component({
  selector: 'app-clip-list',
  templateUrl: './clip-list.component.html',
  styleUrls: ['./clip-list.component.css']
})
export class ClipListComponent implements OnInit {

  constructor(private clipService: ClipService , 
    private localStorage: LocalStorageServiceService , public dialog: MatDialog) { 


  }
  public clips: string [] = [];
  ngOnInit() {
    //this.clips = ["test" , "test2" , "test3" , "test4" , "test5"];
    this.clipService.getClips(this.localStorage.getOauthResponse().access_token)
      .subscribe(rows =>{
        this.clips = rows.map(row=>row.value);
      });
  }

  openAddDialoag(){
    const dialogRef = this.dialog.open(AddNewDialog, {
      width: '250px',
      data: {name: "davut", animal: "doggo"}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.animal = result;
    });
  }

}
