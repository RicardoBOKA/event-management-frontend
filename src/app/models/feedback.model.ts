import { User } from "./user.model";
import { Event } from "./event.model";

export interface Feedback {
    feedbackId: string;    // UUID
    user: User;            // Objet utilisateur
    event: Event;
    comment: string;       // Commentaire du feedback
    rating: number;        // Note attribuée
}
  