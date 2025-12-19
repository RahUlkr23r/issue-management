import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class ActivityLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  issueId: number;

  @Column()
  action: string;

  @Column()
  performedBy: string;

  @Column()
  organizationId: string;

  @CreateDateColumn()
  createdAt: Date;
}
