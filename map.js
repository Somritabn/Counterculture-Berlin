// Global variables
var mapCenter = [13.405980, 52.516920];
var mapZoom = 11;


// --------------------------------------------------------
// 1. Initialize map
    mapboxgl.accessToken = 'pk.eyJ1Ijoic29tcml0YSIsImEiOiJja2YwbzYzMm8xcmprMnlsOWluNGdld3liIn0._2yQ-kSet_G3Wr39HqtCUw'; // replace this value with your own access token from Mapbox Studio

    // for more mapboxgl.Map options, see https://docs.mapbox.com/mapbox-gl-js/api/#map)
    var map = new mapboxgl.Map({
    	container: 'map', // this is the ID of the div in index.html where the map should go
        center: [13.413161, 52.513910], // set the centerpoint of the map programatically. Note that this is [longitude, latitude]!
        zoom: 9.51, // set the default zoom programatically
    	style: 'mapbox://styles/somrita/cl55tdqv4002b14mpvm3xaejf', // replace this value with the style URL from Mapbox Studio
    });

// -------------------------------------------------------- 
// 2. Show/hide layers
// See example at https://www.mapbox.com/mapbox-gl-js/example/toggle-layers/
    
    var layers = [  // an array of the layers you want to include in the layers control (layers to turn off and on)

        // [MapboxlayerName, layerDisplayName]
        /*['Commercial'+'Residential'+'Industrial'+'Colleges'+'My parks', 'Landuse'],*/             // 'Point_O':layers[0][0],'PizzaHut': layers[0][1]     
        ['Migrant Population Density', 'Migrant Population Density'],
        ['My camera surveillance', 'Surveillance'],
        ['transit-stop-label', 'Transit stops'],
        ['My Art Museum Monument', 'Art establishments'],
        ['Nightlife', 'Nightlife'],
        ['Tourist spot', 'Tourist spots'],
        ['building (1)', '3D Buildings'],
        /*['Anchors points'+'Anchors polygons'+'Anchors labels', 'Anchors'],*/
        // add additional live data layers here as needed  
    ]; 


    //DON'T CHANGE
    //functions to perform when map loads
    map.on('load', function () {     
        for (i=0; i<layers.length; i++) {
            // add a button for each layer
            $("#layers-control").append("<a href='#' class='button-default' id='" + layers[i][0] + "'>" + layers[i][1] + "</a>"); // see http://api.jquery.com/append/
        }

        // show/hide layers when button is clicked
        $("#layers-control>a").on('click', function(e) {
                var clickedLayer = e.target.id;
                e.preventDefault();
                e.stopPropagation();
            
                var visibility = map.getLayoutProperty(clickedLayer, 'visibility');  
                //see https://www.mapbox.com/mapbox-gl-js/api/#map#getlayoutproperty
                console.log(visibility);

                if (visibility === 'visible') {
                    map.setLayoutProperty(clickedLayer, 'visibility', 'none'); //https://www.mapbox.com/mapbox-gl-js/api/#map#setlayoutproperty
                    $(e.target).removeClass('active');
                } else {
                    $(e.target).addClass('active');
                    map.setLayoutProperty(clickedLayer, 'visibility', 'visible'); 
                    //see https://www.mapbox.com/mapbox-gl-js/api/#map#setlayoutproperty
                }
        });  
    });


