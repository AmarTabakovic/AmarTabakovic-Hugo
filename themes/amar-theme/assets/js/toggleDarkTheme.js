function setTheme(mode) {
    localStorage.setItem("dark-mode-storage", mode);

    if (mode == "dark") {
        document.documentElement.classList += " dark-theme";
    }
    else if (mode == "light") {
        document.documentElement.classList -= " dark-theme";
    }
}

var savedTheme = localStorage.getItem("dark-mode-storage") || '';
setTheme(savedTheme);