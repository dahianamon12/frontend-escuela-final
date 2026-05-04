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
import { CursoService } from '../../core/services/curso.service';
import { CursoRead } from '../../models/api.models';

export interface CursoDialogData {
  mode: 'create' | 'edit';
  row?: CursoRead;
}

@Component({
  selector: 'app-curso-dialog',
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
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
    nombre: ['', Validators.required],
    codigo: ['', Validators.required],
    descripcion: [''],
    creditos: [0, Validators.min(0)],
    estado: [true],
  });

  constructor() {
    if (this.data.mode === 'edit' && this.data.row) {
      const r = this.data.row;
      this.form.patchValue({
        nombre: r.nombre,
        codigo: r.codigo,
        descripcion: r.descripcion ?? '',
        creditos: r.creditos ?? 0,
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
          codigo: v.codigo,
          descripcion: v.descripcion || null,
          creditos: v.creditos,
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
      .update(this.data.row!.id_curso, {
        nombre: v.nombre,
        codigo: v.codigo,
        descripcion: v.descripcion || null,
        creditos: v.creditos,
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
