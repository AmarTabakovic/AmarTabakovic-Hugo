---
title: "How to exit Vim"
date: 2021-03-19T23:51:25+01:00
draft: true
description: "Vim, albeit not very beginner-friendly, can be very useful. This post shows how to exit Vim."
categories: ["Coding"]
---

Many beginners, myself included, have come across the problem of exiting [Vim (VI iMproved)](https://vim.org). However, it's not as difficult as it may seem.

Type the following command in your terminal and hit enter:
{{< highlight viml >}}
:wq
{{< /highlight >}}

This saves whatever file you were currently editing and exits Vim.

For a hard quit, enter the following (Please beware: This deletes any unsaved content, so please proceed with caution):
{{< highlight viml >}}
:q!
{{< /highlight >}}

And that's pretty much it. You should now be wherever you were before entering Vim. 

Take care and enjoy learning Vim.
