#!/bin/bash

DELAY_SECONDS=10

echo "Sleeping $DELAY_SECONDS before starting"
sleep $DELAY_SECONDS;

echo "Pulling latest changes from git"
git pull

echo "Building"
./gradlew build

echo "Launching application!"
java -jar build/libs/banometer-1.0.jar
