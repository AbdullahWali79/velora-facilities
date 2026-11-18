import * as migration_20261118_190606_init from './20261118_190606_init';

export const migrations = [
  {
    up: migration_20261118_190606_init.up,
    down: migration_20261118_190606_init.down,
    name: '20261118_190606_init'
  },
];
