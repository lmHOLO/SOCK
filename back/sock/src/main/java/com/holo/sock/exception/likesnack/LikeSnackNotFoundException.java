package com.holo.sock.exception.likesnack;

public class LikeSnackNotFoundException extends RuntimeException{
    public LikeSnackNotFoundException() {
    }

    public LikeSnackNotFoundException(String message) {
        super(message);
    }

    public LikeSnackNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public LikeSnackNotFoundException(Throwable cause) {
        super(cause);
    }

    public LikeSnackNotFoundException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
