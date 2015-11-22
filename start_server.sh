#! /bin/bash
export DISPLAY=:0
export `dbus-launch | grep ADDRESS` 
export `dbus-launch | grep PID` 
jackd -d alsa > $(dirname $0)/log/jackd.log 2>&1 &

