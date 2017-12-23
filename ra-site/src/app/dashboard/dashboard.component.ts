import { Component, OnInit } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import { forEach } from '@angular/router/src/utils/collection';

import { TopSales } from '../model/top-sales';
import { TopSalesService } from '../services/top-sales.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  topSales: TopSales[] = [];

  constructor(private topSalesService: TopSalesService) {
   }

  ngOnInit() {
    this.getProducts();
  }

  getProducts(): void {
    this.topSalesService.getTopSales().subscribe(ts => this.topSales = ts.slice(1, 5));
    }
}