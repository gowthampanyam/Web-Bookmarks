package com.collections.web.tag;

import java.util.List;

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
@RequestMapping("/api/tags")
public class TagController {
	@Autowired
	private TagRepository repo;
	
	@GetMapping
	public List<Tag> readAll() {
		return repo.findAll();
	}
	
	@GetMapping("/{id}")
	Tag get(@PathVariable int id) {
		Tag t = repo.findById(id).orElse(null);
		if (t == null) throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Tag Not Found");
		return t;
	}
	
	@PostMapping
	Tag create(@RequestBody Tag t) {
		repo.saveAndFlush(t);
		return t;
	}
	
	@PutMapping(value="/{id}", produces="application/json", consumes="application/json")
	Tag update(@PathVariable int id, @RequestBody Tag t) {
		repo.saveAndFlush(t);
		return t;
	}
	
	@DeleteMapping("/{id}")
	Tag delete(@PathVariable int id) {
		Tag t = repo.findById(id).orElse(null);
		if (t==null) throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Tag Not Found");
		repo.deleteById(id);
		return t;
	
	}
}
