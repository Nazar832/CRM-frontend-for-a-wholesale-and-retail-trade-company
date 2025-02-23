import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatListModule } from '@angular/material/list';


@Component({
  selector: 'app-navbar',
  imports: [RouterModule, MatListModule, MatToolbarModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
}
