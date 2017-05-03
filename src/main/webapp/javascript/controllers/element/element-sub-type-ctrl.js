/**
 * Created by Administrator on 2017/5/3.
 */
//数据源类型管理
angular.module("editorApp").controller("elementSubTypeCtrl",['$scope','$http','$window','$uibModal','$state','$stateParams',function($scope,$http,$window,$uibModal,$state,$stateParams){
    $scope.rootElementType = $stateParams.elementType;

    if(!$scope.rootElementType){
        parent.layer.alert("没有找到模板数据")
        $state.go("index.elementType")
        return ;
    }
    $scope.minHeight = $window.innerHeight - 50 ;


    //菜单树
    $scope.tree =$("#tree").jstree({
        "core" : {
            "themes" : {
                "responsive": false
            },
            "check_callback" : true,
            'data' : {
                url:function (node) {
                    var returnUrl = "api/element/list-element-type-by-parent-id?lazy";
                    console.log(node) ;
                    if(node.id=="#"){
                        returnUrl+="&rootFlag=1&parentId="+$scope.rootElementType.id;
                    }else{
                        returnUrl+="&rootFlag=0&parentId="+$scope.rootElementType.id;
                    }
                    return returnUrl;
                },
                data:function(node){
                    console.log("我是data我被执行了");
                    console.log(node);
                    return { "parentId" : node.id } ;
                },
                dataFilter:function(data){
                    console.log("我是dataFilter我被执行了")
                    data= JSON.parse(data);
                    var returnData = [] ;
                    console.log($scope.rootElementType)

                    for(var i=0;i<data.length;i++){
                            var obj={} ;
                            obj.text=data[i].elementTypeName;
                            obj.id = data[i].id ;
                            obj.state = {} ;
                            obj.state.opend=false;
                            obj.children=true;
                            returnData.push(obj);
                    }
                    console.log(JSON.stringify(returnData))

                    return JSON.stringify(returnData);
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
    //加载信息
    $scope.loadData = function(elementTypeName){
        $http.get("/api/element/list-parent-type?name="+elementTypeName).success(function(data){
            $scope.elementTypeGridOptions.data=data ;
        })
    }

    $scope.loadData('') ;

    $scope.$watch("currentTypeName",function(newValue,oldValue){
        if(newValue){
            $scope.loadData(newValue);
        }else{
            $scope.loadData("");
        }
    })

    //表格信息配置
    $scope.elementTypeGridOptions={
        rowHeight:'40',
        enableRowSelection: true,
        enableRowHeaderSelection: false,
        modifierKeysToMultiSelect: false,
        noUnselect: false,
        multiSelect: false,
        enableSorting: true,
        enableColumnMenus:false,
        data:[],
        columnDefs:[{
            displayName:"元数据类型名称",
            field:'elementTypeName',
            headerCellClass:'headerCellClass',
            cellClass:"cellClass"
        },{
            displayName:"类型描述",
            field:"memo",
            headerCellClass:"headerCellClass",
            cellClass:"cellClass"
        },{
            displayName:"操作",
            field:"id",
            headerCellClass:'headerCellClass',
            cellClass:"cellClass",
            width:'20%',
            cellTemplate:"<div class=\'ui-grid-cell-contents\'>\n    <a href=\'javascript:;\' class=\'btn btn-sm btn-info\' ng-click=\'grid.appScope.editType(row.entity)\'>\n        <i class=\'fa fa-edit\'></i>\n        编辑\n    </a>\n    <a href=\'javascript:;\' class=\'btn btn-sm btn-success\'  ng-click=\'grid.appScope.editSubType(row.entity)\'>\n        <i class=\'fa fa-plus\'></i>\n        子类型\n    </a>\n    <a href=\'javascript:;\' class=\'btn btn-sm btn-danger\' ng-click=\'grid.appScope.deleteType(row.entity)\'>\n        <i class=\'fa fa-remove\'></i>\n        停用\n    </a>\n</div>"
        }]
    };
    $scope.elementTypeGridOptions.onRegisterApi=function(gridApi){
        $scope.gridApi = gridApi ;
    }

    //新增类别
    $scope.addNewType = function(){
        $scope.openModal({},"新增类别")
    }

    //打开对话窗口
    $scope.openModal=function(currentType,action){
        var elementTypeModalInstance = $uibModal.open({
            backdrop:false,
            templateUrl:"elementTypeDialog.html",
            controller:"elementTypeModalInstanceCtrl",
            resolve:{
                action:function(){
                    return action ;
                },
                currentType:function(){
                    return currentType ;
                }
            }
        })

        elementTypeModalInstance.result.then(function(obj){
            $http.post("api/element/element-type-merge",obj).success(function(data){
                parent.layer.alert("系统提示：更新成功");
                $scope.loadData();
            })
        })
    }

    //编辑类型
    $scope.editType = function(data){
        delete data.$$hashKey ;
        $scope.openModal(data,"编辑")
    }

    //编辑子类型
    $scope.editSubType = function(data){
        $state.go("index.elementSubType",{elementType:data});
    }

    //删除类型
    $scope.deleteType=function(data){

    }
}]);

angular.module("editorApp").controller("elementTypeModalInstanceCtrl",['$scope','$uibModalInstance','action','currentType',function($scope,$uibModalInstance,action,currentType){
    $scope.action = action ;
    $scope.currentType = currentType ;


    $scope.doOk = function(){
        if(!$scope.currentType.elementTypeName){
            parent.layer.alert("系统提示：类别名称不能为空")
            return ;
        }
        $uibModalInstance.close($scope.currentType);
    }

    $scope.doCancel=function(){
        $uibModalInstance.dismiss();
    }

}]);