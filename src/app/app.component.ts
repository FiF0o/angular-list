import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'material-angular';
  links = [
    { path: '/home', label: 'Home', icon: 'apps'}
  ];
  events: string[] = [];
  opened: boolean;
}
