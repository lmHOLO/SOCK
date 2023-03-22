package com.holo.sock.service.recipe;

import com.holo.sock.dto.recipe.request.RegisterRecipeRequestDto;
import com.holo.sock.dto.recipe.response.RecipeDetailResponseDto;
import com.holo.sock.dto.tag.TagDto;
import com.holo.sock.entity.member.Member;
import com.holo.sock.entity.recipe.*;
import com.holo.sock.entity.snack.Snack;
import com.holo.sock.exception.likerecipe.LikeRecipeExistedException;
import com.holo.sock.exception.likerecipe.LikeRecipeNotFoundException;
import com.holo.sock.exception.recipe.RecipeNotFoundException;
import com.holo.sock.repository.recipe.CommentRepository;
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
import java.util.stream.Collectors;

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
    private final CommentRepository commentRepository;

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

    @Transactional
    public void deleteRecipe(Member loginMember, Long recipeId){
        Recipe recipe = recipeRepository.findByWriterAndId(loginMember,recipeId).orElseThrow(RecipeNotFoundException::new);

        List<Comment> commentList = commentRepository.findAllByRecipe(recipe);
        commentRepository.deleteAllInBatch(commentList);

        List<LikeRecipe> likeRecipes = likeRecipeRepository.findAllByRecipe(recipe);
        likeRecipeRepository.deleteAllInBatch(likeRecipes);

        recipeQScoreService.deleteRecipeQScore(recipe);

        List<Tag> tagList = tagRepository.findAllByRecipe(recipe);
        tagRepository.deleteAllInBatch(tagList);
        
        recipeRepository.delete(recipe);

    }

    @Transactional
    public RecipeDetailResponseDto detailRecipe(Member loginMember, Long recipeId){
        // 레시피 아이디별로 레시피 찾기
        Recipe recipe = recipeRepository.findFetchJoinById(recipeId).orElseThrow(RecipeNotFoundException::new);

        // 해당 레시피의 좋아요 가져오기
        Long totalLikes = likeRecipeRepository.countByRecipe(recipe);

        // loginMember에 따라 해당 레시피의 좋아요를 눌렀는지도 가져오기
        boolean existsLike = likeRecipeRepository.existsByMemberAndRecipe(loginMember, recipe);


        // 레시피에 해당한 태그 가져오기
        List<Tag> tagList = tagRepository.findAllFetchJoinByRecipe(recipe);
        List<TagDto> tagDtoList = tagList.stream()
                .map(tag -> new TagDto(tag))
                .collect(Collectors.toList());

        // 레시피 인기도 증가
        recipeQScoreService.addQScore(recipe);

        return new RecipeDetailResponseDto(recipe,tagDtoList,existsLike,totalLikes);

    }

}
