import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../interfaces/client';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  private baseUrl = "https://business-back.onrender.com"

  constructor(private http: HttpClient) { }

  public getClients(): Observable<Client[]> {
    const url = `${this.baseUrl}/clients`
    return this.http.get<Client[]>(url)
  }

  public getOneClient(dni: string): Observable<Client> {
    const url = `${this.baseUrl}/clients`
    return this.http.get<Client>(`${url}?dni=${dni}`)
  }

  public creatClient(client: Client): Observable<Client> {
    if (!client.payment){
      client.payment=0;
    }
    if (!client.debt){
      client.debt=0;
    }
    client.dni=client.dni.toString();
    const url = `${this.baseUrl}/clients`
    return this.http.post<Client>(url, client)
  }

  public updateClient(client: Client): Observable<Client> {
    if (!client.payment){
      client.payment=0;
    }
    if (!client.debt){
      client.debt=0;
    }
    client.dni=client.dni.toString();
    const url = `${this.baseUrl}/clients`
    return this.http.put<Client>(`${url}/${client.id}`, client)
  }
}
