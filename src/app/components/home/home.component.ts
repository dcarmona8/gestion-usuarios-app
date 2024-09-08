import { Component } from '@angular/core';
import { DashboardComponent } from "../dashboard/dashboard.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DashboardComponent, RouterOutlet],
  providers: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
