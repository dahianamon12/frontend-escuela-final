import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { AuditContextService } from '../../core/audit-context.service';
import { CursoService } from '../../core/services/curso.service';
import { CursoResponse } from '../../models/api.models';

export interface CursoDialogData {
  mode: 'create' | 'edit';
  row?: CursoResponse;
}

@Component({
  selector: 'app-curso-dialog',
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
  ],
  templateUrl: './curso-dialog.html',
})
export class CursoDialogComponent {
  private readonly fb = inject(FormBuilder);
  private readonly svc = inject(CursoService);
  private readonly audit = inject(AuditContextService);
  private readonly dialogRef = inject(MatDialogRef<CursoDialogComponent, boolean>);
  private readonly snack = inject(MatSnackBar);

  readonly data = inject<CursoDialogData>(MAT_DIALOG_DATA);

  readonly form = this.fb.nonNullable.group({
    nombre_curso: ['', Validators.required],
    descripcion: [''],
    horas_semanales: [''],
    id_profesor: ['', Validators.required],
    id_grado: ['', Validators.required],
    id_aula: ['', Validators.required],
  });

  constructor() {
    if (this.data.mode === 'edit' && this.data.row) {
      const r = this.data.row;
      this.form.patchValue({
        nombre_curso: r.nombre_curso,
        descripcion: r.descripcion ?? '',
        horas_semanales: r.horas_semanales ?? '',
        id_profesor: r.id_profesor ?? '',
        id_grado: r.id_grado ?? '',
        id_aula: r.id_aula ?? '',
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
          nombre_curso: v.nombre_curso,
          descripcion: v.descripcion || null,
          horas_semanales: v.horas_semanales || null,
          id_profesor: v.id_profesor,
          id_grado: v.id_grado,
          id_aula: v.id_aula,
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
      .update(this.data.row!.id_curso, {
        nombre_curso: v.nombre_curso || null,
        descripcion: v.descripcion || null,
        horas_semanales: v.horas_semanales || null,
        id_profesor: v.id_profesor || null,
        id_grado: v.id_grado || null,
        id_aula: v.id_aula || null,
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