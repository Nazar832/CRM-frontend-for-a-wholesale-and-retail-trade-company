import { Component, OnInit } from '@angular/core';
import { BuyersService } from '../../../services/buyers/buyers.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-buyer-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './buyer-form.component.html',
  styleUrl: './buyer-form.component.css'
})
export class BuyerFormComponent implements OnInit {
  name?: string;
  phoneNumber?: string;
  contactPerson?: string;
  address?: string;
  isChangeForm: boolean = false;

  constructor(private buyersService: BuyersService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.name = '';
    this.phoneNumber = '';
    this.contactPerson = '';
    this.address = '';
  }

  public ngOnInit(): void {
    if (this.router.url.endsWith('change')) {
      const id: string | null = this.activatedRoute.snapshot.paramMap.get('id');
      this.isChangeForm = true;

      this.buyersService.getBuyerById(id).subscribe(buyer => {
        this.name = buyer.name;
        this.phoneNumber = buyer.phoneNumber;
        this.contactPerson = buyer.contactPerson;
        this.address = buyer.address;
      })
    };
  }

  createBuyer(): void {
    this.buyersService.createBuyer({
      name: this.name,
      phoneNumber: this.phoneNumber,
      contactPerson: this.contactPerson,
      address: this.address
    }).subscribe(() => this.router.navigate(['buyers']));
  }

  change(): void {
    const id: string | null = this.activatedRoute.snapshot.paramMap.get('id');

    this.buyersService.updateBuyer(id, {
      name: this.name,
      phoneNumber: this.phoneNumber,
      contactPerson: this.contactPerson,
      address: this.address
    }).subscribe(() => this.router.navigate(['buyers', id]));
  }

  cancelCreation(): void {
    this.router.navigate(['buyers']);
  }

  cancelUpdating(): void {
    const id: string | null = this.activatedRoute.snapshot.paramMap.get('id');
    this.router.navigate(['buyers', id]);
  }
}
