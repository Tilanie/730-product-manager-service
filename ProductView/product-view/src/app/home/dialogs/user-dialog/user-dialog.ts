import { Component, EventEmitter, Inject } from "@angular/core";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { QueueModel } from "../../../models/queue-model";
import { UserModel } from "../../../models/user-model";
import { ConfirmAssignmentDialog } from "../confirm-assignment-dialog/confirm-assignment-dialog";

@Component({
    selector: 'user-dialog',
    templateUrl: 'user-dialog.html',
  })
  export class UserDialog {
    public onAdd = new EventEmitter();
    private user_info = new UserModel();
    public queue_info;
    constructor(
      @Inject(MAT_DIALOG_DATA) public data: any,
      public dialogRef: MatDialog,
      public confirmDialog: MatDialog
    ) {
      this.onAdd = new EventEmitter();
      this.queue_info = data.QUEUE_DATA;
    }
  
    userDataSource = new MatTableDataSource(this.data.USER_DATA);
    userDisplayColumns: string[] = ['id', 'id_number', 'email', 'username', 'first_name', 'last_name', 'password']
    assignUserToQueue(user: UserModel, queue: QueueModel){
      //@TODO implement
      this.onAdd.emit();
    }
    applyUserFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.userDataSource.filter = filterValue.trim().toLowerCase();
    }
  
    rowSelected(element: UserModel){
      //@TODO assign this user to the queue
      this.user_info = element;
      const dialogRef = this.confirmDialog.open(ConfirmAssignmentDialog, {
        width: '1000px',
        data: element
      });
  
      const sub = dialogRef.componentInstance.onAdd.subscribe(() => {
  
        this.assignUserToQueue(this.user_info, this.queue_info);
      })
    }
  
  }