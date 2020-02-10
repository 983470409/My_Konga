/**
 * 授权码
 * @type {string}
 */
var authorization = "Bearer eyJhbGciOiJIUzI1NiJ9.MQ.Lu-KcR4aCeuT9hi1K474zV3s4VaopLDCcf4nZvH6DQo";
/**
 * http请求ip
 * @type {string}
 */
var localIp = '192.168.11.113:1337';
// var localIp = '192.168.111.140:1337';

/**
 * 创建的默认协议
 * @type {string}
 */
var protocol = 'http';

/**
 * 广州机房入口
 * @type {string}
 */
var gzTarget = '58.67.212.249:80';

/**
 * 深圳机房入口
 * @type {string}
 */
var szTarget = '119.147.23.83:80';

var routeHeaderKey = 'hisid';

/**
 * 表格头孢
 * @type {string}
 */
var header = " <tr class='tableTitle'>\n" +
    "                                    <th width=\"1\" class=\"text-nowrap ng-scope\" data-ng-repeat=\"item in titleItems | filter:titleFilter\">\n" +
    "                                    <a class=\"clickable ng-binding ng-hide\" data-ng-show=\"item.column\" data-ng-click=\"changeSort(item)\" data-ng-bind-html=\"item.title.toUpperCase()\"></a>\n" +
    "                                    <span data-ng-show=\"!item.column\" data-ng-bind-html=\"item.title.toUpperCase()\" class=\"ng-binding\"></span>\n" +
    "                                        <i class=\"mdi ng-hide mdi-chevron-up\" data-ng-show=\"sort.column == item.column\" data-ng-class=\"{'mdi-chevron-down': !sort.direction, 'mdi-chevron-up': sort.direction}\">\n" +
    "                                        </i>\n" +
    "                                    </th>\n" +
    "                                    <th width=\"\" class=\"text-nowrap ng-scope\" data-ng-repeat=\"item in titleItems | filter:titleFilter\">\n" +
    "                                        <a class=\"clickable ng-binding\" data-ng-show=\"item.column\" data-ng-click=\"changeSort(item)\" data-ng-bind-html=\"item.title.toUpperCase()\">HISID</a>\n" +
    "                                    </th>\n" +
    "                                    <th width=\"\" class=\"text-nowrap ng-scope\" data-ng-repeat=\"item in titleItems | filter:titleFilter\">\n" +
    "                                        <a class=\"clickable ng-binding\" data-ng-show=\"item.column\" data-ng-click=\"changeSort(item)\" data-ng-bind-html=\"item.title.toUpperCase()\">HisName</a>\n" +
    "                                    </th>\n" +
    "                                    <th width=\"\" class=\"text-nowrap ng-scope\" data-ng-repeat=\"item in titleItems | filter:titleFilter\">\n" +
    "                                        <a class=\"clickable ng-binding\" data-ng-show=\"item.column\" data-ng-click=\"changeSort(item)\" data-ng-bind-html=\"item.title.toUpperCase()\">广州机房</a>\n" +
    "                                    </th>\n" +
    "                                    <th width=\"\" class=\"text-nowrap ng-scope\" data-ng-repeat=\"item in titleItems | filter:titleFilter\">\n" +
    "                                        <a class=\"clickable ng-binding\" data-ng-show=\"item.column\" data-ng-click=\"changeSort(item)\" data-ng-bind-html=\"item.title.toUpperCase()\">深圳机房</a>\n" +
    "                                    </th>\n" +
    "                                    <th width=\"1\" ng-if=\"user.hasPermission('upstreams','edit')\" class=\"ng-scope\"></th>\n" +
    "                                    <th width=\"1\" ng-if=\"user.hasPermission('upstreams','delete')\" class=\"ng-scope\"></th>\n" +
    "                                </tr>";

/**
 * 存储所有医院信息
 * @type {Array}
 */
var hisinfo = [];