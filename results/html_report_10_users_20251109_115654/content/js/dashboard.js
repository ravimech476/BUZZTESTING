/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 100.0, "KoPercent": 0.0};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.8038461538461539, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.5, 500, 1500, "8. Add People to Category"], "isController": false}, {"data": [0.85, 500, 1500, "6. Create Category"], "isController": false}, {"data": [0.65, 500, 1500, "2. Verify OTP"], "isController": false}, {"data": [1.0, 500, 1500, "9. Mute People"], "isController": false}, {"data": [1.0, 500, 1500, "3. Get Profile Data"], "isController": false}, {"data": [0.6, 500, 1500, "11. View People Details"], "isController": false}, {"data": [0.55, 500, 1500, "7. Update Category"], "isController": false}, {"data": [0.55, 500, 1500, "1. Send OTP"], "isController": false}, {"data": [1.0, 500, 1500, "14. Get Category List"], "isController": false}, {"data": [0.8, 500, 1500, "4. Update Profile Name"], "isController": false}, {"data": [1.0, 500, 1500, "13. Get Incoming Call History"], "isController": false}, {"data": [0.95, 500, 1500, "12. Remove People from Category"], "isController": false}, {"data": [1.0, 500, 1500, "10. Block People"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 130, 0, 0.0, 509.20769230769235, 212, 1290, 461.0, 844.2, 1017.8499999999999, 1272.33, 1.231083922043978, 0.6491396765326994, 0.5098011740279172], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["8. Add People to Category", 10, 0, 0.0, 993.4, 665, 1233, 979.0, 1230.4, 1233.0, 1233.0, 0.36748493311774216, 0.23495350167205645, 0.1794718896993973], "isController": false}, {"data": ["6. Create Category", 10, 0, 0.0, 453.6, 298, 556, 482.0, 554.7, 556.0, 556.0, 0.37652020030874656, 0.2000263564140216, 0.1822298938213035], "isController": false}, {"data": ["2. Verify OTP", 10, 0, 0.0, 536.5999999999999, 478, 588, 545.5, 586.8, 588.0, 588.0, 0.3733711682783855, 0.19507185061419557, 0.12105393346525781], "isController": false}, {"data": ["9. Mute People", 10, 0, 0.0, 360.6, 245, 438, 362.5, 436.0, 438.0, 438.0, 0.3790463194602381, 0.23690394966264877, 0.1702747138200288], "isController": false}, {"data": ["3. Get Profile Data", 10, 0, 0.0, 399.3, 342, 489, 389.5, 486.8, 489.0, 489.0, 0.37498125093745316, 0.1893215886080696, 0.14244893224088795], "isController": false}, {"data": ["11. View People Details", 10, 0, 0.0, 545.6999999999998, 444, 626, 548.0, 625.2, 626.0, 626.0, 0.3745178083217857, 0.1851010378824763, 0.14410157859256206], "isController": false}, {"data": ["7. Update Category", 10, 0, 0.0, 562.6999999999999, 433, 670, 570.0, 663.0, 670.0, 670.0, 0.37527676661537884, 0.21886258302998463, 0.191596380455586], "isController": false}, {"data": ["1. Send OTP", 10, 0, 0.0, 816.9, 482, 1290, 769.5, 1262.2, 1290.0, 1290.0, 0.36359669854197724, 0.12889218903392358, 0.1104282941860888], "isController": false}, {"data": ["14. Get Category List", 10, 0, 0.0, 348.80000000000007, 296, 395, 357.0, 394.5, 395.0, 395.0, 0.3939799858167205, 0.27209242770467257, 0.14658825644157275], "isController": false}, {"data": ["4. Update Profile Name", 10, 0, 0.0, 494.8, 337, 634, 470.5, 629.6, 634.0, 634.0, 0.37485474378678263, 0.18599970245904712, 0.1625712809723732], "isController": false}, {"data": ["13. Get Incoming Call History", 10, 0, 0.0, 326.4, 212, 416, 337.0, 414.5, 416.0, 416.0, 0.3942906710827222, 0.14785900165602084, 0.15170949649081303], "isController": false}, {"data": ["12. Remove People from Category", 10, 0, 0.0, 394.0, 337, 510, 372.5, 505.0, 510.0, 510.0, 0.39079291883231076, 0.14425754230333346, 0.17173516940873032], "isController": false}, {"data": ["10. Block People", 10, 0, 0.0, 386.90000000000003, 299, 478, 368.0, 477.7, 478.0, 478.0, 0.3783006733751986, 0.25306246216993267, 0.16218163633956267], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": []}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 130, 0, "", "", "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
