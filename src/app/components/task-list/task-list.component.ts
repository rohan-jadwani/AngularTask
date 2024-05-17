import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { FilterPipe } from '../../pipes/filter.pipe';

interface Task {
  status: string;
  id: number;
  title: string;
  task: string;
  date: string;
  priority: string;
}

@Component({
  selector: 'app-task-list',
  imports:[CommonModule,FilterPipe ],
  standalone: true,
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    const tasks = localStorage.getItem('tasks');
    if (tasks) {
      this.tasks = JSON.parse(tasks);
    }
  }

  editTask(task: Task): void {
    this.router.navigate(['/tasks'], { state: { task } });
  }
  
  deleteTask(id: number): void {
    this.tasks = this.tasks.filter(task => task.id !== id);
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
  }
  
  drop(event: CdkDragDrop<Task[], Task[], any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const movedTask = event.previousContainer.data[event.previousIndex];
      movedTask.status = event.container.id;
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }
  }
}
