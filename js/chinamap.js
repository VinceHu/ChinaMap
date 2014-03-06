$(document).ready(function() {

    Map();

});

function Map() {
    /*
     * 配置Raphael生成svg的属性
     */
    Raphael.getColor.reset(); // 复位色谱位置
    var R = Raphael("map", 650, 500); //大小与矢量图形文件图形对应；
    var current = null;

    //省份文字样式；
    var textAttr = {
        "fill": "#fff",
        "font-size": "12px",
        "cursor": "pointer"
    };

    var textAttr2 = {
        "fill": "#000",
        "font-size": "12px",
        "cursor": "pointer"
    };

    //调用绘制地图方法
    paintMap(R);

    var ToolTip = $('#ToolTip');
    $('body').append("<div id='tiplayer' style='display:none'></div>");
    var tiplayer = $('#tiplayer');
    for (var state in china) {

        china[state]['path'].transform("t30,0");

        (function(st, state) {
            //***获取当前图形的中心坐标
            var xx = st.getBBox().x + (st.getBBox().width / 2);
            var yy = st.getBBox().y + (st.getBBox().height / 2);

            //***修改部分地图文字偏移坐标
            switch (china[state]['name']) {
                case "江苏":
                    xx += 5;
                    yy -= 10;
                    break;
                case "河北":
                    xx -= 10;
                    yy += 20;
                    break;
                case "天津":
                    xx += 20;
                    yy += 10;
                    break;
                case "上海":
                    xx += 20;
                    break;
                case "广东":
                    yy -= 10;
                    break;
                case "澳门":
                    yy += 10;
                    break;
                case "香港":
                    xx += 20;
                    yy += 5;
                    break;
                case "甘肃":
                    xx -= 40;
                    yy -= 30;
                    break;
                case "陕西":
                    xx += 5;
                    yy += 20;
                    break;
                case "内蒙古":
                    xx -= 15;
                    yy += 65;
                    break;
                default:
            }
            //图形的点击事件
            $(st[0]).click(function(e) {

                clickMap();

            });
            //移入事件,显示信息
            $(st[0]).hover(function(e) {

                if (e.type == 'mouseenter') {
                    tiplayer.text(china[state]['name']).css({
                        'opacity': '0.75',
                        'top': (e.pageY + 10) + 'px',
                        'left': (e.pageX + 10) + 'px'
                    }).fadeIn('normal');

                } else {
                    if (tiplayer.is(':animated')) tiplayer.stop();
                    tiplayer.hide();

                }

            });

            function clickMap() {

                if (current == state) return;

                //重置上次点击的图形
                current && china[current]['path'].animate({
                    transform: "t30,0",
                    fill: china[current]['isClick'] ? china[current]['path'].color : "#6da8ca",
                    stroke: "#fff"
                }, 2000, "elastic");

                $("text").remove(); //删除节点

                current = state; //将当前值赋给变量

                //对本次点击
                china[state]['path'].animate({
                    transform: "t30,0 s1.03 1.03",
                    fill: "#abd3df", //fill 填充颜色
                    stroke: "#e6dddd"
                }, 2000, "elastic");
                st.toFront(); //向上
                R.safari();
                china[state]['text'] = R.text(xx, yy, china[state]['name']).attr(textAttr)
                china[state]['text'].toFront();

                if (china[current] === undefined) return;

                //select显示选中的城市
                $("#select-city").find("[value='" + china[current]['name'] + "']").attr('selected', 'selected')
            }

            $('#select-city').change(function() {

                var checkText = $(this).find("option:selected").text()

                if (current == checkText) return;

                //重置上次点击的图形
                current && china[current]['path'].animate({
                    transform: "t30,0",
                    fill: china[current]['isClick'] ? china[current]['path'].color : "#6da8ca",
                    stroke: "#fff"
                }, 2000, "elastic");

                $("text").remove(); //删除节点

                current = checkText; //将当前值赋给变量

                //对本次点击
                china[checkText]['path'].animate({
                    transform: "t30,0 s1.03 1.03",
                    fill: "#f90", //fill 填充颜色
                    stroke: "#e6dddd"
                }, 2000, "elastic");

                //china[checkText]['text'] = R.text(xx, yy, china[checkText]['name']).attr(textAttr2)

                if (china[current] === undefined) return;
            })



        })

        (china[state]['path'], state);
    }
}