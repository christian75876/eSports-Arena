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

  async insertUsers(): Promise<void> {
    const emails = [
      'user1@example.com',
      'user2@example.com',
      'user3@example.com',
      'user4@example.com',
      'user5@example.com',
      'user6@example.com',
      'user7@example.com',
      'user8@example.com',
      'user9@example.com',
      'user10@example.com',
    ];

    for (const email of emails) {
      const existingUser = await this.entityManager.query(`
        SELECT email FROM users WHERE email = '${email}';
      `);

      if (existingUser.length > 0) {
        console.log(`User ${email} already exists, skipping insertion.`);
        continue;
      }

      await this.entityManager.query(`
        INSERT INTO users (email, password, role_id, created_at, updated_at) 
        VALUES (
          '${email}', 
          '$2b$10$LM7ZOaQdY82EsdHzTAUui.hQmxyXStp70do3cw0GStjcij4IgcqwC', 
          2, 
          CURRENT_TIMESTAMP, 
          CURRENT_TIMESTAMP
        );
      `);
      console.log(`User ${email} inserted successfully.`);
    }
  }
}
