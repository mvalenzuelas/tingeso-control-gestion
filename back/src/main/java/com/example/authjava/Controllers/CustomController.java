package com.example.authjava.Controllers;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/custom")
@RestController
@RequiredArgsConstructor
@Slf4j
public class CustomController {

    @GetMapping("/")
    ResponseEntity getAll() {
        return ResponseEntity.status(201).body("All: Envío ok");
    }

    @GetMapping("/{id}/books")
    ResponseEntity getBooks(@PathVariable Integer id) {
        return ResponseEntity.status(201).body(String.format("Books: Envío ok con id = {}", id));
    }

}
