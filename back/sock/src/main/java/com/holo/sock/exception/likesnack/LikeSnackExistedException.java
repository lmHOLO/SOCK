package com.holo.sock.exception.likesnack;

public class LikeSnackExistedException extends RuntimeException {
    public LikeSnackExistedException() {
    }

    public LikeSnackExistedException(String message) {
        super(message);
    }

    public LikeSnackExistedException(String message, Throwable cause) {
        super(message, cause);
    }

    public LikeSnackExistedException(Throwable cause) {
        super(cause);
    }

    public LikeSnackExistedException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
