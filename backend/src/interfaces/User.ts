export interface User {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  picture_url?: string;
  simbrief_id?: string;
}
