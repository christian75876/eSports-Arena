import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

@Injectable()
export class InsertRoleService {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  async insertRoles(): Promise<void> {
    const existingRoles = await this.entityManager.query(`
      SELECT name FROM roles WHERE name IN ('admin', 'player');
      `);

    if (existingRoles.length > 0) {
      console.log('Roles already exist, skipping insertion.');
      return;
    }

    await this.entityManager.query(`
      INSERT INTO roles (id, name) VALUES
      (1, 'admin'),
      (2, 'player');
    `);
  }
}
