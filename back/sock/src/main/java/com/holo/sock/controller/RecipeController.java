package com.holo.sock.controller;

import com.holo.sock.common.annotation.LoginMember;
import com.holo.sock.common.response.ResponseService;
import com.holo.sock.common.result.Result;
import com.holo.sock.common.result.SingleResult;
import com.holo.sock.dto.comment.response.CommentResponseDto;
import com.holo.sock.dto.recipe.request.RegisterCommentRequestDto;
import com.holo.sock.dto.recipe.request.RegisterRecipeRequestDto;
import com.holo.sock.entity.member.Member;
import com.holo.sock.service.recipe.CommentService;
import com.holo.sock.service.recipe.RecipeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/recipes")
@RequiredArgsConstructor
public class RecipeController {
    private final ResponseService responseService;
    private final RecipeService recipeService;
    private final CommentService commentService;

    @PostMapping
    public Result registerRecipe(@LoginMember Member member, @RequestBody RegisterRecipeRequestDto requestDto){
        recipeService.registerRecipe(member,requestDto);
        return responseService.getSuccessResult();
    }

    @PostMapping("/{recipe-id}/comments")
    public Result registerComment(@LoginMember Member member, @PathVariable("recipe-id") Long recipeId,
                                  @RequestBody RegisterCommentRequestDto requestDto){
        commentService.registerComment(member,requestDto,recipeId);
        return responseService.getSuccessResult();
    }
    @DeleteMapping("/{recipe-id}/comments/{comment-id}")
    public Result deleteComment(@LoginMember Member member, @PathVariable("recipe-id") Long recipeId,
                                @PathVariable("comment-id") Long commentId){
        commentService.deleteComment(member, recipeId, commentId);
        return responseService.getSuccessResult();
    }
    @PostMapping("/{recipe-id}/like")
    public Result likeRecipe(@LoginMember Member member, @PathVariable("recipe-id") Long recipeId){
        recipeService.likeRecipe(member,recipeId);
        return responseService.getSuccessResult();
    }
    @DeleteMapping("/{recipe-id}/like")
    public Result deleteLikeRecipe(@LoginMember Member member,@PathVariable("recipe-id") Long recipeId){
        recipeService.deleteLikeRecipe(member,recipeId);
        return responseService.getSuccessResult();
    }
    @GetMapping("/{recipe-id}/comments")
    public SingleResult<Page<CommentResponseDto>> commentList(@LoginMember Member loginMember,
                                                                 @PathVariable("recipe-id") Long recipeId,
                                                                 @PageableDefault(size = 10) Pageable pageable){
        Page<CommentResponseDto> commentResponseDtos = commentService.selectComment(loginMember, recipeId, pageable);
        return responseService.getSingleResult(commentResponseDtos);
    }

  


}
