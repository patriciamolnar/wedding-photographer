window.addEventListener('DOMContentLoaded', setup); 

function setup() {
    //No Outline Unless Tabbing
    document.body.addEventListener('keyup', function(e) {
        if (e.key === 'Tab') {
          document.documentElement.classList.remove('no-focus-outline');
        }
    });
    
    // Mobile Navigation 
    const nav = document.getElementById('nav');
    const header = document.querySelector('header');

    function openCloseNav(e) {
        e.target.classList.toggle("change"); 
        nav.classList.toggle('show');
        nav.classList.toggle('notransition');   
        header.classList.toggle('show');

        const lis = document.querySelectorAll('#nav li'); 

        let num = lis.length; 
        let delay = 0.3;  
        while(num > 0) {
            lis[lis.length - num].style.animationDelay = delay + 's'; 
            num--; 
            delay += 0.3; 
        } 
    }

    const burger = document.querySelector('.burger'); 
    burger.addEventListener('click', function(e) {
        openCloseNav(e);
    }); 

    //close navigation when nav link is clicked on mobile
    function removeStyle() {
        nav.classList.remove('show');
        header.classList.remove('show');
        nav.classList.toggle('notransition');
        document.querySelector('.burger').classList.remove('change');
    }

    const navLinks = document.querySelectorAll('.nav-links');
    navLinks.forEach(navLink => {
        navLink.addEventListener('click', function() {
            if(window.innerWidth < 850) {
                removeStyle(); 
            }
        });
    });


    // Open modal when portfolio image gets clicked 
    function expandImage(e) {
        // get source of the image and append it to modal. 
        if(/image-grid-item/.test(e.target.classList.value)) {
            const src = e.target.children[0].src; 
            const alt = e.target.children[0].alt;
            const modal = e.target.children[2]; 
            //display modal
            const modalImage = modal.children[1];
            modalImage.src = src; 
            modalImage.alt = alt;
            modal.style.display = "block";
            header.style.display = "none";
        } else {
            const modals = document.querySelectorAll('.modal');
            modals.forEach(modal => modal.style.display = "none");
            header.style.display = "flex";
        }
    }

    const images = document.querySelectorAll('.image-grid-item'); 
    images.forEach(image => image.addEventListener('click', 
        function(e) {
            e.stopPropagation();
            expandImage(e);
        })
    ); 

    //Intersection Observer for Pink lines. 
    const lines = document.querySelectorAll('.pink-line'); 

    const appearOptions = {
        threshold: 0, 
        rootMargin: '0px 0px -100px 0px'
    }; 

    const lineOnScroll = new IntersectionObserver(
        function(entries, lineOnScroll) {
            entries.forEach(entry => {
                if(!entry.isIntersecting) { return; }
                else { 
                    entry.target.classList.add('line'); 
                    lineOnScroll.unobserve(entry.target);
                }
            })
        }, appearOptions
    );

    lines.forEach(line => {
        lineOnScroll.observe(line);
    }); 

    //Intersection Observer for appearing text
    const effects = document.querySelectorAll('.effect'); 

    const appearOnScroll = new IntersectionObserver(
        function(entries, appearOnScroll) {
            entries.forEach(entry => {
                if(!entry.isIntersecting) { return; }
                else { 
                    entry.target.classList.add('appear'); 
                    appearOnScroll.unobserve(entry.target);
                }
            })
        }, appearOptions
    );

    effects.forEach(effect => {
        appearOnScroll.observe(effect);
    }); 

    //Desktop Navigation - change colour of nav based on where it is. 
    const welcome = document.querySelector('.welcome');

    const newOptions = {}

    const sectionObserver = new IntersectionObserver( (entries, observer) => {
        entries.forEach(entry => {    
            if(!entry.isIntersecting) {
                header.classList.add('show');
            } else {
                header.classList.remove('show');
            }
        })
    }, 
    newOptions); 

    
    
    // Only observe intersection on desktop version 
    function checkSize() {
        if(window.innerWidth >= 850) {
            sectionObserver.observe(welcome); 
        } else {
            sectionObserver.unobserve(welcome);
            nav.classList.remove('show');
        }
    }

    checkSize();
    window.addEventListener('resize', checkSize);
    window.addEventListener('resize', removeStyle);
}