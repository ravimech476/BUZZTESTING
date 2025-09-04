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

    var data = {"OkPercent": 80.66123188405797, "KoPercent": 19.338768115942027};
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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.7943840579710145, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "02 - Registered"], "isController": false}, {"data": [0.7569444444444444, 500, 1500, "Regular Caller - Read Response"], "isController": false}, {"data": [0.8875, 500, 1500, "Heavy Caller - Read Response"], "isController": false}, {"data": [0.08591549295774648, 500, 1500, "04 - Call Received"], "isController": false}, {"data": [1.0, 500, 1500, "Select Random Target"], "isController": false}, {"data": [0.9708333333333333, 500, 1500, "01 - Connected"], "isController": false}, {"data": [0.0, 500, 1500, "Process Call Decision"], "isController": false}, {"data": [1.0, 500, 1500, "03 - Call Initiated"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 2208, 427, 19.338768115942027, 834.7912137681158, 0, 6003, 1.0, 6000.0, 6001.0, 6002.0, 19.207014735816557, 0.5271286578576524, 0.43956270985925294], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["02 - Registered", 120, 0, 0.0, 0.4416666666666667, 0, 4, 0.0, 1.0, 3.0, 4.0, 6.497373978017218, 0.0, 0.2538036710162976], "isController": false}, {"data": ["Regular Caller - Read Response", 288, 70, 24.305555555555557, 0.11111111111111117, 0, 2, 0.0, 1.0, 1.0, 1.0, 3.123644251626898, 0.2464602257321041, 0.0], "isController": false}, {"data": ["Heavy Caller - Read Response", 240, 27, 11.25, 25.083333333333332, 0, 6000, 0.0, 0.0, 1.0, 1.0, 2.559290223511346, 0.16741190443183757, 0.0], "isController": false}, {"data": ["04 - Call Received", 355, 301, 84.78873239436619, 5098.639436619717, 0, 6003, 6001.0, 6002.0, 6002.0, 6002.0, 3.829185947426895, 0.07612655931462964, 0.0], "isController": false}, {"data": ["Select Random Target", 528, 0, 0.0, 13.702651515151508, 5, 374, 11.0, 19.0, 23.549999999999955, 48.55000000000018, 5.5659800552381355, 0.0, 0.0], "isController": false}, {"data": ["01 - Connected", 120, 0, 0.0, 159.14166666666665, 52, 875, 66.0, 410.70000000000005, 610.7999999999993, 875.0, 6.199628022318661, 0.7810078270303781, 0.9565832300061995], "isController": false}, {"data": ["Process Call Decision", 29, 29, 100.0, 20.72413793103448, 10, 112, 16.0, 32.0, 73.0, 112.0, 0.3899159663865546, 0.0, 0.0], "isController": false}, {"data": ["03 - Call Initiated", 528, 0, 0.0, 0.31060606060606044, 0, 2, 0.0, 1.0, 1.0, 1.0, 5.265834904107949, 0.0, 0.2725480956227747], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["500/javax.script.ScriptException: org.codehaus.groovy.control.MultipleCompilationErrorsException: startup failed:\\r\\nScript98.groovy: 1: Unexpected input: 'def' @ line 1, column 347.\\r\\n   put(&quot;callerId&quot;, &quot;unknown&quot;); } def random\\r\\n                                 ^\\r\\n\\r\\n1 error\\r\\n", 1, 0.234192037470726, 0.04528985507246377], "isController": false}, {"data": ["Websocket I/O error/WebSocket I/O error: Read timed out", 278, 65.10538641686183, 12.590579710144928], "isController": false}, {"data": ["500/javax.script.ScriptException: org.codehaus.groovy.control.MultipleCompilationErrorsException: startup failed:\\r\\nScript446.groovy: 1: Unexpected input: 'def' @ line 1, column 347.\\r\\n   put(&quot;callerId&quot;, &quot;unknown&quot;); } def random\\r\\n                                 ^\\r\\n\\r\\n1 error\\r\\n", 1, 0.234192037470726, 0.04528985507246377], "isController": false}, {"data": ["500/javax.script.ScriptException: org.codehaus.groovy.control.MultipleCompilationErrorsException: startup failed:\\r\\nScript295.groovy: 1: Unexpected input: 'def' @ line 1, column 347.\\r\\n   put(&quot;callerId&quot;, &quot;unknown&quot;); } def random\\r\\n                                 ^\\r\\n\\r\\n1 error\\r\\n", 1, 0.234192037470726, 0.04528985507246377], "isController": false}, {"data": ["500/javax.script.ScriptException: org.codehaus.groovy.control.MultipleCompilationErrorsException: startup failed:\\r\\nScript316.groovy: 1: Unexpected input: 'def' @ line 1, column 347.\\r\\n   put(&quot;callerId&quot;, &quot;unknown&quot;); } def random\\r\\n                                 ^\\r\\n\\r\\n1 error\\r\\n", 1, 0.234192037470726, 0.04528985507246377], "isController": false}, {"data": ["500/javax.script.ScriptException: org.codehaus.groovy.control.MultipleCompilationErrorsException: startup failed:\\r\\nScript159.groovy: 1: Unexpected input: 'def' @ line 1, column 347.\\r\\n   put(&quot;callerId&quot;, &quot;unknown&quot;); } def random\\r\\n                                 ^\\r\\n\\r\\n1 error\\r\\n", 1, 0.234192037470726, 0.04528985507246377], "isController": false}, {"data": ["500/javax.script.ScriptException: org.codehaus.groovy.control.MultipleCompilationErrorsException: startup failed:\\r\\nScript136.groovy: 1: Unexpected input: 'def' @ line 1, column 347.\\r\\n   put(&quot;callerId&quot;, &quot;unknown&quot;); } def random\\r\\n                                 ^\\r\\n\\r\\n1 error\\r\\n", 1, 0.234192037470726, 0.04528985507246377], "isController": false}, {"data": ["500/javax.script.ScriptException: org.codehaus.groovy.control.MultipleCompilationErrorsException: startup failed:\\r\\nScript151.groovy: 1: Unexpected input: 'def' @ line 1, column 347.\\r\\n   put(&quot;callerId&quot;, &quot;unknown&quot;); } def random\\r\\n                                 ^\\r\\n\\r\\n1 error\\r\\n", 1, 0.234192037470726, 0.04528985507246377], "isController": false}, {"data": ["500/javax.script.ScriptException: org.codehaus.groovy.control.MultipleCompilationErrorsException: startup failed:\\r\\nScript166.groovy: 1: Unexpected input: 'def' @ line 1, column 347.\\r\\n   put(&quot;callerId&quot;, &quot;unknown&quot;); } def random\\r\\n                                 ^\\r\\n\\r\\n1 error\\r\\n", 1, 0.234192037470726, 0.04528985507246377], "isController": false}, {"data": ["500/javax.script.ScriptException: org.codehaus.groovy.control.MultipleCompilationErrorsException: startup failed:\\r\\nScript156.groovy: 1: Unexpected input: 'def' @ line 1, column 347.\\r\\n   put(&quot;callerId&quot;, &quot;unknown&quot;); } def random\\r\\n                                 ^\\r\\n\\r\\n1 error\\r\\n", 1, 0.234192037470726, 0.04528985507246377], "isController": false}, {"data": ["500/javax.script.ScriptException: org.codehaus.groovy.control.MultipleCompilationErrorsException: startup failed:\\r\\nScript141.groovy: 1: Unexpected input: 'def' @ line 1, column 347.\\r\\n   put(&quot;callerId&quot;, &quot;unknown&quot;); } def random\\r\\n                                 ^\\r\\n\\r\\n1 error\\r\\n", 1, 0.234192037470726, 0.04528985507246377], "isController": false}, {"data": ["500/javax.script.ScriptException: org.codehaus.groovy.control.MultipleCompilationErrorsException: startup failed:\\r\\nScript307.groovy: 1: Unexpected input: 'def' @ line 1, column 347.\\r\\n   put(&quot;callerId&quot;, &quot;unknown&quot;); } def random\\r\\n                                 ^\\r\\n\\r\\n1 error\\r\\n", 1, 0.234192037470726, 0.04528985507246377], "isController": false}, {"data": ["500/javax.script.ScriptException: org.codehaus.groovy.control.MultipleCompilationErrorsException: startup failed:\\r\\nScript137.groovy: 1: Unexpected input: 'def' @ line 1, column 347.\\r\\n   put(&quot;callerId&quot;, &quot;unknown&quot;); } def random\\r\\n                                 ^\\r\\n\\r\\n1 error\\r\\n", 1, 0.234192037470726, 0.04528985507246377], "isController": false}, {"data": ["500/javax.script.ScriptException: org.codehaus.groovy.control.MultipleCompilationErrorsException: startup failed:\\r\\nScript147.groovy: 1: Unexpected input: 'def' @ line 1, column 347.\\r\\n   put(&quot;callerId&quot;, &quot;unknown&quot;); } def random\\r\\n                                 ^\\r\\n\\r\\n1 error\\r\\n", 1, 0.234192037470726, 0.04528985507246377], "isController": false}, {"data": ["500/javax.script.ScriptException: org.codehaus.groovy.control.MultipleCompilationErrorsException: startup failed:\\r\\nScript405.groovy: 1: Unexpected input: 'def' @ line 1, column 347.\\r\\n   put(&quot;callerId&quot;, &quot;unknown&quot;); } def random\\r\\n                                 ^\\r\\n\\r\\n1 error\\r\\n", 1, 0.234192037470726, 0.04528985507246377], "isController": false}, {"data": ["500/javax.script.ScriptException: org.codehaus.groovy.control.MultipleCompilationErrorsException: startup failed:\\r\\nScript142.groovy: 1: Unexpected input: 'def' @ line 1, column 347.\\r\\n   put(&quot;callerId&quot;, &quot;unknown&quot;); } def random\\r\\n                                 ^\\r\\n\\r\\n1 error\\r\\n", 1, 0.234192037470726, 0.04528985507246377], "isController": false}, {"data": ["500/javax.script.ScriptException: org.codehaus.groovy.control.MultipleCompilationErrorsException: startup failed:\\r\\nScript187.groovy: 1: Unexpected input: 'def' @ line 1, column 347.\\r\\n   put(&quot;callerId&quot;, &quot;unknown&quot;); } def random\\r\\n                                 ^\\r\\n\\r\\n1 error\\r\\n", 1, 0.234192037470726, 0.04528985507246377], "isController": false}, {"data": ["500/javax.script.ScriptException: org.codehaus.groovy.control.MultipleCompilationErrorsException: startup failed:\\r\\nScript27.groovy: 1: Unexpected input: 'def' @ line 1, column 347.\\r\\n   put(&quot;callerId&quot;, &quot;unknown&quot;); } def random\\r\\n                                 ^\\r\\n\\r\\n1 error\\r\\n", 1, 0.234192037470726, 0.04528985507246377], "isController": false}, {"data": ["500/javax.script.ScriptException: org.codehaus.groovy.control.MultipleCompilationErrorsException: startup failed:\\r\\nScript344.groovy: 1: Unexpected input: 'def' @ line 1, column 347.\\r\\n   put(&quot;callerId&quot;, &quot;unknown&quot;); } def random\\r\\n                                 ^\\r\\n\\r\\n1 error\\r\\n", 1, 0.234192037470726, 0.04528985507246377], "isController": false}, {"data": ["500/javax.script.ScriptException: org.codehaus.groovy.control.MultipleCompilationErrorsException: startup failed:\\r\\nScript75.groovy: 1: Unexpected input: 'def' @ line 1, column 347.\\r\\n   put(&quot;callerId&quot;, &quot;unknown&quot;); } def random\\r\\n                                 ^\\r\\n\\r\\n1 error\\r\\n", 1, 0.234192037470726, 0.04528985507246377], "isController": false}, {"data": ["500/javax.script.ScriptException: org.codehaus.groovy.control.MultipleCompilationErrorsException: startup failed:\\r\\nScript283.groovy: 1: Unexpected input: 'def' @ line 1, column 347.\\r\\n   put(&quot;callerId&quot;, &quot;unknown&quot;); } def random\\r\\n                                 ^\\r\\n\\r\\n1 error\\r\\n", 1, 0.234192037470726, 0.04528985507246377], "isController": false}, {"data": ["500/javax.script.ScriptException: org.codehaus.groovy.control.MultipleCompilationErrorsException: startup failed:\\r\\nScript318.groovy: 1: Unexpected input: 'def' @ line 1, column 347.\\r\\n   put(&quot;callerId&quot;, &quot;unknown&quot;); } def random\\r\\n                                 ^\\r\\n\\r\\n1 error\\r\\n", 1, 0.234192037470726, 0.04528985507246377], "isController": false}, {"data": ["Sampler error: unexpected frame type (ping)./Received: Ping frame with no application data", 120, 28.10304449648712, 5.434782608695652], "isController": false}, {"data": ["500/javax.script.ScriptException: org.codehaus.groovy.control.MultipleCompilationErrorsException: startup failed:\\r\\nScript315.groovy: 1: Unexpected input: 'def' @ line 1, column 347.\\r\\n   put(&quot;callerId&quot;, &quot;unknown&quot;); } def random\\r\\n                                 ^\\r\\n\\r\\n1 error\\r\\n", 1, 0.234192037470726, 0.04528985507246377], "isController": false}, {"data": ["500/javax.script.ScriptException: org.codehaus.groovy.control.MultipleCompilationErrorsException: startup failed:\\r\\nScript170.groovy: 1: Unexpected input: 'def' @ line 1, column 347.\\r\\n   put(&quot;callerId&quot;, &quot;unknown&quot;); } def random\\r\\n                                 ^\\r\\n\\r\\n1 error\\r\\n", 1, 0.234192037470726, 0.04528985507246377], "isController": false}, {"data": ["500/javax.script.ScriptException: org.codehaus.groovy.control.MultipleCompilationErrorsException: startup failed:\\r\\nScript180.groovy: 1: Unexpected input: 'def' @ line 1, column 347.\\r\\n   put(&quot;callerId&quot;, &quot;unknown&quot;); } def random\\r\\n                                 ^\\r\\n\\r\\n1 error\\r\\n", 1, 0.234192037470726, 0.04528985507246377], "isController": false}, {"data": ["500/javax.script.ScriptException: org.codehaus.groovy.control.MultipleCompilationErrorsException: startup failed:\\r\\nScript123.groovy: 1: Unexpected input: 'def' @ line 1, column 347.\\r\\n   put(&quot;callerId&quot;, &quot;unknown&quot;); } def random\\r\\n                                 ^\\r\\n\\r\\n1 error\\r\\n", 1, 0.234192037470726, 0.04528985507246377], "isController": false}, {"data": ["500/javax.script.ScriptException: org.codehaus.groovy.control.MultipleCompilationErrorsException: startup failed:\\r\\nScript113.groovy: 1: Unexpected input: 'def' @ line 1, column 347.\\r\\n   put(&quot;callerId&quot;, &quot;unknown&quot;); } def random\\r\\n                                 ^\\r\\n\\r\\n1 error\\r\\n", 1, 0.234192037470726, 0.04528985507246377], "isController": false}, {"data": ["500/javax.script.ScriptException: org.codehaus.groovy.control.MultipleCompilationErrorsException: startup failed:\\r\\nScript138.groovy: 1: Unexpected input: 'def' @ line 1, column 347.\\r\\n   put(&quot;callerId&quot;, &quot;unknown&quot;); } def random\\r\\n                                 ^\\r\\n\\r\\n1 error\\r\\n", 1, 0.234192037470726, 0.04528985507246377], "isController": false}, {"data": ["500/javax.script.ScriptException: org.codehaus.groovy.control.MultipleCompilationErrorsException: startup failed:\\r\\nScript148.groovy: 1: Unexpected input: 'def' @ line 1, column 347.\\r\\n   put(&quot;callerId&quot;, &quot;unknown&quot;); } def random\\r\\n                                 ^\\r\\n\\r\\n1 error\\r\\n", 1, 0.234192037470726, 0.04528985507246377], "isController": false}, {"data": ["500/javax.script.ScriptException: org.codehaus.groovy.control.MultipleCompilationErrorsException: startup failed:\\r\\nScript481.groovy: 1: Unexpected input: 'def' @ line 1, column 347.\\r\\n   put(&quot;callerId&quot;, &quot;unknown&quot;); } def random\\r\\n                                 ^\\r\\n\\r\\n1 error\\r\\n", 1, 0.234192037470726, 0.04528985507246377], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 2208, 427, "Websocket I/O error/WebSocket I/O error: Read timed out", 278, "Sampler error: unexpected frame type (ping)./Received: Ping frame with no application data", 120, "500/javax.script.ScriptException: org.codehaus.groovy.control.MultipleCompilationErrorsException: startup failed:\\r\\nScript98.groovy: 1: Unexpected input: 'def' @ line 1, column 347.\\r\\n   put(&quot;callerId&quot;, &quot;unknown&quot;); } def random\\r\\n                                 ^\\r\\n\\r\\n1 error\\r\\n", 1, "500/javax.script.ScriptException: org.codehaus.groovy.control.MultipleCompilationErrorsException: startup failed:\\r\\nScript446.groovy: 1: Unexpected input: 'def' @ line 1, column 347.\\r\\n   put(&quot;callerId&quot;, &quot;unknown&quot;); } def random\\r\\n                                 ^\\r\\n\\r\\n1 error\\r\\n", 1, "500/javax.script.ScriptException: org.codehaus.groovy.control.MultipleCompilationErrorsException: startup failed:\\r\\nScript295.groovy: 1: Unexpected input: 'def' @ line 1, column 347.\\r\\n   put(&quot;callerId&quot;, &quot;unknown&quot;); } def random\\r\\n                                 ^\\r\\n\\r\\n1 error\\r\\n", 1], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": ["Regular Caller - Read Response", 288, 70, "Sampler error: unexpected frame type (ping)./Received: Ping frame with no application data", 70, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["Heavy Caller - Read Response", 240, 27, "Sampler error: unexpected frame type (ping)./Received: Ping frame with no application data", 26, "Websocket I/O error/WebSocket I/O error: Read timed out", 1, "", "", "", "", "", ""], "isController": false}, {"data": ["04 - Call Received", 355, 301, "Websocket I/O error/WebSocket I/O error: Read timed out", 277, "Sampler error: unexpected frame type (ping)./Received: Ping frame with no application data", 24, "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["Process Call Decision", 29, 29, "500/javax.script.ScriptException: org.codehaus.groovy.control.MultipleCompilationErrorsException: startup failed:\\r\\nScript98.groovy: 1: Unexpected input: 'def' @ line 1, column 347.\\r\\n   put(&quot;callerId&quot;, &quot;unknown&quot;); } def random\\r\\n                                 ^\\r\\n\\r\\n1 error\\r\\n", 1, "500/javax.script.ScriptException: org.codehaus.groovy.control.MultipleCompilationErrorsException: startup failed:\\r\\nScript446.groovy: 1: Unexpected input: 'def' @ line 1, column 347.\\r\\n   put(&quot;callerId&quot;, &quot;unknown&quot;); } def random\\r\\n                                 ^\\r\\n\\r\\n1 error\\r\\n", 1, "500/javax.script.ScriptException: org.codehaus.groovy.control.MultipleCompilationErrorsException: startup failed:\\r\\nScript295.groovy: 1: Unexpected input: 'def' @ line 1, column 347.\\r\\n   put(&quot;callerId&quot;, &quot;unknown&quot;); } def random\\r\\n                                 ^\\r\\n\\r\\n1 error\\r\\n", 1, "500/javax.script.ScriptException: org.codehaus.groovy.control.MultipleCompilationErrorsException: startup failed:\\r\\nScript316.groovy: 1: Unexpected input: 'def' @ line 1, column 347.\\r\\n   put(&quot;callerId&quot;, &quot;unknown&quot;); } def random\\r\\n                                 ^\\r\\n\\r\\n1 error\\r\\n", 1, "500/javax.script.ScriptException: org.codehaus.groovy.control.MultipleCompilationErrorsException: startup failed:\\r\\nScript159.groovy: 1: Unexpected input: 'def' @ line 1, column 347.\\r\\n   put(&quot;callerId&quot;, &quot;unknown&quot;); } def random\\r\\n                                 ^\\r\\n\\r\\n1 error\\r\\n", 1], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
