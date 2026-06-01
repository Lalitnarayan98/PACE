package com.example.examappbackend.controller;

import com.example.examappbackend.entity.Answer;
import com.example.examappbackend.repository.AnswerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/answers")
public class AnswerController {

    @Autowired
    private AnswerRepository answerRepository;

    @GetMapping
    public List<Answer> getAllAnswers() {
        return answerRepository.findAll();
    }

    @PostMapping
    public Answer createAnswer(@RequestBody Answer answer) {
        return answerRepository.save(answer);
    }

    @GetMapping("/student/{studentId}")
    public List<Answer> getAnswersByStudent(@PathVariable Long studentId) {
        return answerRepository.findAll().stream()
                .filter(answer -> answer.getStudentId().equals(studentId))
                .toList();
    }
}