import { Injectable, signal, WritableSignal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import {
  ITask,
  ITaskGetResponse,
  ITaskPutResponse,
} from 'src/app/models/interfaces/task.interface';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private baseUrl = environment.apiUrl;
  private headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'X-Access-Key': environment.accesKey,
  });

  private tasksSignal = signal<ITask[]>([]);
  constructor(private http: HttpClient) {}

  setTasks(tasks: ITask[]): void {
    this.tasksSignal.set(tasks);
  }
  getData(): Observable<ITask[]> {
    return this.http
      .get<ITaskGetResponse>(this.baseUrl, {
        headers: this.headers,
      })
      .pipe(map((data: ITaskGetResponse) => data.record));
  }

  putData(tasks: ITask[]): Observable<ITaskPutResponse> {
    return this.http.put<ITaskPutResponse>(this.baseUrl, tasks, {
      headers: this.headers,
    });
  }
}
