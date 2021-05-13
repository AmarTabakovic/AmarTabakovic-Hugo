
function setTheme(mode) {
    localStorage.setItem("dark-mode-storage", mode);

    if (mode == "dark") {
        //darkTheme.disabled = false;
        document.documentElement.classList += " dark-theme";
    }
    else if (mode == "light") {
        document.documentElement.classList -= " dark-theme";
    }
}

var savedTheme = localStorage.getItem("dark-mode-storage") || '';
console.log(savedTheme);
setTheme(savedTheme);