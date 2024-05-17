import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: Date;
  priority: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks:Task[] = [];
  private tasksSubject: BehaviorSubject<Task[]> = new BehaviorSubject(this.tasks);

  constructor() { }

  getTasks(): Observable<Task[]> {
    return this.tasksSubject.asObservable();
  }

  addTask(task: Task): void {
    task.id = this.tasks.length + 1;
    this.tasks.push(task);
    this.tasksSubject.next(this.tasks);
  }

  editTask(updatedTask: Task): void {
    const index = this.tasks.findIndex(task => task.id === updatedTask.id);
    if (index !== -1) {
      this.tasks[index] = updatedTask;
      this.tasksSubject.next(this.tasks);
    }
  }

  deleteTask(id: number): void {
    this.tasks = this.tasks.filter(task => task.id !== id);
    this.tasksSubject.next(this.tasks);
  }
}
