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

// 短时间答题分布
export const fetchShortTimeDist = () => {
  return new Promise((resolve, reject) => {
    Papa.parse('/datav_data/short_time_distribution.csv', {
      download: true,
      header: true,
      dynamicTyping: true,
      complete: (results) => {
        // 过滤掉空数据并按秒数排序
        const data = results.data.filter(item => item.second).sort((a, b) => a.second - b.second);
        resolve(data);
      },
      error: (err) => reject(err)
    });
  });
};

// 班级答题数量分布
export const fetchClassDistribution = () => {
  return new Promise((resolve, reject) => {
    Papa.parse('/datav_data/class_distribution.csv', {
      download: true,
      header: true,
      dynamicTyping: true,
      complete: (results) => {
        // 转换格式以匹配 DataV 排名轮播表：[{ name: '', value: 123 }, ...]
        const formattedData = results.data
          .filter(item => item.class)
          .map(item => ({
            name: item.class,
            value: item.count
          }));
        resolve(formattedData);
      },
      error: (err) => reject(err)
    });
  });
};

// 学习方法分布
export const fetchMethodDistribution = () => {
  return new Promise((resolve, reject) => {
    Papa.parse('/datav_data/method_distribution.csv', {
      download: true,
      header: true,
      dynamicTyping: true,
      complete: (results) => {
        // 转换格式以匹配 DataV 锥形柱图：[{ name: '', value: 123 }, ...]
        const data = results.data
          .filter(item => item.method)
          .map(item => ({
            name: item.method.replace('Method_', ''), // 简化名称显示
            value: item.count
          }));
        resolve(data);
      },
      error: (err) => reject(err)
    });
  });
};

// 班级对比数据
export const fetchClassComparison = () => {
  return new Promise((resolve, reject) => {
    Papa.parse('/datav_data/class_comparison.csv', {
      download: true,
      header: true,
      dynamicTyping: true,
      complete: (results) => {
        // 过滤并按班级名称排序（Class1, Class2...）
        const data = results.data
          .filter(item => item.class)
          .sort((a, b) => {
            const numA = parseInt(a.class.replace('Class', ''));
            const numB = parseInt(b.class.replace('Class', ''));
            return numA - numB;
          });
        resolve(data);
      },
      error: (err) => reject(err)
    });
  });
};

// 学生表现数据
export const fetchStudentPerformance = () => {
  return new Promise((resolve, reject) => {
    Papa.parse('/datav_data/student_performance.csv', {
      download: true,
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true, // 关键：跳过空行
      complete: (results) => {
        // 过滤掉没有 student_ID 的无效行
        const cleanData = results.data.filter(item => item.student_ID);
        
        if (cleanData.length === 0) {
          console.warn("学生表现数据解析为空，请检查CSV内容");
          resolve({ topStudents: [], scatterData: [] });
          return;
        }

        // 1. 获取综合排名前 20
        const topStudents = [...cleanData]
          .sort((a, b) => (a.综合排名 || 999) - (b.综合排名 || 999))
          .slice(0, 20);
        
        // 2. 格式化散点图数据 [学习强度, 正确率, 答题次数, 学生ID]
        const scatterData = cleanData.map(item => [
          item.学习强度 || 0,
          ((item.正确率 || 0) * 100).toFixed(1),
          item.答题次数 || 0,
          item.student_ID
        ]);

        resolve({ topStudents, scatterData });
      },
      error: (err) => reject(err)
    });
  });
};

// 学生分组统计
export const fetchStudentGroupStats = () => {
  return new Promise((resolve, reject) => {
    Papa.parse('/datav_data/student_group_stats.csv', {
      download: true,
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (results) => {
        const data = results.data.filter(item => item.班级);
        // 按班级编号自然排序
        data.sort((a, b) => {
          const numA = parseInt(a.班级.replace('Class', ''));
          const numB = parseInt(b.班级.replace('Class', ''));
          return numA - numB;
        });
        resolve(data);
      },
      error: (err) => reject(err)
    });
  });
};

// 小时活跃度
export const fetchHourlyActivity = () => {
  return new Promise((resolve, reject) => {
    Papa.parse('/datav_data/hourly_activity.csv', {
      download: true,
      header: true,
      dynamicTyping: true,
      complete: (results) => {
        // 确保按 0-23 小时顺序排列
        const data = results.data
          .filter(item => item.hour !== undefined)
          .sort((a, b) => a.hour - b.hour);
        resolve(data);
      },
      error: (err) => reject(err)
    });
  });
};

// 小时正确率
export const fetchHourlyAccuracy = () => {
  return new Promise((resolve, reject) => {
    Papa.parse('/datav_data/hourly_accuracy.csv', {
      download: true,
      header: true,
      dynamicTyping: true,
      complete: (results) => {
        const data = results.data
          .filter(item => item.hour !== undefined)
          .sort((a, b) => a.hour - b.hour)
          .map(item => ({
            hour: item.hour,
            // 转换为百分比并保留一位小数
            accuracy: parseFloat((item.accuracy * 100).toFixed(1))
          }));
        resolve(data);
      },
      error: (err) => reject(err)
    });
  });
};

