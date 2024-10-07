// src/entities/match.entity.ts

import { User } from 'src/modules/auth/entities/user.entity';
import { Result } from 'src/modules/result/entities/result.entity';
import { Tournament } from 'src/modules/tournament/entities/tournament.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('matches')
export class Match {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Tournament, tournament => tournament.matches, {
    eager: true,
  })
  tournament: Tournament;

  @ManyToOne(() => User, { eager: true })
  player1: User;

  @ManyToOne(() => User, { eager: true })
  player2: User;

  @Column({ type: 'timestamp', nullable: true })
  scheduledAt: Date;

  @OneToMany(() => Result, result => result.match)
  results: Result[];
}
