import {DefaultCrudRepository, repository, HasOneRepositoryFactory, HasManyRepositoryFactory} from '@loopback/repository';
import {TblCiudades, TblCiudadesRelations, TblDepartamentos} from '../models';
import {DbPaisesDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {TblDepartamentosRepository} from './tbl-departamentos.repository';

export class TblCiudadesRepository extends DefaultCrudRepository<
  TblCiudades,
  typeof TblCiudades.prototype.id_ciudad,
  TblCiudadesRelations
> {

  public readonly seEncuentraEn: HasOneRepositoryFactory<TblDepartamentos, typeof TblCiudades.prototype.id_ciudad>;

  public readonly miDptoEs: HasManyRepositoryFactory<TblDepartamentos, typeof TblCiudades.prototype.id_ciudad>;

  constructor(
    @inject('datasources.db_paises') dataSource: DbPaisesDataSource, @repository.getter('TblDepartamentosRepository') protected tblDepartamentosRepositoryGetter: Getter<TblDepartamentosRepository>,
  ) {
    super(TblCiudades, dataSource);
    this.miDptoEs = this.createHasManyRepositoryFactoryFor('miDptoEs', tblDepartamentosRepositoryGetter,);
    this.registerInclusionResolver('miDptoEs', this.miDptoEs.inclusionResolver);
    this.seEncuentraEn = this.createHasOneRepositoryFactoryFor('seEncuentraEn', tblDepartamentosRepositoryGetter);
    this.registerInclusionResolver('seEncuentraEn', this.seEncuentraEn.inclusionResolver);
  }
}
