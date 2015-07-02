/*
	NiceRange-HTML5 - 1.1.0
	https://github.com/Mr21/nicerange-html5
*/

jQuery.element({
	name: "nicerange",
	html:
		'<input type="text" class="nb">'+
		'<span class="btn"></span>'+
		'<span class="rngContainer">'+
			'<input class="rng" type="range">'+
		'</span>'
	,
	css: '\
		input.nicerange {\
			display: none;\
			}\
		.nicerange {\
			display: inline-block;\
			position: relative;\
			font-size: 10px;\
			vertical-align: middle;\
			line-height: 1em;\
		}\
		.nicerange > * {\
			vertical-align: middle;\
		}\
		.nicerange .nb {\
			width: 4em;\
			padding: 0 0 0 .3em;\
			font-size: inherit;\
			line-height: 1.5em;\
			border: 0;\
			border-radius: 2px 0 0 2px;\
			color: #fff;\
			background: #555;\
		}\
		.nicerange .nb:focus {\
			color: #222;\
			background: #fff;\
		}\
		.nicerange .btn {\
			display: inline-block;\
			width: 1.8em;\
			background: #77f;\
			border-radius: 0 2px 2px 0;\
			line-height: 1.5em;\
			text-align: center;\
			color: #fff;\
			cursor: pointer;\
		}\
		.nicerange .btn:after {\
			display: block;\
			content: "\\25BC";\
			font-size: 10px;\
			transform: scale(1, .65);\
		}\
		.nicerange .rngContainer {\
			box-sizing: border-box;\
			position: absolute;\
			z-index: 2147483647;\
			top: 100%;\
			left: 50%;\
			margin: 4px 0 0 -50px;\
			width: 100px;\
			padding: 4px 8px;\
			line-height: 0;\
			background: #555;\
			border-radius: 3px;\
			transition: all .2s;\
			visibility: hidden;\
			opacity: 0;\
		}\
		.nicerange.open .rngContainer {\
			visibility: visible;\
			opacity: 1;\
		}\
		.nicerange .rng {\
			width: 100%;\
			margin: 0;\
			outline: 0;\
		}\
	',
	init: function() {
		var
			jqElement = this.jqElement,
			elTxt,
			elRng
		;

		function setVal() {
			elTxt.value = elRng.value + (jqElement[0].dataset.unit || "");
		}

		jqElement
			.children(".btn")
				.click(function() {
					var op = !jqElement.hasClass("open");
					jqElement.toggleClass("open", op);
					if (op) {
						setTimeout(function() { elRng.focus(); }, 125);
					}
				})
		;

		elTxt =
		jqElement
			.children(".nb")
				.click(function() {
					this.select();
				})
				.change(function() {
					elRng.value = elTxt.value;
					setVal();
					elTxt.blur();
				})
		[0];

		elRng =
		jqElement
			.find(".rng")
				.attr({
					min:   jqElement.data("min"),
					max:   jqElement.data("max"),
					step:  jqElement.data("step"),
					value: jqElement.data("value")
				})
				.on("change input", setVal)
				.blur(function() {
					jqElement.removeClass("open");
				})
		[0];

		setVal();
	}
});
