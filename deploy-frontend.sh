cd frontend || exit && npm run build && cd ..
scp -r frontend/build/ pi@192.168.86.22:~/banometer/frontend/

# Use if service definition is new or changed:
#scp banometer-frontend.service pi@192.168.86.22:~/banometer/banometer-frontend.service
#ssh pi@192.168.86.22 "sudo systemctl daemon-reload"

ssh pi@192.168.86.22 "sudo systemctl restart banometer-frontend"
