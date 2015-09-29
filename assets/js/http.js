$('#form').on( "submit", SubmitHandler );

var countComments = 0;

function RemoveComment() {
	$('.icon-cross' ).on( "click", function( event ) {
		var removeId = $( this );
		
		removeId.parent().parent().slideUp(
			function() {
				$( this ).remove();
				countComments--;
				$('.comments__title h2 span').text(countComments);
				//alert(removeId.attr('item-id'));
			}
		);
		
		var xhr = new XMLHttpRequest();
		xhr.open('DELETE', 'http://localhost:8080/comments/' + removeId.attr('item-id'), false);
		xhr.send();

	});
}

function SubmitHandler() {
	var sendText = $("[name='text']").val();
	if (!sendText) {
		return false;
	}
	$.ajax
    ({
        type: 'POST',
        url: 'http://localhost:8080/comments',
        dataType: 'json',
		contentType: "application/json",
		//crossDomain: "true",
        data: '{"text": "' + sendText + '"}',
        success: function (response) {
			$(".comments__title").after("<div class='comments__item'> <div class='comments__item-text'><p>" + response['0']['text'] + "</p><span class='icon-cross' item-id='" + response['0']['_id'] + "'></span></div></div>");
			//alert($("[name='text']").val());
        	//alert(response['0']['text']);
			$("[name='text']").val('');
			countComments++;
			$('.comments__title h2 span').text(countComments);
			RemoveComment();
        }
    });
	return false;
}

$( document ).ready(function() {
	$.ajax
    ({
        type: 'GET',
        url: 'http://localhost:8080/comments',
        dataType: 'json',
		crossDomain: "true",
        success: function (response) {
			countComments = response.length;
			$.each ( response, function( num, item ){
				$(".comments__title").after("<div class='comments__item'> <div class='comments__item-text'><p>" + item.text + "</p><span class='icon-cross' item-id='" + item._id + "'></span></div></div>");
			  	//console.log(item._id);
				//console.log(item.text);
			});		
			$('.comments__title h2 span').text(countComments);
			RemoveComment();
        }
    });

});