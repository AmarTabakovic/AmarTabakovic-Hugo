---
title: "Simple Language Switcher in Laravel"
date: 2021-05-27T10:02:55+02:00
draft: false
description: "How to create a simple language switcher in Laravel 8 and Blade."
author: "Amar Tabakovic"
categories:
- "Web"
keywords:
- "laravel localization"
- "language switcher"
- "laravel language switcher"
---
{{% section %}}
Localization and internationalization are commonplace nowadays and can be quite tricky to implement. Luckily, Laravel has an [integrated localization feature](https://laravel.com/docs/8.x/localization).

{{% /section %}}

{{% section %}}

## Config
First we define the allowed application locales in an array in the app config file.

**config/app.php:**

```php
<?php

return [
    'locales' => [
        'de',
        'fr',
        'it',
        'en',
    ],
    // ...
];
```

{{% /section %}}

{{% section %}}

## Routing

For switching the language we use a single route, which points to the *setLocalization* function in *LocalizationController*, which we will create in a moment.

**routes.php:**
```php
Route::get('/lang/{lang}',[LocalizationController::class, 'setLocalization'])->name('lang');
```

Upon calling e.g. *localhost:8000/lang/de*, the language will be switched to German, as long as you configured it to allow German.

{{% /section %}}

{{% section %}}

## Controller

The controller will contain the logic for switching the current locale session.

First we generate the controller with the following command:

```bash
php artisan make:controller LocalizationController
```

We define the function *setLocalization* in the *LocalizationController*, which checks whether the newly set language is allowed by looping through the config locales array we defined at the beginning. 

If the language exists inside of the locales array, a session variable named *locale* is set with the language code of the newly switched language as the value.

**LocalizationController.php:**

```php
/**
* Checks whether the selected language is allowed and sets
* the session variable 'locale with the selected language.
*
* @param String $lang
* @return Illuminate\Http\Request
*/
public function setLocalization($lang) 
{
    if (in_array($lang, app()->config->get('app.locales'))) 
    {
        Session::put('locale', $lang);
    }
    return redirect()->back();
}
```
{{% section %}}

{{% /section %}}

## Middleware
For the language to persist across different pages, we need to set the locale every time we call a new page. For this we use a single middleware.

First we generate the middleware:
```bash
php artisan make:middleware SetLocalization
```

**SetLocalization.php:**
```php
/**
* Sets the locale of the app with the session variable 'locale'.
*
* @param \Illuminate\Http\Request $request
* @param \Closure $next
* @return mixed
*/
public function handle(Request $request, Closure $next)
{
    if($request->session()->has('locale')) 
    {
        app()->setLocale(Session::get('locale'));
    }
    return $next($request);
}
```
The middleware checks whether the session variable named *locale* exists and updates the locale with the value of the session variable.

Finally we register the middleware.

**kernel.php**:
```php
protected $middlewareGroups = [
    'web' => [
        // ...
        \App\Http\Middleware\SetLocalization::class,
    ],
    // ...
];
```

{{% /section %}}

{{% section %}}

## View

The language switcher will be situated inside of the header. However, you can place the language switcher wherever you like.

**header.blade.php:**

```php
<ul class="navbar-nav ml-auto">
  <!-- Language switcher -->
  @foreach (app()->config->get('app.locales') as $key)
    <li>
      <a class="nav-link {{ app()->getLocale() === $key ? 'locale-active' : '' }}" href="{{ route('lang', $key) }}">
        {{ strtoupper($key) }}
      </a>
    </li>
  @endforeach
</ul>
```

The *locales* array gets looped through and if the key is equal to the current locale, the CSS class *locale-active* is added to the *a*-element so that the current language is highlighted.

And there you have a simple language switcher in Laravel.

{{% /section %}}