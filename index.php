<?php

namespace daandelange\Translations;

@include_once __DIR__ . '/vendor/autoload.php';

use \Kirby\Cms\App;
use I18n;
use daandelange\Translations\TranslationsHelper as Th;
use \Kirby\Toolkit\F;
use \Kirby\Toolkit\Str;

App::plugin('daandelange/translations', [
    'options' => [
        'header' => [
            'replaceKirbyLanguages' => true,
            'compactMode' => true,
            'deletable' => true,
            'revertable' => true,
            'showEditLanguage' => true,
        ],
    ],
    'pageMethods' => [
        // Provides a way to define if translated without loading the content (faster)
        'isTranslated' => function(bool|array|string $langCode=false) : bool {
            if( !kirby()->multilang() ) return false;

            // Parse arguments to array
            if( is_string($langCode)){
                $langCode = [$langCode];
            }
            // True = Check if fully translated (all langs)
            elseif( $langCode === true ){
                $langCode = kirby()->languages()->pluck('code', null, true);
            }
            else {
                // Default value = current language
                $langCode = [ kirby()->language()->code() ];
            }
            if( count($langCode) == 0 ) return false;

            // Check translations
            $translated = true;
            //$contentFiles = $this->contentFiles(); // Returns unexisting content too...
            foreach($langCode as $lang){
                $contentFile = $this->contentFile($lang); // Can throw if lang doesn't exist.
                //if(!in_array($contentFile, $contentFiles)) $translated = false;
                if( !file_exists($contentFile) ) $translated = false;
            }
            return $translated;
        }
    ],
    'sections' => [
        'translations' => [
            'props' => [
                'deletable' => function (?bool $deletable = null) {
                    if($deletable==null) return $this->kirby()->option('daandelange.translations.header.deletable'); // If blueprint not set, use global setting
                    return $deletable;
                },
                'revertable' => function (?bool $revertable = null) {
                    if($revertable==null) return $this->kirby()->option('daandelange.translations.header.revertable'); // If blueprint not set, use global setting
                    return $revertable;
                },
                'compactmode' => function (bool $compactmode = false) {
                    return $compactmode;
                },
                'label' => function (?string $label = null) {
                    return $label;
                },
                'showEditLanguage' => function (bool $showEditLanguage = true ) { // Default = true for retro-compatibility
                    return $showEditLanguage;
                },
            ],
            'computed' => [
                'id' => function () {
                    return $this->model()->id();
                },
                'translations' => function () {
                    return array_values(Th::getContentTranslationStatuses($this->model()));
                },
                'options' => function(){
                    return $this->kirby()->option('daandelange.translations');
                },
                'previewUrls' => function(){
                    return Th::getContentTranslationUrls($this->kirby()->site());
                },
            ],
        ]
    ],
    'api' => [
        'routes' => function (\Kirby\Cms\App $kirby) {
            return [
                [
                    'pattern' => 'plugin-translations/delete',
                    'method'  => 'POST',
                    'action'  => function () use ($kirby) {
                        $id = get('id');
                        $languageCode = get('languageCode');

                        // Protect default lang
                        if ($kirby->defaultLanguage()->code() === $languageCode) {
                            return [
                                'code' => 403,
                                'text' => t('daandelange.translations.delete.nodefault', 'The default language content can not be deleted.'),
                            ];
                        }

                        // Parse id from $view.model
                        if(strpos($id, '/pages/')===0){
                            $id=str_replace('+', '/', substr($id, strlen('/pages/')));

                            // Fetch page object
                            if ($page = $kirby->page($id)) {
                                // Note: See /Cms/ModelWithContent::contentFile for a reference.
                                //$fileName = $page->contentFileName($languageCode) . '.' . $languageCode . '.' . $page->contentFileExtension();
                                //$filePath = $page->root() . DS .$fileName;
                                $filePath = $page->contentFile($languageCode, true);
                                if (F::exists($filePath)) {
                                    if (F::remove($filePath)) {
                                        return [
                                            'code' => 200,
                                            'text' => tt('daandelange.translations.delete.success', null, ['code'=>Str::upper($languageCode)]),
                                        ];
                                    }
                                    else {
                                        return [
                                            'code' => 500,
                                            'text' => tt('daandelange.translations.delete.error', null, ['code'=>Str::upper($languageCode)]),
                                        ];
                                    }
                                }
                                else {
                                    return [
                                        'code' => 200, // Already deleted = no error
                                        'text' => tt('daandelange.translations.page.notranslation', null, ['code'=>Str::upper($languageCode)]),
                                    ];
                                }
                            }
                        }
                        return [
                            'code' => 404, //'Page not found'
                            'text' => tt('daandelange.translations.page.notfound', null, ['page'=>$id]),
                        ];
                    }
                ],
                [
                    'pattern' => 'plugin-translations/revert',
                    'method'  => 'POST',
                    'action'  => function () use ($kirby) {
                        $id = get('id');
                        $languageCode = get('languageCode');

                        // Protect default lang
                        if ($kirby->defaultLanguage()->code() === $languageCode) {
                            return [
                                'code' => 403,
                                'text' => t('daandelange.translations.revert.nodefault', 'The default language content can not be reverted.'),
                            ];
                        }

                        // Parse id from $view.model
                        if(strpos($id, '/pages/')===0){
                            $id=str_replace('+', '/', substr($id, strlen('/pages/')));

                            $page = $kirby->page($id);
                            if ( $page && $page->exists() ) {
                                $data = $page->readContent($kirby->defaultLanguage()->code());
                                if ($page->save($data, $languageCode, true)) {
                                    return [
                                        'code' => 200,
                                        'text' => tt('daandelange.translations.revert.success', null, ['code'=>Str::upper($languageCode)]),
                                    ];
                                }
                                return [
                                    'code' => 500,
                                    'text' => tt('daandelange.translations.revert.error', null, ['code'=>Str::upper($languageCode)]),
                                ];
                            }
                        }
                        return [
                            'code' => 404,
                            'text' => tt('daandelange.translations.page.notfound', null, ['page'=>$id]),
                        ];

                        // Optional: return $this->next(); to let routing continue;
                    }
                ],
                [ // Fallback, minimal info (called when no model found)
                    'pattern' => 'plugin-translations/load-header',
                    'method'  => 'GET',
                    'action'  => function () use ($kirby) {
                        return [
                            'options' => $kirby->option('daandelange.translations'),
                            'translations' => null,//array_values(Th::getContentTranslationStatuses($this->kirby()->page())), // How to get the page object here? Not possible ?
                            'previewUrls' => null,//Th::getContentTranslationUrls($this->kirby()->page()),
                        ];
                    }
                ],
                [ // Virtual section for page models, see : /config/api/routes/pages.php
                    'pattern' => 'pages/(:any)/translations-info',
                    'method'  => 'GET',
                    'action'  => function (string $id) use ($kirby) {
                        if ($page = $this->page($id)) {
                            return [
                                'options' => $kirby->option('daandelange.translations'),
                                'translations' => array_values(Th::getContentTranslationStatuses($page)),
                                'previewUrls' => Th::getContentTranslationUrls($page),
                            ];
                        }
                        return false;
                    }
                ],
                [ // Virtual section site model (homepage), see : /config/api/routes/site.php
                    'pattern' => 'site/translations-info',
                    'method'  => 'GET',
                    'action'  => function () use ($kirby) {
                        if ($page = $this->site()) {
                            return [
                                'options' => $kirby->option('daandelange.translations'),
                                'translations' => array_values(Th::getContentTranslationStatuses($page)),
                                'previewUrls' => Th::getContentTranslationUrls($page),
                            ];
                        }
                        return false;
                    }
                ],
                [ // Virtual section for users, see : /config/api/routes/users.php
                    'pattern' => [
                        '(account)/translations-info',
                        'users/(:any)/translations-info',
                    ],
                    'method'  => 'GET',
                    'action'  => function (string $id) use ($kirby) {
                        if ($user = $this->user($id)) {
                            return [
                                'options' => $kirby->option('daandelange.translations'),
                                //'translations' => [],
                                //'previewUrls' => new Object(),
                            ];
                        }
                        return false;
                    }
                ],
                [ // Virtual section for file models, see : /config/api/routes/files.php
                    'pattern' => '(account|pages/[^/]+|site|users/[^/]+)'.'/files/(:any)/translations-info',
                    'method'  => 'GET',
                    'action'  => function (string $path, string $filename) use ($kirby) {
                        if ($model = $this->file($path, $filename)->model()) {
                            return [
                                'options' => $kirby->option('daandelange.translations'),
                                'translations' => array_values(Th::getContentTranslationStatuses($model)),
                                'previewUrls' => Th::getContentTranslationUrls($model),
                            ];
                        }
                        return false;
                    }
                ],
            ];
        },
    ],
    'translations' => [
        'en' => [
            'daandelange.translations.delete.confirm'       => 'Do you really want to delete the content of this language ({code})?',
            'daandelange.translations.delete.nodefault'     => 'The default language content can not be deleted.',
            'daandelange.translations.delete.error'         => 'The language {{code}} could not be deleted.',
            'daandelange.translations.delete.success'       => 'The language {{code}} has been successfully deleted.',
            'daandelange.translations.revert.confirm'       => 'Do you really want to revert the content to the current state of the default language?',
            'daandelange.translations.revert.nodefault'     => 'The default language content can not be reverted.',
            'daandelange.translations.revert.error'         => 'The language {{code}} could not be reverted.',
            'daandelange.translations.revert.success'       => 'The language {{code}} has been successfully reverted.',
            'daandelange.translations.page.notranslation'   => 'This page is not translated in {{code}} !',
            'daandelange.translations.page.notfound'        => 'The page {{page}} doesn\'t exist !',
            'daandelange.translations.loading'              => 'Loading...',
            'daandelange.translations.default'              => 'Default',
            'daandelange.translations.current'              => 'Current',
        ],
        'de' => [
            'daandelange.translations.delete.confirm' => 'Möchtest Du wirklich den Inhalt dieser Sprache ({code}) löschen?',
            'daandelange.translations.revert.confirm' => 'Möchtest Du wirklich den Inhalt auf den aktuellen Stand der Standardsprache zurücksetzen?',
            'daandelange.translations.loading'        => 'Laden...',
        ],
        'fr' => [
            'daandelange.translations.delete.confirm'       => 'Voulez-vous vraiment supprimer l\'intégralité du contenu de cette traduction ({code}) ?',
            'daandelange.translations.delete.nodefault'     => 'Le contenu de la langue par défaut ne peut être supprimé.',
            'daandelange.translations.delete.error'         => 'La langue {{code}} n\'a pu être supprimée.',
            'daandelange.translations.delete.success'       => 'La langue {{code}} a bien été supprimée.',
            'daandelange.translations.revert.confirm'       => 'Voulez-vous vraiment réinitialiser cette traduction en utilisant le contenu la langue par défaut ?',
            'daandelange.translations.revert.nodefault'     => 'Le contenu de la langue par défaut ne peut être réinitialisé.',
            'daandelange.translations.revert.error'         => 'Le langage {{code}} n\'a pu être réinitialisé.',
            'daandelange.translations.revert.success'       => 'Ce langage {{code}} a bien été réinitialisé.',
            'daandelange.translations.page.notranslation'   => 'Cette page n\'est pas traduite en {{code}} !',
            'daandelange.translations.page.notfound'        => 'La page {{page}} n\'existe pas !',
            'daandelange.translations.loading'              => 'Chargement...',
            'daandelange.translations.default'              => 'Par défaut',
            'daandelange.translations.current'              => 'Actuel',
        ]
    ],
]);
