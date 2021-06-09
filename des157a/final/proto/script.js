(function() {
    'use strict'
    console.log("Reading JS");

    const focus = document.querySelector('#focus');
    const polaroids = document.querySelectorAll('.polaroid');
    let inFocus = false;

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

        // Enable focus view of clicked image and disable scroll.
        image.addEventListener('click', function() {
            focus.classList.remove('hidden');
            focus.getElementsByTagName('img')[0].setAttribute('src', imageSrc);
            disableScroll();
            inFocus = true;
        })
    });

    // Disables scroll functionality until enabled.
    function disableScroll() {
        document.body.classList.add('stop-scroll');
    }

    // Enables scroll functionality.
    function enableScroll() {
        document.body.classList.remove('stop-scroll');
    }
} ());