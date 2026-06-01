package com.example.examappbackend.repository;

import com.example.examappbackend.entity.Question;
import com.example.examappbackend.entity.Module;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface QuestionRepository extends JpaRepository<Question, Long> {

    List<Question> findAllByModule(Module module);

    List<Question> findAllByModuleName(String name);
    // Take random 50 questions
    @Query(value = "SELECT * FROM question LIMIT 50", nativeQuery = true)
    List<Question> getFiftyRandomQuestions();
}
