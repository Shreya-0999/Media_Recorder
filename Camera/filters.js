let videoBox = document.querySelector("#video_elem");

let brightSlider = document.getElementById("bright");
let brightValue = document.getElementById("bright_value");

let contrastSlider = document.getElementById("contrast");
let contrastValue = document.getElementById("contrast_value");

let saturateSlider = document.getElementById("saturate");
let saturateValue = document.getElementById("saturate_value");

let graySlider = document.getElementById("gray");
let grayValue = document.getElementById("gray_value");

let invertSlider = document.getElementById("invert");
let invertValue = document.getElementById("invert_value");

let hueSlider = document.getElementById("hue");
let hueValue = document.getElementById("hue_value");

let sepiaSlider = document.getElementById("sepia");
let sepiaValue = document.getElementById("sepia_value");

let brightness = 100;
let contrast = 100;
let saturate = 100;
let grayscale = 0;
let invert = 0;
let huerotate = 0;
let sepia = 0;

let newFilter

function updateFilters() {
    
    newFilter = "brightness("+brightness+"%) " 
    + "contrast("+ contrast+"%)"
    + "saturate("+ saturate+"%)"
    + "grayscale("+ grayscale+"%)"
    + "invert("+ invert+"%)"
    + "hue-rotate("+ huerotate+"deg)"
    + "sepia("+ sepia+"%)";

    videoBox.style.filter = newFilter;
}

brightSlider.addEventListener("input", function () {
    brightValue.innerHTML = brightSlider.value + "%";
    brightness = brightSlider.value;
    updateFilters();
})
contrastSlider.addEventListener("input", function () {
    contrastValue.innerHTML = contrastSlider.value + "%";
    contrast = contrastSlider.value;
    updateFilters();
})
saturateSlider.addEventListener("input", function () {
    saturateValue.innerHTML = saturateSlider.value + "%";
    saturate = saturateSlider.value;
    updateFilters();
})
graySlider.addEventListener("input", function () {
    grayValue.innerHTML = graySlider.value + "%";
    grayscale = graySlider.value;
    updateFilters();
})
invertSlider.addEventListener("input", function () {
    invertValue.innerHTML = invertSlider.value + "%";
    invert = invertSlider.value;
    updateFilters();
})
hueSlider.addEventListener("input", function () {
    hueValue.innerHTML = hueSlider.value + "°";
    huerotate = hueSlider.value;
    updateFilters();
})
sepiaSlider.addEventListener("input", function () {
    sepiaValue.innerHTML = sepiaSlider.value + "%";
    sepia = sepiaSlider.value;
    updateFilters();
})