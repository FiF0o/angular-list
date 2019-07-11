import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  app = 'material-angular';
  title = 'Page title';
  links = [
    { path: '/home', label: 'Home', icon: 'home'},
    { path: '/items', label: 'items', icon: 'apps'},
    { path: '/list', label: 'list', icon: 'list'}
  ];
  events: string[] = [];
  opened: boolean;
}
