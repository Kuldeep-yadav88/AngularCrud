import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css'],
})
export class AddEditComponent implements OnInit {
  education: string[] = [
    'computer science engineering',
    'Mechanical',
    'Electrical',
    'civil',
  ];
  public empForm!: FormGroup;
  actionBtn: string = 'Save';
  isChecked = true;
  isEdit = false;
  userInfo: any = new Object();
  constructor(
    private _fb: FormBuilder,
    private dialogRef: MatDialogRef<AddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.updateForm();
  }

  ngOnInit(): void {
    if (this.data.action === 'edit') {
      this.empForm.patchValue(this.data.editData);
    }
  }

  updateForm() {
    this.empForm = this._fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      branch: ['', Validators.required],
      company: ['', Validators.required],
      acceptTerms: ['', Validators.requiredTrue],
    });
  }

  onformSubmit() {
    console.log(this.empForm.value);
    this.dialogRef.close(this.empForm.value);
  }
}
