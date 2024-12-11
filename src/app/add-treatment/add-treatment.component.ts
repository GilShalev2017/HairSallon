import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Treatment } from '../models/models';

@Component({
  selector: 'app-add-treatment',
  templateUrl: './add-treatment.component.html',
  styleUrl: './add-treatment.component.css'
})
export class AddTreatmentComponent {
  treatment: Treatment = {
    date: this.formatDate(new Date()),
    description: '',
    price: 100
  };

  constructor(private dialogRef: MatDialogRef<AddTreatmentComponent>) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onAddTreatment(): void {
     this.dialogRef.close(this.treatment);
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
