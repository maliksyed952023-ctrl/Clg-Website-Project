function showSection(event,id){

let sections=document.querySelectorAll(".section")
sections.forEach(sec=>sec.classList.remove("active"))

document.getElementById(id).classList.add("active")

let buttons=document.querySelectorAll(".main-btn")
buttons.forEach(btn=>btn.classList.remove("active"))

event.currentTarget.classList.add("active")

}

<script>

function showSection(id){

let sections=document.querySelectorAll(".section")

sections.forEach(sec=>sec.classList.remove("active"))

document.getElementById(id).classList.add("active")

}