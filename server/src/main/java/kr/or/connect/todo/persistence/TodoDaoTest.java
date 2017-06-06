package kr.or.connect.todo.persistence;
 
 import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import kr.or.connect.domain.Todo;
 
 @RunWith(SpringRunner.class)
 @SpringBootTest	
 @Transactional		
 public class TodoDaoTest {
 
 	@Autowired	
 	private TodoDao dao;
 	
 	@Test	
 	public void shouldSelectAll(){
 		//given
 		
 		//when
 		List<Todo> allTodos = dao.selectAll();
		
		//then
		assertThat(allTodos.size(), is(6));	
	}
	
	@Test
	public void shouldInsert(){
		//given
 		Todo todo = new Todo("할일 테스트", 0);
 		todo.setDate(new Timestamp(new Date().getTime()));
 		
 		//when
 		Todo insertedTodo = dao.insert(todo);
 		
 		//then
 		assertThat(insertedTodo.getTodo(), is("할일 테스트"));
 	}
 	
 	@Test
 	public void shouldSelectByCompleted(){
 		//when
 		List<Todo> selectedTodo = dao.selectByCompleted(1);
 		
 		//then
 		assertThat(selectedTodo.size(), is(1));
 	}
 }