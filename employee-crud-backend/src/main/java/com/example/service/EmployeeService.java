package com.example.service;


import com.example.dto.EmployeeDTO;
import com.example.entity.Employee;
import com.example.exception.ResourceNotFoundException;
import com.example.repository.EmployeeRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class EmployeeService {

    private final EmployeeRepository repository;

    public EmployeeService(EmployeeRepository repository) {
        this.repository = repository;
    }

    // Helper: convert Entity -> DTO
    private EmployeeDTO toDTO(Employee e) {
        return new EmployeeDTO(e.getId(), e.getFirstName(), e.getLastName(), e.getEmail(), e.getSalary());
    }

    // Helper: convert DTO -> Entity
    private Employee toEntity(EmployeeDTO dto) {
        Employee e = new Employee();
        e.setFirstName(dto.getFirstName());
        e.setLastName(dto.getLastName());
        e.setEmail(dto.getEmail());
        e.setSalary(dto.getSalary());
        return e;
    }

    public List<EmployeeDTO> getAll() {
        return repository.findAll().stream().map(this::toDTO).collect(Collectors.toList());
    }

    public EmployeeDTO getById(Long id) {
        Employee e = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Employee not found with id " + id));
        return toDTO(e);
    }

    public EmployeeDTO create(EmployeeDTO dto) {
        // simple uniqueness check
        if (repository.existsByEmail(dto.getEmail())) {
            throw new IllegalArgumentException("Email already exists");
        }
        Employee e = toEntity(dto);
        Employee saved = repository.save(e);
        return toDTO(saved);
    }

    public EmployeeDTO update(Long id, EmployeeDTO dto) {
        Employee existing = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Employee not found with id " + id));
        existing.setFirstName(dto.getFirstName());
        existing.setLastName(dto.getLastName());
        existing.setEmail(dto.getEmail());
        existing.setSalary(dto.getSalary());
        Employee saved = repository.save(existing);
        return toDTO(saved);
    }

    public void delete(Long id) {
        Employee existing = repository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Employee not found with id " + id));
        repository.delete(existing);
    }
}
