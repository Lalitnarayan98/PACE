package com.example.examappbackend.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.examappbackend.entity.Question;
import com.example.examappbackend.repository.QuestionRepository;
import com.example.examappbackend.service.QuestionService;

@Service
public class QuestionServiceImpl implements QuestionService {

    @Autowired
    QuestionRepository questionRepository;

    @Override
    public List<Question> getAllQuestions() {
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
        return questions;
    }

    @Override
    public void saveAllQuestions(List<Question> questions) {
      try {
            questionRepository.saveAll(questions);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
