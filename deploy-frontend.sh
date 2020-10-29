cd frontend || exit && npm run build && cd ..
ssh pi@192.168.86.184 "rm -r ~/banometer/frontend/**"
scp -r frontend/build/** pi@192.168.86.184:~/banometer/frontend/

ssh pi@192.168.86.184 "sudo systemctl restart nginx"
