function stickyNavDirective(e, t, i) {
    function n(n, s, c) {
        function o() {
            var t = Math.max(i[0].documentElement.clientHeight, i[0].body.scrollHeight, i[0].documentElement.scrollHeight, i[0].body.offsetHeight, i[0].documentElement.offsetHeight);
            return f + r  >= t ? void s.removeClass(d) : void(!s.hasClass(d) && e.pageYOffset > f + r * (g ? 0 : 1) ? s.addClass(d) : s.hasClass(d) && e.pageYOffset <= f + r * (g ? 0 : 1) && s.removeClass(d))
        }

        function a(i) {
            isNaN(+i) && (i = c.maxTries || 0), i >= 0 && t(function() {
                var t = s[0].getBoundingClientRect().top + e.pageYOffset,
                    n = s[0].clientHeight;
                t > 0 || n > 0 ? (f = t, r = n) : a(i - 1)
            }, c.msRetryDelay || 100)
        }
        var l = angular.element(e),
            r = 0,
            f = 0,
            u = "ng-sticky-fixed",
            d = c.stickyNav || u,
            g = "undefined" != typeof c.ignoreElementSize;
        ! function() {
            a(), n.$watch(function() {
                return s[0].getBoundingClientRect().top + e.pageYOffset
            }, function(e, t) {
                e === t || s.hasClass(d) || (f = e)
            }), n.$watch(function() {
                return s[0].clientHeight
            }, function(e, t) {
                e === t || s.hasClass(d) || (r = e)
            }), l.bind("resize", function() {
                s.removeClass(d), f = s[0].getBoundingClientRect().top + e.pageYOffset, o()
            }), l.bind("scroll", o)
        }()
    }
    return {
        scope: {},
        restrict: "A",
        link: n
    }
}
angular.module("dm.stickyNav", []).directive("stickyNav", stickyNavDirective), stickyNavDirective.$inject = ["$window", "$timeout", "$document"];