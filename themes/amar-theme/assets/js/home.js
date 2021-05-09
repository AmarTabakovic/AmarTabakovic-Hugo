var toggle = document.getElementById("dark-mode-toggle");

toggle.addEventListener("click", () => {
    if (document.body.classList.contains('dark-theme')) {
        setTheme("light");
    } else {
        setTheme("dark");
    }
});