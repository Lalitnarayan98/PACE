package com.example.examappbackend.service;

import com.example.examappbackend.entity.Question;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

@Service
public class ExcelService {

    public List<Question> parseExcelFile(MultipartFile file) throws IOException {
        List<Question> questions = new ArrayList<>();

        try (InputStream inputStream = file.getInputStream();
             Workbook workbook = new XSSFWorkbook(inputStream)) {

            Sheet sheet = workbook.getSheetAt(0);

            for (int i = 1; i <= sheet.getLastRowNum(); i++) {
                Row row = sheet.getRow(i);
                if (row == null) continue;

                Question question = new Question();
                
                // Column 0: Question text
                Cell textCell = row.getCell(0);
                if (textCell != null) {
                    question.setText(textCell.getStringCellValue());
                }

                // Column 1: Options (comma-separated)
                Cell optionsCell = row.getCell(1);
                if (optionsCell != null) {
                    question.setOptions(optionsCell.getStringCellValue());
                }

                // Column 2: Correct answer (index as string)
                Cell correctAnswerCell = row.getCell(2);
                if (correctAnswerCell != null) {
                    question.setCorrectAnswer(String.valueOf((int) correctAnswerCell.getNumericCellValue()));
                }

                questions.add(question);
            }
        }

        return questions;
    }
}
