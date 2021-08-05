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
  TblInmuebles,
  TblCiudades,
} from '../models';
import {TblInmueblesRepository} from '../repositories';

export class TblInmueblesTblCiudadesController {
  constructor(
    @repository(TblInmueblesRepository) protected tblInmueblesRepository: TblInmueblesRepository,
  ) { }

  @get('/tbl-inmuebles/{id}/tbl-ciudades', {
    responses: {
      '200': {
        description: 'TblInmuebles has one TblCiudades',
        content: {
          'application/json': {
            schema: getModelSchemaRef(TblCiudades),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<TblCiudades>,
  ): Promise<TblCiudades> {
    return this.tblInmueblesRepository.miCiudadEs(id).get(filter);
  }

  @post('/tbl-inmuebles/{id}/tbl-ciudades', {
    responses: {
      '200': {
        description: 'TblInmuebles model instance',
        content: {'application/json': {schema: getModelSchemaRef(TblCiudades)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof TblInmuebles.prototype.id_inmueble,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TblCiudades, {
            title: 'NewTblCiudadesInTblInmuebles',
            exclude: ['id_ciudad'],
            optional: ['id_ciudad']
          }),
        },
      },
    }) tblCiudades: Omit<TblCiudades, 'id_ciudad'>,
  ): Promise<TblCiudades> {
    return this.tblInmueblesRepository.miCiudadEs(id).create(tblCiudades);
  }

  @patch('/tbl-inmuebles/{id}/tbl-ciudades', {
    responses: {
      '200': {
        description: 'TblInmuebles.TblCiudades PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TblCiudades, {partial: true}),
        },
      },
    })
    tblCiudades: Partial<TblCiudades>,
    @param.query.object('where', getWhereSchemaFor(TblCiudades)) where?: Where<TblCiudades>,
  ): Promise<Count> {
    return this.tblInmueblesRepository.miCiudadEs(id).patch(tblCiudades, where);
  }

  @del('/tbl-inmuebles/{id}/tbl-ciudades', {
    responses: {
      '200': {
        description: 'TblInmuebles.TblCiudades DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(TblCiudades)) where?: Where<TblCiudades>,
  ): Promise<Count> {
    return this.tblInmueblesRepository.miCiudadEs(id).delete(where);
  }
}
