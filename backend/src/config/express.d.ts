import { User as AppUser } from "../interfaces/User";

declare global {
  namespace Express {
    interface User extends AppUser {}
  }
}
