import Papa from 'papaparse';

// 基础统计数据
export const fetchBasicStatistics = () => {
  return new Promise((resolve, reject) => {
    Papa.parse('/datav_data/basic_statistics.csv', {
      download: true,
      header: true,
      dynamicTyping: true,
      complete: (results) => {
        if (results.data && results.data.length > 0) {
          const raw = results.data[0];
          // 格式化数据以适应 DataV 组件
          const formatted = {
            totalRecords: raw.total_records,
            totalStudents: raw.total_students,
            totalQuestions: raw.total_questions,
            // 正确率转为百分比
            overallAccuracy: (raw.overall_accuracy * 100).toFixed(2),
            shortTimeAccuracy: (raw.short_time_accuracy * 100).toFixed(2),
            shortTimePercent: raw.total_1_9_percentage.toFixed(2)
          };
          resolve(formatted);
        }
      },
      error: (err) => reject(err)
    });
  });
};

// 答题状态分布
export const fetchStateDistribution = () => {
  return new Promise((resolve, reject) => {
    Papa.parse('/datav_data/state_distribution.csv', {
      download: true,
      header: true,
      dynamicTyping: true,
      complete: (results) => {
        const data = results.data.filter(item => item.state); // 过滤空行
        resolve(data);
      },
      error: (err) => reject(err)
    });
  });
};