// 星期活跃度
export const fetchWeekdayActivity = () => {
  return new Promise((resolve, reject) => {
    Papa.parse('/datav_data/weekday_activity.csv', {
      download: true,
      header: true,
      dynamicTyping: true,
      complete: (results) => {
        // 确保数据按周一到周日排序 (0-6)
        const data = results.data
          .filter(item => item.weekday_name)
          .sort((a, b) => a.weekday - b.weekday);
        resolve(data);
      },
      error: (err) => reject(err)
    });
  });
};

// 题目难度分析
export const fetchQuestionDifficulty = () => {
  return new Promise((resolve, reject) => {
    Papa.parse('/datav_data/question_difficulty.csv', {
      download: true,
      header: true,
      dynamicTyping: true,
      complete: (results) => {
        const data = results.data.filter(item => item.title_ID);
        
        // 1. 获取正确率最低的 10 道题 (难度排行榜)
        const hardestQuestions = [...data]
          .sort((a, b) => a.正确率 - b.正确率)
          .slice(0, 10);
        
        // 2. 格式化气泡图数据 [平均用时, 正确率, 答题次数, 题目ID]
        const bubbleData = data.map(item => [
          item.平均用时,
          parseFloat((item.正确率 * 100).toFixed(1)),
          item.答题次数,
          item.title_ID.replace('Question_', '') // 简化 ID 显示
        ]);

        resolve({ hardestQuestions, bubbleData });
      },
      error: (err) => reject(err)
    });
  });
};

// 题目分组统计
export const fetchDifficultyGroupStats = () => {
  return new Promise((resolve, reject) => {
    Papa.parse('/datav_data/difficulty_group_stats.csv', {
      download: true,
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (results) => {
        // 过滤掉正确率为空的行（排除掉中等和简单这两个空分类）
        const cleanData = results.data.filter(item => item.平均正确率 !== null && item.平均正确率 !== "");
        resolve(cleanData);
      },
      error: (err) => reject(err)
    });
  });
};

// 学习进步轨迹
export const fetchLearningProgress = () => {
  return new Promise((resolve, reject) => {
    Papa.parse('/datav_data/learning_progress.csv', {
      download: true,
      header: true,
      dynamicTyping: true,
      complete: (results) => {
        const rawData = results.data.filter(item => item.student_ID);
        
        // 1. 统计进步类型占比
        const stats = { 进步: 0, 退步: 0, 稳定: 0, 未分类: 0 };
        // 2. 准备象限图数据 [正确率变化, 用时变化, 学生ID]
        const quadrantData = [];

        rawData.forEach(item => {
          // 统计分类
          const type = item.进步类型 || '未分类';
          if (stats[type] !== undefined) stats[type]++;
          else stats.未分类++;

          // 清洗数值 (排除 inf 和 null)
          const accChange = isFinite(item.平均正确率变化) ? item.平均正确率变化 : 0;
          const timeChange = isFinite(item.平均用时变化) ? item.平均用时变化 : 0;
          
          if (accChange !== 0 || timeChange !== 0) {
            quadrantData.push([accChange, timeChange, item.student_ID, type]);
          }
        });

        resolve({ 
          pieData: Object.keys(stats).map(k => ({ name: k, value: stats[k] })),
          quadrantData 
        });
      },
      error: (err) => reject(err)
    });
  });
};

// 周度学习进度
export const fetchWeeklyProgress = () => {
  return new Promise((resolve, reject) => {
    Papa.parse('/datav_data/weekly_progress.csv', {
      download: true,
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (results) => {
        const rawData = results.data.filter(item => item.week);
        
        // 按周聚合数据
        const weeklyMap = {};
        rawData.forEach(item => {
          if (!weeklyMap[item.week]) {
            weeklyMap[item.week] = { acc: 0, time: 0, count: 0, students: 0 };
          }
          weeklyMap[item.week].acc += item.正确率 || 0;
          weeklyMap[item.week].time += item.平均用时 || 0;
          weeklyMap[item.week].students += 1;
        });

        // 转换为 ECharts 格式并按周排序
        const weeks = Object.keys(weeklyMap).sort((a, b) => a - b);
        const processedData = weeks.map(w => ({
          week: `第${w}周`,
          accuracy: parseFloat((weeklyMap[w].acc / weeklyMap[w].students * 100).toFixed(1)),
          avgTime: parseFloat((weeklyMap[w].time / weeklyMap[w].students).toFixed(2))
        }));

        resolve(processedData);
      },
      error: (err) => reject(err)
    });
  });
};

// 学习方法效率分析
export const fetchLearningMethods = () => {
  return new Promise((resolve, reject) => {
    Papa.parse('/datav_data/learning_methods.csv', {
      download: true,
      header: true,
      dynamicTyping: true,
      complete: (results) => {
        const data = results.data.filter(item => item.method);
        
        // 格式化数据
        const processed = data.map(item => ({
          name: item.method.split('_')[1], // 提取简写如 BXr9...
          full_name: item.method,
          accuracy: parseFloat((item.正确率 * 100).toFixed(1)),
          usage: item.使用次数,
          efficiency: item.效率指数
        }));
        
        resolve(processed);
      },
      error: (err) => reject(err)
    });
  });
};
