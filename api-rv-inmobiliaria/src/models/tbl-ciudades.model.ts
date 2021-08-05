import {Entity, hasOne, model, property, hasMany} from '@loopback/repository';
import { TblDepartamentos } from './tbl-departamentos.model';

@model()
export class TblCiudades extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id_ciudad?: number;

  @property({
    type: 'string',
    required: true,
  })
  codigo_ciudad: string;

  @property({
    type: 'number',
    required: true,
  })
  codigo_depto: number;

  @property({
    type: 'string',
    required: true,
  })
  nombre_ciudad: string;

  @hasOne(() => TblDepartamentos, {keyTo: 'id_depto', keyFrom: 'codigo_depto'})
  seEncuentraEn: TblDepartamentos;

  @hasMany(() => TblDepartamentos, {keyTo: 'id_depto', keyFrom: 'codigo_depto'})
  miDptoEs: TblDepartamentos[];
  // @hasOne(() => TblDepartamentos, {keyTo: 'id_depto'})
  // estoyEn?: TblDepartamentos;


  constructor(data?: Partial<TblCiudades>) {
    super(data);
  }
}

export interface TblCiudadesRelations {
  // describe navigational properties here
}

export type TblCiudadesWithRelations = TblCiudades & TblCiudadesRelations;
