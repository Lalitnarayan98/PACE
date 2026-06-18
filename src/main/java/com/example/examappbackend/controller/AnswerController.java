package com.example.examappbackend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import com.example.examappbackend.entity.User;
import com.example.examappbackend.service.AnswerService;

import jakarta.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;


@Controller
@RequestMapping("/answers")
public class AnswerController {

    @Autowired
    AnswerService answerService;

    @PostMapping("/save")
    @ResponseBody
    public ResponseEntity<Map<String, Object>> saveAnswer(HttpSession session, @RequestParam("answer") int correctAnswer, @RequestParam("questionId") int questionId){
        Map<String, Object> response = new HashMap<>();
        User user = (User) session.getAttribute("user");
        if (user == null) {
            response.put("success", false);
            response.put("message", "Not logged in");
            return ResponseEntity.ok(response);
        }
        boolean saved = answerService.saveAnswer(user, questionId, correctAnswer);
        response.put("success", saved);
        response.put("message", saved ? "Answer saved successfully" : "Failed to save answer");
        return ResponseEntity.ok(response);
    }
}
