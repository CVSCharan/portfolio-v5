#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/9e427674e5e577876614c11353b4a87bcb2e898b922ead47e488d14c36bef478/contract';
import endContract from '../../snapshots/9e427674e5e577876614c11353b4a87bcb2e898b922ead47e488d14c36bef478/contract.json' with { type: 'json' };
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
        table: 'blogPost',
        column: col('readingTime', 'int4', {
          notNull: true,
          default: lit(0),
          codecRef: { codecId: 'pg/int4@1' },
        }),
      }),
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
