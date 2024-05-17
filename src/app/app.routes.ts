import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { TaskComponent } from './components/task/task.component';
import { HomeComponent } from './components/home/home.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';

export const routes: Routes = [
    { path: '', component: AppComponent },
    { path: 'tasks', component: TaskComponent },
    { path: 'task-list', component: TaskListComponent },
    { path: 'hello', component:  TaskListComponent},  
    { path: 'home', component: HomeComponent},
    { path: 'signup', component: SignupComponent},
    { path: 'login', component: LoginComponent},
    { path: '**', redirectTo: '' }  
];
