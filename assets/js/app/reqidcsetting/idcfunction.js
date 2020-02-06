function gethisnameById(hisId) {
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
        return "Route_his_" + hisId;
    } else {
        return "Route_his_default" + 0;
    }
}

/**
 * 获得命名规则下的route名称
 * @param hisId
 * @returns {string}
 */
function getUpstreamName(hisId) {
    if (hisId != null && hisId != ""){
        return "upstream_his_" + hisId;
    } else {
        return "upstream_his_default" + 0;
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
    $.ajax({
        url: ' http://'+localIp+'/kong/services/',
        type: 'get',
        contentType: "application/x-www-form-urlencoded",
        headers:{'authorization': authorization},
        success: function (result) {
            for (var i = 0; i < result.data.length; i++){

            }
        }
    });
}