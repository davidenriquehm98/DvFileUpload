export const propsRespuesta = [
  { nombre: 'name',
    default: 'null',
    important: 'true',
    tipo: 'String',
    descripcion: 'Contiene el nombre del Archivo Seleccionado' },
  { nombre: 'archivo',
    default: 'null',
    important: 'true',
    tipo: 'File',
    descripcion: 'Contiene el Archivo Seleccionado en tipo File' },
  { nombre: 'url',
    default: 'null',
    important: 'true',
    tipo: 'String',
    descripcion: 'Contiene la url de la preview' },
  { nombre: 'isNew',
    default: 'undefined',
    important: 'true',
    tipo: 'Boolean',
    descripcion: 'Esta propiedad se agrega con valor <b style="font-size:15px">true</b> únicamente cuando se selecciona un archivo.' },
  { nombre: 'isCleared',
    default: 'undefined',
    important: 'true',
    tipo: 'Boolean',
    descripcion: 'Esta propiedad se agrega con valor <b style="font-size:15px">true</b> únicamente cuando se limpia el modelo.' }
]