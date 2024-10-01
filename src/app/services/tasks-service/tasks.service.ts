import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private baseUrl = environment.apiUrl;
  private headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'X-Access-Key':
      '$2a$10$yQSHiAsbtPslZBJvCGhME.SOfzFNg7G9w3qV48HQLx5C.X7vjEvxa',
  });

  constructor(private http: HttpClient) {}

  /**
   * Realiza una petición GET a un endpoint
   * @param baseUrl
   * @returns listado de tareas
   */
  getData(): Observable<any> {
    const url = `${this.baseUrl}`;
    return this.http.get(url, { headers: this.headers });
  }
}
