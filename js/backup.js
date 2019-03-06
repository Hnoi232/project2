function ajaxGet(url, callback) {
    var req = new XMLHttpRequest();
    req.open("GET", url);
    req.addEventListener("load", function () {
        if (req.status >= 200 && req.status < 400) {
            // Appelle la fonction callback en lui passant la réponse de la requête
            callback(req.responseText);
        } else {
            console.error(req.status + " " + req.statusText + " " + url);
        }
    });
    req.addEventListener("error", function () {
        console.error("Erreur réseau avec l'URL " + url);
    });
    req.send(null);
}


var main = document.getElementById("main");
if(false){
ajaxGet("https://api.nytimes.com/svc/mostpopular/v2/viewed/7.json?api-key=LmXMOZktAei7mFAgA2SS4VetJDAVNV9t", function (reponse) {

    var articles = JSON.parse(reponse);
    articles.results.forEach(function (article) {
		
		var imgsrc = article.media[0]["media-metadata"][0].url;
			//alert(article.media[0]["media-metadata"][0].url);

		var title = article.title;
		var categ = article.section;
		var views = article.published_date;
		var content=article.abstract;
		// Initialize images				
		var sectionImg = document.createElement("section");
		var image = document.createElement("img");
		image.src=imgsrc;
		sectionImg.className=("featuredImage");
		sectionImg.appendChild(image);
		
		
		// Initialize article Title + Categorie				
		var h3 = document.createElement("h3");
		var h6 = document.createElement("h6");
        h3.textContent = title;
		h6.textContent = categ;
		var sectionArt = document.createElement("section");
		sectionArt.className= ("articleContent");
		sectionArt.appendChild(h3);
		sectionArt.appendChild(h6);


		// Initialize Impression
			var sectionImpr = document.createElement("section");
			sectionImpr.className=("impressions");
			sectionImpr.textContent=views	;
			
		//Initialize  element of articles list
		var art=document.createElement("article")
		art.className= ("article");
		art.appendChild(sectionImg);
		art.appendChild(sectionArt);
		art.appendChild(sectionImpr);
        art.innerHTML+="<div class='clearfix'></div>";
        main.appendChild(art);
		
		
		
    });
});
}
else
{
	ajaxGet("https://newsapi.org/v2/everything?pageSize=100&q=all&apiKey=dff2ba8d21e44c239281120099ade122", function (reponse) {

    var articles = JSON.parse(reponse);
    articles.articles.forEach(function (article) {
		
		var imgsrc = article.urlToImage;
		var title = article.title;
		var categ = article.description;
		var views = article.publishedAt;
		var content=article.content;
		// Initialize images				
		var sectionImg = document.createElement("section");
		var image = document.createElement("img");
		image.src=imgsrc;
		sectionImg.className=("featuredImage");
		sectionImg.appendChild(image);
		
		
		// Initialize article Title + Categorie				
		var h3 = document.createElement("h3");
		var h6 = document.createElement("h6");
        h3.textContent = title;
		h6.textContent = categ;
		var sectionArt = document.createElement("section");
		sectionArt.className= ("articleContent");
		sectionArt.appendChild(h3);
		sectionArt.appendChild(h6);


		// Initialize Impression
			var sectionImpr = document.createElement("section");
			sectionImpr.className=("impressions");
			sectionImpr.textContent=views	;
			
		//Initialize  element of articles list
		var art=document.createElement("article")
		art.className= ("article");
		art.appendChild(sectionImg);
		art.appendChild(sectionArt);
		art.appendChild(sectionImpr);
        art.innerHTML+="<div class='clearfix'></div>";
        main.appendChild(art);
		
		
		
    });
});
}
$.get("https://api.nytimes.com/svc/mostpopular/v2/viewed/7.json?api-key=LmXMOZktAei7mFAgA2SS4VetJDAVNV9t", function(reponse){
  

    reponse.results.forEach(function (article) {
		
		var imgsrc = article.media[0]["media-metadata"][0].url;
			//alert(article.media[0]["media-metadata"][0].url);

		var title = article.title;
		var categ = article.section;
		var views = article.published_date;
		var content=article.abstract;
		// Initialize images				
		var sectionImg = document.createElement("section");
		var image = document.createElement("img");
		image.src=imgsrc;
		sectionImg.className=("featuredImage");
		sectionImg.appendChild(image);
		
		
		// Initialize article Title + Categorie				
		var h3 = document.createElement("h3");
		var h6 = document.createElement("h6");
        h3.textContent = title;
		h6.textContent = categ;
		var sectionArt = document.createElement("section");
		sectionArt.className= ("articleContent");
		sectionArt.appendChild(h3);
		sectionArt.appendChild(h6);


		// Initialize Impression
			var sectionImpr = document.createElement("section");
			sectionImpr.className=("impressions");
			sectionImpr.textContent=views	;
			
		//Initialize  element of articles list
		var art=document.createElement("article")
		art.className= ("article");
		art.appendChild(sectionImg);
		art.appendChild(sectionArt);
		art.appendChild(sectionImpr);
        art.innerHTML+="<div class='clearfix'></div>";
        main.appendChild(art);
		
  })
})
