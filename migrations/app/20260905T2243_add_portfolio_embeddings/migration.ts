#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/cea290e76d9d161255687e7ad4f3d1b2e11e3aad85389a64ea466f81b0add665/contract';
import endContract from '../../snapshots/cea290e76d9d161255687e7ad4f3d1b2e11e3aad85389a64ea466f81b0add665/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/ffd85df976a621c209cff2bd77f324acbe1a4adba5889a6d3886af2f1a40dfb6/contract';
import startContract from '../../snapshots/ffd85df976a621c209cff2bd77f324acbe1a4adba5889a6d3886af2f1a40dfb6/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, lit, rawSql } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.dropColumn({ schema: 'public', table: 'project', column: 'githubUrl' }),
      this.addColumn({
        schema: 'public',
        table: 'project',
        column: col('githubUrls', 'text[]', {
          notNull: true,
          default: lit([]),
          codecRef: { codecId: 'pg/text@1', many: true },
        }),
      }),
      this.addCheckConstraint({
        schema: 'public',
        table: 'project',
        constraint: 'project_githubUrls_elem_not_null_b11d837b',
        expression: 'array_position("githubUrls", NULL) IS NULL',
      }),
      rawSql({
        id: 'create_portfolio_embeddings',
        label: 'Create portfolio_embeddings table with vector(768)',
        operationClass: 'additive',
        // @ts-ignore
        execute: `
          CREATE EXTENSION IF NOT EXISTS vector;
          CREATE TABLE "portfolio_embeddings" (
            "id" TEXT PRIMARY KEY,
            "content" TEXT NOT NULL,
            "sourceType" TEXT NOT NULL,
            "sourceId" TEXT NOT NULL,
            "embedding" vector(768)
          );
          CREATE INDEX ON "portfolio_embeddings" USING hnsw (embedding vector_cosine_ops);
        `,
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
