🚀 Back-End JS (Node.js + Express + Sequelize)

Este backend fue desarrollado con Node.js, Express y Sequelize. Utiliza MySQL como base de datos y está diseñado para ejecutarse tanto localmente (vía Docker) como en producción (Railway).

📦 Requisitos

Node.js >= 18

Docker (para entorno local)

Railway CLI (opcional para despliegue)

🛠 Instalación local

git clone https://github.com/moises3323/autoapp-backend.git
cd autoapp-backend
yarn install

🔐 Variables de entorno

Crea un archivo .env o usa directamente variables clásicas de entorno:

PORT=4000
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_DATABASE=autoapp
MYSQL_USERNAME=root
MYSQL_PASSWORD=root

🧪 Modo desarrollo (usando Docker)

docker-compose up

Esto ejecutará tanto el backend como MySQL localmente en http://localhost:4000

📜 Scripts disponibles

yarn dev      # Ejecuta con nodemon
yarn build    # Compila y minifica con Babel + Gulp
yarn start    # Ejecuta la versión compilada

🚀 Despliegue en Railway

Crea un proyecto en Railway

Conecta tu repositorio de GitHub

Agrega las siguientes variables en "Variables de entorno":

MYSQL_HOST
MYSQL_PORT
MYSQL_DATABASE
MYSQL_USERNAME
MYSQL_PASSWORD
PORT=4000

💡 Railway detectará automáticamente que necesitas una instancia de MySQL si agregas el plugin correspondiente.

✅ ¡Listo!

Ahora puedes acceder al backend desplegado desde Railway y consumir sus endpoints desde tu app Flutter o Postman.

Autor: Moisés Santos — 2025
