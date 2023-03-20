package com.holo.sock.exception.likerecipe;

public class LikeRecipeNotFoundException extends RuntimeException {
    public LikeRecipeNotFoundException() {
    }

    public LikeRecipeNotFoundException(String message) {
        super(message);
    }

    public LikeRecipeNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public LikeRecipeNotFoundException(Throwable cause) {
        super(cause);
    }

    protected LikeRecipeNotFoundException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
