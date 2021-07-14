let backBtn = document.querySelector("#back");
let gfilter = document.querySelector("#gfilter");

backBtn.addEventListener("click",function(){
    window.location.assign("../index.html")
})

gfilter.addEventListener("change", function(e){
    let imageContainer = document.querySelectorAll(".image_container");
    let filter_value = e.target.value;
    console.log(imageContainer.length)

    if(imageContainer){
        if(filter_value === "All"){
            imageContainer.forEach((container)=>{
                container.style.display = "flex";
            })
        }else{
            imageContainer.forEach((container)=>{
                if(filter_value === container.classList[1]){
                    container.style.display = "flex";
                }else{
                    container.style.display = "none";
                }
            })
        }
    }
})