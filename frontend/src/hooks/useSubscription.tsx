import { useContext, useEffect, useRef } from 'react';
import StompContext from "../provider/stomp/StompContext";
import { messageCallbackType, StompHeaders } from '@stomp/stompjs';

/**
 *
 * @param destinations The destinations to subscribe to. Can be a string for a single destination or an array of strings for multiple.
 * @param onMessage Callback called when a message arrives for this subscription
 * @param headers Additional Headers for this subscription, consult @stomp/stompjs docs.
 */
export const useSubscription = (
    destinations: string | string[],
    onMessage: messageCallbackType,
    headers: StompHeaders = {}
) => {
    const stompContext = useContext(StompContext);
    const callbackRef = useRef<messageCallbackType>(onMessage);
    const _destinations = Array.isArray(destinations) ? destinations : [destinations];

    callbackRef.current = onMessage;

    useEffect(() => {
        // context is undefined if there is no StompSessionProvider accessor
        if(!stompContext) return

        const cleanUpFunctions: (() => void)[] = [];

        _destinations.forEach((_destination) =>
            cleanUpFunctions.push(
                stompContext.subscribe(
                    _destination,
                    (message) => {
                        callbackRef.current(message);
                    },
                    headers
                )
            )
        );

        return () => {
            cleanUpFunctions.forEach((_cleanUpFunction) => {
                _cleanUpFunction();
            });
        };
    }, [
        Object.values(_destinations).toString(),
        Object.values(headers).toString()
    ]);
}
