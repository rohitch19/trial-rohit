#!/bin/bash
while true
do
	echo "chat history"
    cat chat.txt
    read -p "You reply : " reply
    echo "Rohit : " $reply >> chat.txt
    
done