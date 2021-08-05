import {belongsTo, Entity, model, property, hasOne} from '@loopback/repository';
import { TblCiudades } from './tbl-ciudades.model';
import {TblPaises} from './tbl-paises.model';

@model()
export class TblDepartamentos extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id_depto?: number;

  @property({
    type: 'string',
    required: true,
  })
  codigo_depto: string;

  @property({
    type: 'number',
    required: true,
  })
  codigo_pais: number;

  @property({
    type: 'string',
    required: true,
  })
  nombre_depto: string;

  @hasOne(() => TblPaises, {keyTo: 'id_pais', keyFrom: 'codigo_pais'})
  miPaisEs: TblPaises;

  constructor(data?: Partial<TblDepartamentos>) {
    super(data);
  }
}

export interface TblDepartamentosRelations {
  // describe navigational properties here
}

export type TblDepartamentosWithRelations = TblDepartamentos & TblDepartamentosRelations;
