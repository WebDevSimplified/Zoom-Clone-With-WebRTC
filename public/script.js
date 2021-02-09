const socket = io('/');
const videoGrid = document.getElementById('video-grid');

let myPeer;
if (location.hostname === '192.168.35.115') {
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
} else {
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
myVideo.id = 'local';
let peers = {};
const callList = [];
let localStream;
let getUserMedia =
  navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia;

getUserMedia({ video: true, audio: true }, (stream) => {
  if(typeof localStream == 'undefined'){
    console.log('!')
    localStream = stream
  }
  addVideoStream(myVideo, localStream);
  socket.on('user-connected', (newUserId) => {
    const call = myPeer.call(newUserId, localStream);
    console.log(call)
    const video = document.createElement('video');
    video.id = 'remote';
    call.on('stream', (userVideoStream) => {// call의 remotestreamdl user
      if (!callList[call.peer]) {
        console.log(userVideoStream, 'connect')
        addVideoStream(video, userVideoStream);
        callList[call.peer] = call;
      }
    });
    call.on('close', () => {
      video.remove();
    });
    peers[newUserId] = call;
  });
});

myPeer.on('call', (call) => {
  peers[call.peer] = call;
  getUserMedia({ video: true, audio: true }, function (stream) {
    if(typeof localStream == 'undefined'){
      console.log('!')
      localStream = stream
    }
    console.log(localStream, 'call')
    call.answer(localStream);
    const video = document.createElement('video');
    video.id = 'remote';
    call.on('stream', (userVideoStream) => {
      if (!callList[call.peer]) {
        console.log(userVideoStream, 'uservideo')
        addVideoStream(video, userVideoStream);
        callList[call.peer] = call;
      }
    });
    call.on('close', () => {
      video.remove();
    });
  });
});
//연결을 요청하는 곳에서 받는 call

socket.on('user-disconnected', (userId) => {
  if (peers[userId]) {
    peers[userId].close();
    delete peers[userId];
  }
});

myPeer.on('open', (id) => {
  console.log(id, 'myid');
  socket.emit('join-room', ROOM_ID, id);
});

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

//방설정 버튼
function onClickRoombtn() {
  document.getElementById('room_wrap').style.display ='block';
  document.getElementById('room_bg').style.display ='block';
}   
function offClickRoombtn() {
  document.getElementById('room_wrap').style.display ='none';
  document.getElementById('room_bg').style.display ='none';
}

document.getElementById('room_btn').addEventListener('click', onClickRoombtn);
document.getElementById('room_close').addEventListener('click', offClickRoombtn);

//게임 버튼
function onClickGamebtn() {
  document.getElementById('game_wrap').style.display ='block';
  document.getElementById('game_bg').style.display ='block';
}   
function offClickGamebtn() {
  document.getElementById('game_wrap').style.display ='none';
  document.getElementById('game_bg').style.display ='none';
}

document.getElementById('game_btn').addEventListener('click', onClickGamebtn);
document.getElementById('game_close').addEventListener('click', offClickGamebtn);

let videoStatus = true;
//local과 remote가 서로 달라서 안되는 현상
videoButton.onclick = () => {
  if(videoStatus){
    document.getElementById('local').srcObject.getVideoTracks()[0].enabled = false
    document.getElementById('local').style.display = 'none'
    document.getElementById('videoButton').style.color = 'red'
    videoStatus = !videoStatus;
  }else{
    document.getElementById('local').srcObject.getVideoTracks()[0].enabled = true
    document.getElementById('local').style.display = 'inline'
    document.getElementById('videoButton').style.color = null
    videoStatus = !videoStatus;
  }
};

let audioStatus = true;
audioButton.onclick = () => {
  if(audioStatus){
    document.getElementById('local').srcObject.getAudioTracks()[0].enabled = false
    document.getElementById('audioButton').style.color = 'red'
    audioStatus = !audioStatus;
  }else{
    document.getElementById('local').srcObject.getAudioTracks()[0].enabled = true
    document.getElementById('audioButton').style.color = null
    audioStatus = !audioStatus;
  }
};