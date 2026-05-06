import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { AuditContextService } from '../../core/audit-context.service';
import { AulaService } from '../../core/services/aula.service';
import { AulaResponse } from '../../models/api.models';

export interface AulaDialogData {
  mode: 'create' | 'edit';
  row?: AulaResponse;
}

@Component({
  selector: 'app-aula-dialog',
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
  ],
  templateUrl: './aula-dialog.html',
})
export class AulaDialogComponent {
  private readonly fb = inject(FormBuilder);
  private readonly svc = inject(AulaService);
  private readonly audit = inject(AuditContextService);
  private readonly dialogRef = inject(MatDialogRef<AulaDialogComponent, boolean>);
  private readonly snack = inject(MatSnackBar);

  readonly data = inject<AulaDialogData>(MAT_DIALOG_DATA);

  readonly form = this.fb.nonNullable.group({
    numero_aula: ['', Validators.required],
    capacidad: ['', Validators.required],
    edificio: [''],
  });

  constructor() {
    if (this.data.mode === 'edit' && this.data.row) {
      const r = this.data.row;
      this.form.patchValue({
        numero_aula: r.numero_aula,
        capacidad: r.capacidad ?? '',
        edificio: r.edificio ?? '',
      });
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
          numero_aula: v.numero_aula,
          capacidad: v.capacidad,
          edificio: v.edificio,
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
      .update(this.data.row!.id_aula, {
        numero_aula: v.numero_aula || null,
        capacidad: v.capacidad || null,
        edificio: v.edificio || null,
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