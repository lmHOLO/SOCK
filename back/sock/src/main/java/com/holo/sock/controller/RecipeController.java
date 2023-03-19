package com.holo.sock.controller;

import com.holo.sock.common.annotation.LoginMember;
import com.holo.sock.common.response.ResponseService;
import com.holo.sock.common.result.Result;
import com.holo.sock.dto.recipe.request.RegisterCommentRequestDto;
import com.holo.sock.dto.recipe.request.RegisterRecipeRequestDto;
import com.holo.sock.entity.member.Member;
import com.holo.sock.service.recipe.CommentService;
import com.holo.sock.service.recipe.RecipeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
}
