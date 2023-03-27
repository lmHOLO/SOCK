package com.holo.sock.exception.review;

public class ReviewNotFoundException extends RuntimeException{

    public ReviewNotFoundException() {
        super();
    }

    public ReviewNotFoundException(String message) {
        super(message);
    }

    public ReviewNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public ReviewNotFoundException(Throwable cause) {
        super(cause);
    }

    protected ReviewNotFoundException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
