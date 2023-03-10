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

export interface SetPassword {
  data: {
    message: string,
    status: number
  }
}

export interface Logout {
  data: {
    message: string,
    status: number
  }
}