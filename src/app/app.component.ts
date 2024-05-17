import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { TaskComponent } from './components/task/task.component';
import { HomeComponent } from './components/home/home.component';
import { initializeApp } from "firebase/app";
import { firebaseConfig } from '../../firebase';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { DragDropModule } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, TaskComponent, HomeComponent, NavbarComponent,TaskListComponent,DragDropModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular-task';
  constructor(){
    initializeApp(firebaseConfig);
  }
}
