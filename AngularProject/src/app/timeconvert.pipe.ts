import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeconvert',
  standalone: true
})
export class TimeconvertPipe implements PipeTransform {

  transform(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (hours === 0) {
      return `${remainingMinutes} minutes`;
    } else if (remainingMinutes === 0) {
      return `${hours} hours`;
    } else {
      return `${hours} hours and ${remainingMinutes} minutes`;
    }
  }

}
