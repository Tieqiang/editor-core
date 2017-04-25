package com.editor.domain.common.entity;

import java.io.Serializable;

/**
 * Created by heren on 2015/9/18.
 */
public class ErrorException extends Throwable implements Serializable {

    private String errorMessage ;


    public ErrorException() {
    }

    public ErrorException(String errorMessage) {
        this.errorMessage = errorMessage;
    }

    public String getErrorMessage() {
        return errorMessage;
    }

    public void setErrorMessage(String errorMessage) {
        this.errorMessage = errorMessage;
    }


}
