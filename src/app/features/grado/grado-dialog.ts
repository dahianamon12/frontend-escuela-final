import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { AuditContextService } from '../../core/audit-context.service';
import { GradoService } from '../../core/services/grado.service';
import { GradoRead } from '../../models/api.models';

export interface GradoDialogData {
  mode: 'create' | 'edit';
  row?: GradoRead;
}

@Component({
  selector: 'app-grado-dialog',
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatSnackBarModule,
  ],
  templateUrl: './grado-dialog.html',
})
export class GradoDialogComponent {
  private readonly fb = inject(FormBuilder);
  private readonly svc = inject(GradoService);
  private readonly audit = inject(AuditContextService);
  private readonly dialogRef = inject(MatDialogRef<GradoDialogComponent, boolean>);
  private readonly snack = inject(MatSnackBar);

  readonly data = inject<GradoDialogData>(MAT_DIALOG_DATA);

  readonly form = this.fb.nonNullable.group({
    nombre: ['', Validators.required],
    nivel: [''],
    seccion: [''],
    anio_escolar: [''],
    estado: [true],
  });

  constructor() {
    if (this.data.mode === 'edit' && this.data.row) {
      const r = this.data.row;
      this.form.patchValue({
        nombre: r.nombre,
        nivel: r.nivel ?? '',
        seccion: r.seccion ?? '',
        anio_escolar: r.anio_escolar ?? '',
        estado: r.estado,
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
          nombre: v.nombre,
          nivel: v.nivel || null,
          seccion: v.seccion || null,
          anio_escolar: v.anio_escolar || null,
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
      .update(this.data.row!.id_grado, {
        nombre: v.nombre,
        nivel: v.nivel || null,
        seccion: v.seccion || null,
        anio_escolar: v.anio_escolar || null,
        estado: v.estado,
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
