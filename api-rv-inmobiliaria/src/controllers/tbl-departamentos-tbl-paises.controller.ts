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
  TblDepartamentos,
  TblPaises,
} from '../models';
import {TblDepartamentosRepository} from '../repositories';

export class TblDepartamentosTblPaisesController {
  constructor(
    @repository(TblDepartamentosRepository) protected tblDepartamentosRepository: TblDepartamentosRepository,
  ) { }

  @get('/tbl-departamentos/{id}/tbl-paises', {
    responses: {
      '200': {
        description: 'TblDepartamentos has one TblPaises',
        content: {
          'application/json': {
            schema: getModelSchemaRef(TblPaises),
          },
        },
      },
    },
  })
  async get(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<TblPaises>,
  ): Promise<TblPaises> {
    return this.tblDepartamentosRepository.miPaisEs(id).get(filter);
  }

  @post('/tbl-departamentos/{id}/tbl-paises', {
    responses: {
      '200': {
        description: 'TblDepartamentos model instance',
        content: {'application/json': {schema: getModelSchemaRef(TblPaises)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof TblDepartamentos.prototype.id_depto,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TblPaises, {
            title: 'NewTblPaisesInTblDepartamentos',
            exclude: ['id_pais'],
            optional: ['id_pais']
          }),
        },
      },
    }) tblPaises: Omit<TblPaises, 'id_pais'>,
  ): Promise<TblPaises> {
    return this.tblDepartamentosRepository.miPaisEs(id).create(tblPaises);
  }

  @patch('/tbl-departamentos/{id}/tbl-paises', {
    responses: {
      '200': {
        description: 'TblDepartamentos.TblPaises PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TblPaises, {partial: true}),
        },
      },
    })
    tblPaises: Partial<TblPaises>,
    @param.query.object('where', getWhereSchemaFor(TblPaises)) where?: Where<TblPaises>,
  ): Promise<Count> {
    return this.tblDepartamentosRepository.miPaisEs(id).patch(tblPaises, where);
  }

  @del('/tbl-departamentos/{id}/tbl-paises', {
    responses: {
      '200': {
        description: 'TblDepartamentos.TblPaises DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(TblPaises)) where?: Where<TblPaises>,
  ): Promise<Count> {
    return this.tblDepartamentosRepository.miPaisEs(id).delete(where);
  }
}
