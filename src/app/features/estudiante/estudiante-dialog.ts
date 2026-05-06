import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { AuditContextService } from '../../core/audit-context.service';
import { EstudianteService } from '../../core/services/estudiante.service';
import { EstudianteResponse } from '../../models/api.models';

export interface EstudianteDialogData {
  mode: 'create' | 'edit';
  row?: EstudianteResponse;
}

@Component({
  selector: 'app-estudiante-dialog',
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
  ],
  templateUrl: './estudiante-dialog.html',
})
export class EstudianteDialogComponent {
  private readonly fb = inject(FormBuilder);
  private readonly svc = inject(EstudianteService);
  private readonly audit = inject(AuditContextService);
  private readonly dialogRef = inject(MatDialogRef<EstudianteDialogComponent, boolean>);
  private readonly snack = inject(MatSnackBar);

  readonly data = inject<EstudianteDialogData>(MAT_DIALOG_DATA);

  readonly form = this.fb.nonNullable.group({
    id_usuario: ['', Validators.required],
    id_grado: ['', Validators.required],
    fecha_nacimiento: [''],
    direccion: [''],
    telefono: [''],
  });

  constructor() {
    if (this.data.mode === 'edit' && this.data.row) {
      const r = this.data.row;
      this.form.patchValue({
        id_grado: r.id_grado ?? '',
        fecha_nacimiento: r.fecha_nacimiento ?? '',
        direccion: r.direccion ?? '',
        telefono: r.telefono ?? '',
      });
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
          id_grado: v.id_grado,
          fecha_nacimiento: v.fecha_nacimiento || null,
          direccion: v.direccion || null,
          telefono: v.telefono || null,
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
      .update(this.data.row!.id_estudiante, {
        id_grado: v.id_grado || null,
        fecha_nacimiento: v.fecha_nacimiento || null,
        direccion: v.direccion || null,
        telefono: v.telefono || null,
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