import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService } from 'src/app/core/services/alert.service';
import { EmployeeService } from 'src/app/core/services/employee.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {

  // id?:string;
  // name?:string;
  // address?:string;
  // phone?:number;
  // devision?:number;

  @Input() emp:any;
  dev: any[] = ['Finance','Accounting','IT Support']
  // formAddEdit = new FormGroup(
  //   {
  //     id: new FormControl(''),
  //     name: new FormControl(''),
  //     address: new FormControl(''),
  //     phone: new FormControl(''),
  //     devision: new FormControl()
  //   }
  // );

  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private empService: EmployeeService,
    private alert: AlertService,
    public dialogRef: MatDialogRef<AddEmployeeComponent>
  ) { }

  serviceform = this.empService.form;
  ngOnInit(): void {
    console.log("Edit? "+ this.data.edit)
    console.log(this.empService.form.value);
  }

  createForm(){

  }

  onClear() {
    // this.empService.form.reset();
    // this.empService.initializeFormGroup();
    this.onClose();
  }

  onSubmit() {
    console.log("submitt "+ this.empService.form.value);
    //console.log(this.empService.form.get)
    if (this.empService.form.valid) {
      if (!this.data.edit)
      {
        this.empService.addEmployee(this.empService.form.value).subscribe(
          () => { this.alert.alertSuccess('Added Successfully') }
        );
      }
      else
      {
        this.empService.updateEmployee(this.empService.form.value).subscribe(
          () => { this.alert.alertSuccess('Updated Successfully') }
        );
      }
      this.empService.form.reset();
      this.empService.initializeFormGroup();
      
      this.onClose();
      }
  }

  onClose() {
    // this.empService.form.reset();
    // this.empService.initializeFormGroup();
    this.dialogRef.close();
  }
}
