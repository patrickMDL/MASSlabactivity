#pragma checksum "C:\Users\Patrick\Desktop\MASSlabactivity\PagesUI\PagesUI\Views\Account\Weather.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "79efcb06556bf740b9d3aa1406abfa2781987e24"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_Account_Weather), @"mvc.1.0.view", @"/Views/Account/Weather.cshtml")]
[assembly:global::Microsoft.AspNetCore.Mvc.Razor.Compilation.RazorViewAttribute(@"/Views/Account/Weather.cshtml", typeof(AspNetCore.Views_Account_Weather))]
namespace AspNetCore
{
    #line hidden
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Rendering;
    using Microsoft.AspNetCore.Mvc.ViewFeatures;
#line 1 "C:\Users\Patrick\Desktop\MASSlabactivity\PagesUI\PagesUI\Views\_ViewImports.cshtml"
using PagesUI;

#line default
#line hidden
#line 2 "C:\Users\Patrick\Desktop\MASSlabactivity\PagesUI\PagesUI\Views\_ViewImports.cshtml"
using PagesUI.Models;

#line default
#line hidden
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"79efcb06556bf740b9d3aa1406abfa2781987e24", @"/Views/Account/Weather.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"98491678405ff83503a5d510342533f3124aaf51", @"/Views/_ViewImports.cshtml")]
    public class Views_Account_Weather : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_0 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("class", new global::Microsoft.AspNetCore.Html.HtmlString("fixed-header dashboard"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        #line hidden
        #pragma warning disable 0169
        private string __tagHelperStringValueBuffer;
        #pragma warning restore 0169
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperExecutionContext __tagHelperExecutionContext;
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperRunner __tagHelperRunner = new global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperRunner();
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager __backed__tagHelperScopeManager = null;
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager __tagHelperScopeManager
        {
            get
            {
                if (__backed__tagHelperScopeManager == null)
                {
                    __backed__tagHelperScopeManager = new global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager(StartTagHelperWritingScope, EndTagHelperWritingScope);
                }
                return __backed__tagHelperScopeManager;
            }
        }
        private global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.HeadTagHelper __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_HeadTagHelper;
        private global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.BodyTagHelper __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_BodyTagHelper;
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            BeginContext(0, 1673, true);
            WriteLiteral(@"<!--<!DOCTYPE html>
<html>
<head>
    <script src=""https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js""></script>
    <script>
        $(document).ready(function () {
            $(""#bntLocation"").click(function () {
                navigator.geolocation.getCurrentPosition(function (position) {
                    var weatherAPI = ""https://api.weatherapi.com/v1/current.json?key=5b34aa6378dd4d889bf142611201002&q="" + position.coords.latitude + "","" + position.coords.longitude;

                    $.getJSON(weatherAPI, function (data) {
                        var forecast = data.current.temp_c;
                        var wind_speed = data.current.wind_kph;
                        var weather = $(""#weather"");
                        var location = data.location.name;
                        var conditions = data.current.conditions;
                        weather.append('Temperature:' + forecast + '° C <br/>' + 'Wind Speed:' + wind_speed + ' KM/H' + '<br/>' + 'City: ' + location + ' <br/>');

     ");
            WriteLiteral(@"               }).error(function (e) {
                        $(""#weather"").append('Sorry! Not Loaded');
                    });
                })
            });
        });
    </script>
</head>
<body>



    <div class=""card card-default card-condensed text-black"">
        <div class=""card-header"">
            <div class=""card-title"">
                Basic Cards
            </div>
        </div>
        <div class=""card-block"">
            <p id=""weather""></p>
        </div>
    </div>
    <button id=""bntLocation"" class=""btn btn-primary btn-cons"">
        Weather
    </button>


</body>
</html>
    -->

<!DOCTYPE html>
<html lang=""en"">
");
            EndContext();
            BeginContext(1673, 4057, false);
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("head", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "cafda504ff564b968744569886a4a2f5", async() => {
                BeginContext(1679, 4044, true);
                WriteLiteral(@"
    <meta http-equiv=""content-type"" content=""text/html;charset=UTF-8"" />
    <meta charset=""utf-8"" />
    <title>Pages - Admin Dashboard UI Kit - Dashboard</title>
    <meta name=""viewport"" content=""width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, shrink-to-fit=no"" />
    <link rel=""apple-touch-icon"" href=""pages/ico/60.png"">
    <link rel=""apple-touch-icon"" sizes=""76x76"" href=""pages/ico/76.png"">
    <link rel=""apple-touch-icon"" sizes=""120x120"" href=""pages/ico/120.png"">
    <link rel=""apple-touch-icon"" sizes=""152x152"" href=""pages/ico/152.png"">
    <link rel=""icon"" type=""image/x-icon"" href=""favicon.ico"" />
    <meta name=""apple-mobile-web-app-capable"" content=""yes"">
    <meta name=""apple-touch-fullscreen"" content=""yes"">
    <meta name=""apple-mobile-web-app-status-bar-style"" content=""default"">
    <meta content=""Meet pages - The simplest and fastest way to build web UI for your dashboard or app."" name=""description"" />
    <meta content=""Ace"" name=""author"" />
    <link href=""../plugins");
                WriteLiteral(@"/pace/pace-theme-flash.css"" rel=""stylesheet"" type=""text/css"" />
    <link href=""../plugins/bootstrap/css/bootstrap.min.css"" rel=""stylesheet"" type=""text/css"" />
    <link href=""../plugins/font-awesome/css/font-awesome.css"" rel=""stylesheet"" type=""text/css"" />
    <link href=""../plugins/jquery-scrollbar/jquery.scrollbar.css"" rel=""stylesheet"" type=""text/css"" media=""screen"" />
    <link href=""../plugins/select2/css/select2.min.css"" rel=""stylesheet"" type=""text/css"" media=""screen"" />
    <link href=""../plugins/switchery/css/switchery.min.css"" rel=""stylesheet"" type=""text/css"" media=""screen"" />
    <link href=""../pages/css/pages-icons.css"" rel=""stylesheet"" type=""text/css"">
    <link class=""main-stylesheet"" href=""../pages/css/pages.css"" rel=""stylesheet"" type=""text/css"" />
    <link class=""main-stylesheet"" href=""../css/style.css"" rel=""stylesheet"" type=""text/css"" />
    <script src=""https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js""></script>
    <script>
        $(document).ready(function () {
           ");
                WriteLiteral(@" $(""#refresh"").click(function () {
                navigator.geolocation.getCurrentPosition(function (position) {
                    var weatherAPI = ""https://api.weatherapi.com/v1/forecast.json?key=5b34aa6378dd4d889bf142611201002&q="" + position.coords.latitude + "","" + position.coords.longitude + ""&days=1"" ;
                    $.getJSON(weatherAPI, function (data) {
                        var currentLocation = $(""#currentLocation"");
                        var currentTemp = $(""#currentTemp"");
                        var localTime = $(""#localtime"");
                        var wind_speed = $(""#windSpeed"");
                        var humidity = $(""#humidity"");
                        var precipitation = $(""#precipitation"");
                        var visibility = $(""#visibility"");
                        var refresh = $(""#refresh"");

                        refresh.html("""");
                        currentLocation.html("""");
                        currentTemp.html("""");
                        localTime.htm");
                WriteLiteral(@"l("""");
                        wind_speed.html("""");
                        humidity.html("""");
                        precipitation.html("""");
                        visibility.html("""");

                        refresh.append(""Update"");
                        currentLocation.append(data.location.name + "", "" + data.location.country);
                        localTime.append(data.location.localtime);
                        currentTemp.append(data.current.temp_c + '° C');
                        wind_speed.append(data.current.wind_kph + ' KM/H');
                        humidity.append(data.current.humidity + '%');
                        precipitation.append(data.current.precip_mm + ' MM');
                        visibility.append(data.current.vis_km + ' KM');

                    }).error(function (e) {
                        $(""#weather"").append('Sorry! Not Loaded');
                    });
                })
            });

        });
    </script>
");
                EndContext();
            }
            );
            __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_HeadTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.HeadTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_Razor_TagHelpers_HeadTagHelper);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            EndContext();
            BeginContext(5730, 1, true);
            WriteLiteral("\n");
            EndContext();
            BeginContext(5731, 8856, false);
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("body", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "88a93872465444f6b7277b5f8b5da071", async() => {
                BeginContext(5768, 8812, true);
                WriteLiteral(@"
    <div class=""page-container "">
        <div class=""page-content-wrapper "">
            <div class=""content sm-gutter"">
                <div class=""container-fluid padding-25 sm-padding-10"">
                    <div class=""row"">
                        <div class=""col-md-8 col-lg-5 col-xlg-5"">

                            <div class=""widget-17 card  no-border no-margin widget-loader-circle"">
                                <div class=""card-header "">
                                    <div class=""card-title"">
                                        <p id=""currentLocation"">--</p> 
                                        <span class=""caret""></span>
                                    </div>
                                    <div class=""card-controls"">
                                        <ul>
                                            <li>
                                                <button id=""refresh"" class=""btn btn-danger btn-cons"">Load</button>
                                            </li>
");
                WriteLiteral(@"                                        </ul>
                                    </div>
                                </div>
                                <div class=""card-body"">
                                    <div class=""p-l-5"">
                                        <div class=""row"">
                                            <div class=""col-lg-12 col-xlg-6"">
                                                <div class=""row m-t-10"">
                                                    <div class=""col-lg-5"">
                                                        <h4 id=""localtime"" class=""no-margin"">--</h4>
                                                    </div>
                                                    <div class=""col-lg-7"">
                                                        <div class=""d-flex pull-right"">
                                                            <div id=""conditionIcon""></div>
                                                            
                         ");
                WriteLiteral(@"                                   <h2 id=""currentTemp"" class=""text-danger bold no-margin p-l-10""> --
                                                            </h2>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class=""m-t-25 p-b-10"">
                                                    <p class=""pull-left no-margin hint-text"">Weather information</p>
                                                    <div class=""clearfix""></div>
                                                </div>
                                                <div class=""widget-17-weather b-t b-grey p-t-20"">
                                                    <div class=""weather-info row"">
                                                        <div class=""col-6 p-r-15"">
                                                            <div class=""row"">
        ");
                WriteLiteral(@"                                                        <div class=""col-lg-12"">
                                                                    <p class=""pull-left no-margin hint-text fs-13"">Wind</p>
                                                                    <p id=""windSpeed"" class=""pull-right no-margin fs-13"">--</p>
                                                                </div>
                                                            </div>
                                                            <div class=""row"">
                                                                <div class=""col-lg-12"">
                                                                    <p class=""pull-left no-margin hint-text fs-13"">Humidity</p>
                                                                    <p id=""humidity"" class=""pull-right no-margin fs-13"">--</p>
                                                                </div>
                                                            </");
                WriteLiteral(@"div>
                                                            <div class=""row"">
                                                                <div class=""col-lg-12"">
                                                                    <p class=""pull-left no-margin hint-text fs-13"">Sunrise</p>
                                                                    <p id=""sunrise"" class=""pull-right no-margin fs-13"">--</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class=""col-6 p-l-15"">
                                                            <div class=""row"">
                                                                <div class=""col-lg-12"">
                                                                    <p class=""pull-left no-margin hint-text fs-13"">Precipitation</p>
                 ");
                WriteLiteral(@"                                                   <p id=""precipitation"" class=""pull-right no-margin fs-13"">--</p>
                                                                </div>
                                                            </div>
                                                            <div class=""row"">
                                                                <div class=""col-lg-12"">
                                                                    <p class=""pull-left no-margin hint-text fs-13"">Visibility</p>
                                                                    <p id=""visibility"" class=""pull-right no-margin fs-13"">--</p>
                                                                </div>
                                                            </div>
                                                            <div class=""row"">
                                                                <div class=""col-lg-12"">
                                          ");
                WriteLiteral(@"                          <p class=""pull-left no-margin hint-text fs-13"">Sunset</p>
                                                                    <p class=""pull-right no-margin fs-13"">--</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="" container-fluid  container-fixed-lg footer"">
                <div class=""copyright sm-text-center"">
                    <p class=""small"">
                        Copyright ");
                WriteLiteral(@"&copy; 2020 <b><a href=""http://portal.mass.com.br"">MASS Labs</a></b>. Todos os Direitos Reservados.
                    </p>
                    
                    <div class=""clearfix""></div>
                </div>
            </div>

        </div>

    </div>

    <script src=""../plugins/pace/pace.min.js"" type=""text/javascript""></script>
    <script src=""../plugins/jquery/jquery-1.11.1.min.js"" type=""text/javascript""></script>
    <script src=""../plugins/modernizr.custom.js"" type=""text/javascript""></script>
    <script src=""../plugins/jquery-ui/jquery-ui.min.js"" type=""text/javascript""></script>
    <script src=""../plugins/tether/js/tether.min.js"" type=""text/javascript""></script>
    <script src=""../plugins/bootstrap/js/bootstrap.min.js"" type=""text/javascript""></script>
    <script src=""../plugins/jquery/jquery-easy.js"" type=""text/javascript""></script>
    <script src=""../plugins/jquery-unveil/jquery.unveil.min.js"" type=""text/javascript""></script>
    <script src=""../plugins/jquery-ios-list/jquery.ioslist.");
                WriteLiteral(@"min.js"" type=""text/javascript""></script>
    <script src=""../plugins/jquery-actual/jquery.actual.min.js""></script>
    <script src=""../plugins/jquery-scrollbar/jquery.scrollbar.min.js""></script>
    <script type=""text/javascript"" src=""../plugins/select2/js/select2.full.min.js""></script>
    <script type=""text/javascript"" src=""../plugins/classie/classie.js""></script>
    <script src=""../plugins/switchery/js/switchery.min.js"" type=""text/javascript""></script>
    <script src=""../plugins/jquery-validation/js/jquery.validate.min.js"" type=""text/javascript""></script>
    <script src=""../pages/js/pages.min.js""></script>
");
                EndContext();
            }
            );
            __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_BodyTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.BodyTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_Razor_TagHelpers_BodyTagHelper);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_0);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            EndContext();
            BeginContext(14587, 8, true);
            WriteLiteral("\n</html>");
            EndContext();
        }
        #pragma warning restore 1998
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.ViewFeatures.IModelExpressionProvider ModelExpressionProvider { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IUrlHelper Url { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IViewComponentHelper Component { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IJsonHelper Json { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IHtmlHelper<dynamic> Html { get; private set; }
    }
}
#pragma warning restore 1591
