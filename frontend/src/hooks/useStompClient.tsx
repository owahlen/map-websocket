import {useContext} from 'react'
import StompContext from "../provider/stomp/StompContext"
import {StompSessionProviderContext} from "../provider/stomp/StompSessionProviderContext"

/**
 * Returns the Stomp Client from @stomp/stompjs
 * This will be undefined if the client is currently not connected
 */
export const useStompClient = () => {
    const context = useContext<StompSessionProviderContext | undefined>(
        StompContext
    );
    // context is undefined if there is no StompSessionProvider accessor
    return {
        client: context?.client,
        connected: context?.connected,
        error: context?.error
    }
}
