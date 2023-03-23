package com.holo.sock.service.recipe;

import com.holo.sock.dto.comment.response.CommentResponseDto;
import com.holo.sock.dto.recipe.request.RegisterCommentRequestDto;
import com.holo.sock.entity.member.Member;
import com.holo.sock.entity.recipe.Comment;
import com.holo.sock.entity.recipe.Recipe;
import com.holo.sock.exception.comment.CommentNotFoundException;
import com.holo.sock.exception.recipe.RecipeNotFoundException;
import com.holo.sock.repository.recipe.CommentRepository;
import com.holo.sock.repository.recipe.RecipeRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

        Comment comment = requestDto.toEntity(writer,recipe);
        commentRepository.save(comment);

    }
    @Transactional
    public void deleteComment(Member writer, Long recipeId, Long commentId){
        Recipe recipe = recipeRepository.findById(recipeId).orElseThrow(RecipeNotFoundException::new);

        Comment comment = commentRepository.findByWriterAndIdAndRecipe(writer, commentId,recipe).orElseThrow(CommentNotFoundException::new);
        commentRepository.delete(comment);
    }

    public Page<CommentResponseDto> selectComment(Member loginMember, Long recipeId, Pageable pageable) {
        Page<Comment> commentPage = commentRepository.findByRecipeId(recipeId,pageable);

        Page<CommentResponseDto> result = commentPage.map(comment -> new CommentResponseDto(comment));

        for (CommentResponseDto dto : result) {
            dto.checkMyComment(loginMember);
        }


        return result;
    }
}
