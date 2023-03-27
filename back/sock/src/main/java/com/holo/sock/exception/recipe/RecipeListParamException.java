package com.holo.sock.exception.recipe;

public class RecipeListParamException extends RuntimeException{

    public RecipeListParamException() {
    }

    public RecipeListParamException(String message) {
        super(message);
    }

    public RecipeListParamException(String message, Throwable cause) {
        super(message, cause);
    }

    public RecipeListParamException(Throwable cause) {
        super(cause);
    }

    protected RecipeListParamException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
