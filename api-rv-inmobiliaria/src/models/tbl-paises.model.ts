import {Entity, model, property} from '@loopback/repository';

@model()
export class TblPaises extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id_pais?: number;

  @property({
    type: 'string',
    required: true,
  })
  codigo_pais: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre_pais: string;


  constructor(data?: Partial<TblPaises>) {
    super(data);
  }
}

export interface TblPaisesRelations {
  // describe navigational properties here
}

export type TblPaisesWithRelations = TblPaises & TblPaisesRelations;
