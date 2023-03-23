package com.holo.sock.service.recipe;

import com.holo.sock.dto.recipe.request.RegisterRecipeRequestDto;
import com.holo.sock.dto.recipe.request.UpdateRecipeRequestDto;
import com.holo.sock.dto.recipe.response.LikeRecipeResponseDto;
import com.holo.sock.dto.recipe.response.RecipeDetailResponseDto;
import com.holo.sock.dto.recipeImage.RecipeImageDto;
import com.holo.sock.dto.tag.TagDto;
import com.holo.sock.entity.member.Member;
import com.holo.sock.entity.recipe.*;
import com.holo.sock.entity.snack.Snack;
import com.holo.sock.exception.likerecipe.LikeRecipeExistedException;
import com.holo.sock.exception.likerecipe.LikeRecipeNotFoundException;
import com.holo.sock.exception.member.MemberNotFoundException;
import com.holo.sock.exception.recipe.RecipeNotFoundException;
import com.holo.sock.exception.recipe.SimilarRecipeParamException;
import com.holo.sock.repository.member.MemberRepository;
import com.holo.sock.repository.recipe.CommentRepository;
import com.holo.sock.repository.recipe.LikeRecipeRepository;
import com.holo.sock.repository.recipe.RecipeRepository;
import com.holo.sock.repository.recipe.TagRepository;
import com.holo.sock.repository.snack.SnackRepository;
import com.holo.sock.service.member.GradeService;
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
    private final MemberRepository memberRepository;
    private final GradeService gradeService;

    @Transactional
    public void registerRecipe(Member writer,RegisterRecipeRequestDto requestDto){
        Recipe recipe = Recipe.builder()
                .writer(writer)
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
        gradeService.addExp(writer, gradeService.REGISTER_RECIPE);

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
        LikeRecipe savedLikeRecipe = likeRecipeRepository.save(likeRecipe);
        loginMember.getLikeRecipes().add(savedLikeRecipe);

        recipeQScoreService.addQScore(recipe);
        gradeService.addExp(recipe.getWriter(), gradeService.GET_LIKE_TO_RECIPE);
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

        Recipe recipe = recipeRepository.findFetchJoinById(recipeId).orElseThrow(RecipeNotFoundException::new);

        Long totalLikes = likeRecipeRepository.countByRecipe(recipe);

        boolean existsLike = likeRecipeRepository.existsByMemberAndRecipe(loginMember, recipe);

        List<RecipeImageDto> recipeImageDtoList = recipe.getImages().stream()
                .map(recipeImage -> new RecipeImageDto(recipeImage))
                .collect(Collectors.toList());

        List<Tag> tagList = tagRepository.findAllFetchJoinByRecipe(recipe);
        List<TagDto> tagDtoList = tagList.stream()
                .map(tag -> new TagDto(tag))
                .collect(Collectors.toList());

        recipeQScoreService.addQScore(recipe);

        return new RecipeDetailResponseDto(recipe,tagDtoList,recipeImageDtoList,existsLike,totalLikes);

    }
    @Transactional
    public void updateRecipeDetail(Member loginMember,Long recipeId, UpdateRecipeRequestDto updateDto){
        Recipe recipe = recipeRepository.findByWriterAndId(loginMember,recipeId).orElseThrow(RecipeNotFoundException::new);

        List<Tag> tags = tagRepository.findAllByRecipe(recipe);

        recipe.getImages().clear();

        List<String> imageName = updateDto.getImages();
        for (String name : imageName) {
            recipe.getImages().add(
                    RecipeImage.builder()
                            .recipe(recipe)
                            .name(name)
                            .build()
            );
        }

        recipe.updateRecipe(updateDto.getTitle(), updateDto.getContent(), recipe.getImages());

        tagRepository.deleteAllInBatch(tags);

        List<Long> snackIds = updateDto.getSnackIds();

        List<Snack> snacks = snackRepository.findByIdIn(snackIds);
        for(Snack snack: snacks){
            Tag saveTag = Tag.builder()
                    .snack(snack)
                    .recipe(recipe)
                    .build();

            tagRepository.save(saveTag);
        }

    }

    public List<LikeRecipeResponseDto> likeRecipeList(Long memberId){
        Member member = memberRepository.findById(memberId).orElseThrow(MemberNotFoundException::new);

        return member.getLikeRecipes().stream()
                .map(likeRecipe -> LikeRecipeResponseDto.createFromLikeRecipe(likeRecipe.getRecipe()))
                .collect(Collectors.toList());

    }
    // (1) 해당 과자를 사용한 레시피 추천, (2) 해당과자를 사용한 레시피 추천
    public void similarRecipeList(Long snackId,Long recipeId){
        if((snackId == null && recipeId == null) || (snackId != null && recipeId != null)){
            throw new SimilarRecipeParamException();
        }else if(snackId != null){ // snackid 일 경우 -> 해당 과자를 사용한 레시피 추천
            List<Recipe> recipesBySnack = recipeRepository.findBySnackIdWithTag(snackId);

        }else { // recipeid일 경우 -> 태그(해당 과자)를 사용한 레시피 추천

        }

    }

}
