export type User = {
  id?: string;
  email: string;
  name: string;
  role: string;
  status?: boolean;
  password: string;
  salt?: string;
  createdAt?: string;
  updatedAt?: string;
  emailConfirmed?: boolean;
  emailConfirmationToken?: string;
};
