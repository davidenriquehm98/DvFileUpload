export const dataEstructura = [
  { nombre: 'descripcion',
    default: 'null',
    tipo: 'String',
    descripcion: 'Contiene la descripción del grupo de datos, soporta estructuras html <img src="https://cdn.iconscout.com/icon/premium/png-64-thumb/html-126-287291.png" height="40px" >.' },
  { nombre: 'items',
    default: '[ ]',
    important: 'true',
    tipo: 'Array',
    descripcion: 'Contiene los items que se listarán dentro de la pestaña, Los items deben estar estructurados de acuerdo a la pestaña de <b style="font-size:15px">Estructura Item</b>' },
  { nombre: 'title',
    default: 'tabTitle${index}',
    important: 'true',
    tipo: 'String',
    descripcion: 'Etiqueta que se muestra en la pestaña que agrupará los items.' }
]