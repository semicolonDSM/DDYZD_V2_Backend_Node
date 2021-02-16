import { ClubUserViewRepository } from "../entity/entity-repository/clubUserViewRepository";
import { UserRepository } from "../entity/entity-repository/userReposiotry";
import { User } from "../entity/model";
import { ClubUserView } from "../entity/view";
import { UserInfoResObj, UserTokenResOhj } from "../shared/DataTransferObject";
import { BadRequestError, UnAuthorizedTokenError } from "../shared/exception";
import { getUserInfoWithDsmAuth, issuanceToken, getUserToken } from "./function/userAuthentication";
import { ModifyUserInfoDto } from './../shared/DataTransferObject';

export class UserService {
  constructor(
    private clubUserViewRepository: ClubUserViewRepository,
    private userRepository: UserRepository,
  ) {}

  public async provideToken(token: string): Promise<UserTokenResOhj> {
    if(!token) {
      throw new BadRequestError();
    }
    const userInfo = await getUserInfoWithDsmAuth(token);
    const checkExistUser: User = await this.userRepository.findUserByUniqueEmail(userInfo.email);
    const authenticatedUser: User = checkExistUser ? 
    checkExistUser : await this.userRepository.createDefaultUser(userInfo);
    return {
      "access_token": await issuanceToken(authenticatedUser.user_id, "access"),
      "refresh_token": await issuanceToken(authenticatedUser.user_id, "refresh"),
    };
  }

  public async refreshToken(user_id: number, refreshToken: string): Promise<UserTokenResOhj> {
    const accessToken: string = await issuanceToken(user_id, "access");
    return {
      "access_token": accessToken,
      "refresh_token": refreshToken,
    };
  }

  public async proviceTokenWithCode(code: string) {
    const token: string = await getUserToken(code);
    const userInfo = await getUserInfoWithDsmAuth(token);
    const checkExistUser: User = await this.userRepository.findUserByUniqueEmail(userInfo.email);
    const authenticatedUser: User = checkExistUser ? 
    checkExistUser : await this.userRepository.createDefaultUser(userInfo);
    return {
      "access_token": await issuanceToken(authenticatedUser.user_id, "access"),
      "refresh_token": await issuanceToken(authenticatedUser.user_id, "refresh"),
    };
  }

  public async showUserGcn(user_id: number): Promise<string> {
    const user: User = await this.userRepository.findOneOnlyGcn(user_id);
    if(!user) {
      throw new BadRequestError();
    }
    return user.gcn;
  }
  
  public async showUserInfo(gcn: string): Promise<UserInfoResObj> {
    const user: User = await this.userRepository.findUserByClassIdentity(gcn);
    const clubs: ClubUserView[] = await this.clubUserViewRepository.findUsersClub(gcn);
    if(!user) {
      throw new BadRequestError();
    }
    delete user.device_token;
    return { ... user, clubs, };
  }
  
  public async modifyUserInfo(data: ModifyUserInfoDto, user_id: number) {
    const modifiedUser: User = await this.userRepository.putUserData(user_id, data);
    if(!modifiedUser) {
      throw new UnAuthorizedTokenError();
    }
  }
  
  public async deviceToken(token: string, user_id: number) {
    if(!token || typeof token !== "string") {
      throw new BadRequestError();
    }
    const splitToken = token.split(" ");
    if(splitToken[0] !== "Bearer") {
      throw new UnAuthorizedTokenError();
    }
    await this.userRepository.deviceToken(user_id, splitToken[1]);
  }
}