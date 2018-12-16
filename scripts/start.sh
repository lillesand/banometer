#!/bin/bash

DELAY_SECONDS=$1
sleep ${DELAY_SECONDS};

java -jar build/libs/banometer-1.0.jar
