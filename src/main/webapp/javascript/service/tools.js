/**
 * Created by Administrator on 2017/3/27.
 */

editorApp.factory("ToolsService",function(){
    var tools  = {} ;

    //创建深层次数
    /**
     * 创建深层次的树状数据
     * @param data 传入的原始数据
     */
    tools.buildTree=function(data){
        //为每一个数据添加一个子对象
        var returnData = [] ;
        for(var i =0;i<data.length;i++){
            data[i].children=[] ;
            if(!data[i].parentId){
                returnData.push(data[i]) ;
            }
        }

        //根据ID和PARENT ID来处理数据
        for(var i =0 ;i<data.length;i++){
            for(var j=0;j<data.length;j++){
                if(data[i].id==data[j].parentId){
                    data[i].children.push(data[j]) ;
                }
            }
        }
        return returnData ;
    }

    tools.buildJstreeData = function(data){
        for(var i= 0;i<data.length;i++){
            data[i].text = data[i].templateGroupName;
            data[i].state={} ;
            if(!data[i].parentId){
                data[i].state.opend=true;
            }
        }
        //为每一个数据添加一个子对象
        var returnData = [] ;
        for(var i =0;i<data.length;i++){
            data[i].children=[] ;
            if(!data[i].parentId){
                returnData.push(data[i]) ;
            }
        }

        //根据ID和PARENT ID来处理数据
        for(var i =0 ;i<data.length;i++){
            for(var j=0;j<data.length;j++){
                if(data[i].id==data[j].parentId){
                    data[i].state.opend=true;
                    data[i].children.push(data[j]) ;
                }
            }
        }
        return returnData ;
    }

    /**
     * 获取UI-grid表格的基本配置
     */
    tools.getNormalGridOptions = function(){
        var obj = {
            enableRowSelection:true,
            enableRowHeaderSelection:false,
            modifierKeysToMultiSelect:false,
            noUnselect:false,
            enableSorting:true,
            enableColumnMenus:false,
            multiSelect:false
        }
        return obj ;
    }


    /**
     * 获取元素在数组中的位置
     * @param element
     * @param datas
     * @returns {number}
     */
    tools.getElementPosition=function(element,datas){
        for(var i = 0;i<datas.length;i++){
            if(element.id){
                if(element.id==datas[i].id){
                    return i ;
                }
            }else{
                if(element.$$hashKey == datas[i].$$hashKey){
                    return i ;
                }
            }
        }
    }

    return tools ;
})