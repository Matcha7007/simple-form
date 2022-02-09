import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AlertService } from 'src/app/core/services/alert.service';
import { DialogService } from 'src/app/core/services/dialog.service';
import { EmployeeService } from 'src/app/core/services/employee.service';
import { Employee } from 'src/app/models/employee';
import { AddEmployeeComponent } from './add-employee/add-employee.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  constructor(
    private employee: EmployeeService,
    private alert: AlertService,
    private dialog: DialogService,
    private matDialog: MatDialog,
    private fb: FormBuilder
  ) { }

  devList: any[] = ['Finance','Accounting','IT Support'];
  employeeForms: FormArray = this.fb.array([]);
  data: Employee[] = [];
  listData!: MatTableDataSource<Employee>;
  displayedColumns: string[] = ['no', 'name', 'address', 'devision', 'phone', 'actions'];
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  searchKey!: string;
  emp:any;

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.employee.getAllEmployees().subscribe(x => {
      this.data = x;
      console.log(this.data);
      this.listData = new MatTableDataSource(this.data);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
      this.listData.filterPredicate = (data, filter) => {
        return this.displayedColumns.some(ele => {
          return ele != 'actions' && data[ele as keyof Employee]?.toString().toLowerCase().indexOf(filter) != -1;
        });
      };
    })
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }  

  onDelete(id:number, name:string) {
    this.dialog.openConfirmDialog('Delete Record', 'Are you sure to delete this record employee '+ name +'?')
    .afterClosed().subscribe(res =>{
      if(res){
        this.employee.deleteEmployee(id).subscribe(x => {
          this.alert.alertWarn("Deleted Employee Id : " + x.toString());
          this.loadData();
        });
      };
    });
  }

  onAdd() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    dialogConfig.position = {top: '5%', left:'25%'};
    dialogConfig.data = { title: 'Add Employee', edit: false }
    this.matDialog.open(AddEmployeeComponent, dialogConfig).afterClosed().subscribe(()=>{
      this.loadData();
    });
  }

  onEdit(row:any) {
    this.employee.populateForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    dialogConfig.position = {top: '5%', left:'25%'};
    dialogConfig.data = { title: 'Edit Employee', edit: true }
    this.matDialog.open(AddEmployeeComponent, dialogConfig).afterClosed().subscribe(()=>{
      this.loadData();
    });
  }
}
