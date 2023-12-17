
interface googleUser {
  idToken: string,
  serverAuthCode: string,
  scopes: Array<string>
  user: {
    email: string,
    id: string,
    givenName: string | null,
    familyName: string | null,
    photo: string | null, // url
    name: string | null // full name
  }
}


