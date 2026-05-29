# 🎓 Sistema de Gestión Escolar

Es una aplicación web full-stack diseñada para centralizar y optimizar la gestión académica y administrativa de una institución educativa.

El sistema permite administrar estudiantes, profesores, cursos, calificaciones, asistencia, horarios y usuarios desde una plataforma moderna, intuitiva y escalable.

---

# 🚀 Vista General

El proyecto fue desarrollado bajo una arquitectura cliente-servidor, separando el frontend y backend para garantizar escalabilidad, mantenimiento y una mejor experiencia de usuario.

La aplicación permite gestionar procesos académicos de forma eficiente mediante módulos organizados e integrados.

Actualmente el sistema se encuentra desplegado en la nube, permitiendo acceso remoto sin necesidad de ejecución en localhost.

---

# 🛠️ Tecnologías Utilizadas

## 🎨 Frontend

Desarrollado con:

* Angular 17+
* TypeScript
* Angular Material
* RxJS
* SCSS (Sass)
* Firebase Hosting

---

## ⚙️ Backend

Construido con:

* FastAPI
* Python
* PostgreSQL
* Neon Database
* Render

---

# ✨ Funcionalidades Principales

✔️ Gestión de estudiantes
✔️ Administración de profesores
✔️ Control de cursos
✔️ Registro de calificaciones
✔️ Control de asistencia
✔️ Gestión de horarios
✔️ Administración de usuarios
✔️ Organización por departamentos y grados
✔️ Sistema de autenticación
✔️ Consumo de API REST
✔️ Despliegue en la nube

---

# 🌐 Arquitectura del Proyecto

El sistema está dividido en dos componentes principales:

## Frontend

El frontend fue desarrollado en Angular y se encarga de toda la interacción visual con el usuario. Desde esta capa se gestionan formularios, vistas, navegación y consumo de servicios API.

La interfaz fue diseñada utilizando Angular Material para proporcionar una experiencia moderna, responsive e intuitiva.

El despliegue del frontend fue realizado mediante Firebase Hosting, permitiendo acceso rápido, seguro y estable desde la web.

---

## Backend

El backend fue desarrollado con FastAPI, encargado de procesar la lógica del sistema, manejar solicitudes HTTP y administrar la comunicación con la base de datos.

La API REST permite gestionar toda la información académica y administrativa del sistema.

El backend fue desplegado en Render para garantizar disponibilidad en la nube y conexión permanente con la base de datos PostgreSQL alojada en Neon.

---

# 🚀 Despliegue del Proyecto

## Frontend Deploy

El frontend fue publicado utilizando Firebase Hosting, lo que permitió:

* Hosting seguro en la nube
* Despliegue rápido
* Acceso remoto desde navegador
* Integración continua con Angular

---

## Backend Deploy

El backend fue desplegado en Render, permitiendo:

* Ejecución continua de la API
* Acceso remoto a endpoints
* Escalabilidad del servicio
* Integración con Neon Database


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

---

# ⚙️ Base de Datos

La base de datos utilizada es PostgreSQL, alojada en Neon Database.

Esta base de datos permite almacenar y gestionar información relacionada con:

* Estudiantes
* Profesores
* Cursos
* Horarios
* Asistencia
* Calificaciones
* Usuarios
* Departamentos
* Grados

---

# 🚀 Ejecución del Proyecto

## Instalación de dependencias

```bash
npm install
```

---

## Ejecución del Frontend

```bash
ng serve
```

---

## Ejecución del Backend

```bash
uvicorn main:app --reload
```

---

# 📚 Objetivo del Proyecto

Desarrollar una plataforma web moderna que permita mejorar la gestión académica y administrativa de instituciones educativas mediante herramientas digitales eficientes, organizadas y escalables.

# Puertos 
https://escuela-final.web.app/
https://escuela-final.firebaseapp.com/

🤝 Integrantes del Proyecto

## ✒️ Autoras

- Dahiana Montañez  
  https://github.com/dahianamon12  

- Isabela González  
  https://github.com/isagonzaleze17-cpu 

🔗 Enlace video

👉 https://correoitmedu-my.sharepoint.com/:v:/g/personal/dahianamontanez1129260_correo_itm_edu_co/IQAvkcgnK_mdRYRfrEhEQDz-AZdkBgTlUF8x2Sbfu9SX0dY?nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJPbmVEcml2ZUZvckJ1c2luZXNzIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXciLCJyZWZlcnJhbFZpZXciOiJNeUZpbGVzTGlua0NvcHkifX0&e=36IMne