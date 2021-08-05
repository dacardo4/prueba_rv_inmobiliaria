import {DefaultCrudRepository} from '@loopback/repository';
import {TblPaises, TblPaisesRelations} from '../models';
import {DbPaisesDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class TblPaisesRepository extends DefaultCrudRepository<
  TblPaises,
  typeof TblPaises.prototype.id_pais,
  TblPaisesRelations
> {
  constructor(
    @inject('datasources.db_paises') dataSource: DbPaisesDataSource,
  ) {
    super(TblPaises, dataSource);
  }
}
