import { Injectable, NgZone } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client, Treatment } from '../models/models';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private apiUrl = environment.apiUrl;

  durationInSeconds = 5000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private http: HttpClient, private snackBar: MatSnackBar, private zone: NgZone) { }

  showMessage(message: string, action: string = 'close') {
    this.snackBar.open(message,
      action,
      {
        duration: this.durationInSeconds * 1000,
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition
      }
    );
  }

  getData() {
    return this.http.get(`${this.apiUrl}/data`);
  }

  addClient(client: Client): Observable<Client> {
    return this.http.post<Client>(`${this.apiUrl}/clients`, client);
  }

  updateClient(client: Client): Observable<Client> {
    return this.http.put<Client>(`${this.apiUrl}/clients/${client._id}`, client);
  }

  addTreatment(clientId: string, treatment: Treatment): Observable<Client> {
    return this.http.post<Client>(`${this.apiUrl}/clients/${clientId}/treatments`, treatment);
  }

  // searchClients(firstName?: string, lastName?: string): Observable<Client[]> {
  //   let params = new URLSearchParams();
  //   if (firstName) params.append('firstName', firstName);
  //   if (lastName) params.append('lastName', lastName);

  //   return this.http.get<Client[]>(`${this.apiUrl}/clients?${params.toString()}`);
  // }

  searchClients(searchQuery: string): Observable<Client[]> {
    const params = new HttpParams().set('searchQuery', searchQuery);
    return this.http.get<Client[]>(`${this.apiUrl}/clients`, { params });
  }

  getAllClients(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.apiUrl}/clients`);
  }

  deleteClient(clientId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/clients/${clientId}`);
  }

  isDuplicateClientByPhone(phone: string): Observable<any> {
    return this.http.get<boolean>(`${this.apiUrl}/clients/check-duplicate?phone=${phone}`);
  }
}
