import { Component } from '@angular/core';
import { IDealExtended } from '../deal.model';
import { DealsService } from '../../../services/deals/deals.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IBuyer } from '../../buyers/buyer.model';
import { TableComponent } from '../../shared/table/table.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-deal-details',
  imports: [TableComponent, CommonModule],
  templateUrl: './deal-details.component.html',
  styleUrl: './deal-details.component.css'
})
export class DealDetailsComponent {
  public deal?: IDealExtended;

  constructor(private dealsService: DealsService, private activatedRoute: ActivatedRoute, private router: Router) {}

  public ngOnInit(): void {
    const id: string | null = this.activatedRoute.snapshot.paramMap.get('id');

    this.dealsService.getDealById(id).subscribe(deal => this.deal = deal);
  }

  public navigateOnChange(id: string | undefined): void {
    this.router.navigate(['deals', id, 'change']);
  }

  public downloadInvoice(): void {
    this.dealsService.downloadInvoice(this.deal?._id).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `invoice_${this.deal?._id}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    });
  }

  navigateToBuyer(buyer: IBuyer): void {
    this.router.navigate(['buyers', buyer._id]);
  }
}
