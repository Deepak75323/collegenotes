const navmenu=document.getElementById('sidebar'),
navToggle=document.getElementById('nav-toggle'),
navClose=document.getElementById('nav-close');


if(navToggle)
{ 
navToggle.addEventListener("click",()=>
{ 
navmenu.classList.add("show-sidebar");

})}

if(navClose)
{ 
navClose.addEventListener("click",()=>
{ 
navmenu.classList.remove("show-sidebar");

})}



var mixerBlog = mixitup('.work__container', {
    selectors: {
        target: '.work__card'
    },
    animation: {
        duration: 300
    }
});








const linkwork=document.querySelectorAll(".work__item");
// console.log(linkwork);
      


// const workactive= document.getElementsByClassName("active-work")
// console.log(workactive);


  function check(e)
  {
    
    for(let values of linkwork)
        {
          // console.log(values);
          if(values.classList.contains('active-work'))
          {
            values.classList.remove('active-work');
          }
        }

        if(e.target.classList.add('active-work'));


  }

  for(let values of linkwork)
  {

    values.addEventListener('click',check);

  }