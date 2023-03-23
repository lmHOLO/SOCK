package com.holo.sock.exception.recipe;

public class UsedRecipeParamException extends RuntimeException{
    public UsedRecipeParamException() {
    }

    public UsedRecipeParamException(String message) {
        super(message);
    }

    public UsedRecipeParamException(String message, Throwable cause) {
        super(message, cause);
    }

    public UsedRecipeParamException(Throwable cause) {
        super(cause);
    }

    protected UsedRecipeParamException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
