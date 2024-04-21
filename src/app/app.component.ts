import {
  ChangeDetectionStrategy,
  Component,
  DoCheck,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements DoCheck {
  ngDoCheck(): void {
    console.log('do check');
  }
  counter = signal(0);
  constructor() {
    const readOnlySignal = this.counter.asReadonly();
  }
  increment(): void {
    //to get the value of the signal call the variable with parenthesis i,e variableSignal()
    //alternative way to update signal using update method which takes a callback with prev value and returns new value
    //this.counter.set(this.counter() + 1);
    this.counter.update((preValue) => preValue + 1);
  }
}
