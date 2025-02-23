import { Component, Input } from '@angular/core';
import { IProduct } from '../../products/product.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { IBuyer } from '../../buyers/buyer.model';

@Component({
  selector: 'app-table',
  imports: [CommonModule, MatTableModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
  @Input() columns: string[] = [];
  @Input() data: IProduct[] | IBuyer[] | null | undefined = [];
  @Input() isDealsTable: boolean = false;
  @Input() rowClickHandler: (row: any) => void = () => {};

  constructor(private router: Router) {}

  formatCell(row: any, col: string): string {
    if (this.isDealsTable && col === 'products') {
      return row.products.map((product: any) => `${product.product} (${product.amount})`).join(', ');
    }
    return row[col];
  }

  onRowClick(row: any) {
    if (this.rowClickHandler) {
      this.rowClickHandler(row);
    }
  }
}
