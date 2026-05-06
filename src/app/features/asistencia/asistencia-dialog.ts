import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { AuditContextService } from '../../core/audit-context.service';
import { AsistenciaService } from '../../core/services/asistencia.service';
import { AsistenciaResponse } from '../../models/api.models';

export interface AsistenciaDialogData {
  mode: 'create' | 'edit';
  row?: AsistenciaResponse;
}

@Component({
  selector: 'app-asistencia-dialog',
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
  ],
  templateUrl: './asistencia-dialog.html',
})
export class AsistenciaDialogComponent {
  private readonly fb = inject(FormBuilder);
  private readonly svc = inject(AsistenciaService);
  private readonly audit = inject(AuditContextService);
  private readonly dialogRef = inject(MatDialogRef<AsistenciaDialogComponent, boolean>);
  private readonly snack = inject(MatSnackBar);

  readonly data = inject<AsistenciaDialogData>(MAT_DIALOG_DATA);

  readonly estados = ['PRESENTE', 'AUSENTE', 'TARDANZA', 'JUSTIFICADO'];

  readonly form = this.fb.nonNullable.group({
    fecha: ['', Validators.required],
    id_estudiante: ['', Validators.required],
    id_curso: ['', Validators.required],
    estado: ['PRESENTE', Validators.required],
  });

  constructor() {
    if (this.data.mode === 'edit' && this.data.row) {
      const r = this.data.row;
      this.form.patchValue({
        fecha: r.fecha ?? '',
        id_estudiante: r.id_estudiante ?? '',
        id_curso: r.id_curso ?? '',
        estado: r.estado ?? 'PRESENTE',
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
          fecha: v.fecha,
          id_estudiante: v.id_estudiante,
          id_curso: v.id_curso,
          estado: v.estado,
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
      .update(this.data.row!.id_asistencia, {
        fecha: v.fecha || null,
        estado: v.estado || null,
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