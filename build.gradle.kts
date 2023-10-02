import org.jetbrains.kotlin.gradle.tasks.KotlinCompile
import org.siouan.frontendgradleplugin.infrastructure.gradle.InstallFrontendTask
import org.springframework.boot.gradle.tasks.run.BootRun
import java.nio.file.Files
import kotlin.io.path.Path

plugins {
    id("org.springframework.boot") version "3.1.4"
    id("io.spring.dependency-management") version "1.1.3"
    id("org.siouan.frontend-jdk17") version "8.0.0"
    kotlin("jvm") version "1.8.22"
    kotlin("plugin.spring") version "1.8.22"
}

group = "org.wahlen"
version = "0.0.1-SNAPSHOT"

frontend {
    nodeVersion.set("18.18.0")
    assembleScript.set("run build")
    cleanScript.set("run clean")
    checkScript.set("run test")
    verboseModeEnabled.set(true)
    packageJsonDirectory.set(project.layout.projectDirectory.dir("frontend"))
}

java {
    sourceCompatibility = JavaVersion.VERSION_17
}

repositories {
    mavenCentral()
}

dependencies {
    implementation("org.springframework.boot:spring-boot-starter-websocket")
    implementation("org.jetbrains.kotlin:kotlin-reflect")
    implementation("com.fasterxml.jackson.module:jackson-module-kotlin")
    testImplementation("org.springframework.boot:spring-boot-starter-test")
    testRuntimeOnly("org.junit.platform:junit-platform-launcher")
}

tasks.withType<KotlinCompile> {
    kotlinOptions {
        freeCompilerArgs += "-Xjsr305=strict"
        jvmTarget = "17"
    }
}

tasks.withType<Test> {
    useJUnitPlatform()
}

tasks.getByName<BootRun>("bootRun") {
    val ciPlatformPresent = providers.environmentVariable("CI").isPresent()
    if(!ciPlatformPresent) {
        // bootRun shall load static resources from their source location
        sourceResources(sourceSets["main"])
    }
}

tasks.named<InstallFrontendTask>("installFrontend") {
    val ciPlatformPresent = providers.environmentVariable("CI").isPresent()
    val frontendDir = "${projectDir}/frontend"
    val lockFilePath = "${frontendDir}/yarn.lock"
    val retainedMetadataFileNames: Set<String>
    if (ciPlatformPresent) {
        retainedMetadataFileNames = setOf(lockFilePath)
    } else {
        // The naive configuration below allows to skip the task if the last successful execution did not change neither
        // the package.json file, nor the lock file, nor the node_modules directory. Any other scenario where for
        // example the lock file is regenerated will lead to another execution before the task is "up-to-date" because
        // the lock file is both an input and an output of the task.
        retainedMetadataFileNames = mutableSetOf("${frontendDir}/package.json")
        if (Files.exists(Path(lockFilePath))) {
            retainedMetadataFileNames.add(lockFilePath)
        }
        outputs.file(lockFilePath).withPropertyName("lockFile")
    }
    inputs.files(retainedMetadataFileNames).withPropertyName("metadataFiles")
    outputs.dir("${frontendDir}/node_modules").withPropertyName("nodeModulesDirectory")
}
