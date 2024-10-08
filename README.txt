Instrucciones para poner en funcionamiento el proyecto:

Requisitos previos:

Asegúrate de tener Docker Desktop instalado en tu máquina, ya que el proyecto utiliza Docker para la creación del contenedor.
Verifica que tengas instalado Node.js y npm para gestionar las dependencias del proyecto.
Creación del contenedor:

Abre una terminal en la raíz del proyecto y ejecuta el siguiente comando para crear y levantar el contenedor Docker:

bash
Copiar código
docker-compose up --build
Instalación de dependencias:

Una vez que el contenedor esté activo, instala las dependencias necesarias ejecutando el siguiente comando:

bash
Copiar código
npm install
Variables de entorno:

Las variables de entorno ya están incluidas en el proyecto, por lo que no es necesario configurarlas manualmente. Esto hará que el proceso de revisión y despliegue sea más ágil y directo.
Levantamiento del servidor:

Una vez que las dependencias estén instaladas y todo esté en orden, puedes iniciar el servidor con el siguiente comando:

bash
Copiar código
npm start
Modo de desarrollo:

Si experimentas algún problema o necesitas hacer ajustes mientras el proyecto está en ejecución, te recomendamos usar el siguiente comando para levantar el servidor en modo de desarrollo:

bash
Copiar código
npm run start:dev
Este modo permitirá reiniciar el servidor automáticamente cada vez que realices cambios en el código, facilitando el proceso de depuración y desarrollo.

Todos los usuarios tienen por contraseña: "Christian1234*"
