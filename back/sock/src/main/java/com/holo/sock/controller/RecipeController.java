package com.holo.sock.controller;

import com.holo.sock.common.response.ResponseService;
import com.holo.sock.common.result.Result;
import com.holo.sock.dto.recipe.request.RegisterRecipeRequestDto;
import com.holo.sock.service.RecipeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/recipes")
@RequiredArgsConstructor
public class RecipeController {
    private final ResponseService responseService;
    private final RecipeService recipeService;

    @PostMapping
    public Result registerRecipe(@RequestBody RegisterRecipeRequestDto requestDto){
        recipeService.registerRecipe(requestDto);
        return responseService.getSuccessResult();
    }
}
