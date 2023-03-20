package com.holo.sock.exception.recipeqscore;

public class RecipeQScoreNotFoundException extends RuntimeException{
    public RecipeQScoreNotFoundException() {
    }

    public RecipeQScoreNotFoundException(String message) {
        super(message);
    }

    public RecipeQScoreNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public RecipeQScoreNotFoundException(Throwable cause) {
        super(cause);
    }

    protected RecipeQScoreNotFoundException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
