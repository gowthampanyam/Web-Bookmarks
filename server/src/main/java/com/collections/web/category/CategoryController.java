package com.collections.web.category;

import java.util.List;

import org.apache.coyote.RequestInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {
	@Autowired
	private CategoryRepository repo;
	
	@GetMapping
	public List<Category> readAll() {
		return repo.findAll();
	}
	
	@GetMapping("/{id}")
	Category get(@PathVariable int id) {
		Category c = repo.findById(id).orElse(null);
		if (c == null) throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Category Not Found");
		return c;
	}
	
	@PostMapping
	Category create(@RequestBody Category c) {
		repo.saveAndFlush(c);
		return c;
	}
	
	@PutMapping(value="/{id}", produces="application/json", consumes="application/json")
	Category update(@PathVariable int id, @RequestBody Category c) {
		repo.saveAndFlush(c);
		return c;
	}
	
	@DeleteMapping("/{id}")
	Category delete(@PathVariable int id) {
		Category c = repo.findById(id).orElse(null);
		if (c==null) throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Foo Not Found");
		repo.deleteById(id);
		return c;
	
	}
	
}
