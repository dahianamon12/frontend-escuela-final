import { Routes } from '@angular/router';

import { auditUserGuard } from './core/audit-user.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () => import('./features/login/login').then((m) => m.LoginComponent),
  },
  {
    path: 'app',
    canActivate: [auditUserGuard],
    loadComponent: () => import('./features/shell/main-layout').then((m) => m.MainLayoutComponent),
    children: [
      { path: '', redirectTo: 'usuarios', pathMatch: 'full' },
      {
        path: 'usuarios',
        loadComponent: () =>
          import('./features/usuarios/usuario-list').then((m) => m.UsuarioListComponent),
      },
      {
        path: 'profesores',
        loadComponent: () =>
          import('./features/profesores/profesor-list').then((m) => m.ProfesorListComponent),
      },
      {
        path: 'grados',
        loadComponent: () =>
          import('./features/grados/grado-list').then((m) => m.GradoListComponent),
      },
      {
        path: 'estudiantes',
        loadComponent: () =>
          import('./features/estudiantes/estudiante-list').then((m) => m.EstudianteListComponent),
      },
      {
        path: 'directores',
        loadComponent: () =>
          import('./features/directores/director-list').then((m) => m.DirectorListComponent),
      },
      {
        path: 'departamentos',
        loadComponent: () =>
          import('./features/departamentos/departamento-list').then((m) => m.DepartamentoListComponent),
      },
      {
        path: 'cursos',
        loadComponent: () =>
          import('./features/cursos/curso-list').then((m) => m.CursoListComponent),
      },
      {
        path: 'calificaciones',
        loadComponent: () =>
          import('./features/calificaciones/calificacion-list').then((m) => m.CalificacionListComponent),
      },
      {
        path: 'aulas',
        loadComponent: () =>
          import('./features/aulas/aula-list').then((m) => m.AulaListComponent),
      },
      {
        path: 'asistencias',
        loadComponent: () =>
          import('./features/asistencias/asistencia-list').then((m) => m.AsistenciaListComponent),
      },
      {
        path: 'horarios',
        loadComponent: () =>
          import('./features/horarios/horario-list').then((m) => m.HorarioListComponent),
      },
    ],
  },
  { path: '**', redirectTo: 'login' },
];