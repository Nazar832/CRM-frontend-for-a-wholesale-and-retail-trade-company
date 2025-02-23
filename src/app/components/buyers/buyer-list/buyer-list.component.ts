import { Component } from '@angular/core';
import { IBuyer } from '../buyer.model';
import { BuyersService } from '../../../services/buyers/buyers.service';
import { Router } from '@angular/router';
import { TableComponent } from '../../shared/table/table.component';

@Component({
  selector: 'app-buyer-list',
  imports: [TableComponent],
  templateUrl: './buyer-list.component.html',
  styleUrl: './buyer-list.component.css'
})
export class BuyerListComponent {
  buyers: IBuyer[] | undefined = [];

  constructor(private buyersService: BuyersService, private router: Router) {}

  public ngOnInit(): void {
    this.buyersService.getBuyers().subscribe(buyers => this.buyers = buyers);
  }

  navigateToBuyer(buyer: IBuyer): void {
    this.router.navigate(['buyers', buyer._id]);
  }

  navigateToCreateBuyer(): void {
    this.router.navigate(['buyers/create']);
  }
}
