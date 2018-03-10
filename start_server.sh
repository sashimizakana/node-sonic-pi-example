#! /bin/bash
export DISPLAY=:0
dbus-launch | grep ADDRESS 
export `dbus-launch | grep ADDRESS` 
dbus-launch | grep PID 
export `dbus-launch | grep PID` 
ruby /opt/sonic-pi/app/server/bin/sonic-pi-server.rb
