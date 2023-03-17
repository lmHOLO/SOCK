package com.holo.sock.exception;

import com.holo.sock.common.response.ResponseService;
import com.holo.sock.common.result.Result;
import com.holo.sock.exception.snack.SnackNotFoundException;
import com.holo.sock.exception.type.TypeNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@RequiredArgsConstructor
public class ExceptionAdvice {

    private final ResponseService responseService;

    @ExceptionHandler(TypeNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public Result typeNotFoundException(){
        return responseService.getFailureResult(-100, "해당 과자 종류를 찾을 수 없습니다.");
    }

    @ExceptionHandler(SnackNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public Result snackNotFoundException(){
        return responseService.getFailureResult(-101, "해당 과자를 찾을 수 없습니다.");
    }
}
