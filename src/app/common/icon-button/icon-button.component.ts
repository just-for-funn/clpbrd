import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-icon-button',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.css']
})
export class IconButtonComponent implements OnInit {

  constructor() { }

  @Input()
  imgSrc:string;

  @Output() 
  click = new EventEmitter();


  ngOnInit() {
  }


  fireClick(){
    this.click.emit();
  }
}
