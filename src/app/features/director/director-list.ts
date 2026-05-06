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

import { DirectorService } from '../../core/services/director.service';
import { DirectorResponse } from '../../models/api.models';
import { DirectorDialogComponent, DirectorDialogData } from './director-dialog';

@Component({
  selector: 'app-director-list',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
  ],
  templateUrl: './director-list.html',
  styleUrl: './director-list.scss',
})
export class DirectorListComponent implements AfterViewInit {
  private readonly svc = inject(DirectorService);
  private readonly dialog = inject(MatDialog);
  private readonly snack = inject(MatSnackBar);

  readonly displayedColumns = [
    'id_director',
    'id_departamento',
    'telefono',
    'acciones',
  ];
  readonly dataSource = new MatTableDataSource<DirectorResponse>([]);
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

  editar(row: DirectorResponse): void {
    this.open({ mode: 'edit', row });
  }

  private open(data: DirectorDialogData): void {
    this.dialog
      .open(DirectorDialogComponent, { width: '480px', data })
      .afterClosed()
      .pipe(filter(Boolean))
      .subscribe(() => this.reload());
  }

  eliminar(row: DirectorResponse): void {
    if (!confirm(`¿Eliminar director ${row.id_director}?`)) return;
    this.svc.delete(row.id_director).subscribe({
      next: () => {
        this.snack.open('Director eliminado', 'OK', { duration: 3000 });
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