export interface Admin {
  authorized: boolean;
  userId: string;
}

export interface AdminUserProfile {
  _id: string;
  user: string;
  password: string;
  is_active: boolean;
  is_admin: boolean;
  modification_date: number;
}
