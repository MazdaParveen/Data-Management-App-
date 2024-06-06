import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import 'chartjs-adapter-date-fns';

import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {   FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { OnDestroy } from '@angular/core';
import { DataEntry } from '../data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-view-data',
  standalone: true,
  imports: [CommonModule,FormsModule, 
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatListModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BaseChartDirective,
    
  ],
  templateUrl: './view-data.component.html' ,
  styleUrl: './view-data.component.css'
})
export class ViewDataComponent implements OnInit, OnDestroy {
  [x: string]: any;
  dataEntries: DataEntry[] = [];
  chartData: { data: number[], label: string }[] = [];
  labels: string[] = [];
  chartOption: ChartOptions = {
    responsive: true,
    scales: {
      x: {},
      y: {}
    }
  };

  private dataSubscription!: Subscription;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataSubscription = this.dataService.dataEntries$.subscribe(entries => {
      this.dataEntries = entries;
      this.updateChartData();
    });
  }

  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
  }

  updateChartData() {
    this.chartData = [
      {
        data: this.dataEntries.map(entry => entry.temperature),
        label: 'Temperature (°C)'
      },
      {
        data: this.dataEntries.map(entry => entry.humidity ?? 0),
        label: 'Humidity (%)'
      },
      {
        data: this.dataEntries.map(entry => entry.pressure ?? 0),
        label: 'Pressure (hPa)'
      }
    ];
    this.labels = this.dataEntries.map(entry => entry.datetime.toISOString());
  }
}
