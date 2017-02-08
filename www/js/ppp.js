

// This example adds a red rectangle to a map.



var marker;


function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: { lat: 35.469319, lng: 139.619881 },
        mapTypeId: google.maps.MapTypeId.TERRAIN
    });

    var array = [
[0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0],

    ]

    var i = 0;
    var j = 0;
    var A = 35.474000;
    var C = 35.438000;
    var D = 139.635000;
    var B = 139.599000;
    var a = 35.442500;
    var d = 139.603500;
    var X = d;
    var c = C;
    var b = B;
    var count = 0;

    while (A >= a.toFixed(6) || D >= d.toFixed(6)) {
        i = 0;
        d = X;
        b = B;
        while (d.toFixed(6) <= D) {
            array[j][i] = a.toFixed(6) + "," + b.toFixed(6) + "," + c.toFixed(6) + "," + d.toFixed(6)
            //console.log(array[j][i]);
            //   console.log(d);
            i++;
            b = b + 0.0045;
            d = d + 0.0045;

            count++;
        }
        a = a + 0.0045;
        c = c + 0.0045;
        j++;
    };





    //現在地の取得
    navigator.geolocation.watchPosition(function (position) {
        // 緯度経度の取得
        latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        marker = new google.maps.Marker({
            position: latLng,
            map: map
        });

        var nowido = position.coords.latitude;
        var nowkeido = position.coords.longitude;
        var sorthLimit = 35.438000;
        var westLimit = 139.599000;



        var ii = 0;
        var jj = 0;
        var resArray;
        var count2 = 0;
        var rectangle = new Array();
        while (jj < 8) {
            ii = 0;

            while (ii < 8) {
                resArray = array[jj][ii].split(",");
                // console.log(resArray[2]);
                Number(resArray[2]);
                var check = isNaN(resArray[2]);        // true （数値ではない）
                // console.log(check)


                rectangle[count2] = new google.maps.Rectangle({
                    strokeColor: '#000000',
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: 'white',
                    fillOpacity: 0.0,
                    map: map,
                    bounds: {
                        north: Number(resArray[0]),
                        south: Number(resArray[2]),
                        east: Number(resArray[3]),
                        west: Number(resArray[1])
                    }


                });

                ii++
                count2++
            }

            jj++
        }


        console.log(nowido, nowkeido);
        console.log(latLng)



        var cct = 0;
        var Latlangflg = 0;
        var minami = 35.438000;
        var nisi = 139.599000;


        while (nowido >= minami && cct <= 63) {
            cct = cct + 8;
            minami = minami + 0.0045;
            console.log(cct)
        }
        if (minami == 35.438000 || cct > 71) {
            Latlangflg = 1;
        }
        cct = cct - 8;
        while (Latlangflg == 0 && nowkeido >= nisi) {
            cct = cct + 1;
            nisi = nisi + 0.0045;
        }
        cct = cct - 1;
        if (cct > 63 || Latlangflg == 1) {
            alert("error")
        } else {

            if (rectangle[cct].fillcolor != "red") {
                    $(function(){
                        var application_key = "APIKEY";
                        var client_key = "CLIKEY";
                        var ncmb = new NCMB(application_key,client_key);

                        // カレントユーザ情報の取得
                        var currentUser = ncmb.User.getCurrentUser();
                        if (currentUser) {
                            var your_color = currentUser.get("color");
                            console.log(your_color);
                            console.log(String(your_color));
     
                            rectangle[cct].fillColor =  String(your_color);
                            rectangle[cct].fillOpacity = 0.3;
                            console.log(rectangle[cct].fillcolor);
                            console.log(rectangle[60].fillColor);
                            console.log(rectangle[53].fillColor);
                            console.log("ログイン中のユーザー: " + currentUser.get("color"));

                        } else {
                            console.log("未ログインまたは取得に失敗");
                        }
                    }
                );

            }

        }

        console.log(cct);


    });


};


