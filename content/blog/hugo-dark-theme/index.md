---
title: "Dark Mode in Hugo"
date: 2021-05-11T20:17:02+01:00
draft: false
description: "My implementation of a dark mode in Hugo."
author: "Amar Tabakovic"
categories: 
- "Web"
keywords:
- "hugo"
- "dark"
- "theme"
- "mode"

---
{{% section %}}
Not too long ago, I developed my personal website using the static site generator [Hugo](https://gohugo.io/). While coming up with designs for it, I was plagued with the choice of implementing it in either a light theme or a dark theme. I liked both variants, so I was very indecisive until I came up with the following idea: 

**To implement both variants using a dark mode toggler.**

And so I did using HTML, CSS, SCSS and JavaScript.

{{% /section %}}

{{% section %}}

## SCSS

In the **_variables.scss** file, all Sass and CSS variables are defined. 

I originally intended to use Sass variables for storing the theme colors and using them in other *.scss* files, however CSS variables offer much more flexibility for this matter.

In this example I will use the colors black and white.

**_variables.scss:**

```scss
/* --- COLORS --- */
$white: #ffffff;
$black: #000000;

/* --- COLOR STYLING --- */
// Light theme coloring
:root {
    --color-background: #{$white};
    --color-font: #{$black};
}

// Dark theme coloring
.dark-theme {
    --color-background: #{$black};
    --color-font: #{$white};
}
```

You can then use the CSS variables wherever you like.

**_example.scss:**

```scss
body {
    background-color: var(--color-background);
}

p {
    color: var(--color-font);
}
```

{{% /section %}}

{{% section %}}
## HTML
After having defined the styling with SCSS, it was time to implement the toggle in HTML and JS. From here on, some parts of the implementation are taken from [this great article by Radu Matei](https://radu-matei.com/blog/dark-mode/).

For this example, the toggle will be implemented on the landing page However, the same can be done in e.g. *header.html*. The toggle will be a *span* element.

**index.html:**

```html
<span id="dark-mode-toggle">Click me!</span>
```
{{% /section %}}

{{% section %}}
## JavaScript

The **main.js** file gets included in the **baseof.html** partial. The function *setTheme* takes "dark" or "light" as a parameter and adds or removes the CSS class *dark-theme* from the base *html* element, depending on what was given as the parameter. 

Additionally, the parameter value is saved in local storage, so that the selected theme persists across different pages. If there is no value found in local storage, an empty string is set.

**main.js:**

```javascript
function setTheme(mode) {
    localStorage.setItem("dark-mode-storage", mode);

    if(mode == "dark") {
        document.documentElement.classList += " dark-theme";
    }
    else if(mode == "light") {
        document.documentElement.classList -= " dark-theme";
    }
}

var savedTheme = localStorage.getItem("dark-mode-storage") || "";
setTheme(savedTheme);
```

The **toggleDarkTheme.js** file gets included in **index.html**. This file is responsible for catching the event from clicking on the toggle. The function *setTheme* gets called with "light" or "dark" as the parameter, depending on whether the *html* element has the class *dark-theme*.

**toggleDarkTheme.js:**

```javascript
var toggle = document.getElementById("dark-mode-toggle");

toggle.addEventListener("click", () => {
    if (document.documentElement.classList.contains('dark-theme')) {
        setTheme("light");
    } else {
        setTheme("dark");
    }
});
```

{{% /section %}}

{{% section %}}
## Outcome

I am very satisfied with the result. One thing I want to implement further is a default theme, dependant on the system settings.

Here's how it looks on my page:

{{< figure src="imgs/amar-site-dark.gif" title="Dark mode toggler on the landing page" >}}

{{% /section %}}



