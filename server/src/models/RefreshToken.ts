import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column,
  JoinColumn,
  OneToOne
} from 'typeorm'

import User from './User'

@Entity('refresh_tokens')
class RefreshToken {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('int')
  expires_in: number;

  @OneToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  user_id: string;
}

export default RefreshToken