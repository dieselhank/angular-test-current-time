import { Component, NgZone, OnInit, DoCheck, ElementRef } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'current-time',
  template: `

  <div id="current-time">
      The current time in {{tz}} is: {{hours}}:{{minutes}}:{{seconds}}
	  <br />
	  <select [(ngModel)]="tz">
	    <option *ngFor="let tz of tzlist" [value]="tz">
		{{tz}}
		</option>
	  </select>
	  <button (click)="handleClick($event)">Click me!</button>
  </div>
	`,
  styles: [`
#current-time {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
select {
  border-radius: 5px;
}
  `]
})
export class CurrentTimeComponent implements OnInit {
  constructor(private http: HttpClient, private elementRef:ElementRef, private zone: NgZone) {
 	  let selected = this.elementRef.nativeElement.getAttribute('selected');
	  let tzChanged = this.elementRef.nativeElement.getAttribute('time-zone-changed');
	  let btnClicked = this.elementRef.nativeElement.getAttribute('button-clicked');
	  let getCompRef = this.elementRef.nativeElement.getAttribute('get-comp-ref');
	  
	  if(selected !== null && selected !== '') {
		  this.tz = selected;
		  this.oldtz = selected;
	  }
	  
	  if(tzChanged !== null && tzChanged !== '') {
		  this.timeZoneChanged = tzChanged;
	  }
	  if(btnClicked !== null && btnClicked !== '') {
		  this.buttonClicked = btnClicked;
	  }
	  if(getCompRef !== null && getCompRef !== '') {
		this.getCompRef = getCompRef;
	  }
  }
  
  tz: string = 'America/Phoenix';
  oldtz: string = 'America/Phoenix';
  hours: number = 0;
  minutes: number = 0;
  seconds: number = 0;
  
  timeZoneChanged: any;
  buttonClicked: any;
  getCompRef: any;
  
  tzlist = [];
  
  getTime(zone: string): void {
	  this.http.get('https://script.google.com/macros/s/AKfycbyd5AcbAnWi2Yn0xhFRbyzS4qMq1VucMVgVvhul5XqS9HkAyJY/exec?tz=' + zone)
	  .subscribe(data => {
		let result : any = data;
	    this.hours = result.hours;
	    this.minutes = result.minutes;
	    this.seconds = result.seconds;
	  });
  }
  handleClick(ev) {
	  if(this.buttonClicked) {
		let fn = document[this.buttonClicked];
		if (typeof fn === "function") fn(this.tz, ev);
	  }
  }
  handleTimeZoneChanged() {
	  if(this.timeZoneChanged) {
		let fn = document[this.timeZoneChanged];
		if (typeof fn === "function") fn(this.tz);
	  }
  }
  changeTimeZone(tz) {
	  this.zone.run(() => this.tz = tz);
  }
  ngOnInit() {
    if(this.getCompRef) {
	  let fn2 = document[this.getCompRef];
	  if (typeof fn2 === "function") fn2(this);
	}
    this.http.get('https://script.google.com/macros/s/AKfycbyd5AcbAnWi2Yn0xhFRbyzS4qMq1VucMVgVvhul5XqS9HkAyJY/exec?tz=all')
      .subscribe(data => {
		  this.tzlist = Object.keys(data);
		  this.getTime(this.tz);
	  });
  }
  ngDoCheck() {
	  if(this.tz !== this.oldtz) {
		  this.getTime(this.tz);
		  this.handleTimeZoneChanged();
		  this.oldtz = this.tz;
	  }
  }
}
