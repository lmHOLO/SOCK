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
import com.holo.sock.repository.member.MemberRepository;
import com.holo.sock.repository.recipe.CommentRepository;
import com.holo.sock.repository.recipe.LikeRecipeRepository;
import com.holo.sock.repository.recipe.RecipeRepository;
import com.holo.sock.repository.recipe.TagRepository;
import com.holo.sock.repository.snack.SnackRepository;
import com.holo.sock.service.qscore.RecipeQScoreService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
        LikeRecipe savedLikeRecipe = likeRecipeRepository.save(likeRecipe);
        loginMember.getLikeRecipes().add(savedLikeRecipe);

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

        // 해당 레시피의 이미지 가져오기
        List<RecipeImageDto> recipeImageDtoList = recipe.getImages().stream()
                .map(recipeImage -> new RecipeImageDto(recipeImage))
                .collect(Collectors.toList());

        // 레시피에 해당한 태그 가져오기
        List<Tag> tagList = tagRepository.findAllFetchJoinByRecipe(recipe);
        List<TagDto> tagDtoList = tagList.stream()
                .map(tag -> new TagDto(tag))
                .collect(Collectors.toList());

        // 레시피 인기도 증가
        recipeQScoreService.addQScore(recipe);

        return new RecipeDetailResponseDto(recipe,tagDtoList,recipeImageDtoList,existsLike,totalLikes);

    }
    @Transactional
    public void updateRecipeDetail(Member loginMember,Long recipeId, UpdateRecipeRequestDto updateDto){
        // 해당 번호 레시피 아이디 찾기 , 해당 회원
        Recipe recipe = recipeRepository.findByWriterAndId(loginMember,recipeId).orElseThrow(RecipeNotFoundException::new);

        List<Tag> tags = tagRepository.findAllByRecipe(recipe);
        //업데이트 - 변경감지
        // recipe.updateDetail , 제목 내용 태그 이미지만 바꿀 수 있다

        //이미지를 전부 삭제했다가 다시 builder
        // 등록된 레시피에 있는 첫번째 이미지 제거 -> 등록되어 있던 image과의 관계 끊어짐
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


        // 1. 태그를 전부 삭제하고 다시 builder
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
        // 해당 회원이 좋아요 누른 레시피
        Member member = memberRepository.findById(memberId).orElseThrow(MemberNotFoundException::new);

        return member.getLikeRecipes().stream()
                .map(likeRecipe -> LikeRecipeResponseDto.createFromLikeRecipe(likeRecipe.getRecipe()))
                .collect(Collectors.toList());

    }

}
