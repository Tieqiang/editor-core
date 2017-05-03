/**
 * Created by Administrator on 2017/4/17.
 */
//配置路由信息
editorApp.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/index");

    //登录页面
    $stateProvider
        .state("login", {
            url: "/login",
            resolve: {
                loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'editorApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            'javascript/controllers/common/login-ctrl.js'
                        ]
                    });
                }]
            },
            views: {
                'content': {
                    controller: "loginCtrl",
                    templateUrl: 'views/common/login.html'
                }
            }
        });
    //工作管理第一页
    $stateProvider.state("index", {
        url: '/index',
        views: {
            'content': {
                templateUrl: 'views/index.html',
                controller: 'adminIndexCtrl'
            }
        },
        resolve: {
            loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'editorApp',
                    insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files: [
                        'javascript/controllers/admin-index.js'
                    ]
                });
            }]
        }
    })
    //模板制作
    $stateProvider.state("index.templateMake", {
        url: "/template",
        params: {
            template: null,
            groupId: null
        },
        views: {
            'mainContent': {
                templateUrl: 'views/editor/editor-core.html',
                controller: "editorCoreCtrl"
            }
        },
        resolve: {
            loadCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'editorApp',
                    insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files: [
                        'javascript/controllers/editor/editor-core.js',
                    ]
                })
            }]
        }
    })

    //--------------------------模板管理--------------------------------//
    //模板分组管理
    $stateProvider.state("index.templateGroup", {
        url: "/template-group",
        views: {
            'mainContent': {
                templateUrl: 'views/template/template-group.html',
                controller: "templateGroupCtrl"
            }
        },
        resolve: {
            loadCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'editorApp',
                    insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files: [
                        'javascript/controllers/template/template-group-ctrl.js',
                        'static/metronic/assets/global/plugins/jstree/dist/jstree.js',
                        'static/metronic/assets/global/plugins/jstree/dist/themes/default/style.min.css'
                    ]
                })
            }]
        }
    })
    //模板管理
    $stateProvider.state("index.templateManager", {
        url: "/template-manager",
        views: {
            'mainContent': {
                templateUrl: 'views/template/template-manager.html',
                controller: "templateManagerCtrl"
            }
        },
        resolve: {
            loadCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'editorApp',
                    insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files: [
                        'javascript/controllers/template/template-manager-ctrl.js',
                        'static/metronic/assets/global/plugins/jstree/dist/jstree.js',
                        'static/metronic/assets/global/plugins/jstree/dist/themes/default/style.min.css'
                    ]
                })
            }]
        }
    })

    //-----------------------------病人管理----------------------------//
    //病人创建
    $stateProvider.state("index.patCreate", {
        url: "/pat-create",
        views: {
            'mainContent': {
                templateUrl: 'views/pat/pat-create.html',
                controller: 'patCreateCtrl'
            }
        },
        resolve: {
            loadCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'editorApp',
                    insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files: [
                        'javascript/controllers/pat/pat-create-ctrl.js',
                    ]
                })
            }]
        }
    });
    //病人查询
    $stateProvider.state("index.patSearch", {
        url: "/pat-search",
        views: {
            'mainContent': {
                templateUrl: "views/pat/pat-search.html",
                controller: "patSearchCtrl"
            }
        },
        resolve: {
            loadCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: "editorApp",
                    insertBefore: '#ng_load_plugins_before',
                    files: [
                        'javascript/controllers/pat/pat-search-ctrl.js'
                    ]
                })
            }]
        }
    })
    //-----------------------------元数据管理--------------------------//
    $stateProvider.state("index.elementType", {
        "url": '/element-type',
        views: {
            'mainContent': {
                templateUrl: 'views/element/element-type.html',
                controller: 'elementTypeCtrl'
            }
        },
        resolve: {
            loadCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'editorApp',
                    insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files: [
                        'javascript/controllers/element/element-type-ctrl.js',
                    ]
                })
            }]
        }
    });
    $stateProvider.state("index.elementData", {
        "url": '/element-data',
        views: {
            'mainContent': {
                templateUrl: 'views/element/element-data.html',
                controller: 'elementDataCtrl'
            }
        },
        resolve: {
            loadCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'editorApp',
                    insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files: [
                        'javascript/controllers/element/element-data-ctrl.js',
                    ]
                })
            }]
        }
    });
    $stateProvider.state("index.elementSubType",{
        url:"/element-sub-type",
        params:{elementType:null},
        views:{
            'mainContent': {
                templateUrl: 'views/element/element-sub-type.html',
                controller: 'elementSubTypeCtrl'
            }
        },
        resolve: {
            loadCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: 'editorApp',
                    insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                    files: [
                        'javascript/controllers/element/element-sub-type-ctrl.js',
                        'static/metronic/assets/global/plugins/jstree/dist/jstree.js',
                        'static/metronic/assets/global/plugins/jstree/dist/themes/default/style.min.css'
                    ]
                })
            }]
        }
    })


}])