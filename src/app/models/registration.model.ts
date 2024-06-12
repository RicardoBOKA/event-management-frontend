import { User } from "./user.model";
import { Event } from "./event.model";

export interface Registration {
  registrationId: string;
  user: User;
  event: Event;
  registrationDate: string;
}
