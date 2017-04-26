/**
 * Created by Administrator on 2017/4/26.
 */

angular.module("editorApp").controller("templateGroupCtrl",['$scope','$http','$uibModal','ToolsService',function($scope,$http,$uibModal,ToolsService){
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
        "plugins" : [ "contextmenu", "dnd", "state", "types" ],
        "contextmenu":{
            'items':{
                'create':{
                    label:'同级分组',
                    action:function(data){
                        var inst = jQuery.jstree.reference(data.reference),
                            obj = inst.get_node(data.reference);
                        $scope.addSameLevelGroup(obj);
                    }
                },
                'createSub':{
                    'label':'新增子分类',
                    action:function(data){
                        var inst = jQuery.jstree.reference(data.reference),
                            obj = inst.get_node(data.reference);
                        $scope.addNextLevelGroup(obj);
                    }
                },
                'rename':{
                    label:'编辑分组',
                    action:function(data){
                        var inst = jQuery.jstree.reference(data.reference),
                            obj = inst.get_node(data.reference);
                        $scope.editGroup(obj);
                    }
                },
                'remove':{
                    label:'删除分组',
                    action:function(data){
                        var inst = jQuery.jstree.reference(data.reference),
                            obj = inst.get_node(data.reference);
                        if(obj.children.length){
                            parent.layer.alert("系统提示：含有子分组不能进行删除")
                            return ;
                        }
                        $scope.removeGroup(obj);
                    }
                },
                'ccp':null,
            }
        }
    });
    //重新加载数据
    $scope.reLoadTree=function(){
        $scope.tree.jstree(true).refresh();
    }
    //打开对话窗口
    $scope.openModal = function(action,currentGroup){
        var groupModalInstance =$uibModal.open({
            size:'lg',
            templateUrl:'groupModal.html',
            controller:"groupModalInstanceCtrl",
            backdrop:false,
            resolve:{
                action:function(){
                    return action ;
                },
                currentGroup:function(){
                    return currentGroup ;
                }
            }
        });
        groupModalInstance.result.then(function(obj){
            $http.post("/api/template/merge-template-group",obj).success(function(data){
                parent.layer.alert("系统提示，"+action+"操作成功！")
                $scope.reLoadTree() ;
            })
        })
    }
    //新增同级
    $scope.addSameLevelGroup=function(obj){
        console.log(obj) ;
        var templateGroup = {} ;
        templateGroup.status = '1' ;
        templateGroup.createDate = new Date();
        if(obj.parent=="#"){
            templateGroup.parentId="";
        }else{
            templateGroup.parentId=obj.parent;
        }
        $scope.openModal("新增",templateGroup)

    }
    //添加下级级别
    $scope.addNextLevelGroup=function(obj){
        var templateGroup = {} ;
        templateGroup.status = '1' ;
        templateGroup.createDate = new Date();
        if(obj.id){
            templateGroup.parentId=obj.id;
        }else{
            parent.layer.alert("节点有问题，请刷新重新操作")
        }

        $scope.openModal("新增子级",templateGroup)
    }
    //修改同级别
    $scope.editGroup=function(obj){
        var templateGroup = {} ;
        templateGroup.id = obj.id ;
        templateGroup.templateGroupName = obj.text ;
        templateGroup.status = '1' ;
        if(obj.parent=="#"){
            templateGroup.parentId="";
        }else{
            templateGroup.parentId=obj.parent;
        }
        $scope.openModal("编辑",templateGroup)
    }
    $scope.removeGroup=function(obj){
        var templateGroup = {} ;
        templateGroup.id = obj.id ;
        templateGroup.templateGroupName = obj.text ;
        templateGroup.status = '-1' ;
        if(obj.parent=="#"){
            templateGroup.parentId="";
        }else{
            templateGroup.parentId=obj.parent;
        }

        $http.post("/api/template/merge-template-group",templateGroup).success(function(data){
            parent.layer.alert("系统提示，删除操作成功！")
            $scope.reLoadTree() ;
        })
    }
}]) ;

angular.module("editorApp").controller("groupModalInstanceCtrl",['$scope','action','currentGroup','$uibModalInstance',function ($scope, action, currentGroup,$uibModalInstance) {

    $scope.action = action ;
    $scope.currentGroup = currentGroup ;

    $scope.doOk = function(){
        if(!$scope.currentGroup.templateGroupName){
            parent.layer.alert("系统提示：名称不能为空");
            return ;
        }
        $uibModalInstance.close($scope.currentGroup);
    }

    $scope.doCancel=function(){
        $uibModalInstance.dismiss();
    }
}])