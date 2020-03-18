(function ($) {
    'use strict';
    var Pages = function () {
        this.VERSION = "4.1.0";
        this.AUTHOR = "Revox";
        this.SUPPORT = "support@revox.io";
        this.pageScrollElement = 'html, body';
        this.$body = $('body');
        this.setUserOS();
        this.setUserAgent();
    }
    Pages.prototype.setUserOS = function () {
        var OSName = "";
        if (navigator.appVersion.indexOf("Win") != -1)
            OSName = "windows";
        if (navigator.appVersion.indexOf("Mac") != -1)
            OSName = "mac";
        if (navigator.appVersion.indexOf("X11") != -1)
            OSName = "unix";
        if (navigator.appVersion.indexOf("Linux") != -1)
            OSName = "linux";
        this.$body.addClass(OSName);
    }
    Pages.prototype.setUserAgent = function () {
        if (navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i)) {
            this.$body.addClass('mobile');
        } else {
            this.$body.addClass('desktop');
            if (navigator.userAgent.match(/MSIE 9.0/)) {
                this.$body.addClass('ie9');
            }
        }
    }
    Pages.prototype.isVisibleXs = function () {
        (!$('#pg-visible-xs').length) && this.$body.append('<div id="pg-visible-xs" class="visible-xs" />');
        return $('#pg-visible-xs').is(':visible');
    }
    Pages.prototype.isVisibleSm = function () {
        (!$('#pg-visible-sm').length) && this.$body.append('<div id="pg-visible-sm" class="visible-sm" />');
        return $('#pg-visible-sm').is(':visible');
    }
    Pages.prototype.isVisibleMd = function () {
        (!$('#pg-visible-md').length) && this.$body.append('<div id="pg-visible-md" class="visible-md" />');
        return $('#pg-visible-md').is(':visible');
    }
    Pages.prototype.isVisibleLg = function () {
        (!$('#pg-visible-lg').length) && this.$body.append('<div id="pg-visible-lg" class="visible-lg" />');
        return $('#pg-visible-lg').is(':visible');
    }
    Pages.prototype.getUserAgent = function () {
        return $('body').hasClass('mobile') ? "mobile" : "desktop";
    }
    Pages.prototype.setFullScreen = function (element) {
        var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullscreen;
        if (requestMethod) {
            requestMethod.call(element);
        } else if (typeof window.ActiveXObject !== "undefined") {
            var wscript = new ActiveXObject("WScript.Shell");
            if (wscript !== null) {
                wscript.SendKeys("{F11}");
            }
        }
    }
    Pages.prototype.getColor = function (color, opacity) {
        opacity = parseFloat(opacity) || 1;
        var elem = $('.pg-colors').length ? $('.pg-colors') : $('<div class="pg-colors"></div>').appendTo('body');
        var colorElem = elem.find('[data-color="' + color + '"]').length ? elem.find('[data-color="' + color + '"]') : $('<div class="bg-' + color + '" data-color="' + color + '"></div>').appendTo(elem);
        var color = colorElem.css('background-color');
        var rgb = color.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        var rgba = "rgba(" + rgb[1] + ", " + rgb[2] + ", " + rgb[3] + ', ' + opacity + ')';
        return rgba;
    }
    Pages.prototype.initSidebar = function (context) {
        $('[data-pages="sidebar"]', context).each(function () {
            var $sidebar = $(this)
            $sidebar.sidebar($sidebar.data())
        })
    }
    Pages.prototype.initDropDown = function (context) {
        $('.dropdown-default', context).each(function () {
            var btn = $(this).find('.dropdown-menu').siblings('.dropdown-toggle');
            var offset = 0;
            var menuWidth = $(this).find('.dropdown-menu').actual('outerWidth');
            if (btn.actual('outerWidth') < menuWidth) {
                btn.width(menuWidth - offset);
                $(this).find('.dropdown-menu').width(btn.actual('outerWidth'));
            } else {
                $(this).find('.dropdown-menu').width(btn.actual('outerWidth'));
            }
        });
    }
    Pages.prototype.initFormGroupDefault = function (context) {
        $('.form-group.form-group-default', context).click(function () {
            $(this).find('input').focus();
        });
        if (!this.initFormGroupDefaultRun) {
            $('body').on('focus', '.form-group.form-group-default :input', function () {
                var type = $(this).attr("type");
                if (type == "checkbox" || type == "radio") {
                    return;
                }
                $('.form-group.form-group-default').removeClass('focused');
                $(this).parents('.form-group').addClass('focused');
            });
            $('body').on('blur', '.form-group.form-group-default :input', function () {
                var type = $(this).attr("type");
                if (type == "checkbox" || type == "radio") {
                    return;
                }
                $(this).parents('.form-group').removeClass('focused');
                if ($(this).val()) {
                    $(this).closest('.form-group').find('label').addClass('fade');
                } else {
                    $(this).closest('.form-group').find('label').removeClass('fade');
                }
            });
            this.initFormGroupDefaultRun = true;
        }
    }
    Pages.prototype.initSlidingTabs = function (context) {
        $('a[data-toggle="tab"]', context).on('show.bs.tab', function (e) {
            e = $(e.target).parent().find('a[data-toggle=tab]');
            var hrefCurrent = e.data('target');
            if (hrefCurrent === undefined) {
                hrefCurrent = e.attr('href');
            }
            if (!$(hrefCurrent).is('.slide-left, .slide-right'))
                return;
            $(hrefCurrent).addClass('sliding');
            setTimeout(function () {
                $(hrefCurrent).removeClass('sliding');
            }, 100);
        });
    }
    Pages.prototype.reponsiveTabs = function () {
        $('[data-init-reponsive-tabs="dropdownfx"]').each(function () {
            var drop = $(this);
            drop.addClass("d-none d-md-flex d-lg-flex d-xl-flex");
            var content = '<select class="cs-select cs-skin-slide full-width" data-init-plugin="cs-select">'
            for (var i = 1; i <= drop.children("li").length; i++) {
                var li = drop.children("li:nth-child(" + i + ")");
                var selected = "";
                if (li.children('a').hasClass("active")) {
                    selected = "selected";
                }
                var tabRef = li.children('a').attr('href');
                if (tabRef == "#" || "") {
                    tabRef = li.children('a').attr('data-target')
                }
                content += '<option value="' + tabRef + '" ' + selected + '>';
                content += li.children('a').text();
                content += '</option>';
            }
            content += '</select>'
            drop.after(content);
            var select = drop.next()[0];
            $(select).on('change', function (e) {
                var optionSelected = $("option:selected", this);
                var valueSelected = this.value;
                var tabLink = drop.find('a[data-target="' + valueSelected + '"]');
                if (tabLink.length == 0) {
                    tabLink = drop.find('a[data-target="' + valueSelected + '"]')
                }
                tabLink.tab('show')
            })
            $(select).wrap('<div class="nav-tab-dropdown cs-wrapper full-width d-lg-none d-xl-none d-md-none"></div>');
            new SelectFx(select);
        });
    }
    Pages.prototype.initNotificationCenter = function () {
        $('body').on('click', '.notification-list .dropdown-menu', function (event) {
            event.stopPropagation();
        });
        $('body').on('click', '.toggle-more-details', function (event) {
            var p = $(this).closest('.heading');
            p.closest('.heading').children('.more-details').stop().slideToggle('fast', function () {
                p.toggleClass('open');
            });
        });
    }
    Pages.prototype.initProgressBars = function () {
        $(window).on('load', function () {
            $('.progress-bar-indeterminate, .progress-circle-indeterminate, .mapplic-pin').hide().show(0);
        });
    }
    Pages.prototype.initInputFile = function () {
        $(document).on('change', '.btn-file :file', function () {
            var input = $(this)
                , numFiles = input.get(0).files ? input.get(0).files.length : 1
                , label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
            input.trigger('fileselect', [numFiles, label]);
        });
        $('.btn-file :file').on('fileselect', function (event, numFiles, label) {
            var input = $(this).parents('.input-group').find(':text')
                , log = numFiles > 1 ? numFiles + ' files selected' : label;
            if (input.length) {
                input.val(log);
            } else {
                $(this).parent().html(log);
            }
        });
    }
    Pages.prototype.initHorizontalMenu = function () {
        var animationTimer;
        var hMenu = $("[data-pages-init='horizontal-menu']");
        autoHideLi();
        $(document).on('click', '.menu-bar > ul > li', function () {
            if ($(this).children("ul").length == 0) {
                return;
            }
            if ($(window).width() < 992) {
                var menubar = $('.menu-bar');
                var el = $(this);
                var li = menubar.find('li');
                var sub = $(this).children('ul');
                if (el.hasClass("open active")) {
                    el.find('.arrow').removeClass("open active");
                    sub.slideUp(200, function () {
                        el.removeClass("open active");
                    });
                } else {
                    menubar.find('li.open').find('ul').slideUp(200);
                    menubar.find('li.open').find('a').find('.arrow').removeClass('open active');
                    menubar.find('li.open').removeClass("open active");
                    el.find('.arrow').addClass("open active");
                    sub.slideDown(200, function () {
                        el.addClass("open active");
                    });
                }
            } else {
                if ($(this).hasClass('opening')) {
                    _hideMenu($(this));
                } else {
                    _showMenu($(this));
                }
            }
        });
        var resizeTimer;
        $(window).on('resize', function (e) {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function () {
                autoHideLi();
            }, 250);
        });
        $('.content').on('click', function () {
            $('.horizontal-menu .bar-inner > ul > li').removeClass('open');
            $('.menu-bar > ul > li').removeClass('open opening').children("ul").removeAttr("style");
            $("body").find(".ghost-nav-dropdown").remove();
        });
        $('[data-toggle="horizontal-menu"]').on('click touchstart', function (e) {
            e.preventDefault();
            $('body').toggleClass('horizontal-menu-open');
            if (!$('.horizontal-menu-backdrop').length) {
                $('.header').append('<div class="horizontal-menu-backdrop"/>');
                $('.horizontal-menu-backdrop').fadeToggle('fast');
            } else {
                $('.horizontal-menu-backdrop').fadeToggle('fast', function () {
                    $(this).remove();
                });
            }
            $('.menu-bar').toggleClass('open');
        });
        function autoHideLi() {
            var hMenu = $("[data-pages-init='horizontal-menu']");
            var extraLiHide = parseInt(hMenu.data("hideExtraLi")) || 0
            if (hMenu.length == 0) {
                return
            }
            var hMenuRect = hMenu[0].getBoundingClientRect();
            var liTotalWidth = 0;
            var liCount = 0;
            hMenu.children('ul').children('li.more').remove();
            hMenu.children('ul').children('li').each(function (index) {
                $(this).removeAttr("style");
                liTotalWidth = liTotalWidth + $(this).outerWidth(true);
                liCount++;
            });
            if ($(window).width() < 992) {
                return;
            }
            var possibleLi = parseInt(hMenuRect.width / (liTotalWidth / liCount)) - 1;
            possibleLi = possibleLi - extraLiHide;
            if (liCount > possibleLi) {
                var wrapper = createWrapperLI(hMenu);
                for (var i = possibleLi; i < liCount; i++) {
                    var currentLi = hMenu.children('ul').children('li').eq(i);
                    var clone = currentLi.clone();
                    clone.children("ul").addClass("sub-menu");
                    wrapper.children("ul").append(clone);
                    currentLi.hide();
                }
            }
        }
        function createWrapperLI(hMenu) {
            var li = hMenu.children('ul').append("<li class='more'><a href='javascript:;'><span class='title d-flex'><i class='pg-icon'>more_horizontal</i></span></a><ul></ul></li>");
            li = hMenu.children('ul').children('li.more');
            return li;
        }
        function _hideMenu($el) {
            var ul = $($el.children("ul")[0]);
            var ghost = $("<div class='ghost-nav-dropdown'></div>");
            if (ul.length == 0) {
                return;
            }
            var rect = ul[0].getBoundingClientRect();
            ghost.css({
                "width": rect.width + "px",
                "height": rect.height + "px",
                "z-index": "auto"
            })
            $el.append(ghost);
            var timingSpeed = ul.children("li").css('transition-duration');
            timingSpeed = parseInt(parseFloat(timingSpeed) * 1000);
            $el.addClass('closing');
            window.clearTimeout(animationTimer);
            animationTimer = window.setTimeout(function () {
                ghost.height(0);
                $el.removeClass('open opening closing');
            }, timingSpeed - 80);
        }
        function _showMenu($el) {
            var ul = $($el.children("ul")[0]);
            var ghost = $("<div class='ghost-nav-dropdown'></div>");
            $el.children(".ghost-nav-dropdown").remove();
            $el.addClass('open').siblings().removeClass('open opening');
            if (ul.length == 0) {
                return;
            }
            var rect = ul[0].getBoundingClientRect();
            ghost.css({
                "width": rect.width + "px",
                "height": "0px"
            });
            $el.append(ghost);
            ghost.height(rect.height);
            var timingSpeed = ghost.css('transition-duration');
            timingSpeed = parseInt(parseFloat(timingSpeed) * 1000)
            window.clearTimeout(animationTimer);
            animationTimer = window.setTimeout(function () {
                $el.addClass('opening');
                ghost.remove()
            }, timingSpeed);
        }
    }
    Pages.prototype.initTooltipPlugin = function (context) {
        $.fn.tooltip && $('[data-toggle="tooltip"]', context).tooltip();
    }
    Pages.prototype.initSelect2Plugin = function (context) {
        $.fn.select2 && $('[data-init-plugin="select2"]', context).each(function () {
            $(this).select2({
                minimumResultsForSearch: ($(this).attr('data-disable-search') == 'true' ? -1 : 1)
            }).on('select2:open', function () {
                $.fn.scrollbar && $('.select2-results__options').scrollbar({
                    ignoreMobile: false
                })
            });
        });
    }
    Pages.prototype.initScrollBarPlugin = function (context) {
        $.fn.scrollbar && $('.scrollable', context).scrollbar({
            ignoreOverlay: false
        });
    }
    Pages.prototype.initListView = function (context) {
        $.fn.ioslist && $('[data-init-list-view="ioslist"]', context).ioslist();
        $.fn.scrollbar && $('.list-view-wrapper', context).scrollbar({
            ignoreOverlay: false
        });
    }
    Pages.prototype.initSelectFxPlugin = function (context) {
        window.SelectFx && $('select[data-init-plugin="cs-select"]', context).each(function () {
            var el = $(this).get(0);
            $(el).wrap('<div class="cs-wrapper"></div>');
            new SelectFx(el);
        });
    }
    Pages.prototype.initUnveilPlugin = function (context) {
        $.fn.unveil && $("img", context).unveil();
    }
    Pages.prototype.initValidatorPlugin = function () {
        $.validator && $.validator.setDefaults({
            ignore: "",
            showErrors: function (errorMap, errorList) {
                var $this = this;
                $.each(this.successList, function (index, value) {
                    var parent = $(this).closest('.form-group-attached');
                    if (parent.length)
                        return $(value).popover("hide");
                });
                return $.each(errorList, function (index, value) {
                    var parent = $(value.element).closest('.form-group-attached');
                    if (!parent.length) {
                        return $this.defaultShowErrors();
                    }
                    var _popover;
                    _popover = $(value.element).popover({
                        trigger: "manual",
                        placement: "top",
                        html: true,
                        template: '<div class="popover validation-popover" role="tooltip"><div class="arrow"></div><div class="popover-body"></div></div>',
                        container: parent.closest('form'),
                        content: value.message
                    });
                    var parent = $(value.element).closest('.form-group');
                    parent.addClass('has-error');
                    $(value.element).popover("show");
                });
            },
            onfocusout: function (element) {
                var parent = $(element).closest('.form-group');
                if ($(element).valid()) {
                    parent.removeClass('has-error');
                    parent.next('.error').remove();
                }
            },
            onkeyup: function (element) {
                var parent = $(element).closest('.form-group');
                if ($(element).valid()) {
                    $(element).removeClass('error');
                    parent.removeClass('has-error');
                    parent.next('label.error').remove();
                    parent.find('label.error').remove();
                } else {
                    parent.addClass('has-error');
                }
            },
            errorPlacement: function (error, element) {
                var parent = $(element).closest('.form-group');
                if (parent.hasClass('form-group-default')) {
                    parent.addClass('has-error');
                    error.insertAfter(parent);
                } else if (element.parent().hasClass('checkbox')) {
                    error.insertAfter(element.parent());
                } else {
                    error.insertAfter(element);
                }
            }
        });
    }
    Pages.prototype.setBackgroundImage = function () {
        $('[data-pages-bg-image]').each(function () {
            var _elem = $(this)
            var defaults = {
                pagesBgImage: "",
                lazyLoad: 'true',
                progressType: '',
                progressColor: '',
                bgOverlay: '',
                bgOverlayClass: '',
                overlayOpacity: 0,
            }
            var data = _elem.data();
            $.extend(defaults, data);
            var url = defaults.pagesBgImage;
            var color = defaults.bgOverlay;
            var opacity = defaults.overlayOpacity;
            var overlay = $('<div class="bg-overlay"></div>');
            overlay.addClass(defaults.bgOverlayClass);
            overlay.css({
                'background-color': color,
                'opacity': 1
            });
            _elem.append(overlay);
            var img = new Image();
            img.src = url;
            img.onload = function () {
                _elem.css({
                    'background-image': 'url(' + url + ')'
                });
                _elem.children('.bg-overlay').css({
                    'opacity': opacity
                });
            }
        })
    }
    Pages.prototype.secondarySidebar = function () {
        $('[data-init="secondary-sidebar"]').each(function () {
            $(this).on('click', '.main-menu li a', function (e) {
                if ($(this).parent().children('.sub-menu') === false) {
                    return;
                }
                var el = $(this);
                var parent = $(this).parent().parent();
                var li = $(this).parent();
                var sub = $(this).parent().children('.sub-menu');
                if (li.hasClass("open active")) {
                    el.children('.arrow').removeClass("open active");
                    sub.slideUp(200, function () {
                        li.removeClass("open active");
                    });
                } else {
                    parent.children('li.open').children('.sub-menu').slideUp(200);
                    parent.children('li.open').children('a').children('.arrow').removeClass('open active');
                    parent.children('li.open').removeClass("open active");
                    el.children('.arrow').addClass("open active");
                    sub.slideDown(200, function () {
                        li.addClass("open active");
                    });
                }
            });
        });
        $('[data-init="secondary-sidebar-toggle"]').each(function () {
            $(this).on("click", function (e) {
                var toggleRect = $(this).get(0).getBoundingClientRect();
                var menu = $('[data-init="secondary-sidebar"]');
                if (menu.hasClass("open")) {
                    menu.removeClass("open");
                    menu.removeAttr("style");
                } else {
                    menu.addClass("open")
                    var menuRect = menu.get(0).getBoundingClientRect();
                    menu.css({
                        top: toggleRect.bottom,
                        'max-height': ($(window).height() - toggleRect.bottom),
                        left: $(window).width() / 2 - menuRect.width / 2,
                        'visibility': 'visible'
                    });
                }
            })
        });
    }
    Pages.prototype.init = function () {
        this.initSidebar();
        this.setBackgroundImage();
        this.initDropDown();
        this.initFormGroupDefault();
        this.initSlidingTabs();
        this.initNotificationCenter();
        this.initProgressBars();
        this.initHorizontalMenu();
        this.initTooltipPlugin();
        this.initSelect2Plugin();
        this.initScrollBarPlugin();
        this.initSelectFxPlugin();
        this.initUnveilPlugin();
        this.initValidatorPlugin();
        this.initListView();
        this.initInputFile();
        this.reponsiveTabs();
        this.secondarySidebar();
    }
    $.Pages = new Pages();
    $.Pages.Constructor = Pages;
}
)(window.jQuery);
; (function (window) {
    'use strict';
    function hasParent(e, p) {
        if (!e)
            return false;
        var el = e.target || e.srcElement || e || false;
        while (el && el != p) {
            el = el.parentNode || false;
        }
        return (el !== false);
    }
    ; function extend(a, b) {
        for (var key in b) {
            if (b.hasOwnProperty(key)) {
                a[key] = b[key];
            }
        }
        return a;
    }
    function SelectFx(el, options) {
        this.el = el;
        this.options = extend({}, this.options);
        extend(this.options, options);
        this._init();
    }
    function closest(elem, selector) {
        var matchesSelector = elem.matches || elem.webkitMatchesSelector || elem.mozMatchesSelector || elem.msMatchesSelector;
        while (elem) {
            if (matchesSelector.bind(elem)(selector)) {
                return elem;
            } else {
                elem = elem.parentElement;
            }
        }
        return false;
    }
    function offset(el) {
        return {
            left: el.getBoundingClientRect().left + window.pageXOffset - el.ownerDocument.documentElement.clientLeft,
            top: el.getBoundingClientRect().top + window.pageYOffset - el.ownerDocument.documentElement.clientTop
        }
    }
    function insertAfter(newNode, referenceNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    }
    SelectFx.prototype.options = {
        newTab: true,
        stickyPlaceholder: true,
        container: 'body',
        onChange: function (el) {
            var event = document.createEvent('HTMLEvents');
            event.initEvent('change', true, false);
            el.dispatchEvent(event);
        }
    }
    SelectFx.prototype._init = function () {
        var selectedOpt = document.querySelector('option[selected]');
        this.hasDefaultPlaceholder = selectedOpt && selectedOpt.disabled;
        this.selectedOpt = selectedOpt || this.el.querySelector('option');
        this._createSelectEl();
        this.selOpts = [].slice.call(this.selEl.querySelectorAll('li[data-option]'));
        this.selOptsCount = this.selOpts.length;
        this.current = this.selOpts.indexOf(this.selEl.querySelector('li.cs-selected')) || -1;
        this.selPlaceholder = this.selEl.querySelector('span.cs-placeholder');
        this._initEvents();
        this.el.onchange = function () {
            var index = this.selectedIndex;
            var inputText = this.children[index].innerHTML.trim();
        }
    }
    SelectFx.prototype._createSelectEl = function () {
        var self = this
            , options = ''
            , createOptionHTML = function (el) {
                var optclass = ''
                    , classes = ''
                    , link = '';
                if (el.selectedOpt && !this.foundSelected && !this.hasDefaultPlaceholder) {
                    classes += 'cs-selected ';
                    this.foundSelected = true;
                }
                if (el.getAttribute('data-class')) {
                    classes += el.getAttribute('data-class');
                }
                if (el.getAttribute('data-link')) {
                    link = 'data-link=' + el.getAttribute('data-link');
                }
                if (classes !== '') {
                    optclass = 'class="' + classes + '" ';
                }
                return '<li ' + optclass + link + ' data-option data-value="' + el.value + '"><span>' + el.textContent + '</span></li>';
            };
        [].slice.call(this.el.children).forEach(function (el) {
            if (el.disabled) {
                return;
            }
            var tag = el.tagName.toLowerCase();
            if (tag === 'option') {
                options += createOptionHTML(el);
            } else if (tag === 'optgroup') {
                options += '<li class="cs-optgroup"><span>' + el.label + '</span><ul>';
                [].slice.call(el.children).forEach(function (opt) {
                    options += createOptionHTML(opt);
                })
                options += '</ul></li>';
            }
        });
        var opts_el = '<div class="cs-options"><ul>' + options + '</ul></div>';
        this.selEl = document.createElement('div');
        this.selEl.className = this.el.className;
        this.selEl.tabIndex = this.el.tabIndex;
        this.selEl.innerHTML = '<span class="cs-placeholder">' + this.selectedOpt.textContent + '</span>' + opts_el;
        this.el.parentNode.appendChild(this.selEl);
        this.selEl.appendChild(this.el);
        var backdrop = document.createElement('div');
        backdrop.className = 'cs-backdrop';
        this.selEl.appendChild(backdrop);
    }
    SelectFx.prototype._initEvents = function () {
        var self = this;
        this.selPlaceholder.addEventListener('click', function () {
            self._toggleSelect();
        });
        this.selOpts.forEach(function (opt, idx) {
            opt.addEventListener('click', function () {
                self.current = idx;
                self._changeOption();
                self._toggleSelect();
            });
        });
        document.addEventListener('click', function (ev) {
            var target = ev.target;
            if (self._isOpen() && target !== self.selEl && !hasParent(target, self.selEl)) {
                self._toggleSelect();
            }
        });
        this.selEl.addEventListener('keydown', function (ev) {
            var keyCode = ev.keyCode || ev.which;
            switch (keyCode) {
                case 38:
                    ev.preventDefault();
                    self._navigateOpts('prev');
                    break;
                case 40:
                    ev.preventDefault();
                    self._navigateOpts('next');
                    break;
                case 32:
                    ev.preventDefault();
                    if (self._isOpen() && typeof self.preSelCurrent != 'undefined' && self.preSelCurrent !== -1) {
                        self._changeOption();
                    }
                    self._toggleSelect();
                    break;
                case 13:
                    ev.preventDefault();
                    if (self._isOpen() && typeof self.preSelCurrent != 'undefined' && self.preSelCurrent !== -1) {
                        self._changeOption();
                        self._toggleSelect();
                    }
                    break;
                case 27:
                    ev.preventDefault();
                    if (self._isOpen()) {
                        self._toggleSelect();
                    }
                    break;
            }
        });
    }
    SelectFx.prototype._navigateOpts = function (dir) {
        if (!this._isOpen()) {
            this._toggleSelect();
        }
        var tmpcurrent = typeof this.preSelCurrent != 'undefined' && this.preSelCurrent !== -1 ? this.preSelCurrent : this.current;
        if (dir === 'prev' && tmpcurrent > 0 || dir === 'next' && tmpcurrent < this.selOptsCount - 1) {
            this.preSelCurrent = dir === 'next' ? tmpcurrent + 1 : tmpcurrent - 1;
            this._removeFocus();
            classie.add(this.selOpts[this.preSelCurrent], 'cs-focus');
        }
    }
    SelectFx.prototype._toggleSelect = function () {
        var backdrop = this.selEl.querySelector('.cs-backdrop');
        var container = document.querySelector(this.options.container);
        var mask = container.querySelector('.dropdown-mask');
        var csOptions = this.selEl.querySelector('.cs-options');
        var csPlaceholder = this.selEl.querySelector('.cs-placeholder');
        var csPlaceholderWidth = csPlaceholder.offsetWidth;
        var csPlaceholderHeight = csPlaceholder.offsetHeight;
        var csOptionsWidth = csOptions.scrollWidth;
        if (this._isOpen()) {
            if (this.current !== -1) {
                this.selPlaceholder.textContent = this.selOpts[this.current].textContent;
            }
            var dummy = this.selEl.data;
            var parent = dummy.parentNode;
            insertAfter(this.selEl, dummy);
            this.selEl.removeAttribute('style');
            parent.removeChild(dummy);
            var x = this.selEl.clientHeight;
            backdrop.style.transform = backdrop.style.webkitTransform = backdrop.style.MozTransform = backdrop.style.msTransform = backdrop.style.OTransform = 'scale3d(1,1,1)';
            classie.remove(this.selEl, 'cs-active');
            mask.style.display = 'none';
            csOptions.style.overflowY = 'hidden';
            csOptions.style.width = 'auto';
            var parentFormGroup = closest(this.selEl, '.form-group');
            parentFormGroup && classie.removeClass(parentFormGroup, 'focused');
        } else {
            if (this.hasDefaultPlaceholder && this.options.stickyPlaceholder) {
                this.selPlaceholder.textContent = this.selectedOpt.textContent;
            }
            var dummy;
            if (this.selEl.parentNode.querySelector('.dropdown-placeholder')) {
                dummy = this.selEl.parentNode.querySelector('.dropdown-placeholder');
            } else {
                dummy = document.createElement('div');
                classie.add(dummy, 'dropdown-placeholder');
                insertAfter(dummy, this.selEl);
            }
            dummy.style.height = csPlaceholderHeight + 'px';
            dummy.style.width = this.selEl.offsetWidth + 'px';
            this.selEl.data = dummy;
            this.selEl.style.position = 'absolute';
            var offsetselEl = offset(this.selEl);
            this.selEl.style.left = offsetselEl.left + 'px';
            this.selEl.style.top = offsetselEl.top + 'px';
            container.appendChild(this.selEl);
            var contentHeight = csOptions.offsetHeight;
            var originalHeight = csPlaceholder.offsetHeight;
            var contentWidth = csOptions.offsetWidth;
            var originalWidth = csPlaceholder.offsetWidth;
            var scaleV = contentHeight / originalHeight;
            var scaleH = (contentWidth > originalWidth) ? contentWidth / originalWidth : 1.05;
            backdrop.style.transform = backdrop.style.webkitTransform = backdrop.style.MozTransform = backdrop.style.msTransform = backdrop.style.OTransform = 'scale3d(' + 1 + ', ' + scaleV + ', 1)';
            if (!mask) {
                mask = document.createElement('div');
                classie.add(mask, 'dropdown-mask');
                container.appendChild(mask);
            }
            mask.style.display = 'block';
            classie.add(this.selEl, 'cs-active');
            var resizedWidth = (csPlaceholderWidth < csOptionsWidth) ? csOptionsWidth : csPlaceholderWidth;
            this.selEl.style.width = resizedWidth + 'px';
            this.selEl.style.height = originalHeight + 'px';
            csOptions.style.width = '100%';
            setTimeout(function () {
                csOptions.style.overflowY = 'auto';
            }, 300);
        }
    }
    SelectFx.prototype._changeOption = function () {
        if (typeof this.preSelCurrent != 'undefined' && this.preSelCurrent !== -1) {
            this.current = this.preSelCurrent;
            this.preSelCurrent = -1;
        }
        var opt = this.selOpts[this.current];
        this.selPlaceholder.textContent = opt.textContent;
        this.el.value = opt.getAttribute('data-value');
        var oldOpt = this.selEl.querySelector('li.cs-selected');
        if (oldOpt) {
            classie.remove(oldOpt, 'cs-selected');
        }
        classie.add(opt, 'cs-selected');
        if (opt.getAttribute('data-link')) {
            if (this.options.newTab) {
                window.open(opt.getAttribute('data-link'), '_blank');
            } else {
                window.location = opt.getAttribute('data-link');
            }
        }
        this.options.onChange(this.el);
    }
    SelectFx.prototype._isOpen = function (opt) {
        return classie.has(this.selEl, 'cs-active');
    }
    SelectFx.prototype._removeFocus = function (opt) {
        var focusEl = this.selEl.querySelector('li.cs-focus')
        if (focusEl) {
            classie.remove(focusEl, 'cs-focus');
        }
    }
    window.SelectFx = SelectFx;
}
)(window);
(function ($) {
    'use strict';
    $('[data-chat-input]').on('keypress', function (e) {
        if (e.which == 13) {
            var el = $(this).attr('data-chat-conversation');
            $(el).append('<div class="message clearfix">' + '<div class="chat-bubble from-me">' + $(this).val() + '</div></div>');
            $(this).val('');
        }
    });
}
)(window.jQuery);
(function ($) {
    'use strict';
    var Progress = function (element, options) {
        this.$element = $(element);
        this.options = $.extend(true, {}, $.fn.circularProgress.defaults, options);
        this.$container = $('<div class="progress-circle"></div>');
        this.$element.attr('data-color') && this.$container.addClass('progress-circle-' + this.$element.attr('data-color'));
        this.$element.attr('data-thick') && this.$container.addClass('progress-circle-thick');
        this.$pie = $('<div class="pie"></div>');
        this.$pie.$left = $('<div class="left-side half-circle"></div>');
        this.$pie.$right = $('<div class="right-side half-circle"></div>');
        this.$pie.append(this.$pie.$left).append(this.$pie.$right);
        this.$container.append(this.$pie).append('<div class="shadow"></div>');
        this.$element.after(this.$container);
        this.val = this.$element.val();
        var deg = perc2deg(this.val);
        if (this.val <= 50) {
            this.$pie.$right.css('transform', 'rotate(' + deg + 'deg)');
        } else {
            this.$pie.css('clip', 'rect(auto, auto, auto, auto)');
            this.$pie.$right.css('transform', 'rotate(180deg)');
            this.$pie.$left.css('transform', 'rotate(' + deg + 'deg)');
        }
    }
    Progress.VERSION = "1.0.0";
    Progress.prototype.value = function (val) {
        if (typeof val == 'undefined')
            return;
        var deg = perc2deg(val);
        this.$pie.removeAttr('style');
        this.$pie.$right.removeAttr('style');
        this.$pie.$left.removeAttr('style');
        if (val <= 50) {
            this.$pie.$right.css('transform', 'rotate(' + deg + 'deg)');
        } else {
            this.$pie.css('clip', 'rect(auto, auto, auto, auto)');
            this.$pie.$right.css('transform', 'rotate(180deg)');
            this.$pie.$left.css('transform', 'rotate(' + deg + 'deg)');
        }
    }
    function Plugin(option) {
        return this.filter(':input').each(function () {
            var $this = $(this);
            var data = $this.data('pg.circularProgress');
            var options = typeof option == 'object' && option;
            if (!data)
                $this.data('pg.circularProgress', (data = new Progress(this, options)));
            if (typeof option == 'string')
                data[option]();
            else if (options.hasOwnProperty('value'))
                data.value(options.value);
        })
    }
    var old = $.fn.circularProgress
    $.fn.circularProgress = Plugin
    $.fn.circularProgress.Constructor = Progress
    $.fn.circularProgress.defaults = {
        value: 0
    }
    $.fn.circularProgress.noConflict = function () {
        $.fn.circularProgress = old;
        return this;
    }
    $(window).on('load', function () {
        $('[data-pages-progress="circle"]').each(function () {
            var $progress = $(this)
            $progress.circularProgress($progress.data())
        })
    })
    function perc2deg(p) {
        return parseInt(p / 100 * 360);
    }
}
)(window.jQuery);
(function ($) {
    'use strict';
    var Notification = function (container, options) {
        var self = this;
        self.container = $(container);
        self.notification = $('<div class="pgn push-on-sidebar-open"></div>');
        self.options = $.extend(true, {}, $.fn.pgNotification.defaults, options);
        if (!self.container.find('.pgn-wrapper[data-position=' + this.options.position + ']').length) {
            self.wrapper = $('<div class="pgn-wrapper" data-position="' + this.options.position + '"></div>');
            self.container.append(self.wrapper);
        } else {
            self.wrapper = $('.pgn-wrapper[data-position=' + this.options.position + ']');
        }
        self.alert = $('<div class="alert"></div>');
        self.alert.addClass('alert-' + self.options.type);
        if (self.options.style == 'bar') {
            new BarNotification();
        } else if (self.options.style == 'flip') {
            new FlipNotification();
        } else if (self.options.style == 'circle') {
            new CircleNotification();
        } else if (self.options.style == 'simple') {
            new SimpleNotification();
        } else {
            new SimpleNotification();
        }
        function SimpleNotification() {
            self.notification.addClass('pgn-simple');
            self.alert.append(self.options.message);
            if (self.options.showClose) {
                var close = $('<button type="button" class="close" data-dismiss="alert"></button>').append('<span aria-hidden="true">&times;</span>').append('<span class="sr-only">Close</span>');
                self.alert.prepend(close);
            }
        }
        function BarNotification() {
            self.notification.addClass('pgn-bar');
            self.alert.addClass('alert-' + self.options.type);
            var close = '';
            if (self.options.showClose) {
                close = $('<button type="button" class="close" data-dismiss="alert"></button>').append('<span aria-hidden="true">&times;</span>').append('<span class="sr-only">Close</span>');
            }
            if ($('body').hasClass("horizontal-app-menu")) {
                var container = $('<div class="container"/>');
                container.append('<span>' + self.options.message + '</span>');
                container.append(close);
                self.alert.append(container);
            } else {
                self.alert.append(self.options.message);
                self.alert.prepend(close);
            }
        }
        function CircleNotification() {
            self.notification.addClass('pgn-circle');
            var table = '<div>';
            if (self.options.thumbnail) {
                table += '<div class="pgn-thumbnail"><div>' + self.options.thumbnail + '</div></div>';
            }
            table += '<div class="pgn-message"><div>';
            if (self.options.title) {
                table += '<p class="bold">' + self.options.title + '</p>';
            }
            table += '<p>' + self.options.message + '</p></div></div>';
            table += '</div>';
            if (self.options.showClose) {
                table += '<button type="button" class="close" data-dismiss="alert">';
                table += '<span aria-hidden="true">&times;</span><span class="sr-only">Close</span>';
                table += '</button>';
            }
            self.alert.append(table);
            self.alert.after('<div class="clearfix"></div>');
        }
        function FlipNotification() {
            self.notification.addClass('pgn-flip');
            self.alert.append("<span>" + self.options.message + "</span>");
            if (self.options.showClose) {
                var close = $('<button type="button" class="close" data-dismiss="alert"></button>').append('<span aria-hidden="true">&times;</span>').append('<span class="sr-only">Close</span>');
                self.alert.prepend(close);
            }
        }
        self.notification.append(self.alert);
        function alignWrapperToContainer() {
            var containerPosition = $(".header").get(0);
            var containerHeight = $(containerPosition).height();
            if (/top/.test(self.options.position)) {
                self.wrapper.css('top', containerHeight)
            }
        }
        alignWrapperToContainer()
        $(window).on('resize', alignWrapperToContainer)
        self.alert.on('closed.bs.alert', function () {
            self.notification.remove();
            self.options.onClosed();
        });
        return this;
    };
    Notification.VERSION = "1.0.0";
    Notification.prototype.show = function () {
        this.wrapper.prepend(this.notification);
        this.options.onShown();
        if (this.options.timeout != 0) {
            var _this = this;
            setTimeout(function () {
                this.notification.fadeOut("slow", function () {
                    $(this).remove();
                    _this.options.onClosed();
                });
            }
                .bind(this), this.options.timeout);
        }
    }
        ;
    $.fn.pgNotification = function (options) {
        return new Notification(this, options);
    }
        ;
    $.fn.pgNotification.defaults = {
        style: 'simple',
        message: null,
        position: 'top-right',
        type: 'info',
        showClose: true,
        timeout: 4000,
        onShown: function () { },
        onClosed: function () { }
    }
}
)(window.jQuery);
(function ($) {
    'use strict';
    var Card = function (element, options) {
        this.$element = $(element);
        this.options = $.extend(true, {}, $.fn.card.defaults, options);
        this.$loader = null;
        this.$body = this.$element.find('.card-body');
    }
    Card.VERSION = "1.0.0";
    Card.prototype.collapse = function () {
        var icon = this.$element.find(this.options.collapseButton + ' > i');
        var heading = this.$element.find('.card-header');
        this.$body.stop().slideToggle("fast");
        if (this.$element.hasClass('card-collapsed')) {
            this.$element.removeClass('card-collapsed');
            $.isFunction(this.options.onExpand) && this.options.onExpand(this);
            return
        }
        this.$element.addClass('card-collapsed');
        $.isFunction(this.options.onCollapse) && this.options.onCollapse(this);
    }
    Card.prototype.close = function () {
        this.$element.remove();
        $.isFunction(this.options.onClose) && this.options.onClose(this);
    }
    Card.prototype.maximize = function () {
        var icon = this.$element.find(this.options.maximizeButton + ' > i');
        if (this.$element.hasClass('card-maximized')) {
            this.$element.removeClass('card-maximized');
            this.$element.attr('style', '');
            $.isFunction(this.options.onRestore) && this.options.onRestore(this);
        } else {
            var contentEl = $('.page-content-wrapper > .content');
            var header = $('.header');
            var left = 0;
            if (contentEl) {
                left = contentEl[0].getBoundingClientRect().left;
                var style = window.getComputedStyle(contentEl[0]);
                left = left + (parseFloat(style["marginLeft"]) + parseFloat(style["paddingLeft"]));
            }
            var headerHeight = header.height();
            this.$element.addClass('card-maximized');
            this.$element.css('left', left);
            this.$element.css('top', headerHeight);
            $.isFunction(this.options.onMaximize) && this.options.onMaximize(this);
        }
    }
    Card.prototype.refresh = function (refresh) {
        var toggle = this.$element.find(this.options.refreshButton);
        if (refresh) {
            if (this.$loader && this.$loader.is(':visible'))
                return;
            if (!$.isFunction(this.options.onRefresh))
                return;
            this.$loader = $('<div class="card-progress"></div>');
            this.$loader.css({
                'background-color': 'rgba(' + this.options.overlayColor + ',' + this.options.overlayOpacity + ')'
            });
            var elem = '';
            if (this.options.progress == 'circle') {
                elem += '<div class="progress-circle-indeterminate progress-circle-' + this.options.progressColor + '"></div>';
            } else if (this.options.progress == 'bar') {
                elem += '<div class="progress progress-small">';
                elem += '    <div class="progress-bar-indeterminate progress-bar-' + this.options.progressColor + '"></div>';
                elem += '</div>';
            } else if (this.options.progress == 'circle-lg') {
                toggle.addClass('refreshing');
                var iconOld = toggle.find('> i').first();
                var iconNew;
                if (!toggle.find('[class$="-animated"]').length) {
                    iconNew = $('<i/>');
                    iconNew.css({
                        'position': 'absolute',
                        'top': iconOld.position().top,
                        'left': iconOld.position().left
                    });
                    iconNew.addClass('card-icon-refresh-lg-' + this.options.progressColor + '-animated');
                    toggle.append(iconNew);
                } else {
                    iconNew = toggle.find('[class$="-animated"]');
                }
                iconOld.addClass('fade');
                iconNew.addClass('active');
            } else {
                elem += '<div class="progress progress-small">';
                elem += '    <div class="progress-bar-indeterminate progress-bar-' + this.options.progressColor + '"></div>';
                elem += '</div>';
            }
            this.$loader.append(elem);
            this.$element.append(this.$loader);
            var _loader = this.$loader;
            setTimeout(function () {
                this.$loader.remove();
                this.$element.append(_loader);
            }
                .bind(this), 300);
            this.$loader.fadeIn();
            $.isFunction(this.options.onRefresh) && this.options.onRefresh(this);
        } else {
            var _this = this;
            this.$loader.fadeOut(function () {
                $(this).remove();
                if (_this.options.progress == 'circle-lg') {
                    var iconNew = toggle.find('.active');
                    var iconOld = toggle.find('.fade');
                    iconNew.removeClass('active');
                    iconOld.removeClass('fade');
                    toggle.removeClass('refreshing');
                }
                _this.options.refresh = false;
            });
        }
    }
    Card.prototype.error = function (error) {
        if (error) {
            var _this = this;
            this.$element.pgNotification({
                style: 'bar',
                message: error,
                position: 'top',
                timeout: 0,
                type: 'danger',
                onShown: function () {
                    _this.$loader.find('> div').fadeOut()
                },
                onClosed: function () {
                    _this.refresh(false)
                }
            }).show();
        }
    }
    function Plugin(option) {
        return this.each(function () {
            var $this = $(this);
            var data = $this.data('pg.card');
            var options = typeof option == 'object' && option;
            if (!data)
                $this.data('pg.card', (data = new Card(this, options)));
            if (typeof option == 'string')
                data[option]();
            else if (options.hasOwnProperty('refresh'))
                data.refresh(options.refresh);
            else if (options.hasOwnProperty('error'))
                data.error(options.error);
        })
    }
    var old = $.fn.card
    $.fn.card = Plugin
    $.fn.card.Constructor = Card
    $.fn.card.defaults = {
        progress: 'circle',
        progressColor: 'master',
        refresh: false,
        error: null,
        overlayColor: '255,255,255',
        overlayOpacity: 0.8,
        refreshButton: '[data-toggle="refresh"]',
        maximizeButton: '[data-toggle="maximize"]',
        collapseButton: '[data-toggle="collapse"]',
        closeButton: '[data-toggle="close"]'
    }
    $.fn.card.noConflict = function () {
        $.fn.card = old;
        return this;
    }
    $(document).on('click.pg.card.data-api', '[data-toggle="collapse"]', function (e) {
        var $this = $(this);
        var $target = $this.closest('.card');
        if ($this.is('a'))
            e.preventDefault();
        $target.data('pg.card') && $target.card('collapse');
    })
    $(document).on('click.pg.card.data-api', '[data-toggle="close"]', function (e) {
        var $this = $(this);
        var $target = $this.closest('.card');
        if ($this.is('a'))
            e.preventDefault();
        $target.data('pg.card') && $target.card('close');
    })
    $(document).on('click.pg.card.data-api', '[data-toggle="refresh"]', function (e) {
        var $this = $(this);
        var $target = $this.closest('.card');
        if ($this.is('a'))
            e.preventDefault();
        $target.data('pg.card') && $target.card({
            refresh: true
        })
    })
    $(document).on('click.pg.card.data-api', '[data-toggle="maximize"]', function (e) {
        var $this = $(this);
        var $target = $this.closest('.card');
        if ($this.is('a'))
            e.preventDefault();
        $target.data('pg.card') && $target.card('maximize');
    })
    $(window).on('load', function () {
        $('[data-pages="card"]').each(function () {
            var $card = $(this)
            $card.card($card.data())
        })
    })
}
)(window.jQuery);
(function ($) {
    'use strict';
    var MobileView = function (element, options) {
        var self = this;
        self.options = $.extend(true, {}, $.fn.pgMobileViews.defaults, options);
        self.element = $(element);
        self.element.on('click', function (e) {
            e.preventDefault();
            var data = self.element.data();
            var el = $(data.viewPort);
            var toView = data.toggleView;
            if (data.toggleView != null) {
                el.children().last().children('.view').hide();
                $(data.toggleView).show();
            } else {
                toView = el.last();
            }
            el.toggleClass(data.viewAnimation);
            self.options.onNavigate(toView, data.viewAnimation);
            return false;
        })
        return this;
    };
    $.fn.pgMobileViews = function (options) {
        return new MobileView(this, options);
    }
        ;
    $.fn.pgMobileViews.defaults = {
        onNavigate: function (view, animation) { }
    }
    $(window).on('load', function () {
        $('[data-navigate="view"]').each(function () {
            var $mobileView = $(this)
            $mobileView.pgMobileViews();
        })
    });
}
)(window.jQuery);
(function ($) {
    'use strict';
    var Quickview = function (element, options) {
        this.$element = $(element);
        this.options = $.extend(true, {}, $.fn.quickview.defaults, options);
        this.bezierEasing = [.05, .74, .27, .99];
        var _this = this;
        $(this.options.notes).on('click', '.list > ul > li', function (e) {
            var note = $(this).find('.note-preview');
            var note = $(this).find('.note-preview');
            $(_this.options.noteEditor).html(note.html());
            $(_this.options.notes).toggleClass('push');
        });
        $(this.options.notes).on('click', '.list > ul > li .form-check', function (e) {
            e.stopPropagation();
        });
        $(this.options.notes).on('click', _this.options.backButton, function (e) {
            $(_this.options.notes).find('.toolbar > li > a').removeClass('active');
            $(_this.options.notes).toggleClass('push');
        });
        $(this.options.deleteNoteButton).click(function (e) {
            e.preventDefault();
            $(this).toggleClass('selected');
            $(_this.options.notes).find('.list > ul > li .form-check').fadeToggle("fast");
            $(_this.options.deleteNoteConfirmButton).fadeToggle("fast").removeClass('hide');
        });
        $(this.options.newNoteButton).click(function (e) {
            e.preventDefault();
            $(_this.options.noteEditor).html('');
        });
        $(this.options.deleteNoteConfirmButton).click(function () {
            var checked = $(_this.options.notes).find('input[type=checkbox]:checked');
            checked.each(function () {
                $(this).parents('li').remove();
            });
        });
        $(this.options.notes).on('click', '.toolbar > li > a', function (e) {
            var command = $(this).attr('data-action');
            document.execCommand(command, false, null);
            $(this).toggleClass('active');
        });
    }
    Quickview.VERSION = "1.0.0";
    function Plugin(option) {
        return this.each(function () {
            var $this = $(this);
            var data = $this.data('pg.quickview');
            var options = typeof option == 'object' && option;
            if (!data)
                $this.data('pg.quickview', (data = new Quickview(this, options)));
            if (typeof option == 'string')
                data[option]();
        })
    }
    var old = $.fn.quickview
    $.fn.quickview = Plugin
    $.fn.quickview.Constructor = Quickview
    $.fn.quickview.defaults = {
        notes: '#note-views',
        alerts: '#alerts',
        chat: '#chat',
        notesList: '.list',
        noteEditor: '.quick-note-editor',
        deleteNoteButton: '.delete-note-link',
        deleteNoteConfirmButton: '.btn-remove-notes',
        newNoteButton: '.new-note-link',
        backButton: '.close-note-link'
    }
    $.fn.quickview.noConflict = function () {
        $.fn.quickview = old;
        return this;
    }
    $(window).on('load', function () {
        $('[data-pages="quickview"]').each(function () {
            var $quickview = $(this)
            $quickview.quickview($quickview.data())
        })
    });
    $(document).on('click.pg.quickview.data-api', '[data-toggle="quickview"]', function (e) {
        var elem = $(this).attr('data-toggle-element');
        $(elem).toggleClass('open');
        e.preventDefault();
    })
}
)(window.jQuery);
(function ($) {
    'use strict';
    var Parallax = function (element, options) {
        this.$element = $(element);
        this.options = $.extend(true, {}, $.fn.parallax.defaults, options);
        this.$coverPhoto = this.$element.find('.cover-photo');
        this.$content = this.$element.find('.inner');
        if (this.$coverPhoto.find('> img').length) {
            var img = this.$coverPhoto.find('> img');
            this.$coverPhoto.css('background-image', 'url(' + img.attr('src') + ')');
            img.remove();
        }
        if (this.options.scrollElement !== window) {
            $(this.options.scrollElement).on('scroll', function () {
                $(element).parallax('animate');
            });
        }
    }
    Parallax.VERSION = "1.0.0";
    Parallax.prototype.animate = function () {
        var scrollPos;
        var pagecoverWidth = this.$element.height();
        var opacityKeyFrame = pagecoverWidth * 50 / 100;
        var direction = 'translateX';
        scrollPos = $(this.options.scrollElement).scrollTop();
        direction = 'translateY';
        this.$coverPhoto.css({
            'transform': direction + '(' + scrollPos * this.options.speed.coverPhoto + 'px)'
        });
        this.$content.css({
            'transform': direction + '(' + scrollPos * this.options.speed.content + 'px)',
        });
        if (scrollPos > opacityKeyFrame) {
            this.$content.css({
                'opacity': 1 - scrollPos / 1200
            });
        } else {
            this.$content.css({
                'opacity': 1
            });
        }
    }
    function Plugin(option) {
        return this.each(function () {
            var $this = $(this);
            var data = $this.data('pg.parallax');
            var options = $.extend(true, {}, typeof option == 'object' ? option : {}, $this.data());
            if (!data)
                $this.data('pg.parallax', (data = new Parallax(this, options)));
            if (typeof option == 'string')
                data[option]();
        })
    }
    var old = $.fn.parallax
    $.fn.parallax = Plugin
    $.fn.parallax.Constructor = Parallax
    $.fn.parallax.defaults = {
        speed: {
            coverPhoto: 0.3,
            content: 0.17
        },
        scrollElement: window
    }
    $.fn.parallax.noConflict = function () {
        $.fn.parallax = old;
        return this;
    }
    $(window).on('load', function () {
        $('[data-pages="parallax"]').each(function () {
            var $parallax = $(this)
            $parallax.parallax($parallax.data())
        })
    });
    $(window).on('scroll', function () {
        if (Modernizr.touch) {
            return;
        }
        $('[data-pages="parallax"]').parallax('animate');
    });
}
)(window.jQuery);
(function ($) {
    'use strict';
    var Sidebar = function (element, options) {
        this.$element = $(element);
        this.$body = $('body');
        this.options = $.extend(true, {}, $.fn.sidebar.defaults, options);
        this.bezierEasing = [.05, .74, .27, .99];
        this.cssAnimation = true;
        this.css3d = true;
        this.sideBarWidth = 280;
        this.sideBarWidthCondensed = 280 - 70;
        this.$sidebarMenu = this.$element.find('.sidebar-menu > ul');
        this.$pageContainer = $(this.options.pageContainer);
        if (!this.$sidebarMenu.length)
            return;
        ($.Pages.getUserAgent() == 'desktop') && this.$sidebarMenu.scrollbar({
            ignoreOverlay: false,
            disableBodyScroll: (this.$element.data("disableBodyScroll") == true) ? true : false
        });
        if (!Modernizr.csstransitions)
            this.cssAnimation = false;
        if (!Modernizr.csstransforms3d)
            this.css3d = false;
        (typeof angular === 'undefined') && $(document).on('click', '.sidebar-menu a', function (e) {
            if ($(this).parent().children('.sub-menu') === false) {
                return;
            }
            var el = $(this);
            var parent = $(this).parent().parent();
            var li = $(this).parent();
            var sub = $(this).parent().children('.sub-menu');
            if (li.hasClass("open active")) {
                el.children('.arrow').removeClass("open active");
                sub.slideUp(200, function () {
                    li.removeClass("open active");
                });
            } else {
                parent.children('li.open').children('.sub-menu').slideUp(200);
                parent.children('li.open').children('a').children('.arrow').removeClass('open active');
                parent.children('li.open').removeClass("open active");
                el.children('.arrow').addClass("open active");
                sub.slideDown(200, function () {
                    li.addClass("open active");
                });
            }
        });
        $('.sidebar-slide-toggle').on('click touchend', function (e) {
            e.preventDefault();
            $(this).toggleClass('active');
            var el = $(this).attr('data-pages-toggle');
            if (el != null) {
                $(el).toggleClass('show');
            }
        });
        var _this = this;
        function sidebarMouseEnter(e) {
            var _sideBarWidthCondensed = _this.$body.hasClass("rtl") ? -_this.sideBarWidthCondensed : _this.sideBarWidthCondensed;
            var menuOpenCSS = (this.css3d == true ? 'translate3d(' + _sideBarWidthCondensed + 'px, 0,0)' : 'translate(' + _sideBarWidthCondensed + 'px, 0)');
            if ($.Pages.isVisibleSm() || $.Pages.isVisibleXs()) {
                return false
            }
            if ($('.close-sidebar').data('clicked')) {
                return;
            }
            if (_this.$body.hasClass('menu-pin'))
                return;
            _this.$element.css({
                'transform': menuOpenCSS
            });
            _this.$body.addClass('sidebar-visible');
        }
        function sidebarMouseLeave(e) {
            var menuClosedCSS = (_this.css3d == true ? 'translate3d(0, 0,0)' : 'translate(0, 0)');
            if ($.Pages.isVisibleSm() || $.Pages.isVisibleXs()) {
                return false
            }
            if (typeof e != 'undefined') {
                var target = $(e.target);
                if (target.parent('.page-sidebar').length) {
                    return;
                }
            }
            if (_this.$body.hasClass('menu-pin'))
                return;
            if ($('.sidebar-overlay-slide').hasClass('show')) {
                $('.sidebar-overlay-slide').removeClass('show')
                $("[data-pages-toggle']").removeClass('active')
            }
            _this.$element.css({
                'transform': menuClosedCSS
            });
            _this.$body.removeClass('sidebar-visible');
        }
        this.$element.bind('mouseenter mouseleave', sidebarMouseEnter);
        this.$pageContainer.bind('mouseover', sidebarMouseLeave);
        function toggleMenuPin() {
            var width = $(window).width();
            if (width < 1200) {
                if ($('body').hasClass('menu-pin')) {
                    $('body').removeClass('menu-pin')
                    $('body').addClass('menu-unpinned')
                }
            } else {
                if ($('body').hasClass('menu-unpinned')) {
                    $('body').addClass('menu-pin')
                }
            }
        }
        toggleMenuPin();
        $(document).bind('ready', toggleMenuPin);
        $(window).bind('resize', toggleMenuPin);
    }
    Sidebar.prototype.toggleSidebar = function (toggle) {
        var timer;
        var bodyColor = $('body').css('background-color');
        $('.page-container').css('background-color', bodyColor);
        if (this.$body.hasClass('sidebar-open')) {
            this.$body.removeClass('sidebar-open');
            timer = setTimeout(function () {
                this.$element.removeClass('visible');
            }
                .bind(this), 400);
        } else {
            clearTimeout(timer);
            this.$element.addClass('visible');
            setTimeout(function () {
                this.$body.addClass('sidebar-open');
            }
                .bind(this), 10);
            setTimeout(function () {
                $('.page-container').css({
                    'background-color': ''
                });
            }, 1000);
        }
    }
    Sidebar.prototype.togglePinSidebar = function (toggle) {
        if (toggle == 'hide') {
            this.$body.removeClass('menu-pin');
        } else if (toggle == 'show') {
            this.$body.addClass('menu-pin');
        } else {
            this.$body.toggleClass('menu-pin');
        }
    }
    function Plugin(option) {
        return this.each(function () {
            var $this = $(this);
            var data = $this.data('pg.sidebar');
            var options = typeof option == 'object' && option;
            if (!data)
                $this.data('pg.sidebar', (data = new Sidebar(this, options)));
            if (typeof option == 'string')
                data[option]();
        })
    }
    var old = $.fn.sidebar;
    $.fn.sidebar = Plugin;
    $.fn.sidebar.Constructor = Sidebar;
    $.fn.sidebar.defaults = {
        pageContainer: '.page-container'
    }
    $.fn.sidebar.noConflict = function () {
        $.fn.sidebar = old;
        return this;
    }
    $(document).on('click.pg.sidebar.data-api', '[data-toggle-pin="sidebar"]', function (e) {
        var $this = $(this);
        var $target = $('[data-pages="sidebar"]');
        $target.data('pg.sidebar').togglePinSidebar();
        return false;
    })
    $(document).on('click.pg.sidebar.data-api', '[data-toggle="sidebar"]', function (e) {
        console.log("menu open");
        var $this = $(this);
        var $target = $('[data-pages="sidebar"]');
        $target.data('pg.sidebar').toggleSidebar();
        return false
    })
}
)(window.jQuery);
(function ($) {
    'use strict';
    var Search = function (element, options) {
        this.$element = $(element);
        this.options = $.extend(true, {}, $.fn.search.defaults, options);
        this.init();
    }
    Search.VERSION = "1.0.0";
    Search.prototype.init = function () {
        var _this = this;
        this.pressedKeys = [];
        this.ignoredKeys = [];
        this.$searchField = this.$element.find(this.options.searchField);
        this.$closeButton = this.$element.find(this.options.closeButton);
        this.$suggestions = this.$element.find(this.options.suggestions);
        this.$brand = this.$element.find(this.options.brand);
        this.$searchField.on('keyup', function (e) {
            _this.$suggestions && _this.$suggestions.html($(this).val());
        });
        this.$searchField.on('keyup', function (e) {
            _this.options.onKeyEnter && _this.options.onKeyEnter(_this.$searchField.val());
            if (e.keyCode == 13) {
                e.preventDefault();
                _this.options.onSearchSubmit && _this.options.onSearchSubmit(_this.$searchField.val());
            }
            if ($('body').hasClass('overlay-disabled')) {
                return 0;
            }
        });
        this.$closeButton.on('click', function () {
            _this.toggleOverlay('hide');
        });
        this.$element.on('click', function (e) {
            if ($(e.target).data('pages') == 'search') {
                _this.toggleOverlay('hide');
            }
        });
        $(document).on('keypress.pg.search', function (e) {
            _this.keypress(e);
        });
        $(document).on('keyup', function (e) {
            if (_this.$element.is(':visible') && e.keyCode == 27) {
                _this.toggleOverlay('hide');
            }
        });
    }
    Search.prototype.keypress = function (e) {
        e = e || event;
        var nodeName = e.target.nodeName;
        if ($('body').hasClass('overlay-disabled') || $(e.target).hasClass('js-input') || nodeName == 'INPUT' || nodeName == 'TEXTAREA') {
            return;
        }
        if (e.which !== 0 && e.charCode !== 0 && !e.ctrlKey && !e.metaKey && !e.altKey && e.keyCode != 27) {
            this.toggleOverlay('show', String.fromCharCode(e.keyCode | e.charCode));
        }
    }
    Search.prototype.toggleOverlay = function (action, key) {
        var _this = this;
        if (action == 'show') {
            this.$element.removeClass("hide");
            this.$element.fadeIn("fast");
            if (!this.$searchField.is(':focus')) {
                this.$searchField.val(key);
                setTimeout(function () {
                    this.$searchField.focus();
                    var tmpStr = this.$searchField.val();
                    this.$searchField.val('');
                    this.$searchField.val(tmpStr);
                }
                    .bind(this), 10);
            }
            this.$element.removeClass("closed");
            this.$brand.toggleClass('invisible');
            $(document).off('keypress.pg.search');
        } else {
            this.$element.fadeOut("fast").addClass("closed");
            this.$searchField.val('').blur();
            setTimeout(function () {
                if ((this.$element).is(':visible')) {
                    this.$brand.toggleClass('invisible');
                }
                $(document).on('keypress.pg.search', function (e) {
                    _this.keypress(e);
                });
            }
                .bind(this), 10);
        }
    }
        ;
    function Plugin(option) {
        return this.each(function () {
            var $this = $(this);
            var data = $this.data('pg.search');
            var options = typeof option == 'object' && option;
            if (!data) {
                $this.data('pg.search', (data = new Search(this, options)));
            }
            if (typeof option == 'string')
                data[option]();
        })
    }
    var old = $.fn.search
    $.fn.search = Plugin
    $.fn.search.Constructor = Search
    $.fn.search.defaults = {
        searchField: '[data-search="searchField"]',
        closeButton: '[data-search="closeButton"]',
        suggestions: '[data-search="suggestions"]',
        brand: '[data-search="brand"]'
    }
    $.fn.search.noConflict = function () {
        $.fn.search = old;
        return this;
    }
    $(document).on('click.pg.search.data-api', '[data-toggle="search"]', function (e) {
        var $this = $(this);
        var $target = $('[data-pages="search"]');
        if ($this.is('a'))
            e.preventDefault();
        $target.data('pg.search').toggleOverlay('show');
    })
}
)(window.jQuery);
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory() : typeof define === 'function' && define.amd ? define(factory) : (factory());
}(this, (function () {
    'use strict';
    function init() {
        var hadKeyboardEvent = true;
        var hadFocusVisibleRecently = false;
        var hadFocusVisibleRecentlyTimeout = null;
        var inputTypesWhitelist = {
            text: true,
            search: true,
            url: true,
            tel: true,
            email: true,
            password: true,
            number: true,
            date: true,
            month: true,
            week: true,
            time: true,
            datetime: true,
            'datetime-local': true
        };
        function isValidFocusTarget(el) {
            if (el && el !== document && el.nodeName !== 'HTML' && el.nodeName !== 'BODY') {
                return true;
            }
            return false;
        }
        function focusTriggersKeyboardModality(el) {
            var type = el.type;
            var tagName = el.tagName;
            if (tagName == 'INPUT' && inputTypesWhitelist[type] && !el.readonly) {
                return true;
            }
            if (tagName == 'TEXTAREA' && !el.readonly) {
                return true;
            }
            if (el.contentEditable == 'true') {
                return true;
            }
            return false;
        }
        function addFocusVisibleClass(el) {
            if (el.classList.contains('focus-visible')) {
                return;
            }
            el.classList.add('focus-visible');
            el.setAttribute('data-focus-visible-added', '');
        }
        function removeFocusVisibleClass(el) {
            if (!el.hasAttribute('data-focus-visible-added')) {
                return;
            }
            el.classList.remove('focus-visible');
            el.removeAttribute('data-focus-visible-added');
        }
        function onKeyDown(e) {
            if (isValidFocusTarget(document.activeElement)) {
                addFocusVisibleClass(document.activeElement);
            }
            hadKeyboardEvent = true;
        }
        function onPointerDown(e) {
            hadKeyboardEvent = false;
        }
        function onFocus(e) {
            if (!isValidFocusTarget(e.target)) {
                return;
            }
            if (hadKeyboardEvent || focusTriggersKeyboardModality(e.target)) {
                addFocusVisibleClass(e.target);
                hadKeyboardEvent = false;
            }
        }
        function onBlur(e) {
            if (!isValidFocusTarget(e.target)) {
                return;
            }
            if (e.target.classList.contains('focus-visible')) {
                hadFocusVisibleRecently = true;
                window.clearTimeout(hadFocusVisibleRecentlyTimeout);
                hadFocusVisibleRecentlyTimeout = window.setTimeout(function () {
                    hadFocusVisibleRecently = false;
                    window.clearTimeout(hadFocusVisibleRecentlyTimeout);
                }, 100);
                removeFocusVisibleClass(e.target);
            }
        }
        function onVisibilityChange(e) {
            if (document.visibilityState == 'hidden') {
                if (hadFocusVisibleRecently) {
                    hadKeyboardEvent = true;
                }
                addInitialPointerMoveListeners();
            }
        }
        function addInitialPointerMoveListeners() {
            document.addEventListener('mousemove', onInitialPointerMove);
            document.addEventListener('mousedown', onInitialPointerMove);
            document.addEventListener('mouseup', onInitialPointerMove);
            document.addEventListener('pointermove', onInitialPointerMove);
            document.addEventListener('pointerdown', onInitialPointerMove);
            document.addEventListener('pointerup', onInitialPointerMove);
            document.addEventListener('touchmove', onInitialPointerMove);
            document.addEventListener('touchstart', onInitialPointerMove);
            document.addEventListener('touchend', onInitialPointerMove);
        }
        function removeInitialPointerMoveListeners() {
            document.removeEventListener('mousemove', onInitialPointerMove);
            document.removeEventListener('mousedown', onInitialPointerMove);
            document.removeEventListener('mouseup', onInitialPointerMove);
            document.removeEventListener('pointermove', onInitialPointerMove);
            document.removeEventListener('pointerdown', onInitialPointerMove);
            document.removeEventListener('pointerup', onInitialPointerMove);
            document.removeEventListener('touchmove', onInitialPointerMove);
            document.removeEventListener('touchstart', onInitialPointerMove);
            document.removeEventListener('touchend', onInitialPointerMove);
        }
        function onInitialPointerMove(e) {
            if (e.target.nodeName.toLowerCase() === 'html') {
                return;
            }
            hadKeyboardEvent = false;
            removeInitialPointerMoveListeners();
        }
        document.addEventListener('keydown', onKeyDown, true);
        document.addEventListener('mousedown', onPointerDown, true);
        document.addEventListener('pointerdown', onPointerDown, true);
        document.addEventListener('touchstart', onPointerDown, true);
        document.addEventListener('focus', onFocus, true);
        document.addEventListener('blur', onBlur, true);
        document.addEventListener('visibilitychange', onVisibilityChange, true);
        addInitialPointerMoveListeners();
        document.body.classList.add('js-focus-visible');
    }
    function onDOMReady(callback) {
        var loaded;
        function load() {
            if (!loaded) {
                loaded = true;
                callback();
            }
        }
        if (document.readyState === 'complete') {
            callback();
        } else {
            loaded = false;
            document.addEventListener('DOMContentLoaded', load, false);
            window.addEventListener('load', load, false);
        }
    }
    if (typeof document !== 'undefined') {
        onDOMReady(init);
    }
}
)));
(function ($) {
    'use strict';
    (typeof angular === 'undefined') && $.Pages.init();
}
)(window.jQuery);
