package com.editor.service;


import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import java.util.Date;

/**
 * Created by Administrator on 2017/4/13.
 */
@Produces("application/json")
@Path("time")
public class TimeService {


    /**
     * 测试较号
     * @return
     */
    @Produces("text/plain")
    @GET
    public String getTime(@QueryParam("name") final String name,@QueryParam("text") String text){

        return new Date().toString();
    }


}
