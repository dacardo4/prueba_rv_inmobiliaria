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
import {TblCiudades} from '../models';
import {TblCiudadesRepository} from '../repositories';

export class TblCiudadesController {
  constructor(
    @repository(TblCiudadesRepository)
    public tblCiudadesRepository : TblCiudadesRepository,
  ) {}

  @post('/ciudades', {
    responses: {
      '200': {
        description: 'TblCiudades model instance',
        content: {'application/json': {schema: getModelSchemaRef(TblCiudades)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TblCiudades, {
            title: 'NewTblCiudades',
            exclude: ['id_ciudad'],
          }),
        },
      },
    })
    tblCiudades: Omit<TblCiudades, 'id_ciudad'>,
  ): Promise<TblCiudades> {
    return this.tblCiudadesRepository.create(tblCiudades);
  }

  @get('/ciudades/count', {
    responses: {
      '200': {
        description: 'TblCiudades model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(TblCiudades) where?: Where<TblCiudades>,
  ): Promise<Count> {
    return this.tblCiudadesRepository.count(where);
  }

  @get('/ciudades', {
    responses: {
      '200': {
        description: 'Array of TblCiudades model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(TblCiudades, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(TblCiudades) filter?: Filter<TblCiudades>,
  ): Promise<TblCiudades[]> {
    return this.tblCiudadesRepository.find(filter);
  }

  @patch('/ciudades', {
    responses: {
      '200': {
        description: 'TblCiudades PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TblCiudades, {partial: true}),
        },
      },
    })
    tblCiudades: TblCiudades,
    @param.where(TblCiudades) where?: Where<TblCiudades>,
  ): Promise<Count> {
    return this.tblCiudadesRepository.updateAll(tblCiudades, where);
  }

  @get('/ciudades/{id}', {
    responses: {
      '200': {
        description: 'TblCiudades model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(TblCiudades, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(TblCiudades, {exclude: 'where'}) filter?: FilterExcludingWhere<TblCiudades>
  ): Promise<TblCiudades> {
    return this.tblCiudadesRepository.findById(id, filter);
  }

  @patch('/ciudades/{id}', {
    responses: {
      '204': {
        description: 'TblCiudades PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TblCiudades, {partial: true}),
        },
      },
    })
    tblCiudades: TblCiudades,
  ): Promise<void> {
    await this.tblCiudadesRepository.updateById(id, tblCiudades);
  }

  @put('/ciudades/{id}', {
    responses: {
      '204': {
        description: 'TblCiudades PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() tblCiudades: TblCiudades,
  ): Promise<void> {
    await this.tblCiudadesRepository.replaceById(id, tblCiudades);
  }

  @del('/ciudades/{id}', {
    responses: {
      '204': {
        description: 'TblCiudades DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.tblCiudadesRepository.deleteById(id);
  }
}
