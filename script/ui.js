$("h5").click(function(){
    $(".code-container").css("width","0");
    $("textarea").fadeOut(500);
    $(this).next(".code-container").css("width","calc(100% - 100px)");
    $(this).next(".code-container").children("textarea").fadeIn(500);
});

function run(){
    var html_code = $("#html-code").val();
    var css_code = $("#css-code").val();
    var js_code = $("#js-code").val();
    $("#result").contents().find("style").html(css_code);
    $("#result").contents().find("main").html(html_code);
    $("#result").contents().find("script").next("script").html(js_code);
}

$("#run-btn").click(function(){
    run();
    // var html_code = $("#html-code").val();
    // var css_code = $("#css-code").val();
    // var js_code = $("#js-code").val();
    // $("#result").contents().find("style").html(css_code);
    // $("#result").contents().find("main").html(html_code);
    // $("#result").contents().find("script").next("script").html(js_code);
    // // $("#result").contentWindow.eval(js_code);
    // document.getElementsById('result').contentWindow.eval($("textarea#js-code").val());
})

$("#clear").click(function(){
    $("#html-code,#css-code,#js-code").val("");
    run();
})


$("#sample").click(function(){
    // $("#html-code").val("<img id='cat' src='https://awiclass.monoame.com/catpic/cat_leftop.png' /\><div id='cross'></div>");
    jQuery.get('../demo_html.txt',function(data){$("#html-code").val(data);});
    jQuery.get('../demo_css.txt',function(data){$("#css-code").val(data);});
    jQuery.get('../demo_js.txt',function(data){$("#js-code").val(data);$(document).ready(run());});
})

function saveFile_html(deta,filename) {
    var file = new Blob([deta], {type: 'text/plain'});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
}

$("#save-btn").click(function(){
    html_code = $("#result").val();
    // css_code = $("#css-code").val();
    // js_code = $("#js-code").val();
    saveFile_html(html_code,"html_code.text");
    // saveFile_html(css_code,"css_code.css");
    // saveFile_html(js_code,"js_code.js");
})