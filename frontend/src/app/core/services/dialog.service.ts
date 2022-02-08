import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ComfirmDialogComponent } from 'src/app/dialogs/comfirm-dialog/comfirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openConfirmDialog(title:string, msg:string){
    return this.dialog.open(ComfirmDialogComponent, {
       width: '390px',
       panelClass: 'confirm-dialog-container',
       disableClose: true,
       position: { top: "20px" },
       data :{
         title : title,
         message : msg
       }
     });
   }
}
