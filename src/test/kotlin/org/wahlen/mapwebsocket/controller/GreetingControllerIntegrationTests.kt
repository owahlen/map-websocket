package org.wahlen.springwebsocket.controller

import com.fasterxml.jackson.databind.ObjectMapper
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.fail
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.messaging.converter.MappingJackson2MessageConverter
import org.springframework.messaging.simp.stomp.*
import org.springframework.web.socket.WebSocketHttpHeaders
import org.springframework.web.socket.client.WebSocketClient
import org.springframework.web.socket.client.standard.StandardWebSocketClient
import org.springframework.web.socket.messaging.WebSocketStompClient
import org.wahlen.springwebsocket.model.Greeting
import org.wahlen.springwebsocket.model.HelloMessage
import java.lang.reflect.Type
import java.util.concurrent.CountDownLatch
import java.util.concurrent.TimeUnit
import java.util.concurrent.atomic.AtomicReference

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class GreetingControllerIntegrationTests @Autowired constructor(
    val objectMapper: ObjectMapper,
    @Value(value = "\${local.server.port}")
    val port: Int
) {

    private var stompClient: WebSocketStompClient? = null

    private val headers = WebSocketHttpHeaders()

    @BeforeEach
    fun setup() {
        // Mock what usually happens in WebSocketMessagingAutoConfiguration
        val webSocketClient: WebSocketClient = StandardWebSocketClient()
        val messageConverter = MappingJackson2MessageConverter().also { it.objectMapper = objectMapper }
        stompClient = WebSocketStompClient(webSocketClient).also { it.messageConverter = messageConverter }
    }

    @Test
    fun `respond with greeting`() {

        val latch = CountDownLatch(1)

        // used to store a potential Exception in case of a problem in the StompSession
        val failure = AtomicReference<Throwable>()

        // define a test handler for the WebSocket connection that executes code after connecting
        // that is capable of holding potential exceptions
        val handler: StompSessionHandler = object : TestSessionHandler(failure) {

            // callback for code that is executed after the stompClient has established the WebSocket connection
            override fun afterConnected(session: StompSession, connectedHeaders: StompHeaders) {

                // the client subscribes to the topic defined in the GreetingController to capture its output
                // using a modified StompFrameHandler
                session.subscribe("/topic/greetings", object : StompFrameHandler {

                    // invoked before handleFrame(StompHeaders, Object) to determine the
                    // type of Object the payload should be converted to.
                    override fun getPayloadType(headers: StompHeaders): Type {
                        return Greeting::class.java
                    }

                    //
                    override fun handleFrame(headers: StompHeaders, payload: Any?) {
                        assertNotNull(payload)
                        val greeting = payload as Greeting
                        try {
                            // THEN response should be "Hello, Spring!"
                            assertEquals("Hello, Spring!", greeting.content)
                        } catch (t: Throwable) {
                            failure.set(t)
                        } finally {
                            session.disconnect()
                            latch.countDown()
                        }
                    }
                })

                try {
                    // WHEN "Spring" is sent to session
                    session.send("/app/hello", HelloMessage("Spring"))
                } catch (t: Throwable) {
                    failure.set(t)
                    latch.countDown()
                }
            }
        }

        // tell the test stompClient to connect to the WebSocket defined in the WebSocketConfig
        stompClient!!.connectAsync("ws://localhost:{port}/gs-guide-websocket", headers, handler, port)

        val inTime = latch.await(3, TimeUnit.SECONDS)
        if (failure.get() != null) {
            // if there is a stored failure throw this one and ignore any potential timeouts
            throw AssertionError("", failure.get())
        }
        if(!inTime) {
            fail("Greeting not received")
        }
    }

    /**
     * Create a StompSessionHandler that gets notified of transport or message handling failures.
     * It stores Exceptions in the failure variable passed in the constructor.
     */
    private open class TestSessionHandler(private val failure: AtomicReference<Throwable>) :
        StompSessionHandlerAdapter() {

        override fun handleFrame(headers: StompHeaders, payload: Any?) {
            failure.set(Exception(headers.toString()))
        }

        override fun handleException(s: StompSession, c: StompCommand?, h: StompHeaders, p: ByteArray, ex: Throwable) {
            failure.set(ex)
        }

        override fun handleTransportError(session: StompSession, ex: Throwable) {
            failure.set(ex)
        }

    }
}