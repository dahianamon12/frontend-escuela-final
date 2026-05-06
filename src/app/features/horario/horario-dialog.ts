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
import { HorarioService } from '../../core/services/horario.service';
import { HorarioResponse } from '../../models/api.models';

export interface HorarioDialogData {
  mode: 'create' | 'edit';
  row?: HorarioResponse;
}

@Component({
  selector: 'app-horario-dialog',
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
  ],
  templateUrl: './horario-dialog.html',
})
export class HorarioDialogComponent {
  private readonly fb = inject(FormBuilder);
  private readonly svc = inject(HorarioService);
  private readonly audit = inject(AuditContextService);
  private readonly dialogRef = inject(MatDialogRef<HorarioDialogComponent, boolean>);
  private readonly snack = inject(MatSnackBar);

  readonly data = inject<HorarioDialogData>(MAT_DIALOG_DATA);

  readonly dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

  readonly form = this.fb.nonNullable.group({
    dia: ['', Validators.required],
    hora_inicio: ['', Validators.required],
    hora_fin: ['', Validators.required],
    id_curso: ['', Validators.required],
  });

  constructor() {
    if (this.data.mode === 'edit' && this.data.row) {
      const r = this.data.row;
      this.form.patchValue({
        dia: r.dia ?? '',
        hora_inicio: r.hora_inicio ?? '',
        hora_fin: r.hora_fin ?? '',
        id_curso: r.id_curso ?? '',
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
          dia: v.dia,
          hora_inicio: v.hora_inicio,
          hora_fin: v.hora_fin,
          id_curso: v.id_curso,
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
      .update(this.data.row!.id_horario, {
        dia: v.dia,
        hora_inicio: v.hora_inicio,
        hora_fin: v.hora_fin,
        id_curso: v.id_curso,
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