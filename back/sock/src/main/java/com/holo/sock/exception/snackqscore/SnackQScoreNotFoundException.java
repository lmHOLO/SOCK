package com.holo.sock.exception.snackqscore;

public class SnackQScoreNotFoundException extends RuntimeException{
    public SnackQScoreNotFoundException() {
    }

    public SnackQScoreNotFoundException(String message) {
        super(message);
    }

    public SnackQScoreNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public SnackQScoreNotFoundException(Throwable cause) {
        super(cause);
    }

    public SnackQScoreNotFoundException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
