package com.example.examappbackend.serviceImpl;

import com.example.examappbackend.entity.Question;
import com.example.examappbackend.repository.ModuleRepository;
import com.example.examappbackend.service.ExcelService;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.example.examappbackend.entity.Module;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

@Service
public class ExcelServiceImpl implements ExcelService {

    @Autowired
    ModuleRepository moduleRepository;

    @Override
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
                   Module module = moduleRepository.findByName(textCell.getStringCellValue()); 
                   question.setModule(module);
                }
                  // Column 1: Correct answer (index as string)
                Cell correctAnswerCell = row.getCell(1);
                if (correctAnswerCell != null) {
                    question.setCorrectAnswer(String.valueOf((int) correctAnswerCell.getNumericCellValue()-1));
                }

                // Column 2: Options (comma-separated)
                Cell optionsCell = row.getCell(2);
                if (optionsCell != null) {
                    question.setOptions(optionsCell.getStringCellValue());
                }

                 Cell descriptionCell = row.getCell(3);
                if (descriptionCell != null) {
                    question.setText(descriptionCell.getStringCellValue());
                }


                questions.add(question);
            }
        }

        return questions;
    }
}
