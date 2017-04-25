/**
 * Created by Administrator on 2017/4/17.
 */

var promise = $.get("/data/state.json")

//配置路由信息
queueApp.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/login");

    //设置菜单项
    var buildState = function(data){

        //jetty 和 tomcat中返回的结果不一致
        if(typeof  data =='string'){
            data = JSON.parse(data);
        }


        for(var i = 0 ;i<data.length;i++){
            var state = data[i] ;
            var option = {} ;
            option.url= state.url;
            option.views={};

            if(state.content){
                if(state.content.state=='base'){
                    option.views.content={}
                    option.views.content.templateUrl = state.content.templateUrl;
                    option.views.content.controller = state.content.controller
                }

                if(state.content.state=='overwrite'){
                    option.views["content@"]={}
                    option.views["content@"].templateUrl = state.content.templateUrl;
                    option.views["content@"].controller = state.content.controller
                }
            }
            if(state.mainContent){
                if(state.mainContent.state=='base'){
                    option.views.mainContent={}
                    option.views.mainContent.templateUrl = state.mainContent.templateUrl;
                    option.views.mainContent.controller = state.mainContent.controller
                }

                if(state.mainContent.state=='overwrite'){
                    option.views["mainContent@"]={}
                    option.views["mainContent@"].templateUrl = state.mainContent.templateUrl;
                    option.views["mainContent@"].controller = state.mainContent.controller
                }
            }

            console.log(option);
            $stateProvider.state(state.name,option)
        }

    }

    //加载菜单项
    promise.done(function(data){
        buildState(data);
    });


}])