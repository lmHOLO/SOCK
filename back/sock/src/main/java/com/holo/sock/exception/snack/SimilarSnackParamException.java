package com.holo.sock.exception.snack;

public class SimilarSnackParamException extends RuntimeException{
    public SimilarSnackParamException() {
    }

    public SimilarSnackParamException(String message) {
        super(message);
    }

    public SimilarSnackParamException(String message, Throwable cause) {
        super(message, cause);
    }

    public SimilarSnackParamException(Throwable cause) {
        super(cause);
    }

    public SimilarSnackParamException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
