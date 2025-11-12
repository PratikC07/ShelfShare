// This is the shape of the User object from your API docs
export interface User {
  _id: string;
  name: string;
  email: string;
  referralCode: string;
  totalCredits: number;
}

// This is the shape of the successful response from /login or /register
export interface AuthSuccessResponse {
  status: string;
  data: {
    token: string;
    user: User;
  };
}
