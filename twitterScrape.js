(function(){
	var p = {
		version : 1,
		date : "17 Sep 2016",
		counter : 0,
		deltaT : 500000,
		srcA : [],
		elTweetContainer : document.querySelector("ol.stream-items"),
		elTweetA : [],
		ll : function(){}, // overridden in main()
		// query selector down array [all]
		qdA:function(el,m){
			if (typeof m === "undefined"){m = el;el = document.body;} // alternate use
			if (el === null){return null;}
			var res = [];
			var elA = el.querySelectorAll(m);
			for (var i = 0; i < elA.length; i++){
				res.push(elA[i]);}
			return res;},
		scroll : function(){
			// document.body.scrollTop document.body.scrollHeight
			// in-field practical solution to scroll to bottom is to alternate top and bottom
			window.scrollTo(0,this.counter%2===0?document.body.scrollHeight:0);},
		saveLinkAsFile : function(url){
			var downloadLink = document.createElement("a");
			downloadLink.download = ""; // this attribute must be set to something
			; // cannot set download name because either 
			; // (1) twitter sets that in the headers and that overrides our attribute here "If the HTTP header Content-Disposition: is present and gives a different filename than this attribute, the HTTP header has priority over this attribute." https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a [September 2016]
			; // (2) pbs.twimg.com doesn't count as the same origin "This attribute is only honored for links to resources with the same-origin." https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a [September 2016]
			// Firefox requires the link to be added to the DOM before it can be clicked.
			downloadLink.href = url;
			downloadLink.onclick = function(event){document.body.removeChild(event.target);};
			downloadLink.style.display = "none";
			document.body.appendChild(downloadLink);
			downloadLink.click();},
		setup : function(){
			var el = document.createElement("div");
			el.style.position = "fixed";
			el.style.top  = "45px";
			el.style.left = "0px";
			el.style.backgroundColor = "hsla(0,0%,100%,0.9)";
			el.style.padding = "20px";
			el.style.border = "1px solid black";
			el.style.zIndex = "9999999";
			var el_aa = document.createElement("div");
			el_aa.innerHTML = "<span style=\"font-weight:bold;font-size:120%;\">Twitter Media Scraper Version "+this.version+" ["+this.date+"]</span><br>Usage instructions: Make sure you are viewing a user's \"media\" feed. That feed only contains images and videos. As of September 2016, this can be found at \"https://twitter.com/[[[USERNAME_HERE]]]/media\". Once you have that feed loaded, click the relevant link/button below to start the scraper, which will look for all tweet image links and download them in staggered parallel as soon as they are encountered.<br><br>! This scraper will download potentially hundreds of images in a very short period of time. Please be considerate of any people that you may be sharing your internet connection with. Also, please be mindful of either the loaded Twitter page or your web browser exploding from trying to download several images in parallel. Above all, please be certain that you've properly set up your target download folder, so that, for example, your Desktop doesn't get flooded with hundreds of files.<br><br>If you're nervous, try clicking the relevant link/button below to download three dummy files.<br><br>This page has now been messed up from running this script. If you want to browse another twitter page, just go ahead and click away. If you want to use ~this~ page, you should probably reload it so that everything is hooked up correctly.<br><br><a href=\"https://github.com/sliceofcake/TwitterMediaScraper\">https://github.com/sliceofcake/TwitterMediaScraper</a><br><br>";
			var el_ab = document.createElement("button");
			el_ab.style.display = "block";
			el_ab.textContent = "click here to download three dummy files";
			el_ab.addEventListener("click",function(p){return function(){p.saveLinkAsFile("https://twitter.com");p.saveLinkAsFile("https://twitter.com");p.saveLinkAsFile("https://twitter.com");};}(this));
			var el_ac = document.createElement("button");
			el_ac.style.display = "block";
			el_ac.textContent = "click here to download all media";
			el_ac.addEventListener("click",function(p){return function(){p.main();};}(this));
			el.appendChild(el_aa);
			el.appendChild(el_ab);
			el.appendChild(el_ac);
			document.body.appendChild(el);},
		main : function(){
			// take back console.log from the wicked clutches of the Twitter dev team
			var el = document.createElement("iframe");
			el.style.display = "none";
			document.body.appendChild(el);
			this.ll = el.contentWindow.console.log;
			; // don't remove the el, or the function will go away ... in-field
			// hide the tweets to save wasted rendering flames
			var el = document.createElement("style");
			el.textContent = "li.stream-item {visibility:hidden;}";
			document.head.appendChild(el);
			// start the cycle of scraping
			this.cycle();},
		cycle : function(){this.ll(this.counter++);
			var elEnd = document.querySelector(".timeline-end");
			var stopF = !elEnd.classList.contains("has-more-items");
			var elTweetA = this.qdA("li.stream-item");
			
			// if we still have future tweets but they haven't loaded over the network yet, wait
			if (!stopF && elTweetA.length === this.elTweetA.length){
				this.ll("waiting...");
				this.scroll();
				setTimeout(function(p){return function(){p.cycle();};}(this),this.deltaT/1000);
				return;}
			
			// remove the old tweets after we see a new batch [removing only after seeing new tweets load, based on twitter loading logic voodoo]
			for (var this_elTweetAI = 0,this_elTweetAC = this.elTweetA.length; this_elTweetAI < this_elTweetAC; this_elTweetAI++){var this_elTweet = this.elTweetA[this_elTweetAI];
				this.elTweetContainer.removeChild(this_elTweet);}
			this.elTweetA = this.qdA("li.stream-item"); // we only want the new batch
			window.scrollTo(0,0);
			
			var elImgA = this.qdA(".AdaptiveMedia img");
			
			// remember image links
			for (var elImgAI = 0,elImgAC = elImgA.length; elImgAI < elImgAC; elImgAI++){var elImg = elImgA[elImgAI];
				this.ll(elImg.src+":orig");
				this.saveLinkAsFile(elImg.src+":orig");
				this.srcA.push(elImg.src+":orig");}
			
			// scroll down to start loading more tweets over the network [before removing the already-accounted-for-tweets]
			this.scroll();
			
			if (stopF){
				this.ll(JSON.stringify(this.srcA));
				this.ll(this.srcA.length+" images stored");
				return;}
			else{
				setTimeout(function(p){return function(){p.cycle();};}(this),this.deltaT/1000);}},
	};
	p.setup();
})();