export interface Message {
  message: string;
  timestamp: string;
  senderId: string;
}

export interface Chat extends Message {
  senderName: string;
}
