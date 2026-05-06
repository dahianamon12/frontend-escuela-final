import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { filter } from 'rxjs/operators';

import { EstudianteService } from '../../core/services/estudiante.service';
import { EstudianteResponse } from '../../models/api.models';
import { EstudianteDialogComponent, EstudianteDialogData } from './estudiante-dialog';

@Component({
  selector: 'app-estudiante-list',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
  ],
  templateUrl: './estudiante-list.html',
  styleUrl: './estudiante-list.scss',
})
export class EstudianteListComponent implements AfterViewInit {
  private readonly svc = inject(EstudianteService);
  private readonly dialog = inject(MatDialog);
  private readonly snack = inject(MatSnackBar);

  readonly displayedColumns = [
    'id_estudiante',
    'id_grado',
    'fecha_nacimiento',
    'direccion',
    'telefono',
    'acciones',
  ];
  readonly dataSource = new MatTableDataSource<EstudianteResponse>([]);
  loading = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  constructor() {
    this.reload();
  }

  reload(): void {
    this.loading = true;
    this.svc.list().subscribe({
      next: (rows) => {
        this.dataSource.data = rows;
        this.loading = false;
      },
      error: (err: HttpErrorResponse) => {
        this.loading = false;
        this.snack.open(this.msg(err), 'Cerrar', { duration: 6000 });
      },
    });
  }

  nuevo(): void {
    this.open({ mode: 'create' });
  }

  editar(row: EstudianteResponse): void {
    this.open({ mode: 'edit', row });
  }

  private open(data: EstudianteDialogData): void {
    this.dialog
      .open(EstudianteDialogComponent, { width: '480px', data })
      .afterClosed()
      .pipe(filter(Boolean))
      .subscribe(() => this.reload());
  }

  eliminar(row: EstudianteResponse): void {
    if (!confirm(`¿Eliminar estudiante ${row.id_estudiante}?`)) return;
    this.svc.delete(row.id_estudiante).subscribe({
      next: () => {
        this.snack.open('Estudiante eliminado', 'OK', { duration: 3000 });
        this.reload();
      },
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