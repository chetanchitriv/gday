import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.scss']
})
export class HomeHeaderComponent implements OnInit {

  show:boolean=true;

  constructor() { }

  ngOnInit(): void {
  }


  info(){
 debugger
    this.show=this.show ? false : true;
  }

}
