const socket = io('/');
const videoGrid = document.getElementById('video-grid');
let myPeer;
alert(location.hostname)
if(location.hostname === '192.168.35.115'){
  myPeer = new Peer({
    config: {
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        {
          urls: 'turn:110.8.201.37:3478?transport=tcp',
          username: 'carking',
          credential: 'carking',
        },
      ],
    },
    host: '192.168.35.115',
    secure: true,
    port: '3001',
    debug: true,
  });
}else{
  myPeer = new Peer({
    config: {
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        {
          urls: 'turn:110.8.201.37:3478?transport=tcp',
          username: 'carking',
          credential: 'carking',
        },
      ],
    },
    host: '110.8.201.37',
    secure: true,
    port: '3001',
    debug: true,
  });
}
const myVideo = document.createElement('video');
myVideo.muted = true;
const peers = {};
let getUserMedia =
  navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia;

getUserMedia({ video: true, audio: true }, (stream) => {
  addVideoStream(myVideo, stream);
  socket.on('user-connected', (userId) => {
    alert(userId);
    console.log(userId, 'remoteid');
    connectToNewUser(userId, stream);
  });
});

myPeer.on('call', (call) => {
  getUserMedia({ video: true, audio: true }, function (stream) {
    call.answer(stream);
    const video = document.createElement('video');
    call.on('stream', (userVideoStream) => {
      addVideoStream(video, userVideoStream);
    });
  });
});

socket.on('user-disconnected', (userId) => {
  if (peers[userId]) peers[userId].close();
});

myPeer.on('open', (id) => {
  console.log(id, 'myid');
  alert(id);
  socket.emit('join-room', ROOM_ID, id);
});

function connectToNewUser(userId, stream) {
  console.log(userId, stream);
  const call = myPeer.call(userId, stream);
  const video = document.createElement('video');
  call.on('stream', (userVideoStream) => {
    console.log(userVideoStream);
    addVideoStream(video, userVideoStream);
  });
  call.on('close', () => {
    video.remove();
  });

  peers[userId] = call;
}

function addVideoStream(video, stream) {
  video.srcObject = stream;
  video.addEventListener('loadedmetadata', () => {
    video.play();
  });
  videoGrid.append(video);
}

myPeer.on('error', (e) => {
  alert(e);
});
