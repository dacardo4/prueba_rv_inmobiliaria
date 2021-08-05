import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {TblDepartamentos, TblDepartamentosRelations, TblPaises} from '../models';
import {DbPaisesDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {TblPaisesRepository} from './tbl-paises.repository';

export class TblDepartamentosRepository extends DefaultCrudRepository<
  TblDepartamentos,
  typeof TblDepartamentos.prototype.id_depto,
  TblDepartamentosRelations
> {

  public readonly miPaisEs: HasOneRepositoryFactory<TblPaises, typeof TblDepartamentos.prototype.id_depto>;

  constructor(
    @inject('datasources.db_paises') dataSource: DbPaisesDataSource, @repository.getter('TblPaisesRepository') protected tblPaisesRepositoryGetter: Getter<TblPaisesRepository>,
  ) {
    super(TblDepartamentos, dataSource);
    this.miPaisEs = this.createHasOneRepositoryFactoryFor('miPaisEs', tblPaisesRepositoryGetter);
    this.registerInclusionResolver('miPaisEs', this.miPaisEs.inclusionResolver);
  }
}
