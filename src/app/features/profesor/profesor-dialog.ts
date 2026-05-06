import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { AuditContextService } from '../../core/audit-context.service';
import { ProfesorService } from '../../core/services/profesor.service';
import { ProfesorResponse } from '../../models/api.models';

export interface ProfesorDialogData {
  mode: 'create' | 'edit';
  row?: ProfesorResponse;
}

@Component({
  selector: 'app-profesor-dialog',
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
  ],
  templateUrl: './profesor-dialog.html',
})
export class ProfesorDialogComponent {
  private readonly fb = inject(FormBuilder);
  private readonly svc = inject(ProfesorService);
  private readonly audit = inject(AuditContextService);
  private readonly dialogRef = inject(MatDialogRef<ProfesorDialogComponent, boolean>);
  private readonly snack = inject(MatSnackBar);

  readonly data = inject<ProfesorDialogData>(MAT_DIALOG_DATA);

  readonly form = this.fb.nonNullable.group({
    id_usuario: ['', Validators.required],
    id_departamento: ['', Validators.required],
    especialidad: ['', Validators.required],
  });

  constructor() {
    if (this.data.mode === 'edit' && this.data.row) {
      const r = this.data.row;
      this.form.patchValue({
        id_departamento: r.id_departamento ?? '',
        especialidad: r.especialidad ?? '',
      });
      // id_usuario no se edita
      this.form.get('id_usuario')?.disable();
    }
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
          id_usuario: v.id_usuario,
          id_departamento: v.id_departamento,
          especialidad: v.especialidad,
          id_usuario_creacion: uid,
        })
        .subscribe({
          next: () => this.dialogRef.close(true),
          error: (err: HttpErrorResponse) =>
            this.snack.open(this.msg(err), 'Cerrar', { duration: 6000 }),
        });
      return;
    }

    this.svc
      .update(this.data.row!.id_profesor, {
        id_departamento: v.id_departamento,
        especialidad: v.especialidad,
        id_usuario_edita: uid,
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