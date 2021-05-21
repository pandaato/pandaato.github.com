(function() {
    'use strict'
    console.log("Reading JS");

    const links = document.querySelectorAll('#progress-bar a');
    const image = document.querySelector('#sticker');
    const imageFocus = document.querySelector('#sticker-focus');
    const header = document.querySelector('header');
    const startButton = document.querySelector('#start-button');
    const sections = document.querySelectorAll('section');

    let currPageY = window.pageYOffset;
    let currSection = 0;
    let inScroll = false;

    // Sets events for click, mouseover, and mouseout.
    links.forEach(function(item) {
        const link = item.getAttribute('href');

        // Set buttons to act as custom-action links for each section.
        item.addEventListener('click', function(event) {
            event.preventDefault();
            throttleScroll();

            console.log(`Move to section ${link.slice(-1)}`);
            updateProgress(parseInt(link.slice(-1)));
        });

        // Previews updated progress bar (if clicked) upon hover. 
        item.addEventListener('mouseover', function() {
            for (let i = 0; i < links.length; i++) {
                if (i <= parseInt(link.slice(-1))) {
                    links[i].classList.add('progressed');
                } else {
                    links[i].classList.remove('progressed');
                }
            }
        });

        // Returns progress bar state to current progress upon exiting hover.
        item.addEventListener('mouseout', function() {
            for (let i = 0; i < links.length; i++) {
                if (i <= currSection) {
                    links[i].classList.add('progressed');
                } else {
                    links[i].classList.remove('progressed');
                }
            }
        });
    });

    // Moves screen to first sticker section.
    // Also acts as affordance for user to scroll.
    startButton.addEventListener('click', function() {
        updateProgress(1);
    });

    // Resets window to top upon load to avoid weird interactions.
    window.addEventListener('load', function() {
        inScroll = false;
        updateProgress(0);
    })

    // Moves up or down a section depending on scroll-direction.
    document.addEventListener('scroll', function() {
        const newPageY = window.pageYOffset;

        // Throttles scroll event logic.
        if (!inScroll) {
            if (newPageY == currPageY) {
                // Do nothing.
            } else {
                // Scrolling down.
                if (newPageY > currPageY) {
                    console.log('Next section');
                    updateProgress(currSection + 1);
                // Scrolling up.
                } else {
                    console.log('Previous section');
                    updateProgress(currSection - 1);
                }
            }
        }
    });

    //Moves sections, handles image switching, and updates progress bar.
    function updateProgress(newSection) {
        moveToSection(newSection);
        changeImages(newSection);


        // Page height is set to 1800px, with 200px to represent each section.
        // This is done to allow for scroll events while limiting how much the user can scroll.
        currSection = newSection;
        currPageY = 200 * currSection;

        // Delays window scrolling to account for the time it takes to scroll once.
        setTimeout(function() {window.scrollTo(0, currPageY);}, 300);

        throttleScroll();
        disableScroll();
        // Scroll functionality is temporarily disabled to throttle how much the user can scroll.
        setTimeout(enableScroll, 300);

        // Updates progress bar to current progress.
        for (let i = 0; i < links.length; i++) {
            if (i <= currSection) {
                links[i].classList.add('progressed');
            } else {
                links[i].classList.remove('progressed');
            }
        }
    }

    // Swaps sections via changing visibility.
    function moveToSection(newSection) {
        // Special case only for upon loading.
        if (currSection == newSection) {
            // Do nothing.            
        // Moving from header section to a content section.
        } else if (currSection == 0) {
            header.classList.add('hidden');
            sections[newSection - 1].classList.remove('hidden');
        // Moving from a content section to header section.
        } else if (newSection == 0) {
            sections[currSection - 1].classList.add('hidden');
            header.classList.remove('hidden');
        // Moving from a content section to another content section.
        } else {
            sections[currSection - 1].classList.add('hidden');
            sections[newSection - 1].classList.remove('hidden');
        }
    }

    // Swaps images via changing sources and opacity.
    // There are two images: image and imageFocus
    // imageFocus shows up on top but is invisible until a little after
    // a section swap occurs, at which point image crossfades into imageFocus.
    function changeImages(newSection) {
        // Swapping to header section.
        if (newSection == 0) {
            imageFocus.classList.add('hidden');
            image.setAttribute('src', 'images/hydro-1.png');
        } else {
            imageFocus.classList.add('hidden');
            image.setAttribute('src', `images/hydro-${newSection}.png`);
            imageFocus.setAttribute('src', `images/hydro-${newSection}-focus.png`);
            // Allows for delayed crossfading.
            setTimeout(function() {
                imageFocus.classList.remove('hidden');
            }, 300);
        }
    }

    // Limits how often the scroll event is called.
    function throttleScroll() {
        inScroll = true;
        setTimeout(function() {inScroll = false;}, 300);
    }

    // Disables scroll functionality until enabled.
    function disableScroll() {
        document.body.classList.add('stop-scroll');
    }

    // Enables scroll functionality.
    function enableScroll() {
        document.body.classList.remove('stop-scroll');
    }

} ());