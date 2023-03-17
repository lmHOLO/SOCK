package com.holo.sock.service;

import com.holo.sock.dto.recipe.request.RegisterRecipeRequestDto;
import com.holo.sock.entity.member.Member;
import com.holo.sock.entity.recipe.Recipe;
import com.holo.sock.entity.recipe.RecipeImage;
import com.holo.sock.entity.recipe.Tag;
import com.holo.sock.entity.snack.Snack;
import com.holo.sock.exception.member.MemberNotFoundException;
import com.holo.sock.repository.member.MemberRepository;
import com.holo.sock.repository.recipe.RecipeRepository;
import com.holo.sock.repository.recipe.TagRepository;
import com.holo.sock.repository.snack.SnackRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class RecipeService {

    private final RecipeRepository recipeRepository;
    private final TagRepository tagRepository;
    private final SnackRepository snackRepository;
    private final MemberRepository memberRepository;

    @Transactional
    public void registerRecipe(RegisterRecipeRequestDto requestDto){
        Member member = memberRepository.findById(requestDto.getWriterId()).orElseThrow(MemberNotFoundException::new);

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
}
