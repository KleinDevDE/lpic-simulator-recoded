class LanguageManager{
    static currentLangCode = window.localStorage.getItem("langCode") !== null ? window.localStorage.getItem("langCode") : "de_DE";
    static currentLangObject;

    static loadCurrentLangFile(){
        let langFileContent = getContentFromURL('assets/languages/'+this.currentLangCode+".json");
        this.currentLangObject = JSON.parse(langFileContent);
    }

    static getStringByKey(key){
        debug("langKey: " + key);
        return key.split('.').reduce((o,i)=>o[i], this.currentLangObject)
    }

    static setLanguage(langCode){
        this.currentLangCode = langCode;
        window.localStorage.setItem('langCode', langCode);
        this.loadCurrentLangFile();
    }
}
