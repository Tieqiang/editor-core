/**
 * Created by Administrator on 2017/5/3.
 */
//数据源类型管理
angular.module("editorApp").controller("elementTypeCtrl",['$scope','$http','$window','$uibModal','$state','$stateParams',function($scope,$http,$window,$uibModal,$state,$stateParams){


    $scope.minHeight = $window.innerHeight - 200 ;

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