

function gethisnamelikeById(hisId) {
    var hisName = [];
    $.ajax({
        url: 'http://uoms.med.gzhc365.com/api/point/front/searchhisinfo',
        type: 'get',
        data : {
            'searchKey' : hisId
        },
        success:function (result) {
            for (var i=0; i<result.data.length;i++){
                hisName.push(result.data[i].hisName)
            }
        }
    });
    return hisName;
}

function gethisnameByhisid(hisId) {
    var hisName;
    if (hisinfo != null){
        for (var i=0; i<hisinfo.length; i++){
            if (hisinfo[i].hisId == hisId){
                hisName = hisinfo[i].hisName;
            }
        }
    }
    return hisName;
}

// function sethisInfo() {
//     $.ajax({
//         url: 'http://uoms.med.gzhc365.com/api/point/front/gethisinfo',
//         type: 'get',
//         async:false,
//         success:function (result) {
//            if (result.hasOwnProperty("data")) {
//                hisinfo = result.data;
//                return hisinfo;
//            }
//         }
//     });
//     return hisinfo;
// }


/**
 * 获得命名规则下的service名称
 * @param hisId
 * @returns {string}
 */
function getServiceName(hisId) {
    if (hisId != null && hisId != ""){
        return "service_his_" + hisId;
    } else {
        return "service_his_default" + 0;
    }
}

/**
 * 获得命名规则下的route名称
 * @param hisId
 * @returns {string}
 */
function getRouteName(hisId) {
    if (hisId != null && hisId != ""){
        return "route_his_" + hisId;
    } else {
        return "route_his_default" + 0;
    }
}

/**
 * 获得命名规则下的route名称
 * @param hisId
 * @returns {string}
 */
function getUpstreamName(hisId) {
    if (hisId != 0){
        if (hisId != null && hisId != ""){
            return "upstream_his_" + hisId;
        } else {
            return "upstream_his_default" + 0;
        }
    }else {
        return "upstream_his_" + hisId;
    }

}

function getRouteHostName(hisId) {
    if (hisId != null && hisId != ""){
        return "his_" + hisId;
    } else {
        return "his_default" + 0;
    }
}

