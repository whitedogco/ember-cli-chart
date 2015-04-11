import Ember from 'ember';

export default Ember.Object.extend({

  updateByType: function () {
    var data = this.get('data');

    if (data.datasets) {return this.updateLinearCharts();}
    if (Array.isArray(data)) {return this.updatePieCharts();}
  },

  updateLinearCharts: function () {
    var datasets = this.get('data').datasets;
    var chart = this.get('chart');

    datasets.forEach(function(dataset, i) {
      chart.datasets[i].label = dataset.label;
      chart.datasets[i].fillColor = dataset.fillColor;
      chart.datasets[i].strokeColor = dataset.strokeColor;
      chart.datasets[i].pointColor = dataset.pointColor;
      chart.datasets[i].pointStrokeColor = dataset.pointStrokeColor;
      chart.datasets[i].pointHighlightFill = dataset.pointHighlightFill;
      chart.datasets[i].pointHighlightStroke = dataset.pointHighlightStroke;

      dataset.data.forEach(function(item, j) {
        item = item || 0;
        if (typeof chart.datasets[i] === 'undefined') {
          chart.segments[j].value = item;
        } else {
          var dataSet = chart.datasets[i];

          if(typeof dataSet.bars !== 'undefined') {
            chart.datasets[i].bars[j].value = item;
            chart.datasets[i].bars[j].fillColor = dataset.fillColor;
            chart.datasets[i].bars[j].strokeColor = dataset.strokeColor;
            chart.datasets[i].bars[j].pointColor = dataset.pointColor;
            chart.datasets[i].bars[j].pointStrokeColor = dataset.pointStrokeColor;
            chart.datasets[i].bars[j].pointHighlightFill = dataset.pointHighlightFill;
            chart.datasets[i].bars[j].pointHighlightStroke = dataset.pointHighlightStroke;
          } else {
            chart.datasets[i].points[j].value = item;
            chart.datasets[i].points[j].fillColor = dataset.fillColor;
            chart.datasets[i].points[j].strokeColor = dataset.strokeColor;
            chart.datasets[i].points[j].pointColor = dataset.pointColor;
            chart.datasets[i].points[j].pointStrokeColor = dataset.pointStrokeColor;
            chart.datasets[i].points[j].pointHighlightFill = dataset.pointHighlightFill;
            chart.datasets[i].points[j].pointHighlightStroke = dataset.pointHighlightStroke;
          }
        }
      });
    });
    return true;
  },

  updatePieCharts: function () {
    var data = this.get('data');
    var chart = this.get('chart');
    var needUpdate = false;

    data.forEach(function(segment, i) {
      if (typeof chart.segments[i] !== 'undefined') {
        segment.value = segment.value || 0;
        if (chart.segments[i].value !== segment.value) {
          chart.segments[i].value = segment.value;
          needUpdate = true;
        }
      }
      else {
        // there are now more segments than the chart knows about; add them
        chart.addData(segment, i, true);
        needUpdate = true;
      }
    });
    return needUpdate;
  }
});
