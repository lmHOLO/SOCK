package com.holo.sock.exception.recipe;

public class SimilarRecipeParamException extends RuntimeException{
    public SimilarRecipeParamException() {
    }

    public SimilarRecipeParamException(String message) {
        super(message);
    }

    public SimilarRecipeParamException(String message, Throwable cause) {
        super(message, cause);
    }

    public SimilarRecipeParamException(Throwable cause) {
        super(cause);
    }

    protected SimilarRecipeParamException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
