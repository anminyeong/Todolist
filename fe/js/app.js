(function (window) {
	'use strict';

	var filter_mode = 'All';
	// Your starting point. Enjoy the ride!
	showTodolist(filter_mode);


	//insert todo
	$(".new-todo").keyup(function(e){

			var inputVal = $(this).val();
			if(e.keyCode == 13 && inputVal){
				$.ajax({
					url:"api/todos",
	 				method:"POST",
	 				data:JSON.stringify({"todo":inputVal, "completed":0}),
	 				headers:{
	 					"Content-Type":"application/json"
	 				},
					success: function(){
						$('.new-todo').val('');
						showTodolist(filter_mode);
					},
					error: function(e){
						alert('error');
						location.href = "./";
					}
				});
			};

	});


	function showTodolist(filter){

		var requestURL = "";
		if(filter === "Active"){
 			requestURL = "/filter/0";
 		}else if(filter === "Completed"){
 			requestURL = "/filter/1";
 		}

		$.ajax({
			url: "api/todos" +requestURL,
			method:"GET",
			success: function(data){
				var html = "";
				var cnt = 0;
				var if_complete = 0;

				//show list
				for(var i=0; i<data.length; i++){

					if(data[i].completed == 1){
						if_complete = 1;
					}

					html += '<li '+(data[i].completed == 0?"":'class="completed"')+' id="list'+data[i].id+'">';
					html += '<div class="view">';
					html += '<input class="toggle" type="checkbox" '+(data[i].completed == 0 ? "" : 'checked')+'>';
					html += '<label>'+data[i].todo+'</label>';
					html += '<button class="destroy"></button>';
					html += '</div>';
					html += '<input class="edit" value="Create a TodoMVC template">';
					html += '</li>';
					cnt++;
				}
				$(".todo-list").html(html);
				$(".todo-count strong").html(cnt);

				//clear 버튼 숨김
				if(if_complete){
					$(".clear-completed").css('display', 'block');
				}else{
					$(".clear-completed").css('display', 'none');
				}
			},
			error: function(e){

				location.href = "./";
			}
		});
	}

	$('.todo-list').on('click','.toggle', function(e){
 			var $li = $(e.target).parent().parent();
 			var isCompleted = 0;	//0미완, 1완료

 			if($li.attr("class") === "completed"){
 				isCompleted = 0;
 			}else{
 				isCompleted = 1;
 			}
 			var id =  $li.attr("id").replace("list","");
			$.ajax({
 				url:"api/todos/"+id,
 				method:"PUT",
 				data:JSON.stringify({"todo":$li.text(), "completed":isCompleted}),
 				headers:{
 					"Content-Type":"application/json"
 				},
 				success:function(data){
 					showTodolist(filter_mode);
 				}
 			});
 		});//체크버튼


		$('.todo-list').on('click', '.destroy',function(e){
 			var $li = $(e.target).parent().parent();
 			var id =  $li.attr("id").replace("list","");

 			$.ajax({
 				url:"api/todos/"+id,
 				method:"DELETE",
 				success:function(data){
 					showTodolist(filter_mode);
 				}
 			});
 		});


 		$('#filterAll, #filterActive, #filterCompleted').click(function(e){
 			e.preventDefault();

 			filter_mode = $(e.target).attr('id').replace('filter', '');
 			var all = $('#filterAll');
 			var active = $('#filterActive');
 			var completed = $('#filterCompleted');

 			if(filter_mode === 'All'){
 				all.attr('class', 'selected');
 				active.attr('class', '');
 				completed.attr('class', '');
 			}else if(filter_mode === 'Active'){
 				all.attr('class', '');
 				active.attr('class', 'selected');
 				completed.attr('class', '');
 			}else if(filter_mode === 'Completed'){
 				all.attr('class', '');
 				active.attr('class', '');
 				completed.attr('class', 'selected');
 			}

 			showTodolist(filter_mode);

 		});

		$('.clear-completed').on('click',function(e){

	 		$.ajax({
	 			url:"api/todos/completed-item",
	 			method:"DELETE",
	 			success:function(data){
	 				showTodolist(filter_mode);
	 			}
	 		});
 		});

})(window);
