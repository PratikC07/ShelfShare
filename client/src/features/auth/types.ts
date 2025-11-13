export interface User {
  _id: string;
  name: string;
  email: string;
  referralCode: string;
  totalCredits: number;
}

export interface AuthSuccessResponse {
  status: string;
  data: {
    token: string;
    user: User;
  };
}
