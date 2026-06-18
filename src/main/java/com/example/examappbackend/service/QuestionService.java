package com.example.examappbackend.service;

import java.util.List;

import com.example.examappbackend.entity.Question;

public interface QuestionService {
    public List<Question> getAllQuestions();
    public void saveAllQuestions(List<Question> questions);
}
