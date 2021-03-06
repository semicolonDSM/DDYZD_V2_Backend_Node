import { ConnectionOptions } from "typeorm";
import { config } from "./config";
import { ClubTagView, ClubUserView } from "./entity/view";
import {
   Alarm, ClubMember, Club, ClubFollow, ClubHasTag, ClubHead, Major, Room,
   Option, Supply, Tag, User, Feed, FeedFlag, FeedMedium, Activity, ActivityDetails } from "./entity/model";
import { Notice } from "./entity/model/Notice";

export const createOptions: ConnectionOptions = {
   type: "mysql",
   host: config.dbHost,
   port: config.dbPort,
   username: config.dbUser,
   password: config.dbPassword,
   database: config.dbName,
   synchronize: config.dbSynchronize,
   logging: config.dbLogging,
   entities: [
      Alarm, ClubMember, Club, ClubFollow, ClubHasTag, ClubHead,
      Major, Option, Supply, Tag, User, Activity, ActivityDetails,
      ClubUserView, ClubTagView, Feed, FeedFlag, FeedMedium, Room, Notice
   ]
}
