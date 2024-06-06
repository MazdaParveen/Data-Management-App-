import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {  ReactiveFormsModule } from '@angular/forms';
import { AddDataComponent } from "./add-data/add-data.component";
import { ViewDataComponent } from "./view-data/view-data.component";
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, CommonModule,
        MatTabsModule,
        MatInputModule,
        MatButtonModule,
       ReactiveFormsModule , AddDataComponent, ViewDataComponent, BaseChartDirective ]
})
export class AppComponent {
  title = 'data-management-app';
}
