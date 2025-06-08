# 🚀 Back-End JS (Node.js + Express + Sequelize)

Este backend fue desarrollado con **Node.js**, **Express** y **Sequelize**. Utiliza **MySQL** como base de datos y está diseñado para ejecutarse tanto localmente con Docker como en producción con Railway.

---

## ✅ Requisitos

- Node.js `>= 18`
- Docker (para entorno local)
- Railway CLI *(opcional para despliegue)*

---

## 🔧 Instalación local

```bash
git clone https://github.com/moises3323/autoapp-backend.git
cd autoapp-backend
yarn install
```

---

## 🔐 Variables de entorno

Puedes usar un archivo `env.yaml` para configurar las variables, o exportarlas directamente así:

```env
PORT=4000
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_DATABASE=autoapp
MYSQL_USERNAME=root
MYSQL_PASSWORD=root
```

---

## 🐳 Modo desarrollo con Docker

```bash
docker-compose up
```

Esto levantará la base de datos MySQL y el backend localmente en el puerto **4000**.

---

## 📜 Scripts disponibles

```bash
yarn dev     # Ejecuta el servidor con nodemon
yarn build   # Compila y minifica el código con Babel + Gulp
yarn start   # Ejecuta el backend compilado
```

---

## ☁️ Despliegue en Railway

1. Crea un nuevo proyecto en Railway
2. Conecta tu repositorio de GitHub
3. Agrega las siguientes variables:

```env
MYSQL_HOST
MYSQL_PORT
MYSQL_DATABASE
MYSQL_USERNAME
MYSQL_PASSWORD
PORT=4000
```

> Railway creará automáticamente una instancia de MySQL si agregas el plugin 🧩.

---

## 📁 Estructura del proyecto

```bash
├── src
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── services/
│   └── app.js
├── server.js
├── env.yaml
├── docker-compose.yml
```

---

## ✨ Créditos

Autor: [Moises Santos](https://github.com/moises3323)
