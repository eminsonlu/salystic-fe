import { ILinkedInProfile } from "./ILinkedInProfile";
import { IUser } from "./IUser";

export interface AuthResponse {
  user: IUser;
  profile: ILinkedInProfile;
  access_token: string;
  token_type: string;
  expires_in: number;
}