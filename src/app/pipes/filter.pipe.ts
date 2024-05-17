import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterPipe implements PipeTransform {

  transform(tasks: any[], status: string): any[] {
    return tasks.filter(task => task.status === status);
  }

}
