package org.wahlen.springwebsocket.configuration

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.messaging.simp.config.MessageBrokerRegistry
import org.springframework.scheduling.TaskScheduler
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker
import org.springframework.web.socket.config.annotation.StompEndpointRegistry
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer


@Configuration
@EnableWebSocketMessageBroker // enable WebSocket message handling, backed by a message broker
class WebSocketConfig : WebSocketMessageBrokerConfigurer {

    override fun configureMessageBroker(config: MessageBrokerRegistry) {
        // simple memory-based message broker to carry the greeting messages
        // back to the client on destinations prefixed with /topic
        // The taskScheduler is optionally configured and allows clients to request heartbeats
        // with the STOMP CONNECT frame.
        config.enableSimpleBroker("/topic")
            .setTaskScheduler(heartBeatScheduler())

        // designates the /app prefix for messages that are bound for methods annotated with @MessageMapping
        // For example, /app/hello is the endpoint that the GreetingController.greeting() method is mapped to handle.
        config.setApplicationDestinationPrefixes("/app")
    }

    override fun registerStompEndpoints(registry: StompEndpointRegistry) {
        // registers the /gs-guide-websocket endpoint for websocket connections.
        val registration = registry.addEndpoint("/gs-guide-websocket")
        // fixme: CORS should be disabled in a production environment (prod profile)
        registration.setAllowedOrigins("*")
    }

    @Bean
    fun heartBeatScheduler(): TaskScheduler {
        return ThreadPoolTaskScheduler()
    }
}