/**
 * Timeago is a jQuery plugin that makes it easy to support automatically
 * updating fuzzy timestamps (e.g. "4 minutes ago" or "about 1 day ago").
 *
 * @name timeago
 * @version 0.10.0
 * @requires jQuery v1.2.3+
 * @author Ryan McGeary
 * @license MIT License - http://www.opensource.org/licenses/mit-license.php
 *
 * For usage and examples, visit:
 * http://timeago.yarp.com/
 *
 * Copyright (c) 2008-2011, Ryan McGeary (ryanonjavascript -[at]- mcgeary [*dot*] org)
 */
(function(a){function b(){var b=c(this);return isNaN(b.datetime)||a(this).text(d(b.datetime)),this}function c(b){b=a(b);if(!b.data("timeago")){b.data("timeago",{datetime:f.datetime(b)});var c=a.trim(b.text());c.length>0&&b.attr("title",c)}return b.data("timeago")}function d(a){return f.inWords(e(a))}function e(a){return(new Date).getTime()-a.getTime()}a.timeago=function(b){return b instanceof Date?d(b):typeof b=="string"?d(a.timeago.parse(b)):d(a.timeago.datetime(b))};var f=a.timeago;a.extend(a.timeago,{settings:{refreshMillis:6e4,allowFuture:!1,strings:{prefixAgo:null,prefixFromNow:null,suffixAgo:"ago",suffixFromNow:"from now",seconds:"less than a minute",minute:"about a minute",minutes:"%d minutes",hour:"about an hour",hours:"about %d hours",day:"a day",days:"%d days",month:"about a month",months:"%d months",year:"about a year",years:"%d years",numbers:[]}},inWords:function(b){function c(c,e){var f=a.isFunction(c)?c(e,b):c,g=d.numbers&&d.numbers[e]||e;return f.replace(/%d/i,g)}var d=this.settings.strings,e=d.prefixAgo,f=d.suffixAgo;this.settings.allowFuture&&b<0&&(e=d.prefixFromNow,f=d.suffixFromNow);var g=Math.abs(b)/1e3,h=g/60,i=h/60,j=i/24,k=j/365,l=g<45&&c(d.seconds,Math.round(g))||g<90&&c(d.minute,1)||h<45&&c(d.minutes,Math.round(h))||h<90&&c(d.hour,1)||i<24&&c(d.hours,Math.round(i))||i<48&&c(d.day,1)||j<30&&c(d.days,Math.floor(j))||j<60&&c(d.month,1)||j<365&&c(d.months,Math.floor(j/30))||k<2&&c(d.year,1)||c(d.years,Math.floor(k));return a.trim([e,l,f].join(" "))},parse:function(b){var c=a.trim(b);return c=c.replace(/\.\d\d\d+/,""),c=c.replace(/-/,"/").replace(/-/,"/"),c=c.replace(/T/," ").replace(/Z/," UTC"),c=c.replace(/([\+\-]\d\d)\:?(\d\d)/," $1$2"),new Date(c)},datetime:function(b){var c=a(b).get(0).tagName.toLowerCase()==="time",d=c?a(b).attr("datetime"):a(b).attr("title");return f.parse(d)}}),a.fn.timeago=function(){var a=this;a.each(b);var c=f.settings;return c.refreshMillis>0&&setInterval(function(){a.each(b)},c.refreshMillis),a},document.createElement("abbr"),document.createElement("time")})(jQuery)