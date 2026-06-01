package com.example.examappbackend.controller;

import com.example.examappbackend.entity.Question;
import com.example.examappbackend.repository.QuestionRepository;
import com.example.examappbackend.service.ExcelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Controller
public class ExamController {

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private ExcelService excelService;

    @GetMapping("/")
    public String index(Model model) {
        List<Question> questions = questionRepository.getFiftyRandomQuestions();
        for(Question q : questions){
            String option = q.getOptions();
            // Parse JSON options or split by comma
            String[] optionsArray;
            if (option.startsWith("[")) {
                // Remove brackets and split by comma
                String cleaned = option.replaceAll("\\[", "").replaceAll("\\]", "").replaceAll("\"", "");
                optionsArray = cleaned.split(",");
            } else {
                optionsArray = option.split(",");
            }
            List<String> optionsList = List.of(optionsArray).stream().map(String::trim).toList();
            q.setOptionsArray(optionsList);
        }
        model.addAttribute("questions", questions);
        return "index";
    }

    @GetMapping("/api/exam")
    public String exam(Model model, @RequestParam("module_name") String moduleName) {
        List<Question> questions = questionRepository.findAllByModuleName(moduleName);
        for(Question q : questions){
            String option = q.getOptions();
            // Parse JSON options or split by comma
            String[] optionsArray;
            if (option.startsWith("[")) {
                // Remove brackets and split by comma
                String cleaned = option.replaceAll("\\[", "").replaceAll("\\]", "").replaceAll("\"", "");
                optionsArray = cleaned.split(",");
            } else {
                optionsArray = option.split(",");
            }
            List<String> optionsList = List.of(optionsArray).stream().map(String::trim).toList();
            q.setOptionsArray(optionsList);
        }
        model.addAttribute("questions", questions);
        return "index";
    }

    @PostMapping("/upload")
    public String uploadExcel(@RequestParam("file") MultipartFile file, Model model) {
        try {
            List<Question> questions = excelService.parseExcelFile(file);
            questionRepository.saveAll(questions);
            model.addAttribute("message", "Successfully uploaded " + questions.size() + " questions!");
        } catch (Exception e) {
            model.addAttribute("error", "Failed to upload file: " + e.getMessage());
        }
        return "redirect:/";
    }
}
