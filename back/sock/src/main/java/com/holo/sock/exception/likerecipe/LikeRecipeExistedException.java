package com.holo.sock.exception.likerecipe;

public class LikeRecipeExistedException extends RuntimeException{
    public LikeRecipeExistedException() {
    }

    public LikeRecipeExistedException(String message) {
        super(message);
    }

    public LikeRecipeExistedException(String message, Throwable cause) {
        super(message, cause);
    }

    public LikeRecipeExistedException(Throwable cause) {
        super(cause);
    }

    protected LikeRecipeExistedException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
