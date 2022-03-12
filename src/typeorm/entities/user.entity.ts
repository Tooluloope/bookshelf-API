import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import bcrypt from 'bcrypt';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true })
  username: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar', unique: true })
  password: string;

  @Column()
  salt: string;

  @Column()
  fullname: string;

  @Column({ name: 'phone_number' })
  phoneNumber: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  async validatePassword(password: string): Promise<boolean> {
    console.log(this.salt);
    const hash = await bcrypt.hash(password, this.salt);
    console.log(hash === this.password);
    return hash === this.password;
  }
}
