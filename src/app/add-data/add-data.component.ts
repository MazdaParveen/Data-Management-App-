import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule,  } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { DataService } from '../data.service';
@Component({
  selector: 'app-add-data',
  standalone: true,
  imports: [ 
    CommonModule,
    MatTabsModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
     MatListModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ],
  templateUrl: './add-data.component.html',
  styleUrl: './add-data.component.css'
})
export class AddDataComponent {
  dataForm: FormGroup;

  constructor(private fb: FormBuilder, private dataService: DataService) {
    this.dataForm = this.fb.group({
      datetime: ['', [Validators.required, this.pastDateValidator]],
      temperature: ['', [Validators.required, Validators.min(-50), Validators.max(50)]]
    });
  }

  pastDateValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const inputDate = new Date(control.value);
    const now = new Date();
    return inputDate < now ? null : { notPastDate: true };
  }

  get datetime() {
    return this.dataForm.get('datetime')!;
  }

  get temperature() {
    return this.dataForm.get('temperature')!;
  }

  onSubmit() {
    if (this.dataForm.valid) {
this.dataService.addDataEntry(this.dataForm.value);
      this.dataForm.reset();
    }
  }
}