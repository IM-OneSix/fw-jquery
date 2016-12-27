(function() {
// ==============================
si.service("util",function(t){
	function p(t,r,n){return t.split(r).join(n)}
	function a1(t){return null===t}
	function a2(t){return void 0===t}
	function a3(t){return r(t)||n(t)||""===l(t)?!0:!1}
	function a4(t){return/^[A-Za-z0-9]+$/.test(t)}
	function a5(t){return/^[0-9]+$/.test(t)}
	function a6(t){return/^[A-Za-z]+$/.test(t)}
	function a7(t){return/^[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]+$/.test(t)}
	function a8(t){return t.length}
	function a9(t){return/^[a-z|A-Z|ㄱ-ㅎ|ㅏ-ㅣ|가-힝|0-9]+$/.test(t)}
	function b1(t){
		for(var r=0,n=0,e=0;e=t.charCodeAt(n++);r+=e>>11?3:e>>7?2:1);
			return r
	}
	function b2(t){return t.replace(/^\s+|\s+$/g,"")}
	function b3(t){return t.replace(/^\s+/,"")}
	function b4(t){return t.replace(/\s+$/,"")}
	function b5(t,r,n){for(r-=c(t);r>0;r--)t=n+t;return t}
	function b6(t,r,n){for(r-=c(t);r>0;r--)t+=n;return t}
	function b7(t){
		for(s(t)&&(t=""+t),t=t.split(".");/(\d+)(\d{3})/.test(t[0]);)
			t[0]=t[0].replace(/(\d+)(\d{3})/,"$1,$2");
		return t.join(".")
	}
	function b8(t){
		s(t)&&(t+="");
		var r={n:["","일","이","삼","사","오","육","칠","팔","구"],
		u:["","십","백","천","만","십","백","천","억","십","백","천","조","십"]},
		n=0,e="",u=0;
		for(i=0;i<t.length;i++)
			u=t.length-i-1,e+=r.n[t.substr(i,1)],
			"0"==t.substr(i,1)?
			(n++,u%4==0&&4>n&&(n=0,e+=r.u[u]?r.u[u]:"")):
			(n=0,e+=r.u[u]?r.u[u]:"");
			return e
	}
	function b9(t){
		if(e(t)||8!=c(t))
			return!1;
		var r=Number(t.substring(0,4)),
		n=Number(t.substring(4,6)),
		u=Number(t.substring(6,8));
		if(1>n||n>12)return!1;
		var i=[31,28,31,30,31,30,31,31,30,31,30,31],
		s=i[n-1];
		return 2==n&&(r%4==0&&r%100!=0||r%400==0)&&(s=29),
		1>u||u>s?!1:!0
	}
	function c1(t){
		if(e(t)||6!=c(t))
			return!1;
		var r=Number(t.substring(0,2)),
		n=Number(t.substring(2,4)),
		t=Number(t.substring(4,6));
		return 0>r||r>23?!1:0>n||n>59?!1:0>t||t>59?!1:!0
	}
	function c2(t){
		var r=t.split(" "),
		n=r[0],e="000000";
		if(2==r.length&&
			(e=r[1]),14==c(t)&&
			(n=t.substring(0,8),e=t.substring(8,14)),
			!D(n))
			return null;
		if(!N(e))
			return null;
		var u=n.substring(0,4),
		i=Number(n.substring(4,6))-1,
		s=n.substring(6,8),
		a=e.substring(0,2),
		o=e.substring(2,4),
		f=e.substring(4,6);
		return new Date(u,m(""+i,2,"0"),s,a,o,f)
	}
	function c3(t,r){
		var n=toString.call(t);
		return"[object Date]"===n?
		r.replace(/(yyyy|yy|MM|dd|hh24|hh|mi|ss|ms|a\/p)/gi,function(r){
			switch(r){
				case"yyyy":return""+t.getFullYear();
				case"yy":return m(""+t.getFullYear()%1e3,4,"0").substring(2,4);
				case"MM":return m(""+(t.getMonth()+1),2,"0");
				case"dd":return m(""+t.getDate(),2,"0");
				case"hh24":return m(""+t.getHours(),2,"0");
				case"hh":return m(""+((h=t.getHours()%12)?h:12),2,"0");
				case"mi":return m(""+t.getMinutes(),2,"0");
				case"ss":return m(""+t.getSeconds(),2,"0");
				case"ms":return m(""+t.getMilliseconds(),3,"0");
				case"a/p":return t.getHours()<12?"오전":"오후";default:return r
			}
		}):
		"[object String]"===n?T($(t),r):""
	}
	function c4(t){
		if(!D(t))return"";
		var r=["일","월","화","수","목","금","토"];
		return r[$(t).getDay()]
	}
	function c5(t,r){
		var n=$(t),
		e=$(r),
		u=e.getTime()-n.getTime();
		return Math.floor(u/864e5)
	}
	function c6(t,r){
		var n=$(t),
		e=$(r),
		u=e.getTime()-n.getTime();
		return Math.floor(u/36e5)
	}
	function c7(t,r,n){
		var e=$(t);
		return e.setDate(e.getDate()+r),T(e,n||"yyyyMMdd")
	}
	function c8(t,r,n){
		var e=$(t);
		return e.setMonth(e.getMonth()+r),T(e,n||"yyyyMMdd")
	}
	function c9(t,r,n){
		var e=$(t);
		return e.setFullYear(e.getFullYear()+r),T(e,n||"yyyyMMdd")
	}
	function d1(t,r){
		var n=$(t);
		return n.setMonth(n.getMonth()+1),n.setDate(0),T(n,r||"yyyyMMdd")
	}
	function d2(t){return parseInt(t,10)}
	function d3(t){return parseFloat(t,10)}
	function d4(t){
		return/^([0-9a-zA-Z]+)([0-9a-zA-Z\._-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,3}$/.test(t)
	}
	function d5(t){
		return t=L(t),/^\d{2,3}-\d{3,4}-\d{4}$/.test(t)
	}
	function d6(t){
		return t=L(t),/^(?:(010-?\d{4})|(01[1|6|7|8|9]-?\d{3,4}))-?(\d{4})$/.test(t)
	}
	function d7(t){
		return t=p(t,"=",""),
		12==t.length?
		t.substring(0,4)+"-"+t.substring(4,8)+"-"+t.substring(8,12):
		t.replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/,"$1-$2-$3")
	}
	function d8(t){var r=JSON.stringify(t);return encodeURIComponent(r)}
	function d9(t){var t=decodeURIComponent(t);return JSON.parse(t)}
	function e1(r,n){
		var t=0;
		return _.isString(r)&&
		""!=r&&_.isString(n)&&
		""!=n?_.map(n,function(n){
			return"x"==n?r.charAt(t++):n
		}).join(""):""
	}
	return{
		isNull:a1,
		isUndefined:a2,
		isEmpty:a3,
		isAlphaNumeric:a4,
		isNumeric:a5,
		isAlpha:a6,
		isHangul:a7,
		isAlphaHangulNumeric:a9,
		isEmail:d4,
		isTel:d5,
		isMobile:d6,
		isDate:b9,
		isTime:c1,
		getLength:a8,
		getByteLength:b1,
		trim:b2,
		leftTrim:b3,
		rightTrim:b4,
		leftPad:b5,
		rightPad:b6,
		addCommas:b7,
		numToKr:b8,
		strToDate:c2,
		formatDate:c3,
		getDayOfWeek:c4,
		getDiffDay:c5,
		getDiffTime:c6,
		addDays:c7,
		addMonths:c8,
		addYears:c9,
		getLastDay:d1,
		strToInt:d2,
		strToFloat:d3,
		phoneFormat:d7,
		strFormat:e1,
		encodeJSONString:d8,
		decodeJSONParse:d9
	}
});

})();