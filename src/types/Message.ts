export interface Message {
  message: string;
  timestamp: number;
  senderId: string;
}

export interface Chat extends Message {
  senderName: string;
}
