import { User } from "./user.model";

export interface Event {
    eventId: string;
    eventName: string;
    createdDate: string;
    startEvent: string;
    endEvent: string;
    location: string;
    description: string;
    user: User;
  }