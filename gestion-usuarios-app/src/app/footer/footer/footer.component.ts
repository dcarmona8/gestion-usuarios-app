import { Component } from '@angular/core';
import { PaginacionComponent } from "../../components/paginacion/paginacion.component";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [PaginacionComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

}
