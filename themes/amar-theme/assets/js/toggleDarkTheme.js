
function setTheme(mode) {
    localStorage.setItem("dark-mode-storage", mode);

    if (mode == "dark") {
        //darkTheme.disabled = false;
        document.body.classList += " dark-theme";
    }
    else if (mode == "light") {
        document.body.classList -= " dark-theme";
    }
}

var savedTheme = localStorage.getItem("dark-mode-storage") || "";
setTheme(savedTheme);