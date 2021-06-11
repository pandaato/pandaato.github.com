(function() {
    'use strict'
    console.log("Reading JS");

    const focus = document.querySelector('#focus');
    const caption = document.querySelector('#focus-date');
    let inFocus = false;

    const polaroids = document.querySelectorAll('.polaroid');
    const texts = document.querySelectorAll('#texts p');
    let inScroll = false;
    
    // Exit focus view by clicking outside.
    focus.addEventListener('click', function() {
        if (inFocus) {
            focus.classList.add('hidden');
            enableScroll()
            inFocus = false;
        }
    });

    // Add onClick events to each image.
    polaroids.forEach(function(polaroid) {
        const image = polaroid.getElementsByTagName('img')[0];
        const imageSrc = image.getAttribute('src');
        const pCaption = polaroid.getElementsByTagName('p')[0];

        // Enable focus view of clicked image and disable scroll.
        image.addEventListener('click', function() {
            // Set focus image to clicked image.
            focus.getElementsByTagName('img')[0].setAttribute('src', imageSrc);
            // Set focus caption to clicked image caption.
            caption.textContent = pCaption.textContent;
            focus.classList.remove('hidden');
            disableScroll();
            inFocus = true;
        })
    });

    // Label each text as not in view.
    texts.forEach(function(text) {
        const newPageY = window.pageYOffset;
        text.setAttribute('data-inview', false);
    });

    // Disables scroll functionality until enabled.
    function disableScroll() {
        document.body.classList.add('stop-scroll');
    }

    // Enables scroll functionality.
    function enableScroll() {
        document.body.classList.remove('stop-scroll');
    }

    // Make text slide in if in view.
    document.addEventListener('scroll', function() {
        texts.forEach(function(text) {
            console.log(isInView(text));
            if (isInView(text) && text.getAttribute('data-inview') == 'false') {
                console.log('test');
                text.setAttribute('data-inview', true);
                text.classList.remove('hide-left');
                text.classList.remove('hide-right');
            }
        });
    });

    // Returns true if element is floow in view
    function isInView(element) {
        let rect = element.getBoundingClientRect();

        if (rect.top >= 0 && (rect.bottom <= window.innerHeight - 200)) {
            return true;
        } else {
            return false;
        }
    }

} ());