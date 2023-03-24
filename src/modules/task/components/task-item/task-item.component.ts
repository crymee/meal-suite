import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from "@modules/task/models/task.model";

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent {
  @Input() task: Task
  @Output() onDelete: EventEmitter<Task> = new EventEmitter<Task>()
  @Output() onUpdate: EventEmitter<Task> = new EventEmitter<Task>()

  delete () {
    this.onDelete.emit(this.task)
  }

  update () {
    this.onUpdate.emit(this.task)
  }
}
