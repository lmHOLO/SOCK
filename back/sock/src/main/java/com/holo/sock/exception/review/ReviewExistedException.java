package com.holo.sock.exception.review;

public class ReviewExistedException extends RuntimeException{
    public ReviewExistedException() {
    }

    public ReviewExistedException(String message) {
        super(message);
    }

    public ReviewExistedException(String message, Throwable cause) {
        super(message, cause);
    }

    public ReviewExistedException(Throwable cause) {
        super(cause);
    }

    public ReviewExistedException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
