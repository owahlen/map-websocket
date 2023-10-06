import React, {useEffect, useRef, useState} from 'react';
import StompContext from './StompContext';
import SockJS from 'sockjs-client';
import {ActivationState, Client, IStompSocket, messageCallbackType, StompHeaders} from '@stomp/stompjs';
import {StompSessionProviderProps} from './StompSessionProviderProps';
import {StompSessionSubscription} from './StompSessionSubscription';

/**
 * The StompSessionProvider manages the STOMP connection
 * All Hooks and HOCs in this library require an ancestor of this type.
 * The URL to connect to can be specified via the url prop.
 * Depending on the Schema of the URL either Sockjs or a raw Websocket is used.
 * You can override this behavior with the brokerURL or webSocketFactory props, which will then be forwarded to @stomp/stompjs
 * Custom @stomp/stompjs options can be used as props.
 * Please consult the @stomp/stompjs documentation for more information.
 */
export const StompSessionProvider = (props: StompSessionProviderProps) => {
    const {url, children, ...stompOptions} = props;

    const [client, setClient] = useState<Client>();
    const [connected, setConnected] = useState(false)
    const [error, setError] = useState<string | undefined>(undefined)
    const subscriptionRequests = useRef(new Map<string, StompSessionSubscription>());

    useEffect(() => {
        const _client = new Client(stompOptions);

        // based in the url prop of the StompSessionProvider either create a SockJS socket or a WebSocket
        if (!stompOptions.brokerURL && !stompOptions.webSocketFactory) {
            _client.webSocketFactory = () => {
                const parsedUrl = new URL(url, window?.location?.href);
                if (parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:') {
                    return new SockJS(url) as IStompSocket;
                } else if (
                    parsedUrl.protocol === 'ws:' ||
                    parsedUrl.protocol === 'wss:'
                ) {
                    return new WebSocket(url) as IStompSocket;
                } else throw new Error('Protocol not supported');
            };
        }

        // when a new client has successfully connected clear errors and populate existing subscriptions
        _client.onConnect = (frame) => {
            if (stompOptions.onConnect) stompOptions.onConnect(frame);

            setConnected(true)
            setError(undefined)

            subscriptionRequests.current.forEach((value) => {
                value.subscription = _client.subscribe(
                    value.destination,
                    value.callback,
                    value.headers
                );
            });
        };

        // clear errors upon intended disconnect (i.e. not by error)
        _client.onDisconnect = (frame) => {
            if (stompOptions.onDisconnect) stompOptions.onDisconnect(frame)
            setConnected(false)
            setError(undefined)
        }

        // manage the connection state in a React hook
        _client.onChangeState = (state) => {
            if (stompOptions.onChangeState) stompOptions.onChangeState(state);
            const connected = state === ActivationState.ACTIVE
            setConnected(connected)
        }

        // manage errors in a React hook
        _client.onStompError = (frame) => {
            if (stompOptions.onStompError) stompOptions.onStompError(frame)
            // the broker will close the connection
            setError(frame.headers['message'])
        }

        _client.onWebSocketClose = (event) => {
            if (stompOptions.onWebSocketClose) stompOptions.onWebSocketClose(event)
            setConnected(false)
        }

        _client.onWebSocketError = (event) => {
            if (stompOptions.onWebSocketError) stompOptions.onWebSocketError(event)
            const url = event.srcElement?.url
            setError(`WebSocket connection to '${url}' failed`)
        }

        // set up the hooks with the client
        setClient(_client)
        setConnected(false)
        setError(undefined)

        return () => {
            _client.deactivate();
        };
    }, [url, ...Object.values(stompOptions)]);

    const subscribe = (
        destination: string,
        callback: messageCallbackType,
        headers: StompHeaders = {}
    ) => {
        const subscriptionId = Math.random().toString(36).substring(2, 11);
        const subscriptionRequest: StompSessionSubscription = {
            destination,
            callback,
            headers
        };

        subscriptionRequests.current.set(subscriptionId, subscriptionRequest);

        if (client && client.connected) {
            subscriptionRequest.subscription = client.subscribe(
                destination,
                callback,
                headers
            );
        }

        return () => {
            const subscriptionData = subscriptionRequests.current.get(subscriptionId);
            if (subscriptionData?.subscription) {
                subscriptionData.subscription.unsubscribe();
            }
            subscriptionRequests.current.delete(subscriptionId);
        };
    };

    return (
        <StompContext.Provider
            value={{
                client,
                connected,
                error,
                subscribe
            }}
        >
            {children}
        </StompContext.Provider>
    );
}
