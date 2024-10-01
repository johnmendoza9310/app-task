import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TasksService } from 'src/app/services/tasks-service/tasks.service';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css']
})
export class TasksListComponent implements OnInit {


  constructor(private taskService: TasksService){ }

  ngOnInit(): void {


    this.taskService.getData().subscribe((data)=> {

      console.log("data obtenida", data);


    })

  }

}
