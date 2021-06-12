<a href="https://www.youtube.com/watch?v=DvlyzDZDEq4">
<p align="center">

</p>
<h3 align="center">ZOOM clone with Webrtc</h3>
</a>
<p align="center">A Simple Zoom clone build with socket.io and Webrtc Watch the video tutorial of this project <a href="https://www.youtube.com/watch?v=DvlyzDZDEq4">Here</a></p>

# Dependencies
Following are the dependencies that are required to run this project .<br>
Note : Make sure that you have installed nodejs in your system , if not install it from <a href="https://nodejs.org/en/">Here</a><br>

 1.<b>express</b> - The server we gonna use <br>
 
 2.<b>ejs</b> - As a templating language    <br>
 
 3.<b>socket.io</b>- A channel which allows us to have real time communication with the client and server  <br>
 
 4.<b>uuid</b> -A dependency to create dynamic urls ,so that users can chat in different rooms with unique urls created <br> 
 
 5.<b>nodemon</b>- A dev dependency which allows us to automatically refresh the server 
 
 6.<b>peerjs</b> -Simplifies the peer to peer video communication
 
 
<b>Install the following dependencies using the command below<b> <br>

 <code>npm i express ejs socket.io </code><br>
 
 <code>npm i uuid</code><br>
 
 <code>npm i --save-dev nodemon</code><br>
 
 <code>npm i -g peer</code><br>
 
 <p>Once you install all the dependencies we are ready to start the server </p>
 
 # Running locally
 Start the nodemon server using the following command
 
 <code>npm run devStart </code><br>
 
 Open up new terminal and run the peer server <code>peer --port 3001</code><br>
 
 <p>Navigate to <a href="localhost:300">localhost:3000</a></p>
 
