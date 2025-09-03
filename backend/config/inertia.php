<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Root Template
    |--------------------------------------------------------------------------
    |
    | The root template that is loaded on the first page visit. This should be
    | a blade template that includes the @inertia directive.
    |
    */

    'root_view' => 'app',

    /*
    |--------------------------------------------------------------------------
    | Shared Data
    |--------------------------------------------------------------------------
    |
    | This is the data that is shared by default with all Inertia responses.
    | You can add any data you want to be available on every page here.
    |
    */

    'shared' => [
        'auth' => function () {
            $user = \Illuminate\Support\Facades\Auth::user();
            return [
                'user' => $user ? [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                ] : null,
            ];
        },
        'flash' => function () {
            return [
                'success' => session('success'),
                'error' => session('error'),
                'warning' => session('warning'),
                'info' => session('info'),
            ];
        },
    ],

    /*
    |--------------------------------------------------------------------------
    | Deep Merging
    |--------------------------------------------------------------------------
    |
    | This option enables deep merging of shared data. When enabled, nested
    | arrays and objects will be merged recursively instead of being replaced.
    |
    */

    'deep_merge' => true,

];