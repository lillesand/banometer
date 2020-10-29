./gradlew bootJar
scp build/libs/banometer-kotlin.jar pi@192.168.86.184:~/banometer/

# Use if service definition is new or changed:
#scp banometer.service pi@192.168.86.184:~/banometer/
#ssh pi@192.168.86.184 "sudo systemctl daemon-reload"

ssh pi@192.168.86.184 "sudo systemctl restart banometer"
