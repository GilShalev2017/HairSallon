import { Component, Inject, ViewChild } from '@angular/core';
import { Client } from '../models/models';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrl: './client-form.component.css'
})
export class ClientFormComponent {
  client: Client;
  //  = {
  //   firstName: '',
  //   lastName: '',
  //   phone: '',
  //   email: '',
  //   comment: '',
  //   address: '',
  //   treatments: [],
  // };

  @ViewChild('emailModel') emailModel!: NgModel;

  constructor(public dialogRef: MatDialogRef<ClientFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Client) {

    if (data) {
      this.client = { ...data };
    }
    else {
      this.client = {
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        comment: '',
        address: '',
        treatments: [],
      };
    }
  }

  get emailControl() {
    return this.emailModel.control;
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close(this.client);
  }

  clearField(field: keyof Client): void {
    if (typeof this.client[field] === 'string') {
      this.client[field] = '' as any; // Assigning an empty string
    } else if (Array.isArray(this.client[field])) {
      this.client[field] = [] as any; // Assigning an empty array
    } else {
      // Handle other types as needed
      console.warn(`Cannot clear field ${String(field)} of non-string and non-array type.`);
    }
  }

}
