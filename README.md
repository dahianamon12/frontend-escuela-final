🎓 Sistema de Gestión Escolar 

Es una aplicación web full-stack diseñada para centralizar y optimizar la gestión académica y administrativa de una institución educativa.

El sistema permite administrar estudiantes, profesores, cursos, calificaciones, asistencia, horarios y demás procesos escolares desde una plataforma moderna, intuitiva y escalable.

🚀 Vista General

El proyecto está construido bajo una arquitectura cliente-servidor, un frontend para ofrecer una experiencia de usuario dinámica, organizada y eficiente.

Frontend desarrollado con:

Angular 17+
TypeScript
Angular Material
RxJS
SCSS (Sass)
Backend

Construido con:

FastAPI
Python
PostgreSQL (Neon)
🛠️ Tecnologías Utilizadas
🎨 Frontend
Angular 17+
TypeScript
Angular Material
RxJS
SCSS
⚙️ Backend
FastAPI
Python
PostgreSQL
Neon Database

✨ Funcionalidades Principales:

✔️ Gestión de estudiantes
✔️ Administración de profesores
✔️ Control de cursos
✔️ Registro de calificaciones
✔️ Control de asistencia
✔️ Gestión de horarios
✔️ Administración de usuarios
✔️ Organización por departamentos y grados


📂 Estructura Frontend
src/
│
├── app/
│   │
│   ├── core/
│   │   ├── services/
│   │   ├── audit-context.service.ts
│   │   └── audit-user.guard.ts
│   │
│   ├── features/
│   │   ├── asistencia/
│   │   ├── aula/
│   │   ├── calificacion/
│   │   ├── curso/
│   │   ├── departamento/
│   │   ├── director/
│   │   ├── estudiante/
│   │   ├── grado/
│   │   ├── horario/
│   │   ├── profesor/
│   │   └── usuario/
│   │
│   ├── models/
│   │   └── api.models.ts
│   │
│   ├── app.config.ts
│   ├── app.html
│   ├── app.routes.ts
│   ├── app.scss
│   ├── app.spec.ts
│   └── app.ts
│
├── environments/
│   ├── environment.ts
│   └── environment.prod.ts
│
├── index.html
├── main.ts
├── styles.scss
│
├── .editorconfig
├── .gitignore
├── angular.json
├── package.json
├── package-lock.json
├── README.md
├── tsconfig.app.json
├── tsconfig.json
└── tsconfig.spec.json

## 🚀 Ejecución

```bash
npm install
npm start
```

🤝 Integrantes del Proyecto

## ✒️ Autoras

- Dahiana Montañez  
  https://github.com/dahianamon12  

- Isabela González  
  https://github.com/isagonzaleze17-cpu 

🔗 Enlace video

👉 https://correoitmedu-my.sharepoint.com/:v:/g/personal/dahianamontanez1129260_correo_itm_edu_co/IQD37YCnffBdQrgoR1KyCd0ZAcr-pI4hH9_ybla0WPzKP50?e=bw1rtj&nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJTdHJlYW1XZWJBcHAiLCJyZWZlcnJhbE1vZGUiOiJtaXMiLCJyZWZlcnJhbFZpZXciOiJwb3N0cm9sbC1jb3B5bGluayIsInJlZmVycmFsUGxheWJhY2tTZXNzaW9uSWQiOiI3N2UyMmJjNC05OTNhLTQyMWEtYjIwMC03ZGU1MmFmMDUwMDgifX0%3D