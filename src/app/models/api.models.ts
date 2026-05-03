/** Contratos alineados con `src/api/*.py` del backend FastAPI. */
export interface UsuarioCreate {
    nombre: string;
    email: string;
    nombre_usuario: string;
    contrasena: string;
    rol: string;
    activo: boolean;
}

export interface UsuarioUpdate {
    nombre: string | null;
    email: string | null;
    nombre_usuario: string | null;
    contrasena: string | null;
    rol: string | null;
    activo: boolean | null;
}

export interface UsuarioResponse {
    id_usuario: string;
    nombre: string;
    email: string;
    nombre_usuario: string;
    rol: string;
    activo: boolean;
}

export interface ProfesorCreate {
    id_usuario: string;
    id_departamento: string;
    especialidad: string;
    id_usuario_creacion: string;
}

export interface ProfesorUpdate {
    id_departamento: string | null;
    especialidad: string | null;
    id_usuario_edita: string;
}

export interface ProfesorResponse {
    id_profesor: string;
    id_departamento: string | null;
    especialidad: string | null;
}

export interface HorarioCreate {
    dia: string;
    hora_inicio: string;
    hora_fin: string;
    id_curso: string;
    id_usuario_creacion: string;
}

export interface HorarioUpdate {
    dia: string | null;
    hora_inicio: string | null;
    hora_fin: string | null;
    id_curso: string | null;
    id_usuario_edita: string;
}

export interface HorarioResponse {
    id_horario: string;
    dia: string | null;
    hora_inicio: string | null;
    hora_fin: string | null;
    id_curso: string | null;
}

export interface GradoCreate {
    nombre_grado: string;
    nivel: string;
    jornada: string;
    id_usuario_creacion: string;
}

export interface GradoUpdate {
    nombre_grado: string | null;
    nivel: string | null;
    jornada: string | null;
    id_usuario_edita: string;
}

export interface GradoResponse {
    id_grado: string;
    nombre_grado: string;
    nivel: string | null;
    jornada: string | null;
}

export interface EstudianteCreate {
    id_usuario: string;
    id_grado: string;
    direccion: string | null;
    telefono: string | null;
    fecha_nacimiento: string | null;
    id_usuario_creacion: string;
}

export interface EstudianteUpdate {
    id_grado: string | null;
    direccion: string | null;
    telefono: string | null;
    fecha_nacimiento: string | null;
    id_usuario_edita: string;
}

export interface EstudianteResponse {
    id_estudiante: string;
    id_grado: string | null;
    direccion: string | null;
    telefono: string | null;
    fecha_nacimiento: string | null;
}

export interface DirectorCreate {
    id_usuario: string;
    id_departamento: string;
    telefono: string;
    id_usuario_creacion: string;
}

export interface DirectorUpdate {
    id_departamento: string | null;
    telefono: string | null;
    id_usuario_edita: string;
}

export interface DirectorResponse {
    id_director: string;
    id_departamento: string | null;
    telefono: string | null;
}

export interface DepartamentoCreate {
    nombre: string;
    telefono: string;
    oficina: string;
    id_usuario_creacion: string;
}

export interface DepartamentoUpdate {
    nombre: string | null;
    telefono: string | null;
    oficina: string | null;
    id_usuario_edita: string;
}

export interface DepartamentoResponse {
    id_departamento: string;
    nombre: string;
    telefono: string | null;
    oficina: string | null;
}

export interface CursoCreate {
    nombre_curso: string;
    descripcion: string | null;
    horas_semanales: string | null;
    id_profesor: string;
    id_grado: string;
    id_aula: string;
    id_usuario_creacion: string;
}

export interface CursoUpdate {
    nombre_curso: string | null;
    descripcion: string | null;
    horas_semanales: string | null;
    id_profesor: string | null;
    id_grado: string | null;
    id_aula: string | null;
    id_usuario_edita: string;
}

export interface CursoResponse {
    id_curso: string;
    nombre_curso: string;
    descripcion: string | null;
    horas_semanales: string | null;
    id_profesor: string | null;
    id_grado: string | null;
    id_aula: string | null;
}

export interface CalificacionCreate {
    nota: string;
    id_estudiante: string;
    id_curso: string;
    id_usuario_creacion: string;
}

export interface CalificacionUpdate {
    nota: string | null;
    id_usuario_edita: string;
}

export interface CalificacionResponse {
    id_calificacion: string;
    nota: string | null;
    id_estudiante: string | null;
    id_curso: string | null;
}

export interface AulaCreate {
    numero_aula: string;
    capacidad: string;
    edificio: string;
    id_usuario_creacion: string;
}

export interface AulaUpdate {
    numero_aula: string | null;
    capacidad: string | null;
    edificio: string | null;
    id_usuario_edita: string;
}

export interface AulaResponse {
    id_aula: string;
    numero_aula: string;
    capacidad: string | null;
    edificio: string | null;
}

export interface AsistenciaCreate {
    fecha: string;
    estado: string;
    id_estudiante: string;
    id_curso: string;
    id_usuario_creacion: string;
}

export interface AsistenciaUpdate {
    fecha: string | null;
    estado: string | null;
    id_usuario_edita: string;
}

export interface AsistenciaResponse {
    id_asistencia: string;
    fecha: string | null;
    estado: string | null;
    id_estudiante: string | null;
    id_curso: string | null;
}


