#pragma checksum "C:\Users\Patrick\Desktop\MASSlabactivity\PagesUI\PagesUI\Views\Shared\_Layout.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "db76bfb9d59d9308231eade1257052c6b39ad402"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_Shared__Layout), @"mvc.1.0.view", @"/Views/Shared/_Layout.cshtml")]
[assembly:global::Microsoft.AspNetCore.Mvc.Razor.Compilation.RazorViewAttribute(@"/Views/Shared/_Layout.cshtml", typeof(AspNetCore.Views_Shared__Layout))]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"db76bfb9d59d9308231eade1257052c6b39ad402", @"/Views/Shared/_Layout.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"98491678405ff83503a5d510342533f3124aaf51", @"/Views/_ViewImports.cshtml")]
    public class Views_Shared__Layout : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_0 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("names", "Development", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_1 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("class", new global::Microsoft.AspNetCore.Html.HtmlString("fixed-header dashboard"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
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
        private global::Microsoft.AspNetCore.Mvc.TagHelpers.EnvironmentTagHelper __Microsoft_AspNetCore_Mvc_TagHelpers_EnvironmentTagHelper;
        private global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.BodyTagHelper __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_BodyTagHelper;
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            BeginContext(0, 23, true);
            WriteLiteral("<!DOCTYPE html>\n<html>\n");
            EndContext();
            BeginContext(23, 4305, false);
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("head", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "d0e6407b56a14ab4a82ac70bddef7d42", async() => {
                BeginContext(29, 453, true);
                WriteLiteral(@"
    <meta http-equiv=""content-type"" content=""text/html;charset=UTF-8"" />
    <meta charset=""utf-8"" />
    <meta name=""viewport"" content=""width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, shrink-to-fit=no"" />
    <meta name=""apple-mobile-web-app-capable"" content=""yes"">
    <meta name=""apple-touch-fullscreen"" content=""yes"">
    <meta name=""apple-mobile-web-app-status-bar-style"" content=""default"">
    <meta name=""description""");
                EndContext();
                BeginWriteAttribute("content", " content=\"", 482, "\"", 512, 1);
#line 10 "C:\Users\Patrick\Desktop\MASSlabactivity\PagesUI\PagesUI\Views\Shared\_Layout.cshtml"
WriteAttributeValue("", 492, ViewBag.Description, 492, 20, false);

#line default
#line hidden
                EndWriteAttribute();
                BeginContext(513, 563, true);
                WriteLiteral(@" />
    <meta name=""keywords"" content=""paf.online, paf online, pafonline, fisco, secretaria da fazenda, controle de vendas, bilhete eletrônico embarcado, bilhete de embarque, bilhete eletrônico de embarque, monitoramento de venda fiscal, impressora fiscal, controle fiscal, velocidade fiscal"" />
    <meta name=""author"" content=""MASS Labs"" />
    <meta name=""robots"" content=""noindex"" />

    <link rel=""icon"" type=""image/x-icon"" href=""../img/favicon.png"" />

    <title>MASS Labs - Mais velocidade, agilidade e transparência no controle da operação</title>

    ");
                EndContext();
                BeginContext(1076, 3200, false);
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("environment", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "ed391aab6b3f4991af0bf2514bea9491", async() => {
                    BeginContext(1109, 3153, true);
                    WriteLiteral(@"
        <link rel=""apple-touch-icon"" href=""../pages/ico/60.png"">
        <link rel=""apple-touch-icon"" sizes=""76x76"" href=""../pages/ico/76.png"">
        <link rel=""apple-touch-icon"" sizes=""120x120"" href=""../pages/ico/120.png"">
        <link rel=""apple-touch-icon"" sizes=""152x152"" href=""../pages/ico/152.png"">
        <link href=""../plugins/pace/pace-theme-flash.css"" rel=""stylesheet"" type=""text/css"" />
        <link href=""../plugins/modernizr.custom.js"" type=""text/javascript"" />
        <link href=""../plugins/bootstrap/css/bootstrap.min.css"" rel=""stylesheet"" type=""text/css"" />
        <link href=""../plugins/font-awesome/css/font-awesome.css"" rel=""stylesheet"" type=""text/css"" />
        <link href=""../plugins/jquery-scrollbar/jquery.scrollbar.css"" rel=""stylesheet"" type=""text/css"" media=""screen"" />
        <link href=""../plugins/select2/css/select2.min.css"" rel=""stylesheet"" type=""text/css"" media=""screen"" />
        <link href=""../plugins/switchery/css/switchery.min.css"" rel=""stylesheet"" type=""text/css"" media=""scree");
                    WriteLiteral(@"n"" />
        <link href=""../plugins/nvd3/nv.d3.min.css"" rel=""stylesheet"" type=""text/css"" media=""screen"" />
        <link href=""../plugins/mapplic/css/mapplic.css"" rel=""stylesheet"" type=""text/css"" />
        <link href=""../plugins/bootstrap-datepicker/css/datepicker3.css"" rel=""stylesheet"" type=""text/css"" media=""screen"">
        <link href=""../plugins/jquery-metrojs/MetroJs.css"" rel=""stylesheet"" type=""text/css"" media=""screen"" />
        <link href=""../plugins/jquery-nouislider/jquery.nouislider.css"" media=""screen"" type=""text/css"" rel=""stylesheet"" />
        <link media=""screen"" type=""text/css"" rel=""stylesheet"" href=""../plugins/ion-slider/css/ion.rangeSlider.css"" />
        <link media=""screen"" type=""text/css"" rel=""stylesheet"" href=""../plugins/ion-slider/css/ion.rangeSlider.skinFlat.css"" />
        <link href=""../pages/css/pages-icons.css"" rel=""stylesheet"" type=""text/css"">
        <link class=""main-stylesheet"" href=""../pages/css/pages.css"" rel=""stylesheet"" type=""text/css"" />
        <link href=""../css/style.css");
                    WriteLiteral(@""" rel=""stylesheet"" type=""text/css"">
        <link href=""../plugins/bootstrap-daterangepicker/daterangepicker-bs3.css"" rel=""stylesheet"" type=""text/css"" media=""screen"">
        <link href=""../plugins/bootstrap-timepicker/bootstrap-timepicker.min.css"" rel=""stylesheet"" type=""text/css"" media=""screen"">
        <link href=""../plugins/bootstrap-tag/bootstrap-tagsinput.css"" rel=""stylesheet"" type=""text/css"" />
        <link href=""../plugins/dropzone/css/dropzone.css"" rel=""stylesheet"" type=""text/css"" />
        <link href=""../plugins/summernote/css/summernote.css"" rel=""stylesheet"" type=""text/css"" media=""screen"">
        <link href=""../plugins/jquery-datatable/media/css/dataTables.bootstrap.css"" rel=""stylesheet"" type=""text/css"" />
        <link href=""../plugins/jquery-datatable/extensions/FixedColumns/css/dataTables.fixedColumns.min.css"" rel=""stylesheet"" type=""text/css"" />
        <link href=""../plugins/datatables-responsive/css/datatables.responsive.css"" rel=""stylesheet"" type=""text/css"" media=""screen"" />
        <link h");
                    WriteLiteral("ref=\"../css/buttons.dataTables.min.css\" rel=\"stylesheet\" id=\"bootstrap-css\">\n    ");
                    EndContext();
                }
                );
                __Microsoft_AspNetCore_Mvc_TagHelpers_EnvironmentTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.EnvironmentTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_EnvironmentTagHelper);
                __Microsoft_AspNetCore_Mvc_TagHelpers_EnvironmentTagHelper.Names = (string)__tagHelperAttribute_0.Value;
                __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_0);
                await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                if (!__tagHelperExecutionContext.Output.IsContentModified)
                {
                    await __tagHelperExecutionContext.SetOutputContentAsync();
                }
                Write(__tagHelperExecutionContext.Output);
                __tagHelperExecutionContext = __tagHelperScopeManager.End();
                EndContext();
                BeginContext(4276, 6, true);
                WriteLiteral("\n\n    ");
                EndContext();
                BeginContext(4283, 37, false);
#line 52 "C:\Users\Patrick\Desktop\MASSlabactivity\PagesUI\PagesUI\Views\Shared\_Layout.cshtml"
Write(RenderSection("css", required: false));

#line default
#line hidden
                EndContext();
                BeginContext(4320, 1, true);
                WriteLiteral("\n");
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
            BeginContext(4328, 1, true);
            WriteLiteral("\n");
            EndContext();
            BeginContext(4329, 17536, false);
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("body", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "bb70ca67e8fa492c8dd941fd91dd4a7c", async() => {
                BeginContext(4366, 91, true);
                WriteLiteral("\n\n    <div class=\"page-container \">\n        <div class=\"page-content-wrapper\">\n            ");
                EndContext();
                BeginContext(4458, 12, false);
#line 58 "C:\Users\Patrick\Desktop\MASSlabactivity\PagesUI\PagesUI\Views\Shared\_Layout.cshtml"
       Write(RenderBody());

#line default
#line hidden
                EndContext();
                BeginContext(4470, 8757, true);
                WriteLiteral(@"
        </div>
        <div id=""modalAjax"" class=""modal"">
            <div class=""loading"">
            </div>
        </div>
        <div id=""modalAjaxWait"" class=""modal text-center"">
            <p class=""small hint-text wait-loading "">Aguarde, isso pode demorar um pouco...</p>
            <div class=""loading""></div>
        </div>
    </div>
    <div class=""overlay hide"" data-pages=""search"">
        <!-- BEGIN Overlay Content !-->
        <div class=""overlay-content has-results m-t-20"">
            <!-- BEGIN Overlay Header !-->
            <div class=""container-fluid"">
                <!-- BEGIN Overlay Logo !-->
                <img class=""overlay-brand"" src=""../img/logo.png"" alt=""logo"" data-src=""../img/logo.png"" data-src-retina=""../img/logo.png"">
                <!-- END Overlay Logo !-->
                <!-- BEGIN Overlay Close !-->
                <a href=""#"" class=""close-icon-light overlay-close text-black fs-16"">
                    <i class=""pg-close""></i>
                </a>
                <!--");
                WriteLiteral(@" END Overlay Close !-->
            </div>
            <!-- END Overlay Header !-->
            <div class=""container-fluid"">
                <!-- BEGIN Overlay Controls !-->
                <input id=""overlay-search"" class=""no-border overlay-search bg-transparent"" placeholder=""Search..."" autocomplete=""off"" spellcheck=""false"">
                <br>
                <div class=""inline-block"">
                    <div class=""checkbox right"">
                        <input id=""checkboxn"" type=""checkbox"" value=""1"" checked=""checked"">
                        <label for=""checkboxn""><i class=""fa fa-search""></i> Search within page</label>
                    </div>
                </div>
                <div class=""inline-block m-l-10"">
                    <p class=""fs-13"">Press enter to search</p>
                </div>
                <!-- END Overlay Controls !-->
            </div>
            <!-- BEGIN Overlay Search Results, This part is for demo purpose, you can add anything you like !-->
            <div class=");
                WriteLiteral(@"""container-fluid"">
                <span>
                    <strong>suggestions :</strong>
                </span>
                <span id=""overlay-suggestions""></span>
                <br>
                <div class=""search-results m-t-40"">
                    <p class=""bold"">Pages Search Results</p>
                    <div class=""row"">
                        <div class=""col-md-6"">
                            <!-- BEGIN Search Result Item !-->
                            <div class="""">
                                <!-- BEGIN Search Result Item Thumbnail !-->
                                <div class=""thumbnail-wrapper d48 circular bg-success text-white inline m-t-10"">
                                    <div>
                                        <img width=""50"" height=""50"" src=""../img/profile_unknown_user_small.png"" data-src=""../img/profile_unknown_user_small.png"" data-src-retina=""../img/profile_unknown_user_small.png"" alt="""">
                                    </div>
                           ");
                WriteLiteral(@"     </div>
                                <!-- END Search Result Item Thumbnail !-->
                                <div class=""p-l-10 inline p-t-5"">
                                    <h5 class=""m-b-5""><span class=""semi-bold result-name"">ice cream</span> on pages</h5>
                                    <p class=""hint-text"">via john smith</p>
                                </div>
                            </div>
                            <!-- END Search Result Item !-->
                            <!-- BEGIN Search Result Item !-->
                            <div class="""">
                                <!-- BEGIN Search Result Item Thumbnail !-->
                                <div class=""thumbnail-wrapper d48 circular bg-success text-white inline m-t-10"">
                                    <div>T</div>
                                </div>
                                <!-- END Search Result Item Thumbnail !-->
                                <div class=""p-l-10 inline p-t-5"">
              ");
                WriteLiteral(@"                      <h5 class=""m-b-5""><span class=""semi-bold result-name"">ice cream</span> related topics</h5>
                                    <p class=""hint-text"">via pages</p>
                                </div>
                            </div>
                            <!-- END Search Result Item !-->
                            <!-- BEGIN Search Result Item !-->
                            <div class="""">
                                <!-- BEGIN Search Result Item Thumbnail !-->
                                <div class=""thumbnail-wrapper d48 circular bg-success text-white inline m-t-10"">
                                    <div>
                                        <i class=""fa fa-headphones large-text ""></i>
                                    </div>
                                </div>
                                <!-- END Search Result Item Thumbnail !-->
                                <div class=""p-l-10 inline p-t-5"">
                                    <h5 class=""m-b-5""><span");
                WriteLiteral(@" class=""semi-bold result-name"">ice cream</span> music</h5>
                                    <p class=""hint-text"">via pagesmix</p>
                                </div>
                            </div>
                            <!-- END Search Result Item !-->
                        </div>
                        <div class=""col-md-6"">
                            <!-- BEGIN Search Result Item !-->
                            <div class="""">
                                <!-- BEGIN Search Result Item Thumbnail !-->
                                <div class=""thumbnail-wrapper d48 circular bg-info text-white inline m-t-10"">
                                    <div>
                                        <i class=""fa fa-facebook large-text ""></i>
                                    </div>
                                </div>
                                <!-- END Search Result Item Thumbnail !-->
                                <div class=""p-l-10 inline p-t-5"">
                                    <");
                WriteLiteral(@"h5 class=""m-b-5""><span class=""semi-bold result-name"">ice cream</span> on facebook</h5>
                                    <p class=""hint-text"">via facebook</p>
                                </div>
                            </div>
                            <!-- END Search Result Item !-->
                            <!-- BEGIN Search Result Item !-->
                            <div class="""">
                                <!-- BEGIN Search Result Item Thumbnail !-->
                                <div class=""thumbnail-wrapper d48 circular bg-complete text-white inline m-t-10"">
                                    <div>
                                        <i class=""fa fa-twitter large-text ""></i>
                                    </div>
                                </div>
                                <!-- END Search Result Item Thumbnail !-->
                                <div class=""p-l-10 inline p-t-5"">
                                    <h5 class=""m-b-5"">Tweats on<span class=""semi-bol");
                WriteLiteral(@"d result-name""> ice cream</span></h5>
                                    <p class=""hint-text"">via twitter</p>
                                </div>
                            </div>
                            <!-- END Search Result Item !-->
                            <!-- BEGIN Search Result Item !-->
                            <div class="""">
                                <!-- BEGIN Search Result Item Thumbnail !-->
                                <div class=""thumbnail-wrapper d48 circular text-white bg-danger inline m-t-10"">
                                    <div>
                                        <i class=""fa fa-google-plus large-text ""></i>
                                    </div>
                                </div>
                                <!-- END Search Result Item Thumbnail !-->
                                <div class=""p-l-10 inline p-t-5"">
                                    <h5 class=""m-b-5"">Circles on<span class=""semi-bold result-name""> ice cream</span></h5>
         ");
                WriteLiteral(@"                           <p class=""hint-text"">via google plus</p>
                                </div>
                            </div>
                            <!-- END Search Result Item !-->
                        </div>
                    </div>
                </div>
            </div>
            <!-- END Overlay Search Results !-->
        </div>
        <div class=""map-container full-width full-height"">
            <div id=""google-map"" class=""full-width full-height""></div>
        </div>
        <!-- END Overlay Content !-->
    </div>
    ");
                EndContext();
                BeginContext(13227, 8529, false);
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("environment", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "0129df5d039646d7b0c1e3f35536f0bf", async() => {
                    BeginContext(13260, 2, true);
                    WriteLiteral("\n\n");
                    EndContext();
                    BeginContext(13351, 3309, true);
                    WriteLiteral(@"        <script type=""text/javascript"" language=""javascript"" src=""../js/pdf/jquery-3.3.1.js""></script>

        <script src=""../plugins/pace/pace.min.js"" type=""text/javascript""></script>
        <script src=""../plugins/jquery/jquery-1.11.1.min.js"" type=""text/javascript""></script>
        <script src=""../plugins/modernizr.custom.js"" type=""text/javascript""></script>
        <script src=""../plugins/jquery-ui/jquery-ui.min.js"" type=""text/javascript""></script>
        <script src=""../plugins/tether/js/tether.min.js"" type=""text/javascript""></script>
        <script src=""../plugins/bootstrap/js/bootstrap.min.js"" type=""text/javascript""></script>
        <script src=""../plugins/jquery/jquery-easy.js"" type=""text/javascript""></script>
        <script src=""../plugins/jquery-unveil/jquery.unveil.min.js"" type=""text/javascript""></script>
        <script src=""../plugins/jquery-ios-list/jquery.ioslist.min.js"" type=""text/javascript""></script>
        <script src=""../plugins/jquery-actual/jquery.actual.min.js""></script>
       ");
                    WriteLiteral(@" <script src=""../plugins/jquery-scrollbar/jquery.scrollbar.min.js""></script>
        <script type=""text/javascript"" src=""../plugins/select2/js/select2.full.min.js""></script>
        <script type=""text/javascript"" src=""../plugins/classie/classie.js""></script>
        <script src=""../plugins/switchery/js/switchery.min.js"" type=""text/javascript""></script>
        <script src=""../plugins/nvd3/lib/d3.v3.js"" type=""text/javascript""></script>
        <script src=""../plugins/nvd3/nv.d3.min.js"" type=""text/javascript""></script>
        <script src=""../plugins/nvd3/src/utils.js"" type=""text/javascript""></script>
        <script src=""../plugins/nvd3/src/tooltip.js"" type=""text/javascript""></script>
        <script src=""../plugins/nvd3/src/interactiveLayer.js"" type=""text/javascript""></script>
        <script src=""../plugins/nvd3/src/models/axis.js"" type=""text/javascript""></script>
        <script src=""../plugins/nvd3/src/models/line.js"" type=""text/javascript""></script>
        <script src=""../plugins/nvd3/src/models/lineWith");
                    WriteLiteral(@"FocusChart.js"" type=""text/javascript""></script>
        <script src=""../plugins/mapplic/js/hammer.js""></script>
        <script src=""../plugins/mapplic/js/jquery.mousewheel.js""></script>
        <script src=""../plugins/mapplic/js/mapplic.js""></script>
        <script src=""../plugins/rickshaw/rickshaw.js""></script>
        <script src=""../plugins/jquery-metrojs/MetroJs.min.js"" type=""text/javascript""></script>
        <script src=""../plugins/jquery-sparkline/jquery.sparkline.min.js"" type=""text/javascript""></script>
        <script src=""../plugins/skycons/skycons.js"" type=""text/javascript""></script>
        <script src=""../plugins/bootstrap-datepicker/js/bootstrap-datepicker.js"" type=""text/javascript""></script>
        <script src=""../plugins/bootstrap-datepicker/js/locales/bootstrap-datepicker.pt-BR.js"" type=""text/javascript""></script>
        <script type=""text/javascript"" src=""../plugins/jquery-nouislider/jquery.nouislider.min.js""></script>
        <script type=""text/javascript"" src=""../plugins/jquery-nouisli");
                    WriteLiteral("der/jquery.liblink.js\"></script>\n        <script src=\"../pages/js/pages.min.js\"></script>\n        <script src=\"../js/dashboard.js\" type=\"text/javascript\"></script>\n        <script src=\"../js/scripts.js\" type=\"text/javascript\"></script>\n\n");
                    EndContext();
                    BeginContext(16739, 5003, true);
                    WriteLiteral(@"        <script type=""text/javascript"" language=""javascript"" src=""../js/pdf/jquery.dataTables.min.js""></script>
        <script type=""text/javascript"" language=""javascript"" src=""../js/pdf/dataTables.buttons.min.js""></script>
        <script type=""text/javascript"" language=""javascript"" src=""../js/pdf/jszip.min.js""></script>
        <script type=""text/javascript"" language=""javascript"" src=""../js/pdf/pdfmake.min.js""></script>
        <script type=""text/javascript"" language=""javascript"" src=""../js/pdf/vfs_fonts.js""></script>
        <script type=""text/javascript"" language=""javascript"" src=""../js/pdf/buttons.html5.min.js""></script>
        <script type=""text/javascript"" language=""javascript"" src=""../js/buttons.colVis.min.js""></script>
        <script src=""../plugins/jquery-datatable/extensions/TableTools/js/dataTables.tableTools.min.js"" type=""text/javascript""></script>
        <script src=""../plugins/jquery-datatable/media/js/dataTables.bootstrap.js"" type=""text/javascript""></script>
        <script src=""../plugins");
                    WriteLiteral(@"/jquery-datatable/extensions/Bootstrap/jquery-datatable-bootstrap.js"" type=""text/javascript""></script>
        <script type=""text/javascript"" src=""../plugins/datatables-responsive/js/datatables.responsive.js""></script>
        <script type=""text/javascript"" src=""../plugins/datatables-responsive/js/lodash.min.js""></script>
        <script src=""../plugins/moment/moment-with-locales.min.js""></script>
        <script src=""../plugins/moment/moment.min.js""></script>
        <script src=""../plugins/bootstrap-daterangepicker/daterangepicker.js""></script>
        <script src=""../plugins/bootstrap-datepicker/js/bootstrap-datepicker.js""></script>
        <script src=""../plugins/bootstrap-timepicker/bootstrap-timepicker.min.js""></script>
        <script src=""../plugins/bootstrap-datepicker/js/locales/bootstrap-datepicker.pt-br.js""></script>
        <script src=""../plugins/jquery-datatable/extensions/Moment/datetime-moment.js""></script>

        <script src=""../plugins/bootstrap-typehead/typeahead.bundle.min.js""></script>");
                    WriteLiteral(@"
        <script src=""../plugins/bootstrap-typehead/typeahead.jquery.min.js""></script>
        <script src=""../plugins/handlebars/handlebars-v4.0.5.js""></script>
        <script type=""text/javascript"" src=""../plugins/jquery-autonumeric/autoNumeric.js""></script>
        <script type=""text/javascript"" src=""../plugins/dropzone/dropzone.min.js""></script>
        <script src=""../plugins/jquery-validation/js/jquery.validate.js"" type=""text/javascript""></script>
        <script src=""../plugins/jquery-validation/js/jquery.validate.pt-br.js"" type=""text/javascript""></script>
        <script src=""../plugins/summernote/js/summernote.min.js"" type=""text/javascript""></script>
        <script src=""../plugins/moment/moment.min.js""></script>
        <script src=""../plugins/bootstrap-form-wizard/js/jquery.bootstrap.wizard.min.js"" type=""text/javascript""></script>
        <script src=""../js/form_functions.js"" type=""text/javascript""></script>
        <script src=""../js/report_functions.js"" type=""text/javascript""></script>
        <");
                    WriteLiteral(@"script src=""../js/timeago/dist/timeago.min.js"" type=""text/javascript""></script>
        <script src=""../js/classes/Register.js""></script>
        <script src=""../plugins/jquery-inputmask/jquery.inputmask.min.js"" type=""text/javascript""></script>
        <script src=""../js/Mascara.js"" type=""text/javascript""></script>
        <script src=""../js/jquery.mask.min.js""></script>
        <script src=""../js/jquery.validate.cnpj.cpf.js""></script>
        <!-- Salesflare tracking -->
        <script src=""https://storage.googleapis.com/lib.salesflare.com/discuss.js/dist/discuss.js""></script>
        <!-- XDStore uses easyXDM which uses json -->
        <script type=""text/javascript"" src=""https://storage.googleapis.com/lib.salesflare.com/easyXDM-2.4.19.3/easyXDM.min.js""></script>
        <script type=""text/javascript"">easyXDM.DomHelper.requiresJSON(""https://storage.googleapis.com/lib.salesflare.com/easyXDM-2.4.19.3/json2.js"");</script>
        <script type=""text/javascript"" src=""https://storage.googleapis.com/lib.salesflar");
                    WriteLiteral(@"e.com/xdstore.js/XDStore.js""></script>
        <script src=""https://storage.googleapis.com/track.salesflare.com/flare.js""></script>
        <script src=""../js/Core/Core.Custom.js""></script>
        <script src=""../js/notifications.js""></script>
        <script src=""../js/OmniBus.js""></script>
        <script src=""https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/markerclusterer.js""></script>
        <script src=""https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyAOL7Sc32394IULKkPi04jaeXP-Fs2R738&libraries=visualization"" type=""text/javascript""></script>
        <script type=""text/javascript"" src=""../js/google_map.js""></script>
        <script type=""text/javascript"" src=""../js/google_heatmap.js""></script>

        <script>
            var flare = new Flare();
            flare.track(""tIh6_ADQuTewa1vCSNv5NfEFQJFleMm2C5R-856zrqoVc"");
        </script>

    ");
                    EndContext();
                }
                );
                __Microsoft_AspNetCore_Mvc_TagHelpers_EnvironmentTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.EnvironmentTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_EnvironmentTagHelper);
                __Microsoft_AspNetCore_Mvc_TagHelpers_EnvironmentTagHelper.Names = (string)__tagHelperAttribute_0.Value;
                __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_0);
                await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                if (!__tagHelperExecutionContext.Output.IsContentModified)
                {
                    await __tagHelperExecutionContext.SetOutputContentAsync();
                }
                Write(__tagHelperExecutionContext.Output);
                __tagHelperExecutionContext = __tagHelperScopeManager.End();
                EndContext();
                BeginContext(21756, 6, true);
                WriteLiteral("\n\n    ");
                EndContext();
                BeginContext(21763, 41, false);
#line 314 "C:\Users\Patrick\Desktop\MASSlabactivity\PagesUI\PagesUI\Views\Shared\_Layout.cshtml"
Write(RenderSection("Scripts", required: false));

#line default
#line hidden
                EndContext();
                BeginContext(21804, 5, true);
                WriteLiteral("\n    ");
                EndContext();
                BeginContext(21810, 46, false);
#line 315 "C:\Users\Patrick\Desktop\MASSlabactivity\PagesUI\PagesUI\Views\Shared\_Layout.cshtml"
Write(RenderSection("ScriptsReady", required: false));

#line default
#line hidden
                EndContext();
                BeginContext(21856, 2, true);
                WriteLiteral("\n\n");
                EndContext();
            }
            );
            __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_BodyTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.BodyTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_Razor_TagHelpers_BodyTagHelper);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_1);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            EndContext();
            BeginContext(21865, 9, true);
            WriteLiteral("\n</html>\n");
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
