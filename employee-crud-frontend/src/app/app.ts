import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="container">
      <h1>Employee Management</h1>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .container { max-width: 900px; margin: 2rem auto; font-family: Arial, sans-serif; }
  `]
})
export class App {

}
