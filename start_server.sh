#! /bin/bash
export DISPLAY=:0
export `dbus-launch | grep ADDRESS` 
export `dbus-launch | grep PID` 
jackd -d alsa > ~/Desktop/jackd.log 2>&1 &

