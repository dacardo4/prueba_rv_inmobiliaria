import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'db_inmuebles',
  connector: 'mysql',
  url: 'mysql://uhjedx6hqsxfe1gg:09hh680eAR3CGgZJeLlI@bcpk28grusebpx8cnq5n-mysql.services.clever-cloud.com:3306/bcpk28grusebpx8cnq5n',
  host: 'bcpk28grusebpx8cnq5n-mysql.services.clever-cloud.com',
  port: 3306,
  user: 'uhjedx6hqsxfe1gg',
  password: '09hh680eAR3CGgZJeLlI',
  database: 'bcpk28grusebpx8cnq5n'
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class DbInmueblesDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'db_inmuebles';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.db_inmuebles', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
