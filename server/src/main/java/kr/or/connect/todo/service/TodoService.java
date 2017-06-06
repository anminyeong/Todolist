package kr.or.connect.todo.service;

import java.util.List;

import org.springframework.stereotype.Component;

import kr.or.connect.domain.Todo;
import kr.or.connect.todo.persistence.TodoDao;


@Component
public class TodoService {
	
	private TodoDao dao;

	public TodoService(TodoDao dao) {
		this.dao = dao;
	}
	
	public List<Todo> selectAll(){
		return dao.selectAll();
	}
	
	public Todo insert(Todo todo){
		return dao.insert(todo);
	}
	
	public List<Todo> selectByCompleted(int completed){
		return dao.selectByCompleted(completed);
 	}
 	
 	public int updateById(Todo todo){
 		return dao.updateById(todo);
 	}
 	
 	public int deleteById(int id){
 		return dao.deleteById(id);
 	}
 	
 	public int deleteCompleted(){
 		return dao.deleteCompleted();
 	}
}
