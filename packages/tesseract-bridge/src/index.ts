/**
 * Tesseract Bridge - Inter-package communication system
 * Connects all Cathedral packages through unified messaging
 */

import { CATHEDRAL_CONFIG } from '@cathedral/shared';

export interface BridgeMessage {
  from: string;
  to: string;
  type: 'data' | 'event' | 'request' | 'response';
  payload: any;
  timestamp: number;
  codex_node?: string;
}

export class TesseractBridge {
  private listeners: Map<string, (message: BridgeMessage) => void> = new Map();
  private messageHistory: BridgeMessage[] = [];

  send(message: BridgeMessage) {
    this.messageHistory.push(message);
    const listener = this.listeners.get(message.to);
    if (listener) {
      listener(message);
    }
  }

  subscribe(packageName: string, callback: (message: BridgeMessage) => void) {
    this.listeners.set(packageName, callback);
  }

  getMessageHistory() {
    return this.messageHistory;
  }
}

export const bridge = new TesseractBridge();

console.log("🔗 Tesseract Bridge initialized - V1.0.0");
