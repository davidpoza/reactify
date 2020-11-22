# Plantilla para la Práctica final

En esta plantilla encontrarás todo lo necesario para realizar la práctica final. La aplicación de React ha sido generada utilizando [create-react-app](https://github.com/facebook/create-react-app). Esto te servirá como comienzo en el desarrollo, aunque tendrás que desarrollar tu propia configuración cuando llegues al apartado 8.

A parte de la aplicación de React, esta plantilla incluye un servidor basadon en [json-server](https://github.com/typicode/json-server) al que puedes hacer peticiones. Este incluye dos tipos de recursos:

* Álbums (albums)
* Canciones (songs)

Puedes ver los distintos parámetros en el fichero `./server/data.json`. A priori, no te hará falta modificar ese fichero, pero siempre puedes agregar nuevos elementos si quieres extender las funcionalidades de tu aplicación.

## Iniciar el proyecto

El proyecto se inicia directamente con `yarn start`.

Este comando hace uso de `npm-run-all` que ejecuta el servidor y el cliente al mismo tiempo. El servidor estará escuchando en el puerto 3001 y la aplicación en el 3000. No obstante, la aplicación ya viene preconfigurada con un proxy que redirige cualquier llamada al servidor. Por ejemplo:

```/albums -> http://localhost:3001/albums```

## Dudas

Cualquier duda que tengáis sobre la plantilla o el proyecto la podéis resolver en los foros. Estaré encantado de ayudarte a completar la práctica.

## Créditos

* Fotografía de la carátula de los álbums por [James Owen](https://unsplash.com/photos/c-NBiJrhwdM)
* Audio compuesto por [Kevin MacLeod](https://twitter.com/kmacleod)
