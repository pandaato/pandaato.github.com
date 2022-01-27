(function() {
    'use strict'
    
    const body = document.querySelector('body');
    const sections = document.querySelectorAll('section');
    const button = document.querySelector('button');
    const banner = document.querySelector('#banner');
    let mode = 'sketch';
    let transition = false;
    let transitionID = 0;

    button.addEventListener('click', function() {
        // Cancelling switch of modes
        if (transition) {
            clearTimeout(transitionID);
            button.classList.toggle('transition');
            transition = false;
            return;
        }

        transition = true;
        button.classList.toggle('transition');
        // Delay swapping modes until page is done 'flipping'
        transitionID = setTimeout(function() {
            if (mode == 'sketch') {
                mode = 'neon';
            } else {
                mode = 'sketch';
            }

            button.classList.toggle('transition');
            transition = false;

            body.classList.toggle('neon');
            banner.classList.toggle('neon');
            button.classList.toggle('neon');
            for (const section of sections) {
                section.classList.toggle('neon');
            }
        }, 1000);
    })

    // Set up bars for banner
    const numBars = 500;
    const barWidth = 100 / numBars;

    for (let i = 0; i < numBars; i++) {
        let bar = document.createElement("div");
        bar.classList.add("bar")
        bar.style.width = `${barWidth}%`
        banner.append(bar);
    }

    // Animate bars by assigning random heights
    const maxHeight = banner.clientHeight - 1;
    // The higher this number, the less often bars move
    const frequency = 5;
    function barMove(bar) {
        // Don't animate and wait 0.2s before trying again
        if (Math.floor(Math.random() * frequency) != 0) {
            setTimeout(() => {barMove(bar)}, 200);
            return;
        }

        let transitionLength = Math.random() * 0.8 + 0.2;
        let barHeight = Math.random() * maxHeight + 1;
        bar.style.transition = `${transitionLength}s`;
        bar.style.height = `${barHeight}px`;

        setTimeout(() => {barMove(bar)}, transitionLength * 1000);
    }

    // Start banner animation
    for (let i = 0; i < banner.children.length; i++) {
        barMove(banner.children[i]);
    }

} ());