package com.holo.sock.service.recipe;

import com.holo.sock.dto.recipe.request.RegisterRecipeRequestDto;
import com.holo.sock.entity.member.Member;
import com.holo.sock.entity.recipe.LikeRecipe;
import com.holo.sock.entity.recipe.Recipe;
import com.holo.sock.entity.recipe.RecipeImage;
import com.holo.sock.entity.recipe.Tag;
import com.holo.sock.entity.snack.Snack;
import com.holo.sock.exception.likerecipe.LikeRecipeExistedException;
import com.holo.sock.exception.likerecipe.LikeRecipeNotFoundException;
import com.holo.sock.exception.member.MemberNotFoundException;
import com.holo.sock.exception.recipe.RecipeNotFoundException;
import com.holo.sock.repository.member.MemberRepository;
import com.holo.sock.repository.recipe.LikeRecipeRepository;
import com.holo.sock.repository.recipe.RecipeRepository;
import com.holo.sock.repository.recipe.TagRepository;
import com.holo.sock.repository.snack.SnackRepository;
import com.holo.sock.service.qscore.RecipeQScoreService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class RecipeService {

    private final RecipeRepository recipeRepository;
    private final TagRepository tagRepository;
    private final SnackRepository snackRepository;
    private final LikeRecipeRepository likeRecipeRepository;
    private final RecipeQScoreService recipeQScoreService;

    @Transactional
    public void registerRecipe(Member member,RegisterRecipeRequestDto requestDto){
        Recipe recipe = Recipe.builder()
                .writer(member)
                .title(requestDto.getTitle())
                .content(requestDto.getContent())
                .images(new ArrayList<>())
                .build();

        List<String> imageName = requestDto.getImages();
        for (String name : imageName) {
            recipe.getImages().add(
                    RecipeImage.builder()
                            .recipe(recipe)
                            .name(name)
                            .build()
            );
        }

        Recipe saveRecipe = recipeRepository.save(recipe);

        List<Long> snackIds = requestDto.getSnackIds();
        List<Snack> snacks = snackRepository.findByIdIn(snackIds);
        for(Snack snack: snacks){
            Tag saveTag = Tag.builder()
                    .snack(snack)
                    .recipe(saveRecipe)
                    .build();

            tagRepository.save(saveTag);
        }

    }
    @Transactional
    public void likeRecipe(Member loginMember,Long recipeId){
        Recipe recipe = recipeRepository.findById(recipeId).orElseThrow(RecipeNotFoundException::new);

        boolean existedLikeRecipe = likeRecipeRepository.existsByMemberAndRecipe(loginMember, recipe);
        if(existedLikeRecipe) throw new LikeRecipeExistedException();

        LikeRecipe likeRecipe = LikeRecipe.builder()
                .member(loginMember)
                .recipe(recipe)
                .build();
        likeRecipeRepository.save(likeRecipe);

        recipeQScoreService.addQScore(recipe);
    }

    @Transactional
    public void deleteLikeRecipe(Member loginMember,Long recipeId){
        Recipe recipe = recipeRepository.findById(recipeId).orElseThrow(RecipeNotFoundException::new);

        LikeRecipe likeRecipe = likeRecipeRepository.findByMemberAndRecipe(loginMember, recipe)
                .orElseThrow(LikeRecipeNotFoundException::new);

        likeRecipeRepository.delete(likeRecipe);
        recipeQScoreService.subQScore(recipe);
    }


}
