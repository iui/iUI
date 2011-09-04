#!/bin/sh
if [ -n "$1" ] ; then
URL=$1
else
URL="http://iui-js.appspot.com"
fi
curl -w "\ntime_total = %{time_total}\n\n" $URL -o /dev/null
