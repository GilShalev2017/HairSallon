import { Component } from '@angular/core';
import { Client } from '../models/models';
import { ClientService } from '../services/client.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrl: './client-form.component.css'
})
export class ClientFormComponent {
  client: Client = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    treatments: [],
  };

  constructor(private clientService: ClientService,public dialogRef: MatDialogRef<ClientFormComponent>) {}


  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close(this.client);
  }
}
