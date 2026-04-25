const counters=document.querySelectorAll(".counter");

counters.forEach(counter=>{
counter.innerText="0";
const update=()=>{
const target=+counter.getAttribute("data-target");
const c=+counter.innerText;
const inc=target/100;

if(c<target){
counter.innerText=Math.ceil(c+inc);
setTimeout(update,20);
}else{
counter.innerText=target;
}
};
update();
});