import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Task {
  id: number;
  title: string;
  task: string;
  date: string;
  priority: string;
}

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  form: FormGroup;
  list: Task[] = [];
  editMode: boolean = false;
  currentTaskId?: number;

  constructor(private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      task: ['', Validators.required],
      date: ['', Validators.required],
      priority: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      const task = navigation.extras.state['task'] as Task;
      if (task) {
        this.editTask(task);
      }
    }
    this.loadTasks();
  }

  onSubmit() {
    if (this.form.valid) {
      if (this.editMode) {
        this.updateTask(this.form.value);
      } else {
        this.addTask(this.form.value);
      }
      this.saveTasks();
      this.form.reset();
      this.editMode = false;
    }
  }

  addTask(task: Omit<Task, 'id'>) {
    const newTask: Task = {
      ...task,
      id: this.list.length ? this.list[this.list.length - 1].id + 1 : 1
    };
    this.list.push(newTask);
  }

  editTask(task: Task) {
    this.form.patchValue(task);
    this.editMode = true;
    this.currentTaskId = task.id;
  }

  updateTask(updatedTask: Omit<Task, 'id'>) {
    const index = this.list.findIndex(task => task.id === this.currentTaskId);
    if (index !== -1) {
      this.list[index] = { ...updatedTask, id: this.currentTaskId! };
    }
  }

  deleteTask(id: number) {
    this.list = this.list.filter(task => task.id !== id);
    this.saveTasks();
  }

  saveTasks(): void {
    localStorage.setItem('tasks', JSON.stringify(this.list));
  }

  loadTasks(): void {
    const tasks = localStorage.getItem('tasks');
    if (tasks) {
      this.list = JSON.parse(tasks);
    }
  }

  redirectToTaskList(): void {
    this.router.navigate(['/task-list']);
  }
}
