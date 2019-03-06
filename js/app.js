
//initialize api sources
//BBC News from Google Api news
var bbc ="https://newsapi.org/v2/everything?sources=bbc-news&apiKey=dff2ba8d21e44c239281120099ade122";
//New York Time from official website
var nyt="https://api.nytimes.com/svc/mostpopular/v2/viewed/7.json?api-key=LmXMOZktAei7mFAgA2SS4VetJDAVNV9t";
//Google news from Google API news
var googlenews="https://newsapi.org/v2/everything?pageSize=100&q=all&apiKey=dff2ba8d21e44c239281120099ade122";

// Initialize varialbes
var main = document.getElementById("main");

var source1=[];
var source2=[];
var source3=[];
var sourceAll=[];
var LoadSource=[];
var fullAtricleMap=[];
var index=0;
//synchorize data 	
Promise.all
([
$.get(nyt,function(data){ajaxCallback(data,1)}),
$.get(bbc,function(data){ajaxCallback(data,2)}),
$.get(googlenews,function(data){ajaxCallback(data,3)})
]).then(function(resolve){

sourceAll=source1.concat(source2).concat(source3);
LoadSource.sort(function(a, b) {
  return a.title == b.title? 0:(a.title > b.title ? 1 : -1);
});
LoadSource=sourceAll;
LoadPage(LoadSource,index);

$("#wait").hide();
$("#btn").css('visibility', 'visible');
});

function LoadPage(source,index)
{
var last=index+20;
if(source.length < last)
{	
  last=source.length;
  $("#btn").css('visibility', 'hidden');
}
	for (i = index; i < last ; i++)
	{	
    main.appendChild(source[i]);
	}
	

this.index+=20;	
}

function clearmain()
{
    while (main.firstChild) {
    main.removeChild(main.firstChild);
    }
	index=0;
}

function getSource(src)
{
	clearmain();
$("#btn").css('visibility', 'hidden');
$("#wait").show();

setTimeout(function(){
	LoadSource=src;
LoadPage(LoadSource,index);
$("#btn").css('visibility', 'visible');
$("#wait").hide();
},300);
}

$("#source1").click(function(){getSource(source1)});
$("#source2").click(function(){getSource(source2)});
$("#source3").click(function(){getSource(source3)});
$("#home").click(function(){getSource(sourceAll)});

$("#btn").click(function(){LoadPage(LoadSource,index)});

// mapping data from API to DOM
 function ajaxCallback(response,source){
  
  var count=0;

  var loop=source == 1 ?response.results :response.articles;
    loop.forEach(function (article) {
		var title = article.title;
		var url = article.url;
		var idAr="id"+count.toString();
		if(source==1){
		var imgsrc = article.media[0]["media-metadata"][0].url;
		var categ = article.section;
		var views = article.published_date;
		var content=article.abstract;
		}
		else
		{
		var imgsrc = article.urlToImage;
		var categ = article.description.split(",")[0];
		var views = article.publishedAt;
		var content=article.content;
		}
		
		
		//map list with article
		fullAtricleMap.push({'id':idAr,'content':content,'url':url,'title':title});	
		count++;
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
		h3.id=idAr;
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
		
		switch(source){
		case 1:source1.push(art);
		break;
		case 2:source2.push(art);
		break;
		case 3:source3.push(art);
		break;
		default:
		break;
		}
  })
}





function getEventTarget(e) {
    e = e || window.event;
    return e.target || e.srcElement; 
}

$(".closePopUp").click( function(event){
$('#popUp').hide();
});


$("#main").click( function(event) {
var target = getEventTarget(event);
if(target.tagName=="H3")
{
var result=$.grep(fullAtricleMap, function(el){ return el.id == target.id; });
  
  document.getElementById("title").innerHTML=result[0].title;
    document.getElementById("content").innerHTML=result[0].content;;
  document.getElementById("link").href=result[0].url;
$('#popUp').show();
}
});



