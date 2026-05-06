import { HttpErrorResponse } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  inject,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavContainer, MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { AuditContextService } from '../../core/audit-context.service';
import { UsuarioService } from '../../core/services/usuario.service';
import { UsuarioResponse } from '../../models/api.models';

const SIDEBAR_KEY = 'shell_sidebar_collapsed';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTooltipModule,
  ],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
})
export class MainLayoutComponent implements OnInit, AfterViewInit {

  private readonly usuarioService = inject(UsuarioService);
  private readonly router = inject(Router);
  private readonly snack = inject(MatSnackBar);

  readonly audit = inject(AuditContextService);

  @ViewChild('sidenavShell') private sidenavShell?: MatSidenavContainer;

  readonly usuarios = signal<UsuarioResponse[]>([]);

  readonly usuarioActual = signal<UsuarioResponse | null>(
  JSON.parse(localStorage.getItem('user') ?? 'null')
);

  readonly sidebarCollapsed = signal(
    localStorage.getItem(SIDEBAR_KEY) === '1'
  );

  // 🔥 MENÚ ADAPTADO A TU ESCUELA
  readonly nav = [
 
  { path: 'usuarios',      label: 'Usuarios',       icon: 'people' },
  { path: 'estudiantes',   label: 'Estudiantes',     icon: 'school' },
  { path: 'profesores',    label: 'Profesores',      icon: 'person' },
  { path: 'directores',    label: 'Directores',      icon: 'manage_accounts' },
  { path: 'departamentos', label: 'Departamentos',   icon: 'business' },
  { path: 'cursos',        label: 'Cursos',          icon: 'menu_book' },
  { path: 'grados',        label: 'Grados',          icon: 'grade' },
  { path: 'aulas',         label: 'Aulas',           icon: 'meeting_room' },
  { path: 'horarios',      label: 'Horarios',        icon: 'schedule' },
  { path: 'asistencias',   label: 'Asistencia',      icon: 'fact_check' },
  { path: 'calificaciones',label: 'Calificaciones',  icon: 'bar_chart' },

  ];

  ngOnInit(): void {
    this.usuarioService.list().subscribe({
      next: (rows) => this.usuarios.set(rows),
      error: (err: HttpErrorResponse) =>
        this.snack.open('Error cargando usuarios', 'Cerrar', { duration: 4000 }),
    });
  }

  ngAfterViewInit(): void {
    this.sync();
  }

  private sync(): void {
    this.sidenavShell?.updateContentMargins();
  }

  toggleSidebar(): void {
    const next = !this.sidebarCollapsed();
    this.sidebarCollapsed.set(next);
    localStorage.setItem(SIDEBAR_KEY, next ? '1' : '0');

    setTimeout(() => this.sync(), 100);
  }

  onUsuarioAudit(id: string): void {
    this.audit.select(id);
  }

  logout(): void {
    localStorage.removeItem('auth');
    localStorage.removeItem('user');
    this.audit.clear();

    this.router.navigate(['/login']);
  }
}