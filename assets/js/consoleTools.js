function getBox(width, height) {
    return {
        string: "+",
        style: "font-size: 1px; padding: " + Math.floor(height/2) + "px " + Math.floor(width/2) + "px; line-height: " + height + "px;"
    }
}

console.image = function(url, scale) {
    scale = scale || 1;
    var img = new Image();

    img.onload = function() {
        var dim = getBox(this.width * scale, this.height * scale);
        console.log("%c" + dim.string, dim.style + "background: url(" + url + "); background-size: " + (this.width * scale) + "px " + (this.height * scale) + "px; color: transparent;");
    };

    img.src = url;
};

// console.log("%cStop!", "color: red; font-family: sans-serif; font-size: 4.5em; font-weight: bolder; text-shadow: #000 1px 1px;");

