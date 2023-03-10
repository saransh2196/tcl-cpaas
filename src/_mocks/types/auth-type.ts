export interface IUser {
  id: string,
  emailId: string,
  password?: string,
  phoneNumber: string,
  firstname: string,
  lastName: string,
  role: string,
  accountName?: string,
  realm?: string,
  loginFirstTime: boolean,
  zoneinfo: string,
  preferredCommunicationMode: string,
  rbacprofile: object
}

export interface GetToken {
  data: {
    access_token: string,
    refresh_token: string,
    refresh_expires_in: number,
    token_type: string,
    expires_in: number,
  },
  message: string,
  status: number,
}

export interface UserInfo {
  data: {
    id: string,
    emailId: string,
    phoneNumber: string,
    firstname: string,
    lastname: string,
    role: string,
    accountName?: string,
    realm?: string,
    loginFirstTime: boolean,
    zoneinfo: string,
    preferredCommunicationMode: string,
  },
  message: string,
  status: number,
}

export interface SetPassword {
  data: string,
  message: string,
  status: number
}

export interface Logout {
  data: string,
  message: string,
  status: number
}