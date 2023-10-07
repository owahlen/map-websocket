package org.wahlen.springwebsocket

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class MapWebsocketApplication

fun main(args: Array<String>) {
	runApplication<MapWebsocketApplication>(*args)
}
