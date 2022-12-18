# Kirby Translations

Beta: This is a work in progress port of translations to Kirby 3. The "saved" state of a field is not yet enabled.

![License](https://img.shields.io/badge/License-MIT-green.svg) ![Kirby](https://img.shields.io/badge/Kirby-3.6+-f0c674.svg)

This plugin enhances the translation handling of content pages for [Kirby 3](http://getkirby.com).
By default, it replaces the original language switch by an enhanced one; but you can also use it as a section (and in the future as a field to indicate the translation status).

- The language menu explicitly shows if the translation exists:
  - **RED**: The translated `.txt`-file doesn't exist, the content is not translated in this language.
  - **GREEN**: The translated `.txt`-file exists, the content is translated in this language.
- All languages are always visible, for faster switching between translations.
- For all non-default languages you can:
  - Delete a translation (without deleting the whole page).
  - Resynchronise translations with the default language file (revert).

![Kirby 3 Translations plugin screenshot](https://user-images.githubusercontent.com/7975568/156542901-0b3713af-25a1-4d5b-9df4-2cd5196b2516.gif)

## Requirements

This plugin works with Fiber, so you probably need Kirby 3.6.

Although, there are is a chance that it works on versions below. _(if so, please report back!)_


## Installation

### Download

Download this repository, extract it and drop it into the plugins folder of your Kirby installation.

```
site/plugins/k3-translations
```

### Composer

If you are using Composer, you can install the plugin with

```
composer require daandelange/k3-translations:~0.x.x-beta
```
_Note: While `k3-translations` is still alpha, there is no stable channel for composer, so you need to specify the unstable version._

### Git submodule

```
git submodule add https://github.com/daandelange/k3-translations.git site/plugins/translations
```


## Setup

### Replacing Kirby's native language menu

Within your website project, you can customise the language switching menu in the header by setting the following options:

```php
// Site /site/config/config.php
return [
  'daandelange.translations.options.header.replaceKirbyLanguages': false, // To disable replacing the native lang menu. Default = true.
  'daandelange.translations.options.header.compactMode': true, // To enable a more compact mode (alpha!). Default = false.
  'daandelange.translations.options.header.deletable': false, // To disallow deleting a language. Default = true.
  'daandelange.translations.options.header.revertable': false, // To disallow reverting a language. Default = true.
];
```

### Translations Section

Add the following `section` to your blueprint(s). (optional)

```yaml
sections:
  translations:
    type: translations
```

### Options

The following options are available for any translations section or field:

- Disallow deleting content translations:  
  ```yaml
  deletable: false # default = true
  ```
- Disallow reverting a translation to the default language:  
  ```yaml
  revertable: false # default = true
  ```
- Use a more compact layout:  
  ```yaml
  compactmode: true # default = false
  ```
- Set a custom label:  
  ```yaml
  label: Labelized! # default = [empty]
  ```


## Development

This plugin follows the [standard Kirby PluginKit](https://github.com/getkirby/pluginkit/tree/4-panel) structure, see [their plugin guide](https://getkirby.com/docs/guide/plugins/plugin-setup-basic) for more details on using it.
*These steps are optional, for building development versions.*

If you're using a modified Kirby folder structure, you probably have to fix the relative path to the `kirby` folder in `kirbyup.config.ts` (in the `alias` section).

- Npm requirements (optional) : `npm install -g kirbyup`
- Setup                       : `cd /path/to/website/site/plugins/translations && npm install`
- While developing            : `npm run dev`
- Compile a production build  : `npm run build`
- Update dependencies         : `npm update`
- Composer install & update   : `composer update`

## License

[MIT](https://github.com/daandelange/k3-translations/blob/main/.github/LICENSE)

### Commercial Usage

This plugin is free but if you use it in a commercial project please consider to contribute an improvement, or hire someone to do so.

## Alternatives / Similar
- If you need to sync specific fields between languages, there's the [kirby3-language-sync](https://github.com/sietseveenman/kirby3-language-sync) plugin.
- To get an overview of your pages' translation status in the panel, you can use [k3-translation-status](https://github.com/doldenroller/k3-translation-status).

## Credits

This is a Kirby 3 port of @Flokosiol's [kirby-translations](https://github.com/flokosiol/kirby-translations) _(which is for Kirby 2)_; thanks to him for initiating this plugin ! :)  
Special thanks to all [contributors](https://github.com/daandelange/k3-translations/graph/contributors) as well as the original [kirby2-translations contributors](https://github.com/flokosiol/kirby-translations/graphs/contributors) !