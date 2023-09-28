import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';

@Component({
  selector: 'app-delete-pop-up',
  templateUrl: './delete-pop-up.component.html',
  styleUrls: ['./delete-pop-up.component.css']
})
export class DeletePopUpComponent {
  constructor(
    private dialogRef:MatDialogRef<DashboardComponent>
  ){}

  conformation(){
    this.dialogRef.close(true)
  }

}
