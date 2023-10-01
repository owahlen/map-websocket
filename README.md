# Spring Websocket and Kotlin

## Disclaimer
This project is based on
[gs-messaging-stomp-websocket](https://github.com/spring-guides/gs-messaging-stomp-websocket).
Instead of Java it is however written in Kotlin and fixes some minor issues.
The link provides further documentation.

## Getting Started
The service provides a [Stomp](https://stomp.github.io) based WebSocket
endpoint that receives the user's name as a message and returns a
greeting message over a topic to all subscribers in return.

### Run the service
Start the service with the command
```
./gradlew bootRun
```
Then user your browser to open the URL
[http://localhost:8080](http://localhost:8080).
You should be able to connect to the WebSocket with a _Connect_ button.
Now, type in your name and press _Send_.
You should now see a greeting with your name in the list of _Greetings_.

The following picture shows the WebSocket interactions
taken from the Chrome developer console:
![WebSocket Flow](documentation/websocket-flow.png)

### Run all tests with
Test the service with the command:
```
./gradlew test
```