function interHtml() {
    $(".searchRq").val("");
    $.ajax({
        url: ' http://'+localIp+'/kong/services/',
        type: 'get',
        contentType: "application/x-www-form-urlencoded",
        headers:{'authorization': authorization},
        success: function (result) {
            $(".mainbodyinfo").html("");
            $(".mainbodyinfo").append(header);
            if (result.hasOwnProperty("data")){
                var data = result.data;
                for (var i = 0; i < data.length; i++){
                    var serviceName = data[i].name;
                    if(serviceName.search('service_his') != -1 && serviceName.split("_").length > 2 ){
                        var serviceId = data[i].id;
                        var host = data[i].host;
                        var hisId = serviceName.split("_")[2];
                        var hisName = gethisnameByhisid(hisId);
                        var gzPer = 0;
                        var szPer = 0;
                        var targets = getTargetsByUpstreamName(host);
                        console.log("targets"+targets);
                        for (var j=0; j < targets.length; j++){
                            if (targets[j].target == szTarget){
                                szPer = targets[j].weight;
                            }else if (targets[j].target == gzTarget) {
                                gzPer = targets[j].weight;
                            }
                        }
                        var tr = "<tr class=\"ng-scope\">\n" +
                            "                                        <td>\n" +
                            "                                            <span class=\"text-nowrap clickable ng-binding ng-isolate-scope\" ><i uib-tooltip=\"Raw view\" class=\"mdi mdi-eye-outline\"></i></span>\n" +
                            "                                        </td>\n" +
                            "                                        <td class=\"ng-binding serviceHisId\">"+hisId+"</td>\n" +
                            "                                        <td class=\"ng-binding serviceHisName\">\n" +
                            hisName +
                            "                                        </td>\n" +
                            "                                        <td class=\"ng-binding serviceGz\">"+gzPer+"%</td>\n" +
                            "                                        <td class=\"ng-binding serviceSz\">"+szPer+"%</td>\n" +
                            " <td class=\"ng-scope\" >\n" +
                            "                                        <a class=\"clickable btn btn-link btn-warning editReq\">\n" +
                            "                                        <i class=\"mdi mdi-pencil\"></i>\n" +
                            "                                        edit\n" +
                            "                                    </a>"+
                            "                                        <td class=\"ng-scope\">\n" +
                            "                                            <button type=\"button\"  class=\"btn btn-danger btn-link delReq\">\n" +
                            "                                                <i class=\"mdi mdi-delete\"></i>\n" +
                            "                                                Delete\n" +
                            "                                            </button>\n" +
                            "<input type=\"hidden\" value='"+serviceId+"' class='serviceIdValue'/>"+
                            "<input type=\"hidden\" value='"+host+"'  class='servicehostValue'/>"+
                            "                                        </td>\n" +
                            "                                    </tr>";
                        if (hisId == 0){
                            hisName = "默认路由";
                            var trdefault = "<tr class=\"ng-scope\">\n" +
                                "                                        <td>\n" +
                                "                                            <span class=\"text-nowrap clickable ng-binding ng-isolate-scope\" ><i uib-tooltip=\"Raw view\" class=\"mdi mdi-eye-outline\"></i></span>\n" +
                                "                                        </td>\n" +
                                "                                        <td class=\"ng-binding serviceHisId\">-</td>\n" +
                                "                                        <td class=\"ng-binding serviceHisName\">\n" +
                                hisName +
                                "                                        </td>\n" +
                                "                                        <td class=\"ng-binding serviceGz\">"+gzPer+"%</td>\n" +
                                "                                        <td class=\"ng-binding serviceSz\">"+szPer+"%</td>\n" +
                                " <td class=\"ng-scope\" >\n" +
                                "                                        <a class=\"clickable btn btn-link btn-warning editReq\">\n" +
                                "                                        <i class=\"mdi mdi-pencil\"></i>\n" +
                                "                                        edit\n" +
                                "                                    </a>"+
                                "                                        <td class=\"ng-scope\">\n" +
                                "<input type=\"hidden\" value='"+serviceId+"' class='serviceIdValue'/>"+
                                "<input type=\"hidden\" value='"+host+"'  class='servicehostValue'/>"+
                                "                                        </td>\n" +
                                "                                    </tr>";
                            $(".tableTitle").after(trdefault);
                        } else {
                            $(".mainbodyinfo").append(tr);
                        }

                    }
                }
            }

        }
    });
}


function getUpstreamByName(upstreamName) {
    var upstreamId = "";
    $.ajax({
        url: ' http://'+localIp+'/kong/upstreams/'+upstreamName,
        type: 'get',
        contentType: "application/x-www-form-urlencoded",
        headers:{'authorization': authorization},
        success: function (result) {
            upstreamId = result.id;
        }
    });
    return upstreamId;
}

function getTargetsByUpstreamName(upstreamName) {
    var weight = [];
    $.ajax({
        url: ' http://'+localIp+'/kong/upstreams/'+upstreamName+'/targets',
        type: 'get',
        contentType: "application/x-www-form-urlencoded",
        headers:{'authorization': authorization},
        async:false,
        success: function (result) {
            if (result.hasOwnProperty("data")) {
                weight = result.data;
                return weight;
            }
        },error: function (jqXHR, textStatus, errorThrown) {
            alert("未找到Upstream："+upstreamName);
        }
    });
    return weight;
}

function fillWeight(focusWeight){
    $(".reqPer").html("");
    $(".addreqPer").html("");
    for (var i=0; i <= 100; i++){
        var select;
        if (i == focusWeight){
            select = "<option value="+i+" selected = 'selected'>"+i+"%</option>";
        } else {
            select = "<option value="+i+">"+i+"%</option>";
        }

        $(".reqPer").append(select);
        $(".addreqPer").append(select);
    }
}