package com.editor.domain.common.vo;

import java.io.Serializable;
import java.util.List;

/**
 * Created by heren on 2016/11/18.
 */
public class InputCodeVo<T> implements Serializable{

    private List<T> value ;
    private String defaults ;

    public InputCodeVo(List<T> value, String defaults) {
        this.value = value;
        this.defaults = defaults;
    }

    public InputCodeVo() {
    }

    public List<T> getValue() {
        return value;
    }

    public void setValue(List<T> value) {
        this.value = value;
    }

    public String getDefaults() {
        return defaults;
    }

    public void setDefaults(String defaults) {
        this.defaults = defaults;
    }
}
