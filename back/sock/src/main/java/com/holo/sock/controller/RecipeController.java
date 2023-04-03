package com.holo.sock.controller;

import com.holo.sock.common.annotation.LoginMember;
import com.holo.sock.common.response.ResponseService;
import com.holo.sock.common.result.ListResult;
import com.holo.sock.common.result.Result;
import com.holo.sock.common.result.SingleResult;
import com.holo.sock.dto.comment.response.CommentResponseDto;
import com.holo.sock.dto.recipe.request.RegisterCommentRequestDto;
import com.holo.sock.dto.recipe.request.RegisterRecipeRequestDto;
import com.holo.sock.dto.recipe.request.UpdateRecipeRequestDto;
import com.holo.sock.dto.recipe.response.LikeRecipeResponseDto;
import com.holo.sock.dto.recipe.response.RecipeByContainsSnackResponseDto;
import com.holo.sock.dto.recipe.response.RecipeDetailResponseDto;
import com.holo.sock.dto.recipe.response.RecipeSearchListResponseDto;
import com.holo.sock.entity.member.Member;
import com.holo.sock.entity.recipe.Recipe;
import com.holo.sock.service.recipe.CommentService;
import com.holo.sock.service.recipe.RecipeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/recipes")
@RequiredArgsConstructor
public class RecipeController {
    private final ResponseService responseService;
    private final RecipeService recipeService;
    private final CommentService commentService;

    @PostMapping
    public SingleResult<Long> registerRecipe(@LoginMember Member member, @RequestBody RegisterRecipeRequestDto requestDto){
        Long saveRecipeId = recipeService.registerRecipe(member, requestDto);
        return responseService.getSingleResult(saveRecipeId);
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

    @DeleteMapping("/{recipe-id}")
    public Result deleteRecipe(@LoginMember Member member, @PathVariable("recipe-id") Long recipeId){
        recipeService.deleteRecipe(member, recipeId);
        return responseService.getSuccessResult();
    }

    @GetMapping("/{recipe-id}")
    public SingleResult<RecipeDetailResponseDto> detailRecipe(@LoginMember Member member, @PathVariable("recipe-id") Long recipeId){
        RecipeDetailResponseDto recipeDetailResponseDto = recipeService.detailRecipe(member, recipeId);
        return responseService.getSingleResult(recipeDetailResponseDto);

    }
    @PutMapping("/{recipe-id}")
    public Result updateRecipeDetail(@LoginMember Member member,@PathVariable("recipe-id") Long recipeId,
                                     @RequestBody UpdateRecipeRequestDto updateDto){
        recipeService.updateRecipeDetail(member, recipeId, updateDto);
        return responseService.getSuccessResult();
    }

    @GetMapping("/like")
    public ListResult<LikeRecipeResponseDto> likeRecipeList(@RequestParam("member-id") Long memberId){
        List<LikeRecipeResponseDto> responseDto = recipeService.likeRecipeList(memberId);
        return responseService.getListResult(responseDto);
    }

    @GetMapping("/contain")
    public ListResult<RecipeByContainsSnackResponseDto> recipesByContainsSnack (
            @RequestParam(value = "snack-id" ,required = false) Long snackId
            ,@RequestParam(value = "recipe-id",required = false) Long recipeId){
        List<RecipeByContainsSnackResponseDto> recipes = recipeService.containsRecipeList(snackId, recipeId);
        return responseService.getListResult(recipes);
    }

    @GetMapping()
    public SingleResult<Page<RecipeSearchListResponseDto>> searchRecipeList(
            @LoginMember Member member,
            @RequestParam(value = "keyword" ,required = false) String keyword
            ,@RequestParam(value = "arrange",required = false) String arrange
            ,@RequestParam(value = "member-id",required = false) Long memberId
            ,@PageableDefault(size = 10) Pageable pageable
    ){
        Page<RecipeSearchListResponseDto> responseDto = recipeService.searchRecipeList(member,keyword, arrange, memberId,pageable);
        return responseService.getSingleResult(responseDto);
    }
}
