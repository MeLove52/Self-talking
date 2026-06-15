// charts.js — habit plan visualizations
(function () {
  var style = getComputedStyle(document.documentElement);
  var accent = style.getPropertyValue('--accent').trim();
  var accent2 = style.getPropertyValue('--accent2').trim();
  var ink = style.getPropertyValue('--ink').trim();
  var muted = style.getPropertyValue('--muted').trim();
  var rule = style.getPropertyValue('--rule').trim();
  var bg2 = style.getPropertyValue('--bg2').trim();

  // --- Chart 1: Pie — habits by life domain ---
  var pieEl = document.getElementById('chart-pie');
  if (pieEl) {
    var pie = echarts.init(pieEl, null, { renderer: 'svg' });
    pie.setOption({
      animation: false,
      tooltip: { trigger: 'item', appendToBody: true, formatter: '{b}: {c} 项 ({d}%)' },
      color: [accent, accent2, ink, muted, accent + 'aa', accent2 + 'aa'],
      legend: {
        bottom: 0,
        textStyle: { color: muted, fontSize: 11 },
        itemWidth: 10,
        itemHeight: 10
      },
      series: [{
        name: '习惯数量',
        type: 'pie',
        radius: ['42%', '68%'],
        center: ['50%', '45%'],
        avoidLabelOverlap: true,
        itemStyle: { borderColor: bg2, borderWidth: 2 },
        label: {
          color: ink,
          fontSize: 12,
          formatter: '{b}\n{c}'
        },
        labelLine: { length: 8, length2: 8, lineStyle: { color: rule } },
        data: [
          { value: 17, name: '健康、美' },
          { value: 12, name: '自我投资' },
          { value: 11, name: '运用时间' },
          { value: 11, name: '人际关系' },
          { value: 10, name: '心灵成长' },
          { value: 7, name: '金钱' }
        ]
      }]
    });
    window.addEventListener('resize', function () { pie.resize(); });
  }

  // --- Chart 2: Bar — habits by difficulty / required cultivation period ---
  var diffEl = document.getElementById('chart-difficulty');
  if (diffEl) {
    var diff = echarts.init(diffEl, null, { renderer: 'svg' });
    diff.setOption({
      animation: false,
      tooltip: {
        trigger: 'axis',
        appendToBody: true,
        axisPointer: { type: 'shadow' },
        formatter: function (params) {
          var p = params[0];
          return p.name + '<br/>数量：<b>' + p.value + '</b> 项';
        }
      },
      grid: { left: 110, right: 30, top: 30, bottom: 40 },
      xAxis: {
        type: 'value',
        max: 70,
        axisLine: { lineStyle: { color: rule } },
        axisLabel: { color: muted, fontSize: 11 },
        splitLine: { lineStyle: { color: rule, type: 'dashed' } }
      },
      yAxis: {
        type: 'category',
        data: ['思考习惯\n约 6 个月', '身体习惯 ★\n约 3 个月', '行为习惯\n约 1 个月'],
        axisLine: { lineStyle: { color: rule } },
        axisTick: { show: false },
        axisLabel: { color: ink, fontSize: 11, lineHeight: 14 }
      },
      series: [{
        type: 'bar',
        barWidth: 26,
        data: [
          { value: 4, itemStyle: { color: accent2 } },
          { value: 7, itemStyle: { color: accent } },
          { value: 59, itemStyle: { color: ink } }
        ],
        label: {
          show: true,
          position: 'right',
          color: ink,
          fontSize: 12,
          formatter: '{c} 项'
        }
      }]
    });
    window.addEventListener('resize', function () { diff.resize(); });
  }
})();
