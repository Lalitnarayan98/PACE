package com.example.examappbackend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.examappbackend.entity.Module;

public interface ModuleRepository extends JpaRepository<Module, Integer>{
    Module findByName(String name); 
}
