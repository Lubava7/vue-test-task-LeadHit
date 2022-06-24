<template>
  <router-view>
    <div class="analytics">
      <h1>Аналитика</h1>
    </div>
    <h2>Аналитика по визитам</h2>
    <div class="chartdiv" ref="chartdiv"></div>
  </router-view>
</template>
<script>
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);
export default {
  name: "AmChart",
  mounted() {
    let chart = am4core.create("chartdiv", am4charts.XYChart);
    chart.data = [
      { date: "2020-07-01", visits: 213 },
      { date: "2020-07-02", visits: 249 },
      { date: "2020-07-03", visits: 179 },
      { date: "2020-07-04", visits: 170 },
      { date: "2020-07-05", visits: 184 },
      { date: "2020-07-06", visits: 202 },
      { date: "2020-07-07", visits: 198 },
      { date: "2020-07-08", visits: 168 },
      { date: "2020-07-09", visits: 176 },
      { date: "2020-07-10", visits: 171 },
      { date: "2020-07-11", visits: 190 },
      { date: "2020-07-12", visits: 154 },
      { date: "2020-07-13", visits: 246 },
      { date: "2020-07-14", visits: 250 },
      { date: "2020-07-15", visits: 227 },
      { date: "2020-07-16", visits: 140 },
      { date: "2020-07-17", visits: 170 },
      { date: "2020-07-18", visits: 125 },
      { date: "2020-07-19", visits: 106 },
      { date: "2020-07-20", visits: 207 },
      { date: "2020-07-21", visits: 222 },
      { date: "2020-07-22", visits: 198 },
      { date: "2020-07-23", visits: 204 },
      { date: "2020-07-24", visits: 213 },
      { date: "2020-07-25", visits: 145 },
      { date: "2020-07-26", visits: 166 },
      { date: "2020-07-27", visits: 163 },
      { date: "2020-07-28", visits: 135 },
      { date: "2020-07-29", visits: 45 },
    ];

    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;
    dateAxis.renderer.minGridDistance = 60;
    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;

    let iconSeries = chart.series.push(new am4charts.ColumnSeries());
    iconSeries.fill = am4core.color("#e6c8fa");
    iconSeries.strokeOpacity = 0;
    iconSeries.stroke = am4core.color("#9500fc");
    iconSeries.name = "Events";
    iconSeries.dataFields.dateX = "date";
    iconSeries.dataFields.valueY = "v";

    let series = chart.series.push(new am4charts.LineSeries());
    series.dataFields.dateX = "date";
    series.dataFields.valueY = "visits";
    series.tooltipText = "visits: {valueY}";
    series.sequencedInterpolation = true;
    series.stroke = am4core.color("#9500fc");
    series.strokeWidth = 2;
    series.name = "District Metered Usage";
    series.stroke = chart.colors.getIndex(0);
    series.fill = am4core.color("#e6c8fa");
    series.fillOpacity = 0.8;

    let bullet = series.bullets.push(new am4charts.CircleBullet());
    bullet.fill = new am4core.InterfaceColorSet().getFor("background");
    bullet.fillOpacity = 1;
    bullet.strokeWidth = 2;
    bullet.circle.radius = 4;

    let series2 = chart.series.push(new am4charts.LineSeries());
    series2.dataFields.dateX = "date";
    series2.dataFields.valueY = "visits";
    series2.sequencedInterpolation = true;
    series2.strokeWidth = 2;
    series2.tooltip.getFillFromObject = false;
    series2.tooltip.getStrokeFromObject = true;
    series2.tooltip.label.fill = am4core.color("#000");
    series2.name = "SP Aggregate usage";
    series2.stroke = am4core.color("#9500fc");
    series2.fill = am4core.color("#9500fc");

    let bullet2 = series2.bullets.push(new am4charts.CircleBullet());
    bullet2.fill = am4core.color("#9500fc");
    bullet2.fillOpacity = 1;
    bullet2.strokeWidth = 2;
    bullet2.circle.radius = 4;

    chart.cursor = new am4charts.XYCursor();
    chart.cursor.xAxis = dateAxis;
    chart.cursor.yAxis = valueAxis;
    chart.scrollbarX = new am4core.Scrollbar();

    let negativeRange;

    chart.events.on("datavalidated", function () {
      series.dataItems.each(function (s1DataItem) {
        let s1PreviousDataItem;
        let s2PreviousDataItem;

        let s2DataItem = series2.dataItems.getIndex(s1DataItem.index);

        if (s1DataItem.index > 0) {
          s1PreviousDataItem = series.dataItems.getIndex(s1DataItem.index - 1);
          s2PreviousDataItem = series2.dataItems.getIndex(s1DataItem.index - 1);
        }

        let startTime = am4core.time
          .round(
            new Date(s1DataItem.dateX.getTime()),
            dateAxis.baseInterval.timeUnit,
            dateAxis.baseInterval.count
          )
          .getTime();

        if (s1PreviousDataItem && s2PreviousDataItem) {
          let x0 =
            am4core.time
              .round(
                new Date(s1PreviousDataItem.dateX.getTime()),
                dateAxis.baseInterval.timeUnit,
                dateAxis.baseInterval.count
              )
              .getTime() +
            dateAxis.baseDuration / 2;
          let y01 = s1PreviousDataItem.valueY;
          let y02 = s2PreviousDataItem.valueY;

          let x1 = startTime + dateAxis.baseDuration / 2;
          let y11 = s1DataItem.valueY;
          let y12 = s2DataItem.valueY;

          let intersection = am4core.math.getLineIntersection(
            { x: x0, y: y01 },
            { x: x1, y: y11 },
            { x: x0, y: y02 },
            { x: x1, y: y12 }
          );

          startTime = Math.round(intersection.x);
        }

        if (s2DataItem.valueY > s1DataItem.valueY) {
          if (!negativeRange) {
            negativeRange = dateAxis.createSeriesRange(series);
            negativeRange.date = new Date(startTime);
            negativeRange.contents.fill = series2.fill;
            negativeRange.contents.fillOpacity = 0.8;
          }
        } else {
          if (negativeRange) {
            negativeRange.endDate = new Date(startTime);
          }
          negativeRange = undefined;
        }
        if (s1DataItem.index == series.dataItems.length - 1) {
          if (negativeRange) {
            negativeRange.endDate = new Date(
              s1DataItem.dateX.getTime() + dateAxis.baseDuration / 2
            );
            negativeRange = undefined;
          }
        }
      });
    });
  },
};
</script>

<style lang="scss">
.analytics {
  color: black;

  h1 {
    font-weight: 300;
  }
}
h2 {
  font-weight: 300;
}
.chartdiv {
  width: 100%;
  height: 500px;
}
</style>
