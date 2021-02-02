(function() {
    'use strict'
    console.log("Reading JS");

    const mlForm = document.querySelector("#mlForm");

    const desserts = document.querySelectorAll("input[type=radio");
    for(const item of desserts) {
        item.onclick = function() {
            document.querySelector('.selected').classList.remove('selected');
            document.querySelector(`[for=${item.id}`).className = "radio selected";
        }
    }
    
    function makeMadLib(input) {
        const mlOutput = document.querySelector("#mlOutput");

        setTimeout(function(){
            const msg = document.createElement("p");
            msg.className = "person1";
            msg.innerHTML = `Hey <b>${input[0]}</b>! Have you tried the <b>${input[8]}</b> from the new place yet?`;
            mlOutput.appendChild(msg);
        }, 1500);

        setTimeout(function(){
            const msg = document.createElement("p");
            msg.className = "person2";
            msg.innerHTML = `Hiiii <b>${input[1]}</b>. And nah, I haven't. How is it? :o`;
            mlOutput.appendChild(msg);
        }, 3000);

        setTimeout(function(){
            const msg = document.createElement("img");
            msg.className = "person1";

            if(input[8] == "ice cream") {
                msg.setAttribute("src", "images/ice-cream.png");
            } else if (input[8] == "crème brûlée") {
                msg.setAttribute("src", "images/creme-brulee.png");
            } else {
                msg.setAttribute("src", "images/cake.png");
            }
            mlOutput.appendChild(msg);
        }, 4500);

        setTimeout(function(){
            const msg = document.createElement("p");
            msg.className = "person1";
            msg.innerHTML = `It's sooo <b>${input[6]}</b>. After trying it I had to <b>${input[5]}</b> a <b>${input[4]}</b> just to calm down.`;
            mlOutput.appendChild(msg);
        }, 6000);

        setTimeout(function(){
            const msg = document.createElement("p");
            msg.className = "person2";
            msg.innerHTML = `Oh dang, I'll have to try it later then haha. Anyways, you still up for <b>${input[2]}</b> later today? I heard there's been a <b>${input[3]} ${input[7]}</b> showing up recently.`;
            mlOutput.appendChild(msg);
        }, 7500);

        setTimeout(function(){
            const msg = document.createElement("p");
            msg.className = "person1";
            msg.innerHTML = `Yeah of course!`;
            mlOutput.appendChild(msg);
            const last = document.createElement("p");
            last.className = "lastmessage";
            mlOutput.appendChild(last);
        }, 9000);
    }

    function transitionScenes() {
        mlForm.className = "transition-hidden";
        document.querySelector('header').className = "transition-hidden";
        document.querySelector('main').className = "transition-madlib";

        setTimeout(function() {
            mlForm.className = "hidden";
            document.querySelector('header').className = "hidden";
            document.querySelector('main').className = "showingmadlib";
        }, 1000);
    }

    function processForm(formData) {
        const input = [];

        for(const field of formData) {
            input.push(field.value);
            field.value = "";
        }

        const radioInput = document.querySelector(".selected").htmlFor;
        input.push(document.getElementById(radioInput).value);

        transitionScenes();
        makeMadLib(input);
    }

    mlForm.onsubmit = function(e) {
        e.preventDefault();

        const formData = document.querySelectorAll("input[type=text");
        processForm(formData);
    }

} ());