// src/entities/participation.entity.ts

import { User } from 'src/modules/auth/entities/user.entity';
import { Tournament } from 'src/modules/tournament/entities/tournament.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('participations')
export class Participation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.participations, { eager: true })
  user: User;

  @ManyToOne(() => Tournament, tournament => tournament.participations, {
    eager: true,
  })
  tournament: Tournament;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  registeredAt: Date;
}
