# Encrypt Lambda Service

Servicio AWS Lambda para encriptación y almacenamiento seguro de mensajes usando DynamoDB.

## 🚀 Características

- Encriptación de mensajes
- Almacenamiento en DynamoDB
- Autenticación por clave secreta
- Despliegue automático con GitHub Actions

## 📋 Prerequisitos

- Node.js 20.x
- AWS Account
- AWS CLI configurado

## 🔧 Instalación

1. Clonar el repositorio:
```bash
git clone <tu-repositorio>
cd encrypt-lambda
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno:
```env
AWS_REGION=
TABLE_NAME=
```

## 🔑 Configuración AWS

1. Crear tabla en DynamoDB:
- Nombre: messages-table
- Partition key: id (String)
- GSI: secretKey-index (secretKey)

2. Configurar rol IAM con permisos:
- DynamoDB (PutItem, Query, Scan)
- CloudWatch Logs

## 📡 Endpoints

### POST /create-message
Crear un nuevo mensaje encriptado.

```json
{
    "message": "Tu mensaje secreto",
    "secretKey": "tu-clave-secreta"
}
```

### GET /my-messages
Obtener mensajes por clave secreta.
Headers requeridos:
- x-secret-key: tu-clave-secreta

### GET /all
Obtener todos los mensajes encriptados.

## 🔄 CI/CD

El proyecto usa GitHub Actions para el despliegue automático:

1. Configurar secretos en GitHub:

2. El despliegue se activa automáticamente con cada push a master.

## 🛠️ Tecnologías

- Node.js
- AWS Lambda
- AWS DynamoDB
- GitHub Actions
- crypto-js

## 📝 Estructura del Proyecto

```
├── config/
│   └── dynamoConfig.js     # Configuración de DynamoDB
├── services/
│   ├── dynamoService.js    # Servicios de DynamoDB
│   ├── encryptService.js   # Servicios de encriptación
│   └── errorResponseService.js # Manejo de errores
├── controllers.js          # Controladores de Lambda
├── index.js               # Punto de entrada Lambda
└── package.json
```

