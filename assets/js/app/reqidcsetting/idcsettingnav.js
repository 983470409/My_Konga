setInterval(addIdcSettingNav,1000);

var i = 0;
function addIdcSettingNav() {

    if ($("body").hasClass("_expose-aside") && i == 0){
        i++;
        var idcHtmlDom = "<li data-ng-repeat=\"item in items\" data-ng-show=\"auth.authorize(item.access) &amp;&amp; item.show()\" data-ui-sref-active=\"active\" class=\"ng-scope\">\n" +
            "\n" +
            "                <!-- ngIf: item.state --><a data-ui-sref=\"services\"  class=\"ng-scope idcsetting1\" href='js/app/reqidcsetting/hello.html' target='_blank'>\n" +
            "                    <i class=\"mdi mdi-cloud-outline\"></i>\n" +
            "                    <span class=\"text-small ng-binding\" ng-bind-html=\"item.title.toUpperCase()\">IDCSETTING</span>\n" +
            "                </a><!-- end ngIf: item.state -->\n" +
            "                <!-- ngIf: !item.state -->\n" +
            "            </li>"
        $(".side-nav__content").append(idcHtmlDom);
    }
}

$('body').on('click', '.idcsetting', function () {
    var table =
        "                    <!-- ngIf: isAuthenticated() && $state.name != 'admin' && $state.name != 'dashboard' --><div ng-if=\"isAuthenticated() &amp;&amp; $state.name != 'admin' &amp;&amp; $state.name != 'dashboard'\" class=\"page-head ng-scope\" style=\"\">\n" +
        "                        <h3 class=\"page-title\">\n" +
        "                            <!--<span ng-bind-html=\"$state.data.prefix\" class=\"page-title-prefix\"></span>-->\n" +
        "                            <span ng-bind-html=\"$state.data.pageName\" class=\"ng-binding\">IDCSetting</span>&nbsp;\n" +
        "                            <div ng-show=\"loading\" id=\"spinner\" data-spinner=\"{&quot;radius&quot;: 15,&quot;strokeWidth&quot;:3}\" style=\"display: inline-block;\" class=\"ng-hide\"><svg width=\"30\" height=\"30\" style=\"animation: 2s linear 0s infinite normal none running spin-rotate-1577439247341;\"><circle cx=\"15\" cy=\"15\" r=\"12\" fill=\"none\" stroke-width=\"3\" style=\"stroke-dasharray: 1, 120; stroke-dashoffset: 0; stroke-linecap: round; stroke: rgb(63, 136, 248); animation: 1.5s ease-in-out 0s infinite normal none running spin-dash-1577439247341;\"></circle></svg></div>\n" +
        "                        </h3>\n" +
        "                        <!-- ngIf: $state.data.pageDescription --><p ng-if=\"$state.data.pageDescription\" class=\"help-block ng-binding ng-scope\" ng-bind-html=\"$state.data.pageDescription\">这是个新页面</p><!-- end ngIf: $state.data.pageDescription -->\n" +
        "                        <!-- ngIf: $state.data.displayName -->\n" +
        "                    </div><!-- end ngIf: isAuthenticated() && $state.name != 'admin' && $state.name != 'dashboard' -->\n" +
        "                    <br><br>\n" +
        "                    <!-- uiView: content --><div data-ui-view=\"content\" class=\"main-container-inner ng-scope\" style=\"\"><div class=\"row actions ng-scope\">\n" +
        "    <div class=\"col-md-12\">\n" +
        "        <div class=\"pull-left\">\n" +
        "            <!-- ngIf: user.hasPermission($state.name.split('.')[0],'create') --><button ng-if=\"user.hasPermission($state.name.split('.')[0],'create')\" class=\"btn btn-success ng-scope\" ng-click=\"openCreateItemModal()\">\n" +
        "                <i class=\"mdi mdi-plus\"></i>\n" +
        "                新增请求调度配置\n" +
        "            </button><!-- end ngIf: user.hasPermission($state.name.split('.')[0],'create') -->\n" +
        "        </div>\n" +
        "        <div class=\"pull-right list-search-filters ng-isolate-scope\" data-filters=\"filters\" data-options=\"itemsPerPageOptions\" data-items=\"itemsPerPage\">\n" +
        "    <form class=\"form-inline ng-pristine ng-valid\" role=\"form\">\n" +
        "        <div class=\"form-group\">\n" +
        "            <div class=\"input-group dropdown\" uib-dropdown=\"\" is-open=\"status.isopen\">\n" +
        "                <span class=\"input-group-addon dropdown-toggle\" uib-dropdown-toggle=\"\" aria-haspopup=\"true\" aria-expanded=\"false\">\n" +
        "                    <i class=\"mdi mdi-magnify\"></i>\n" +
        "                </span>\n" +
        "                <input class=\"form-control ng-pristine ng-untouched ng-valid ng-empty\" type=\"text\" placeholder=\"search...\" data-ng-model-options=\"{debounce: 500}\" data-ng-model=\"filters.searchWord\">\n" +
        "            </div>\n" +
        "            <div class=\"input-group\">\n" +
        "                <span class=\"input-group-addon\">\n" +
        "                    Results :\n" +
        "                </span>\n" +
        "                <select class=\"form-control ng-pristine ng-untouched ng-valid ng-not-empty\" data-ng-model=\"items\" data-ng-options=\"page for page in options\"><option label=\"10\" value=\"number:10\">10</option><option label=\"25\" value=\"number:25\" selected=\"selected\">25</option><option label=\"50\" value=\"number:50\">50</option><option label=\"100\" value=\"number:100\">100</option></select>\n" +
        "            </div>\n" +
        "\n" +
        "        </div>\n" +
        "    </form>\n" +
        "</div>\n" +
        "    </div>\n" +
        "</div>\n" +
        "\n" +
        "<!-- ngIf: loading && !items.length -->\n" +
        "<!-- ngIf: !loading || items.length --><div class=\"row ng-scope\" ng-if=\"!loading || items.length\" style=\"\">\n" +
        "    <div class=\"col-md-12\">\n" +
        "        <div class=\"table-responsive\">\n" +
        "            <table class=\"table table-hover table-striped\">\n" +
        "                <tbody>\n" +
        "\t\t\t\t<tr>\n" +
        "                    <!-- ngRepeat: item in titleItems | filter:titleFilter --><th width=\"1\" class=\"text-nowrap ng-scope\" data-ng-repeat=\"item in titleItems | filter:titleFilter\">\n" +
        "                        <span data-ng-show=\"!item.column\" data-ng-bind-html=\"item.title.toUpperCase()\" class=\"ng-binding\"></span>\n" +
        "                        <!-- ngIf: item.checkbox -->\n" +
        "                    </th><!-- end ngRepeat: item in titleItems | filter:titleFilter --><th width=\"\" class=\"text-nowrap ng-scope\" data-ng-repeat=\"item in titleItems | filter:titleFilter\">\n" +
        "                        <a class=\"clickable ng-binding\" data-ng-show=\"item.column\" data-ng-click=\"changeSort(item)\" data-ng-bind-html=\"item.title.toUpperCase()\">HISID</a>\n" +
        "                        <span data-ng-show=\"!item.column\" data-ng-bind-html=\"item.title.toUpperCase()\" class=\"ng-binding ng-hide\">HisID</span>\n" +
        "                    </th><!-- end ngRepeat: item in titleItems | filter:titleFilter --><th width=\"\" class=\"text-nowrap ng-scope\" data-ng-repeat=\"item in titleItems | filter:titleFilter\">\n" +
        "                        <span data-ng-show=\"!item.column\" data-ng-bind-html=\"item.title.toUpperCase()\" class=\"ng-binding ng-hide\">HisName</span>\n" +
        "                    </th><!-- end ngRepeat: item in titleItems | filter:titleFilter --><th width=\"\" class=\"text-nowrap ng-scope\" data-ng-repeat=\"item in titleItems | filter:titleFilter\">\n" +
        "                        <span data-ng-show=\"!item.column\" data-ng-bind-html=\"item.title.toUpperCase()\" class=\"ng-binding ng-hide\">广州机房</span>\n" +
        "                        <!-- ngIf: item.checkbox -->\n" +
        "                    </th><!-- end ngRepeat: item in titleItems | filter:titleFilter --><th width=\"\" class=\"text-nowrap ng-scope\" data-ng-repeat=\"item in titleItems | filter:titleFilter\">\n" +
        "                        <span data-ng-show=\"!item.column\" data-ng-bind-html=\"item.title.toUpperCase()\" class=\"ng-binding ng-hide\">长沙机房</span>\n" +
        "                        <!-- ngIf: item.checkbox -->\n" +
        "                    </th><!-- end ngRepeat: item in titleItems | filter:titleFilter -->\n" +
        "                    <!-- ngIf: user.hasPermission('upstreams','edit') --><th width=\"1\" ng-if=\"user.hasPermission('upstreams','edit')\" class=\"ng-scope\"></th><!-- end ngIf: user.hasPermission('upstreams','edit') -->\n" +
        "                    <!-- ngIf: user.hasPermission('upstreams','delete') --><th width=\"1\" ng-if=\"user.hasPermission('upstreams','delete')\" class=\"ng-scope\"></th><!-- end ngIf: user.hasPermission('upstreams','delete') -->\n" +
        "                </tr>\n" +
        "\t\t\t\t<tr ng-repeat=\"item in items.data | orderBy:sort.column:sort.direction | filter : filters.searchWord | itemsPerPage: itemsPerPage\" class=\"ng-scope\">\n" +
        "                    <td>\n" +
        "                        <span class=\"text-nowrap clickable ng-binding ng-isolate-scope\" data-ng-click=\"openRawView(item)\" data-item=\"item\"><i uib-tooltip=\"Raw view\" class=\"mdi mdi-eye-outline\"></i></span>\n" +
        "                    </td>\n" +
        "                    <td class=\"ng-binding\">1</td>\n" +
        "                    <td>\n" +
        "                        <!-- ngRepeat: tag in item.tags --><span class=\"badge badge-tag badge-success badge-inverse ng-binding ng-scope\" ng-repeat=\"tag in item.tags\">\n" +
        "                            <i class=\"mdi mdi-tag\"></i>&nbsp;\n" +
        "                            广州粤北人民医院\n" +
        "                        </span><!-- end ngRepeat: tag in item.tags -->\n" +
        "                    </td>\n" +
        "                    <td class=\"ng-binding\">10%</td>\n" +
        "                    <td class=\"ng-binding\">90%</td>\n" +
        "                    <!-- ngIf: user.hasPermission('upstreams','edit') --><td ng-if=\"user.hasPermission('upstreams','edit')\" class=\"ng-scope\">\n" +
        "                        <a class=\"btn clickable btn-primary btn-link\" data-ui-sref=\"upstreams.edit({id:item.id})\" href=\"#!/upstreams/588754ad-0807-446e-9c04-35d548fcbf71\">\n" +
        "                            <i class=\"mdi mdi-information-outline\"></i>\n" +
        "                            details\n" +
        "                        </a>\n" +
        "                    </td><!-- end ngIf: user.hasPermission('upstreams','edit') -->\n" +
        "                    <!-- ngIf: user.hasPermission('upstreams','delete') --><td ng-if=\"user.hasPermission('upstreams','delete')\" class=\"ng-scope\">\n" +
        "                        <button type=\"button\" ng-click=\"deleteItem($index,item)\" class=\"btn btn-danger btn-link\">\n" +
        "                            <i class=\"mdi mdi-delete\"></i>\n" +
        "                            Delete\n" +
        "                        </button>\n" +
        "                    </td><!-- end ngIf: user.hasPermission('upstreams','delete') -->\n" +
        "                </tr>\n" +
        "               \n" +
        "                <!-- ngIf: items.length === 0 && !loading -->\n" +
        "                <!-- ngIf: loading -->\n" +
        "\t\t\t\t</tbody>\n" +
        "\t\t\t</table>\n" +
        "        </div>\n" +
        "\n" +
        "    </div>\n" +
        "   \n" +
        "</div><!-- end ngIf: !loading || items.length -->\n" +
        "\n" +
        "</div>\n";

    var tableTest =
        "                    <!-- ngIf: isAuthenticated() && $state.name != 'admin' && $state.name != 'dashboard' --><div ng-if=\"isAuthenticated() &amp;&amp; $state.name != 'admin' &amp;&amp; $state.name != 'dashboard'\" class=\"page-head ng-scope\">\n" +
        "                        <h3 class=\"page-title\">\n" +
        "                            <!--<span ng-bind-html=\"$state.data.prefix\" class=\"page-title-prefix\"></span>-->\n" +
        "                            <span ng-bind-html=\"$state.data.pageName\" class=\"ng-binding\">Consumers</span>&nbsp;\n" +
        "                            <div ng-show=\"loading\" id=\"spinner\" data-spinner=\"{&quot;radius&quot;: 15,&quot;strokeWidth&quot;:3}\" style=\"display: inline-block;\" class=\"ng-hide\"><svg width=\"30\" height=\"30\" style=\"animation: 2s linear 0s infinite normal none running spin-rotate-1577448854595;\"><circle cx=\"15\" cy=\"15\" r=\"12\" fill=\"none\" stroke-width=\"3\" style=\"stroke-dasharray: 1, 120; stroke-dashoffset: 0; stroke-linecap: round; stroke: rgb(63, 136, 248); animation: 1.5s ease-in-out 0s infinite normal none running spin-dash-1577448854595;\"></circle></svg></div>\n" +
        "                        </h3>\n" +
        "                        <!-- ngIf: $state.data.pageDescription --><p ng-if=\"$state.data.pageDescription\" class=\"help-block ng-binding ng-scope\" ng-bind-html=\"$state.data.pageDescription\" style=\"\">The Consumer object represents a consumer - or a user - of an API. You can either rely on Kong as the primary datastore, or you can map the consumer list with your database to keep consistency between Kong and your existing primary datastore.</p><!-- end ngIf: $state.data.pageDescription -->\n" +
        "                        <!-- ngIf: $state.data.displayName -->\n" +
        "                    </div><!-- end ngIf: isAuthenticated() && $state.name != 'admin' && $state.name != 'dashboard' -->\n" +
        "                    <br><br>\n" +
        "                    <!-- uiView: content --><div data-ui-view=\"content\" class=\"main-container-inner ng-scope\" style=\"\"><div class=\"row actions ng-scope\">\n" +
        "    <div class=\"col-md-12\">\n" +
        "        <div class=\"pull-left\">\n" +
        "            <!-- ngIf: user.hasPermission($state.name.split('.')[0],'create') --><button class=\"btn btn-success ng-scope\" ng-if=\"user.hasPermission($state.name.split('.')[0],'create')\" ng-click=\"openCreateConsumerModal()\">\n" +
        "                <i class=\"mdi mdi-plus\"></i>\n" +
        "                Create consumer\n" +
        "            </button><!-- end ngIf: user.hasPermission($state.name.split('.')[0],'create') -->\n" +
        "        </div>\n" +
        "        <div class=\"pull-right list-search-filters ng-isolate-scope\" data-filters=\"filters\" data-options=\"itemsPerPageOptions\" data-items=\"itemsPerPage\">\n" +
        "    <form class=\"form-inline ng-pristine ng-valid\" role=\"form\">\n" +
        "        <div class=\"form-group\">\n" +
        "            <div class=\"input-group dropdown\" uib-dropdown=\"\" is-open=\"status.isopen\">\n" +
        "                <span class=\"input-group-addon dropdown-toggle\" uib-dropdown-toggle=\"\" aria-haspopup=\"true\" aria-expanded=\"false\">\n" +
        "                    <i class=\"mdi mdi-magnify\"></i>\n" +
        "                </span>\n" +
        "                <input class=\"form-control ng-pristine ng-untouched ng-valid ng-empty\" type=\"text\" placeholder=\"search...\" data-ng-model-options=\"{debounce: 500}\" data-ng-model=\"filters.searchWord\">\n" +
        "                <!--<span class=\"input-group-addon clickable\">-->\n" +
        "                    <!--<button type=\"button\" class=\"btn btn-primary btn-sm\" data-ng-click=\"search()\">-->\n" +
        "                        <!--Search-->\n" +
        "                    <!--</button>-->\n" +
        "\n" +
        "                <!--</span>-->\n" +
        "\n" +
        "                <!--<ul uib-dropdown-menu class=\"dropdown-menu animated fadeInDownShort go dropdown-menu-arrow\" role=\"menu\">-->\n" +
        "                    <!--<li class=\"title padding-left\">Affected columns</li>-->\n" +
        "                    <!--<li class=\"divider\"></li>-->\n" +
        "                    <!--<li data-ng-repeat=\"column in filters.columns | filter: inSearch\">-->\n" +
        "                        <!--<a  data-ng-click=\"column.inSearch = !column.inSearch; $event.preventDefault(); $event.stopPropagation();\">-->\n" +
        "                            <!--<i class=\"material-icons\"-->\n" +
        "                                <!--data-ng-class=\"{'opaque': !column.inSearch}\"-->\n" +
        "                            <!--&gt;done</i>-->\n" +
        "\n" +
        "\n" +
        "                            <!--<span-->\n" +
        "                                <!--data-ng-if=\"column.titleSearch\"-->\n" +
        "                                <!--data-ng-bind=\"column.titleSearch\"-->\n" +
        "                            <!--&gt;</span>-->\n" +
        "\n" +
        "                            <!--<span-->\n" +
        "                                <!--data-ng-if=\"!column.titleSearch\"-->\n" +
        "                                <!--data-ng-bind=\"column.title\"-->\n" +
        "                            <!--&gt;</span>-->\n" +
        "                        <!--</a>-->\n" +
        "                    <!--</li>-->\n" +
        "                <!--</ul>-->\n" +
        "\n" +
        "\n" +
        "            </div>\n" +
        "            <div class=\"input-group\">\n" +
        "                <span class=\"input-group-addon\">\n" +
        "                    Results :\n" +
        "                </span>\n" +
        "                <select class=\"form-control ng-pristine ng-untouched ng-valid ng-not-empty\" data-ng-model=\"items\" data-ng-options=\"page for page in options\"><option label=\"10\" value=\"number:10\">10</option><option label=\"25\" value=\"number:25\" selected=\"selected\">25</option><option label=\"50\" value=\"number:50\">50</option><option label=\"100\" value=\"number:100\">100</option></select>\n" +
        "            </div>\n" +
        "\n" +
        "        </div>\n" +
        "    </form>\n" +
        "</div>\n" +
        "    </div>\n" +
        "</div>\n" +
        "\n" +
        "\n" +
        "<!-- ngIf: loading && !items.length -->\n" +
        "<!-- ngIf: !loading || items.length --><div class=\"row ng-scope\" ng-if=\"!loading || items.length\" style=\"\">\n" +
        "    <div class=\"col-md-12\">\n" +
        "        <div class=\"table-responsive\">\n" +
        "            <table class=\"table table-hover table-striped\">\n" +
        "                <tbody><tr>\n" +
        "                    <!-- ngRepeat: item in titleItems | filter:titleFilter --><!-- ngIf: !item.hide --><th width=\"1\" class=\"text-nowrap ng-scope\" ng-if=\"!item.hide\" data-ng-repeat=\"item in titleItems | filter:titleFilter\">\n" +
        "                        <a class=\"clickable ng-binding ng-hide\" data-ng-show=\"item.column\" data-ng-click=\"changeSort(item)\" data-ng-bind-html=\"item.title.toUpperCase()\"></a>\n" +
        "                        <span data-ng-show=\"!item.column\" data-ng-bind-html=\"item.title.toUpperCase()\" class=\"ng-binding\"></span>\n" +
        "\n" +
        "                        <i class=\"mdi ng-hide mdi-chevron-up\" data-ng-show=\"sort.column == item.column\" data-ng-class=\"{'mdi-chevron-down': !sort.direction, 'mdi-chevron-up': sort.direction}\">\n" +
        "                        </i>\n" +
        "                    </th><!-- end ngIf: !item.hide --><!-- end ngRepeat: item in titleItems | filter:titleFilter --><!-- ngIf: !item.hide --><th width=\"\" class=\"text-nowrap ng-scope\" ng-if=\"!item.hide\" data-ng-repeat=\"item in titleItems | filter:titleFilter\">\n" +
        "                        <a class=\"clickable ng-binding\" data-ng-show=\"item.column\" data-ng-click=\"changeSort(item)\" data-ng-bind-html=\"item.title.toUpperCase()\">USERNAME</a>\n" +
        "                        <span data-ng-show=\"!item.column\" data-ng-bind-html=\"item.title.toUpperCase()\" class=\"ng-binding ng-hide\">USERNAME</span>\n" +
        "\n" +
        "                        <i class=\"mdi ng-hide mdi-chevron-up\" data-ng-show=\"sort.column == item.column\" data-ng-class=\"{'mdi-chevron-down': !sort.direction, 'mdi-chevron-up': sort.direction}\">\n" +
        "                        </i>\n" +
        "                    </th><!-- end ngIf: !item.hide --><!-- end ngRepeat: item in titleItems | filter:titleFilter --><!-- ngIf: !item.hide --><th width=\"\" class=\"text-nowrap ng-scope\" ng-if=\"!item.hide\" data-ng-repeat=\"item in titleItems | filter:titleFilter\">\n" +
        "                        <a class=\"clickable ng-binding\" data-ng-show=\"item.column\" data-ng-click=\"changeSort(item)\" data-ng-bind-html=\"item.title.toUpperCase()\">CUSTOM_ID</a>\n" +
        "                        <span data-ng-show=\"!item.column\" data-ng-bind-html=\"item.title.toUpperCase()\" class=\"ng-binding ng-hide\">CUSTOM_ID</span>\n" +
        "\n" +
        "                        <i class=\"mdi ng-hide mdi-chevron-up\" data-ng-show=\"sort.column == item.column\" data-ng-class=\"{'mdi-chevron-down': !sort.direction, 'mdi-chevron-up': sort.direction}\">\n" +
        "                        </i>\n" +
        "                    </th><!-- end ngIf: !item.hide --><!-- end ngRepeat: item in titleItems | filter:titleFilter --><!-- ngIf: !item.hide --><th width=\"\" class=\"text-nowrap ng-scope\" ng-if=\"!item.hide\" data-ng-repeat=\"item in titleItems | filter:titleFilter\">\n" +
        "                        <a class=\"clickable ng-binding\" data-ng-show=\"item.column\" data-ng-click=\"changeSort(item)\" data-ng-bind-html=\"item.title.toUpperCase()\">TAGS</a>\n" +
        "                        <span data-ng-show=\"!item.column\" data-ng-bind-html=\"item.title.toUpperCase()\" class=\"ng-binding ng-hide\">TAGS</span>\n" +
        "\n" +
        "                        <i class=\"mdi ng-hide mdi-chevron-up\" data-ng-show=\"sort.column == item.column\" data-ng-class=\"{'mdi-chevron-down': !sort.direction, 'mdi-chevron-up': sort.direction}\">\n" +
        "                        </i>\n" +
        "                    </th><!-- end ngIf: !item.hide --><!-- end ngRepeat: item in titleItems | filter:titleFilter --><!-- ngIf: !item.hide --><th width=\"\" class=\"text-nowrap ng-scope\" ng-if=\"!item.hide\" data-ng-repeat=\"item in titleItems | filter:titleFilter\">\n" +
        "                        <a class=\"clickable ng-binding\" data-ng-show=\"item.column\" data-ng-click=\"changeSort(item)\" data-ng-bind-html=\"item.title.toUpperCase()\">CREATED</a>\n" +
        "                        <span data-ng-show=\"!item.column\" data-ng-bind-html=\"item.title.toUpperCase()\" class=\"ng-binding ng-hide\">CREATED</span>\n" +
        "\n" +
        "                        <i class=\"mdi mdi-chevron-up\" data-ng-show=\"sort.column == item.column\" data-ng-class=\"{'mdi-chevron-down': !sort.direction, 'mdi-chevron-up': sort.direction}\">\n" +
        "                        </i>\n" +
        "                    </th><!-- end ngIf: !item.hide --><!-- end ngRepeat: item in titleItems | filter:titleFilter --><!-- ngIf: !item.hide --><th width=\"1\" class=\"text-nowrap ng-scope\" ng-if=\"!item.hide\" data-ng-repeat=\"item in titleItems | filter:titleFilter\">\n" +
        "                        <a class=\"clickable ng-binding ng-hide\" data-ng-show=\"item.column\" data-ng-click=\"changeSort(item)\" data-ng-bind-html=\"item.title.toUpperCase()\"></a>\n" +
        "                        <span data-ng-show=\"!item.column\" data-ng-bind-html=\"item.title.toUpperCase()\" class=\"ng-binding\"></span>\n" +
        "\n" +
        "                        <i class=\"mdi ng-hide mdi-chevron-up\" data-ng-show=\"sort.column == item.column\" data-ng-class=\"{'mdi-chevron-down': !sort.direction, 'mdi-chevron-up': sort.direction}\">\n" +
        "                        </i>\n" +
        "                    </th><!-- end ngIf: !item.hide --><!-- end ngRepeat: item in titleItems | filter:titleFilter -->\n" +
        "                </tr>\n" +
        "                <!-- ngRepeat: consumer in items.data | orderBy:sort.column:sort.direction | filter : filters.searchWord | itemsPerPage: itemsPerPage -->\n" +
        "\n" +
        "                <!-- ngIf: items.length === 0 && !loading -->\n" +
        "                <!-- ngIf: loading -->\n" +
        "            </tbody></table>\n" +
        "        </div>\n" +
        "\n" +
        "        <dir-pagination-controls class=\"pull-right ng-isolate-scope\"><!-- ngIf: 1 < pages.length || !autoHide --></dir-pagination-controls>\n" +
        "    </div>\n" +
        "</div><!-- end ngIf: !loading || items.length -->\n" +
        "\n" +
        "</div>\n";
    $(".main-container").html(tableTest);
    alert("inter");
});