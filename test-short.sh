#!/bin/bash

APIKEY=AIzaSyD5CsWsgMIzILGVerPpTXFqu2uZYmfSbhk
#AIzaSyBq0kfiDGoIyDJpS0Yf8kj8QQmLh7YwjY8
#curl -XPOST -H 'Content-type: application/json' -d '{longUrl:"http://repubblica.it"}' https://www.googleapis.com/urlshortener/v1/url?key=$APIKEY

curl -XPOST -H 'Content-type: application/json' -d '{longUrl:"http://repubblica.it"}' "http://localhost:8080/http_proxy/proxy/?url=https%3A//www.googleapis.com/urlshortener/v1/url%3Fkey%3D$APIKEY"
#curl "http://localhost:8080/http_proxy/proxy/?url=https%3A//www.googleapis.com/urlshortener/v1/url%3Fkey%3D$APIKEY&longUrl%3Dhttp%3A//repubblica.it"