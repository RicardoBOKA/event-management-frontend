export interface Feedback {
    feedbackId: string;    // UUID
    eventId: string;       // L'identifiant de l'événement associé
    userId: string;        // L'identifiant de l'utilisateur qui donne le feedback
    comment: string;       // Commentaire du feedback
    rating: number;        // Note attribuée
  }
  