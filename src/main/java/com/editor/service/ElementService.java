package com.editor.service;

import com.editor.domain.common.facade.BaseFacade;
import com.editor.domain.entity.*;
import com.google.inject.Inject;
import com.google.inject.persist.Transactional;
import sun.swing.BakedArrayList;

import javax.lang.model.element.Element;
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


    /**
     * 根据elementTypeId 获取元数据
     * @param typeId
     * @return
     */
    @GET
    @Path("list-element-data-by-type")
    public List<ElementDataDict> listElementDataByTypeId(@QueryParam("typeId") String typeId){
        String hql ="select edd from ElementDataDict edd,ElementDataVsType as edvt where edd.id =edvt.elementDataId and edvt.elementTypeId='"+typeId+"'";
        return baseFacade.createQuery(ElementDataDict.class,hql,new ArrayList<>()).getResultList();
    }

    /**
     * 保存数据源
     * @param elementDataDict
     * @param typeId
     * @return
     */
    @Transactional
    @POST
    @Path("merge-element-data")
    public Response mergeElementData(ElementDataDict elementDataDict,@QueryParam("typeId") String typeId){
        elementDataDict = baseFacade.merge(elementDataDict) ;
        if(!"".equals(typeId)&&!"undefined".equals(typeId)&&null!=typeId){
            ElementDataVsType elementDataVsType =this.getElementTypeVsType(elementDataDict.getId(),typeId);
            if(elementDataVsType==null){
                elementDataVsType = new ElementDataVsType();
            }
            elementDataVsType.setElementDataId(elementDataDict.getId());
            elementDataVsType.setElementTypeId(typeId);
            baseFacade.merge(elementDataVsType);
        }
        return Response.status(Response.Status.OK).entity(elementDataDict).build();
    }

    /**
     * 获取值域值
     * @param relamId
     * @return
     */
    @GET
    @Path("list-relam-detail")
    public List<DataRelamDetail> listDataRelam(@QueryParam("relamId") String relamId){
        String hql = "from DataRelamDetail as r where r.dataRelamId='"+relamId+"'" ;
        return baseFacade.createQuery(DataRelamDetail.class,hql,new ArrayList<>()).getResultList();
    }

    /**
     * 获取所有值域
     * @return
     */
    @GET
    @Path("list-relam")
    public List<DataRelamDict> listAllDataRelam(){
        return baseFacade.findAll(DataRelamDict.class);
    }

    /**
     * 获取对照
     * @param dataId
     * @param typeId
     * @return
     */
    private ElementDataVsType getElementTypeVsType(String dataId ,String typeId){
        String hql = "from ElementDataVsType as e where e.elementTypeId='"+typeId+"' and e.elementDataId='"+dataId+"' ";
        return baseFacade.createQuery(ElementDataVsType.class,hql,new ArrayList<>()).getSingleResult();
    }

}
