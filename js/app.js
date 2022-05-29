

const sections = document.getElementsByClassName('section-container');
myfun(sections);

function myfun(sections){
    const frg=document.createDocumentFragment();
    let i=0;
    while(i< sections.length){
        addCollapseToSection(sections[i]);
        let section=document.getElementById(`section${i+1}`);
        frg.appendChild(creatNavLink(section));
        i++;
    };

    const navLst= document.querySelector("#navbar-list");
    navLst.appendChild(frg);
    createScrollbtn();
};



function addCollapseToSection(section){
    section.addEventListener('click',function(){
        this.querySelector('h2').classList.toggle('active');
        console.log(this)

        var content=this.lastElementChild;
        console.log(content)
        if(content.style.display === 'block'){
            content.style.display = 'none';
        }
        else{
            content.style.display = 'block';
        }
    })
};

function creatNavLink(section){
    let navLink=document.createElement('li');
    let lnkId=section.getAttribute('id');
    let lnkName=section.getAttribute('data-nav');
    navLink.innerHTML= `<a class="menu-link" href="#${lnkId}">${lnkName}</a>`;
    return navLink;
};

function createScrollbtn(){
    let scrollBtn= document.createElement('button');
    scrollBtn.setAttribute('class','scroll-btn')
    let spanText=document.createElement('span')
    spanText.textContent="Scroll Up";
    scrollBtn.appendChild(spanText)
    scrollBtn.setAttribute("id","scroll-up-btn");
    scrollBtn.setAttribute("class","scroll-btn");
    document.querySelector('main').appendChild(scrollBtn);
    console.log(scrollBtn)
    scrollBtn.addEventListener('click',function(){
        event.preventDefault();
        document.querySelector('header').scrollIntoView({behavior:"smooth"});
    });
};

function inViewPort(section){
    const bounding= section.getBoundingClientRect();
    let isViewPort=(bounding.top>=0 && bounding.left>=0 && 
        bounding.bottom<=(window.innerHeight||document.documentElement.clientHeight)
        && bounding.right<=(window.innerWidth||document.documentElement.clientWidth));
    
    return isViewPort;
};

function setActiveClass(){
    const sectionList=document.querySelectorAll('section');

    for(sec of sectionList){
        
        if(inViewPort(sec)){
            sec.classList.add('your-active-section')
        }
        else{
            sec.classList.remove('your-active-section')
        };
    };
};


let navUL=document.getElementById("navbar-list");
navUL.addEventListener('click', function(event){
    scrollToSection(event)
});

function scrollToSection(event){
    let sectionId=event.target.getAttribute('href');
    let sectionToScroll=document.getElementById(sectionId);
    if(sectionToScroll){
        sectionToScroll.scrollIntoView();
    };
};

var isStopScrolling;

document.addEventListener('scroll', function(){

    setActiveClass()

    let navhidden=document.querySelector('.page-header')
    navhidden.style.position="fixed"
    isStopScrolling=setTimeout(function(){
        navhidden.style.position="relative"
    },1000)
}) 










