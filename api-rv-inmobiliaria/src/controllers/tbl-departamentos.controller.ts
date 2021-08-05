import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {TblDepartamentos} from '../models';
import {TblDepartamentosRepository} from '../repositories';

export class TblDepartamentosController {
  constructor(
    @repository(TblDepartamentosRepository)
    public tblDepartamentosRepository : TblDepartamentosRepository,
  ) {}

  @post('/departamentos', {
    responses: {
      '200': {
        description: 'TblDepartamentos model instance',
        content: {'application/json': {schema: getModelSchemaRef(TblDepartamentos)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TblDepartamentos, {
            title: 'NewTblDepartamentos',
            exclude: ['id_depto'],
          }),
        },
      },
    })
    tblDepartamentos: Omit<TblDepartamentos, 'id_depto'>,
  ): Promise<TblDepartamentos> {
    return this.tblDepartamentosRepository.create(tblDepartamentos);
  }

  @get('/departamentos/count', {
    responses: {
      '200': {
        description: 'TblDepartamentos model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(TblDepartamentos) where?: Where<TblDepartamentos>,
  ): Promise<Count> {
    return this.tblDepartamentosRepository.count(where);
  }

  @get('/departamentos', {
    responses: {
      '200': {
        description: 'Array of TblDepartamentos model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(TblDepartamentos, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(TblDepartamentos) filter?: Filter<TblDepartamentos>,
  ): Promise<TblDepartamentos[]> {
    return this.tblDepartamentosRepository.find(filter);
  }

  @patch('/departamentos', {
    responses: {
      '200': {
        description: 'TblDepartamentos PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TblDepartamentos, {partial: true}),
        },
      },
    })
    tblDepartamentos: TblDepartamentos,
    @param.where(TblDepartamentos) where?: Where<TblDepartamentos>,
  ): Promise<Count> {
    return this.tblDepartamentosRepository.updateAll(tblDepartamentos, where);
  }

  @get('/departamentos/{id}', {
    responses: {
      '200': {
        description: 'TblDepartamentos model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(TblDepartamentos, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(TblDepartamentos, {exclude: 'where'}) filter?: FilterExcludingWhere<TblDepartamentos>
  ): Promise<TblDepartamentos> {
    return this.tblDepartamentosRepository.findById(id, filter);
  }

  @patch('/departamentos/{id}', {
    responses: {
      '204': {
        description: 'TblDepartamentos PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TblDepartamentos, {partial: true}),
        },
      },
    })
    tblDepartamentos: TblDepartamentos,
  ): Promise<void> {
    await this.tblDepartamentosRepository.updateById(id, tblDepartamentos);
  }

  @put('/departamentos/{id}', {
    responses: {
      '204': {
        description: 'TblDepartamentos PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() tblDepartamentos: TblDepartamentos,
  ): Promise<void> {
    await this.tblDepartamentosRepository.replaceById(id, tblDepartamentos);
  }

  @del('/departamentos/{id}', {
    responses: {
      '204': {
        description: 'TblDepartamentos DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.tblDepartamentosRepository.deleteById(id);
  }
}
