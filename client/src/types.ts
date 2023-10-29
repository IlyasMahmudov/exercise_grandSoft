
export interface User {
  id: number;
  name: string;
  email: string;
  address: {
    city: string;
    street: string;
    suite: string;
  };
  website: string;
  company: {
    name: string;
  };
}

export type DataState = {
  info: User[];
  isLoading: boolean;
};

export type UserKeys = keyof User;
