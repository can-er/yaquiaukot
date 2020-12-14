#!/usr/bin/env python
"""
Date: 15-12-2020
Author:KORKUT Caner
Tested on a Raspberry Pi 4 under Raspbian
"""
import sys
import subprocess
import os
import socket
import requests

s = socket.socket()
raw_data = subprocess.check_output(["sudo iw wlan0 station dump"], shell = True).decode(sys.stdout.encoding).split("\n")
data_to_send = ""
connected_devices = []

for elem in raw_data:
        if "Station" in elem:
                connected_devices.append(elem.split()[1])
                #r = requests.post(url = "http://yaquiaukot.ddns.net:9876", data = {"name":elem.split()[1]+"\n"})
                print(elem.split()[1]+"\n")

for devices in connected_devices:
        data_to_send += devices+";"
r = requests.post(url = "http://yaquiaukot.ddns.net:9876", data = {"devices":data_to_send}) 