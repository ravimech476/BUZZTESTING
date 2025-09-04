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

    var data = {"OkPercent": 93.56076759061834, "KoPercent": 6.439232409381663};
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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.6147121535181237, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "02 - Register"], "isController": false}, {"data": [0.15465465465465467, 500, 1500, "04 - Call Received"], "isController": false}, {"data": [0.9916666666666667, 500, 1500, "01 - Connect"], "isController": false}, {"data": [0.8066666666666666, 500, 1500, "Caller - Read Response"], "isController": false}, {"data": [1.0, 500, 1500, "07 - Call Ended"], "isController": false}, {"data": [1.0, 500, 1500, "06 - Call Rejected"], "isController": false}, {"data": [1.0, 500, 1500, "Select Receiver Target"], "isController": false}, {"data": [1.0, 500, 1500, "Process Call Decision"], "isController": false}, {"data": [1.0, 500, 1500, "03 - Call Initiated"], "isController": false}, {"data": [1.0, 500, 1500, "05 - Call Accepted"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 2345, 151, 6.439232409381663, 2017.759061833688, 0, 6016, 1.0, 6001.0, 6001.0, 6002.0, 18.90153469177199, 0.46322645217387803, 0.37626276810758963], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["02 - Register", 120, 0, 0.0, 0.2833333333333333, 0, 2, 0.0, 1.0, 1.0, 2.0, 6.1989874987085445, 0.0, 0.2421479491683025], "isController": false}, {"data": ["04 - Call Received", 999, 95, 9.50950950950951, 4708.660660660656, 0, 6016, 6000.0, 6001.0, 6002.0, 6010.0, 8.137962495315989, 0.16227780215953339, 0.0], "isController": false}, {"data": ["01 - Connect", 120, 0, 0.0, 89.43333333333334, 52, 563, 58.5, 167.4000000000001, 296.6999999999997, 562.5799999999999, 6.103453537459947, 0.768892096027669, 0.9417438075377651], "isController": false}, {"data": ["Caller - Read Response", 300, 56, 18.666666666666668, 54.650000000000006, 0, 6000, 0.0, 0.0, 1.0, 3828.4900000000307, 2.9952674773857306, 0.22396254542822341, 0.0], "isController": false}, {"data": ["07 - Call Ended", 41, 0, 0.0, 0.14634146341463417, 0, 1, 0.0, 1.0, 1.0, 1.0, 0.5896480807674054, 0.0, 0.037428833251837254], "isController": false}, {"data": ["06 - Call Rejected", 17, 0, 0.0, 0.058823529411764705, 0, 1, 0.0, 0.1999999999999993, 1.0, 1.0, 0.20613056552526918, 0.0, 0.014896154149287032], "isController": false}, {"data": ["Select Receiver Target", 300, 0, 0.0, 1.113333333333333, 0, 160, 1.0, 1.0, 1.0, 1.0, 3.0250473924091477, 0.0, 0.0], "isController": false}, {"data": ["Process Call Decision", 91, 0, 0.0, 1.4395604395604393, 0, 79, 1.0, 1.0, 1.0, 79.0, 0.9287325352357041, 0.0, 0.0], "isController": false}, {"data": ["03 - Call Initiated", 300, 0, 0.0, 0.17666666666666667, 0, 1, 0.0, 1.0, 1.0, 1.0, 3.0455616015593274, 0.0, 0.15763160633070739], "isController": false}, {"data": ["05 - Call Accepted", 57, 0, 0.0, 0.12280701754385967, 0, 1, 0.0, 1.0, 1.0, 1.0, 0.6474256312399905, 0.0, 0.04678661788257744], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["Sampler error: unexpected frame type (ping)./Received: Ping frame with no application data", 151, 100.0, 6.439232409381663], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 2345, 151, "Sampler error: unexpected frame type (ping)./Received: Ping frame with no application data", 151, "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": ["04 - Call Received", 999, 95, "Sampler error: unexpected frame type (ping)./Received: Ping frame with no application data", 95, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": ["Caller - Read Response", 300, 56, "Sampler error: unexpected frame type (ping)./Received: Ping frame with no application data", 56, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
