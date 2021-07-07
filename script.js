let galleryCard = document.querySelector("#gallery");
let cameraCard = document.querySelector("#camera");
let screenRecCard = document.querySelector("#screenRec");
let cards = document.querySelectorAll(".card");
let popMsg = document.querySelector("#popUpMsg");
for(let i = 0; i < cards.length; i++){
    cards[i].addEventListener("click", function(){
        cards[i].classList.add("activeCard");
        setTimeout(function(){
            cards[i].classList.remove("activeCard");
        }, 150);
    })
}

galleryCard.addEventListener("click",function(){
    window.location.assign("./Gallery/g_index.html")
})
cameraCard.addEventListener("click",function(){
    window.location.assign("./Camera/c_index.html")
})

let letraints = {
    video: { mediaSource: "screen" }
}
let buffer = [];
let recordState = false;
let mediaRecorder;
screenRecCard.addEventListener("click", async function(e){
    await navigator.mediaDevices.getDisplayMedia(letraints)
    .then(function(mediaStream){
        mediaRecorder = new MediaRecorder(mediaStream);
        mediaRecorder.addEventListener("dataavailable", function (e) {
            buffer.push(e.data); 
        })
        mediaRecorder.addEventListener("stop", function () {
            let blob = new Blob(buffer, { type: 'screenRec/mp4' });
            let date = findDate();
            addMedia(blob, "video", "screenRec",date);
            buffer = [];
            popUpMsg();
        })
    }).catch(function(err) {
        console.log(err)
    });

    if(recordState == false){
        mediaRecorder.start();  
        recordState = true;
    } else {
        mediaRecorder.stop();
        recordState = false;
    }

})

function findDate(){
    let date = new Date();
    let str = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
    return str;
}

function popUpMsg() {
    popMsg.className = "show";
    setTimeout(function(){ popMsg.className = popMsg.className.replace("show", ""); }, 1000);
}