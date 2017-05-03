package com.editor.service;

import com.editor.domain.common.facade.BaseFacade;
import com.editor.domain.entity.ElementTypeDict;
import com.google.inject.Inject;
import com.google.inject.persist.Transactional;
import sun.swing.BakedArrayList;

import javax.ws.rs.*;
import javax.ws.rs.core.Response;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by Administrator on 2017/5/3.
 */
@Path("element")
@Produces("application/json")
public class ElementService {
    private BaseFacade baseFacade ;

    @Inject
    public ElementService(BaseFacade baseFacade) {
        this.baseFacade = baseFacade;
    }


    /**
     * 获取所有的顶级数据
     * @return
     */
    @GET
    @Path("list-parent-type")
    public List<ElementTypeDict> listParentType(@QueryParam("name") String elementTypeName){
        String hql = "from ElementTypeDict as d where d.parentTypeId is null " ;
        if(!"".equals(elementTypeName)&&elementTypeName!=null){
            hql +=" and d.elementTypeName like '%"+elementTypeName+"%'";
        }
        return baseFacade.createQuery(ElementTypeDict.class,hql ,new ArrayList<>()).getResultList() ;
    }

    /**
     * 修改字典类型的修改
     * @param elementTypeDict
     * @return
     */
    @Transactional
    @POST
    @Path("element-type-merge")
    public Response mergeElementType(ElementTypeDict elementTypeDict){
        return Response.status(Response.Status.OK).entity(baseFacade.merge(elementTypeDict)).build();
    }

    /**
     * 根据父类ID获取状态
     * @param parentId
     * @return
     */
    @GET
    @Path("list-element-type-by-parent-id")
    public List<ElementTypeDict> listElementTypeDictByParentId(@QueryParam("parentId") String parentId,@QueryParam("rootFlag") String rootFlag){

        String hql = "from ElementTypeDict as dict where 1=1 ";
        if("1".equals(rootFlag)){
            hql+=" and  dict.id = '"+parentId+"'";
        }else{
            hql+=" and  dict.parentTypeId = '"+parentId+"'" ;
        }
        return baseFacade.createQuery(ElementTypeDict.class,hql,new ArrayList<>()).getResultList() ;
    }

}
