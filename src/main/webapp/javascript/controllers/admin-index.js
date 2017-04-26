/**
 * Created by Administrator on 2017/4/25.
 */

angular.module("editorApp").controller("adminIndexCtrl",['$scope','$http','$window',function($scope,$http,$window){
    console.log('加载页面')

    $scope.windowHeight = $window.outerHeight - 50 ;

    $scope.nowState = '';
    $scope.actionName='';

    $scope.menuClick = function(obj,actionName){
        $scope.nowState = obj ;
        $scope.actionName = actionName ;
        console.log(obj);
    }

    $scope.logout=function(){
        localStorageService.set("user",undefined);
        $state.go("login");
    }





}]);