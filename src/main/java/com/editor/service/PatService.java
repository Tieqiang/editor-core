package com.editor.service;

import com.editor.domain.common.facade.BaseFacade;
import com.google.inject.Inject;

import javax.ws.rs.Path;
import javax.ws.rs.Produces;

/**
 * Created by Administrator on 2017/4/27.
 */
@Path("pat")
@Produces("application/json")
public class PatService {

    private BaseFacade baseFacade ;

    @Inject
    public PatService(BaseFacade baseFacade) {
        this.baseFacade = baseFacade;
    }
    
}
