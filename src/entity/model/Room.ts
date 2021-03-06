import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { Club } from "./Club";
import { EntityWithIdColumn } from "./EntityWithPrimaryColumn";
import { User } from "./User";

@Entity("room")
export class Room extends EntityWithIdColumn {
  @Column({ type: "tinyint" })
  club_looked: number;

  @Column({ type: "varchar", length: 2 })
  status: string;

  @Column({ type: "tinyint" })
  user_looked: number;

  @Column({ type: "varchar", length: 512, nullable: true })
  last_message: string;

  @Column({ type: "datetime", nullable: true })
  last_date: Date;

  @Column("int")
  c_offset: number;

  @Column("int")
  u_offset: number;

  @ManyToOne(() => Club, club => club.rooms)
  @JoinColumn({ name: "club_id" })
  club: Club;

  @ManyToOne(() => User, user => user.rooms)
  @JoinColumn({ name: "user_id" })
  user: User;
}