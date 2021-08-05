import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'db_paises',
  connector: 'mysql',
  url: 'mysql://uarcyro6ua5y7tjz:mRsVMd0WVj6ImY24cHrr@b2dkq7dm0rzvfujdvass-mysql.services.clever-cloud.com:3306/b2dkq7dm0rzvfujdvass',
  host: 'b2dkq7dm0rzvfujdvass-mysql.services.clever-cloud.com',
  port: 3306,
  user: 'uarcyro6ua5y7tjz',
  password: 'mRsVMd0WVj6ImY24cHrr',
  database: 'b2dkq7dm0rzvfujdvass'
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class DbPaisesDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'db_paises';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.db_paises', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
