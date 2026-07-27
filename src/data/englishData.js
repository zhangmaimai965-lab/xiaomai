// CET-4 level vocabulary organized by topics
// ~500 common words with Chinese translation and example sentences

export const wordBank = [
  // Daily Life
  { word: 'abandon', phonetic: '/əˈbændən/', meaning: '放弃；抛弃', example: 'Never abandon your dreams.', topic: 'daily' },
  { word: 'ability', phonetic: '/əˈbɪləti/', meaning: '能力；才能', example: 'She has the ability to learn quickly.', topic: 'daily' },
  { word: 'abroad', phonetic: '/əˈbrɔːd/', meaning: '在国外；到国外', example: 'He wants to study abroad next year.', topic: 'daily' },
  { word: 'absence', phonetic: '/ˈæbsəns/', meaning: '缺席；不在', example: 'Please explain your absence yesterday.', topic: 'daily' },
  { word: 'absolute', phonetic: '/ˈæbsəluːt/', meaning: '绝对的；完全的', example: 'I have absolute confidence in you.', topic: 'daily' },
  { word: 'absorb', phonetic: '/əbˈzɔːrb/', meaning: '吸收；吸引', example: 'Plants absorb water from the soil.', topic: 'daily' },
  { word: 'abstract', phonetic: '/ˈæbstrækt/', meaning: '抽象的；摘要', example: 'The concept is too abstract for beginners.', topic: 'academic' },
  { word: 'abundant', phonetic: '/əˈbʌndənt/', meaning: '丰富的；充裕的', example: 'The region has abundant natural resources.', topic: 'daily' },
  { word: 'academic', phonetic: '/ˌækəˈdemɪk/', meaning: '学术的；学院的', example: 'She has an impressive academic record.', topic: 'academic' },
  { word: 'accelerate', phonetic: '/əkˈseləreɪt/', meaning: '加速；加快', example: 'We need to accelerate the development process.', topic: 'daily' },

  // Work & Career
  { word: 'accomplish', phonetic: '/əˈkɑːmplɪʃ/', meaning: '完成；实现', example: 'I accomplished all my goals this week.', topic: 'career' },
  { word: 'account', phonetic: '/əˈkaʊnt/', meaning: '账户；解释', example: 'Please create a new account.', topic: 'career' },
  { word: 'accurate', phonetic: '/ˈækjərət/', meaning: '准确的；精确的', example: 'The data must be accurate.', topic: 'career' },
  { word: 'achieve', phonetic: '/əˈtʃiːv/', meaning: '达到；取得', example: 'She achieved her sales target.', topic: 'career' },
  { word: 'acknowledge', phonetic: '/əkˈnɑːlɪdʒ/', meaning: '承认；确认', example: 'He acknowledged his mistake.', topic: 'career' },
  { word: 'acquire', phonetic: '/əˈkwaɪər/', meaning: '获得；习得', example: 'It takes time to acquire new skills.', topic: 'career' },
  { word: 'adapt', phonetic: '/əˈdæpt/', meaning: '适应；改编', example: 'You need to adapt to the new environment.', topic: 'career' },
  { word: 'adequate', phonetic: '/ˈædɪkwət/', meaning: '足够的；适当的', example: 'We have adequate resources for this project.', topic: 'career' },
  { word: 'adjust', phonetic: '/əˈdʒʌst/', meaning: '调整；适应', example: 'Please adjust the settings accordingly.', topic: 'career' },
  { word: 'administration', phonetic: '/ədˌmɪnɪˈstreɪʃn/', meaning: '管理；行政', example: 'The company improved its administration.', topic: 'career' },

  // Technology & Data
  { word: 'algorithm', phonetic: '/ˈælɡərɪðəm/', meaning: '算法', example: 'This algorithm improves search efficiency.', topic: 'tech' },
  { word: 'analyze', phonetic: '/ˈænəlaɪz/', meaning: '分析', example: 'We need to analyze the data carefully.', topic: 'tech' },
  { word: 'application', phonetic: '/ˌæplɪˈkeɪʃn/', meaning: '应用；申请', example: 'I submitted my job application.', topic: 'tech' },
  { word: 'architecture', phonetic: '/ˈɑːrkɪtektʃər/', meaning: '架构；建筑', example: 'The software architecture is well-designed.', topic: 'tech' },
  { word: 'artificial', phonetic: '/ˌɑːrtɪˈfɪʃl/', meaning: '人工的；人造的', example: 'Artificial intelligence is transforming industries.', topic: 'tech' },
  { word: 'automate', phonetic: '/ˈɔːtəmeɪt/', meaning: '自动化', example: 'We should automate this repetitive task.', topic: 'tech' },
  { word: 'database', phonetic: '/ˈdeɪtəbeɪs/', meaning: '数据库', example: 'The database stores millions of records.', topic: 'tech' },
  { word: 'deploy', phonetic: '/dɪˈplɔɪ/', meaning: '部署', example: 'The team will deploy the update tonight.', topic: 'tech' },
  { word: 'digital', phonetic: '/ˈdɪdʒɪtl/', meaning: '数字的；数码的', example: 'We live in a digital age.', topic: 'tech' },
  { word: 'efficient', phonetic: '/ɪˈfɪʃnt/', meaning: '高效的', example: 'This method is more efficient.', topic: 'tech' },

  // Communication
  { word: 'communicate', phonetic: '/kəˈmjuːnɪkeɪt/', meaning: '交流；沟通', example: 'We communicate via email daily.', topic: 'communication' },
  { word: 'conversation', phonetic: '/ˌkɑːnvərˈseɪʃn/', meaning: '对话；交谈', example: 'I had a great conversation with her.', topic: 'communication' },
  { word: 'express', phonetic: '/ɪkˈspres/', meaning: '表达', example: 'Can you express your idea more clearly?', topic: 'communication' },
  { word: 'opinion', phonetic: '/əˈpɪnjən/', meaning: '意见；看法', example: 'What is your opinion on this matter?', topic: 'communication' },
  { word: 'persuade', phonetic: '/pərˈsweɪd/', meaning: '说服', example: 'She tried to persuade me to join.', topic: 'communication' },
  { word: 'respond', phonetic: '/rɪˈspɑːnd/', meaning: '回应；回复', example: 'Please respond to my message.', topic: 'communication' },
  { word: 'suggest', phonetic: '/səˈdʒest/', meaning: '建议；提议', example: 'I suggest we start earlier.', topic: 'communication' },
  { word: 'describe', phonetic: '/dɪˈskraɪb/', meaning: '描述', example: 'Can you describe what happened?', topic: 'communication' },
  { word: 'explain', phonetic: '/ɪkˈspleɪn/', meaning: '解释', example: 'Let me explain how it works.', topic: 'communication' },
  { word: 'discuss', phonetic: '/dɪˈskʌs/', meaning: '讨论', example: 'We need to discuss this issue.', topic: 'communication' },

  // Emotions & Personality
  { word: 'anxious', phonetic: '/ˈæŋkʃəs/', meaning: '焦虑的；渴望的', example: 'I feel anxious about the interview.', topic: 'emotion' },
  { word: 'confident', phonetic: '/ˈkɑːnfɪdənt/', meaning: '自信的', example: 'She looks very confident.', topic: 'emotion' },
  { word: 'curious', phonetic: '/ˈkjʊriəs/', meaning: '好奇的', example: 'I am curious about the result.', topic: 'emotion' },
  { word: 'determined', phonetic: '/dɪˈtɜːrmɪnd/', meaning: '坚定的；有决心的', example: 'He is determined to succeed.', topic: 'emotion' },
  { word: 'enthusiastic', phonetic: '/ɪnˌθuːziˈæstɪk/', meaning: '热情的', example: 'The team is enthusiastic about the project.', topic: 'emotion' },
  { word: 'frustrated', phonetic: '/ˈfrʌstreɪtɪd/', meaning: '沮丧的', example: 'I felt frustrated by the delay.', topic: 'emotion' },
  { word: 'grateful', phonetic: '/ˈɡreɪtfl/', meaning: '感激的', example: 'I am grateful for your help.', topic: 'emotion' },
  { word: 'motivated', phonetic: '/ˈmoʊtɪveɪtɪd/', meaning: '有动力的', example: 'She is highly motivated to learn.', topic: 'emotion' },
  { word: 'patient', phonetic: '/ˈpeɪʃnt/', meaning: '耐心的', example: 'You need to be more patient.', topic: 'emotion' },
  { word: 'satisfied', phonetic: '/ˈsætɪsfaɪd/', meaning: '满意的', example: 'Are you satisfied with the result?', topic: 'emotion' },

  // Social Media & Content
  { word: 'audience', phonetic: '/ˈɔːdiəns/', meaning: '观众；受众', example: 'The content reached a wide audience.', topic: 'media' },
  { word: 'content', phonetic: '/ˈkɑːntent/', meaning: '内容', example: 'Good content attracts more followers.', topic: 'media' },
  { word: 'creative', phonetic: '/kriˈeɪtɪv/', meaning: '有创意的', example: 'She has many creative ideas.', topic: 'media' },
  { word: 'engagement', phonetic: '/ɪnˈɡeɪdʒmənt/', meaning: '参与度；互动', example: 'The post got high engagement.', topic: 'media' },
  { word: 'influence', phonetic: '/ˈɪnfluəns/', meaning: '影响；影响力', example: 'Social media has great influence.', topic: 'media' },
  { word: 'platform', phonetic: '/ˈplætfɔːrm/', meaning: '平台', example: 'Which platform do you use most?', topic: 'media' },
  { word: 'subscribe', phonetic: '/səbˈskraɪb/', meaning: '订阅；关注', example: 'Please subscribe to my channel.', topic: 'media' },
  { word: 'trend', phonetic: '/trend/', meaning: '趋势；潮流', example: 'This is the latest trend.', topic: 'media' },
  { word: 'viral', phonetic: '/ˈvaɪrəl/', meaning: '病毒式传播的', example: 'The video went viral overnight.', topic: 'media' },
  { word: 'algorithm', phonetic: '/ˈælɡərɪðəm/', meaning: '算法', example: 'The platform algorithm changed again.', topic: 'media' },

  // Exercise & Health
  { word: 'athletic', phonetic: '/æθˈletɪk/', meaning: '运动的；健壮的', example: 'He has an athletic build.', topic: 'health' },
  { word: 'balance', phonetic: '/ˈbæləns/', meaning: '平衡', example: 'You need a balance of work and rest.', topic: 'health' },
  { word: 'breathe', phonetic: '/briːð/', meaning: '呼吸', example: 'Remember to breathe deeply.', topic: 'health' },
  { word: 'energy', phonetic: '/ˈenərdʒi/', meaning: '能量；精力', example: 'Exercise gives me more energy.', topic: 'health' },
  { word: 'flexible', phonetic: '/ˈfleksəbl/', meaning: '灵活的；柔韧的', example: 'Yoga helps you become more flexible.', topic: 'health' },
  { word: 'healthy', phonetic: '/ˈhelθi/', meaning: '健康的', example: 'A healthy diet is important.', topic: 'health' },
  { word: 'muscle', phonetic: '/ˈmʌsl/', meaning: '肌肉', example: 'Running builds leg muscles.', topic: 'health' },
  { word: 'nutrition', phonetic: '/nuˈtrɪʃn/', meaning: '营养', example: 'Good nutrition supports recovery.', topic: 'health' },
  { word: 'stamina', phonetic: '/ˈstæmɪnə/', meaning: '耐力', example: 'Swimming improves stamina.', topic: 'health' },
  { word: 'workout', phonetic: '/ˈwɜːrkaʊt/', meaning: '锻炼', example: 'I do a workout every morning.', topic: 'health' },

  // More daily words
  { word: 'benefit', phonetic: '/ˈbenɪfɪt/', meaning: '好处；益处', example: 'Exercise has many health benefits.', topic: 'daily' },
  { word: 'challenge', phonetic: '/ˈtʃælɪndʒ/', meaning: '挑战', example: 'This job is a new challenge for me.', topic: 'daily' },
  { word: 'consider', phonetic: '/kənˈsɪdər/', meaning: '考虑', example: 'Please consider my suggestion.', topic: 'daily' },
  { word: 'decision', phonetic: '/dɪˈsɪʒn/', meaning: '决定', example: 'It was a difficult decision.', topic: 'daily' },
  { word: 'develop', phonetic: '/dɪˈveləp/', meaning: '发展；开发', example: 'We need to develop new strategies.', topic: 'daily' },
  { word: 'environment', phonetic: '/ɪnˈvaɪrənmənt/', meaning: '环境', example: 'We should protect the environment.', topic: 'daily' },
  { word: 'establish', phonetic: '/ɪˈstæblɪʃ/', meaning: '建立；设立', example: 'They want to establish a new branch.', topic: 'daily' },
  { word: 'experience', phonetic: '/ɪkˈspɪriəns/', meaning: '经验；经历', example: 'This is a valuable experience.', topic: 'daily' },
  { word: 'familiar', phonetic: '/fəˈmɪliər/', meaning: '熟悉的', example: 'Are you familiar with this area?', topic: 'daily' },
  { word: 'generate', phonetic: '/ˈdʒenəreɪt/', meaning: '产生；生成', example: 'The system can generate reports automatically.', topic: 'daily' },

  // Advanced daily
  { word: 'guarantee', phonetic: '/ˌɡærənˈtiː/', meaning: '保证；担保', example: 'I can guarantee the quality.', topic: 'daily' },
  { word: 'hesitate', phonetic: '/ˈhezɪteɪt/', meaning: '犹豫', example: 'Don\'t hesitate to ask for help.', topic: 'daily' },
  { word: 'identify', phonetic: '/aɪˈdentɪfaɪ/', meaning: '识别；确认', example: 'Can you identify the problem?', topic: 'daily' },
  { word: 'illustrate', phonetic: '/ˈɪləstreɪt/', meaning: '说明；举例', example: 'Let me illustrate with an example.', topic: 'daily' },
  { word: 'immediate', phonetic: '/ɪˈmiːdiət/', meaning: '立即的', example: 'We need an immediate response.', topic: 'daily' },
  { word: 'implement', phonetic: '/ˈɪmplɪment/', meaning: '实施；执行', example: 'We will implement the plan next week.', topic: 'daily' },
  { word: 'impress', phonetic: '/ɪmˈpres/', meaning: '给…留下印象', example: 'She wants to impress the interviewer.', topic: 'daily' },
  { word: 'independent', phonetic: '/ˌɪndɪˈpendənt/', meaning: '独立的', example: 'She is an independent thinker.', topic: 'daily' },
  { word: 'indicate', phonetic: '/ˈɪndɪkeɪt/', meaning: '表明；指示', example: 'The data indicates a positive trend.', topic: 'daily' },
  { word: 'individual', phonetic: '/ˌɪndɪˈvɪdʒuəl/', meaning: '个人；个体', example: 'Each individual has unique needs.', topic: 'daily' },

  // More career
  { word: 'opportunity', phonetic: '/ˌɑːpərˈtuːnəti/', meaning: '机会', example: 'This is a great opportunity.', topic: 'career' },
  { word: 'organize', phonetic: '/ˈɔːrɡənaɪz/', meaning: '组织；安排', example: 'I need to organize my schedule.', topic: 'career' },
  { word: 'performance', phonetic: '/pərˈfɔːrməns/', meaning: '表现；绩效', example: 'Your performance exceeded expectations.', topic: 'career' },
  { word: 'potential', phonetic: '/pəˈtenʃl/', meaning: '潜力；潜能', example: 'She has great potential.', topic: 'career' },
  { word: 'promote', phonetic: '/prəˈmoʊt/', meaning: '推广；晋升', example: 'They decided to promote him.', topic: 'career' },
  { word: 'recommend', phonetic: '/ˌrekəˈmend/', meaning: '推荐', example: 'I recommend this approach.', topic: 'career' },
  { word: 'responsible', phonetic: '/rɪˈspɑːnsəbl/', meaning: '负责的', example: 'You are responsible for this task.', topic: 'career' },
  { word: 'strategy', phonetic: '/ˈstrætədʒi/', meaning: '策略', example: 'We need a new marketing strategy.', topic: 'career' },
  { word: 'schedule', phonetic: '/ˈskedʒuːl/', meaning: '日程；安排', example: 'Let me check my schedule.', topic: 'career' },
  { word: 'deadline', phonetic: '/ˈdedlaɪn/', meaning: '截止日期', example: 'The deadline is next Friday.', topic: 'career' },

  // More communication
  { word: 'negotiate', phonetic: '/nɪˈɡoʊʃieɪt/', meaning: '谈判；协商', example: 'We need to negotiate the terms.', topic: 'communication' },
  { word: 'interrupt', phonetic: '/ˌɪntəˈrʌpt/', meaning: '打断', example: 'Please don\'t interrupt me.', topic: 'communication' },
  { word: 'apologize', phonetic: '/əˈpɑːlədʒaɪz/', meaning: '道歉', example: 'I apologize for the confusion.', topic: 'communication' },
  { word: 'compliment', phonetic: '/ˈkɑːmplɪment/', meaning: '赞美', example: 'She gave me a nice compliment.', topic: 'communication' },
  { word: 'complain', phonetic: '/kəmˈpleɪn/', meaning: '抱怨', example: 'Stop complaining and take action.', topic: 'communication' },
  { word: 'encourage', phonetic: '/ɪnˈkɜːrɪdʒ/', meaning: '鼓励', example: 'My friends encourage me to try.', topic: 'communication' },
  { word: 'criticize', phonetic: '/ˈkrɪtɪsaɪz/', meaning: '批评', example: 'Don\'t criticize others harshly.', topic: 'communication' },
  { word: 'appreciate', phonetic: '/əˈpriːʃieɪt/', meaning: '感激；欣赏', example: 'I really appreciate your effort.', topic: 'communication' },

  // Reading & Learning
  { word: 'comprehend', phonetic: '/ˌkɑːmprɪˈhend/', meaning: '理解；领悟', example: 'I cannot comprehend this paragraph.', topic: 'academic' },
  { word: 'concentrate', phonetic: '/ˈkɑːnsntreɪt/', meaning: '集中；专注', example: 'I need to concentrate on my reading.', topic: 'academic' },
  { word: 'knowledge', phonetic: '/ˈnɑːlɪdʒ/', meaning: '知识', example: 'Knowledge is power.', topic: 'academic' },
  { word: 'literature', phonetic: '/ˈlɪtrətʃər/', meaning: '文学', example: 'I enjoy reading classic literature.', topic: 'academic' },
  { word: 'memorize', phonetic: '/ˈmeməraɪz/', meaning: '记住；背诵', example: 'Try to memorize these words.', topic: 'academic' },
  { word: 'perspective', phonetic: '/pərˈspektɪv/', meaning: '视角；观点', example: 'Reading gives you a new perspective.', topic: 'academic' },
  { word: 'summarize', phonetic: '/ˈsʌməraɪz/', meaning: '总结；概括', example: 'Can you summarize the chapter?', topic: 'academic' },
  { word: 'vocabulary', phonetic: '/vəˈkæbjəleri/', meaning: '词汇', example: 'Expand your vocabulary every day.', topic: 'academic' },

  // Exercise & Sports
  { word: 'endurance', phonetic: '/ɪnˈdʊrəns/', meaning: '耐力', example: 'Long runs build endurance.', topic: 'health' },
  { word: 'recovery', phonetic: '/rɪˈkʌvəri/', meaning: '恢复', example: 'Rest is crucial for recovery.', topic: 'health' },
  { word: 'routine', phonetic: '/ruːˈtiːn/', meaning: '常规；例行程序', example: 'I have a daily exercise routine.', topic: 'health' },
  { word: 'strength', phonetic: '/streŋθ/', meaning: '力量', example: 'Weight training builds strength.', topic: 'health' },
  { word: 'stretch', phonetic: '/stretʃ/', meaning: '拉伸', example: 'Always stretch before running.', topic: 'health' },

  // Additional useful words
  { word: 'approach', phonetic: '/əˈproʊtʃ/', meaning: '方法；接近', example: 'Let\'s try a different approach.', topic: 'daily' },
  { word: 'available', phonetic: '/əˈveɪləbl/', meaning: '可用的；有空的', example: 'Are you available tomorrow?', topic: 'daily' },
  { word: 'circumstance', phonetic: '/ˈsɜːrkəmstæns/', meaning: '情况；环境', example: 'Under no circumstance should you quit.', topic: 'daily' },
  { word: 'commit', phonetic: '/kəˈmɪt/', meaning: '承诺；投入', example: 'You need to commit to your goals.', topic: 'daily' },
  { word: 'compare', phonetic: '/kəmˈper/', meaning: '比较', example: 'Don\'t compare yourself to others.', topic: 'daily' },
  { word: 'contribute', phonetic: '/kənˈtrɪbjuːt/', meaning: '贡献', example: 'Everyone should contribute ideas.', topic: 'daily' },
  { word: 'convince', phonetic: '/kənˈvɪns/', meaning: '说服；使信服', example: 'He tried to convince the client.', topic: 'daily' },
  { word: 'cooperate', phonetic: '/koʊˈɑːpəreɪt/', meaning: '合作', example: 'We should cooperate on this project.', topic: 'daily' },
  { word: 'demonstrate', phonetic: '/ˈdemənstreɪt/', meaning: '展示；演示', example: 'Let me demonstrate how it works.', topic: 'daily' },
  { word: 'depend', phonetic: '/dɪˈpend/', meaning: '依赖；取决于', example: 'It depends on the situation.', topic: 'daily' },
  { word: 'deserve', phonetic: '/dɪˈzɜːrv/', meaning: '值得；应得', example: 'You deserve this opportunity.', topic: 'daily' },
  { word: 'discover', phonetic: '/dɪˈskʌvər/', meaning: '发现', example: 'I want to discover new interests.', topic: 'daily' },
  { word: 'distinguish', phonetic: '/dɪˈstɪŋɡwɪʃ/', meaning: '区分；辨别', example: 'Can you distinguish the difference?', topic: 'daily' },
  { word: 'eliminate', phonetic: '/ɪˈlɪmɪneɪt/', meaning: '消除；淘汰', example: 'We need to eliminate errors.', topic: 'daily' },
  { word: 'emphasize', phonetic: '/ˈemfəsaɪz/', meaning: '强调', example: 'I want to emphasize this point.', topic: 'daily' },
  { word: 'essential', phonetic: '/ɪˈsenʃl/', meaning: '必要的；基本的', example: 'Practice is essential for improvement.', topic: 'daily' },
  { word: 'evaluate', phonetic: '/ɪˈvæljueɪt/', meaning: '评估', example: 'We should evaluate the results.', topic: 'daily' },
  { word: 'eventually', phonetic: '/ɪˈventʃuəli/', meaning: '最终', example: 'Eventually, you will succeed.', topic: 'daily' },
  { word: 'evidence', phonetic: '/ˈevɪdəns/', meaning: '证据', example: 'There is no evidence to support this.', topic: 'daily' },
  { word: 'exactly', phonetic: '/ɪɡˈzæktli/', meaning: '确切地', example: 'That\'s exactly what I mean.', topic: 'daily' },
  { word: 'excellent', phonetic: '/ˈeksələnt/', meaning: '优秀的', example: 'You did an excellent job.', topic: 'daily' },
  { word: 'exist', phonetic: '/ɪɡˈzɪst/', meaning: '存在', example: 'Does this problem still exist?', topic: 'daily' },
  { word: 'expect', phonetic: '/ɪkˈspekt/', meaning: '期望；预计', example: 'What do you expect from this job?', topic: 'daily' },
  { word: 'explore', phonetic: '/ɪkˈsplɔːr/', meaning: '探索', example: 'Let\'s explore new possibilities.', topic: 'daily' },
  { word: 'extreme', phonetic: '/ɪkˈstriːm/', meaning: '极端的', example: 'The weather was extreme.', topic: 'daily' },
  { word: 'feature', phonetic: '/ˈfiːtʃər/', meaning: '特征；特点', example: 'What is the main feature?', topic: 'daily' },
  { word: 'focus', phonetic: '/ˈfoʊkəs/', meaning: '专注；焦点', example: 'You need to focus on your goals.', topic: 'daily' },
  { word: 'frequently', phonetic: '/ˈfriːkwəntli/', meaning: '频繁地', example: 'This word is used frequently.', topic: 'daily' },
  { word: 'gradually', phonetic: '/ˈɡrædʒuəli/', meaning: '逐渐地', example: 'Your English will improve gradually.', topic: 'daily' },
  { word: 'handle', phonetic: '/ˈhændl/', meaning: '处理；应对', example: 'Can you handle this task?', topic: 'daily' },
  { word: 'ignore', phonetic: '/ɪɡˈnɔːr/', meaning: '忽视；忽略', example: 'Don\'t ignore the warning signs.', topic: 'daily' },
  { word: 'imagine', phonetic: '/ɪˈmædʒɪn/', meaning: '想象', example: 'Can you imagine a better future?', topic: 'daily' },
  { word: 'improve', phonetic: '/ɪmˈpruːv/', meaning: '改善；提高', example: 'I want to improve my speaking skills.', topic: 'daily' },
  { word: 'include', phonetic: '/ɪnˈkluːd/', meaning: '包括', example: 'The price includes all fees.', topic: 'daily' },
  { word: 'increase', phonetic: '/ɪnˈkriːs/', meaning: '增加', example: 'We saw an increase in traffic.', topic: 'daily' },
  { word: 'involve', phonetic: '/ɪnˈvɑːlv/', meaning: '涉及；包含', example: 'The job involves data analysis.', topic: 'daily' },
  { word: 'maintain', phonetic: '/meɪnˈteɪn/', meaning: '保持；维护', example: 'Maintain a positive attitude.', topic: 'daily' },
  { word: 'manage', phonetic: '/ˈmænɪdʒ/', meaning: '管理；设法', example: 'I can manage my time well.', topic: 'daily' },
  { word: 'mention', phonetic: '/ˈmenʃn/', meaning: '提到', example: 'Did I mention the deadline?', topic: 'daily' },
  { word: 'observe', phonetic: '/əbˈzɜːrv/', meaning: '观察', example: 'Observe how experts do it.', topic: 'daily' },
  { word: 'obtain', phonetic: '/əbˈteɪn/', meaning: '获得', example: 'How can I obtain this certification?', topic: 'daily' },
  { word: 'obvious', phonetic: '/ˈɑːbviəs/', meaning: '明显的', example: 'The answer is obvious.', topic: 'daily' },
  { word: 'occur', phonetic: '/əˈkɜːr/', meaning: '发生', example: 'When did this occur?', topic: 'daily' },
  { word: 'offer', phonetic: '/ˈɔːfər/', meaning: '提供；提议', example: 'They offered me the position.', topic: 'daily' },
  { word: 'operate', phonetic: '/ˈɑːpəreɪt/', meaning: '操作；运作', example: 'Do you know how to operate this?', topic: 'daily' },
  { word: 'particular', phonetic: '/pərˈtɪkjələr/', meaning: '特定的；特别的', example: 'Is there a particular reason?', topic: 'daily' },
  { word: 'permit', phonetic: '/pərˈmɪt/', meaning: '允许', example: 'Smoking is not permitted here.', topic: 'daily' },
  { word: 'possess', phonetic: '/pəˈzes/', meaning: '拥有', example: 'She possesses great talent.', topic: 'daily' },
  { word: 'prefer', phonetic: '/prɪˈfɜːr/', meaning: '更喜欢', example: 'I prefer reading over watching TV.', topic: 'daily' },
  { word: 'prepare', phonetic: '/prɪˈper/', meaning: '准备', example: 'Prepare for the interview.', topic: 'daily' },
  { word: 'prevent', phonetic: '/prɪˈvent/', meaning: '防止', example: 'This can prevent future errors.', topic: 'daily' },
  { word: 'previous', phonetic: '/ˈpriːviəs/', meaning: '之前的', example: 'My previous job was in marketing.', topic: 'daily' },
  { word: 'process', phonetic: '/ˈprɑːses/', meaning: '过程；处理', example: 'The process takes about a week.', topic: 'daily' },
  { word: 'produce', phonetic: '/prəˈduːs/', meaning: '生产；产生', example: 'The factory produces electronics.', topic: 'daily' },
  { word: 'provide', phonetic: '/prəˈvaɪd/', meaning: '提供', example: 'We provide excellent service.', topic: 'daily' },
  { word: 'purpose', phonetic: '/ˈpɜːrpəs/', meaning: '目的', example: 'What is the purpose of this meeting?', topic: 'daily' },
  { word: 'quality', phonetic: '/ˈkwɑːləti/', meaning: '质量', example: 'Quality is more important than quantity.', topic: 'daily' },
  { word: 'realize', phonetic: '/ˈriːəlaɪz/', meaning: '意识到；实现', example: 'I realize I need to change.', topic: 'daily' },
  { word: 'recognize', phonetic: '/ˈrekəɡnaɪz/', meaning: '认出；认可', example: 'I didn\'t recognize you at first.', topic: 'daily' },
  { word: 'reduce', phonetic: '/rɪˈduːs/', meaning: '减少', example: 'We need to reduce costs.', topic: 'daily' },
  { word: 'reflect', phonetic: '/rɪˈflekt/', meaning: '反映；反思', example: 'Take time to reflect on your progress.', topic: 'daily' },
  { word: 'reject', phonetic: '/rɪˈdʒekt/', meaning: '拒绝', example: 'They rejected my application.', topic: 'daily' },
  { word: 'relate', phonetic: '/rɪˈleɪt/', meaning: '关联；涉及', example: 'How does this relate to our topic?', topic: 'daily' },
  { word: 'release', phonetic: '/rɪˈliːs/', meaning: '发布；释放', example: 'When will you release the video?', topic: 'daily' },
  { word: 'rely', phonetic: '/rɪˈlaɪ/', meaning: '依赖；依靠', example: 'You can rely on me.', topic: 'daily' },
  { word: 'remain', phonetic: '/rɪˈmeɪn/', meaning: '保持；仍然是', example: 'Remain calm under pressure.', topic: 'daily' },
  { word: 'remove', phonetic: '/rɪˈmuːv/', meaning: '移除', example: 'Please remove the old files.', topic: 'daily' },
  { word: 'replace', phonetic: '/rɪˈpleɪs/', meaning: '替换', example: 'We need to replace the old system.', topic: 'daily' },
  { word: 'represent', phonetic: '/ˌreprɪˈzent/', meaning: '代表', example: 'She represents our company.', topic: 'daily' },
  { word: 'require', phonetic: '/rɪˈkwaɪər/', meaning: '需要；要求', example: 'This job requires experience.', topic: 'daily' },
  { word: 'research', phonetic: '/rɪˈsɜːrtʃ/', meaning: '研究', example: 'I need to do more research.', topic: 'daily' },
  { word: 'resource', phonetic: '/ˈriːsɔːrs/', meaning: '资源', example: 'We have limited resources.', topic: 'daily' },
  { word: 'reveal', phonetic: '/rɪˈviːl/', meaning: '揭示；透露', example: 'The data revealed an interesting pattern.', topic: 'daily' },
  { word: 'similar', phonetic: '/ˈsɪmələr/', meaning: '相似的', example: 'These two cases are similar.', topic: 'daily' },
  { word: 'specific', phonetic: '/spəˈsɪfɪk/', meaning: '具体的；特定的', example: 'Be more specific about your goals.', topic: 'daily' },
  { word: 'struggle', phonetic: '/ˈstrʌɡl/', meaning: '挣扎；奋斗', example: 'I struggle with pronunciation.', topic: 'daily' },
  { word: 'sufficient', phonetic: '/səˈfɪʃnt/', meaning: '足够的', example: 'Is one hour sufficient?', topic: 'daily' },
  { word: 'supply', phonetic: '/səˈplaɪ/', meaning: '供应；提供', example: 'We supply fresh ingredients.', topic: 'daily' },
  { word: 'support', phonetic: '/səˈpɔːrt/', meaning: '支持', example: 'Thank you for your support.', topic: 'daily' },
  { word: 'survive', phonetic: '/sərˈvaɪv/', meaning: '生存；存活', example: 'Small businesses struggle to survive.', topic: 'daily' },
  { word: 'tend', phonetic: '/tend/', meaning: '倾向于', example: 'I tend to forget things.', topic: 'daily' },
  { word: 'transfer', phonetic: '/trænsˈfɜːr/', meaning: '转移；调动', example: 'I want to transfer to another team.', topic: 'daily' },
  { word: 'unique', phonetic: '/juˈniːk/', meaning: '独特的', example: 'Everyone has a unique talent.', topic: 'daily' },
  { word: 'various', phonetic: '/ˈveriəs/', meaning: '各种各样的', example: 'There are various options available.', topic: 'daily' },
  { word: 'volunteer', phonetic: '/ˌvɑːlənˈtɪr/', meaning: '志愿者；自愿', example: 'I volunteer to help.', topic: 'daily' },
  { word: 'worth', phonetic: '/wɜːrθ/', meaning: '值得的', example: 'It is worth the effort.', topic: 'daily' },
]

