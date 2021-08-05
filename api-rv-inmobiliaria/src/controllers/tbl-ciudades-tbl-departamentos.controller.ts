import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  TblCiudades,
  TblDepartamentos,
} from '../models';
import {TblCiudadesRepository} from '../repositories';

export class TblCiudadesTblDepartamentosController {
  constructor(
    @repository(TblCiudadesRepository) protected tblCiudadesRepository: TblCiudadesRepository,
  ) { }

  @get('/tbl-ciudades/{id}/tbl-departamentos', {
    responses: {
      '200': {
        description: 'Array of TblCiudades has many TblDepartamentos',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(TblDepartamentos)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<TblDepartamentos>,
  ): Promise<TblDepartamentos[]> {
    return this.tblCiudadesRepository.miDptoEs(id).find(filter);
  }

  @post('/tbl-ciudades/{id}/tbl-departamentos', {
    responses: {
      '200': {
        description: 'TblCiudades model instance',
        content: {'application/json': {schema: getModelSchemaRef(TblDepartamentos)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof TblCiudades.prototype.id_ciudad,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TblDepartamentos, {
            title: 'NewTblDepartamentosInTblCiudades',
            exclude: ['id_depto'],
            optional: ['id_depto']
          }),
        },
      },
    }) tblDepartamentos: Omit<TblDepartamentos, 'id_depto'>,
  ): Promise<TblDepartamentos> {
    return this.tblCiudadesRepository.miDptoEs(id).create(tblDepartamentos);
  }

  @patch('/tbl-ciudades/{id}/tbl-departamentos', {
    responses: {
      '200': {
        description: 'TblCiudades.TblDepartamentos PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TblDepartamentos, {partial: true}),
        },
      },
    })
    tblDepartamentos: Partial<TblDepartamentos>,
    @param.query.object('where', getWhereSchemaFor(TblDepartamentos)) where?: Where<TblDepartamentos>,
  ): Promise<Count> {
    return this.tblCiudadesRepository.miDptoEs(id).patch(tblDepartamentos, where);
  }

  @del('/tbl-ciudades/{id}/tbl-departamentos', {
    responses: {
      '200': {
        description: 'TblCiudades.TblDepartamentos DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(TblDepartamentos)) where?: Where<TblDepartamentos>,
  ): Promise<Count> {
    return this.tblCiudadesRepository.miDptoEs(id).delete(where);
  }
}
