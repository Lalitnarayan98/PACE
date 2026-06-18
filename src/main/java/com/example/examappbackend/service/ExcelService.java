package com.example.examappbackend.service;

import java.io.IOException;
import java.util.List;
import org.springframework.web.multipart.MultipartFile;
import com.example.examappbackend.entity.Question;

public interface ExcelService {
    List<Question> parseExcelFile(MultipartFile file) throws IOException;  
} 