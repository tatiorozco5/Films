# Films

## Descripción

*Films* es una aplicación web diseñada para la gestión y transmisión de películas en línea. La plataforma está orientada a administradores, quienes pueden agregar, editar y organizar contenido multimedia como películas y series de manera eficiente. Films cuenta con módulos clave para la administración de géneros, directores, productoras y tipos multimedia, todo bajo una arquitectura monolítica con un frontend en React y un backend en Node.js.

## Características

- *Gestión de películas y series:* Permite la administración completa de contenido multimedia, incluyendo agregar, editar y eliminar películas y series.
- *Administración de géneros:* Gestión de géneros de películas y series, con la capacidad de agregar, editar y eliminar géneros.
- *Gestión de directores:* Facilita la administración de directores de películas y series, permitiendo asignar un director principal a cada producción.
- *Administración de productoras:* Permite gestionar las productoras de películas y series, con opciones para agregar y editar productoras.
- *Definición de tipos multimedia:* Gestión de tipos de contenido (película, serie, etc.), con la posibilidad de añadir nuevos tipos.
- *Interfaz amigable:* Ofrece una experiencia de usuario intuitiva para la administración de contenido multimedia.
- *Integración con MongoDB:* Utiliza MongoDB para el almacenamiento eficiente de datos relacionados con películas, series, géneros, directores y productoras.
- *Arquitectura monolítica:* Implementada con un frontend en React y un backend en Node.js, siguiendo una arquitectura SOA.

## Tecnologías Utilizadas

- *Frontend:* React, HTML, CSS, JavaScript.
- *Backend:* Node.js, Express, MongoDB, Mongoose.
- *Arquitectura:* SOA (Arquitectura Orientada a Servicios).
- *Despliegue:* (Especificar si es en Azure, Heroku, o cualquier otro servicio).

## Estructura del Proyecto

```bash
backend/
├── src/
│   ├── models/
│   ├── services/
│   ├── routes/
│   ├── config/
│   └── index.js
frontend/
├── src/
│   ├── components/
│   ├── pages/
│   └── App.js
.env.example
README.md 