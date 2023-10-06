import {Client, messageCallbackType, StompHeaders} from '@stomp/stompjs';

export interface StompSessionProviderContext {
    client?: Client
    connected: boolean
    error?: string
    subscribe: (
        destination: string,
        callback: messageCallbackType,
        headers?: StompHeaders
    ) => () => void;
}
