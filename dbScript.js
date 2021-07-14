let request = indexedDB.open("Media", 1);
let db;

request.onsuccess = function () {
    db = request.result;
}
request.onerror = function (e) {
    console.log(e);
}
request.onupgradeneeded = function () {
    db = request.result;
    db.createObjectStore("gallery", { keyPath: "mId" });
}

function addMedia(data, type, mediaName, date) {
    let tx = db.transaction("gallery", "readwrite");
    let gallery = tx.objectStore("gallery");
    gallery.add({ mId: Date.now(), type, media: data, mediaName: mediaName, date:date })
}

function viewMedia() {
    let mediaArea = document.querySelector("#media_area")
    let tx = db.transaction("gallery", "readwrite");
    let gallery = tx.objectStore("gallery");
    let reqCursor = gallery.openCursor();
    reqCursor.onsuccess = function (e) {
        let cursor = reqCursor.result;
        if (cursor) {
            let imageContainer = document.createElement("div");
            imageContainer.setAttribute("class", "image_container");
            imageContainer.setAttribute("data_mId", cursor.value.mId);

            if (cursor.value.type == "img") {
                imageContainer.classList.add("image");
                imageContainer.innerHTML = `
                <div class = "date">
                    ${cursor.value.date}
                </div>
                <div class="media_box">
                    <img src="${cursor.value.media}" alt="">
                </div> 
                <div class="function_box">
                    <div class= "display">
                        <div class = "displayName" id ="displayName">${cursor.value.mediaName}</div>
                    </div>
                    <div class="download dbtn" id="download">
                        <i class="far fa-save"></i>
                    </div>
                    <div class="delete dbtn" id="delete">
                        <i class="far fa-trash-alt"></i>
                    </div>
                </div>`;
            }
            else {
                cursor.value.type == "scrvideo" ? 
                imageContainer.classList.add("scrvideo") : 
                imageContainer.classList.add("video");
                imageContainer.innerHTML = `
                <div class = "date">
                    ${cursor.value.date}
                </div>
                <div class="media_box">
                    <video src="" id = "video"></video>
                </div> 
                <div class="function_box">
                    <div class= "display">
                        <div class = "displayName" id = "displayName">${cursor.value.mediaName}</div>
                    </div>
                    <div class="download dbtn" id="download">
                        <i class="far fa-save"></i>
                    </div>
                    <div class="delete dbtn" id="delete">
                        <i class="far fa-trash-alt"></i>
                    </div>
                </div>`;

                let video = imageContainer.querySelector("#video");
                video.src = window.URL.createObjectURL(cursor.value.media);
                video.autoplay = true;
                video.controls = true;
                video.loop = true;
            }
            let deleteBtn = imageContainer.querySelector("#delete");
            deleteBtn.addEventListener("click", deleteMedia);

            let downloadBtn = imageContainer.querySelector("#download");
            downloadBtn.addEventListener("click",function(e){
                let target = e.currentTarget;
                downloadMedia(target, cursor.value.mediaName);
            })

            let displayName = imageContainer.querySelector("#displayName");
            displayName.addEventListener("click",function(){
                let newName = displayName.innerText;
                cursor.value.mediaName = newName;
            })

            mediaArea.appendChild(imageContainer);

            cursor.continue();
        }
    };
}

function deleteMedia(e) {
    let mId = e.currentTarget.parentNode.parentNode.getAttribute("data_mId");
    let tx = db.transaction("gallery", "readwrite");
    let gallery = tx.objectStore("gallery");
    gallery.delete(Number(mId));
    e.currentTarget.parentNode.parentNode.remove();
}

function downloadMedia(target, mediaName) {
    let a = document.createElement("a");
    a.href = target.parentNode.parentNode.children[1].children[0].src;
    if (target.parentNode.parentNode.children[1].children[0].nodeName == "IMG") {
        a.download = mediaName + ".png";
    } else {
        a.download = mediaName + ".mp4";
    }
    a.click();
    a.remove();
}