package com.collections.web.website;

import java.util.List;

import com.collections.web.category.Category;
import com.collections.web.tag.Tag;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.JoinColumn;
@Entity
public class Website {
	@Id @GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer id;
	private String name;
	private String description;
	private String url;

	
	@ManyToMany
	@JoinTable(
			name="website_category",
			joinColumns = @JoinColumn(name = "website_id"),
			inverseJoinColumns=@JoinColumn(name="category_id"))
	private List<Category> categories;
	
	@ManyToMany
    @JoinTable(name="website_tag",
        joinColumns=@JoinColumn(name="website_id"),
        inverseJoinColumns=@JoinColumn(name="tag_id"))
    private List<Tag> tags;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}


	public List<Category> getCategories() {
		return categories;
	}

	public void setCategories(List<Category> categories) {
		this.categories = categories;
	}

	public List<Tag> getTags() {
		return tags;
	}

	public void setTags(List<Tag> tags) {
		this.tags = tags;
	}
	
	
	
}
