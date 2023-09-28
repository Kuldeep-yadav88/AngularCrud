import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEditComponent } from '../add-edit/add-edit.component';
import { ServiceService } from '../serivece/service.service';
import { MatPaginatorModule } from '@angular/material/paginator';
import { LoaderService } from '../Loaderservice/loader.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { DeletePopUpComponent } from '../twoStepConformation/delete-pop-up/delete-pop-up.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  title = 'paginator';
  allusers: any = [];
  empForm: any;
  dataSource: any;

  constructor(
    public dialog: MatDialog,
    private _empservice: ServiceService,
    public loader: LoaderService,
    public router: Router,
    private toast: NgToastService
  ) {}

  ngOnInit(): void {
    this.getAllDetails();
  }

  logOut() {
    this.toast.success({
      detail: 'Success Message',
      summary: 'Logout successful',
      duration: 3000,
    });
    localStorage.clear();
  }

  dialogOpen(action: string, editData: any) {
    const dialogRef = this.dialog.open(AddEditComponent, {
      data: {
        action: action,
        editData: editData,
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (action === 'add' && result != null) {
        this._empservice.postEmpDetails(result).subscribe(() => {
          this.toast.success({
            detail: 'New User Added',
            summary: 'New user Added successfully',
            duration: 3000,
          });
          this.loaderlooad();
          this.getAllDetails();
        });
      } else if (action === 'edit' && result != null) {
        result.id = editData.id;
        this.loaderlooad();
        this._empservice.putEmpDetails(result).subscribe(() => {
          this.getAllDetails();
          this.toast.success({
            detail: 'Details Updated',
            summary: 'User details updated successfully',
            duration: 3000,
          });
        });
      }
    });
  }

  deleteDetails(id: number) {
    const dialogRef = this.dialog.open(DeletePopUpComponent);
    dialogRef.afterClosed().subscribe((res: any) => {
      if (res === true) {
        this._empservice.deleteEmp(id).subscribe({
          next: (res) => {
            this.loaderlooad();
            this.toast.success({
              detail: 'Success Message',
              summary: 'Delete successful',
              duration: 3000,
            });
            this.getAllDetails();
          },
          error: () => {
            this.toast.error({
              detail: 'Error Message',
              summary: 'Error while Deleting',
              duration: 3000,
            });
          },
        });
      }
    });
  }

  getAllDetails() {
    this._empservice.getEmpDetails().subscribe((data: any) => {
      this.allusers = data;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  loaderlooad() {
    this.loader.isloading.next(true);
    setTimeout(() => {
      this.loader.isloading.next(false);
      this.router.navigate(['dashboard']);
    }, 1000);
  }
}
