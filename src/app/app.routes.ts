import { Routes } from '@angular/router';

import { auditUserGuard } from './core/audit-user.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
 {
  path: 'login',
  loadComponent: () =>
    import('./features/login/login').then((m) => m.LoginComponent),
},
  {
  path: 'app',
  canActivate: [auditUserGuard],
  loadComponent: () =>
    import('./features/shell/main-layout').then((m) => m.MainLayoutComponent),
  children: [
      { path: '', redirectTo: 'usuarios', pathMatch: 'full' },
      {
        path: 'usuarios',
        loadComponent: () =>
          import('./features/usuario/usuario-list').then((m) => m.UsuarioListComponent),
      },
      {
        path: 'profesores',
        loadComponent: () =>
          import('./features/profesor/profesor-list').then((m) => m.ProfesorListComponent),
      },
      {
        path: 'grados',
        loadComponent: () =>
          import('./features/grado/grado-list').then((m) => m.GradoListComponent),
      },
      {
        path: 'estudiantes',
        loadComponent: () =>
          import('./features/estudiante/estudiante-list').then((m) => m.EstudianteListComponent),
      },
      {
        path: 'directores',
        loadComponent: () =>
          import('./features/director/director-list').then((m) => m.DirectorListComponent),
      },
      {
        path: 'departamentos',
        loadComponent: () =>
          import('./features/departamento/departamento-list').then((m) => m.DepartamentoListComponent),
      },
      {
        path: 'cursos',
        loadComponent: () =>
          import('./features/curso/curso-list').then((m) => m.CursoListComponent),
      },
      {
        path: 'calificaciones',
        loadComponent: () =>
          import('./features/calificacion/calificacion-list').then((m) => m.CalificacionListComponent),
      },
      {
        path: 'aulas',
        loadComponent: () =>
          import('./features/aula/aula-list').then((m) => m.AulaListComponent),
      },
      {
        path: 'asistencias',
        loadComponent: () =>
          import('./features/asistencia/asistencia-list').then((m) => m.AsistenciaListComponent),
      },
      {
        path: 'horarios',
        loadComponent: () =>
          import('./features/horario/horario-list').then((m) => m.HorarioListComponent),
      },
    ],
  },
  { path: '**', redirectTo: 'login' },
];