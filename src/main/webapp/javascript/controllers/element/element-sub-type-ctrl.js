/**
 * Created by Administrator on 2017/5/3.
 */
//数据源类型管理
angular.module("editorApp").controller("elementSubTypeCtrl",['$scope','$http','$window','$uibModal','$state','$stateParams',function($scope,$http,$window,$uibModal,$state,$stateParams){
    $scope.rootElementType = $stateParams.elementType;
    $scope.currentTypeId=undefined;

    if(!$scope.rootElementType){
        parent.layer.alert("没有找到模板数据")
        $state.go("index.elementType")
        return ;
    }
    $scope.minHeight = $window.innerHeight - 150 ;


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
                    if(node.id=="#"){
                        returnUrl+="&rootFlag=1&parentId="+$scope.rootElementType.id;
                    }else{
                        returnUrl+="&rootFlag=0&parentId="+node.id;
                    }
                    return returnUrl;
                },
                data:function(node){
                    return { "parentId" : node.id } ;
                },
                dataFilter:function(data){
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
                            obj.memo = data[i].memo ;
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
        "plugins" : [ "dnd", "state", "types","contextmenu"],
        "contextmenu":{
            'items':{
                'create':{
                    label:'同级分组',
                    action:function(data){
                        var inst = jQuery.jstree.reference(data.reference),
                            obj = inst.get_node(data.reference);
                        console.log(obj);
                        if(obj.parenatTypeId=="#"){
                            parent.layer.alert("系统提示：根元素不允许添加同级")
                            return ;
                        }
                        $scope.addSameLevelGroup(obj);
                    }
                },
                'createSub':{
                    'label':'新增子分类',
                    action:function(data){
                        var inst = jQuery.jstree.reference(data.reference),
                            obj = inst.get_node(data.reference);
                        $scope.addNextElementType(obj);
                    }
                },
                'rename':{
                    label:'编辑分组',
                    action:function(data){
                        var inst = jQuery.jstree.reference(data.reference),
                            obj = inst.get_node(data.reference);
                        $scope.editElementType(obj);
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
                        $scope.removeElementType(obj);
                    }
                },
                'addElement':{
                    label:"新增元数据",
                    action:function(data){
                        var inst = jQuery.jstree.reference(data.reference),
                            obj = inst.get_node(data.reference);
                        $scope.addDataElement(obj);
                    }
                },
            }
        }
    });

    //菜单选项发生改变
    $('#tree').on("changed.jstree", function (e, data) {
        console.log(data.selected);
        var groupId = data.selected[0] ;
        $scope.currentTypeId = groupId;
        $scope.loadData(groupId) ;
    });
    //加载信息
    $scope.loadData = function(typeId){
        $http.get("/api/element/list-element-data-by-type?typeId="+typeId).success(function(data){
            $scope.elementDataGridOptions.data=data ;
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
    $scope.elementDataGridOptions={
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
            displayName:"元数据名称",
            field:'elementName',
            headerCellClass:'headerCellClass',
            cellClass:"cellClass"
        },{
            displayName:"元数据类型",
            field:"viewType",
            headerCellClass:"headerCellClass",
            cellClass:"cellClass"
        },{
            displayName:"对应标准码",
            field:"standCode",
            headerCellClass:"headerCellClass",
            cellClass:"cellClass"
        },{
            displayName:"操作",
            field:"id",
            headerCellClass:'headerCellClass',
            cellClass:"cellClass",
            width:'20%',
            cellTemplate:"<div class=\'ui-grid-cell-contents\'>\n    <a href=\'javascript:;\' class=\'btn btn-sm btn-info fa-only\' ng-click=\'grid.appScope.editElementData(row.entity)\'>\n        <i class=\'fa fa-edit\'></i>\n\n    </a>\n    <a href=\'javascript:;\' class=\'btn btn-sm btn-danger fa-only\' ng-click=\'grid.appScope.delElementData(row.entity)\'>\n        <i class=\'fa fa-remove\'></i>\n    </a>\n</div>"
        }]
    };

    $scope.elementDataGridOptions.data =[] ;
    $scope.elementDataGridOptions.onRegisterApi=function(gridApi){
        $scope.gridApi = gridApi ;
    }

    //新增类别
    $scope.addSameLevelGroup = function(data){
        var obj = {} ;
        obj.parentTypeId = data.parent ;
        $scope.openElementTypeModal(obj,"新增类别")
    }
    //编辑类别
    $scope.editElementType = function(data){
        var obj = {} ;
        obj.id = data.id ;
        obj.elementTypeName = data.text ;
        obj.memo = data.memo ;
        obj.parentTypeId = data.parent ;
        $scope.openElementTypeModal(obj,"编辑类别")
    }
    //新增自雷
    $scope.addNextElementType = function(data){
        var obj = {} ;
        obj.parentTypeId = data.id ;
        $scope.openElementTypeModal(obj,"编辑类别")
    }

    //打开对话窗口
    $scope.openElementTypeModal=function(currentType,action){
        var elementTypeDictModalInstance = $uibModal.open({
            backdrop:false,
            templateUrl:"ElementTypeDictModal.html",
            controller:"ElementTypeDictModalInstanceCtrl",
            resolve:{
                action:function(){
                    return action ;
                },
                currentType:function(){
                    return currentType ;
                }
            }
        })

        elementTypeDictModalInstance.result.then(function(obj){
            $http.post("api/element/element-type-merge",obj).success(function(data){
                parent.layer.alert("系统提示：更新成功");
                var instance = $('#tree').jstree(true);
                instance.refresh("#"+obj.parentTypeId);
                instance.select_node(data.id)
            })
        })
    }


    //删除类型
    $scope.removeElementType=function(data){
        console.log(data)
    }


    //打开数据源窗口
    $scope.openDataElementModal = function(currentElement,action,currentTypeId){
        var ElementDataModalInstance = $uibModal.open({
            backdrop:false,
            templateUrl:"ElementDataModal.html",
            controller:"ElementDataModalInstanceCtrl",
            resolve:{
                action:function(){
                    return action ;
                },
                currentElement:function(){
                    return currentElement ;
                }
            }
        })

        ElementDataModalInstance.result.then(function(obj){
            $http.post("api/element/merge-element-data?typeId="+currentTypeId,obj).success(function(data){
                parent.layer.alert("系统提示：更新成功");
                $scope.loadData(currentTypeId)
            })
        })
    }

    $scope.addDataElement=function(){
        $scope.openDataElementModal({},"新增元数据",$scope.currentTypeId);
    }

    $scope.editElementData=function (obj) {
        delete obj.$$hashKey ;
        $scope.openDataElementModal(obj,"修改元数据",$scope.currentTypeId);
    }
}]);

angular.module("editorApp").controller("ElementTypeDictModalInstanceCtrl",['$scope','$uibModalInstance','action','currentType',function($scope,$uibModalInstance,action,currentType){
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
angular.module("editorApp").controller("ElementDataModalInstanceCtrl",['$scope','$uibModalInstance','action','currentElement','$http',function($scope,$uibModalInstance,action,currentElement,$http){
    $scope.action = action ;
    $scope.currentElement = currentElement ;

    $scope.dataRelamDetails=[] ;
    $scope.dataRelams=[] ;

    $scope.loadDataRelams=function(){
        $http.get("/api/element/list-relam").success(function(data){
            $scope.dataRelams = data ;
        })
    }

    $scope.loadDataRelams();

    $scope.$watch("currentElement.id",function(newValue,oldValue){
        $http.get("/api/element/list-relam-detail?relamId="+newValue).success(function(data){
            $scope.dataRelamDetails = data ;
        })
    })

    $scope.doOk = function(){
        if(!$scope.currentElement.elementName){
            parent.layer.alert("系统提示：名称不能为空")
            return ;
        }
        $uibModalInstance.close($scope.currentElement);
    }

    $scope.doCancel=function(){
        $uibModalInstance.dismiss();
    }

}]);
