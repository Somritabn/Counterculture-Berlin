// Global variables
var mapCenter = [13.405980, 52.516920];
var mapZoom = 11;


// --------------------------------------------------------
// 1. Initialize map
    mapboxgl.accessToken = 'pk.eyJ1Ijoic29tcml0YSIsImEiOiJja2YwbzYzMm8xcmprMnlsOWluNGdld3liIn0._2yQ-kSet_G3Wr39HqtCUw'; // replace this value with your own access token from Mapbox Studio

    // for more mapboxgl.Map options, see https://docs.mapbox.com/mapbox-gl-js/api/#map)
    var map = new mapboxgl.Map({
    	container: 'map', // this is the ID of the div in index.html where the map should go
        center: mapCenter, // set the centerpoint of the map programatically. Note that this is [longitude, latitude]!
        zoom: mapZoom, // set the default zoom programatically
    	style: 'mapbox://styles/somrita/ckfk69vb8136319pfeqv5ghy1', // replace this value with the style URL from Mapbox Studio
    });

// -------------------------------------------------------- 
// 2. Show/hide layers
// See example at https://www.mapbox.com/mapbox-gl-js/example/toggle-layers/
    
    var layers = [  // an array of the layers you want to include in the layers control (layers to turn off and on)

        // [MapboxlayerName, layerDisplayName]
        ['Commercial', 'Landuse - Commercial'],             // 'Point_O':layers[0][0],'PizzaHut': layers[0][1]     
        ['Residential', 'Landuse - Residential'],         
        ['Industrial', 'Landuse - Industrial'], 
        ['Colleges', 'Landuse - Higher education'],
        ['My parks', 'Landuse - Parks'],
        ['Migrant Population Density', 'Migrant Population Density'],
        ['My camera surveillance', 'Surveillance'],
        ['transit-stop-label', 'Transit stops'],
        ['My Art Museum Monument', 'Art establishments'],
        ['Nightlife', 'Nightlife'],
        ['Tourist spot', 'Tourist spots'],
        ['building (1)', '3D Buildings'],
        ['Anchors', 'Anchors'],
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
            name: "Overall map of Berlin",
            description: "Berlin has historically welcomed refugees and migrants that has shaped the cultural identity of the city a cultural nexus with support from social and cultural policies",
            bearing: 0,
            center: [13.373161, 52.523910],
            zoom: 9.51,
            pitch: 0,
            layersVis:['My water','Migrant Population Density','My parks','landuse','national-park','land','Anchors'], 
            layersHide:['My camera surveillance','transit-stop-label','My Art Museum Monument','Nightlife','Tourist spot','building (1)','Commercial','Residential','Industrial','Colleges'],
        },
        'chapter02': {
            name: "Core of migrant density",
            description: "",
            bearing: 0,
            center: [13.373161, 52.523910],
            zoom: 10.8,
            pitch: 0,
            layersVis:['My water','Migrant Population Density','My parks','landuse','national-park','land','Anchors'], 
            layersHide:['Commercial','Residential','Industrial','Colleges','My camera surveillance','transit-stop-label','My Art Museum Monument','Nightlife','Tourist spot','building (1)'],
            speed:0.5,
        },

        'chapter03': {
            name: "Landuse overlap",
            description: "",
            bearing: 0,
            center: [13.373161, 52.523910],
            zoom: 10.87,
            pitch: 0,
            layersVis:['Commercial','Residential','Industrial','Colleges','Anchors'], 
            layersHide:['My camera surveillance','transit-stop-label','My Art Museum Monument','Nightlife','Tourist spot','building (1)'],
            speed:0.5,
        },
        
        'chapter04': {
            name: "Kreuzberg : Stage 1",
            description: "Once the heart of West Berlin Punk where historic squats like Kopi and SO36 club still stand despite clashes with the authorities in a rapidly gentrifying district. With a rising hipster scene of creative start-ups and digital media, anti-gentrification groups say locals are being displaced by a city-wide lack of affordable family housing and rising costs.",
            bearing: 0,
            center: [13.409098, 52.498089],
            zoom: 12.69,
            pitch: 0,
            layersVis:['Commercial','Residential','Industrial','Colleges','Anchors'], 
            layersHide:['Migrant Population Density','My camera surveillance','transit-stop-label','My Art Museum Monument','Nightlife','Tourist spot','building (1)'],
            speed:0.5,
        },
        
        'chapter05': {
            name: "Neukolln : Stage 2",
            description: "Neukolln has seen a complete transformation in recent years, with the traditionally working-class neighbourhood attracting more artists and immigrants. With reputation for crime and violence, the ‘Bronx of Berlin’ transformed as it got mentioned in more and more travel guides to Berlin. Since 2007, it has seen a dramatic rent increase though it is denied by policymakers.",
            bearing: 0,
            center: [13.434252, 52.476198],
            zoom: 12.69,
            pitch: 0,
            layersVis:['Commercial','Residential','Industrial','Colleges','Anchors'], 
            layersHide:['Migrant Population Density','My camera surveillance','transit-stop-label','My Art Museum Monument','Nightlife','Tourist spot','building (1)'],
            speed:0.5,
        },
        
        'chapter06': {
            name: "Wedding : Stage 3",
            description: "Wedding is a historically working-class area with a large population of migrants that has recently begun to develop a high concentration of artistic spaces. Though it is primed for gentrification, municipal policies in social housing development and neighbourhood management offices have allowed for socioeconomic diversity to somewhat coexist alongside its development as an artistic hub.",
            //imagepath: "img/McIntire Park.jpg",
            bearing: 0,
            center: [13.341221, 52.550607],
            zoom:12.69,
            pitch: 0,
            layersVis:['Commercial','Residential','Industrial','Colleges','Anchors'], 
            layersHide:['Migrant Population Density','My camera surveillance','transit-stop-label','My Art Museum Monument','Nightlife','Tourist spot','building (1)'],
            speed:0.5,
        },

       // add additional chapters here as needed  

    };


    console.log(chapters['chapter01']['name']);
    console.log(Object.keys(chapters)[0]);

     //Add the chapters to the #chapters div on the webpage
    for (var key in chapters) {
        var newChapter = $("<div class='chapter' id='" + key + "'></div>").appendTo("#chapters");
        var chapterHTML = $("<h3>" +"<br>"+ chapters[key]['name'] +"<br><br>"+"</h3>" + "<p>" + chapters[key]['description'] + "</p>"+"<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>").appendTo(newChapter);
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
