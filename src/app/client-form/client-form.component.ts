// import { ChangeDetectorRef, Component, Inject, OnInit, ViewChild } from '@angular/core';
// import { Client } from '../models/models';
// import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
// import { NgForm, NgModel } from '@angular/forms';
// import { ClientService } from '../services/client.service';

// @Component({
//   selector: 'app-client-form',
//   templateUrl: './client-form.component.html',
//   styleUrl: './client-form.component.css'
// })
// export class ClientFormComponent{
//   client: Client;
//   duplicateError: string | null = null;
//   @ViewChild('emailModel') emailModel!: NgModel;
//   @ViewChild('clientForm') clientForm!: NgForm;

//   constructor(public dialogRef: MatDialogRef<ClientFormComponent>,
//     @Inject(MAT_DIALOG_DATA) public data: Client,
//     private clientService: ClientService,
//     private cdr: ChangeDetectorRef ) {
//     if (data) {
//       this.client = { ...data };
//     }
//     else {
//       this.client = {
//         firstName: '',
//         lastName: '',
//         phone: '',
//         email: '',
//         comment: '',
//         address: '',
//         treatments: [],
//       };
//     }
//   }
//   get emailControl() {
//     return this.emailModel.control;
//   }
//   onCancel(): void {
//     this.dialogRef.close();
//   }
//   onSave(): void {
//     this.dialogRef.close(this.client);
//   }
//   clearField(field: keyof Client): void {
//     if (typeof this.client[field] === 'string') {
//       this.client[field] = '' as any; 
//     } else if (Array.isArray(this.client[field])) {
//       this.client[field] = [] as any; 
//     } else {
//       console.warn(`Cannot clear field ${String(field)} of non-string and non-array type.`);
//     }
//   }
//   checkDuplicatePhone() {
//     if (this.client.phone) {
//       this.clientService.isDuplicateClientByPhone(this.client)
//         .subscribe(response => {
//           if (response.exists) {
//             this.duplicateError = 'A client with this phone number already exists.';
//             this.clientForm.controls['phone'].markAsTouched();
//             this.cdr.detectChanges();
//             setTimeout(() => {
//               this.duplicateError = 'A client with this phone number already exists.';
//               this.clientForm.controls['phone'].markAsTouched();
//               this.cdr.detectChanges();
//             }, 500);
//           } else {
//             this.duplicateError = null;
//             this.clientForm.controls['phone'].markAsTouched();
//             this.cdr.detectChanges();
//           }
//         });
//     }
//   }
// }
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClientService } from '../services/client.service';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css']
})
export class ClientFormComponent implements OnInit {
  clientForm!: FormGroup;
  focusedControl: string = '';
  duplicateError: string | null = null;
  isEditMode = false;

  constructor(
    public dialogRef: MatDialogRef<ClientFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private clientService: ClientService,
    private fb: FormBuilder
  ) {
    if (data !== null) { //we are in edit mode
      this.isEditMode = true;
    }
  }

  ngOnInit(): void {
    this.clientForm = this.fb.group({
      firstName: [this.data?.firstName || '', Validators.required],
      lastName: [this.data?.lastName || '', Validators.required],
      phone: [this.data?.phone || '', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      email: [this.data?.email || '', [Validators.email]],
      comment: [this.data?.comment || ''],
      address: [this.data?.address || ''],
      _id: [this.data?._id || '']
    });

    this.clientForm.get('phone')?.valueChanges.subscribe(() => {
      this.duplicateError = null;
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.clientForm.valid) {
      this.dialogRef.close(this.clientForm.value);
    } else {
      this.clientForm.markAllAsTouched();
    }
  }

  checkDuplicatePhone(): void {
    if (!this.isEditMode) {
      const phone = this.clientForm.get('phone')?.value;
      if (phone) {
        this.clientService.isDuplicateClientByPhone(phone).subscribe(response => {
          if (response.exists) {
            this.duplicateError = 'A client with this phone number already exists.';
            this.clientForm.get('phone')?.setErrors({ duplicate: true });
          } else {
            this.duplicateError = null;
            this.clientForm.get('phone')?.setErrors(null);
          }
        });
      }
    }
  }

  setFocus(controlName: string) {
    this.focusedControl = controlName;
  }
}
