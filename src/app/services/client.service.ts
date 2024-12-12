import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client, Treatment } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private apiUrl = environment.apiUrl;
  
  constructor(private http: HttpClient) {}

  getData() {
    return this.http.get(`${this.apiUrl}/data`);
  }

  addClient(client: Client): Observable<Client> {
    return this.http.post<Client>(`${this.apiUrl}/clients`, client);
  }

  addTreatment(clientId: string, treatment: Treatment): Observable<Client> {
    return this.http.post<Client>(`${this.apiUrl}/clients/${clientId}/treatments`, treatment);
  }

  searchClients(firstName?: string, lastName?: string): Observable<Client[]> {
    let params = new URLSearchParams();
    if (firstName) params.append('firstName', firstName);
    if (lastName) params.append('lastName', lastName);

    return this.http.get<Client[]>(`${this.apiUrl}/clients?${params.toString()}`);
  }

  getAllClients() : Observable<Client[]> {
    return this.http.get<Client[]>(`${this.apiUrl}/clients`);
  }

  deleteClient(clientId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/clients/${clientId}`);
  }
}