// -------------------------------------------------------- 
// 3. Scroll to zoom through sites
// See example at https://docs.mapbox.com/mapbox-gl-js/example/scroll-fly-to/
    
    // A JavaScript object containing all of the data for each site "chapter" (the sites to zoom to while scrolling)

      var chapters = {
        'chapter01': {
            name: "Introduction",
            description: "Map of Migrant population density"+"<br><br>"+"Berlin has historically welcomed refugees and migrants. With support from the government and policymakers, this has shaped the identity of the city as a cultural nexus ",
            bearing: 0,
            center: [13.413161, 52.513910],
            zoom: 9.51,
            pitch: 0,
            layersVis:['Migrant Population Density','Background'], 
            layersHide:['My water','My parks','landuse','national-park','land','My camera surveillance','transit-stop-label','My Art Museum Monument','Nightlife','Tourist spot','building (1)','Commercial','Residential','Industrial','Colleges','Anchors points','Anchors polygons','Anchors labels','Neighborhood Outlines'],
        },
          
        'chapter02': {
            name: "cultural enclaves",
            description: "Map overlay of industrial sites"+"<br><br>"+"This migrant population largely settled around exisitng industrial areas with a high density centered around the core of the city.",
            bearing: 0,
            center: [13.413161, 52.513910],
            zoom: 10.8,
            pitch: 0,
            layersVis:['Migrant Population Density','Background','industrial copy'], 
            layersHide:['Commercial','Residential','Industrial','Colleges','Anchors points','Anchors polygons','Anchors labels','My camera surveillance','transit-stop-label','My Art Museum Monument','Nightlife','Tourist spot','building (1)'],
            speed:0.5,
        },
        
        'chapter03': {
            name: "Rise of anchors of counterculture",
            description: "Map overlay of historic anchor sites"+"<br><br>"+"The clash of a range of migrant cultures with each other and the city was projected into the new spaces of counterculture that anchored these neighborhoods.",
            bearing: 0,
            center: [13.413161, 52.513910],
            zoom: 10.8,
            pitch: 0,
            layersVis:['Migrant Population Density','Anchors points','Anchors polygons','Anchors labels','Background','industrial copy'], 
            layersHide:['My parks','landuse','national-park','land','My water','Commercial','Residential','Industrial','Colleges','My camera surveillance','transit-stop-label','My Art Museum Monument','Nightlife','Tourist spot','building (1)'],
            speed:0.5,
        },
          
        'chapter04': {
            name: "Counterculture Commodified",
            description: "Heatmap of tourist sites overlay"+"<br><br>"+"There was a unique authenticity to countercuture but after the fall of the Berlin Wall it began to get commodified and over time was repackakged and sold back to people as a new form of cultural capital. The most apparent marker of this is in the conversion of these anchor spaces into tourist hotspots. Tourism attracted new investment into transit and real estate that triggered the process of gentrification in these neighborhoods.",
            bearing: 0,
            center: [13.413161, 52.513910],
            zoom: 10.8,
            pitch: 0,
            layersVis:['Migrant Population Density','Anchors points','Anchors polygons','Anchors labels','Background','industrial copy','Tourist spot'], 
            layersHide:['My parks','landuse','national-park','land','My water','Commercial','Residential','Industrial','Colleges','My camera surveillance','transit-stop-label','My Art Museum Monument','Nightlife','building (1)'],
            speed:0.5,
        },

       
        'chapter05': {
            name: "Kreuzberg : Stage 1",
            description: "Zoom in to Kreuzberg and nightlife and art establishment sites overlay"+"<br><br>"+"Once the heart of West Berlin Punk where historic squats like Kopi and SO36 club still stand despite clashes with the authorities in a rapidly gentrifying district. With a rising hipster scene of creative start-ups and digital media, anti-gentrification groups say locals are being displaced by a city-wide lack of affordable family housing and rising costs.",
            bearing: 0,
            center: [13.430098, 52.498089],
            zoom: 12.69,
            pitch: 0,
            layersVis:['industrial copy','My water','Anchors points','Anchors polygons','Anchors labels','My parks','My Art Museum Monument','Nightlife','Tourist spot'], 
            layersHide:['Neighborhood Outlines','Commercial','Residential','Industrial','Colleges','Migrant Population Density','My camera surveillance','transit-stop-label','building (1)'],
            speed:0.5,
        },
        
        'chapter06': {
            name: "Neukolln : Stage 2",
            description: "Zoom in to Neukolln and nightlife and art establishment sites overlay"+"<br><br>"+"Neukolln has seen a complete transformation in recent years, with the traditionally working-class neighbourhood attracting more artists and immigrants. With reputation for crime and violence, the ‘Bronx of Berlin’ transformed as it got mentioned in more and more travel guides to Berlin. Since 2007, it has seen a dramatic rent increase though it is denied by policymakers.",
            bearing: 0,
            center: [13.426252, 52.483198],
            zoom: 12.69,
            pitch: 0,
            layersVis:['industrial copy','My water','Anchors points','Anchors polygons','Anchors labels','My parks','My Art Museum Monument','Nightlife','Tourist spot'], 
            layersHide:['Neighborhood Outlines','Commercial','Residential','Industrial','Colleges','Migrant Population Density','My camera surveillance','transit-stop-label','building (1)'],
            speed:0.5,
        },
        
        'chapter07': {
            name: "Wedding : Stage 3",
            description: "Zoom in to Wedding and nightlife and art establishment sites overlay"+"<br><br>"+"Wedding is a historically working-class area with a large population of migrants that has recently begun to develop a high concentration of artistic spaces. Though it is primed for gentrification, municipal policies in social housing development and neighbourhood management offices have allowed for socioeconomic diversity to somewhat coexist alongside its development as an artistic hub."+"<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>",
            //imagepath: "img/McIntire Park.jpg",
            bearing: 0,
            center: [13.341221, 52.555607],
            zoom:12.69,
            pitch: 0,
            layersVis:['industrial copy','My water','Anchors points','Anchors polygons','Anchors labels','My parks','My Art Museum Monument','Nightlife','Tourist spot'], 
            layersHide:['Neighborhood Outlines','Commercial','Residential','Industrial','Colleges','Migrant Population Density','My camera surveillance','transit-stop-label','building (1)'],
            speed:0.5,
        },

       // add additional chapters here as needed  

    };


    console.log(chapters['chapter01']['name']);
    console.log(Object.keys(chapters)[0]);

     //Add the chapters to the #chapters div on the webpage
    for (var key in chapters) {
        var newChapter = $("<div class='chapter' id='" + key + "'></div>").appendTo("#chapters");
        var chapterHTML = $("<h3>" +"<br>"+ chapters[key]['name'] +"<br><br>"+"</h3>" + "<p>" + chapters[key]['description'] + "</p>"+"<br>").appendTo(newChapter);
    }


    $("#chapters").scroll(function(e) {
        var chapterNames = Object.keys(chapters);

        for (var i = 0; i < chapterNames.length; i++) {

            var chapterName = chapterNames[i];
            var chapterElem = $("#" + chapterName);

            if (chapterElem.length) {
                if (checkInView($("#chapters"), chapterElem, true)) {
                    setActiveChapter(chapterName);
                    $("#" + chapterName).addClass('active');
                    break;
                } else {
                    $("#" + chapterName).removeClass('active');
                }
            }
        }
    });

    var activeChapterName = '';
    
    function setActiveChapter(chapterName) {
        if (chapterName === activeChapterName) return;
        
        map.flyTo(chapters[chapterName]);
        
         // Reset layers to visible
        for (i=0; i<chapters[chapterName]['layersVis'].length; i++) {
            map.setLayoutProperty(chapters[chapterName]['layersVis'][i], 'visibility', 'visible'); 
        }  
        for (i=0; i<chapters[chapterName]['layersHide'].length; i++) {
            map.setLayoutProperty(chapters[chapterName]['layersHide'][i], 'visibility', 'none'); 
        }  

        activeChapterName = chapterName;
    }

    function checkInView(container, elem, partial) {
        var contHeight = container.height();
        var contTop = container.scrollTop();
        var contBottom = contTop + contHeight ;

        var elemTop = $(elem).offset().top - container.offset().top;
        var elemBottom = elemTop + $(elem).height();

        var isTotal = (elemTop >= 0 && elemBottom <=contHeight);
        var isPart = ((elemTop < 0 && elemBottom > 0 ) || (elemTop > 0 && elemTop <= container.height())) && partial ;

        return  isTotal  || isPart ;
    }
