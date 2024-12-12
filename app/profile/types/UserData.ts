interface UserData {
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  phone: string;
  dayOfBirth: string;
  avatar: string | null;
  balance: number;
}

export type DataUser = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  dayOfBirth: string;
  avatar: string | null;
}