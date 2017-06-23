/**
 * Created by Administrator on 2017/6/22.
 */
$.ajax({
    type:"GET",
    url:"../model/html_script.json",
    dataType:"json",
    async:false,
    success:function (model) {
        if(model){
            var datas = model["head"];
            for(var i = 0 ; i<datas.length ; i++){
                document.write("<script type='" + datas[i].type + "' src='.." + datas[i].src + "'></script>");
            }
        }
    }
});
