$("document").ready(function(){
    $(".resend-request").click(function(){
        let userId = $(this).find('p').text();
        $.ajax({
            url: "/resend-request/" + userId ,
            type: "POST",
            contentType: false,
            success: function(result){
                console.log(result);
            },
            error: function(result){
                // console.log(result);
            },
        });
    });
});