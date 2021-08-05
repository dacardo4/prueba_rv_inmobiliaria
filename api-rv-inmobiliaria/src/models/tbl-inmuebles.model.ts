import {Entity, model, property, hasOne} from '@loopback/repository';
import {TblCiudades} from './tbl-ciudades.model';

@model()
export class TblInmuebles extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id_inmueble?: number;

  @property({
    type: 'string',
    required: true,
  })
  codigo_inmueble: string;

  @property({
    type: 'string',
    required: true,
  })
  direccion: string;

  @property({
    type: 'string',
    required: true,
  })
  telefono: string;

  @property({
    type: 'number',
    required: true,
  })
  codigo_ciudad: number;

  @hasOne(() => TblCiudades, {keyTo: 'id_ciudad', keyFrom: 'codigo_ciudad'})
  miCiudadEs: TblCiudades;

  constructor(data?: Partial<TblInmuebles>) {
    super(data);
  }
}

export interface TblInmueblesRelations {
  // describe navigational properties here
}

export type TblInmueblesWithRelations = TblInmuebles & TblInmueblesRelations;
