import { User as AppUser } from "./User";

declare global {
  namespace Express {
    interface User extends AppUser {}
  }
}
