# Dummy installation
This is repo is forked from [Zoom-Clone-With-WebRTC](https://github.com/WebDevSimplified/Zoom-Clone-With-WebRTC) and here is the [tutorial video](
https://www.youtube.com/watch?v=DvlyzDZDEq4&t=684s).  
Since I want to deploy this application and access it by IP address or domain name instead of `loaclhost`, I found [this issue](https://github.com/WebDevSimplified/Zoom-Clone-With-WebRTC/issues/23). After a little bit of modification, it works.  

Tested ubuntu-mate 18.04 x86_64, VM Player.
## Dependencies
Install nodejs and npm. It's recommanded to use nodejs 10.x or higher. nodejs LTS(12.x) is selected here.
```bash
sudo apt-get update

# in case you don't have them
sudo apt-get install curl
sudo apt-get openssl

curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash - # this is for 64 bit machine
sudo apt-get install -y nodejs
```
This is necessary:
```bash
npm install socket.io uuid express ejs
npm install --save-dev nodemon
```
And of course clone this repo:
```bash
git clone https://github.com/WebDevSimplified/Zoom-Clone-With-WebRTC
```

## Certificate
If you want to use this application via IP address or domain name instead of `localhost`, this step is necessary. Since most of browsers block media(such as webcam) accessing from unsecure connections, we have to deploy this application with https. Here are commands using `openssl` to generate a key and certificate.
> For windows user, `openssl` is a built-in command in MINGW64 git-bash.
```bash
# generate a key
openssl genrsa -out server-key.pem

# this step will probably ask you to input the information of the signature,
# such as country, company name, etc
openssl req -new -key server-key.pem -out csr.pem

# generate a certificate
openssl x509 -req -days 9999 -in csr.pem -signkey server-key.pem -out server-cert.pem

# optional: we dont need this, but I think it's okay 
rm csr.pem
```

## Run it
```bash
npm run devStart
```