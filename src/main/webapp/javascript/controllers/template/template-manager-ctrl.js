/**
 * Created by Administrator on 2017/4/26.
 */

angular.module("editorApp").controller("templateManagerCtrl",['$scope','$http','$uibModal','ToolsService','$state',function ($scope, $http, $uibModal, ToolsService,$state) {

    $scope.tempaltes = [] ;
    $scope.groupId = undefined ;
    //菜单树
    $scope.tree =$("#tree").jstree({
        "core" : {
            "themes" : {
                "responsive": false
            },
            "check_callback" : true,
            'data' : {
                url:"api/template/list-template-group-all",
                dataFilter:function(data){
                    data = JSON.parse(data);
                    var returenData = ToolsService.buildJstreeData(data);
                    return JSON.stringify(returenData);
                }
            }
        },
        "types" : {
            "default" : {
                "icon" : "fa fa-folder icon-state-warning icon-lg"
            },
            "file" : {
                "icon" : "fa fa-file icon-state-warning icon-lg"
            }
        },
        "state" : { "key" : "demo2" },
        "plugins" : [ "dnd", "state", "types" ],
    });

    //加载模板
    $scope.loadTemplate = function(groupId){
        $scope.groupId =groupId;
        $http.get("api/template/list-template-by-groupId?groupId="+groupId).success(function (data) {
            $scope.templates = data ;
        })
    }

    //菜单选项
    $('#tree').on("changed.jstree", function (e, data) {
        console.log(data.selected);
        var groupId = data.selected[0] ;
        $scope.loadTemplate(groupId) ;
    });


    //编辑模板
    $scope.editTemplate = function(obj){
        if(!$scope.groupId){
            parent.layer.alert("系统提示：请选择分组")
            return ;
        }
        $state.go("index.templateMake",{template:obj,groupId:$scope.groupId})
    }

    //删除模板
    $scope.removeTemplate = function(obj){
        if(!obj||!obj.id){
            parent.layer.alert("系统提示：删除的模板出现了错误，请联系系统维护人员")
            return ;
        }
        obj.status="-1";
        $http.post("/api/template/merge-template",obj).success(function(data){
            $scope.loadTemplate(obj.templateGroupId);
            parent.layer.alert("系统提示：删除成功！")
        })
    }

    //新增模板
    $scope.newTemplate=function(){
        if(!$scope.groupId){
            parent.layer.alert("系统提示：请选择分组")
            return ;
        }
        var obj = {} ;
        obj.templateGroupId = $scope.groupId ;
        obj.status = '1' ;
        $state.go("index.templateMake",{template:obj,groupId:$scope.groupId})
    }

}])