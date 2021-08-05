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
import {TblPaises} from '../models';
import {TblPaisesRepository} from '../repositories';

export class TblPaisesController {
  constructor(
    @repository(TblPaisesRepository)
    public tblPaisesRepository : TblPaisesRepository,
  ) {}

  @post('/paises', {
    responses: {
      '200': {
        description: 'TblPaises model instance',
        content: {'application/json': {schema: getModelSchemaRef(TblPaises)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TblPaises, {
            title: 'NewTblPaises',
            exclude: ['id_pais'],
          }),
        },
      },
    })
    tblPaises: Omit<TblPaises, 'id_pais'>,
  ): Promise<TblPaises> {
    return this.tblPaisesRepository.create(tblPaises);
  }

  @get('/paises/count', {
    responses: {
      '200': {
        description: 'TblPaises model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(TblPaises) where?: Where<TblPaises>,
  ): Promise<Count> {
    return this.tblPaisesRepository.count(where);
  }

  @get('/paises', {
    responses: {
      '200': {
        description: 'Array of TblPaises model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(TblPaises, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(TblPaises) filter?: Filter<TblPaises>,
  ): Promise<TblPaises[]> {
    return this.tblPaisesRepository.find(filter);
  }

  @patch('/paises', {
    responses: {
      '200': {
        description: 'TblPaises PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TblPaises, {partial: true}),
        },
      },
    })
    tblPaises: TblPaises,
    @param.where(TblPaises) where?: Where<TblPaises>,
  ): Promise<Count> {
    return this.tblPaisesRepository.updateAll(tblPaises, where);
  }

  @get('/paises/{id}', {
    responses: {
      '200': {
        description: 'TblPaises model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(TblPaises, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(TblPaises, {exclude: 'where'}) filter?: FilterExcludingWhere<TblPaises>
  ): Promise<TblPaises> {
    return this.tblPaisesRepository.findById(id, filter);
  }

  @patch('/paises/{id}', {
    responses: {
      '204': {
        description: 'TblPaises PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TblPaises, {partial: true}),
        },
      },
    })
    tblPaises: TblPaises,
  ): Promise<void> {
    await this.tblPaisesRepository.updateById(id, tblPaises);
  }

  @put('/paises/{id}', {
    responses: {
      '204': {
        description: 'TblPaises PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() tblPaises: TblPaises,
  ): Promise<void> {
    await this.tblPaisesRepository.replaceById(id, tblPaises);
  }

  @del('/paises/{id}', {
    responses: {
      '204': {
        description: 'TblPaises DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.tblPaisesRepository.deleteById(id);
  }
}
