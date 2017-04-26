/**
 * Created by Administrator on 2017/4/25.
 */

var editorApp = angular.module("editorApp",[
    'ui.router',
    'LocalStorageModule',
    'ui.bootstrap',
    'ui.grid',
    'ui.grid.edit',
    'ui.grid.autoResize',
    'ui.grid.selection',
    'ui.grid.treeView',
    "oc.lazyLoad"
]);

/* Configure ocLazyLoader(refer: https://github.com/ocombe/ocLazyLoad) */
editorApp.config(['$ocLazyLoadProvider', function($ocLazyLoadProvider) {
    $ocLazyLoadProvider.config({
        // global configs go here
    });
}]);

//AngularJS v1.3.x workaround for old style controller declarition in HTML
editorApp.config(['$controllerProvider', function($controllerProvider) {
    // this option might be handy for migrating old apps, but please don't use it
    // in new ones!
    $controllerProvider.allowGlobals();
}]);


//双重判断，如果状态发生改变
editorApp.run(['$rootScope','$log','localStorageService',function($rootScope,$log,localStorageService){
    //状态改变
    $rootScope.$on("stateChangeStart",function(event, toState, toParams, fromState, fromParams, options){
        console.log(fromState) ;
        if(fromState=='index.templateMake'){
            alert("离开了")
        }
    })

}])

