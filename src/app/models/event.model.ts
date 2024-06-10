export interface Event {
    eventId: string;
    eventName: string;
    createdDate: string;  // Utilisation de string pour les dates pour simplifier l'interface avec JSON
    startEvent: string;
    endEvent: string;
    location: string;
    description: string;
    userId: string;
  }