package com.holo.sock.service.recipe;

import com.holo.sock.dto.recipe.request.RegisterCommentRequestDto;
import com.holo.sock.entity.member.Member;
import com.holo.sock.entity.recipe.Comment;
import com.holo.sock.entity.recipe.Recipe;
import com.holo.sock.exception.recipe.RecipeNotFoundException;
import com.holo.sock.repository.recipe.CommentRepository;
import com.holo.sock.repository.recipe.RecipeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CommentService {
    private final RecipeRepository recipeRepository;
    private final CommentRepository commentRepository;

    @Transactional
    public void registerComment(Member writer, RegisterCommentRequestDto requestDto,Long recipeId){
        Recipe recipe = recipeRepository.findById(recipeId).orElseThrow(RecipeNotFoundException::new);

        Comment comment = requestDto.toEntity(writer);
        commentRepository.save(comment);

    }
}
