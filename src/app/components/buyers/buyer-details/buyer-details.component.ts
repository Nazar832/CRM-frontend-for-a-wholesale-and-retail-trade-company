import { Component } from '@angular/core';
import { IBuyerDetailed } from '../buyer.model';
import { BuyersService } from '../../../services/buyers/buyers.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IDeal } from '../../deals/deal.model';
import { TableComponent } from '../../shared/table/table.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-buyer-details',
  imports: [TableComponent, CommonModule],
  templateUrl: './buyer-details.component.html',
  styleUrl: './buyer-details.component.css'
})
export class BuyerDetailsComponent {
  public buyer?: IBuyerDetailed;

  constructor(private buyersService: BuyersService, private activatedRoute: ActivatedRoute, private router: Router) {}

  public ngOnInit(): void {
    const id: string | null = this.activatedRoute.snapshot.paramMap.get('id');

    this.buyersService.getBuyerById(id).subscribe(buyer => this.buyer = buyer);
  }

  public deleteBuyer(): void {
    const id: string | null = this.activatedRoute.snapshot.paramMap.get('id');

    this.buyersService.deleteBuyer(id).subscribe(() => this.router.navigate(['/buyers']));
  }

  public navigateOnChange(id: string | undefined): void {
    this.router.navigate(['buyers', id, 'change']);
  }

  navigateToDeal(deal: IDeal): void {
    this.router.navigate(['deals', deal._id]);
  }
}
