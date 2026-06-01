package com.example.examappbackend.entity;

import java.util.List;

import jakarta.persistence.*;

@Entity
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String text;

    private String options;

    private String correctAnswer;

    @ManyToOne
    @JoinColumn(name = "module", referencedColumnName = "id")
    private Module module;

    @Transient
    private List<String> optionsArray;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getOptions() {
        return options;
    }

    public void setOptions(String options) {
        this.options = options;
    }

    public String getCorrectAnswer() {
        return correctAnswer;
    }

    public void setCorrectAnswer(String correctAnswer) {
        this.correctAnswer = correctAnswer;
    }

    public List<String> getOptionsArray() {
        return optionsArray;
    }

    public void setOptionsArray(List<String> optionsArray) {
        this.optionsArray = optionsArray;
    }
}