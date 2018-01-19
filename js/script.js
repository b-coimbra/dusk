const $  = (e) => document.querySelector(e);
const $A = (e) => document.querySelectorAll(e);

(function () {
    'use strict';

    function engines () {
        return {
            '!g': ['https://google.com/search?q=', 'Google'],
            '!i': ['https://ixquick.com/do/search?q=', 'Ixquick'],
            '!d': ['https://duckduckgo.com/html?q=', 'DuckDuckGo'],
            '!y': ['https://youtube.com/results?search_query=', 'Youtube'],
            '!w': ['https://en.wikipedia.org/w/index.php?search=', 'Wikipedia']
        };
    }

    // +--------+
    // | IMAGES |
    // +--------+
    setInterval(() => {
        for (var i = 1; i < 5; i++) {
            var section   = Math.floor(Math.random() * 4) + 1;
            var images    = Array.from({length: 5}, (e, i) => `section-${section}-${i + 1}`);
            var randImage = images[Math.floor(Math.random() * images.length)];
            var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

            $(`.\\5f nav section:nth-child(${section})`).style.setProperty("--img", `url("${isFirefox ? '../' : './'}img/${randImage}.gif")`);
        }
    }, 5000);

    // +--------+
    // | SEARCH |
    // +--------+
    var search  = $('._search');
    var input   = $('._search input[type="text"]');
    var engines = engines();

    for (var key in engines)
        $('.search-engines').innerHTML += `<li><p title="${engines[key][1]}">${key}</p></li>`;

    document.onkeypress = (e) => {
        if (e.key == 's')
            search.setAttribute("style", "top: 10%; opacity: 1; visibility: visible;");

        input.focus();
        input.scrollIntoView();

        search.addEventListener("keyup", (e) => {
            var args   = e.target.value.split(' ');
            var prefix = args[0];
            var engine = engines['!g'][0]; // default engine
            var str    = 0;

            $A('.search-engines li p').forEach((eng) => {
                var current = eng.parentNode;

                (prefix == eng.innerHTML)
                    ? current.classList.add('active')
                    : current.classList.remove('active');
            });

            if (e.key == "Enter") {
                if (prefix.indexOf('!') == 0)
                    (engine = engines[prefix][0], str = 3);

                window.location = engine + args.join(' ').substr(str).toString().replace(/\s+/m, '%20');
            }
        });
    };

    // +-------+
    // | CLOCK |
    // +-------+
    var date  = new Date();
    var month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var days  = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    let setTime = (div, time) => { div.innerHTML += time; };

    setTime($('.day'),  days[date.getDay()].substr(0, 3));
    setTime($('.hour'), date.getHours() + '\'');
    setTime($('.mins'), date.getMinutes());
})();
