package com.holo.sock.exception;

import com.holo.sock.common.response.ResponseService;
import com.holo.sock.common.result.Result;
import com.holo.sock.exception.comment.CommentNotFoundException;
import com.holo.sock.exception.likerecipe.LikeRecipeExistedException;
import com.holo.sock.exception.likerecipe.LikeRecipeNotFoundException;
import com.holo.sock.exception.likesnack.LikeSnackExistedException;
import com.holo.sock.exception.likesnack.LikeSnackNotFoundException;
import com.holo.sock.exception.member.MemberNotFoundException;
import com.holo.sock.exception.recipe.RecipeListParamException;
import com.holo.sock.exception.recipe.RecipeNotFoundException;
import com.holo.sock.exception.recipe.UsedRecipeParamException;
import com.holo.sock.exception.recipeqscore.RecipeQScoreNotFoundException;
import com.holo.sock.exception.review.ReviewExistedException;
import com.holo.sock.exception.review.ReviewNotFoundException;
import com.holo.sock.exception.snack.SimilarSnackParamException;
import com.holo.sock.exception.snack.SnackNotFoundException;
import com.holo.sock.exception.snackqscore.SnackQScoreNotFoundException;
import com.holo.sock.exception.type.TypeNotFoundException;
import io.jsonwebtoken.JwtException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@RequiredArgsConstructor
public class ExceptionAdvice {

    private final ResponseService responseService;

    @ExceptionHandler(JwtException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public Result jwtException(){
        return responseService.getFailureResult(-99, "토큰이 없습니다.");
    }

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

    @ExceptionHandler(ReviewNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public Result reviewNotFoundException(){
        return responseService.getFailureResult(-102, "해당 리뷰를 찾을 수 없습니다.");
    }

    @ExceptionHandler(LikeSnackExistedException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Result likeSnackExistedException(){
        return responseService.getFailureResult(-103, "이미 좋아요한 과자입니다.");
    }

    @ExceptionHandler(LikeSnackNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public Result likeSnackNotFoundException(){
        return responseService.getFailureResult(-104, "해당 과자 좋아요를 찾을 수 없습니다.");
    }

    @ExceptionHandler(SnackQScoreNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public Result snackQScoreNotFoundException(){
        return responseService.getFailureResult(-105, "해당 과자 인기도를 찾을 수 없습니다.");
    }

    @ExceptionHandler(ReviewExistedException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Result reviewExistedException(){
        return responseService.getFailureResult(-106, "이미 리뷰를 작성한 과자입니다.");
    }

    @ExceptionHandler(SimilarSnackParamException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Result similarSnackParamException(){
        return responseService.getFailureResult(-107, "유사한 과자 목록 시 파라미터가 올바르지 않습니다.");
    }


    @ExceptionHandler(MemberNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public Result memberNotFoundException(){
        return responseService.getFailureResult(-200, "해당 회원을 찾을 수 없습니다.");
    }


    @ExceptionHandler(RecipeNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public Result recipeNotFoundException() { return responseService.getFailureResult(-300,"해당 레시피를 찾을 수 없습니다.");}

    @ExceptionHandler(CommentNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public Result commentNotFoundException() { return responseService.getFailureResult(-301,"해당 댓글을 찾을 수 없습니다.");}

    @ExceptionHandler(LikeRecipeExistedException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public Result likeRecipeExistedException(){ return responseService.getFailureResult(-302,"이미 좋아요 누른 레시피입니다.");}

    @ExceptionHandler(LikeRecipeNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public Result likeRecipeNotFoundException(){ return responseService.getFailureResult(-303,"해당 레시피 좋아요를 찾을 수 없습니다.");}

    @ExceptionHandler(RecipeQScoreNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public Result recipeQScoreNotFoundException(){
        return responseService.getFailureResult(-304, "해당 레시피 인기도를 찾을 수 없습니다.");
    }
    @ExceptionHandler(UsedRecipeParamException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public Result usedRecipeParamException(){
        return responseService.getFailureResult(-305, "해당 과자를 사용한 레시피 목록 시 파라미터가 올바르지 않습니다.");
    }
    @ExceptionHandler(RecipeListParamException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public Result recipeListParamException(){
        return responseService.getFailureResult(-306,"레시피 목록시 파라미터가 올바르지 않습니다.");
    }
}
