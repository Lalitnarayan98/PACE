package com.example.examappbackend.service;

import com.example.examappbackend.entity.User;

public interface AnswerService {

    boolean saveAnswer(User user, long questionId, int correctAnswer);

}
