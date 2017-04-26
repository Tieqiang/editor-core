/**
 * Created by Administrator on 2017/4/25.
 */
angular.module("editorApp").controller("editorCoreCtrl",['$scope','$http','$window','$uibModal','$compile','$stateParams','$state',function($scope,$http,$window,$uibModal,$compile,$stateParams,$state){



    $scope.groupId = $stateParams.groupId ;

    if(!$scope.groupId){
        parent.layer.alert("分组传递出现错误");
        $state.go("index.templateManager");
        return ;
    }
    $scope.currentTemplate =undefined ;
    if($stateParams.template){
        $scope.currentTemplate = $stateParams.template;
    }


    $scope.getEditor = function(){
        UE.delEditor('myFormDesign');//清除缓存中的编辑器先
        var editor =  UE.getEditor('myFormDesign',{
            //allowDivTransToP: false,//阻止转换div 为p
            toolleipi:true,//是否显示，设计器的 toolbars
            textarea: 'design_content',
            //这里可以选择自己需要的工具按钮名称,此处仅选择如下五个
            toolbars:[[
                'fullscreen', 'source', '|',
                'undo', 'redo', '|','bold',
                'italic', 'underline',
                'fontborder', 'strikethrough',
                'removeformat', '|', 'forecolor', 'backcolor', 'insertorderedlist', 'insertunorderedlist','|',
                'fontfamily', 'fontsize', '|', 'indent', '|',
                'justifyleft', 'justifycenter',
                'justifyright', 'justifyjustify', '|',
                'link', 'unlink',  '|',  'horizontal',
                'spechars',  'wordimage', '|', 'inserttable', 'deletetable',  'mergecells',  'splittocells']],
            //focus时自动清空初始化时的内容
            //autoClearinitialContent:true,
            //关闭字数统计
            wordCount:false,
            //关闭elementPath
            elementPathEnabled:false,
            //默认的编辑区域高度
            initialFrameHeight:$window.innerHeight - 200,
            //iframeCssUrl:"css/bootstrap/css/bootstrap.css" //引入自身 css使编辑器兼容你网站css
            //更多其他参数，请参考ueditor.config.js中的配置项
        });

        return  editor ;
    }
    $scope.editor = $scope.getEditor();

    $scope.setContent = function () {
        if($scope.currentTemplate){
            if($scope.currentTemplate.templateContent){
                $scope.editor.setContent($scope.currentTemplate.templateContent);
            }
        }
    }


    //保存方法
    $scope.editor.save=function(){
        var html = $scope.editor.getContent();
        $scope.currentTemplate.templateContent = html ;
        var saveModalInstance = $uibModal.open({
            templateUrl:"saveModal.html",
            controller:"saveModalInstanceCtrl",
            backdrop:'false',
            size:'lg',
            resolve:{
                currentTemplate:function(){
                    return $scope.currentTemplate ;
                }
            }
        }) ;
        saveModalInstance.result.then(function(obj){
            $http.post("/api/template/merge-template",obj).success(function(data){
                parent.layer.alert("系统提示：保存成功")
            })
        })
    }
    //预览方法
    $scope.editor.preView=function(){
        var preViewModalInstnace = $uibModal.open({
            templateUrl:"preView.html",
            controller:"preViewModalInstanceCtrl",
            backdrop:'false',
            size:'lg',
            resolve:{
                editor:function(){
                    return $scope.editor ;
                }
            }
        });
        preViewModalInstnace.result.then(function(result){
            alert(result);
        })
        preViewModalInstnace.rendered .then(function(){
            var html =$scope.editor.getContent();
            var compileFn = $compile(html);
            // 传入scope，得到编译好的dom对象(已封装为jqlite对象)
            // 也可以用$scope.$new()创建继承的作用域
            var $dom = compileFn($scope);
            $dom.find("table").addClass("table table-bordered")
            
            // 添加到文档中
            var $modalBody= angular.element("#modalBody") ;
            console.log($modalBody)
            $modalBody.append($dom);
        })
    }
    //浏览内容
    $scope.editor.templateView=function(){
    }

    $scope.editor.ready(function(){
        $scope.setContent();
    })

}])


angular.module("editorApp").controller("preViewModalInstanceCtrl",['$scope','$compile','editor','$uibModalInstance',function($scope,$compile,editor,$uibModalInstance){


    $scope.preViewDemo = function(){
        var html =editor.getContent();
        var compileFn = $compile(html);
        // 传入scope，得到编译好的dom对象(已封装为jqlite对象)
        // 也可以用$scope.$new()创建继承的作用域
        var $dom = compileFn($scope);
        // 添加到文档中
        var $modalBody= angular.element("#modalBody") ;
        console.log($modalBody)
        $modalBody.append($dom);
    }

    $scope.doOk = function(){
        $uibModalInstance.close(html);
    }

    $scope.doCancel=function(){
        $uibModalInstance.dismiss();
    }

}])


angular.module("editorApp").controller("saveModalInstanceCtrl",['$scope','$compile','currentTemplate','$uibModalInstance',function($scope,$compile,currentTemplate,$uibModalInstance){


    $scope.currentTemplate = currentTemplate ;


    $scope.doOk = function(){
        if(!$scope.currentTemplate.templateName){
            parent.layer.alert("系统提示：模板名称不能为空");
            return ;
        }
        $uibModalInstance.close($scope.currentTemplate);
    }

    $scope.doCancel=function(){
        $uibModalInstance.dismiss();
    }

}])

