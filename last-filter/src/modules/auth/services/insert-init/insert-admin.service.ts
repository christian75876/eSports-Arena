import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

@Injectable()
export class InserUserService {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  async insertAdminUser(): Promise<void> {
    const existingUser = await this.entityManager.query(`
      SELECT email FROM users WHERE email IN('admin@esportsarena.com');
    `);
    if (existingUser.length > 0) {
      console.log('Admin already exists, skipping insertion.');
      return;
    }

    await this.entityManager.query(`
      INSERT INTO users (email, password, role_id, created_at, updated_at) 
      VALUES (
        'admin@esportsarena.com', 
        '$2b$10$LM7ZOaQdY82EsdHzTAUui.hQmxyXStp70do3cw0GStjcij4IgcqwC', 
        1, 
        CURRENT_TIMESTAMP, 
        CURRENT_TIMESTAMP
      );
    `);
    console.log('Admin user inserted successfully.');
  }
}
