/**
 * Created by Wuzhi Liu on 2017/6/22.
 */
$.ajax({
    type:"GET",
    url:"../model/html_style.json",
        dataType:"json",
        async:false,
    success:function(model){
        if(model && model["head"]){
            var datas = model["head"];
            for(var i = 0 ; i < datas.length ; i++){
                document.write("<link type='" + datas[i].styleType +"' rel='"+ datas[i].styleRel + "' href='.." + datas[i].styleHref + "'/>");
            }
        }
    }
});