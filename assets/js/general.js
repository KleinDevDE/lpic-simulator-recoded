window.debugMode = true;
printToDo();
init();


function getContentFromURL(url) {
    return $.ajax({
        type: "GET",
        url: url,
        async: false
    }).responseText;
}

function loadLangStrings() {
    const allElements = document.getElementsByTagName("*");
    $('#title').text(LanguageManager.getStringByKey('pages.' + window.currentPage + '.title'));
    for (let i = 0, max = allElements.length; i < max; i++) {
        let element = allElements[i];
        let langKey = element.getAttribute("langKey");
        if (langKey !== null && langKey !== undefined) {
            langKey = langKey.replaceAll('%page%', window.currentPage)
            element.innerHTML = LanguageManager.getStringByKey(langKey);
        }
    }
}

function changeLanguage(element) {
    $('.languageBar > img').removeClass("selected");
    element.className = "selected";
    LanguageManager.setLanguage(element.getAttribute("langCode"));
    loadLangStrings();
}

function init() {
    // window.history.pushState({}, null, null);
    setTimeout(function () {
        window.addEventListener("popstate", on_popstate);
    }, 100);

    window.onkeydown = function (e) {
        console.log(e);

        if (e.key === 'K' && e.ctrlKey && e.shiftKey){
            console.log("Debug");
            if (window.debugMode){
                window.debugMode = false;
                console.log("Debug Mode disabled!");
            } else {
                window.debugMode = true;
                console.log("Debug Mode enabled!");
            }
        }

        if (e.key === 'F5' && !e.ctrlKey && !e.shiftKey){
            console.log("Reload");
            PageManager.reloadCurrentPage();
            e.returnValue = false;
            return false;
        }
    };

    if (window.debugMode === false){
        //TODO For some production related things
    }
}

function on_popstate(e) {
    let lastPage = lastPages[lastPages.length - 1];
    if (lastPage.lastPage === "" || lastPage.lastPage === null) {
        debug("Skip cause lastPage.lastPage is null");
        debug("lastPage", lastPage);
        return;
    }

    debug("on_popstate | e.state !== null");
    debug('on_popstate | lastPage', lastPage)

    listHistory()
    debug('on_popstate | window.lastPage', window.lastPage)
    debug('on_popstate | window.currentPage', window.currentPage)
    if (lastPage.lastPage === window.lastPage) {
        debug("on_popstate | back");
        // debug('on_popstate | lastPage', lastPage)
        // removeItemOnce(lastPages, lastPage);
        PageManager.openPage(lastPage.lastPage, false);
    } else {
        debug("on_popstate | forward");
        PageManager.openPage(lastPage.lastPage, false);
        // debug('on_popstate | lastPage', lastPage)
    }
}

function listHistory() {
    let i = 0;
    lastPages.forEach(lastPage => {
        debug('listHistory #' + i, lastPage);
        i++;
    })
}

function debug(...objects) {
    if (!window.debugMode) {
        console.log("sdf");
        return;
    }

    if (objects.length === 2) {
        console.log(objects[0], objects[1]);
    } else console.log(...objects);
}

function removeItemOnce(arr, value) {
    const index = arr.indexOf(value);
    if (index > -1) {
        arr.splice(index, 1);
    }
    return arr;
}

function removeItemAll(arr, value) {
    let i = 0;
    while (i < arr.length) {
        if (arr[i] === value) {
            arr.splice(i, 1);
        } else {
            ++i;
        }
    }
    return arr;
}

function printToDo() {
    let todo = [
        "Add better exception handler",
        "Make sure the browser history in this application will work",
        "Implement the questions and the finale overview of all answered questions"
    ];
    console.log("These are ur current ToDo's", todo);
}
