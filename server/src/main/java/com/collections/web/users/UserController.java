package com.collections.web.users;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.collections.web.security.User;
import com.collections.web.security.UserRepository;


@RestController
@RequestMapping("/api/users")
public class UserController {

	@Autowired
	UserRepository repo;
	
	@GetMapping
	public Iterable<User> getAll() {
		Iterable<User> all=repo.findAll();
		all.forEach(u -> u.setPassword(""));
		return all;
	}
	
	@Autowired
	BCryptPasswordEncoder encoder;
	
	@PostMapping
	public ResponseEntity<?> createUser(@RequestBody User user) {
		if (user==null) return SuccessInfo.badRequest("No user data");
		if (user.getPassword().isBlank()) return SuccessInfo.badRequest("Bad password");
		if (user.getUsername().isBlank()) return SuccessInfo.badRequest("Bad username");
		String pw=encoder.encode(user.getPassword());
		user.setPassword(pw);
		String role="user";
		if (!user.getRole().isBlank()) role=user.getRole();
		user.setRole(role);
		user.setEnabled(true);
		repo.save(user);
		user.setPassword("");
		return ResponseEntity.ok(user);
	}
	
	@PutMapping("{id}")
	public ResponseEntity<?> saveUser(@PathVariable long id,@RequestBody User user) {
		if (id!=user.getId()) return SuccessInfo.badRequest("ID Mismatch");
		User orig=repo.findById(id).orElse(null);
		if (orig==null) return SuccessInfo.notFound("User not found");
		if (user==null) return SuccessInfo.badRequest("No user data");
		if (user.getUsername().isBlank()) return SuccessInfo.badRequest("Bad username");
		if (!user.getPassword().isBlank()) {
			String pw=encoder.encode(user.getPassword());
			orig.setPassword(pw);
		}
		orig.setUsername(user.getUsername());
		String role=orig.getRole();
		if (!user.getRole().isBlank()) role=user.getRole();
		orig.setRole(role);
		orig.setEnabled(user.isEnabled());
		repo.save(orig);
		orig.setPassword("");
		return ResponseEntity.ok(orig);
	}
	
}