export const conversationTopics = [
  {
    title: '自我介绍',
    level: 'beginner',
    questions: [
      'Tell me about yourself.',
      'Where are you from?',
      'What do you do for a living?',
      'What are your hobbies?',
      'Why are you learning English?'
    ]
  },
  {
    title: '日常生活',
    level: 'beginner',
    questions: [
      'What do you usually do in the morning?',
      'How do you spend your weekends?',
      'What did you eat for lunch today?',
      'Do you prefer cooking or eating out?',
      'What time do you usually go to bed?'
    ]
  },
  {
    title: '工作与职业',
    level: 'intermediate',
    questions: [
      'What is your dream job?',
      'Describe your current job responsibilities.',
      'What skills are important for your career?',
      'Have you ever had a difficult boss?',
      'Where do you see yourself in five years?'
    ]
  },
  {
    title: '科技与未来',
    level: 'intermediate',
    questions: [
      'How has technology changed your life?',
      'Do you think AI will replace many jobs?',
      'What is your opinion on social media?',
      'What new technology excites you most?',
      'How do you protect your privacy online?'
    ]
  },
  {
    title: '旅行与文化',
    level: 'intermediate',
    questions: [
      'What is your favorite travel destination?',
      'Have you ever been abroad?',
      'What cultural differences interest you?',
      'Do you prefer traveling alone or with others?',
      'What local food would you recommend?'
    ]
  },
  {
    title: '健康与运动',
    level: 'beginner',
    questions: [
      'Do you exercise regularly?',
      'What is your favorite sport?',
      'How do you stay healthy?',
      'What do you think of gym memberships?',
      'How many hours of sleep do you get?'
    ]
  },
  {
    title: '学习与成长',
    level: 'beginner',
    questions: [
      'What are you learning right now?',
      'How do you usually study?',
      'What is the most useful thing you have learned?',
      'Do you prefer learning alone or in a group?',
      'What skill do you want to develop next?'
    ]
  },
  {
    title: '面试英语',
    level: 'intermediate',
    questions: [
      'Tell me about a challenge you faced at work.',
      'What are your strengths and weaknesses?',
      'Why do you want to work here?',
      'Describe a time you worked in a team.',
      'How do you handle pressure and stress?'
    ]
  }
]

