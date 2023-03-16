package com.holo.sock.exception.snack;

public class SnackNotFoundException extends RuntimeException{
    public SnackNotFoundException() {
        super();
    }

    public SnackNotFoundException(String message) {
        super(message);
    }

    public SnackNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public SnackNotFoundException(Throwable cause) {
        super(cause);
    }

    protected SnackNotFoundException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
