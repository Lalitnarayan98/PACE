package com.example.examappbackend.controller;

import com.example.examappbackend.entity.Question;
import com.example.examappbackend.service.ExcelService;
import com.example.examappbackend.service.QuestionService;

import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Controller
public class ExamController {

    @Autowired
    private QuestionService questionservice;

    @Autowired
    private ExcelService excelService;

    @GetMapping("/")
    public String index(Model model, HttpSession session) {
        if (session.getAttribute("user") == null) {
            return "redirect:/login";
        }
        List<Question> questions = questionservice.getAllQuestions();
        model.addAttribute("questions", questions);
        model.addAttribute("user", session.getAttribute("user"));
        return "index";
    }

    @PostMapping("/upload")
    public String uploadExcel(@RequestParam("file") MultipartFile file, Model model) {
        try {
            List<Question> questions = excelService.parseExcelFile(file);
            questionservice.saveAllQuestions(questions);
            model.addAttribute("message", "Successfully uploaded " + questions.size() + " questions!");
        } catch (Exception e) {
            model.addAttribute("error", "Failed to upload file: " + e.getMessage());
        }
        return "redirect:/";
    }
}
