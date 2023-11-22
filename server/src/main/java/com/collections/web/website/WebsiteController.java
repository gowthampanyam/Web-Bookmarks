package com.collections.web.website;

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

import com.collections.web.category.Category;
import com.collections.web.category.CategoryRepository;
import com.collections.web.tag.Tag;
import com.collections.web.tag.TagRepository;


@RestController
@RequestMapping("/api/websites")
public class WebsiteController {
	private final WebsiteRepository websiteRepository;


    @Autowired
    public WebsiteController(WebsiteRepository websiteRepository) {
        this.websiteRepository = websiteRepository;
    }

    @GetMapping
    public List<Website> getAllWebsites() {
        return websiteRepository.findAll();
    }

    @GetMapping("/{id}")
    public Website getWebsiteById(@PathVariable int id) {
        return websiteRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Website Not Found"));
    }
    
    
    @PostMapping
	Website create(@RequestBody Website t) {
		websiteRepository.saveAndFlush(t);
		return t;
	}
	
	@PutMapping("/{id}")
	Website save(@PathVariable int id, @RequestBody Website t) {
		websiteRepository.saveAndFlush(t);
		return t;
	}
	
    
    


    @DeleteMapping("/{id}")
    public Website deleteWebsite(@PathVariable int id) {
        Website website = websiteRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Website Not Found"));

        websiteRepository.deleteById(id);
        return website;
    }
}
