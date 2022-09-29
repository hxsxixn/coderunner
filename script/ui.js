
const codeRunner = {};

let html_code = $("#html-code").val();
let css_code = $("#css-code").val();
let js_code = $("#js-code").val();

codeRunner.getCode = () => {
    html_code = $("#html-code").val();
    css_code = $("#css-code").val();
    js_code = $("#js-code").val();
}

codeRunner.syncTab = () => {
    $("h5").click(function(){
        $(".code-container").css("width","0");
        $("textarea").fadeOut(500);
        $(this).next(".code-container").css("width","calc(100% - 100px)");
        $(this).next(".code-container").children("textarea").fadeIn(500);
    });
}

codeRunner.sample = () => {
    $("#sample").on('click',function(){
        jQuery.get('../demo_html.txt',function(data){$("#html-code").val(data);});
        jQuery.get('../demo_css.txt',function(data){$("#css-code").val(data);});
        jQuery.get('../demo_js.txt',function(data){
            const ifram = $(document.getElementsByTagName('iframe')[0].contentWindow);
            $("#js-code").val(data);
            $(ifram).ready(codeRunner.run());
        });
    })
}

codeRunner.new = () => {
    $("#new-btn").on('click',function(){
        jQuery.get('../single/index.html',function(data){
            $('main').html(data);
            const swiper = new Swiper('.swiper',{
                pagination: {el:'.swiper-pagination'},
                loop: true,
                slidesPerview: 'auto',
                speed: 1000,
                autoplay:{
                  delay: 2000,
                  disableOnInteraction: false,
                },
              })
              console.log('swiper init')
        });
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
    codeRunner.getCode();
    $("#result").contents().find("main").html(html_code);
    $("#result").contents().find("style").html(css_code);
    $("#result").contents().find("script").next("script").html(js_code);
}

codeRunner.eventListner = function(){
    const self = this;

    self.sample();
    self.new();

    $("#run-btn").on('click',function(){
        self.run();
    })
    
    $("#clear").on('click',function(){
        $('main').text('');
        $("#html-code,#css-code,#js-code").val("");
        self.run();
    })

    $("#save-btn").on('click',function(){
        html_code = $("#result").val();
        self.saveFile(html_code,"html_code.text");
    })
}

codeRunner.init = function(){
    this.syncTab()
    this.eventListner();
}



$(()=>{
    codeRunner.init();
})

