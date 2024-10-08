import { User } from 'src/modules/auth/entities/user.entity';
import { Match } from 'src/modules/match/entities/match.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('results')
export class Result {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Match, match => match.results, { eager: true })
  match: Match;

  @ManyToOne(() => User, { eager: true })
  winner: User;

  @ManyToOne(() => User, { eager: true })
  loser: User;

  @Column({ type: 'int' })
  winnerScore: number;

  @Column({ type: 'int' })
  loserScore: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  recordedAt: Date;
}
