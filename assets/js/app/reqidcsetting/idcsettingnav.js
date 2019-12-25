
setInterval(addIdcSettingNav, 1000);
function addIdcSettingNav() {
    var idcHtmlDom = "<li data-ng-repeat=\"item in items\" data-ng-show=\"auth.authorize(item.access) &amp;&amp; item.show()\" data-ui-sref-active=\"active\" class=\"ng-scope\">\n" +
        "\n" +
        "                <!-- ngIf: item.state --><a data-ui-sref=\"services\" ng-if=\"item.state\" class=\"ng-scope\" href=\"#!/services\">\n" +
        "                    <i class=\"mdi mdi-cloud-outline\"></i>\n" +
        "                    <span class=\"text-small ng-binding\" ng-bind-html=\"item.title.toUpperCase()\">IDCSETTING</span>\n" +
        "                </a><!-- end ngIf: item.state -->\n" +
        "                <!-- ngIf: !item.state -->\n" +
        "            </li>"
    $(".side-nav__content").append(idcHtmlDom);
}