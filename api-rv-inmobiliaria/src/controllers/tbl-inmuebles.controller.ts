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
import {TblInmuebles} from '../models';
import {TblInmueblesRepository} from '../repositories';

export class TblInmueblesController {
  constructor(
    @repository(TblInmueblesRepository)
    public tblInmueblesRepository : TblInmueblesRepository,
  ) {}

  @post('/inmuebles', {
    responses: {
      '200': {
        description: 'TblInmuebles model instance',
        content: {'application/json': {schema: getModelSchemaRef(TblInmuebles)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TblInmuebles, {
            title: 'NewTblInmuebles',
            exclude: ['id_inmueble'],
          }),
        },
      },
    })
    tblInmuebles: Omit<TblInmuebles, 'id_inmueble'>,
  ): Promise<TblInmuebles> {
    return this.tblInmueblesRepository.create(tblInmuebles);
  }

  @get('/inmuebles/count', {
    responses: {
      '200': {
        description: 'TblInmuebles model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(TblInmuebles) where?: Where<TblInmuebles>,
  ): Promise<Count> {
    return this.tblInmueblesRepository.count(where);
  }

  @get('/inmuebles', {
    responses: {
      '200': {
        description: 'Array of TblInmuebles model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(TblInmuebles, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(TblInmuebles) filter?: Filter<TblInmuebles>,
  ): Promise<TblInmuebles[]> {
    return this.tblInmueblesRepository.find(filter);
  }

  @patch('/inmuebles', {
    responses: {
      '200': {
        description: 'TblInmuebles PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TblInmuebles, {partial: true}),
        },
      },
    })
    tblInmuebles: TblInmuebles,
    @param.where(TblInmuebles) where?: Where<TblInmuebles>,
  ): Promise<Count> {
    return this.tblInmueblesRepository.updateAll(tblInmuebles, where);
  }

  @get('/inmuebles/{id}', {
    responses: {
      '200': {
        description: 'TblInmuebles model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(TblInmuebles, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(TblInmuebles, {exclude: 'where'}) filter?: FilterExcludingWhere<TblInmuebles>
  ): Promise<TblInmuebles> {
    return this.tblInmueblesRepository.findById(id, filter);
  }

  @patch('/inmuebles/{id}', {
    responses: {
      '204': {
        description: 'TblInmuebles PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TblInmuebles, {partial: true}),
        },
      },
    })
    tblInmuebles: TblInmuebles,
  ): Promise<void> {
    await this.tblInmueblesRepository.updateById(id, tblInmuebles);
  }

  @put('/inmuebles/{id}', {
    responses: {
      '204': {
        description: 'TblInmuebles PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() tblInmuebles: TblInmuebles,
  ): Promise<void> {
    await this.tblInmueblesRepository.replaceById(id, tblInmuebles);
  }

  @del('/inmuebles/{id}', {
    responses: {
      '204': {
        description: 'TblInmuebles DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.tblInmueblesRepository.deleteById(id);
  }
}
