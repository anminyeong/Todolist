package kr.or.connect.domain;

import java.sql.Timestamp;
import java.util.Date;

public class Todo {
	private Integer id;
	private String todo;
	private Integer completed;
	private Date date;
	
	public Todo() {
 		super();
 	}
	
	public Todo(String todo, int completed) {
		super();
		this.todo = todo;
		this.completed = completed;
	}

	 public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getTodo() {
		return todo;
	}

	public void setTodo(String todo) {
		this.todo = todo;
	}

	public Integer getCompleted() {
		return completed;
	}

	public void setCompleted(Integer completed) {
		this.completed = completed;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Timestamp date) {
		this.date = date;
	}

	public String toString() {
	 	return "TODO [id=" + id + ", todo=" + todo + ", completed=" + completed + ", date=" + date + "]";
	 }
	
}


//id INT IDENTITY NOT NULL PRIMARY KEY AUTO_INCREMENT,
//todo TEXT,
//completed INT(1) NOT NULL DEFAULT 0,
//date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP