# Dummy installation
This is repo is forked from [Zoom-Clone-With-WebRTC](https://github.com/WebDevSimplified/Zoom-Clone-With-WebRTC) and here is the [tutorial video](
https://www.youtube.com/watch?v=DvlyzDZDEq4&t=684s).  
Since I want to deploy this application and access it by IP address or domain name instead of `loaclhost`, I found [this issue](https://github.com/WebDevSimplified/Zoom-Clone-With-WebRTC/issues/23). After a little bit of modification, it works.  

Tested on ubuntu-mate 18.04 x86_64, VM Player and windows 10, baremetal.
## Dependencies
- Of course clone this repo:
  ```bash
  git clone https://github.com/WebDevSimplified/Zoom-Clone-With-WebRTC
  ```
- Install `nodejs` and `npm`  
  It's recommanded to use nodejs 10.x or higher. nodejs LTS(12.x) is selected here.  
  For windows user, please refer: [official download page](https://nodejs.org/en/download/).  
  ```bash
  sudo apt-get update

  # in case you don't have them
  sudo apt-get install curl

  curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash - # this is for 64 bit machine
  sudo apt-get install -y nodejs
  ```
- Packages of `nodejs`  
  It's recommanded that windows user run these commands as administrator to prevent some magic bugs.
  ```bash
  npm install
  npm install --save-dev nodemon
  ```

## Certificate
If you want to use this application via IP address or domain name instead of `localhost`, this step is necessary. Since most of browsers block media(such as webcam) accessing from unsecure connections, we have to deploy this application with `HTTPS`. This repo comes with the key I generated. You can use it if you don't have `openssl` installed. Yet it's recommanded to generate your own key.  
Here are commands using `openssl` to generate a key and certificate:
> For windows user, `openssl` is a built-in command in MINGW64 git-bash.
> For Linux user, just run these commands in termial.
```bash
# install openssl if you don't have it
sudo apt-get install openssl
```

```bash
# generate a key
openssl genrsa -out server-key.pem

# this step will probably ask you to input the information of the signature,
# such as country, company name, etc
openssl req -new -key server-key.pem -out csr.pem

# generate a certificate
openssl x509 -req -days 9999 -in csr.pem -signkey server-key.pem -out server-cert.pem

# optional: we dont need this, but I think it's okay to keep it
rm csr.pem
```

## Run it
```bash
sudo npm run devStart
```
And you can enter 
```
https://your.IP.addr/
```
in your borwser. It's likely to have a warning `NET::ERR_CERT_AUTHORITY_INVALID` or somthing like that. For Chrome, just click *Advance*, *Continue...*  
It will automatically generate a uuid and redirect you to your chatting room. For anyone want to join you, you can just share the url of your chatting room.
