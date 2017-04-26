/**
 * Created by Administrator on 2017/4/17.
 */
//配置路由信息
editorApp.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/index");

    //登录页面
    $stateProvider
        .state("login",{
            url:"/login",
            resolve:{
                loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'editorApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                        files: [
                            'javascript/controllers/common/login-ctrl.js'
                        ]
                    });
                }]
            },
            views:{
                'content':{
                    controller:"loginCtrl",
                    templateUrl:'views/common/login.html'
                }
            }
        });
    //工作管理第一页
    $stateProvider.state("index",{
        url:'/index',
        views:{
            'content':{
                templateUrl:'views/index.html',
                controller:'adminIndexCtrl'
            }
        },
        resolve:{
            loadMyCtrl:['$ocLazyLoad',function($ocLazyLoad){
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
    $stateProvider.state("index.templateMake",{
        url:"/template",
        params:{
            template:null,
            groupId:null
        },
        views:{
            'mainContent':{
                templateUrl:'views/editor/editor-core.html',
                controller:"editorCoreCtrl"
            }
        },
        resolve:{
            loadCtrl:['$ocLazyLoad',function($ocLazyLoad){
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

    //模板分组管理
    $stateProvider.state("index.templateGroup",{
        url:"/template-group",
        views:{
            'mainContent':{
                templateUrl:'views/template/template-group.html',
                controller:"templateGroupCtrl"
            }
        },
        resolve:{
            loadCtrl:['$ocLazyLoad',function($ocLazyLoad){
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
    $stateProvider.state("index.templateManager",{
        url:"/template-manager",
        views:{
            'mainContent':{
                templateUrl:'views/template/template-manager.html',
                controller:"templateManagerCtrl"
            }
        },
        resolve:{
            loadCtrl:['$ocLazyLoad',function($ocLazyLoad){
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

}])