const $ = (e) => document.querySelector(e);

(function () {
    'use strict';

    // fetch random gif
    for (var i = 1; i < 5; i++) {
        var section   = Math.floor(Math.random() * 4) + 1;
        var images    = Array.from({length: 5}, (e, i) => `section-${section}-${i + 1}`);
        var randImage = images[Math.floor(Math.random() * images.length)];

        $(`.\\5f nav section:nth-child(${section})`).style.setProperty("--img", `url("img/${randImage}.gif")`);
    }

    // search mechanism
    var search  = $('._search');
    var input   = $('._search input[type="text"]');
    var engines = {
        '!g': ['https://google.com/search?q=', 'Google'],
        '!i': ['https://ixquick.com/do/search?q=', 'Ixquick'],
        '!d': ['https://duckduckgo.com/html?q=', 'DuckDuckGo'],
        '!y': ['https://youtube.com/results?search_query=', 'Youtube'],
        '!w': ['https://en.wikipedia.org/w/index.php?search=', 'Wikipedia']
    };

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

            document.querySelectorAll('.search-engines li p').forEach((eng) => {
                var current = eng.parentNode;

                (prefix == eng.innerHTML)
                    ? current.classList.add('active')
                    : current.classList.remove('active');
            });

            if (e.key == "Enter") {
                (prefix.indexOf('!') != 0)
                    // default engine
                    ? (engine = engines['!g'][0],   str = 0)
                    : (engine = engines[prefix][0], str = 3);

                window.location = engine + args.join(' ').substring(str);
            }
        });
    };
})();

