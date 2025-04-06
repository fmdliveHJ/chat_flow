export interface Message {
  id: string;
  sender: string;
  type?: 'UserStatus' | 'message';
  userId?: string;
  username?: string;
  message?: string;
  color?: string;
}
