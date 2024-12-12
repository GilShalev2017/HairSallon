import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Client, Treatment } from '../models/models';
import { ClientService } from '../services/client.service';
import { ClientFormComponent } from '../client-form/client-form.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { AddTreatmentComponent } from '../add-treatment/add-treatment.component';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.css',
  animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ClientListComponent implements OnInit {

  clients: Client[] = [];
  search = { firstName: '', lastName: '' };
  dataSource = new MatTableDataSource<Client>([]);
  pageSizeOptions = [5, 10, 25];

  columnsToDisplay = ['firstName', 'lastName', 'phone', 'email'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: Client | null = null;

  treatmentColumns: string[] = ['date', 'description', 'price'];

  filteredClients: Client[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private clientService: ClientService, private dialog: MatDialog) { }

  isMobile: boolean = window.innerWidth <= 600;

  @HostListener('window:resize', [])
  onResize() {
    this.isMobile = window.innerWidth <= 600;
  }

  ngOnInit() {
    this.getAllClients();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getAllClients(): void {
    this.clientService.getAllClients().subscribe({
      next: (result) => {
        this.dataSource.data = result;
      },
      error: (err) => console.error('Error loading clients:', err),
    });
  }

  searchClients(): void {
    this.clientService
      .searchClients(this.search.firstName, this.search.lastName)
      .subscribe((result) => {
        this.dataSource.data = result.map(client => ({
          ...client,
          treatments: client.treatments || [] // Default to an empty array if undefined
        }));
        this.filteredClients = this.dataSource.data;
      });
  }

  openCreateClientDialog() {
    const dialogRef = this.dialog.open(ClientFormComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(newClient => {
      if (newClient) {
        // Handle the newly created client result
        console.log('New client:', newClient);

        this.clientService.addClient(newClient).subscribe({
          next: (response) => {
            console.log('Client added:', response);
            this.getAllClients();
          },
          error: (err) => console.error('Error adding client:', err),
        });

      }
    });
  }

  deleteClient(client: Client): void {
    if (confirm(`Are you sure you want to delete ${client.firstName} ${client.lastName}?`)) {
      this.clientService.deleteClient(client._id!).subscribe({
        next: () => {
          console.log('Client removed:', client);
          this.getAllClients();
        },
        error: (err) => console.error('Error removing client:', err),
      });
    }
  }

  refresh() {
    this.getAllClients();
  }

  openAddTreatmentDialog(client: Client): void {
    const dialogRef = this.dialog.open(AddTreatmentComponent, {
      width: '400px',
      data: client,
    });

    dialogRef.afterClosed().subscribe((treatment: Treatment | null) => {
      if (treatment) {
        this.clientService.addTreatment(client._id!, treatment).subscribe({
          next: (updatedClient) => {
            console.log('Client updated successfully', updatedClient);
            this.getAllClients();
          },
          error: (err) => {
            console.error('Failed to add treatment', err);
          },
        });
      }
    });
  }

  toggleExpand(element: any): void {
    this.expandedElement = this.expandedElement === element ? null : element;
  }

  editTreatment(client: any, treatment: any): void {
    // Logic to edit an existing treatment
  }
  
  deleteTreatment(client: any, treatment: any): void {
    // Logic to delete an existing treatment
  }
}
