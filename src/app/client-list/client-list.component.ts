import { Component } from '@angular/core';
import { Client } from '../models/models';
import { ClientService } from '../services/client.service';
import { ClientFormComponent } from '../client-form/client-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.css'
})
export class ClientListComponent {
  search = { firstName: '', lastName: '' };
  clients: Client[] = [];

  constructor(private clientService: ClientService, private dialog: MatDialog) { }

  searchClients(): void {
    this.clientService
      .searchClients(this.search.firstName, this.search.lastName)
      .subscribe((result) => {
        this.clients = result;
      });
  }

  openCreateClientDialog() {
    const dialogRef = this.dialog.open(ClientFormComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Handle the newly created client result
        console.log('New client:', result);
        // Add result to clients list or send to the backend
      }
    });
  }
}
