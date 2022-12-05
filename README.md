
# Musical Bands Finder 

Proyecto desarrollado como prueba tecnica para yapo, este cuenta con 2 partes (frontend y backend), siendo esta el entregable de backend, construido con NestJs (node).


### Dependencias
<sub>Las siguientes dependencias fueron utilizadas en este proyecto</sub>
```
Nest CLI: 14.0.7
Node: 14.17.6
Package Manager: npm 6.14.15
OS: darwin x64
```

### Levantar Proyecto
**Clonar repositorio desde github**
```
git clone https://github.com/alfonso-pareja/node-backend-yapo.git
cd angular-frontend-yapo
```

**Instalar componentes**
```
npm install
```

**Iniciar proyecto**
```
npm start
```
El servidor se levantara en el puerto 3000, exponiendo las siguientes apis en localhost.

**<sub>Busca las canciones de un artista</sub>**
```
GET http://localhost:3000/api/search_tracks?term={nombre_banda}&limit={maximos_resultados}&media={tipo_media}
```
**<sub>Agrega a favoritos una cancion</sub>**
```
POST http://localhost:3000/api/favorites
Body
  {
    "nombre_banda": "Pearl Jam",
    "cancion_id": 158049842,
    "usuario": "Alfonso",
    "ranking": "5/5"
  }
```

**<sub>Obtiene los favoritos</sub>**
```
GET http://localhost:3000/api/favorites
```

### Postman
En la raiz del proyecto se encontrara una carpeta llamada "postman" que contiene una coleccion de postman para sus pruebas. 
Ademas se adjunta la documentacion de las api publicada
[NestBackend - API](https://documenter.getpostman.com/view/3565207/2s8YzMZ6Qg)


### Pruebas 
**<sub>Ejecutar pruebas</sub>**
```
npm run test
```
![pruebas](/images/testservice.png)


```
npm run test:e2e
```
![pruebas](/images/teste2e.png)





**Proyecto iniciado**

![console](/images/start.png)




