let mainArea = document.querySelector(".main_area");

let galleryCard = document.querySelector("#gallery");
let cameraCard = document.querySelector("#camera");
let screenRecCard = document.querySelector("#screenRec");
let cards = document.querySelectorAll(".card");

let popMsg = document.querySelector("#popUpMsg");
let popwindow = document.querySelector("#popup_window");
let textBox = document.querySelector("#textBox");
let enterBtn = document.querySelector(".enter");

for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener("click", function () {
        cards[i].classList.add("activeCard");
        setTimeout(function () {
            cards[i].classList.remove("activeCard");
        }, 150);
    })
}

galleryCard.addEventListener("click", function () {
    window.location.assign("./Gallery/g_index.html")
})
cameraCard.addEventListener("click", function () {
    window.location.assign("./Camera/c_index.html")
})

let letraints = {
    video: { mediaSource: "screen" }
}
let buffer = [];
let recordState = false;
let mediaRecorder;
screenRecCard.addEventListener("click", async function (e) {
    await navigator.mediaDevices.getDisplayMedia(letraints)
        .then(function (mediaStream) {
            mediaRecorder = new MediaRecorder(mediaStream);
            mediaRecorder.addEventListener("dataavailable", function (e) {
                buffer.push(e.data);
            })
            mediaRecorder.addEventListener("stop", function () {
                popwindow.classList.add("show");
                mainArea.style.opacity = 0.5;
                popUpWindow();
                popUpMsg();
            })
        }).catch(function (err) {
            console.log(err)
        });

    if (recordState == false) {
        mediaRecorder.start();
        recordState = true;
    } else {
        mediaRecorder.stop();
        recordState = false;
    }

})

function findDate() {
    let date = new Date();
    let str = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
    return str;
}

function popUpMsg() {
    popMsg.className = "show";
    setTimeout(function () { popMsg.className = popMsg.className.replace("show", ""); }, 2000);
}

function popUpWindow() {
    enterBtn.addEventListener("click", function () {
        let mediaName = textBox.innerText;
        let date = findDate();
        let blob = new Blob(buffer, { type: 'screenRec/mp4' });
        addMedia(blob, "scrvideo", mediaName, date);
        buffer = [];
        mainArea.style.opacity = 1;
        popwindow.classList.remove("show");
    })
}