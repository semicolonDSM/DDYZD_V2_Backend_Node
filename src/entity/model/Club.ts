import { Column, Entity, OneToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Alarm } from "./Alarm";
import { ClubHasTag } from "./ClubHasTag";
import { Feed } from "./Feed";
import { Major } from "./Major";
import { ClubFollow } from './ClubFollow';
import { Application } from "./Application";
import { ClubHead } from "./ClubHead";
import { Supply } from "./Supply";

@Entity("club")
export class Club {
  @PrimaryGeneratedColumn({ name: "club_id" })
  club_id: number;

  @Column({ type: "varchar", length: 45 })
  club_name: string;

  @Column({ default: 0 })
  total_budget: number;

  @Column({ default: 0 })
  current_budget: number;

  @Column({ type: "datetime", nullable: true })
  start_at?: Date;

  @Column({ type: "datetime", nullable: true })
  close_at?: Date;

  @Column()
  banner_img: string;

  @Column()
  profile_img: string;

  @Column({ nullable: true })
  hongbo_img?: string;

  @OneToMany(() => Feed, feed => feed.club)
  feeds: Feed[];

  @OneToMany(() => Major, major => major.club)
  majors: Major[];

  @OneToMany(() => Alarm, alarm => alarm.club)
  alarms: Alarm[];
  
  @OneToMany(() => ClubHasTag, clubHasTag => clubHasTag.club)
  clubHasTags: ClubHasTag[];

  @OneToMany(() => ClubFollow, clubFollow => clubFollow.club)
  followers: ClubFollow[];

  @OneToMany(() => Application, application => application.club)
  applications: Application[];

  @OneToOne(() => ClubHead, clubHead => clubHead.club)
  head: ClubHead;

  @OneToMany(() => Supply, supply => supply.club)
  supplies: Supply[];
}