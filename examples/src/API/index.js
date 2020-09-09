import { propsPicker } from './propiedadesPicker'
import { propsRespuesta } from './propsRespuesta'
import { imgDefault } from './imgDefault'

export const Api = [
  { title: 'Propiedades Picker',
    items: propsPicker },
  { title: 'Estructura Respuesta',
    items: propsRespuesta,
    descripcion: 'Si es Multiple se retorna un array de Objetos, Si no está habilitada la propiedad de <b style="font-size:15px">is-collections</b> devolvera un Objeto, los Objeto que se retorna contiene las siguientes propiedades' },
  { title: 'Default Images',
    items: imgDefault }
  // { title: 'Propiedades Modelo',
  //   descripcion: 'Si es Multiple se retorna un array de Objetos, Si no está habilitada la propiedad de <b style="font-size:15px">is-collections</b> devolvera un Objeto, los Objeto que se retorna contiene las siguientes propiedades',
  //   items: dataEstructura },
  // { title: 'Slots Picker',
  //   items: dataEstructura },
  // { title: 'Slots Button',
  //   items: dataEstructura },
  // { title: 'Propiedades Obsoletas',
  //   descripcion: 'En Versiones Anteriores se Contaba con Propiedades que han sido Reemplazadas o Eliminadas:',
  //   items: itemsEstructura }
]