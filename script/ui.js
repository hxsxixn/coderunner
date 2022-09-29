
const codeRunner = {};

codeRunner.syncTab = () => {
    $("h5").click(function(){
        $(".code-container").css("width","0");
        $("textarea").fadeOut(500);
        $(this).next(".code-container").css("width","calc(100% - 100px)");
        $(this).next(".code-container").children("textarea").fadeIn(500);
    });
}

codeRunner.sample = () => {
    $("#sample").click(function(){
        jQuery.get('../demo_html.txt',function(data){$("#html-code").val(data);});
        jQuery.get('../demo_css.txt',function(data){$("#css-code").val(data);});
        jQuery.get('../demo_js.txt',function(data){$("#js-code").val(data);$(document).ready(run());});
    })
}

codeRunner.saveFile = (deta,filename) => {
    let file = new Blob([deta], {type: 'text/plain'});
    if (window.navigator.msSaveOrOpenBlob)
        window.navigator.msSaveOrOpenBlob(file, filename);
    else {
        let a = document.createElement("a"),
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

codeRunner.run = () => {
    let html_code = $("#html-code").val();
    let css_code = $("#css-code").val();
    let js_code = $("#js-code").val();
    $("#result").contents().find("style").html(css_code);
    $("#result").contents().find("main").html(html_code);
    $("#result").contents().find("script").next("script").html(js_code);
}

codeRunner.eventListner = function(){
    const self = this;
    $("#run-btn").click(function(){
        self.run();
    })
    
    $("#clear").click(function(){
        $("#html-code,#css-code,#js-code").val("");
        self.run();
    })

    $("#save-btn").click(function(){
        html_code = $("#result").val();
        // css_code = $("#css-code").val();
        // js_code = $("#js-code").val();
        self.saveFile(html_code,"html_code.text");
        // saveFile_html(css_code,"css_code.css");
        // saveFile_html(js_code,"js_code.js");
    })
}

codeRunner.init = function(){
    this.syncTab()
    this.eventListner();
}

$(()=>{
    codeRunner.init();
})