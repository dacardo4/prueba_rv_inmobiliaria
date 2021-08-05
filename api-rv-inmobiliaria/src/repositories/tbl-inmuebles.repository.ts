import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {TblInmuebles, TblInmueblesRelations, TblCiudades} from '../models';
import {DbInmueblesDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {TblCiudadesRepository} from './tbl-ciudades.repository';

export class TblInmueblesRepository extends DefaultCrudRepository<
  TblInmuebles,
  typeof TblInmuebles.prototype.id_inmueble,
  TblInmueblesRelations
> {

  public readonly miCiudadEs: HasOneRepositoryFactory<TblCiudades, typeof TblInmuebles.prototype.id_inmueble>;

  constructor(
    @inject('datasources.db_inmuebles') dataSource: DbInmueblesDataSource, @repository.getter('TblCiudadesRepository') protected tblCiudadesRepositoryGetter: Getter<TblCiudadesRepository>,
  ) {
    super(TblInmuebles, dataSource);
    this.miCiudadEs = this.createHasOneRepositoryFactoryFor('miCiudadEs', tblCiudadesRepositoryGetter);
    this.registerInclusionResolver('miCiudadEs', this.miCiudadEs.inclusionResolver);
  }
}
