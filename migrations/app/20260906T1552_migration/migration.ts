#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/861e6ebeba4dab618c25498328dd845cb76d9e63f5764259c6f02dca548298ae/contract';
import endContract from '../../snapshots/861e6ebeba4dab618c25498328dd845cb76d9e63f5764259c6f02dca548298ae/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/cea290e76d9d161255687e7ad4f3d1b2e11e3aad85389a64ea466f81b0add665/contract';
import startContract from '../../snapshots/cea290e76d9d161255687e7ad4f3d1b2e11e3aad85389a64ea466f81b0add665/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, lit } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.addColumn({
        schema: 'public',
        table: 'project',
        column: col('isExperiment', 'bool', {
          notNull: true,
          default: lit(false),
          codecRef: { codecId: 'pg/bool@1' },
        }),
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