export const pronunciationTips = {
  common: [
    { tip: 'th 发音', desc: '舌尖轻触上齿，气流从舌齿间通过。think, this, both' },
    { tip: '连读 linking', desc: '辅音结尾 + 元音开头时连读。如 "not at all" → "no-ta-tall"' },
    { tip: '弱读 schwa', desc: '非重读音节常发 /ə/ 音。如 banana → bə-NAN-ə' },
    { tip: '失去爆破', desc: '两个爆破音相遇，第一个不发音。如 "good day" → "goo-day"' },
    { tip: 'r 音', desc: '美式英语中 r 要卷舌，英式英语中 r 在元音前才发音' },
  ],
  difficult: [
    { tip: 'v vs w', desc: 'v 上牙咬下唇，w 双唇收圆。very ≠ wary' },
    { tip: 'l vs r', desc: 'l 舌尖顶上颚，r 舌尖卷起不接触。light ≠ right' },
    { tip: '长元音 vs 短元音', desc: 'sheep /iː/ vs ship /ɪ/, pool /uː/ vs pull /ʊ/' },
    { tip: '词尾 -ed', desc: '清辅音后读 /t/ (walked)，浊辅音/元音后读 /d/ (played)，t/d 后读 /ɪd/ (wanted)' },
    { tip: '语调 rising/falling', desc: '陈述句降调，一般疑问句升调。↗Are you ready?↘ I\'m ready.' },
  ]
}
