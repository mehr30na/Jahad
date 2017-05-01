import {Component, OnInit, Input} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  // @Input() responce:boolean;
  constructor(private router:Router){}
  ngOnInit(){
    this.router.navigateByUrl('login');
  }
}

