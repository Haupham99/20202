$("document").ready(function(){
    // Change avatar
    $("#avatar").on("change", function(){
        let src = this.value;
        // $("#avatar-img").attr("src", src);
        $("#avatar-img").attr("src", "images/" + src.split("\\")[2]);
            // $.ajax({
            //     url: "/user/update-avatar",
            //     type: "put",
            //     cache: false,
            //     contentType: false,
            //     data: src,
            //     success: function(result){
            //         console.log(result);
            //     },
            //     error: function(result){
            //         console.log(result);
            //     },
            // });
    });

});