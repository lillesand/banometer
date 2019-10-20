./gradlew bootJar
scp build/libs/banometer-kotlin.jar pi@192.168.86.22:~/banometer/

# Use if service definition is new or changed:
#scp banometer.service pi@192.168.86.22:~/banometer/
#ssh pi@192.168.86.22 "sudo systemctl daemon-reload"

ssh pi@192.168.86.22 "sudo systemctl restart banometer"
