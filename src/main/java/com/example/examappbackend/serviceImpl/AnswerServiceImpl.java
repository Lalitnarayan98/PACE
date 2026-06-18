package com.example.examappbackend.serviceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.examappbackend.entity.Answer;
import com.example.examappbackend.entity.Question;
import com.example.examappbackend.entity.User;
import com.example.examappbackend.repository.AnswerRepository;
import com.example.examappbackend.repository.QuestionRepository;
import com.example.examappbackend.service.AnswerService;

@Service
public class AnswerServiceImpl implements AnswerService {

    @Autowired
    AnswerRepository answerRepository;

    @Autowired
    QuestionRepository questionRepository;

    // @Override
    // public boolean saveAnswer(User user, long questionId, int correctAnswer) {
    //     boolean isSaved = false;
    //     try {
    //         Question question = questionRepository.findById(questionId).get();
    //         Answer answer = new Answer();
    //         answer.setUser(user);
    //         answer.setQuestion(question);
    //         answer.setCorrectAnswer(correctAnswer);
    //         answer.setAnswerText(question.getOptionsArray().get(correctAnswer));
    //         Answer savedAnswer = answerRepository.save(answer);
    //         if (savedAnswer != null) {
    //             isSaved = true;
    //         }
    //     } catch (Exception e) {
    //         e.printStackTrace();
    //         isSaved = false;
    //     }
    //     return isSaved;
    // }
    @Override
    public boolean saveAnswer(User user, long questionId, int correctAnswer) {
        try {
            Question question = questionRepository.findById(questionId).orElse(null);
            if (question == null) {
                return false;
            }

            // Check if answer already exists for this user and question
            Answer existingAnswer = answerRepository.findAll().stream()
                    .filter(a -> a.getUser().getId().equals(user.getId()) && a.getQuestion().getId().equals(questionId))
                    .findFirst()
                    .orElse(null);

            if (existingAnswer != null) {
                // Update existing answer
                existingAnswer.setCorrectAnswer(correctAnswer);
                answerRepository.save(existingAnswer);
            } else {
                // Create new answer
                Answer answer = new Answer();
                answer.setUser(user);
                answer.setQuestion(question);
                answer.setCorrectAnswer(correctAnswer);
                answerRepository.save(answer);
            }
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}
