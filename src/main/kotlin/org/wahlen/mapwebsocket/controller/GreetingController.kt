package org.wahlen.mapwebsocket.controller

import org.springframework.messaging.handler.annotation.MessageMapping
import org.springframework.messaging.handler.annotation.SendTo
import org.springframework.stereotype.Controller
import org.springframework.web.util.HtmlUtils
import org.wahlen.mapwebsocket.model.Greeting
import org.wahlen.mapwebsocket.model.HelloMessage

@Controller
class GreetingController {

    @MessageMapping("/hello")   // if a message is sent to the /hello destination, this method is called
    @SendTo("/topic/greetings") // broadcast the returned Greeting to all subscribers of "/topic/greetings"
    fun greeting(message: HelloMessage): Greeting {
        Thread.sleep(1000) // simulated delay
        return Greeting("Hello, " + HtmlUtils.htmlEscape(message.name) + "!")
    }

}