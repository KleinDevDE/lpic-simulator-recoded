window.currentPageData = {};
window.lastPage = '';
window.currentPage = '';
lastPages = [];

class PageManager {
    static #regex_JSCode = /<%.*%>/mg;
    static #regex_LangPlaceHolders = /\|.*\|/mg;

    static openPage(page, addToHistory = true){
        window.lastPage = window.currentPage;
        window.currentPage = page;
        let pageContent = getContentFromURL('assets/pages/' + page + ".html");
        document.getElementById('pageContent').innerHTML = pageContent;

        //FIXME HACK! - If u run JS-Code in the <% %> tag which are interacting with elements in the template file
        //  It will fail cause the JS Code will run BEFORE the elements are set.
        //  So this here will set  the elements, and then re-set them with executing the JS-Codes in the <% %> tags
        document.getElementById('pageContent').innerHTML = this.#parseFile(pageContent);
        loadLangStrings();
        if (addToHistory) {
            this.#addCurrentPageToHistory();
        }
        // listHistory();
    }

    static #parseFile(fileContent = ""){
        fileContent = this.#parseJSCode(fileContent)
        fileContent = this.#parseLangCode(fileContent)
        return fileContent;
    }

    static reloadCurrentPage(){
        this.openPage(window.currentPage, false);
    }

    static #parseJSCode(fileContent = ""){
        let matches = fileContent.match(this.#regex_JSCode);
        if (matches === null){
            return fileContent;
        }

        matches.forEach(match => {
            let code = String(match).replace("<%", "").replace("%>", "");
            try {
                let result = eval(code);
                debug("match", match);
                debug("code", code);
                debug("result", result);
                fileContent = fileContent.replace(match, result);
            } catch (e) {
                debug("PageManager::#parseJSCode", e);
                //TODO May add better Error handling
                return fileContent;
            }
        });
        return fileContent;
    }

    static #parseLangCode(fileContent = ""){
        let matches = fileContent.match(this.#regex_LangPlaceHolders);
        if (matches === null){
            return fileContent;
        }

        matches.forEach(match => {
            let key = String(match).replaceAll("|", "");
            try {
                let result = LanguageManager.getStringByKey(key);
                // debug("match", match);
                // debug("key", key);
                // debug("result", result);
                fileContent = fileContent.replace(match, result);
            } catch (e) {
                debug("ERROR | PageManager::#parseLangCode", e);
                //TODO May add better Error handling
                return fileContent;
            }
        });
        return fileContent;
    }

    static #addCurrentPageToHistory() {
        let data = {
            newPage: window.currentPage,
            lastPage: window.lastPage,
            time: new Date().getTime(),
            data: window.currentPageData
        };
        debug("addCurrentPageToHistory | data", data);
        lastPages.push(data);
    }
}
