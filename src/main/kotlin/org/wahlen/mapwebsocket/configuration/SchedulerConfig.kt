package org.wahlen.mapwebsocket.configuration

import org.springframework.context.annotation.Configuration
import org.springframework.scheduling.annotation.EnableScheduling

/**
 * Enable and configure the @Scheduled annotation for methods in Spring components
 */
@Configuration
@EnableScheduling
class SchedulerConfig
