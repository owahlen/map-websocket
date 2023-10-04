import {useState} from "react";
import {Client, IFrame} from "@stomp/stompjs";

const stompClient = new Client({
    brokerURL: 'ws://localhost:8080/gs-guide-websocket'
});

export interface Greeting {
    content: string
}

export const useStomp = () => {
    const [connected, setConnected] = useState(false)
    const [webSocketError, setWebSocketError] = useState(false)
    const [stompError, setStompError] = useState<IFrame | null>(null)
    const [greetings, setGreetings] = useState<Array<Greeting>>([{content: "Hello Joe!"}])

    stompClient.onConnect = (frame) => {
        console.log('Connected: ' + frame);
        setConnected(true)
        setWebSocketError(false)
        stompClient.subscribe("/topic/greetings", (greetingMessage) => {
            const greeting = JSON.parse(greetingMessage.body) as Greeting
            _appendGreeting(greeting)
        })
    }

    stompClient.onWebSocketError = () => {
        console.error('Error with websocket');
        setWebSocketError(true)
    };

    stompClient.onStompError = (frame) => {
        console.error('Broker reported error: ' + frame.headers['message']);
        console.error('Additional details: ' + frame.body);
        setStompError(frame)
    };

    const connect = () => {
        stompClient.activate()
    }

    const disconnect = () => {
        stompClient.deactivate()
        setConnected(false)
        console.log("Disconnected")
    }

    const sendName = (name: string) => {
        console.log(`Sending name: ${name}`)
        stompClient.publish({
            destination: "/app/hello",
            body: JSON.stringify({'name': name})
        });
    }

    const clearGreetings = () => {
        setGreetings([])
    }

    const _appendGreeting = (greeting: Greeting) => {
        setGreetings(currentGreetings => [...currentGreetings, greeting])
    }

    return {
        connect,
        disconnect,
        sendName,
        connected,
        greetings,
        clearGreetings,
        webSocketError,
        stompError
    }
}
