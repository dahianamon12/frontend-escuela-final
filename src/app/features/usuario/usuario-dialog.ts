import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { AuditContextService } from '../../core/audit-context.service';
import { UsuarioService } from '../../core/services/usuario.service';
import { UsuarioResponse } from '../../models/api.models';

export interface UsuarioDialogData {
  mode: 'create' | 'edit';
  row?: UsuarioResponse;
}

@Component({
  selector: 'app-usuario-dialog',
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatSnackBarModule,
  ],
  templateUrl: './usuario-dialog.html',
})
export class UsuarioDialogComponent {
  private readonly fb = inject(FormBuilder);
  private readonly svc = inject(UsuarioService);
  private readonly audit = inject(AuditContextService);
  private readonly dialogRef = inject(MatDialogRef<UsuarioDialogComponent, boolean>);
  private readonly snack = inject(MatSnackBar);

  readonly data = inject<UsuarioDialogData>(MAT_DIALOG_DATA);

  readonly roles = ['ADMIN', 'DIRECTOR', 'PROFESOR', 'ESTUDIANTE'];

  readonly form = this.fb.nonNullable.group({
    nombre: ['', Validators.required],
    nombre_usuario: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    contrasena: [''],
    rol: ['', Validators.required],
    activo: [true],
  });

  constructor() {
    if (this.data.mode === 'edit' && this.data.row) {
      const r = this.data.row;
      this.form.patchValue({
        nombre: r.nombre,
        nombre_usuario: r.nombre_usuario,
        email: r.email,
        rol: r.rol,
        activo: r.activo,
      });
      this.form.get('contrasena')?.clearValidators();
    } else {
      this.form.get('contrasena')?.setValidators(Validators.required);
    }
    this.form.get('contrasena')?.updateValueAndValidity();
  }

  cancel(): void {
    this.dialogRef.close(false);
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const uid = this.audit.usuarioId();
    if (!uid) {
      this.snack.open('Seleccione usuario de auditoría en la barra superior.', 'OK');
      return;
    }
    const v = this.form.getRawValue();

    if (this.data.mode === 'create') {
      this.svc
        .create({
          nombre: v.nombre,
          nombre_usuario: v.nombre_usuario,
          email: v.email,
          contrasena: v.contrasena,
          rol: v.rol,
          activo: v.activo,
        })
        .subscribe({
          next: () => this.dialogRef.close(true),
          error: (err: HttpErrorResponse) =>
            this.snack.open(this.msg(err), 'Cerrar', { duration: 6000 }),
        });
      return;
    }

    this.svc
      .update(this.data.row!.id_usuario, {
        nombre: v.nombre,
        nombre_usuario: v.nombre_usuario,
        email: v.email,
        rol: v.rol,
        activo: v.activo,
        contrasena: null,
      })
      .subscribe({
        next: () => this.dialogRef.close(true),
        error: (err: HttpErrorResponse) =>
          this.snack.open(this.msg(err), 'Cerrar', { duration: 6000 }),
      });
  }

  private msg(err: HttpErrorResponse): string {
    const d = err.error?.detail;
    if (typeof d === 'string') return d;
    if (Array.isArray(d)) return d.map((x) => x.msg ?? JSON.stringify(x)).join('; ');
    return err.message;
  }
}