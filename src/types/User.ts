export interface User {
  id: string;
  name: string;
  email: string;
}

export interface BaseUser {
  id: string;
  name: string
}

export interface UserWithContacts extends BaseUser {
  contactIds: string[]
}
export interface Contact {
  id: string;
  name: string;
}