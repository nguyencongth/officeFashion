import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef, MatDialogTitle
} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-dialog-contact-info',
  standalone: true,
  imports: [
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatButton,
  ],
  templateUrl: './dialog-contact-info.component.html',
  styleUrl: './dialog-contact-info.component.css'
})
export class DialogContactInfoComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogContactInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}
  closeDialog() {
    this.dialogRef.close();
  }
}
