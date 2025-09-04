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

    var data = {"OkPercent": 93.10500225326724, "KoPercent": 6.894997746732763};
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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.7906714736367734, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.8194444444444444, 500, 1500, "Regular Caller - Read Response"], "isController": false}, {"data": [0.8208333333333333, 500, 1500, "Heavy Caller - Read Response"], "isController": false}, {"data": [1.0, 500, 1500, "02 - Register"], "isController": false}, {"data": [0.08513513513513514, 500, 1500, "04 - Call Received"], "isController": false}, {"data": [0.95, 500, 1500, "01 - Connect"], "isController": false}, {"data": [1.0, 500, 1500, "Select Random Target"], "isController": false}, {"data": [0.0, 500, 1500, "Process Call Decision"], "isController": false}, {"data": [1.0, 500, 1500, "03 - Call Initiated"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 2219, 153, 6.894997746732763, 852.9562866155927, 0, 6003, 0.0, 6000.0, 6001.0, 6002.0, 18.663840596166303, 0.5022980878815405, 0.4250145088440867], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["Regular Caller - Read Response", 288, 52, 18.055555555555557, 0.05208333333333335, 0, 1, 0.0, 0.0, 1.0, 1.0, 3.016812444351333, 0.24620443356203844, 0.0], "isController": false}, {"data": ["Heavy Caller - Read Response", 240, 41, 17.083333333333332, 56.90000000000007, 0, 6001, 0.0, 0.0, 1.0, 4214.220000000015, 2.530844669408415, 0.15285370861014447, 0.0], "isController": false}, {"data": ["02 - Register", 120, 0, 0.0, 0.31666666666666665, 0, 2, 0.0, 1.0, 1.0, 1.789999999999992, 6.301528120569238, 0.0, 0.24615344220973587], "isController": false}, {"data": ["04 - Call Received", 370, 35, 9.45945945945946, 5022.424324324327, 0, 6003, 6001.0, 6001.0, 6002.0, 6002.0, 4.044334652296526, 0.07218061370045689, 0.0], "isController": false}, {"data": ["01 - Connect", 120, 0, 0.0, 164.80833333333334, 52, 876, 64.0, 502.3000000000002, 567.75, 870.7499999999998, 6.25, 0.787353515625, 0.96435546875], "isController": false}, {"data": ["Select Random Target", 528, 0, 0.0, 0.8598484848484845, 0, 170, 1.0, 1.0, 1.0, 2.0, 5.33053345717401, 0.0, 0.0], "isController": false}, {"data": ["Process Call Decision", 25, 25, 100.0, 15.279999999999998, 7, 75, 12.0, 23.60000000000002, 61.19999999999997, 75.0, 0.39334151483684193, 0.0, 0.0], "isController": false}, {"data": ["03 - Call Initiated", 528, 0, 0.0, 0.17234848484848478, 0, 1, 0.0, 1.0, 1.0, 1.0, 5.123229186881429, 0.0, 0.2651671356491364], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["500/javax.script.ScriptException: org.codehaus.groovy.control.MultipleCompilationErrorsException: startup failed:\\r\\nScript14.groovy: 1: Unexpected input: 'def' @ line 1, column 347.\\r\\n   put(&quot;callerId&quot;, &quot;unknown&quot;); } def random\\r\\n                                 ^\\r\\n\\r\\n1 error\\r\\n", 1, 0.6535947712418301, 0.04506534474988734], "isController": false}, {"data": ["500/javax.script.ScriptException: org.codehaus.groovy.control.MultipleCompilationErrorsException: startup failed:\\r\\nScript7.groovy: 1: Unexpected input: 'def' @ line 1, column 347.\\r\\n   put(&quot;callerId&quot;, &quot;unknown&quot;); } def random\\r\\n                                 ^\\r\\n\\r\\n1 error\\r\\n", 1, 0.6535947712418301, 0.04506534474988734], "isController": false}, {"data": ["500/javax.script.ScriptException: org.codehaus.groovy.control.MultipleCompilationErrorsException: startup failed:\\r\\nScript19.groovy: 1: Unexpected input: 'def' @ line 1, column 347.\\r\\n   put(&quot;callerId&quot;, &quot;unknown&quot;); } def random\\r\\n                                 ^\\r\\n\\r\\n1 error\\r\\n", 1, 0.6535947712418301, 0.04506534474988734], "isController": false}, {"data": ["500/javax.script.ScriptException: org.codehaus.groovy.control.MultipleCompilationErrorsException: startup failed:\\r\\nScript6.groovy: 1: Unexpected input: 'def' @ line 1, column 347.\\r\\n   put(&quot;callerId&quot;, &quot;unknown&quot;); } def random\\r\\n                                 ^\\r\\n\\r\\n1 error\\r\\n", 1, 0.6535947712418301, 0.04506534474988734], "isController": false}, {"data": ["500/javax.script.ScriptException: org.codehaus.groovy.control.MultipleCompilationErrorsException: startup failed:\\r\\nScript13.groovy: 1: Unexpected input: 'def' @ line 1, column 347.\\r\\n   put(&quot;callerId&quot;, &quot;unknown&quot;); } def random\\r\\n                                 ^\\r\\n\\r\\n1 error\\r\\n", 1, 0.6535947712418301, 0.04506534474988734], "isController": false}, {"data": ["500/javax.script.ScriptException: org.codehaus.groovy.control.MultipleCompilationErrorsException: startup failed:\\r\\nScript15.groovy: 1: Unexpected input: 'def' @ line 1, column 347.\\r\\n   put(&quot;callerId&quot;, &quot;unknown&quot;); } def random\\r\\n                                 ^\\r\\n\\r\\n1 error\\r\\n", 1, 0.6535947712418301, 0.04506534474988734], "isController": false}, {"data": ["500/javax.script.ScriptException: org.codehaus.groovy.control.MultipleCompilationErrorsException: startup failed:\\r\\nScript23.groovy: 1: Unexpected input: 'def' @ line 1, column 347.\\r\\n   put(&quot;callerId&quot;, &quot;unknown&quot;); } def random\\r\\n                                 ^\\r\\n\\r\\n1 error\\r\\n", 1, 0.6535947712418301, 0.04506534474988734], "isController": false}, {"data": ["500/javax.script.ScriptException: org.codehaus.groovy.control.MultipleCompilationErrorsException: startup failed:\\r\\nScript20.groovy: 1: Unexpected input: 'def' @ line 1, column 347.\\r\\n   put(&quot;callerId&quot;, &quot;unknown&quot;); } def random\\r\\n                                 ^\\r\\n\\r\\n1 error\\r\\n", 1, 0.6535947712418301, 0.04506534474988734], "isController": false}, {"data": ["500/javax.script.ScriptException: org.codehaus.groovy.control.MultipleCompilationErrorsException: startup failed:\\r\\nScript10.groovy: 1: Unexpected input: 'def' @ line 1, column 347.\\r\\n   put(&quot;callerId&quot;, &quot;unknown&quot;); } def random\\r\\n                                 ^\\r\\n\\r\\n1 error\\r\\n", 1, 0.6535947712418301, 0.04506534474988734], "isController": false}, {"data": ["500/javax.script.ScriptException: org.codehaus.groovy.control.MultipleCompilationErrorsException: startup failed:\\r\\nScript25.groovy: 1: Unexpected input: 'def' @ line 1, column 347.\\r\\n   put(&quot;callerId&quot;, &quot;unknown&quot;); } def random\\r\\n                                 ^\\r\\n\\r\\n1 error\\r\\n", 1, 0.6535947712418301, 0.04506534474988734], "isController": false}, {"data": ["500/javax.script.ScriptException: org.codehaus.groovy.control.MultipleCompilationErrorsException: startup failed:\\r\\nScript28.groovy: 1: Unexpected input: 'def' @ line 1, column 347.\\r\\n   put(&quot;callerId&quot;, &quot;unknown&quot;); } def random\\r\\n                                 ^\\r\\n\\r\\n1 error\\r\\n", 1, 0.6535947712418301, 0.04506534474988734], "isController": false}, {"data": ["500/javax.script.ScriptException: org.codehaus.groovy.control.MultipleCompilationErrorsException: startup failed:\\r\\nScript18.groovy: 1: Unexpected input: 'def' @ line 1, column 347.\\r\\n   put(&quot;callerId&quot;, &quot;unknown&quot;); } def random\\r\\n                                 ^\\r\\n\\r\\n1 error\\r\\n", 1, 0.6535947712418301, 0.04506534474988734], "isController": false}, {"data": ["500/javax.script.ScriptException: org.codehaus.groovy.control.MultipleCompilationErrorsException: startup failed:\\r\\nScript8.groovy: 1: Unexpected input: 'def' @ line 1, column 347.\\r\\n   put(&quot;callerId&quot;, &quot;unknown&quot;); } def random\\r\\n                                 ^\\r\\n\\r\\n1 error\\r\\n", 1, 0.6535947712418301, 0.04506534474988734], "isController": false}, {"data": ["500/javax.script.ScriptException: org.codehaus.groovy.control.MultipleCompilationErrorsException: startup failed:\\r\\nScript24.groovy: 1: Unexpected input: 'def' @ line 1, column 347.\\r\\n   put(&quot;callerId&quot;, &quot;unknown&quot;); } def random\\r\\n                                 ^\\r\\n\\r\\n1 error\\r\\n", 1, 0.6535947712418301, 0.04506534474988734], "isController": false}, {"data": ["500/javax.script.ScriptException: org.codehaus.groovy.control.MultipleCompilationErrorsException: startup failed:\\r\\nScript3.groovy: 1: Unexpected input: 'def' @ line 1, column 347.\\r\\n   put(&quot;callerId&quot;, &quot;unknown&quot;); } def random\\r\\n                                 ^\\r\\n\\r\\n1 error\\r\\n", 1, 0.6535947712418301, 0.04506534474988734], "isController": false}, {"data": ["500/javax.script.ScriptException: org.codehaus.groovy.control.MultipleCompilationErrorsException: startup failed:\\r\\nScript21.groovy: 1: Unexpected input: 'def' @ line 1, column 347.\\r\\n   put(&quot;callerId&quot;, &quot;unknown&quot;); } def random\\r\\n                                 ^\\r\\n\\r\\n1 error\\r\\n", 1, 0.6535947712418301, 0.04506534474988734], "isController": false}, {"data": ["500/javax.script.ScriptException: org.codehaus.groovy.control.MultipleCompilationErrorsException: startup failed:\\r\\nScript9.groovy: 1: Unexpected input: 'def' @ line 1, column 347.\\r\\n   put(&quot;callerId&quot;, &quot;unknown&quot;); } def random\\r\\n                                 ^\\r\\n\\r\\n1 error\\r\\n", 1, 0.6535947712418301, 0.04506534474988734], "isController": false}, {"data": ["500/javax.script.ScriptException: org.codehaus.groovy.control.MultipleCompilationErrorsException: startup failed:\\r\\nScript27.groovy: 1: Unexpected input: 'def' @ line 1, column 347.\\r\\n   put(&quot;callerId&quot;, &quot;unknown&quot;); } def random\\r\\n                                 ^\\r\\n\\r\\n1 error\\r\\n", 1, 0.6535947712418301, 0.04506534474988734], "isController": false}, {"data": ["500/javax.script.ScriptException: org.codehaus.groovy.control.MultipleCompilationErrorsException: startup failed:\\r\\nScript17.groovy: 1: Unexpected input: 'def' @ line 1, column 347.\\r\\n   put(&quot;callerId&quot;, &quot;unknown&quot;); } def random\\r\\n                                 ^\\r\\n\\r\\n1 error\\r\\n", 1, 0.6535947712418301, 0.04506534474988734], "isController": false}, {"data": ["500/javax.script.ScriptException: org.codehaus.groovy.control.MultipleCompilationErrorsException: startup failed:\\r\\nScript11.groovy: 1: Unexpected input: 'def' @ line 1, column 347.\\r\\n   put(&quot;callerId&quot;, &quot;unknown&quot;); } def random\\r\\n                                 ^\\r\\n\\r\\n1 error\\r\\n", 1, 0.6535947712418301, 0.04506534474988734], "isController": false}, {"data": ["Sampler error: unexpected frame type (ping)./Received: Ping frame with no application data", 128, 83.66013071895425, 5.7683641279855795], "isController": false}, {"data": ["500/javax.script.ScriptException: org.codehaus.groovy.control.MultipleCompilationErrorsException: startup failed:\\r\\nScript12.groovy: 1: Unexpected input: 'def' @ line 1, column 347.\\r\\n   put(&quot;callerId&quot;, &quot;unknown&quot;); } def random\\r\\n                                 ^\\r\\n\\r\\n1 error\\r\\n", 1, 0.6535947712418301, 0.04506534474988734], "isController": false}, {"data": ["500/javax.script.ScriptException: org.codehaus.groovy.control.MultipleCompilationErrorsException: startup failed:\\r\\nScript22.groovy: 1: Unexpected input: 'def' @ line 1, column 347.\\r\\n   put(&quot;callerId&quot;, &quot;unknown&quot;); } def random\\r\\n                                 ^\\r\\n\\r\\n1 error\\r\\n", 1, 0.6535947712418301, 0.04506534474988734], "isController": false}, {"data": ["500/javax.script.ScriptException: org.codehaus.groovy.control.MultipleCompilationErrorsException: startup failed:\\r\\nScript5.groovy: 1: Unexpected input: 'def' @ line 1, column 347.\\r\\n   put(&quot;callerId&quot;, &quot;unknown&quot;); } def random\\r\\n                                 ^\\r\\n\\r\\n1 error\\r\\n", 1, 0.6535947712418301, 0.04506534474988734], "isController": false}, {"data": ["500/javax.script.ScriptException: org.codehaus.groovy.control.MultipleCompilationErrorsException: startup failed:\\r\\nScript16.groovy: 1: Unexpected input: 'def' @ line 1, column 347.\\r\\n   put(&quot;callerId&quot;, &quot;unknown&quot;); } def random\\r\\n                                 ^\\r\\n\\r\\n1 error\\r\\n", 1, 0.6535947712418301, 0.04506534474988734], "isController": false}, {"data": ["500/javax.script.ScriptException: org.codehaus.groovy.control.MultipleCompilationErrorsException: startup failed:\\r\\nScript26.groovy: 1: Unexpected input: 'def' @ line 1, column 347.\\r\\n   put(&quot;callerId&quot;, &quot;unknown&quot;); } def random\\r\\n                                 ^\\r\\n\\r\\n1 error\\r\\n", 1, 0.6535947712418301, 0.04506534474988734], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 2219, 153, "Sampler error: unexpected frame type (ping)./Received: Ping frame with no application data", 128, "500/javax.script.ScriptException: org.codehaus.groovy.control.MultipleCompilationErrorsException: startup failed:\\r\\nScript14.groovy: 1: Unexpected input: 'def' @ line 1, column 347.\\r\\n   put(&quot;callerId&quot;, &quot;unknown&quot;); } def random\\r\\n                                 ^\\r\\n\\r\\n1 error\\r\\n", 1, "500/javax.script.ScriptException: org.codehaus.groovy.control.MultipleCompilationErrorsException: startup failed:\\r\\nScript7.groovy: 1: Unexpected input: 'def' @ line 1, column 347.\\r\\n   put(&quot;callerId&quot;, &quot;unknown&quot;); } def random\\r\\n                                 ^\\r\\n\\r\\n1 error\\r\\n", 1, "500/javax.script.ScriptException: org.codehaus.groovy.control.MultipleCompilationErrorsException: startup failed:\\r\\nScript19.groovy: 1: Unexpected input: 'def' @ line 1, column 347.\\r\\n   put(&quot;callerId&quot;, &quot;unknown&quot;); } def random\\r\\n                                 ^\\r\\n\\r\\n1 error\\r\\n", 1, "500/javax.script.ScriptException: org.codehaus.groovy.control.MultipleCompilationErrorsException: startup failed:\\r\\nScript6.groovy: 1: Unexpected input: 'def' @ line 1, column 347.\\r\\n   put(&quot;callerId&quot;, &quot;unknown&quot;); } def random\\r\\n                                 ^\\r\\n\\r\\n1 error\\r\\n", 1], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": ["Regular Caller - Read Response", 288, 52, "Sampler error: unexpected frame type (ping)./Received: Ping frame with no application data", 52, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["Heavy Caller - Read Response", 240, 41, "Sampler error: unexpected frame type (ping)./Received: Ping frame with no application data", 41, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": ["04 - Call Received", 370, 35, "Sampler error: unexpected frame type (ping)./Received: Ping frame with no application data", 35, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["Process Call Decision", 25, 25, "500/javax.script.ScriptException: org.codehaus.groovy.control.MultipleCompilationErrorsException: startup failed:\\r\\nScript14.groovy: 1: Unexpected input: 'def' @ line 1, column 347.\\r\\n   put(&quot;callerId&quot;, &quot;unknown&quot;); } def random\\r\\n                                 ^\\r\\n\\r\\n1 error\\r\\n", 1, "500/javax.script.ScriptException: org.codehaus.groovy.control.MultipleCompilationErrorsException: startup failed:\\r\\nScript7.groovy: 1: Unexpected input: 'def' @ line 1, column 347.\\r\\n   put(&quot;callerId&quot;, &quot;unknown&quot;); } def random\\r\\n                                 ^\\r\\n\\r\\n1 error\\r\\n", 1, "500/javax.script.ScriptException: org.codehaus.groovy.control.MultipleCompilationErrorsException: startup failed:\\r\\nScript19.groovy: 1: Unexpected input: 'def' @ line 1, column 347.\\r\\n   put(&quot;callerId&quot;, &quot;unknown&quot;); } def random\\r\\n                                 ^\\r\\n\\r\\n1 error\\r\\n", 1, "500/javax.script.ScriptException: org.codehaus.groovy.control.MultipleCompilationErrorsException: startup failed:\\r\\nScript6.groovy: 1: Unexpected input: 'def' @ line 1, column 347.\\r\\n   put(&quot;callerId&quot;, &quot;unknown&quot;); } def random\\r\\n                                 ^\\r\\n\\r\\n1 error\\r\\n", 1, "500/javax.script.ScriptException: org.codehaus.groovy.control.MultipleCompilationErrorsException: startup failed:\\r\\nScript13.groovy: 1: Unexpected input: 'def' @ line 1, column 347.\\r\\n   put(&quot;callerId&quot;, &quot;unknown&quot;); } def random\\r\\n                                 ^\\r\\n\\r\\n1 error\\r\\n", 1], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
