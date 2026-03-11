function toggleMenu(menuId, element){

let menu=document.getElementById(menuId)

if(menu.style.display==="block"){
menu.style.display="none"
element.querySelector(".arrow").innerHTML="▶"
}
else{
menu.style.display="block"
element.querySelector(".arrow").innerHTML="▼"
}

}

function showSection(id){

let sections=document.querySelectorAll(".section")

sections.forEach(sec=>sec.classList.remove("active"))

document.getElementById(id).classList.add("active")

}

function scrollEvents(direction){

let container=document.getElementById("eventsScroll")

container.scrollLeft += direction * 300

}