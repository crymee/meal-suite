import { AfterContentInit, AfterViewInit, Component, Inject } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { User } from "@modules/user/models/user.model";
import { MatSelectModule } from "@angular/material/select";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { BehaviorSubject, Observable, of } from "rxjs";
import { MatIconModule } from "@angular/material/icon";
import { Task } from "@modules/task/models/task.model";

export type TaskForm = FormGroup<{
  id: FormControl<string>
  title: FormControl<string>
  assigneeId: FormControl<string>
  completed: FormControl<boolean>
  description: FormControl<string>
}>

export type TaskFormDialogData = {
  users$: Observable<User[]>
  task: Task
}

@Component({
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatIconModule
  ],
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements AfterContentInit {
  static width = '340px'

  form: TaskForm = this.fb.group({
    id: ['', this.data.task ? Validators.required : []],
    title: ['', Validators.required],
    description: ['', Validators.required],
    assigneeId: ['', Validators.required],
    completed: [false, Validators.required],
  })

  get users$ () {
    return this.data.users$ ? this.data.users$ : of([])
  }

  constructor (
    @Inject(MAT_DIALOG_DATA) protected readonly data: TaskFormDialogData,
    protected readonly fb: FormBuilder,
    protected readonly dialogRef: MatDialogRef<TaskFormComponent>
  ) {
  }

  ngAfterContentInit (): void {
    if (this.data.task) {
      this.form.patchValue(this.data.task)
    }
  }

  onSubmit () {
    this.dialogRef.close(this.form.value)
  }
}
