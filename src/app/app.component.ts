import { Component } from '@angular/core';

//import data service
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //define users array to hold user data
  users: Array<any>;

  //create an instance of the DataService throgh dependency injection
  constructor(private _dataService: DataService){
    //access the data service's getUsers() method
    this._dataService.getUsers()
      .subscribe(res => this.users = res);
  }
}
