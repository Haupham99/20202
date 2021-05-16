$("document").ready(function(){
    // Comment
    $(".cancel-comment").click(function(){
        console.log("Clicked!");
        $(".textarea-comment").val("");
    });

    // Post comment
    $(".post-comment").click(function(){
        let a = $(this);
        let postId = a.parents().eq(0).find('p').text();
        let userId = sessionStorage.getItem("userId");
        let userIdPost = $(this).parents().eq(2).find('h1').text();
        // console.log("hello: " + userIdPost);
        let comment = a.parents().eq(1).find("textarea").val().trim();
        if(comment != ""){
            $.ajax({
                url: "/comment/" + postId + "/" + userId + "/" + comment,
                type: "POST",
                contentType: false,
                success: function(result){
                    a.parents().eq(2).find(".comment-wrapper .media-list").append(`
                    <li class="media">
                     <a href="` + result.data.username + `" class="pull-left">
                     <img class="rounded-circle" src="images/` + result.data.avatar + `" width="40">
                     </a>
                     <div class="media-body">
                        <span class="text-muted pull-right">
                        <small class="text-muted">Vừa xong</small>
                        </span>
                        <strong class="text-success">` + result.data.username + `</strong>
                        <p>` + 
                            result.data.comment  
                        + `</p>
                     </div>
                  </li>
                    `);
                    a.parents().eq(1).find("textarea").val("");
                    // console.log(a.parents().eq(3).find(".comment span").text());
                    a.parents().eq(2).find(".comment span").text(parseInt(a.parents().eq(2).find(".comment span").text()) + 1);
                    socket.emit("comment-post", {userIdPost: userIdPost});
                },
                error: function(result){
                    console.log(result);
                },
            });
        };
    });

    // View all comment    
    $("ul.media-list .media").find('p:first').each(function(index) {
        if(parseInt($(this).text()) > 2){
            $(this).parents().eq(0).addClass("display-two two-comment");
        };
    });

    $("p.all-comment").click(function(){
        console.log($(this));
        $(this).parents().eq(0).find(".two-comment").toggleClass("display-two");
    });

    $(".comment").each(function(index){
        if(parseInt($(this).find('span').text()) < 3){
            $(this).parents().eq(4).find("p.all-comment").css("display", "none");
        };
    });
});
