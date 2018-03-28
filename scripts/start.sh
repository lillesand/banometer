#!/bin/bash

DELAY_SECONDS=$1
sleep $DELAY_SECONDS;

git pull
./gradlew build -x test

java -jar build/libs/banometer-1.0.jar
