package com.editor.service;

import com.editor.domain.common.facade.BaseFacade;
import com.editor.domain.entity.TemplateDict;
import com.editor.domain.entity.TemplateGroupDict;
import com.google.inject.Inject;
import com.google.inject.persist.Transactional;

import javax.ws.rs.*;
import javax.ws.rs.core.Response;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by Administrator on 2017/4/26.
 */
@Path("template")
@Produces("application/json")
public class TemplateService {

    private BaseFacade baseFacade ;

    @Inject
    public TemplateService(BaseFacade baseFacade) {
        this.baseFacade = baseFacade;
    }


    /**
     * 获取所有的Group
     * @return
     */
    @GET
    @Path("list-template-group-all")
    public List<TemplateGroupDict> listAll(){
        String hql = "from TemplateGroupDict tg where tg.status<>'-1'" ;
        return baseFacade.createQuery(TemplateGroupDict.class,hql,new ArrayList<>()).getResultList();
    }

    /**
     * 获取某一个科室的列表
     * @param deptId
     * @return
     */
    @GET
    @Path("list-template-group-by-deptId")
    public List<TemplateGroupDict> listByDeptId(@QueryParam("deptId") String deptId){
        String hql = "from TemplateGroupDict as t where t.deptId='"+deptId+"' and t.status<>'-1'" ;
        return baseFacade.createQuery(TemplateGroupDict.class,hql,new ArrayList<>()).getResultList();
    }

    /**
     * 获取某一个分组下面所有的模板
     * @param groupId
     * @return
     */
    @GET
    @Path("list-template-by-groupId")
    public List<TemplateDict> listTemplateByGroupId(@QueryParam("groupId") String groupId){
        String hql ="from TemplateDict as t where t.templateGroupId='"+groupId+"' and t.status<>'-1' order by t.templateNo" ;
        return baseFacade.createQuery(TemplateDict.class,hql ,new ArrayList<>()).getResultList();
    }


    /**
     * 添加模板
     * @param templateDict
     * @return
     */
    @Transactional
    @POST
    @Path("merge-template")
    public Response mergeTemplate(TemplateDict templateDict){
        return Response.status(Response.Status.OK).entity(baseFacade.merge(templateDict)).build();
    }

    /**
     * 更新模板分组
     * @param templateGroupDict
     * @return
     */
    @Transactional
    @POST
    @Path("merge-template-group")
    public Response mregeTemplateGroup(TemplateGroupDict templateGroupDict){
        return Response.status(Response.Status.OK).entity(baseFacade.merge(templateGroupDict)).build();
    }

}
