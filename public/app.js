/** Gets site_url and icon_url return values from popular_sites_data Python function. */
var get_sites = $.ajax({
    'url': 'Site/Database/read_the_table'
});
get_sites.done(function(sites) {
    console.log('this is sites: ');
    console.log(sites);
    var urls = sites.url_list;
    console.log("urls is ");
    console.log(urls);
    var icons = sites.icon_list;
    console.log("icons is ");
    console.log(icons);
    var site_urls = [];
    var img_urls = [];
    var table_string = "";
    var strings = ["Icon", "Site", "Last Checked", "Status Icon", "Ping Status", "Ping Latency", "HTTP Status", "Weekly Stats", "Delete Site", "Ping Site"];
    for (i = 0; i < strings.length; i++) {
        table_string += "<th style=\"color: #FFFFFF\">" + strings[i] + "</th>";

    }
    new_table_string = "<tr>" + table_string + "</tr>";

    for (i = 0; i < urls.length; i++) {
        site_urls.push(urls[i]);
        img_urls.push(icons[i]);
        console.log("SITE URLS ARE");
        console.log("IMG URLS ARE");
        console.log(site_urls);
        console.log(img_urls);
        
        
        table_string += "<tr><td align=\"center\" width=\"64\">" +
            "<img src=" + img_urls[i] +
            "></td><td style=\"color: #FFFFFF\">" + site_urls[i] +
            "</td><td>" + "Last checked 2 seconds ago" + "</td><td id=" +
            i.toString() + " style=\"font-size:200%\"></td><td>" +
            "Ping Status: " + "</td><td>" +
            "Ping Latency: " + "</td><td>" +
            "HTTP Status: " + "</td><td>" +
            "Weekly Stats" + "</td><td>" +
            "<button type=\"button\" onclick=\"delete_the_site(&#34;" +
            site_urls[i] + "&#34;, &#34;" + site_urls[i] +
            "&#34;)\">Delete</button>" + "</td><td>" +
            "Ping Now" + "</td></tr>";
        console.log("IMG URLS [I] ARE");
        console.log(img_urls[i]);
    }
    document.getElementById("sites").innerHTML = table_string;
});
/** Posts site to delete in delete_site Python function. */
function delete_the_site(site, site_url) {
    console.log("deleting string");
    $.post("Site/Database/delete_a_site", {
        "url": site
    }).done(function delete_the_site() {
        $("tr").remove(":contains(\'" + site_url + "\')");
        console.log("." + site_url);
    });
}

/** Posts site to add in add_site Python function. */
$("#add_site_button").click(function(add_site_button_clicked) {
    $.post("Site/Database/add_a_site", {
        "url": $("input[name='field']").val()
    }).done(function() {
        console.log("new site was added");
        $("input[name='field']").val('');
        //$('#sites tr:last').after(table_row);
        //$('<li>').text('New item').appendTo('.items');
        // the <li> tag defines a list item
    });
    add_site_button_clicked.preventDefault();
});
/** Gets result return values from site_status Python function. */
var get_site_status = $.ajax({
    'url': 'Site/site_status'
});
get_site_status.done(function(ping_list) {
    console.log(ping_list.result.length)
    for (i = 0; i < ping_list.result.length; i++) {
        $('#' + i).text(ping_list.result[i]);
    }
});
get_site_status.fail(function(jqXHR, textStatus) {
    alert('Request failed: ' + textStatus);
});

