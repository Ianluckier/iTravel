(function($) {
    var NewBlogForm = $("#new-blog-form");
    var uploadBlogPicture = $("#upload-blog-picture");
    var uploadSuccess = $('#upload-success');
    var uploadAlert = $('#upload-alert')
    uploadBlogPicture.change(function(){
            var fileList = this.files; 
            console.log("pictureChanged: ",fileList)
    });
    if(typeof(String.prototype.trim) === "undefined")
    {
        String.prototype.trim = function() 
        {
            return String(this).replace(/^\s+|\s+$/g, '');
        };
    }
    NewBlogForm.submit(function(event){
        console.group("blog form submit!!!!!! ");
        event.preventDefault();  
        uploadAlert.addClass('hidden');
        let pic=uploadBlogPicture.get(0).files[0]; 
        var xhr = new XMLHttpRequest();
        var data = new FormData();
        data.append('images', pic);
        //console.log($(this).serializeArray());
        var fields= $(this).serializeArray()
        $.each(fields, function(i, fields){
            //console.log(fields.name,fields.value);
            if(fields.value.trim()==""){
                 uploadAlert.removeClass('hidden');
                 return false;
            }
            data.append(fields.name,fields.value);
        })
        xhr.open('POST', '/blog/new',true) //open(method,url,async,uname,pswd)
        xhr.responseType = 'text';
        xhr.onreadystatechange = function() {//Call a function when the state changes.
            if(this.readyState == 4 && this.status == 200) {
                let blogInfo = JSON.parse(this.responseText)
                console.log(blogInfo);
                uploadAlert.addClass('hidden');
                uploadSuccess.removeClass('hidden');
                setTimeout(function(){ 
                    location.href="/blog/id/"+blogInfo._id; 
                }, 500);                
            }
            else if(this.readyState == 4 && this.status == 400) {
                console.log(JSON.parse(this.responseText));
                uploadAlert.removeClass('hidden');
            };
        }
        xhr.send(data)
        console.groupEnd();                         
    })      


    // var blogInfoCommentForm = $("#blog-info-comment-form");
    // NewBlogForm.submit(function(event){
    //     console.group("blogInfoCommentForm form submit!!!!!! ");
    //     event.preventDefault();  
    //     var xhr = new XMLHttpRequest();
    //     var data = new FormData();
    //     data.append('images', pic);
    //     //console.log($(this).serializeArray());
    //     var fields= $(this).serializeArray()
    //     $.each(fields, function(i, fields){
    //         //console.log(fields.name,fields.value);
    //         data.append(fields.name,fields.value);
    //     })
    //     xhr.open('POST', '/blog/new',true) //open(method,url,async,uname,pswd)
    //     xhr.responseType = 'text';
    //     xhr.onreadystatechange = function() {//Call a function when the state changes.
    //         if(this.readyState == 4 && this.status == 200) {
    //             console.log(JSON.parse(this.responseText));
    //             uploadAlert.addClass('hidden');
    //             uploadSuccess.removeClass('hidden');
    //         }
    //         else if(this.readyState == 4 && this.status == 400) {
    //             console.log(JSON.parse(this.responseText));
    //             uploadAlert.removeClass('hidden');
    //         };
    //     }
    //     xhr.send(data)
    //     console.groupEnd();                         
    // })  

})(window.jQuery);



