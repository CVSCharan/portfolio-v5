#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/14886ed7ed8c5a1f818e5488af7c47196a88838683c5f0169b458cc6b0083798/contract';
import startContract from '../../snapshots/14886ed7ed8c5a1f818e5488af7c47196a88838683c5f0169b458cc6b0083798/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/ffd85df976a621c209cff2bd77f324acbe1a4adba5889a6d3886af2f1a40dfb6/contract';
import endContract from '../../snapshots/ffd85df976a621c209cff2bd77f324acbe1a4adba5889a6d3886af2f1a40dfb6/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.addColumn({
        schema: 'public',
        table: 'project',
        column: col('metrics', 'json', { codecRef: { codecId: 'pg/json@1' } }),
      }),
      this.addColumn({
        schema: 'public',
        table: 'project',
        column: col('role', 'text', { codecRef: { codecId: 'pg/text@1' } }),
      }),
      this.addColumn({
        schema: 'public',
        table: 'project',
        column: col('timeline', 'text', { codecRef: { codecId: 'pg/text@1' } }),
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
