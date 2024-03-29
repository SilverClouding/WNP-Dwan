(function(t) {
    var K;
    (function(d, f) {
        "function" === typeof define && define.amd ? define(function() {
            return f(d)
        }) : f(d)
    }
    )(this, function(d) {
        K = function() {
            function f(a) {
                return null == a ? String(a) : r[M.call(a)] || "object"
            }
            function g(a) {
                return "function" == f(a)
            }
            function h(a) {
                return null != a && a == a.window
            }
            function y(a) {
                return "object" == f(a)
            }
            function n(a) {
                return y(a) && !h(a) && Object.getPrototypeOf(a) == Object.prototype
            }
            function p(a) {
                var e = !!a && "length"in a && a.length
                  , b = m.type(a);
                return "function" != b && !h(a) && ("array" == b || 0 === e || "number" == typeof e && 0 < e && e - 1 in a)
            }
            function R(a) {
                return v.call(a, function(a) {
                    return null != a
                })
            }
            function S(a) {
                return a.replace(/::/g, "/").replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2").replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/_/g, "-").toLowerCase()
            }
            function A(a) {
                return a in U ? U[a] : U[a] = new RegExp("(^|\\s)" + a + "(\\s|$)")
            }
            function t(a, e) {
                return "number" != typeof e || X[S(a)] ? e : e + "px"
            }
            function H(a) {
                return "children"in a ? k.call(a.children) : m.map(a.childNodes, function(a) {
                    if (1 == a.nodeType)
                        return a
                })
            }
            function N(a, e) {
                var b, l = a ? a.length : 0;
                for (b = 0; b < l; b++)
                    this[b] = a[b];
                this.length = l;
                this.selector = e || ""
            }
            function O(a, e, b) {
                for (z in e)
                    b && (n(e[z]) || Y(e[z])) ? (n(e[z]) && !n(a[z]) && (a[z] = {}),
                    Y(e[z]) && !Y(a[z]) && (a[z] = []),
                    O(a[z], e[z], b)) : e[z] !== w && (a[z] = e[z])
            }
            function I(a, e) {
                return null == e ? m(a) : m(a).filter(e)
            }
            function E(a, e, b, l) {
                return g(e) ? e.call(a, b, l) : e
            }
            function F(a, e) {
                var b = a.className || ""
                  , l = b && b.baseVal !== w;
                if (e === w)
                    return l ? b.baseVal : b;
                l ? b.baseVal = e : a.className = e
            }
            function c(a) {
                try {
                    return a ? "true" == a || ("false" == a ? !1 : "null" == a ? null : +a + "" == a ? +a : /^[\[\{]/.test(a) ? m.parseJSON(a) : a) : a
                } catch (ka) {
                    return a
                }
            }
            function J(a, e) {
                e(a);
                for (var b = 0, l = a.childNodes.length; b < l; b++)
                    J(a.childNodes[b], e)
            }
            var w, z, L, D = [], C = D.concat, v = D.filter, k = D.slice, u = d.document, G = {}, U = {}, X = {
                "column-count": 1,
                columns: 1,
                "font-weight": 1,
                "line-height": 1,
                opacity: 1,
                "z-index": 1,
                zoom: 1
            }, V = /^\s*<(\w+|!)[^>]*>/, x = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, aa = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig, W = /^(?:body|html)$/i, ba = /([A-Z])/g, Z = "val css html text data width height offset".split(" "), Q = u.createElement("table"), b = u.createElement("tr"), a = {
                tr: u.createElement("tbody"),
                tbody: Q,
                thead: Q,
                tfoot: Q,
                td: b,
                th: b,
                "*": u.createElement("div")
            }, e = /complete|loaded|interactive/, l = /^[\w-]*$/, r = {}, M = r.toString, B = {}, ca = u.createElement("div"), ja = {
                tabindex: "tabIndex",
                readonly: "readOnly",
                "for": "htmlFor",
                "class": "className",
                maxlength: "maxLength",
                cellspacing: "cellSpacing",
                cellpadding: "cellPadding",
                rowspan: "rowSpan",
                colspan: "colSpan",
                usemap: "useMap",
                frameborder: "frameBorder",
                contenteditable: "contentEditable"
            }, Y = Array.isArray || function(a) {
                return a instanceof Array
            }
            ;
            B.matches = function(a, e) {
                if (!e || !a || 1 !== a.nodeType)
                    return !1;
                var b = a.matches || a.webkitMatchesSelector || a.mozMatchesSelector || a.oMatchesSelector || a.matchesSelector;
                if (b)
                    return b.call(a, e);
                var l = a.parentNode;
                (b = !l) && (l = ca).appendChild(a);
                e = ~B.qsa(l, e).indexOf(a);
                b && ca.removeChild(a);
                return e
            }
            ;
            var fa = function(a) {
                return a.replace(/-+(.)?/g, function(a, e) {
                    return e ? e.toUpperCase() : ""
                })
            };
            var ha = function(a) {
                return v.call(a, function(e, b) {
                    return a.indexOf(e) == b
                })
            };
            B.fragment = function(e, b, l) {
                var r;
                x.test(e) && (r = m(u.createElement(RegExp.$1)));
                if (!r) {
                    e.replace && (e = e.replace(aa, "<$1></$2>"));
                    b === w && (b = V.test(e) && RegExp.$1);
                    b in a || (b = "*");
                    var c = a[b];
                    c.innerHTML = "" + e;
                    r = m.each(k.call(c.childNodes), function() {
                        c.removeChild(this)
                    })
                }
                if (n(l)) {
                    var ia = m(r);
                    m.each(l, function(a, e) {
                        if (-1 < Z.indexOf(a))
                            ia[a](e);
                        else
                            ia.attr(a, e)
                    })
                }
                return r
            }
            ;
            B.Z = function(a, e) {
                return new N(a,e)
            }
            ;
            B.isZ = function(a) {
                return a instanceof B.Z
            }
            ;
            B.init = function(a, e) {
                if (a)
                    if ("string" == typeof a)
                        if (a = a.trim(),
                        "<" == a[0] && V.test(a))
                            e = B.fragment(a, RegExp.$1, e),
                            a = null;
                        else {
                            if (e !== w)
                                return m(e).find(a);
                            e = B.qsa(u, a)
                        }
                    else {
                        if (g(a))
                            return m(u).ready(a);
                        if (B.isZ(a))
                            return a;
                        if (Y(a))
                            e = R(a);
                        else if (y(a))
                            e = [a],
                            a = null;
                        else if (V.test(a))
                            e = B.fragment(a.trim(), RegExp.$1, e),
                            a = null;
                        else {
                            if (e !== w)
                                return m(e).find(a);
                            e = B.qsa(u, a)
                        }
                    }
                else
                    return B.Z();
                return B.Z(e, a)
            }
            ;
            var m = function(a, e) {
                return B.init(a, e)
            };
            m.extend = function(a) {
                var e = k.call(arguments, 1);
                if ("boolean" == typeof a) {
                    var b = a;
                    a = e.shift()
                }
                e.forEach(function(e) {
                    O(a, e, b)
                });
                return a
            }
            ;
            B.qsa = function(a, e) {
                var b, r = "#" == e[0], c = !r && "." == e[0], M = r || c ? e.slice(1) : e, f = l.test(M);
                return a.getElementById && f && r ? (b = a.getElementById(M)) ? [b] : [] : 1 !== a.nodeType && 9 !== a.nodeType && 11 !== a.nodeType ? [] : k.call(f && !r && a.getElementsByClassName ? c ? a.getElementsByClassName(M) : a.getElementsByTagName(e) : a.querySelectorAll(e))
            }
            ;
            m.contains = u.documentElement.contains ? function(a, e) {
                return a !== e && a.contains(e)
            }
            : function(a, e) {
                for (; e && (e = e.parentNode); )
                    if (e === a)
                        return !0;
                return !1
            }
            ;
            m.type = f;
            m.isFunction = g;
            m.isWindow = h;
            m.isArray = Y;
            m.isPlainObject = n;
            m.isEmptyObject = function(a) {
                for (var e in a)
                    return !1;
                return !0
            }
            ;
            m.isNumeric = function(a) {
                var e = Number(a)
                  , b = typeof a;
                return null != a && "boolean" != b && ("string" != b || a.length) && !isNaN(e) && isFinite(e) || !1
            }
            ;
            m.inArray = function(a, e, b) {
                return D.indexOf.call(e, a, b)
            }
            ;
            m.camelCase = fa;
            m.trim = function(a) {
                return null == a ? "" : String.prototype.trim.call(a)
            }
            ;
            m.uuid = 0;
            m.support = {};
            m.expr = {};
            m.noop = function() {}
            ;
            m.map = function(a, e) {
                var b = [], l;
                if (p(a))
                    for (l = 0; l < a.length; l++) {
                        var r = e(a[l], l);
                        null != r && b.push(r)
                    }
                else
                    for (l in a)
                        r = e(a[l], l),
                        null != r && b.push(r);
                return 0 < b.length ? m.fn.concat.apply([], b) : b
            }
            ;
            m.each = function(a, e) {
                var b;
                if (p(a))
                    for (b = 0; b < a.length && !1 !== e.call(a[b], b, a[b]); b++)
                        ;
                else
                    for (b in a)
                        if (!1 === e.call(a[b], b, a[b]))
                            break;
                return a
            }
            ;
            m.grep = function(a, e) {
                return v.call(a, e)
            }
            ;
            d.JSON && (m.parseJSON = JSON.parse);
            m.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(a, e) {
                r["[object " + e + "]"] = e.toLowerCase()
            });
            m.fn = {
                constructor: B.Z,
                length: 0,
                forEach: D.forEach,
                reduce: D.reduce,
                push: D.push,
                sort: D.sort,
                splice: D.splice,
                indexOf: D.indexOf,
                concat: function() {
                    var a, e = [];
                    for (a = 0; a < arguments.length; a++) {
                        var b = arguments[a];
                        e[a] = B.isZ(b) ? b.toArray() : b
                    }
                    return C.apply(B.isZ(this) ? this.toArray() : this, e)
                },
                map: function(a) {
                    return m(m.map(this, function(e, b) {
                        return a.call(e, b, e)
                    }))
                },
                slice: function() {
                    return m(k.apply(this, arguments))
                },
                ready: function(a) {
                    e.test(u.readyState) && u.body ? a(m) : u.addEventListener("DOMContentLoaded", function() {
                        a(m)
                    }, !1);
                    return this
                },
                get: function(a) {
                    return a === w ? k.call(this) : this[0 <= a ? a : a + this.length]
                },
                toArray: function() {
                    return this.get()
                },
                size: function() {
                    return this.length
                },
                remove: function() {
                    return this.each(function() {
                        null != this.parentNode && this.parentNode.removeChild(this)
                    })
                },
                each: function(a) {
                    D.every.call(this, function(e, b) {
                        return !1 !== a.call(e, b, e)
                    });
                    return this
                },
                filter: function(a) {
                    return g(a) ? this.not(this.not(a)) : m(v.call(this, function(e) {
                        return B.matches(e, a)
                    }))
                },
                add: function(a, e) {
                    return m(ha(this.concat(m(a, e))))
                },
                is: function(a) {
                    return 0 < this.length && B.matches(this[0], a)
                },
                not: function(a) {
                    var e = [];
                    if (g(a) && a.call !== w)
                        this.each(function(b) {
                            a.call(this, b) || e.push(this)
                        });
                    else {
                        var b = "string" == typeof a ? this.filter(a) : p(a) && g(a.item) ? k.call(a) : m(a);
                        this.forEach(function(a) {
                            0 > b.indexOf(a) && e.push(a)
                        })
                    }
                    return m(e)
                },
                has: function(a) {
                    return this.filter(function() {
                        return y(a) ? m.contains(this, a) : m(this).find(a).size()
                    })
                },
                eq: function(a) {
                    return -1 === a ? this.slice(a) : this.slice(a, +a + 1)
                },
                first: function() {
                    var a = this[0];
                    return a && !y(a) ? a : m(a)
                },
                last: function() {
                    var a = this[this.length - 1];
                    return a && !y(a) ? a : m(a)
                },
                find: function(a) {
                    var e = this;
                    return a ? "object" == typeof a ? m(a).filter(function() {
                        var a = this;
                        return D.some.call(e, function(e) {
                            return m.contains(e, a)
                        })
                    }) : 1 == this.length ? m(B.qsa(this[0], a)) : this.map(function() {
                        return B.qsa(this, a)
                    }) : m()
                },
                closest: function(a, e) {
                    var b = []
                      , l = "object" == typeof a && m(a);
                    this.each(function(r, c) {
                        for (; c && !(l ? 0 <= l.indexOf(c) : B.matches(c, a)); )
                            c = c !== e && !(null != c && c.nodeType == c.DOCUMENT_NODE) && c.parentNode;
                        c && 0 > b.indexOf(c) && b.push(c)
                    });
                    return m(b)
                },
                parents: function(a) {
                    for (var e = [], b = this; 0 < b.length; )
                        b = m.map(b, function(a) {
                            if ((a = a.parentNode) && (null == a || a.nodeType != a.DOCUMENT_NODE) && 0 > e.indexOf(a))
                                return e.push(a),
                                a
                        });
                    return I(e, a)
                },
                parent: function(a) {
                    return I(ha(this.pluck("parentNode")), a)
                },
                children: function(a) {
                    return I(this.map(function() {
                        return H(this)
                    }), a)
                },
                contents: function() {
                    return this.map(function() {
                        return this.contentDocument || k.call(this.childNodes)
                    })
                },
                siblings: function(a) {
                    return I(this.map(function(a, e) {
                        return v.call(H(e.parentNode), function(a) {
                            return a !== e
                        })
                    }), a)
                },
                empty: function() {
                    return this.each(function() {
                        this.innerHTML = ""
                    })
                },
                pluck: function(a) {
                    return m.map(this, function(e) {
                        return e[a]
                    })
                },
                show: function() {
                    return this.each(function() {
                        "none" == this.style.display && (this.style.display = "");
                        if ("none" == getComputedStyle(this, "").getPropertyValue("display")) {
                            var a = this.style
                              , e = this.nodeName;
                            if (!G[e]) {
                                var b = u.createElement(e);
                                u.body.appendChild(b);
                                var l = getComputedStyle(b, "").getPropertyValue("display");
                                b.parentNode.removeChild(b);
                                "none" == l && (l = "block");
                                G[e] = l
                            }
                            a.display = G[e]
                        }
                    })
                },
                replaceWith: function(a) {
                    return this.before(a).remove()
                },
                wrap: function(a) {
                    var e = g(a);
                    if (this[0] && !e)
                        var b = m(a).get(0)
                          , l = b.parentNode || 1 < this.length;
                    return this.each(function(r) {
                        m(this).wrapAll(e ? a.call(this, r) : l ? b.cloneNode(!0) : b)
                    })
                },
                wrapAll: function(a) {
                    if (this[0]) {
                        m(this[0]).before(a = m(a));
                        for (var e; (e = a.children()).length; )
                            a = e.first();
                        m(a).append(this)
                    }
                    return this
                },
                wrapInner: function(a) {
                    var e = g(a);
                    return this.each(function(b) {
                        var l = m(this)
                          , r = l.contents();
                        b = e ? a.call(this, b) : a;
                        r.length ? r.wrapAll(b) : l.append(b)
                    })
                },
                unwrap: function() {
                    this.parent().each(function() {
                        m(this).replaceWith(m(this).children())
                    });
                    return this
                },
                clone: function() {
                    return this.map(function() {
                        return this.cloneNode(!0)
                    })
                },
                hide: function() {
                    return this.css("display", "none")
                },
                toggle: function(a) {
                    return this.each(function() {
                        var e = m(this);
                        (a === w ? "none" == e.css("display") : a) ? e.show() : e.hide()
                    })
                },
                prev: function(a) {
                    return m(this.pluck("previousElementSibling")).filter(a || "*")
                },
                next: function(a) {
                    return m(this.pluck("nextElementSibling")).filter(a || "*")
                },
                html: function(a) {
                    return 0 in arguments ? this.each(function(e) {
                        var b = this.innerHTML;
                        m(this).empty().append(E(this, a, e, b))
                    }) : 0 in this ? this[0].innerHTML : null
                },
                text: function(a) {
                    return 0 in arguments ? this.each(function(e) {
                        e = E(this, a, e, this.textContent);
                        this.textContent = null == e ? "" : "" + e
                    }) : 0 in this ? this.pluck("textContent").join("") : null
                },
                attr: function(a, e) {
                    var b;
                    return "string" != typeof a || 1 in arguments ? this.each(function(b) {
                        if (1 === this.nodeType)
                            if (y(a))
                                for (z in a) {
                                    var l = z;
                                    b = a[z];
                                    null == b ? this.removeAttribute(l) : this.setAttribute(l, b)
                                }
                            else
                                l = a,
                                b = E(this, e, b, this.getAttribute(a)),
                                null == b ? this.removeAttribute(l) : this.setAttribute(l, b)
                    }) : 0 in this && 1 == this[0].nodeType && null != (b = this[0].getAttribute(a)) ? b : w
                },
                removeAttr: function(a) {
                    return this.each(function() {
                        1 === this.nodeType && a.split(" ").forEach(function(a) {
                            this.removeAttribute(a)
                        }, this)
                    })
                },
                prop: function(a, e) {
                    a = ja[a] || a;
                    return 1 in arguments ? this.each(function(b) {
                        this[a] = E(this, e, b, this[a])
                    }) : this[0] && this[0][a]
                },
                removeProp: function(a) {
                    a = ja[a] || a;
                    return this.each(function() {
                        delete this[a]
                    })
                },
                data: function(a, e) {
                    var b = "data-" + a.replace(ba, "-$1").toLowerCase();
                    b = 1 in arguments ? this.attr(b, e) : this.attr(b);
                    return null !== b ? c(b) : w
                },
                val: function(a) {
                    return 0 in arguments ? (null == a && (a = ""),
                    this.each(function(e) {
                        this.value = E(this, a, e, this.value)
                    })) : this[0] && (this[0].multiple ? m(this[0]).find("option").filter(function() {
                        return this.selected
                    }).pluck("value") : this[0].value)
                },
                offset: function(a) {
                    if (a)
                        return this.each(function(e) {
                            var b = m(this);
                            e = E(this, a, e, b.offset());
                            var l = b.offsetParent().offset();
                            e = {
                                top: e.top - l.top,
                                left: e.left - l.left
                            };
                            "static" == b.css("position") && (e.position = "relative");
                            b.css(e)
                        });
                    if (!this.length)
                        return null;
                    if (u.documentElement !== this[0] && !m.contains(u.documentElement, this[0]))
                        return {
                            top: 0,
                            left: 0
                        };
                    var e = this[0].getBoundingClientRect();
                    return {
                        left: e.left + d.pageXOffset,
                        top: e.top + d.pageYOffset,
                        width: Math.round(e.width),
                        height: Math.round(e.height)
                    }
                },
                css: function(a, e) {
                    if (2 > arguments.length) {
                        var b = this[0];
                        if ("string" == typeof a)
                            return b ? b.style[fa(a)] || getComputedStyle(b, "").getPropertyValue(a) : void 0;
                        if (Y(a)) {
                            if (!b)
                                return;
                            var l = {}
                              , r = getComputedStyle(b, "");
                            m.each(a, function(a, e) {
                                l[e] = b.style[fa(e)] || r.getPropertyValue(e)
                            });
                            return l
                        }
                    }
                    var c = "";
                    if ("string" == f(a))
                        e || 0 === e ? c = S(a) + ":" + t(a, e) : this.each(function() {
                            this.style.removeProperty(S(a))
                        });
                    else
                        for (z in a)
                            a[z] || 0 === a[z] ? c += S(z) + ":" + t(z, a[z]) + ";" : this.each(function() {
                                this.style.removeProperty(S(z))
                            });
                    return this.each(function() {
                        this.style.cssText += ";" + c
                    })
                },
                index: function(a) {
                    return a ? this.indexOf(m(a)[0]) : this.parent().children().indexOf(this[0])
                },
                hasClass: function(a) {
                    return a ? D.some.call(this, function(a) {
                        return this.test(F(a))
                    }, A(a)) : !1
                },
                addClass: function(a) {
                    return a ? this.each(function(e) {
                        if ("className"in this) {
                            L = [];
                            var b = F(this);
                            E(this, a, e, b).split(/\s+/g).forEach(function(a) {
                                m(this).hasClass(a) || L.push(a)
                            }, this);
                            L.length && F(this, b + (b ? " " : "") + L.join(" "))
                        }
                    }) : this
                },
                removeClass: function(a) {
                    return this.each(function(e) {
                        if ("className"in this) {
                            if (a === w)
                                return F(this, "");
                            L = F(this);
                            E(this, a, e, L).split(/\s+/g).forEach(function(a) {
                                L = L.replace(A(a), " ")
                            });
                            F(this, L.trim())
                        }
                    })
                },
                toggleClass: function(a, e) {
                    return a ? this.each(function(b) {
                        var l = m(this);
                        E(this, a, b, F(this)).split(/\s+/g).forEach(function(a) {
                            (e === w ? !l.hasClass(a) : e) ? l.addClass(a) : l.removeClass(a)
                        })
                    }) : this
                },
                scrollTop: function(a) {
                    if (this.length) {
                        var e = "scrollTop"in this[0];
                        return a === w ? e ? this[0].scrollTop : this[0].pageYOffset : this.each(e ? function() {
                            this.scrollTop = a
                        }
                        : function() {
                            this.scrollTo(this.scrollX, a)
                        }
                        )
                    }
                },
                scrollLeft: function(a) {
                    if (this.length) {
                        var e = "scrollLeft"in this[0];
                        return a === w ? e ? this[0].scrollLeft : this[0].pageXOffset : this.each(e ? function() {
                            this.scrollLeft = a
                        }
                        : function() {
                            this.scrollTo(a, this.scrollY)
                        }
                        )
                    }
                },
                position: function() {
                    if (this.length) {
                        var a = this[0]
                          , e = this.offsetParent()
                          , b = this.offset()
                          , l = W.test(e[0].nodeName) ? {
                            top: 0,
                            left: 0
                        } : e.offset();
                        b.top -= parseFloat(m(a).css("margin-top")) || 0;
                        b.left -= parseFloat(m(a).css("margin-left")) || 0;
                        l.top += parseFloat(m(e[0]).css("border-top-width")) || 0;
                        l.left += parseFloat(m(e[0]).css("border-left-width")) || 0;
                        return {
                            top: b.top - l.top,
                            left: b.left - l.left
                        }
                    }
                },
                offsetParent: function() {
                    return this.map(function() {
                        for (var a = this.offsetParent || u.body; a && !W.test(a.nodeName) && "static" == m(a).css("position"); )
                            a = a.offsetParent;
                        return a
                    })
                }
            };
            m.fn.detach = m.fn.remove;
            ["width", "height"].forEach(function(a) {
                var e = a.replace(/./, function(a) {
                    return a[0].toUpperCase()
                });
                m.fn[a] = function(b) {
                    var l, r = this[0];
                    return b === w ? h(r) ? r["inner" + e] : null != r && r.nodeType == r.DOCUMENT_NODE ? r.documentElement["scroll" + e] : (l = this.offset()) && l[a] : this.each(function(e) {
                        r = m(this);
                        r.css(a, E(this, b, e, r[a]()))
                    })
                }
            });
            ["after", "prepend", "before", "append"].forEach(function(a, e) {
                var b = e % 2;
                m.fn[a] = function() {
                    var a, l = m.map(arguments, function(e) {
                        var b = [];
                        a = f(e);
                        return "array" == a ? (e.forEach(function(a) {
                            if (a.nodeType !== w)
                                return b.push(a);
                            if (m.zepto.isZ(a))
                                return b = b.concat(a.get());
                            b = b.concat(B.fragment(a))
                        }),
                        b) : "object" == a || null == e ? e : B.fragment(e)
                    }), r, c = 1 < this.length;
                    return 1 > l.length ? this : this.each(function(a, M) {
                        r = b ? M : M.parentNode;
                        M = 0 == e ? M.nextSibling : 1 == e ? M.firstChild : 2 == e ? M : null;
                        var f = m.contains(u.documentElement, r);
                        l.forEach(function(a) {
                            if (c)
                                a = a.cloneNode(!0);
                            else if (!r)
                                return m(a).remove();
                            r.insertBefore(a, M);
                            f && J(a, function(a) {
                                if (!(null == a.nodeName || "SCRIPT" !== a.nodeName.toUpperCase() || a.type && "text/javascript" !== a.type || a.src)) {
                                    var e = a.ownerDocument ? a.ownerDocument.defaultView : d;
                                    e.eval.call(e, a.innerHTML)
                                }
                            })
                        })
                    })
                }
                ;
                m.fn[b ? a + "To" : "insert" + (e ? "Before" : "After")] = function(e) {
                    m(e)[a](this);
                    return this
                }
            });
            B.Z.prototype = N.prototype = m.fn;
            B.uniq = ha;
            B.deserializeValue = c;
            m.zepto = B;
            return m
        }();
        (function(f) {
            function g(c) {
                return c._zid || (c._zid = t++)
            }
            function h(c, f, d, h) {
                f = n(f);
                if (f.ns)
                    var v = new RegExp("(?:^| )" + f.ns.replace(" ", " .* ?") + "(?: |$)");
                return (E[g(c)] || []).filter(function(c) {
                    return c && (!f.e || c.e == f.e) && (!f.ns || v.test(c.ns)) && (!d || g(c.fn) === g(d)) && (!h || c.sel == h)
                })
            }
            function n(c) {
                c = ("" + c).split(".");
                return {
                    e: c[0],
                    ns: c.slice(1).sort().join(" ")
                }
            }
            function p(f) {
                return w[f] || c && J[f] || f
            }
            function T(d, k, h, G, q, y, z) {
                var v = g(d)
                  , u = E[v] || (E[v] = []);
                k.split(/\s/).forEach(function(g) {
                    if ("ready" == g)
                        return f(document).ready(h);
                    var k = n(g);
                    k.fn = h;
                    k.sel = q;
                    k.e in w && (h = function(c) {
                        var b = c.relatedTarget;
                        if (!b || b !== this && !f.contains(this, b))
                            return k.fn.apply(this, arguments)
                    }
                    );
                    var v = (k.del = y) || h;
                    k.proxy = function(c) {
                        c = S(c);
                        if (!c.isImmediatePropagationStopped()) {
                            c.data = G;
                            var b = v.apply(d, c._args == H ? [c] : [c].concat(c._args));
                            !1 === b && (c.preventDefault(),
                            c.stopPropagation());
                            return b
                        }
                    }
                    ;
                    k.i = u.length;
                    u.push(k);
                    "addEventListener"in d && d.addEventListener(p(k.e), k.proxy, k.del && !c && k.e in J || !!z)
                })
            }
            function R(f, d, u, G, q) {
                var k = g(f);
                (d || "").split(/\s/).forEach(function(d) {
                    h(f, d, u, G).forEach(function(d) {
                        delete E[k][d.i];
                        "removeEventListener"in f && f.removeEventListener(p(d.e), d.proxy, d.del && !c && d.e in J || !!q)
                    })
                })
            }
            function S(c, d) {
                if (d || !c.isDefaultPrevented)
                    if (d || (d = c),
                    f.each(C, function(f, g) {
                        var k = d[f];
                        c[f] = function() {
                            this[g] = z;
                            return k && k.apply(d, arguments)
                        }
                        ;
                        c[g] = L
                    }),
                    c.timeStamp || (c.timeStamp = Date.now()),
                    d.defaultPrevented !== H ? d.defaultPrevented : "returnValue"in d ? !1 === d.returnValue : d.getPreventDefault && d.getPreventDefault())
                        c.isDefaultPrevented = z;
                return c
            }
            function A(c) {
                var f, d = {
                    originalEvent: c
                };
                for (f in c)
                    D.test(f) || c[f] === H || (d[f] = c[f]);
                return S(d, c)
            }
            var t = 1, H, N = Array.prototype.slice, O = f.isFunction, I = function(c) {
                return "string" == typeof c
            }, E = {}, F = {}, c = "onfocusin"in d, J = {
                focus: "focusin",
                blur: "focusout"
            }, w = {
                mouseenter: "mouseover",
                mouseleave: "mouseout"
            };
            F.click = F.mousedown = F.mouseup = F.mousemove = "MouseEvents";
            f.event = {
                add: T,
                remove: R
            };
            f.proxy = function(c, d) {
                var k = 2 in arguments && N.call(arguments, 2);
                if (O(c)) {
                    var v = function() {
                        return c.apply(d, k ? k.concat(N.call(arguments)) : arguments)
                    };
                    v._zid = g(c);
                    return v
                }
                if (I(d))
                    return k ? (k.unshift(c[d], c),
                    f.proxy.apply(null, k)) : f.proxy(c[d], c);
                throw new TypeError("expected function");
            }
            ;
            f.fn.bind = function(c, f, d) {
                return this.on(c, f, d)
            }
            ;
            f.fn.unbind = function(c, f) {
                return this.off(c, f)
            }
            ;
            f.fn.one = function(c, f, d, g) {
                return this.on(c, f, d, g, 1)
            }
            ;
            var z = function() {
                return !0
            }
              , L = function() {
                return !1
            }
              , D = /^([A-Z]|returnValue$|layer[XY]$|webkitMovement[XY]$)/
              , C = {
                preventDefault: "isDefaultPrevented",
                stopImmediatePropagation: "isImmediatePropagationStopped",
                stopPropagation: "isPropagationStopped"
            };
            f.fn.delegate = function(c, f, d) {
                return this.on(f, c, d)
            }
            ;
            f.fn.undelegate = function(c, f, d) {
                return this.off(f, c, d)
            }
            ;
            f.fn.live = function(c, d) {
                f(document.body).delegate(this.selector, c, d);
                return this
            }
            ;
            f.fn.die = function(c, d) {
                f(document.body).undelegate(this.selector, c, d);
                return this
            }
            ;
            f.fn.on = function(c, d, g, h, q) {
                var k, v, u = this;
                if (c && !I(c))
                    return f.each(c, function(c, f) {
                        u.on(c, d, g, f, q)
                    }),
                    u;
                I(d) || O(h) || !1 === h || (h = g,
                g = d,
                d = H);
                if (h === H || !1 === g)
                    h = g,
                    g = H;
                !1 === h && (h = L);
                return u.each(function(u, G) {
                    q && (k = function(c) {
                        R(G, c.type, h);
                        return h.apply(this, arguments)
                    }
                    );
                    d && (v = function(c) {
                        var g = f(c.target).closest(d, G).get(0);
                        if (g && g !== G) {
                            var v = f.extend(A(c), {
                                currentTarget: g,
                                liveFired: G
                            });
                            return (k || h).apply(g, [v].concat(N.call(arguments, 1)))
                        }
                    }
                    );
                    T(G, c, h, g, d, v || k)
                })
            }
            ;
            f.fn.off = function(c, d, g) {
                var k = this;
                if (c && !I(c))
                    return f.each(c, function(c, f) {
                        k.off(c, d, f)
                    }),
                    k;
                I(d) || O(g) || !1 === g || (g = d,
                d = H);
                !1 === g && (g = L);
                return k.each(function() {
                    R(this, c, g, d)
                })
            }
            ;
            f.fn.trigger = function(c, d) {
                c = I(c) || f.isPlainObject(c) ? f.Event(c) : S(c);
                c._args = d;
                return this.each(function() {
                    if (c.type in J && "function" == typeof this[c.type])
                        this[c.type]();
                    else
                        "dispatchEvent"in this ? this.dispatchEvent(c) : f(this).triggerHandler(c, d)
                })
            }
            ;
            f.fn.triggerHandler = function(c, d) {
                var g, k;
                this.each(function(v, u) {
                    g = A(I(c) ? f.Event(c) : c);
                    g._args = d;
                    g.target = u;
                    f.each(h(u, c.type || c), function(c, d) {
                        k = d.proxy(g);
                        if (g.isImmediatePropagationStopped())
                            return !1
                    })
                });
                return k
            }
            ;
            "focusin focusout focus blur load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error".split(" ").forEach(function(c) {
                f.fn[c] = function(d) {
                    return 0 in arguments ? this.bind(c, d) : this.trigger(c)
                }
            });
            f.Event = function(c, d) {
                I(c) || (d = c,
                c = d.type);
                var f = document.createEvent(F[c] || "Events")
                  , g = !0;
                if (d)
                    for (var k in d)
                        "bubbles" == k ? g = !!d[k] : f[k] = d[k];
                f.initEvent(c, g, !0);
                return S(f)
            }
        }
        )(K);
        (function(f) {
            function g(c, d, g, h) {
                if (c.global)
                    return c = d || E,
                    g = f.Event(g),
                    f(c).trigger(g, h),
                    !g.isDefaultPrevented()
            }
            function h(c) {
                c.global && 0 === f.active++ && g(c, null, "ajaxStart")
            }
            function n(c, d) {
                var f = d.context;
                if (!1 === d.beforeSend.call(f, c, d) || !1 === g(d, f, "ajaxBeforeSend", [c, d]))
                    return !1;
                g(d, f, "ajaxSend", [c, d])
            }
            function p(c, d, f, h) {
                var k = f.context;
                f.success.call(k, c, "success", d);
                h && h.resolveWith(k, [c, "success", d]);
                g(f, k, "ajaxSuccess", [d, f, c]);
                R("success", d, f)
            }
            function T(c, d, f, h, q) {
                var k = h.context;
                h.error.call(k, f, d, c);
                q && q.rejectWith(k, [f, d, c]);
                g(h, k, "ajaxError", [f, h, c || d]);
                R(d, f, h)
            }
            function R(c, d, h) {
                var k = h.context;
                h.complete.call(k, d, c);
                g(h, k, "ajaxComplete", [d, h]);
                h.global && !--f.active && g(h, null, "ajaxStop")
            }
            function t() {}
            function A(c) {
                c && (c = c.split(";", 2)[0]);
                return c && ("text/html" == c ? "html" : "application/json" == c ? "json" : w.test(c) ? "script" : z.test(c) && "xml") || "text"
            }
            function C(c, d) {
                return "" == d ? c : (c + "&" + d).replace(/[&?]{1,2}/, "?")
            }
            function H(c) {
                c.processData && c.data && "string" != f.type(c.data) && (c.data = f.param(c.data, c.traditional));
                !c.data || c.type && "GET" != c.type.toUpperCase() && "jsonp" != c.dataType || (c.url = C(c.url, c.data),
                c.data = void 0)
            }
            function N(c, d, g, h) {
                f.isFunction(d) && (h = g,
                g = d,
                d = void 0);
                f.isFunction(g) || (h = g,
                g = void 0);
                return {
                    url: c,
                    data: d,
                    success: g,
                    dataType: h
                }
            }
            function O(c, d, g, h) {
                var k, q = f.isArray(d), v = f.isPlainObject(d);
                f.each(d, function(d, u) {
                    k = f.type(u);
                    h && (d = g ? h : h + "[" + (v || "object" == k || "array" == k ? d : "") + "]");
                    !h && q ? c.add(u.name, u.value) : "array" == k || !g && "object" == k ? O(c, u, g, d) : c.add(d, u)
                })
            }
            var I = +new Date, E = d.document, F, c, J = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, w = /^(?:text|application)\/javascript/i, z = /^(?:text|application)\/xml/i, L = /^\s*$/, D = E.createElement("a");
            D.href = d.location.href;
            f.active = 0;
            f.ajaxJSONP = function(c, g) {
                if (!("type"in c))
                    return f.ajax(c);
                var h = c.jsonpCallback, k = (f.isFunction(h) ? h() : h) || "Zepto" + I++, q = E.createElement("script"), v = d[k], y, x = function(c) {
                    f(q).triggerHandler("error", c || "abort")
                }, w = {
                    abort: x
                }, z;
                g && g.promise(w);
                f(q).on("load error", function(h, u) {
                    clearTimeout(z);
                    f(q).off().remove();
                    "error" != h.type && y ? p(y[0], w, c, g) : T(null, u || "error", w, c, g);
                    d[k] = v;
                    y && f.isFunction(v) && v(y[0]);
                    v = y = void 0
                });
                if (!1 === n(w, c))
                    return x("abort"),
                    w;
                d[k] = function() {
                    y = arguments
                }
                ;
                q.src = c.url.replace(/\?(.+)=\?/, "?$1=" + k);
                E.head.appendChild(q);
                0 < c.timeout && (z = setTimeout(function() {
                    x("timeout")
                }, c.timeout));
                return w
            }
            ;
            f.ajaxSettings = {
                type: "GET",
                beforeSend: t,
                success: t,
                error: t,
                complete: t,
                context: null,
                global: !0,
                xhr: function() {
                    return new d.XMLHttpRequest
                },
                accepts: {
                    script: "text/javascript, application/javascript, application/x-javascript",
                    json: "application/json",
                    xml: "application/xml, text/xml",
                    html: "text/html",
                    text: "text/plain"
                },
                crossDomain: !1,
                timeout: 0,
                processData: !0,
                cache: !0,
                dataFilter: t
            };
            f.ajax = function(g) {
                var k = f.extend({}, g || {})
                  , q = f.Deferred && f.Deferred();
                for (F in f.ajaxSettings)
                    void 0 === k[F] && (k[F] = f.ajaxSettings[F]);
                h(k);
                if (!k.crossDomain) {
                    var v = E.createElement("a");
                    v.href = k.url;
                    v.href = v.href;
                    k.crossDomain = D.protocol + "//" + D.host !== v.protocol + "//" + v.host
                }
                k.url || (k.url = d.location.toString());
                -1 < (v = k.url.indexOf("#")) && (k.url = k.url.slice(0, v));
                H(k);
                var y = k.dataType;
                (v = /\?.+=\?/.test(k.url)) && (y = "jsonp");
                !1 !== k.cache && (g && !0 === g.cache || "script" != y && "jsonp" != y) || (k.url = C(k.url, "_=" + Date.now()));
                if ("jsonp" == y)
                    return v || (k.url = C(k.url, k.jsonp ? k.jsonp + "=?" : !1 === k.jsonp ? "" : "callback=?")),
                    f.ajaxJSONP(k, q);
                g = k.accepts[y];
                var w = {};
                v = function(c, d) {
                    w[c.toLowerCase()] = [c, d]
                }
                ;
                var z = /^([\w-]+:)\/\//.test(k.url) ? RegExp.$1 : d.location.protocol, x = k.xhr(), R = x.setRequestHeader, ea;
                q && q.promise(x);
                k.crossDomain || v("X-Requested-With", "XMLHttpRequest");
                v("Accept", g || "*/*");
                if (g = k.mimeType || g)
                    -1 < g.indexOf(",") && (g = g.split(",", 2)[0]),
                    x.overrideMimeType && x.overrideMimeType(g);
                (k.contentType || !1 !== k.contentType && k.data && "GET" != k.type.toUpperCase()) && v("Content-Type", k.contentType || "application/x-www-form-urlencoded");
                if (k.headers)
                    for (c in k.headers)
                        v(c, k.headers[c]);
                x.setRequestHeader = v;
                x.onreadystatechange = function() {
                    if (4 == x.readyState) {
                        x.onreadystatechange = t;
                        clearTimeout(ea);
                        var c = !1;
                        if (200 <= x.status && 300 > x.status || 304 == x.status || 0 == x.status && "file:" == z) {
                            y = y || A(k.mimeType || x.getResponseHeader("content-type"));
                            if ("arraybuffer" == x.responseType || "blob" == x.responseType)
                                var d = x.response;
                            else {
                                d = x.responseText;
                                try {
                                    d = k.dataFilter == t ? d : k.dataFilter.call(k.context, d, y),
                                    "script" == y ? (0,
                                    eval)(d) : "xml" == y ? d = x.responseXML : "json" == y && (d = L.test(d) ? null : f.parseJSON(d))
                                } catch (Q) {
                                    c = Q
                                }
                                if (c)
                                    return T(c, "parsererror", x, k, q)
                            }
                            p(d, x, k, q)
                        } else
                            T(x.statusText || null, x.status ? "error" : "abort", x, k, q)
                    }
                }
                ;
                if (!1 === n(x, k))
                    return x.abort(),
                    T(null, "abort", x, k, q),
                    x;
                x.open(k.type, k.url, "async"in k ? k.async : !0, k.username, k.password);
                if (k.xhrFields)
                    for (c in k.xhrFields)
                        x[c] = k.xhrFields[c];
                for (c in w)
                    R.apply(x, w[c]);
                0 < k.timeout && (ea = setTimeout(function() {
                    x.onreadystatechange = t;
                    x.abort();
                    T(null, "timeout", x, k, q)
                }, k.timeout));
                x.send(k.data ? k.data : null);
                return x
            }
            ;
            f.get = function() {
                return f.ajax(N.apply(null, arguments))
            }
            ;
            f.post = function() {
                var c = N.apply(null, arguments);
                c.type = "POST";
                return f.ajax(c)
            }
            ;
            f.getJSON = function() {
                var c = N.apply(null, arguments);
                c.dataType = "json";
                return f.ajax(c)
            }
            ;
            f.fn.load = function(c, d, g) {
                if (!this.length)
                    return this;
                var h = this
                  , k = c.split(/\s/);
                c = N(c, d, g);
                var q = c.success;
                if (1 < k.length) {
                    c.url = k[0];
                    var y = k[1]
                }
                c.success = function(c) {
                    h.html(y ? f("<div>").html(c.replace(J, "")).find(y) : c);
                    q && q.apply(h, arguments)
                }
                ;
                f.ajax(c);
                return this
            }
            ;
            var K = encodeURIComponent;
            f.param = function(c, d) {
                var g = [];
                g.add = function(c, d) {
                    f.isFunction(d) && (d = d());
                    null == d && (d = "");
                    this.push(K(c) + "=" + K(d))
                }
                ;
                O(g, c, d);
                return g.join("&").replace(/%20/g, "+")
            }
        }
        )(K);
        (function(d) {
            d.fn.serializeArray = function() {
                var f, h, y = [], n = function(d) {
                    if (d.forEach)
                        return d.forEach(n);
                    y.push({
                        name: f,
                        value: d
                    })
                };
                this[0] && d.each(this[0].elements, function(g, q) {
                    h = q.type;
                    (f = q.name) && "fieldset" != q.nodeName.toLowerCase() && !q.disabled && "submit" != h && "reset" != h && "button" != h && "file" != h && ("radio" != h && "checkbox" != h || q.checked) && n(d(q).val())
                });
                return y
            }
            ;
            d.fn.serialize = function() {
                var d = [];
                this.serializeArray().forEach(function(f) {
                    d.push(encodeURIComponent(f.name) + "=" + encodeURIComponent(f.value))
                });
                return d.join("&")
            }
            ;
            d.fn.submit = function(f) {
                if (0 in arguments)
                    this.bind("submit", f);
                else if (this.length) {
                    var g = d.Event("submit");
                    this.eq(0).trigger(g);
                    g.isDefaultPrevented() || this.get(0).submit()
                }
                return this
            }
        }
        )(K);
        (function() {
            try {
                getComputedStyle(void 0)
            } catch (g) {
                var f = getComputedStyle;
                d.getComputedStyle = function(d, g) {
                    try {
                        return f(d, g)
                    } catch (ea) {
                        return null
                    }
                }
            }
        }
        )();
        return K
    });
    (function() {
        function d(a) {
            return function(e, b, d, f) {
                b = J(b, f, 4);
                var l = !k(e) && c.keys(e)
                  , r = (l || e).length
                  , g = 0 < a ? 0 : r - 1;
                3 > arguments.length && (d = e[l ? l[g] : g],
                g += a);
                for (var M = b, h = d; 0 <= g && g < r; g += a) {
                    var q = l ? l[g] : g;
                    h = M(h, e[q], q, e)
                }
                return h
            }
        }
        function f(a) {
            return function(e, b, c) {
                b = w(b, c);
                c = v(e);
                for (var l = 0 < a ? 0 : c - 1; 0 <= l && l < c; l += a)
                    if (b(e[l], l, e))
                        return l;
                return -1
            }
        }
        function g(a, e, b) {
            return function(l, d, f) {
                var r = 0
                  , g = v(l);
                if ("number" == typeof f)
                    0 < a ? r = 0 <= f ? f : Math.max(f + g, r) : g = 0 <= f ? Math.min(f + 1, g) : f + g + 1;
                else if (b && f && g)
                    return f = b(l, d),
                    l[f] === d ? f : -1;
                if (d !== d)
                    return f = e(A.call(l, r, g), c.isNaN),
                    0 <= f ? f + r : -1;
                for (f = 0 < a ? r : g - 1; 0 <= f && f < g; f += a)
                    if (l[f] === d)
                        return f;
                return -1
            }
        }
        function h(a, e) {
            var b = V.length
              , d = a.constructor;
            d = c.isFunction(d) && d.prototype || t;
            var f = "constructor";
            for (c.has(a, f) && !c.contains(e, f) && e.push(f); b--; )
                f = V[b],
                f in a && a[f] !== d[f] && !c.contains(e, f) && e.push(f)
        }
        var y = this
          , n = y._
          , p = Array.prototype
          , t = Object.prototype
          , C = p.push
          , A = p.slice
          , K = t.toString
          , H = t.hasOwnProperty
          , N = Array.isArray
          , O = Object.keys
          , I = Function.prototype.bind
          , E = Object.create
          , F = function() {}
          , c = function(a) {
            if (a instanceof c)
                return a;
            if (!(this instanceof c))
                return new c(a);
            this._wrapped = a
        };
        "undefined" !== typeof exports ? ("undefined" !== typeof module && module.exports && (exports = module.exports = c),
        exports._ = c) : y._ = c;
        c.VERSION = "1.8.3";
        var J = function(a, e, b) {
            if (void 0 === e)
                return a;
            switch (null == b ? 3 : b) {
            case 1:
                return function(b) {
                    return a.call(e, b)
                }
                ;
            case 2:
                return function(b, c) {
                    return a.call(e, b, c)
                }
                ;
            case 3:
                return function(b, c, l) {
                    return a.call(e, b, c, l)
                }
                ;
            case 4:
                return function(b, c, l, d) {
                    return a.call(e, b, c, l, d)
                }
            }
            return function() {
                return a.apply(e, arguments)
            }
        }
          , w = function(a, e, b) {
            return null == a ? c.identity : c.isFunction(a) ? J(a, e, b) : c.isObject(a) ? c.matcher(a) : c.property(a)
        };
        c.iteratee = function(a, e) {
            return w(a, e, Infinity)
        }
        ;
        var z = function(a, e) {
            return function(b) {
                var c = arguments.length;
                if (2 > c || null == b)
                    return b;
                for (var l = 1; l < c; l++)
                    for (var d = arguments[l], f = a(d), g = f.length, h = 0; h < g; h++) {
                        var k = f[h];
                        e && void 0 !== b[k] || (b[k] = d[k])
                    }
                return b
            }
        }
          , L = function(a) {
            if (!c.isObject(a))
                return {};
            if (E)
                return E(a);
            F.prototype = a;
            a = new F;
            F.prototype = null;
            return a
        }
          , D = function(a) {
            return function(e) {
                return null == e ? void 0 : e[a]
            }
        }
          , P = Math.pow(2, 53) - 1
          , v = D("length")
          , k = function(a) {
            a = v(a);
            return "number" == typeof a && 0 <= a && a <= P
        };
        c.each = c.forEach = function(a, e, b) {
            e = J(e, b);
            var l;
            if (k(a))
                for (b = 0,
                l = a.length; b < l; b++)
                    e(a[b], b, a);
            else {
                var d = c.keys(a);
                b = 0;
                for (l = d.length; b < l; b++)
                    e(a[d[b]], d[b], a)
            }
            return a
        }
        ;
        c.map = c.collect = function(a, e, b) {
            e = w(e, b);
            b = !k(a) && c.keys(a);
            for (var l = (b || a).length, d = Array(l), f = 0; f < l; f++) {
                var g = b ? b[f] : f;
                d[f] = e(a[g], g, a)
            }
            return d
        }
        ;
        c.reduce = c.foldl = c.inject = d(1);
        c.reduceRight = c.foldr = d(-1);
        c.find = c.detect = function(a, e, b) {
            e = k(a) ? c.findIndex(a, e, b) : c.findKey(a, e, b);
            if (void 0 !== e && -1 !== e)
                return a[e]
        }
        ;
        c.filter = c.select = function(a, e, b) {
            var l = [];
            e = w(e, b);
            c.each(a, function(a, b, c) {
                e(a, b, c) && l.push(a)
            });
            return l
        }
        ;
        c.reject = function(a, e, b) {
            return c.filter(a, c.negate(w(e)), b)
        }
        ;
        c.every = c.all = function(a, e, b) {
            e = w(e, b);
            b = !k(a) && c.keys(a);
            for (var l = (b || a).length, d = 0; d < l; d++) {
                var f = b ? b[d] : d;
                if (!e(a[f], f, a))
                    return !1
            }
            return !0
        }
        ;
        c.some = c.any = function(a, e, b) {
            e = w(e, b);
            b = !k(a) && c.keys(a);
            for (var l = (b || a).length, d = 0; d < l; d++) {
                var f = b ? b[d] : d;
                if (e(a[f], f, a))
                    return !0
            }
            return !1
        }
        ;
        c.contains = c.includes = c.include = function(a, e, b, d) {
            k(a) || (a = c.values(a));
            if ("number" != typeof b || d)
                b = 0;
            return 0 <= c.indexOf(a, e, b)
        }
        ;
        c.invoke = function(a, e) {
            var b = A.call(arguments, 2)
              , d = c.isFunction(e);
            return c.map(a, function(a) {
                var c = d ? e : a[e];
                return null == c ? c : c.apply(a, b)
            })
        }
        ;
        c.pluck = function(a, e) {
            return c.map(a, c.property(e))
        }
        ;
        c.where = function(a, e) {
            return c.filter(a, c.matcher(e))
        }
        ;
        c.findWhere = function(a, e) {
            return c.find(a, c.matcher(e))
        }
        ;
        c.max = function(a, e, b) {
            var d = -Infinity, l = -Infinity, f;
            if (null == e && null != a) {
                a = k(a) ? a : c.values(a);
                for (var g = 0, h = a.length; g < h; g++)
                    b = a[g],
                    b > d && (d = b)
            } else
                e = w(e, b),
                c.each(a, function(a, b, c) {
                    f = e(a, b, c);
                    if (f > l || -Infinity === f && -Infinity === d)
                        d = a,
                        l = f
                });
            return d
        }
        ;
        c.min = function(a, e, b) {
            var d = Infinity, l = Infinity, f;
            if (null == e && null != a) {
                a = k(a) ? a : c.values(a);
                for (var g = 0, h = a.length; g < h; g++)
                    b = a[g],
                    b < d && (d = b)
            } else
                e = w(e, b),
                c.each(a, function(a, b, c) {
                    f = e(a, b, c);
                    if (f < l || Infinity === f && Infinity === d)
                        d = a,
                        l = f
                });
            return d
        }
        ;
        c.shuffle = function(a) {
            a = k(a) ? a : c.values(a);
            for (var e = a.length, b = Array(e), d = 0, f; d < e; d++)
                f = c.random(0, d),
                f !== d && (b[d] = b[f]),
                b[f] = a[d];
            return b
        }
        ;
        c.sample = function(a, e, b) {
            return null == e || b ? (k(a) || (a = c.values(a)),
            a[c.random(a.length - 1)]) : c.shuffle(a).slice(0, Math.max(0, e))
        }
        ;
        c.sortBy = function(a, e, b) {
            e = w(e, b);
            return c.pluck(c.map(a, function(a, b, c) {
                return {
                    value: a,
                    index: b,
                    criteria: e(a, b, c)
                }
            }).sort(function(a, e) {
                var b = a.criteria
                  , c = e.criteria;
                if (b !== c) {
                    if (b > c || void 0 === b)
                        return 1;
                    if (b < c || void 0 === c)
                        return -1
                }
                return a.index - e.index
            }), "value")
        }
        ;
        var u = function(a) {
            return function(e, b, d) {
                var l = {};
                b = w(b, d);
                c.each(e, function(c, d) {
                    d = b(c, d, e);
                    a(l, c, d)
                });
                return l
            }
        };
        c.groupBy = u(function(a, e, b) {
            c.has(a, b) ? a[b].push(e) : a[b] = [e]
        });
        c.indexBy = u(function(a, e, b) {
            a[b] = e
        });
        c.countBy = u(function(a, e, b) {
            c.has(a, b) ? a[b]++ : a[b] = 1
        });
        c.toArray = function(a) {
            return a ? c.isArray(a) ? A.call(a) : k(a) ? c.map(a, c.identity) : c.values(a) : []
        }
        ;
        c.size = function(a) {
            return null == a ? 0 : k(a) ? a.length : c.keys(a).length
        }
        ;
        c.partition = function(a, e, b) {
            e = w(e, b);
            var d = []
              , l = [];
            c.each(a, function(a, b, c) {
                (e(a, b, c) ? d : l).push(a)
            });
            return [d, l]
        }
        ;
        c.first = c.head = c.take = function(a, e, b) {
            if (null != a)
                return null == e || b ? a[0] : c.initial(a, a.length - e)
        }
        ;
        c.initial = function(a, e, b) {
            return A.call(a, 0, Math.max(0, a.length - (null == e || b ? 1 : e)))
        }
        ;
        c.last = function(a, e, b) {
            if (null != a)
                return null == e || b ? a[a.length - 1] : c.rest(a, Math.max(0, a.length - e))
        }
        ;
        c.rest = c.tail = c.drop = function(a, e, b) {
            return A.call(a, null == e || b ? 1 : e)
        }
        ;
        c.compact = function(a) {
            return c.filter(a, c.identity)
        }
        ;
        var G = function(a, e, b, d) {
            var l = []
              , f = 0;
            d = d || 0;
            for (var g = v(a); d < g; d++) {
                var r = a[d];
                if (k(r) && (c.isArray(r) || c.isArguments(r))) {
                    e || (r = G(r, e, b));
                    var h = 0
                      , q = r.length;
                    for (l.length += q; h < q; )
                        l[f++] = r[h++]
                } else
                    b || (l[f++] = r)
            }
            return l
        };
        c.flatten = function(a, e) {
            return G(a, e, !1)
        }
        ;
        c.without = function(a) {
            return c.difference(a, A.call(arguments, 1))
        }
        ;
        c.uniq = c.unique = function(a, e, b, d) {
            c.isBoolean(e) || (d = b,
            b = e,
            e = !1);
            null != b && (b = w(b, d));
            d = [];
            for (var l = [], f = 0, g = v(a); f < g; f++) {
                var r = a[f]
                  , h = b ? b(r, f, a) : r;
                e ? (f && l === h || d.push(r),
                l = h) : b ? c.contains(l, h) || (l.push(h),
                d.push(r)) : c.contains(d, r) || d.push(r)
            }
            return d
        }
        ;
        c.union = function() {
            return c.uniq(G(arguments, !0, !0))
        }
        ;
        c.intersection = function(a) {
            for (var e = [], b = arguments.length, d = 0, f = v(a); d < f; d++) {
                var g = a[d];
                if (!c.contains(e, g)) {
                    for (var h = 1; h < b && c.contains(arguments[h], g); h++)
                        ;
                    h === b && e.push(g)
                }
            }
            return e
        }
        ;
        c.difference = function(a) {
            var e = G(arguments, !0, !0, 1);
            return c.filter(a, function(a) {
                return !c.contains(e, a)
            })
        }
        ;
        c.zip = function() {
            return c.unzip(arguments)
        }
        ;
        c.unzip = function(a) {
            for (var e = a && c.max(a, v).length || 0, b = Array(e), d = 0; d < e; d++)
                b[d] = c.pluck(a, d);
            return b
        }
        ;
        c.object = function(a, e) {
            for (var b = {}, c = 0, d = v(a); c < d; c++)
                e ? b[a[c]] = e[c] : b[a[c][0]] = a[c][1];
            return b
        }
        ;
        c.findIndex = f(1);
        c.findLastIndex = f(-1);
        c.sortedIndex = function(a, e, b, c) {
            b = w(b, c, 1);
            e = b(e);
            c = 0;
            for (var d = v(a); c < d; ) {
                var f = Math.floor((c + d) / 2);
                b(a[f]) < e ? c = f + 1 : d = f
            }
            return c
        }
        ;
        c.indexOf = g(1, c.findIndex, c.sortedIndex);
        c.lastIndexOf = g(-1, c.findLastIndex);
        c.range = function(a, e, b) {
            null == e && (e = a || 0,
            a = 0);
            b = b || 1;
            e = Math.max(Math.ceil((e - a) / b), 0);
            for (var c = Array(e), d = 0; d < e; d++,
            a += b)
                c[d] = a;
            return c
        }
        ;
        var U = function(a, e, b, d, f) {
            if (!(d instanceof e))
                return a.apply(b, f);
            e = L(a.prototype);
            a = a.apply(e, f);
            return c.isObject(a) ? a : e
        };
        c.bind = function(a, e) {
            if (I && a.bind === I)
                return I.apply(a, A.call(arguments, 1));
            if (!c.isFunction(a))
                throw new TypeError("Bind must be called on a function");
            var b = A.call(arguments, 2)
              , d = function() {
                return U(a, d, e, this, b.concat(A.call(arguments)))
            };
            return d
        }
        ;
        c.partial = function(a) {
            var e = A.call(arguments, 1)
              , b = function() {
                for (var d = 0, f = e.length, l = Array(f), g = 0; g < f; g++)
                    l[g] = e[g] === c ? arguments[d++] : e[g];
                for (; d < arguments.length; )
                    l.push(arguments[d++]);
                return U(a, b, this, this, l)
            };
            return b
        }
        ;
        c.bindAll = function(a) {
            var e, b = arguments.length;
            if (1 >= b)
                throw Error("bindAll must be passed function names");
            for (e = 1; e < b; e++) {
                var d = arguments[e];
                a[d] = c.bind(a[d], a)
            }
            return a
        }
        ;
        c.memoize = function(a, b) {
            var e = function(d) {
                var f = e.cache
                  , l = "" + (b ? b.apply(this, arguments) : d);
                c.has(f, l) || (f[l] = a.apply(this, arguments));
                return f[l]
            };
            e.cache = {};
            return e
        }
        ;
        c.delay = function(a, b) {
            var e = A.call(arguments, 2);
            return setTimeout(function() {
                return a.apply(null, e)
            }, b)
        }
        ;
        c.defer = c.partial(c.delay, c, 1);
        c.throttle = function(a, b, d) {
            var e, f, l, g = null, h = 0;
            d || (d = {});
            var k = function() {
                h = !1 === d.leading ? 0 : c.now();
                g = null;
                l = a.apply(e, f);
                g || (e = f = null)
            };
            return function() {
                var r = c.now();
                h || !1 !== d.leading || (h = r);
                var M = b - (r - h);
                e = this;
                f = arguments;
                0 >= M || M > b ? (g && (clearTimeout(g),
                g = null),
                h = r,
                l = a.apply(e, f),
                g || (e = f = null)) : g || !1 === d.trailing || (g = setTimeout(k, M));
                return l
            }
        }
        ;
        c.debounce = function(a, b, d) {
            var e, f, l, g, h, k = function() {
                var r = c.now() - g;
                r < b && 0 <= r ? e = setTimeout(k, b - r) : (e = null,
                d || (h = a.apply(l, f),
                e || (l = f = null)))
            };
            return function() {
                l = this;
                f = arguments;
                g = c.now();
                var r = d && !e;
                e || (e = setTimeout(k, b));
                r && (h = a.apply(l, f),
                l = f = null);
                return h
            }
        }
        ;
        c.wrap = function(a, b) {
            return c.partial(b, a)
        }
        ;
        c.negate = function(a) {
            return function() {
                return !a.apply(this, arguments)
            }
        }
        ;
        c.compose = function() {
            var a = arguments
              , b = a.length - 1;
            return function() {
                for (var e = b, c = a[b].apply(this, arguments); e--; )
                    c = a[e].call(this, c);
                return c
            }
        }
        ;
        c.after = function(a, b) {
            return function() {
                if (1 > --a)
                    return b.apply(this, arguments)
            }
        }
        ;
        c.before = function(a, b) {
            var e;
            return function() {
                0 < --a && (e = b.apply(this, arguments));
                1 >= a && (b = null);
                return e
            }
        }
        ;
        c.once = c.partial(c.before, 2);
        var X = !{
            toString: null
        }.propertyIsEnumerable("toString")
          , V = "valueOf isPrototypeOf toString propertyIsEnumerable hasOwnProperty toLocaleString".split(" ");
        c.keys = function(a) {
            if (!c.isObject(a))
                return [];
            if (O)
                return O(a);
            var b = [], d;
            for (d in a)
                c.has(a, d) && b.push(d);
            X && h(a, b);
            return b
        }
        ;
        c.allKeys = function(a) {
            if (!c.isObject(a))
                return [];
            var b = [], d;
            for (d in a)
                b.push(d);
            X && h(a, b);
            return b
        }
        ;
        c.values = function(a) {
            for (var b = c.keys(a), d = b.length, f = Array(d), g = 0; g < d; g++)
                f[g] = a[b[g]];
            return f
        }
        ;
        c.mapObject = function(a, b, d) {
            b = w(b, d);
            d = c.keys(a);
            for (var e = d.length, f = {}, l, g = 0; g < e; g++)
                l = d[g],
                f[l] = b(a[l], l, a);
            return f
        }
        ;
        c.pairs = function(a) {
            for (var b = c.keys(a), d = b.length, f = Array(d), g = 0; g < d; g++)
                f[g] = [b[g], a[b[g]]];
            return f
        }
        ;
        c.invert = function(a) {
            for (var b = {}, d = c.keys(a), f = 0, g = d.length; f < g; f++)
                b[a[d[f]]] = d[f];
            return b
        }
        ;
        c.functions = c.methods = function(a) {
            var b = [], d;
            for (d in a)
                c.isFunction(a[d]) && b.push(d);
            return b.sort()
        }
        ;
        c.extend = z(c.allKeys);
        c.extendOwn = c.assign = z(c.keys);
        c.findKey = function(a, b, d) {
            b = w(b, d);
            d = c.keys(a);
            for (var e, f = 0, g = d.length; f < g; f++)
                if (e = d[f],
                b(a[e], e, a))
                    return e
        }
        ;
        c.pick = function(a, b, d) {
            var e = {}
              , f = a;
            if (null == f)
                return e;
            if (c.isFunction(b)) {
                var g = c.allKeys(f);
                var l = J(b, d)
            } else
                g = G(arguments, !1, !1, 1),
                l = function(a, b, e) {
                    return b in e
                }
                ,
                f = Object(f);
            for (var h = 0, k = g.length; h < k; h++) {
                var q = g[h]
                  , y = f[q];
                l(y, q, f) && (e[q] = y)
            }
            return e
        }
        ;
        c.omit = function(a, b, d) {
            if (c.isFunction(b))
                b = c.negate(b);
            else {
                var e = c.map(G(arguments, !1, !1, 1), String);
                b = function(a, b) {
                    return !c.contains(e, b)
                }
            }
            return c.pick(a, b, d)
        }
        ;
        c.defaults = z(c.allKeys, !0);
        c.create = function(a, b) {
            a = L(a);
            b && c.extendOwn(a, b);
            return a
        }
        ;
        c.clone = function(a) {
            return c.isObject(a) ? c.isArray(a) ? a.slice() : c.extend({}, a) : a
        }
        ;
        c.tap = function(a, b) {
            b(a);
            return a
        }
        ;
        c.isMatch = function(a, b) {
            var e = c.keys(b)
              , d = e.length;
            if (null == a)
                return !d;
            a = Object(a);
            for (var f = 0; f < d; f++) {
                var g = e[f];
                if (b[g] !== a[g] || !(g in a))
                    return !1
            }
            return !0
        }
        ;
        var x = function(a, b, d, f) {
            if (a === b)
                return 0 !== a || 1 / a === 1 / b;
            if (null == a || null == b)
                return a === b;
            a instanceof c && (a = a._wrapped);
            b instanceof c && (b = b._wrapped);
            var e = K.call(a);
            if (e !== K.call(b))
                return !1;
            switch (e) {
            case "[object RegExp]":
            case "[object String]":
                return "" + a === "" + b;
            case "[object Number]":
                return +a !== +a ? +b !== +b : 0 === +a ? 1 / +a === 1 / b : +a === +b;
            case "[object Date]":
            case "[object Boolean]":
                return +a === +b
            }
            e = "[object Array]" === e;
            if (!e) {
                if ("object" != typeof a || "object" != typeof b)
                    return !1;
                var g = a.constructor
                  , l = b.constructor;
                if (g !== l && !(c.isFunction(g) && g instanceof g && c.isFunction(l) && l instanceof l) && "constructor"in a && "constructor"in b)
                    return !1
            }
            d = d || [];
            f = f || [];
            for (g = d.length; g--; )
                if (d[g] === a)
                    return f[g] === b;
            d.push(a);
            f.push(b);
            if (e) {
                g = a.length;
                if (g !== b.length)
                    return !1;
                for (; g--; )
                    if (!x(a[g], b[g], d, f))
                        return !1
            } else {
                e = c.keys(a);
                g = e.length;
                if (c.keys(b).length !== g)
                    return !1;
                for (; g--; )
                    if (l = e[g],
                    !c.has(b, l) || !x(a[l], b[l], d, f))
                        return !1
            }
            d.pop();
            f.pop();
            return !0
        };
        c.isEqual = function(a, b) {
            return x(a, b)
        }
        ;
        c.isEmpty = function(a) {
            return null == a ? !0 : k(a) && (c.isArray(a) || c.isString(a) || c.isArguments(a)) ? 0 === a.length : 0 === c.keys(a).length
        }
        ;
        c.isElement = function(a) {
            return !(!a || 1 !== a.nodeType)
        }
        ;
        c.isArray = N || function(a) {
            return "[object Array]" === K.call(a)
        }
        ;
        c.isObject = function(a) {
            var b = typeof a;
            return "function" === b || "object" === b && !!a
        }
        ;
        c.each("Arguments Function String Number Date RegExp Error".split(" "), function(a) {
            c["is" + a] = function(b) {
                return K.call(b) === "[object " + a + "]"
            }
        });
        c.isArguments(arguments) || (c.isArguments = function(a) {
            return c.has(a, "callee")
        }
        );
        "function" != typeof /./ && "object" != typeof Int8Array && (c.isFunction = function(a) {
            return "function" == typeof a || !1
        }
        );
        c.isFinite = function(a) {
            return isFinite(a) && !isNaN(parseFloat(a))
        }
        ;
        c.isNaN = function(a) {
            return c.isNumber(a) && a !== +a
        }
        ;
        c.isBoolean = function(a) {
            return !0 === a || !1 === a || "[object Boolean]" === K.call(a)
        }
        ;
        c.isNull = function(a) {
            return null === a
        }
        ;
        c.isUndefined = function(a) {
            return void 0 === a
        }
        ;
        c.has = function(a, b) {
            return null != a && H.call(a, b)
        }
        ;
        c.noConflict = function() {
            y._ = n;
            return this
        }
        ;
        c.identity = function(a) {
            return a
        }
        ;
        c.constant = function(a) {
            return function() {
                return a
            }
        }
        ;
        c.noop = function() {}
        ;
        c.property = D;
        c.propertyOf = function(a) {
            return null == a ? function() {}
            : function(b) {
                return a[b]
            }
        }
        ;
        c.matcher = c.matches = function(a) {
            a = c.extendOwn({}, a);
            return function(b) {
                return c.isMatch(b, a)
            }
        }
        ;
        c.times = function(a, b, c) {
            var e = Array(Math.max(0, a));
            b = J(b, c, 1);
            for (c = 0; c < a; c++)
                e[c] = b(c);
            return e
        }
        ;
        c.random = function(a, b) {
            null == b && (b = a,
            a = 0);
            return a + Math.floor(Math.random() * (b - a + 1))
        }
        ;
        c.now = Date.now || function() {
            return (new Date).getTime()
        }
        ;
        N = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#x27;",
            "`": "&#x60;"
        };
        z = c.invert(N);
        D = function(a) {
            var b = function(b) {
                return a[b]
            }
              , d = "(?:" + c.keys(a).join("|") + ")"
              , f = RegExp(d)
              , g = RegExp(d, "g");
            return function(a) {
                a = null == a ? "" : "" + a;
                return f.test(a) ? a.replace(g, b) : a
            }
        }
        ;
        c.escape = D(N);
        c.unescape = D(z);
        c.result = function(a, b, d) {
            b = null == a ? void 0 : a[b];
            void 0 === b && (b = d);
            return c.isFunction(b) ? b.call(a) : b
        }
        ;
        var aa = 0;
        c.uniqueId = function(a) {
            var b = ++aa + "";
            return a ? a + b : b
        }
        ;
        c.templateSettings = {
            evaluate: /<%([\s\S]+?)%>/g,
            interpolate: /<%=([\s\S]+?)%>/g,
            escape: /<%-([\s\S]+?)%>/g
        };
        var W = /(.)^/
          , ba = {
            "'": "'",
            "\\": "\\",
            "\r": "r",
            "\n": "n",
            "\u2028": "u2028",
            "\u2029": "u2029"
        }
          , Z = /\\|'|\r|\n|\u2028|\u2029/g
          , Q = function(a) {
            return "\\" + ba[a]
        };
        c.template = function(a, b, d) {
            !b && d && (b = d);
            b = c.defaults({}, b, c.templateSettings);
            d = RegExp([(b.escape || W).source, (b.interpolate || W).source, (b.evaluate || W).source].join("|") + "|$", "g");
            var e = 0
              , f = "__p+='";
            a.replace(d, function(b, c, d, g, l) {
                f += a.slice(e, l).replace(Z, Q);
                e = l + b.length;
                c ? f += "'+\n((__t=(" + c + "))==null?'':_.escape(__t))+\n'" : d ? f += "'+\n((__t=(" + d + "))==null?'':__t)+\n'" : g && (f += "';\n" + g + "\n__p+='");
                return b
            });
            f += "';\n";
            b.variable || (f = "with(obj||{}){\n" + f + "}\n");
            f = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + f + "return __p;\n";
            try {
                var g = new Function(b.variable || "obj","_",f)
            } catch (ca) {
                throw ca.source = f,
                ca;
            }
            d = function(a) {
                return g.call(this, a, c)
            }
            ;
            d.source = "function(" + (b.variable || "obj") + "){\n" + f + "}";
            return d
        }
        ;
        c.chain = function(a) {
            a = c(a);
            a._chain = !0;
            return a
        }
        ;
        var b = function(a, b) {
            return a._chain ? c(b).chain() : b
        };
        c.mixin = function(a) {
            c.each(c.functions(a), function(e) {
                var d = c[e] = a[e];
                c.prototype[e] = function() {
                    var a = [this._wrapped];
                    C.apply(a, arguments);
                    return b(this, d.apply(c, a))
                }
            })
        }
        ;
        c.mixin(c);
        c.each("pop push reverse shift sort splice unshift".split(" "), function(a) {
            var e = p[a];
            c.prototype[a] = function() {
                var c = this._wrapped;
                e.apply(c, arguments);
                "shift" !== a && "splice" !== a || 0 !== c.length || delete c[0];
                return b(this, c)
            }
        });
        c.each(["concat", "join", "slice"], function(a) {
            var e = p[a];
            c.prototype[a] = function() {
                return b(this, e.apply(this._wrapped, arguments))
            }
        });
        c.prototype.value = function() {
            return this._wrapped
        }
        ;
        c.prototype.valueOf = c.prototype.toJSON = c.prototype.value;
        c.prototype.toString = function() {
            return "" + this._wrapped
        }
        ;
        "function" === typeof define && define.amd && define("underscore", [], function() {
            return c
        })
    }
    ).call(this);
    (function(d) {
        var f = "object" == typeof self && self.self === self && self || "object" == typeof global && global.global === global && global;
        if ("function" === typeof define && define.amd)
            h.define(["underscore", "jquery", "exports"], function(g, h, q) {
                f.Backbone = d(f, q, g, h)
            });
        else if ("undefined" !== typeof exports) {
            var g = require("underscore");
            try {
                var q = require("jquery")
            } catch (y) {}
            d(f, exports, g, q)
        } else
            f.Backbone = d(f, {}, f._, K)
    }
    )(function(d, f, g, h) {
        var q = d.Backbone
          , n = Array.prototype.slice;
        f.VERSION = "1.3.3";
        f.$ = h;
        f.noConflict = function() {
            d.Backbone = q;
            return this
        }
        ;
        f.emulateHTTP = !1;
        f.emulateJSON = !1;
        var p = function(b, a, e) {
            switch (b) {
            case 1:
                return function() {
                    return g[a](this[e])
                }
                ;
            case 2:
                return function(b) {
                    return g[a](this[e], b)
                }
                ;
            case 3:
                return function(b, c) {
                    return g[a](this[e], K(b, this), c)
                }
                ;
            case 4:
                return function(b, c, d) {
                    return g[a](this[e], K(b, this), c, d)
                }
                ;
            default:
                return function() {
                    var b = n.call(arguments);
                    b.unshift(this[e]);
                    return g[a].apply(g, b)
                }
            }
        }
          , C = function(b, a, e) {
            g.each(a, function(a, c) {
                g[c] && (b.prototype[c] = p(a, c, e))
            })
        }
          , K = function(b, a) {
            return g.isFunction(b) ? b : g.isObject(b) && !a._isModel(b) ? A(b) : g.isString(b) ? function(a) {
                return a.get(b)
            }
            : b
        }
          , A = function(b) {
            var a = g.matches(b);
            return function(b) {
                return a(b.attributes)
            }
        };
        h = f.Events = {};
        var P = /\s+/
          , H = function(b, a, e, c, d) {
            var f = 0, l;
            if (e && "object" === typeof e)
                for (void 0 !== c && ("context"in d) && void 0 === d.context && (d.context = c),
                l = g.keys(e); f < l.length; f++)
                    a = H(b, a, l[f], e[l[f]], d);
            else if (e && P.test(e))
                for (l = e.split(P); f < l.length; f++)
                    a = b(a, l[f], c, d);
            else
                a = b(a, e, c, d);
            return a
        };
        h.on = function(b, a, e) {
            return N(this, b, a, e)
        }
        ;
        var N = function(b, a, e, c, d) {
            b._events = H(O, b._events || {}, a, e, {
                context: c,
                ctx: b,
                listening: d
            });
            d && ((b._listeners || (b._listeners = {}))[d.id] = d);
            return b
        };
        h.listenTo = function(b, a, e) {
            if (!b)
                return this;
            var c = b._listenId || (b._listenId = g.uniqueId("l"))
              , d = this._listeningTo || (this._listeningTo = {})
              , f = d[c];
            f || (f = this._listenId || (this._listenId = g.uniqueId("l")),
            f = d[c] = {
                obj: b,
                objId: c,
                id: f,
                listeningTo: d,
                count: 0
            });
            N(b, a, e, this, f);
            return this
        }
        ;
        var O = function(b, a, e, c) {
            if (e) {
                a = b[a] || (b[a] = []);
                var d = c.context
                  , f = c.ctx;
                (c = c.listening) && c.count++;
                a.push({
                    callback: e,
                    context: d,
                    ctx: d || f,
                    listening: c
                })
            }
            return b
        };
        h.off = function(b, a, e) {
            if (!this._events)
                return this;
            this._events = H(I, this._events, b, a, {
                context: e,
                listeners: this._listeners
            });
            return this
        }
        ;
        h.stopListening = function(b, a, e) {
            var c = this._listeningTo;
            if (!c)
                return this;
            b = b ? [b._listenId] : g.keys(c);
            for (var d = 0; d < b.length; d++) {
                var f = c[b[d]];
                if (!f)
                    break;
                f.obj.off(a, e, this)
            }
            return this
        }
        ;
        var I = function(b, a, e, c) {
            if (b) {
                var d = 0
                  , f = c.context;
                c = c.listeners;
                if (a || e || f) {
                    for (var l = a ? [a] : g.keys(b); d < l.length; d++) {
                        a = l[d];
                        var h = b[a];
                        if (!h)
                            break;
                        for (var k = [], q = 0; q < h.length; q++) {
                            var n = h[q];
                            e && e !== n.callback && e !== n.callback._callback || f && f !== n.context ? k.push(n) : (n = n.listening) && 0 === --n.count && (delete c[n.id],
                            delete n.listeningTo[n.objId])
                        }
                        k.length ? b[a] = k : delete b[a]
                    }
                    return b
                }
                for (b = g.keys(c); d < b.length; d++)
                    n = c[b[d]],
                    delete c[n.id],
                    delete n.listeningTo[n.objId]
            }
        };
        h.once = function(b, a, e) {
            var c = H(E, {}, b, a, g.bind(this.off, this));
            "string" === typeof b && null == e && (a = void 0);
            return this.on(c, a, e)
        }
        ;
        h.listenToOnce = function(b, a, e) {
            a = H(E, {}, a, e, g.bind(this.stopListening, this, b));
            return this.listenTo(b, a)
        }
        ;
        var E = function(b, a, e, c) {
            if (e) {
                var d = b[a] = g.once(function() {
                    c(a, d);
                    e.apply(this, arguments)
                });
                d._callback = e
            }
            return b
        };
        h.trigger = function(b) {
            if (!this._events)
                return this;
            for (var a = Math.max(0, arguments.length - 1), e = Array(a), c = 0; c < a; c++)
                e[c] = arguments[c + 1];
            H(F, this._events, b, void 0, e);
            return this
        }
        ;
        var F = function(b, a, e, d) {
            if (b) {
                e = b[a];
                var f = b.all;
                e && f && (f = f.slice());
                e && c(e, d);
                f && c(f, [a].concat(d))
            }
            return b
        }
          , c = function(b, a) {
            var e, c = -1, d = b.length, f = a[0], g = a[1], h = a[2];
            switch (a.length) {
            case 0:
                for (; ++c < d; )
                    (e = b[c]).callback.call(e.ctx);
                break;
            case 1:
                for (; ++c < d; )
                    (e = b[c]).callback.call(e.ctx, f);
                break;
            case 2:
                for (; ++c < d; )
                    (e = b[c]).callback.call(e.ctx, f, g);
                break;
            case 3:
                for (; ++c < d; )
                    (e = b[c]).callback.call(e.ctx, f, g, h);
                break;
            default:
                for (; ++c < d; )
                    (e = b[c]).callback.apply(e.ctx, a)
            }
        };
        h.bind = h.on;
        h.unbind = h.off;
        g.extend(f, h);
        var J = f.Model = function(b, a) {
            var e = b || {};
            a || (a = {});
            this.cid = g.uniqueId(this.cidPrefix);
            this.attributes = {};
            a.collection && (this.collection = a.collection);
            a.parse && (e = this.parse(e, a) || {});
            var c = g.result(this, "defaults");
            e = g.defaults(g.extend({}, c, e), c);
            this.set(e, a);
            this.changed = {};
            this.initialize.apply(this, arguments)
        }
        ;
        g.extend(J.prototype, h, {
            changed: null,
            validationError: null,
            idAttribute: "id",
            cidPrefix: "c",
            initialize: function() {},
            toJSON: function(b) {
                return g.clone(this.attributes)
            },
            sync: function() {
                return f.sync.apply(this, arguments)
            },
            get: function(b) {
                return this.attributes[b]
            },
            escape: function(b) {
                return g.escape(this.get(b))
            },
            has: function(b) {
                return null != this.get(b)
            },
            matches: function(b) {
                return !!g.iteratee(b, this)(this.attributes)
            },
            set: function(b, a, e) {
                if (null == b)
                    return this;
                if ("object" === typeof b) {
                    var c = b;
                    e = a
                } else
                    (c = {})[b] = a;
                e || (e = {});
                if (!this._validate(c, e))
                    return !1;
                var d = e.unset;
                b = e.silent;
                var f = []
                  , h = this._changing;
                this._changing = !0;
                h || (this._previousAttributes = g.clone(this.attributes),
                this.changed = {});
                var k = this.attributes, q = this.changed, n = this._previousAttributes, p;
                for (p in c)
                    a = c[p],
                    g.isEqual(k[p], a) || f.push(p),
                    g.isEqual(n[p], a) ? delete q[p] : q[p] = a,
                    d ? delete k[p] : k[p] = a;
                this.idAttribute in c && (this.id = this.get(this.idAttribute));
                if (!b)
                    for (f.length && (this._pending = e),
                    a = 0; a < f.length; a++)
                        this.trigger("change:" + f[a], this, k[f[a]], e);
                if (h)
                    return this;
                if (!b)
                    for (; this._pending; )
                        e = this._pending,
                        this._pending = !1,
                        this.trigger("change", this, e);
                this._changing = this._pending = !1;
                return this
            },
            unset: function(b, a) {
                return this.set(b, void 0, g.extend({}, a, {
                    unset: !0
                }))
            },
            clear: function(b) {
                var a = {}, e;
                for (e in this.attributes)
                    a[e] = void 0;
                return this.set(a, g.extend({}, b, {
                    unset: !0
                }))
            },
            hasChanged: function(b) {
                return null == b ? !g.isEmpty(this.changed) : g.has(this.changed, b)
            },
            changedAttributes: function(b) {
                if (!b)
                    return this.hasChanged() ? g.clone(this.changed) : !1;
                var a = this._changing ? this._previousAttributes : this.attributes, e = {}, c;
                for (c in b) {
                    var d = b[c];
                    g.isEqual(a[c], d) || (e[c] = d)
                }
                return g.size(e) ? e : !1
            },
            previous: function(b) {
                return null != b && this._previousAttributes ? this._previousAttributes[b] : null
            },
            previousAttributes: function() {
                return g.clone(this._previousAttributes)
            },
            fetch: function(b) {
                b = g.extend({
                    parse: !0
                }, b);
                var a = this
                  , e = b.success;
                b.success = function(c) {
                    var d = b.parse ? a.parse(c, b) : c;
                    if (!a.set(d, b))
                        return !1;
                    e && e.call(b.context, a, c, b);
                    a.trigger("sync", a, c, b)
                }
                ;
                Q(this, b);
                return this.sync("read", this, b)
            },
            save: function(b, a, c) {
                if (null == b || "object" === typeof b) {
                    var e = b;
                    c = a
                } else
                    (e = {})[b] = a;
                c = g.extend({
                    validate: !0,
                    parse: !0
                }, c);
                var d = c.wait;
                if (e && !d) {
                    if (!this.set(e, c))
                        return !1
                } else if (!this._validate(e, c))
                    return !1;
                var f = this
                  , h = c.success
                  , k = this.attributes;
                c.success = function(a) {
                    f.attributes = k;
                    var b = c.parse ? f.parse(a, c) : a;
                    d && (b = g.extend({}, e, b));
                    if (b && !f.set(b, c))
                        return !1;
                    h && h.call(c.context, f, a, c);
                    f.trigger("sync", f, a, c)
                }
                ;
                Q(this, c);
                e && d && (this.attributes = g.extend({}, k, e));
                b = this.isNew() ? "create" : c.patch ? "patch" : "update";
                "patch" !== b || c.attrs || (c.attrs = e);
                b = this.sync(b, this, c);
                this.attributes = k;
                return b
            },
            destroy: function(b) {
                b = b ? g.clone(b) : {};
                var a = this
                  , c = b.success
                  , d = b.wait
                  , f = function() {
                    a.stopListening();
                    a.trigger("destroy", a, a.collection, b)
                };
                b.success = function(e) {
                    d && f();
                    c && c.call(b.context, a, e, b);
                    a.isNew() || a.trigger("sync", a, e, b)
                }
                ;
                var h = !1;
                this.isNew() ? g.defer(b.success) : (Q(this, b),
                h = this.sync("delete", this, b));
                d || f();
                return h
            },
            url: function() {
                var b = g.result(this, "urlRoot") || g.result(this.collection, "url") || Z();
                if (this.isNew())
                    return b;
                var a = this.get(this.idAttribute);
                return b.replace(/[^\/]$/, "$&/") + encodeURIComponent(a)
            },
            parse: function(b, a) {
                return b
            },
            clone: function() {
                return new this.constructor(this.attributes)
            },
            isNew: function() {
                return !this.has(this.idAttribute)
            },
            isValid: function(b) {
                return this._validate({}, g.extend({}, b, {
                    validate: !0
                }))
            },
            _validate: function(b, a) {
                if (!a.validate || !this.validate)
                    return !0;
                b = g.extend({}, this.attributes, b);
                b = this.validationError = this.validate(b, a) || null;
                if (!b)
                    return !0;
                this.trigger("invalid", this, b, g.extend(a, {
                    validationError: b
                }));
                return !1
            }
        });
        C(J, {
            keys: 1,
            values: 1,
            pairs: 1,
            invert: 1,
            pick: 0,
            omit: 0,
            chain: 1,
            isEmpty: 1
        }, "attributes");
        var w = f.Collection = function(b, a) {
            a || (a = {});
            a.model && (this.model = a.model);
            void 0 !== a.comparator && (this.comparator = a.comparator);
            this._reset();
            this.initialize.apply(this, arguments);
            b && this.reset(b, g.extend({
                silent: !0
            }, a))
        }
          , z = {
            add: !0,
            remove: !0,
            merge: !0
        }
          , L = {
            add: !0,
            remove: !1
        }
          , D = function(b, a, c) {
            c = Math.min(Math.max(c, 0), b.length);
            var e = Array(b.length - c), d = a.length, f;
            for (f = 0; f < e.length; f++)
                e[f] = b[f + c];
            for (f = 0; f < d; f++)
                b[f + c] = a[f];
            for (f = 0; f < e.length; f++)
                b[f + d + c] = e[f]
        };
        g.extend(w.prototype, h, {
            model: J,
            initialize: function() {},
            toJSON: function(b) {
                return this.map(function(a) {
                    return a.toJSON(b)
                })
            },
            sync: function() {
                return f.sync.apply(this, arguments)
            },
            add: function(b, a) {
                return this.set(b, g.extend({
                    merge: !1
                }, a, L))
            },
            remove: function(b, a) {
                a = g.extend({}, a);
                var c = !g.isArray(b);
                b = c ? [b] : b.slice();
                b = this._removeModels(b, a);
                !a.silent && b.length && (a.changes = {
                    added: [],
                    merged: [],
                    removed: b
                },
                this.trigger("update", this, a));
                return c ? b[0] : b
            },
            set: function(b, a) {
                if (null != b) {
                    a = g.extend({}, z, a);
                    a.parse && !this._isModel(b) && (b = this.parse(b, a) || []);
                    var c = !g.isArray(b);
                    b = c ? [b] : b.slice();
                    var d = a.at;
                    null != d && (d = +d);
                    d > this.length && (d = this.length);
                    0 > d && (d += this.length + 1);
                    var f = [], h = [], k = [], q = [], n = {}, p = a.add, y = a.merge, v = a.remove, m = !1, w = this.comparator && null == d && !1 !== a.sort, x = g.isString(this.comparator) ? this.comparator : null, u;
                    for (u = 0; u < b.length; u++) {
                        var t = b[u];
                        var A = this.get(t);
                        A ? (y && t !== A && (t = this._isModel(t) ? t.attributes : t,
                        a.parse && (t = A.parse(t, a)),
                        A.set(t, a),
                        k.push(A),
                        w && !m && (m = A.hasChanged(x))),
                        n[A.cid] || (n[A.cid] = !0,
                        f.push(A)),
                        b[u] = A) : p && (t = b[u] = this._prepareModel(t, a)) && (h.push(t),
                        this._addReference(t, a),
                        n[t.cid] = !0,
                        f.push(t))
                    }
                    if (v) {
                        for (u = 0; u < this.length; u++)
                            t = this.models[u],
                            n[t.cid] || q.push(t);
                        q.length && this._removeModels(q, a)
                    }
                    n = !1;
                    f.length && !w && p && v ? (n = this.length !== f.length || g.some(this.models, function(a, b) {
                        return a !== f[b]
                    }),
                    this.models.length = 0,
                    D(this.models, f, 0),
                    this.length = this.models.length) : h.length && (w && (m = !0),
                    D(this.models, h, null == d ? this.length : d),
                    this.length = this.models.length);
                    m && this.sort({
                        silent: !0
                    });
                    if (!a.silent) {
                        for (u = 0; u < h.length; u++)
                            null != d && (a.index = d + u),
                            t = h[u],
                            t.trigger("add", t, this, a);
                        (m || n) && this.trigger("sort", this, a);
                        if (h.length || q.length || k.length)
                            a.changes = {
                                added: h,
                                removed: q,
                                merged: k
                            },
                            this.trigger("update", this, a)
                    }
                    return c ? b[0] : b
                }
            },
            reset: function(b, a) {
                a = a ? g.clone(a) : {};
                for (var c = 0; c < this.models.length; c++)
                    this._removeReference(this.models[c], a);
                a.previousModels = this.models;
                this._reset();
                b = this.add(b, g.extend({
                    silent: !0
                }, a));
                a.silent || this.trigger("reset", this, a);
                return b
            },
            push: function(b, a) {
                return this.add(b, g.extend({
                    at: this.length
                }, a))
            },
            pop: function(b) {
                var a = this.at(this.length - 1);
                return this.remove(a, b)
            },
            unshift: function(b, a) {
                return this.add(b, g.extend({
                    at: 0
                }, a))
            },
            shift: function(b) {
                var a = this.at(0);
                return this.remove(a, b)
            },
            slice: function() {
                return n.apply(this.models, arguments)
            },
            get: function(b) {
                if (null != b)
                    return this._byId[b] || this._byId[this.modelId(b.attributes || b)] || b.cid && this._byId[b.cid]
            },
            has: function(b) {
                return null != this.get(b)
            },
            at: function(b) {
                0 > b && (b += this.length);
                return this.models[b]
            },
            where: function(b, a) {
                return this[a ? "find" : "filter"](b)
            },
            findWhere: function(b) {
                return this.where(b, !0)
            },
            sort: function(b) {
                var a = this.comparator;
                if (!a)
                    throw Error("Cannot sort a set without a comparator");
                b || (b = {});
                var c = a.length;
                g.isFunction(a) && (a = g.bind(a, this));
                1 === c || g.isString(a) ? this.models = this.sortBy(a) : this.models.sort(a);
                b.silent || this.trigger("sort", this, b);
                return this
            },
            pluck: function(b) {
                return this.map(b + "")
            },
            fetch: function(b) {
                b = g.extend({
                    parse: !0
                }, b);
                var a = b.success
                  , c = this;
                b.success = function(d) {
                    c[b.reset ? "reset" : "set"](d, b);
                    a && a.call(b.context, c, d, b);
                    c.trigger("sync", c, d, b)
                }
                ;
                Q(this, b);
                return this.sync("read", this, b)
            },
            create: function(b, a) {
                a = a ? g.clone(a) : {};
                var c = a.wait;
                b = this._prepareModel(b, a);
                if (!b)
                    return !1;
                c || this.add(b, a);
                var d = this
                  , f = a.success;
                a.success = function(a, b, e) {
                    c && d.add(a, e);
                    f && f.call(e.context, a, b, e)
                }
                ;
                b.save(null, a);
                return b
            },
            parse: function(b, a) {
                return b
            },
            clone: function() {
                return new this.constructor(this.models,{
                    model: this.model,
                    comparator: this.comparator
                })
            },
            modelId: function(b) {
                return b[this.model.prototype.idAttribute || "id"]
            },
            _reset: function() {
                this.length = 0;
                this.models = [];
                this._byId = {}
            },
            _prepareModel: function(b, a) {
                if (this._isModel(b))
                    return b.collection || (b.collection = this),
                    b;
                a = a ? g.clone(a) : {};
                a.collection = this;
                b = new this.model(b,a);
                if (!b.validationError)
                    return b;
                this.trigger("invalid", this, b.validationError, a);
                return !1
            },
            _removeModels: function(b, a) {
                for (var c = [], d = 0; d < b.length; d++) {
                    var f = this.get(b[d]);
                    if (f) {
                        var g = this.indexOf(f);
                        this.models.splice(g, 1);
                        this.length--;
                        delete this._byId[f.cid];
                        var h = this.modelId(f.attributes);
                        null != h && delete this._byId[h];
                        a.silent || (a.index = g,
                        f.trigger("remove", f, this, a));
                        c.push(f);
                        this._removeReference(f, a)
                    }
                }
                return c
            },
            _isModel: function(b) {
                return b instanceof J
            },
            _addReference: function(b, a) {
                this._byId[b.cid] = b;
                a = this.modelId(b.attributes);
                null != a && (this._byId[a] = b);
                b.on("all", this._onModelEvent, this)
            },
            _removeReference: function(b, a) {
                delete this._byId[b.cid];
                a = this.modelId(b.attributes);
                null != a && delete this._byId[a];
                this === b.collection && delete b.collection;
                b.off("all", this._onModelEvent, this)
            },
            _onModelEvent: function(b, a, c, d) {
                if (a) {
                    if (("add" === b || "remove" === b) && c !== this)
                        return;
                    "destroy" === b && this.remove(a, d);
                    if ("change" === b) {
                        var e = this.modelId(a.previousAttributes())
                          , f = this.modelId(a.attributes);
                        e !== f && (null != e && delete this._byId[e],
                        null != f && (this._byId[f] = a))
                    }
                }
                this.trigger.apply(this, arguments)
            }
        });
        C(w, {
            forEach: 3,
            each: 3,
            map: 3,
            collect: 3,
            reduce: 0,
            foldl: 0,
            inject: 0,
            reduceRight: 0,
            foldr: 0,
            find: 3,
            detect: 3,
            filter: 3,
            select: 3,
            reject: 3,
            every: 3,
            all: 3,
            some: 3,
            any: 3,
            include: 3,
            includes: 3,
            contains: 3,
            invoke: 0,
            max: 3,
            min: 3,
            toArray: 1,
            size: 1,
            first: 3,
            head: 3,
            take: 3,
            initial: 3,
            rest: 3,
            tail: 3,
            drop: 3,
            last: 3,
            without: 0,
            difference: 0,
            indexOf: 3,
            shuffle: 1,
            lastIndexOf: 3,
            isEmpty: 1,
            chain: 1,
            sample: 3,
            partition: 3,
            groupBy: 3,
            countBy: 3,
            sortBy: 3,
            indexBy: 3,
            findIndex: 3,
            findLastIndex: 3
        }, "models");
        C = f.View = function(b) {
            this.cid = g.uniqueId("view");
            g.extend(this, g.pick(b, v));
            this._ensureElement();
            this.initialize.apply(this, arguments)
        }
        ;
        var da = /^(\S+)\s*(.*)$/
          , v = "model collection el id attributes className tagName events".split(" ");
        g.extend(C.prototype, h, {
            tagName: "div",
            $: function(b) {
                return this.$el.find(b)
            },
            initialize: function() {},
            render: function() {
                return this
            },
            remove: function() {
                this._removeElement();
                this.stopListening();
                return this
            },
            _removeElement: function() {
                this.$el.remove()
            },
            setElement: function(b) {
                this.undelegateEvents();
                this._setElement(b);
                this.delegateEvents();
                return this
            },
            _setElement: function(b) {
                this.$el = b instanceof f.$ ? b : f.$(b);
                this.el = this.$el[0]
            },
            delegateEvents: function(b) {
                b || (b = g.result(this, "events"));
                if (!b)
                    return this;
                this.undelegateEvents();
                for (var a in b) {
                    var c = b[a];
                    g.isFunction(c) || (c = this[c]);
                    if (c) {
                        var d = a.match(da);
                        this.delegate(d[1], d[2], g.bind(c, this))
                    }
                }
                return this
            },
            delegate: function(b, a, c) {
                this.$el.on(b + ".delegateEvents" + this.cid, a, c);
                return this
            },
            undelegateEvents: function() {
                this.$el && this.$el.off(".delegateEvents" + this.cid);
                return this
            },
            undelegate: function(b, a, c) {
                this.$el.off(b + ".delegateEvents" + this.cid, a, c);
                return this
            },
            _createElement: function(b) {
                return document.createElement(b)
            },
            _ensureElement: function() {
                if (this.el)
                    this.setElement(g.result(this, "el"));
                else {
                    var b = g.extend({}, g.result(this, "attributes"));
                    this.id && (b.id = g.result(this, "id"));
                    this.className && (b["class"] = g.result(this, "className"));
                    this.setElement(this._createElement(g.result(this, "tagName")));
                    this._setAttributes(b)
                }
            },
            _setAttributes: function(b) {
                this.$el.attr(b)
            }
        });
        f.sync = function(b, a, c) {
            var d = k[b];
            g.defaults(c || (c = {}), {
                emulateHTTP: f.emulateHTTP,
                emulateJSON: f.emulateJSON
            });
            var e = {
                type: d,
                dataType: "json"
            };
            c.url || (e.url = g.result(a, "url") || Z());
            null != c.data || !a || "create" !== b && "update" !== b && "patch" !== b || (e.contentType = "application/json",
            e.data = JSON.stringify(c.attrs || a.toJSON(c)));
            c.emulateJSON && (e.contentType = "application/x-www-form-urlencoded",
            e.data = e.data ? {
                model: e.data
            } : {});
            if (c.emulateHTTP && ("PUT" === d || "DELETE" === d || "PATCH" === d)) {
                e.type = "POST";
                c.emulateJSON && (e.data._method = d);
                var h = c.beforeSend;
                c.beforeSend = function(a) {
                    a.setRequestHeader("X-HTTP-Method-Override", d);
                    if (h)
                        return h.apply(this, arguments)
                }
            }
            "GET" === e.type || c.emulateJSON || (e.processData = !1);
            var q = c.error;
            c.error = function(a, b, d) {
                c.textStatus = b;
                c.errorThrown = d;
                q && q.call(c.context, a, b, d)
            }
            ;
            b = c.xhr = f.ajax(g.extend(e, c));
            a.trigger("request", a, b, c);
            return b
        }
        ;
        var k = {
            create: "POST",
            update: "PUT",
            patch: "PATCH",
            "delete": "DELETE",
            read: "GET"
        };
        f.ajax = function() {
            return f.$.ajax.apply(f.$, arguments)
        }
        ;
        var u = f.Router = function(b) {
            b || (b = {});
            b.routes && (this.routes = b.routes);
            this._bindRoutes();
            this.initialize.apply(this, arguments)
        }
          , G = /\((.*?)\)/g
          , U = /(\(\?)?:\w+/g
          , X = /\*\w+/g
          , V = /[\-{}\[\]+?.,\\\^$|#\s]/g;
        g.extend(u.prototype, h, {
            initialize: function() {},
            route: function(b, a, c) {
                g.isRegExp(b) || (b = this._routeToRegExp(b));
                g.isFunction(a) && (c = a,
                a = "");
                c || (c = this[a]);
                var d = this;
                f.history.route(b, function(e) {
                    e = d._extractParameters(b, e);
                    !1 !== d.execute(c, e, a) && (d.trigger.apply(d, ["route:" + a].concat(e)),
                    d.trigger("route", a, e),
                    f.history.trigger("route", d, a, e))
                });
                return this
            },
            execute: function(b, a, c) {
                b && b.apply(this, a)
            },
            navigate: function(b, a) {
                f.history.navigate(b, a);
                return this
            },
            _bindRoutes: function() {
                if (this.routes) {
                    this.routes = g.result(this, "routes");
                    for (var b, a = g.keys(this.routes); null != (b = a.pop()); )
                        this.route(b, this.routes[b])
                }
            },
            _routeToRegExp: function(b) {
                b = b.replace(V, "\\$&").replace(G, "(?:$1)?").replace(U, function(a, b) {
                    return b ? a : "([^/?]+)"
                }).replace(X, "([^?]*?)");
                return new RegExp("^" + b + "(?:\\?([\\s\\S]*))?$")
            },
            _extractParameters: function(b, a) {
                var c = b.exec(a).slice(1);
                return g.map(c, function(a, b) {
                    return b === c.length - 1 ? a || null : a ? decodeURIComponent(a) : null
                })
            }
        });
        var x = f.History = function() {
            this.handlers = [];
            this.checkUrl = g.bind(this.checkUrl, this);
            "undefined" !== typeof t && (this.location = t.location,
            this.history = t.history)
        }
          , aa = /^[#\/]|\s+$/g
          , W = /^\/+|\/+$/g
          , ba = /#.*$/;
        x.started = !1;
        g.extend(x.prototype, h, {
            interval: 50,
            atRoot: function() {
                return this.location.pathname.replace(/[^\/]$/, "$&/") === this.root && !this.getSearch()
            },
            matchRoot: function() {
                return this.decodeFragment(this.location.pathname).slice(0, this.root.length - 1) + "/" === this.root
            },
            decodeFragment: function(b) {
                return decodeURI(b.replace(/%25/g, "%2525"))
            },
            getSearch: function() {
                var b = this.location.href.replace(/#.*/, "").match(/\?.+/);
                return b ? b[0] : ""
            },
            getHash: function(b) {
                return (b = (b || this).location.href.match(/#(.*)$/)) ? b[1] : ""
            },
            getPath: function() {
                var b = this.decodeFragment(this.location.pathname + this.getSearch()).slice(this.root.length - 1);
                return "/" === b.charAt(0) ? b.slice(1) : b
            },
            getFragment: function(b) {
                null == b && (b = this._usePushState || !this._wantsHashChange ? this.getPath() : this.getHash());
                return b.replace(aa, "")
            },
            start: function(b) {
                if (x.started)
                    throw Error("Backbone.history has already been started");
                x.started = !0;
                this.options = g.extend({
                    root: "/"
                }, this.options, b);
                this.root = this.options.root;
                this._wantsHashChange = !1 !== this.options.hashChange;
                this._hasHashChange = "onhashchange"in t && (void 0 === document.documentMode || 7 < document.documentMode);
                this._useHashChange = this._wantsHashChange && this._hasHashChange;
                this._wantsPushState = !!this.options.pushState;
                this._hasPushState = !(!this.history || !this.history.pushState);
                this._usePushState = this._wantsPushState && this._hasPushState;
                this.fragment = this.getFragment();
                this.root = ("/" + this.root + "/").replace(W, "/");
                if (this._wantsHashChange && this._wantsPushState)
                    if (this._hasPushState || this.atRoot())
                        this._hasPushState && this.atRoot() && this.navigate(this.getHash(), {
                            replace: !0
                        });
                    else
                        return b = this.root.slice(0, -1) || "/",
                        this.location.replace(b + "#" + this.getPath()),
                        !0;
                this._hasHashChange || !this._wantsHashChange || this._usePushState || (this.iframe = document.createElement("iframe"),
                this.iframe.src = "javascript:0",
                this.iframe.style.display = "none",
                this.iframe.tabIndex = -1,
                b = document.body,
                b = b.insertBefore(this.iframe, b.firstChild).contentWindow,
                b.document.open(),
                b.document.close(),
                b.location.hash = "#" + this.fragment);
                b = t.addEventListener || function(a, b) {
                    return attachEvent("on" + a, b)
                }
                ;
                this._usePushState ? b("popstate", this.checkUrl, !1) : this._useHashChange && !this.iframe ? b("hashchange", this.checkUrl, !1) : this._wantsHashChange && (this._checkUrlInterval = setInterval(this.checkUrl, this.interval));
                if (!this.options.silent)
                    return this.loadUrl()
            },
            stop: function() {
                var b = t.removeEventListener || function(a, b) {
                    return detachEvent("on" + a, b)
                }
                ;
                this._usePushState ? b("popstate", this.checkUrl, !1) : this._useHashChange && !this.iframe && b("hashchange", this.checkUrl, !1);
                this.iframe && (document.body.removeChild(this.iframe),
                this.iframe = null);
                this._checkUrlInterval && clearInterval(this._checkUrlInterval);
                x.started = !1
            },
            route: function(b, a) {
                this.handlers.unshift({
                    route: b,
                    callback: a
                })
            },
            checkUrl: function(b) {
                b = this.getFragment();
                b === this.fragment && this.iframe && (b = this.getHash(this.iframe.contentWindow));
                if (b === this.fragment)
                    return !1;
                this.iframe && this.navigate(b);
                this.loadUrl()
            },
            loadUrl: function(b) {
                if (!this.matchRoot())
                    return !1;
                b = this.fragment = this.getFragment(b);
                return g.some(this.handlers, function(a) {
                    if (a.route.test(b))
                        return a.callback(b),
                        !0
                })
            },
            navigate: function(b, a) {
                if (!x.started)
                    return !1;
                a && !0 !== a || (a = {
                    trigger: !!a
                });
                b = this.getFragment(b || "");
                var c = this.root;
                if ("" === b || "?" === b.charAt(0))
                    c = c.slice(0, -1) || "/";
                c += b;
                b = this.decodeFragment(b.replace(ba, ""));
                if (this.fragment !== b) {
                    this.fragment = b;
                    if (this._usePushState)
                        this.history[a.replace ? "replaceState" : "pushState"]({}, document.title, c);
                    else if (this._wantsHashChange)
                        this._updateHash(this.location, b, a.replace),
                        this.iframe && b !== this.getHash(this.iframe.contentWindow) && (c = this.iframe.contentWindow,
                        a.replace || (c.document.open(),
                        c.document.close()),
                        this._updateHash(c.location, b, a.replace));
                    else
                        return this.location.assign(c);
                    if (a.trigger)
                        return this.loadUrl(b)
                }
            },
            _updateHash: function(b, a, c) {
                c ? (c = b.href.replace(/(javascript:|#).*$/, ""),
                b.replace(c + "#" + a)) : b.hash = "#" + a
            }
        });
        f.history = new x;
        J.extend = w.extend = u.extend = C.extend = x.extend = function(b, a) {
            var c = this;
            var d = b && g.has(b, "constructor") ? b.constructor : function() {
                return c.apply(this, arguments)
            }
            ;
            g.extend(d, c, a);
            d.prototype = g.create(c.prototype, b);
            d.prototype.constructor = d;
            d.__super__ = c.prototype;
            return d
        }
        ;
        var Z = function() {
            throw Error('A "url" property or function must be specified');
        }
          , Q = function(b, a) {
            var c = a.error;
            a.error = function(d) {
                c && c.call(a.context, b, d, a);
                b.trigger("error", b, d, a)
            }
        };
        return f
    });
    var n = t._.noConflict()
      , P = t.Backbone.noConflict()
      , p = K
      , h = {};
    h.core = h.core || {};
    h.core.LOGGING_ENABLED = !0;
    h.core.log = function() {
        if (h.core.LOGGING_ENABLED && "undefined" !== typeof console && !n.isNull(console) && "function" === typeof console.log) {
            var d = ["[Klaviyo / Onsite]"].concat([].slice.call(arguments));
            console.log.apply(console, d)
        }
    }
    ;
    h.core.parseQueryString = function(d) {
        for (var f = {}, g = /\+/g, h = /([^&=]+)=?([^&]*)/g, n; n = h.exec(d); )
            f[decodeURIComponent(n[1].replace(g, " "))] = decodeURIComponent(n[2].replace(g, " "));
        return f
    }
    ;
    h.core.insertCSS = function(d) {
        var f = document.createElement("style");
        p("head").get(0).appendChild(f);
        f.styleSheet ? f.styleSheet.cssText = d : f.appendChild(document.createTextNode(d))
    }
    ;
    h.core.templates = {
        _cache: {},
        register: function(d, f) {
            this._cache[d] = n.template(f)
        },
        render: function(d, f) {
            return this._cache[d](f || {})
        }
    };
    h.platforms = h.platforms || {};
    h.platforms.shopify = h.platforms.shopify || {};
    h.platforms.shopify.ADD_TO_CART_FORM_ID = 'form[action="/cart/add"]';
    h.platforms.shopify.ADD_TO_CART_BUTTON_ID = h.platforms.shopify.ADD_TO_CART_FORM_ID + ' button[type="submit"]';
    h.platforms.shopify.isProductPage = function(d) {
        d || (d = t.location.toString());
        return !!d.match(/\/products\//)
    }
    ;
    h.platforms.shopify.isCollectionsPage = function(d, f) {
        d || (d = t.location.toString());
        if (Array.isArray(f) && 0 < f.length) {
            for (var g = 0; g < f.length; g++)
                if (d.match(f[g]))
                    return !0;
            return !!d.match(/\/collections\//)
        }
    }
    ;
    h.platforms.shopify.isVariantOutOfStock = function(d, f, g) {
        return h.platforms.shopify.isVariantOutOfInventory(f, g) && h.platforms.shopify.isVariantUnavailableBasedOnInventoryManagementPolicy(f, g) && h.platforms.shopify.isVariantUnavailableBasedOnPreorderPolicy(f, g) && h.platforms.shopify.isVariantUnavailableBasedOnSellThroughPolicy(f, g) && h.platforms.shopify.isVariantIncludedBasedOnTags(d, g.include_on_tags, g.exclude_on_tags)
    }
    ;
    h.platforms.shopify.isVariantOutOfInventory = function(d, f) {
        return n.isNull(d.inventory_quantity) || n.isUndefined(d.inventory_quantity) ? !d.available : d.inventory_quantity < f.inventory_quantity_threshold
    }
    ;
    h.platforms.shopify.isVariantUnavailableBasedOnInventoryManagementPolicy = function(d, f) {
        return f.is_allow_for_unmanaged_inventory ? !0 : !!d.inventory_management
    }
    ;
    h.platforms.shopify.isVariantUnavailableBasedOnPreorderPolicy = function(d, f) {
        return f.is_allow_for_preorder ? !0 : !d.available
    }
    ;
    h.platforms.shopify.isVariantUnavailableBasedOnSellThroughPolicy = function(d, f) {
        return f.display_on_policy_continue || "continue" != d.inventory_policy ? !0 : !1
    }
    ;
    h.platforms.shopify.isVariantIncludedBasedOnTags = function(d, f, g) {
        return g.length && d.tags.length && n.intersection(d.tags, g).length || f.length && (!n.intersection(d.tags, f).length || !d.tags.length) ? !1 : !0
    }
    ;
    h.platforms.shopify.findSelectedVariantId = function() {
        var d = t.location.search.substring(1);
        return (d = h.core.parseQueryString(d).variant) ? d : p('[name="id"]').val()
    }
    ;
    h.platforms.shopify.isValidVariant = function(d) {
        return "number" != typeof parseInt(d) ? !1 : !0
    }
    ;
    h.platforms.shopify.productDetailsUrl = function(d) {
        return n.isUndefined(d.product_handle) ? "//" + (t.location.hostname.toString() + t.location.pathname.toString().replace(/\/$/, "")) + ".js" : "//" + t.location.hostname.toString() + "/products/" + d.product_handle + ".js"
    }
    ;
    h.platforms.shopify.format_product_json = function(d) {
        return d
    }
    ;
    h.platforms.bigcommerce = h.platforms.bigcommerce || {};
    h.platforms.bigcommerce.ADD_TO_CART_FORM_ID = 'form[action$="//' + t.location.hostname + '/cart.php"]';
    h.platforms.bigcommerce.ADD_TO_CART_BUTTON_ID = h.platforms.bigcommerce.ADD_TO_CART_FORM_ID + ' input[type="submit"]';
    h.platforms.bigcommerce.INVENTORY_TRACKING_TYPES = ["simple", "product", "variant", "sku"];
    h.platforms.bigcommerce.OPTION_NAME_ELEMENT = 'input[name^="attribute"]';
    h.platforms.bigcommerce.DROPDOWN_NAME_ELEMENT = 'select[name^="attribute"] option';
    h.platforms.bigcommerce.PRODUCT_ID_ELEMENT = 'input[name="product_id"]';
    h.platforms.bigcommerce.isProductPage = function(d) {
        try {
            return page_type = document.querySelector("meta[property='og:type']").getAttribute("content"),
            "product" == page_type
        } catch (f) {
            return !1
        }
    }
    ;
    h.platforms.bigcommerce.isCollectionsPage = function(d, f) {
        return !1
    }
    ;
    h.platforms.bigcommerce.isVariantOutOfStock = function(d, f, g) {
        return h.platforms.bigcommerce.isVariantTrackableBasedOnInventoryManagementPolicy(d) && h.platforms.bigcommerce.isVariantOutOfInventory(f, g) && h.platforms.bigcommerce.isVariantAvailable(f, g) && h.platforms.bigcommerce.isVariantIncludedBasedOnTags(d, g.include_on_tags, g.exclude_on_tags)
    };
    h.platforms.bigcommerce.isVariantOutOfInventory = function(d, f) {
        return n.isNull(d.inventory_quantity) || n.isUndefined(d.inventory_quantity) ? !d.available : d.inventory_quantity < f.inventory_quantity_threshold
    };
    h.platforms.bigcommerce.isVariantTrackableBasedOnInventoryManagementPolicy = function(d) {
        return h.platforms.bigcommerce.INVENTORY_TRACKING_TYPES.includes(d.inventory_policy)
    };
    h.platforms.bigcommerce.isVariantAvailable = function(d, f) {
        return d.available
    };
    h.platforms.bigcommerce.isVariantIncludedBasedOnTags = function(d, f, g) {
        return g.length && d.tags.length && n.intersection(d.tags, g).length || f.length && (!n.intersection(d.tags, f).length || !d.tags.length) ? !1 : !0
    };
    h.platforms.bigcommerce.findSelectedVariantId = function() {
        var d = []
          , f = n.map([h.platforms.bigcommerce.ADD_TO_CART_FORM_ID + " " + h.platforms.bigcommerce.OPTION_NAME_ELEMENT, h.platforms.bigcommerce.ADD_TO_CART_FORM_ID + " " + h.platforms.bigcommerce.DROPDOWN_NAME_ELEMENT], function(d) {
            return d + ":checked"
        }).join();
        f = p(f);
        h.platforms.bigcommerce.selected_variant_id = null;
        if (!n.isEmpty(f))
            return n.each(f, function(f, h) {
                f = p(f);
                f.is("option") ? d.push(f.parent().attr("name") + "=" + f.val()) : d.push(f.attr("name") + "=" + f.val())
            }),
            product_id = h.platforms.bigcommerce.productId(),
            variant_option_url = "//" + t.location.hostname + "/remote/v1/product-attributes/" + product_id,
            parameters = "action=add&qty[]=1&product_id=" + product_id + "&" + d.join("&"),
            parameters = encodeURI(parameters),
            p.ajax({
                url: variant_option_url,
                type: "POST",
                headers: {
                    "x-xsrf-token": t.BCData && t.BCData.csrf_token ? t.BCData.csrf_token : ""
                },
                dataType: "json",
                data: parameters,
                success: function(d) {
                    try {
                        d.data.purchasable && (h.platforms.bigcommerce.selected_variant_id = d.data.v3_variant_id)
                    } catch (q) {}
                }
            }),
            null
    };
    h.platforms.bigcommerce.isValidVariant = function(d) {
        return !0
    };
    h.platforms.bigcommerce.productId = function() {
        product_id_element = h.platforms.bigcommerce.ADD_TO_CART_FORM_ID + " " + h.platforms.bigcommerce.PRODUCT_ID_ELEMENT;
        return p(product_id_element).val()
    };
    h.platforms.bigcommerce.productDetailsUrl = function(d) {
        product_id = h.platforms.bigcommerce.productId();
        return "https://fast.a.klaviyo.com/api/v1/catalog/bigcommerce/product-variants?a=" + d.account_id + "&p=" + product_id
    };
    h.platforms.bigcommerce.format_product_json = function(d) {
        data = d.data;
        product = {
            id: data.product_id,
            title: data.product_title,
            inventory_policy: data.inventory_tracking,
            variants: []
        };
        n.each(data.variants, function(d, g) {
            variant_title = n.isEmpty(d.title) ? d.sku : d.title;
            product.variants.push({
                id: d.external_id,
                title: variant_title,
                available: d.availability,
                inventory_quantity: d.inventory_quantity,
                is_allow_for_preorder: d.availability
            })
        });
        return product
    };
    h.components = h.components || {};
    h.components.back_in_stock = h.components.back_in_stock || {};
    h.components.back_in_stock.BASE_CSS = 'body, html { background: transparent;-webkit-font-smoothing: antialiased;height: 100%;}html {font-family: sans-serif;font-size: 14px;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;-webkit-tap-highlight-color: rgba(0, 0, 0, 0);}body {margin: 0;font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;font-size: 14px;line-height: 1.5;color: #222;overflow: hidden;-moz-transition: background-color 0.15s linear;-webkit-transition: background-color 0.15s linear;-o-transition: background-color 0.15s linear;transition: background-color 0.15s cubic-bezier(0.785, 0.135, 0.150, 0.860);}body.fadein {background: rgba(0, 0, 0, 0.65);}a {background-color: transparent;}a:active,a:hover {outline: 0;}h1 {font-size: 2em;margin: 0.67em 0;}h3 { font-size: 24px;}h4 {  font-size: 18px;  margin-top: 10px;  margin-bottom: 10px;}h3, h4 {  font-family: inherit;  font-weight: 500;  line-height: 1.1;  color: inherit;}button,input,optgroup,select,textarea {color: inherit;font: inherit;margin: 0;font-family: inherit;font-size: inherit;line-height: inherit;}button {overflow: visible;}button,select {text-transform: none;}button {-webkit-appearance: button;cursor: pointer;}button[disabled] {opacity: 0.6;}button::-moz-focus-inner,input::-moz-focus-inner {border: 0;padding: 0;}input {line-height: normal;}input[type="number"]::-webkit-inner-spin-button,input[type="number"]::-webkit-outer-spin-button {height: auto;}* {-webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;}*:before,*:after {-webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;}#container {position: relative;background: white;padding: 12px 18px 40px 18px;}.fade {opacity: 0;-webkit-transition: opacity 0.15s linear;-o-transition: opacity 0.15s linear;transition: opacity 0.15s linear;}.fade.in {opacity: 1;}.modal {  overflow-x: hidden;  overflow-y: auto;  position: fixed;  top: 0;  right: 0;  bottom: 0;  left: 0;  z-index: 999;  -webkit-overflow-scrolling: touch;  outline: 0;}.modal-title {  margin: 0;  font-size: 24px;  line-height: 1.5;}.clearfix:before,.clearfix:after {  content: " ";  display: table;}.clearfix:after {  clear: both;}.form-control {  display: block;  width: 100%;  height: 34px;  padding: 6px 12px;  font-size: 14px;  line-height: 1.5;  color: #222;  background-color: #fff;  background-image: none;  border: 1px solid #ccc;  border-radius: 2px;  box-shadow: inset 0 1px 1px rgba(0,0,0,.075);  transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;}.input-lg {  font-size: 14px;  height: 46px;  padding: 10px 16px;  line-height: 1.3333333;}.submit-container {  margin-top: 20px;}.form-group {  margin-bottom: 15px;}.btn {  display: inline-block;  padding: 8px 12px;  margin-bottom: 0;  font-size: 14px;  font-weight: bold;  line-height: 1.5;  text-align: center;  white-space: nowrap;  vertical-align: middle;  -ms-touch-action: manipulation;  touch-action: manipulation;  cursor: pointer;  -webkit-user-select: none;  -moz-user-select: none;  -ms-user-select: none;  user-select: none;  background-image: none;  border: 1px solid transparent;  border-radius: 2px;}.btn-success {  width: 100%;  color: #fff;  background-color: #439fdb;  border-color: #439fdb;}.btn-lg {  line-height: 24px;  font-size: 15px;  padding: 14px;  line-height: 1.3333333;}.close {  -webkit-appearance: none;  padding: 0;  cursor: pointer;  background: 0 0;  border: 0;  position: absolute;  top: 7px;  right: 15px;  font-size: 30px;  font-weight: 700;  line-height: 1;  color: #ccc;  text-shadow: 0 1px 0 #fff;}.alert {  padding: 6px 11px;  font-size: 13px;  margin: 15px 0;  border: 1px solid transparent;  border-radius: 2px;}.alert-success {  color: #1B9500;  background-color: #d3efcd;  border-color: #d3efcd;}.alert-success a {   color: #1B9500;}.alert-danger {  color: #C72E2F;  background-color: #fcd6d7;  border-color: #fcd6d7;}.pull-right {  float: right;}.text-right {  text-align: right;}.small-print {  font-size: 14px;  line-height: 1.5;}.small-print a {  color: inherit;  text-decoration: underline;}.powered-by {  opacity: 0.8;}.product-title {  margin-bottom: 20px;}.accepts_marketing {  opacity: 0.835;  font-size: 13px;}.accepts_marketing input {  margin-right: 10px;}.completed_message, .error_message {  display: none;}.complete .completed_message {  display: block;}#klaviyo-bis-modal.in {  position: relative;  z-index: 999;  height: 100%;  overflow: hidden;  overflow-y: auto;  -webkit-overflow-scrolling: touch;}@media only screen and (min-width:500px) {  #klaviyo-bis-modal {    max-width: 460px;    margin: auto;  }  #container {    border-radius: 3px;    padding: 30px 40px;  }}@media only screen and (min-width:992px) {  #container {    margin-top: 100px;  }}';
    h.components = h.components || {};
    h.components.back_in_stock = h.components.back_in_stock || {};
    h.components.back_in_stock.DEFAULT_SETTINGS = {
        trigger: {
            replace_sold_out: !1,
            replace_anchor: !1,
            alternate_anchor: null,
            product_page_text: "Notify Me When Available",
            product_page_class: "btn",
            product_page_text_align: "center",
            product_page_margin: "0px",
            product_page_width: "auto",
            collection_page_class: "btn",
            collection_page_text_align: "center",
            collection_page_width: "200px",
            collection_page_text: "Notify Me When Available",
            collection_page_padding: "inherit"
        },
        modal: {
            headline: "{product_name}",
            body_content: "Enter your email address and we'll let you know when it's back.",
            email_field_label: "Email",
            is_quantity_field_enabled: !1,
            quantity_field_label: "Quantity Required",
            button_label: "Notify me when available",
            newsletter_subscribe_label: "Add me to your email list.",
            subscription_success_label: "You're in! We'll let you know when it's back.",
            footer_content: "",
            close_label: "Close",
            is_powered_by_link: !1,
            styles: h.components.back_in_stock.BASE_CSS,
            additional_styles: "",
            z_index: 999999,
            drop_background_color: "#000",
            background_color: "#fff",
//             font_family: '"Helvetica Neue", Helvetica, Arial, sans-serif;',
//             headers_font_family: '"Helvetica Neue", Helvetica, Arial, sans-serif;',
            text_color: "#222",
            button_text_color: "#fff",
            button_background_color: "#439fdb",
            close_button_color: "#ccc",
            error_background_color: "#fcd6d7",
            error_text_color: "#C72E2F",
            success_background_color: "#d3efcd",
            success_text_color: "#1B9500",
            subscribe_checked: !0
        }
    };
    h.components.back_in_stock.Settings = P.Model.extend({
        defaults: {
            exclude_on_tags: "",
            include_on_tags: "",
            display_on_policy_continue: !1,
            inventory_quantity_threshold: 1,
            is_allow_for_preorder: !0,
            is_allow_for_unmanaged_inventory: !0,
            variant_id_element: null,
            variant_id_attribute: null
        }
    });
    h.components.back_in_stock.Main = P.Model.extend();
    h.components.back_in_stock.MainView = P.View.extend({
        events: {
            change: "variantChange",
            "click .klaviyo-bis-trigger": "handleBISTriggerClick"
        },
        settings: function() {
            return this.model.get("settings")
        },
        initialize: function(d) {
            d = this.settings().get("platform");
            var f = this.settings().get("is_quick_view");
            this.platform_implementation = h.platforms[d];
            this.model.set("is_quick_view", f);
            this.model.set("collection_urls", this.settings().get("collection_urls"));
            if (this.platform_implementation.isProductPage())
                this.model.set("is_on_collections_page", !1),
                this.createProductPageTrigger();
            else if (this.platform_implementation.isCollectionsPage(null, this.model.get("collection_urls")))
                this.model.set("is_on_collections_page", !0),
                this.createCollectionPageTriggers();
            else {
                this.model.set("is_on_other_page", !0);
                return
            }
            this.model.set("is_on_other_page", !1)
        },
        getProductJSON: function(d, f) {
            var g = this;
            p.getJSON(d, function(d, p, t) {
                d = g.platform_implementation.format_product_json(d);
                p = d.variants;
                var q = []
                  , y = {}
                  , C = {};
                g.model.set("product", d);
                n.each(p, function(d, f) {
                    g.isVariantOutOfStock(d) && q.push(d);
                    y[d.id] = d;
                    C[d.title] = d
                });
                g.model.set({
                    variants: p,
                    unavailable_variants: q,
                    variants_by_id: y,
                    variants_by_title: C
                });
                h.core.log("Variants: ", p.length, "Unavailable Variants: ", q.length);
                f()
            })
        },
        createProductPageTrigger: function() {
            var d = this
              , f = d.$(".klaviyo-bis-trigger")
              , g = {
                account_id: d.settings().get("account")
            };
            g = d.platform_implementation.productDetailsUrl(g);
            d.getProductJSON(g, function() {
                if (d.model.get("variants").length) {
                    d.prepareTriggerElement(f);
                    if (!f.length) {
                        d.trigger.renderProductPageTrigger();
                        var g = p(d.platform_implementation.ADD_TO_CART_BUTTON_ID).eq(0)
                          , h = d.trigger.model.get("alternate_anchor")
                          , t = "#" + h;
                        !n.isNull(h) && p(t).length ? (g = p(t).eq(0),
                        g.append(d.trigger.$el),
                        d.sold_out_button = g) : !0 !== d.trigger.model.get("replace_anchor") && !0 !== d.trigger.model.get("replace_sold_out") || !g.length ? d.$(d.platform_implementation.ADD_TO_CART_FORM_ID).eq(0).append(d.trigger.$el) : (d.sold_out_button = g,
                        d.sold_out_button.parent().append(d.trigger.$el))
                    }
                    d.createModal();
                    d.variantChange()
                }
            })
        },
        createCollectionPageTriggers: function() {
            var d = this
              , f = this.$(".klaviyo-bis-trigger")
              , g = this.$(".klaviyo-product-container");
            g.length && (d.prepareTriggerElement(f),
            f.length || (d.trigger.prepareCollectionPageHelpers(),
            d.trigger.renderCollectionPageTrigger(),
            n.each(g, function(f) {
                f = p(f).data("klaviyo-handle");
                var g = d.trigger.$el.clone()
                  , h = p('.klaviyo-product-container[data-klaviyo-handle="' + f + '"] .klaviyo-button-container')
                  , n = h.parent().parent();
                g.data("klaviyo-handle", f);
                h.append(g);
                "static" == n.css("position") && n.css("position", "relative")
            }),
            d.createModal()))
        },
        prepareTriggerElement: function(d) {
            var f = this.settings()
              , g = {};
            n.defaults(g, f.get("trigger"), h.components.back_in_stock.DEFAULT_SETTINGS.trigger);
            this.trigger = d.length ? new h.components.back_in_stock.TriggerView({
                el: d,
                model: new h.components.back_in_stock.Trigger(g)
            }) : new h.components.back_in_stock.TriggerView({
                el: p("<a/>"),
                model: new h.components.back_in_stock.Trigger(g)
            })
        },
        createModal: function() {
            var d = this.settings()
              , f = {};
            parent_body_font_family = p("body").css("font-family");
            parent_body_font_color = p("body").css("color");
            parent_headers_font_family = p("h1,h2,h3").eq(0).css("font-family");
            parent_button = p(".klaviyo-bis-trigger").eq(0);
            parent_button_text_color = parent_button.css("color");
            parent_button_background_color = parent_button.css("background-color");
            n.isUndefined(parent_body_font_family) || (h.components.back_in_stock.DEFAULT_SETTINGS.modal.font_family = parent_body_font_family);
            n.isUndefined(parent_body_font_color) || (h.components.back_in_stock.DEFAULT_SETTINGS.modal.text_color = parent_body_font_color);
            n.isUndefined(parent_headers_font_family) || (h.components.back_in_stock.DEFAULT_SETTINGS.modal.headers_font_family = parent_headers_font_family);
            n.isUndefined(parent_button_text_color) || (h.components.back_in_stock.DEFAULT_SETTINGS.modal.button_text_color = parent_button_text_color);
            n.isUndefined(parent_button_background_color) || (h.components.back_in_stock.DEFAULT_SETTINGS.modal.button_background_color = parent_button_background_color);
            n.defaults(f, d.get("modal"), h.components.back_in_stock.DEFAULT_SETTINGS.modal);
            n.extend(f, {
                account: d.get("account"),
                list: d.get("list"),
                platform: d.get("platform"),
                api_hostname: d.get("api_hostname"),
                is_quick_view: d.get("is_quick_view"),
                collection_urls: d.get("collection_urls")
            });
            this.modal = new h.components.back_in_stock.ModalView({
                el: p("<iframe />"),
                model: new h.components.back_in_stock.Modal(f)
            });
            this.modal.render();
            this.$el.append(this.modal.$el)
        },
        variantChange: function(d) {
            if (!this.model.get("is_on_other_page") && !this.model.get("is_on_collections_page") && this.trigger instanceof P.View) {
                d = 1 == this.model.get("variants").length ? this.model.get("variants")[0].id : this.platform_implementation.findSelectedVariantId();
                if (!this.platform_implementation.isValidVariant(d)) {
                    var f = this.settings()
                      , g = f.get("variant_id_element");
                    f = f.get("variant_id_attribute");
                    g && f && (d = p(document).find(g).attr(f))
                }
                if (n.isNull(d)) {
                    var h = this;
                    for (i = 0; 3 > i; i++)
                        n.delay(function() {
                            return h.setVariantAndShowUI(h.platform_implementation.selected_variant_id)
                        }, 1E3)
                } else
                    this.setVariantAndShowUI(d)
            }
        },
        setVariantAndShowUI: function(d) {
            if (n.isUndefined(d) || n.isNull(d))
                this.trigger.hide(),
                n.isUndefined(this.sold_out_button) || this.sold_out_button.show();
            else {
                this.model.get("product");
                var f = this.model.get("variants_by_id")[d] || this.model.get("variants")[0];
                if (!d || isNaN(d))
                    d = f && f.id;
                h.core.log("Selected Variant: " + d);
                this.model.set("selected_variant_id", d);
                this.modal.setSelectedVariantId(d);
                //$('.'+d).trigger('click');
                f || this.trigger.hide();
                this.isVariantOutOfStock(f) ? (n.isUndefined(this.sold_out_button) || !this.trigger.model.get("replace_anchor") && !this.trigger.model.get("replace_sold_out") || this.sold_out_button.hide(),
                this.trigger.show()) : (this.trigger.hide(),
                n.isUndefined(this.sold_out_button) || this.sold_out_button.show())
            }
        },
        isVariantOutOfStock: function(d) {
            var f = this.settings();
            f = {
                inventory_quantity_threshold: f.get("inventory_quantity_threshold"),
                is_allow_for_preorder: f.get("is_allow_for_preorder"),
                is_allow_for_unmanaged_inventory: f.get("is_allow_for_unmanaged_inventory"),
                display_on_policy_continue: f.get("display_on_policy_continue"),
                exclude_on_tags: this.cleanTags(f.get("exclude_on_tags")),
                include_on_tags: this.cleanTags(f.get("include_on_tags")),
                is_quick_view: f.get("is_quick_view"),
                collection_urls: f.get("collection_urls")
            };
            return this.platform_implementation.isVariantOutOfStock(this.model.get("product"), d, f)
        },
        cleanTags: function(d) {
            try {
                var f = d.split(",").filter(String)
            } catch (g) {
                console.log("Tags not read because invalid format.  Please supply strings for included and excluded tags. If there are multiple values, please delimit with commas."),
                f = []
            }
            return f.map(function(d) {
                return d.trim()
            })
        },
        handleBISTriggerClick: function(d) {
          console.log(this);
            d && d.preventDefault() && d.stopPropagation();
            var f = this;
            if (this.model.get("is_on_collections_page")) {
                var g = p(d.currentTarget).data("klaviyo-handle")
                  , h = p(p(d.currentTarget).data("klaviyo-quickview-variant")).val();
                d = f.platform_implementation.productDetailsUrl({
                    product_handle: g
                });
                var t = this.model.get("is_quick_view");
                f.getProductJSON(d, function() {
                    (!n.isUndefined(h) && n.isUndefined(this.modal) || t) && f.createModal();
                    f.showModal(h)
                })
            } else
              console.log('else showModal');
                f.showModal()
        },
        showModal: function(d) {
            var f = this.model.get("product");
          
            d = this.model.get("selected_variant_id") || d || f.variants[0].id;
            d = this.model.get("variants_by_id")[d];
            var g = this.model.get("variants").length
              , h = f.variants;
            this.modal.renderForm(f, d, g, h);
            this.modal.show()
        }
    });
    h.components.back_in_stock.create = function(d, f) {
        d = new h.components.back_in_stock.Settings(d);
        d.set(f);
        return new h.components.back_in_stock.MainView({
            el: document.body,
            model: new h.components.back_in_stock.Main({
                settings: d
            })
        })
    };
    h.components = h.components || {};
    h.components.back_in_stock = h.components.back_in_stock || {};
    h.components.back_in_stock.Trigger = P.Model.extend({});
    h.components.back_in_stock.TriggerView = P.View.extend({
        initialize: function(d) {},
        prepareCollectionPageHelpers: function() {
            var d = p(".klaviyo-product-container")
              , f = p(".klaviyo-button-container")
              , g = {
                display: "inline-block",
                position: "absolute !important",
                top: "50%",
                left: "50%",
                opacity: "0",
                "text-align": this.model.get("collection_page_text_align"),
                width: this.model.get("collection_page_width")
            };
            klaviyo_button_width = g.width.match(/\d+/);
            g["margin-left"] = "-" + Math.round(klaviyo_button_width / 2) + "px";
            d.css({
                overflow: "visible !important",
                position: "initial !important"
            });
            f.css(g);
            d.parent().mouseover(function() {
                p(this).find(f).css("opacity", "1")
            }).mouseout(function() {
                p(this).find(f).css("opacity", "0")
            })
        },
        renderCollectionPageTrigger: function() {
            var d = this.model;
            this.$el.attr("class", d.get("collection_page_class")).addClass("klaviyo-bis-trigger").attr("href", "#").text(d.get("collection_page_text")).css("padding", d.get("collection_page_padding")).css("text-align", d.get("collection_page_text_align"))
        },
        renderProductPageTrigger: function() {
            var d = this.model;
            this.$el.attr("class", d.get("product_page_class")).addClass("klaviyo-bis-trigger").attr("href", "#").text(d.get("product_page_text")).css("text-align", d.get("product_page_text_align")).css("margin", d.get("product_page_margin")).css("width", d.get("product_page_width"))
        },
        show: function() {
            this.$el.show()
        },
        hide: function() {
            this.$el.hide()
        }
    });
    h.components = h.components || {};
    h.components.back_in_stock = h.components.back_in_stock || {};
    n.each({
        "back_in_stock_document.html": '<!doctype html>\x3c!--[if lt IE 7]> <html class="ie6"> <![endif]--\x3e\x3c!--[if IE 7]> <html class="ie7"> <![endif]--\x3e\x3c!--[if IE 8]> <html class="ie8"> <![endif]--\x3e\x3c!--[if gt IE 8]>\x3c!--\x3e <html> \x3c!--<![endif]--\x3e<head><meta name="viewport" content="width=device-width"><style><%= styles %>#container {background: <%= theme.background_color %>;}body {font-family: <%= theme.font_family %>;color: <%= theme.text_color %>;}body.fadein {background: rgba( <%= theme.fade_color_rgb %>, 0.65);}h3 {font-family: <%= theme.headers_font_family %>;}.btn {color: <%= theme.button_text_color %>;background-color: <%= theme.button_background_color %>;border-color: <%= theme.button_background_color %>;}.close {color: <%= theme.close_button_color %>;}.alert-danger {border-color: <%= theme.failure_background_color %>;background-color: <%= theme.failure_background_color %>;color: <%= theme.failure_text_color %>;}.alert-success {background-color: <%= theme.success_background_color %>;border-color: <%= theme.success_background_color %>;color: <%= theme.success_text_color %>;}.alert-success a {color: <%= theme.success_text_color %>;}</style><% if (additional_styles) { %><style><%= additional_styles %></style><% } %></head><body class="klaviyo-bis-close"><div id="klaviyo-bis-modal"><div class="" id="container"><button type="button" class="close klaviyo-bis-close" data-dismiss="modal">&times;</button><h3 class="modal-title"><%= headline %></h3><p><%= body_content %></p><form action="#" class="form-horizontal clearfix"><div class="form-group"><div id="variant_select" class="col-sm-12"><input type="hidden" id="product" value="<%= product.id %>" /></input><select id="variants" class="selectpicker form-control input-lg"><% _.each(unavailable_variants, function (variant) { %><option value="<%= variant.id %>"><%= variant.title %></option><% }) %></select></div></div><div class="form-group"><div class="col-sm-12"><input type="email" id="email" placeholder="<%= email_field_label %>" class="form-control input-lg" value="" /></input></div><div id="newsletter_subscription"><p><input type="checkbox" id="subscribe_for_newsletter" <%= newsletter_subscribe_checked %>><label for="subscribe_for_newsletter" style="margin-left:10px;"><%= newsletter_subscribe_label %></label></p></div></div><div class="control-group clearfix submit-container"><button type="submit" class="btn btn-success btn-lg col-xs-12"><%= button_label %></button></div><div id="error_message" class="error_message alert alert-danger"></div><div id="completed_message" class="completed_message alert alert-success"><%= subscription_success_label %> <a href="#" class="klaviyo-bis-close"><%= close_label %></a></div></form><p class="small-print"><%= footer_content %></p><% if (is_powered_by_link) { %><p class="small-print powered-by text-right">Powered by <a href="https://www.klaviyo.com" target="_blank">Klaviyo</a></p><% } %></div></div>'
    }, function(d, f) {
        h.core.templates.register(f, d)
    });
    h.components.back_in_stock.Modal = P.Model.extend();
    h.components.back_in_stock.ModalView = P.View.extend({
        initialize: function(d) {},
        iframeDocument: function() {
            var d = this.$el[0];
            return d.contentDocument || d.contentWindow.document
        },
        setSelectedVariantId: function(d) {
            this.model.set("selected_variant_id", d)
        },
        render: function(d, f) {
            this.$el.attr({
                id: "klaviyo-bis-iframe",
                frameBorder: 0,
                src: "about:blank",
                allowTransparency: !1
            }).css({
                position: "fixed",
                width: "100%",
                height: "100%",
                top: 0,
                left: 0,
                border: "0",
                overflow: "hidden",
                "z-index": this.model.get("z_index"),
                background: "none"
            }).hide()
        },
        renderForm: function(d, f, g, q) {
            var t = this;
            q = h.core.templates.render("back_in_stock_document.html", {
                variant: f,
                product: d,
                unavailable_variants: q,
                headline: this.model.get("headline").replace("{product_name}", d.title),
                body_content: this.model.get("body_content").replace("{product_name}", d.title),
                email_field_label: this.model.get("email_field_label"),
                email: "",
                newsletter_subscribe_label: this.model.get("newsletter_subscribe_label"),
                newsletter_subscribe_checked: this.model.get("subscribe_checked") ? "checked" : "",
                is_quantity_field_enabled: this.model.get("is_quantity_field_enabled"),
                quantity_required_label: this.model.get("quantity_field_label"),
                button_label: this.model.get("button_label"),
                footer_content: this.model.get("footer_content").replace("{product_name}", d.title),
                close_label: this.model.get("close_label"),
                is_powered_by_link: this.model.get("is_powered_by_link"),
                subscription_success_label: this.model.get("subscription_success_label").replace("{product_name}", d.title),
                styles: this.model.get("styles"),
                additional_styles: this.model.get("additional_styles"),
                theme: {
                    drop_background_color: this.model.get("drop_background_color"),
                    background_color: this.model.get("background_color"),
                    font_family: this.model.get("font_family"),
                    headers_font_family: this.model.get("headers_font_family"),
                    text_color: this.model.get("text_color"),
                    button_text_color: this.model.get("button_text_color"),
                    button_background_color: this.model.get("button_background_color"),
                    close_button_color: this.model.get("close_button_color"),
                    error_background_color: this.model.get("error_background_color"),
                    error_text_color: this.model.get("error_text_color"),
                    success_background_color: this.model.get("success_background_color"),
                    success_text_color: this.model.get("success_text_color")
                }
            });
            d = this.iframeDocument();
            d.open();
            d.write(q);
            d.close();
            q = function(d) {
                p(d.target).hasClass("klaviyo-bis-close") && (d.preventDefault(),
                t.hide())
            }
            ;
            p(d).find("body").on("click", n.bind(q, this)).on("touchend", n.bind(q, this)).find("form").on("submit", n.bind(this.validateAndSubmitForm, this));
            1 === g ? p(d).find("#variant_select").hide() : p(d).find('#variant_select option[value="' + f.id + '"]').prop("selected", !0);
            this.model.get("list") || p(d).find("#newsletter_subscription").hide()
        },
        validateAndSubmitForm: function(d) {
            d.preventDefault();
            var f = this
              , g = p(d.currentTarget);
            d = this.iframeDocument();
            var h = p(d).find("#email").val()
              , n = p(d).find("#subscribe_for_newsletter").prop("checked") && "none" !== p(d).find("#newsletter_subscription")[0].style.display;
            /@/.test(h) && (g.find("button").attr("disabled", !0),
            this.hideErrorMessage(),
            this.hideSuccessMessage(),
            g = "//" + this.model.get("api_hostname") + "/onsite/components/back-in-stock/subscribe",
            p.post(g, {
                a: this.model.get("account"),
                email: h,
                g: this.model.get("list"),
                variant: p(d).find("#variants").val(),
                product: p(d).find("#product").val(),
                platform: this.model.get("platform"),
                subscribe_for_newsletter: n
            }, function(d, g, h) {
                d.success ? (p(f.iframeDocument()).find("form").find("button").hide(),
                f.showSuccessMessage()) : (p(f.iframeDocument()).find("form").find("button").removeAttr("disabled"),
                f.showErrorMessage(d.errors.join(" ")))
            }))
        },
        showSuccessMessage: function() {
            p(this.iframeDocument()).find("#completed_message").show();
            n.delay(n.bind(this.hide, this), 3E5)
        },
        hideSuccessMessage: function() {
            p(this.iframeDocument()).find("#completed_message").hide()
        },
        showErrorMessage: function(d) {
            p(this.iframeDocument()).find("#error_message").text(d).show()
        },
        hideErrorMessage: function() {
            p(this.iframeDocument()).find("#error_message").hide()
        },
        show: function() {
            this.$el.show();
            p(this.iframeDocument()).find("body").addClass("fadein").find('[name="email"]').focus()
        },
        hide: function() {
            this.$el.hide();
            this.hideSuccessMessage();
            p(this.iframeDocument()).find("body").addClass("fadein")
        }
    });
    h.components = h.components || {};
    var da = {
        backinstock: h.components.back_in_stock.create
    };
    h.components.Router = {
        _settings: {
            api_hostname: "a.klaviyo.com",
            logging: !0,
            account: null,
            list: null,
            platform: null
        },
        _components: {},
        init: function(d) {
            n.extend(this._settings, d)
        },
        logging: function(d) {
            h.core.LOGGING_ENABLED = !!d
        },
        enable: function(d, f) {
            this._components[d] || da[d] && (this._components[d] = da[d](this._settings, f))
        }
    };
    var C = t.klaviyo;
    C && C._initialized || (n.isArray(C) || (t.klaviyo = [],
    C = t.klaviyo),
    n.each(["init", "logging", "enable"], function(d) {
        C[d] = function() {
            var f = [].slice.call(arguments);
            return C.push([d].concat(f))
        }
    }),
    K(function(d) {
        h.core.log("Initializing.");
        for (d = function(d) {
            h.core.log("Executing: " + d[0]);
            if (n.isArray(d) && d && h.components.Router[d[0]])
                return h.components.Router[d[0]].apply(h.components.Router, d.slice(1))
        }
        ; C.length; )
            d(C.shift());
        C.push = d;
        C._initialized = !0
    }))
}
)(window);
