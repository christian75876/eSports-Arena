import { Match } from 'src/modules/match/entities/match.entity';
import { Participation } from 'src/modules/participation/entities/participation.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('tournaments')
export class Tournament {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true })
  name: string;

  @Column({ type: 'timestamp' })
  startDate: Date;

  @Column({ type: 'timestamp' })
  endDate: Date;

  @Column({ type: 'text', nullable: true })
  description: string;

  @OneToMany(() => Participation, participation => participation.tournament)
  participations: Participation[];

  @OneToMany(() => Match, match => match.tournament)
  matches: Match[];

  @DeleteDateColumn()
  deletedAt?: Date;
}
