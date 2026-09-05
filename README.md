# StreamPeru — Backend base (Caso 6, Grupo 6)

Base de software mínima para el Caso 6 del Anexo TA1. Incluye el catálogo de streaming y un endpoint simulado de invalidación de caché de CDN, ya implementados y con pruebas que pasan. El grupo no necesita programar la aplicación: su entregable es el pipeline CI/CD.

## Qué incluye

- `src/app.js`: catálogo (`GET /catalog`, `GET /catalog/:id`) y `POST /internal/cache/invalidate` que simula la invalidación de caché del CDN tras un despliegue.
- `test/app.test.js`: pruebas automatizadas de los endpoints principales.

## Cómo correrlo localmente

```bash
npm install
npm test
npm start
```

## Qué debe hacer el grupo

Diseñar un pipeline con despliegue de mínima indisponibilidad (blue-green o rolling, simulado), que incluya un paso explícito que llame a `/internal/cache/invalidate` (o lo simule) como parte del despliegue, según la guía del Caso 6 del Anexo TA1.
