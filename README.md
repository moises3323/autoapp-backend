# Back-End JS
Backend (Node.js + Express + Sequelize)

Este backend fue desarrollado con Node.js, Express y Sequelize. Utiliza MySQL como base de datos y está diseñado para ejecutarse tanto localmente en Docker como en Railway (producción).

Requisitos

Node.js >= 18

Docker (para entorno local)

Railway CLI (opcional para despliegue)

Instalación local

git clone https://github.com/moises3323/autoapp-backend.git
cd autoapp-backend
yarn install

Variables de entorno

Usa un archivo env.yaml para configurar variables por entorno. Debes convertirlo a variables de entorno clásicas o asegurarte de definirlas directamente:

PORT=4000
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_DATABASE=autoapp
MYSQL_USERNAME=root
MYSQL_PASSWORD=root

Modo desarrollo (usando Docker)

docker-compose up

Esto ejecuta tanto la base de datos MySQL como el backend localmente en el puerto 4000.

Scripts disponibles

yarn dev     # Ejecuta con nodemon
yarn build   # Compila y minifica código con Babel + Gulp
yarn start   # Ejecuta backend compilado

Despliegue en Railway

Crea el proyecto en Railway

Conecta tu repositorio de GitHub

Agrega las siguientes variables:

MYSQL_HOST

MYSQL_PORT

MYSQL_DATABASE

MYSQL_USERNAME

MYSQL_PASSWORD

PORT=4000

Railway creará automáticamente una instancia de MySQL si lo agregas como plugin
