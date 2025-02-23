import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { IDeal } from '../deal.model';
import { DealsService } from '../../../services/deals/deals.service';
import { Router } from '@angular/router';
import { TableComponent } from '../../shared/table/table.component';

@Component({
  selector: 'app-deal-list',
  imports: [MatTabsModule, TableComponent],
  templateUrl: './deal-list.component.html',
  styleUrl: './deal-list.component.css'
})
export class DealListComponent {
  deals: IDeal[] | undefined = [];

  selectedFilter: string = 'all';
  filteredDeals: IDeal[] = [...this.deals ?? []];

  constructor(private dealsService: DealsService, private router: Router) {}

  public ngOnInit(): void {
    this.dealsService.getDeals().subscribe(deals => {
      this.deals = deals;
      this.filteredDeals = [...this.deals ?? []];
    });
  }

  changeFilter(index: number) {
    const filters = ['all', 'wholesale', 'retail', 'unpaid', 'paid', 'cancelled'];
    this.selectedFilter = filters[index];
    this.applyFilter();
  }

  applyFilter() {
    if (this.selectedFilter === 'all') {
      this.filteredDeals = [...this.deals ?? []];
    } else if (this.selectedFilter === 'wholesale') {
      this.filteredDeals = this.deals!.filter(deal => deal.wholesale);
    } else if (this.selectedFilter === 'retail') {
      this.filteredDeals = this.deals!.filter(deal => !deal.wholesale);
    } else {
      this.filteredDeals = this.deals!.filter(deal => deal.status === this.selectedFilter);
    }
  }

  navigateToDeal(deal: IDeal): void {
    this.router.navigate(['deals', deal._id]);
  }

  navigateToCreateDeal(): void {
    this.router.navigate(['deals/create']);
  }
}
