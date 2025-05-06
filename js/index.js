document.addEventListener('DOMContentLoaded', function() {
    // 情感故事时间轴数据
    const timelineData = [
        {
            date: "初中时期",
            title: "懵懂的青春",
            description: "从小就被父母教育要好好学习，不知道喜欢是什么，不知道什么是爱。父母喜欢拿我们做对比，渐渐与他们渐行渐远。"
        },
        {
            date: "高一时期",
            title: "第一次心动",
            description: "遇到了一个女孩，她打乱了我的生活和思绪。当我和她被分到一组时，既高兴又害怕。她让我明白了喜欢是什么，分享欲是什么。<span class='emoji'>😊</span>"
        },
        {
            date: "高一时期",
            title: "心碎的发现",
            description: "开学时得知她有一个不负责任的父亲，一个将近破碎的家，故而辍学了。我不知道她有没有喜欢过我，只知道自己喜欢上了她。<span class='emoji'>😢</span>"
        },
        {
            date: "高三时期",
            title: "新的开始",
            description: "距离高考还有365天，进入了一个新的班级，结识了许多朋友。其中有两位从高一至高三的久时朋友，他们人很好。<span class='emoji'>✌️</span>"
        },
        {
            date: "高三时期",
            title: "意外的喜欢",
            description: "从女生闲言碎语中得知有人喜欢我。她喜欢给我捎零食，我拒绝不过别人的盛情。心里明白，可做朋友，但其他的就算了。<span class='emoji'>🤔</span>"
        },
        {
            date: "高三时期",
            title: "面熟的朋友",
            description: "认识了一位面熟的朋友，气质和性格都像高一时的那个女孩。我们成为了同桌，她喜欢听歌，又时而小打小闹。<span class='emoji'>🌸</span>"
        },
        {
            date: "高考后",
            title: "复杂的情感",
            description: "高考结束，该决裂的人早已决裂！而她闯入了我的世界，让我再次体会到了那种感觉。她喜欢找我打游戏、聊天，但我们保持着安全距离。<span class='emoji'>💕</span>"
        },
        {
            date: "最近",
            title: "勇敢的表达",
            description: "既高兴又害怕，不知道怎么回消息。刷抖音看到你在线，悬着的心放下了，但也不敢打招呼。所以勇敢地写下这些心里话。<span class='emoji'>💌</span>"
        }
    ];

    const timelineContainer = document.getElementById('timelineContainer');
    const toggleAllBtn = document.getElementById('toggleAll');
    const changeThemeBtn = document.getElementById('changeTheme');
    const titleElement = document.getElementById('head');
    const seasonEffectsContainer = document.getElementById('seasonEffectsContainer');
    const musicPlayer = document.getElementById('musicPlayer');
    const bodyElement = document.body;
    
    // 季节配置
    const seasons = [
        {
            name: "winter",
            displayName: "冬季",
            particle: "❄",
            className: "snowflake",
            color: "#b3e0ff",
            interval: 80,
            speed: 8,
            animation: "fall",
            bgColor: "#e6f2ff",
            themeColor: "#4d79ff"
        },
        {
            name: "spring",
            displayName: "春季",
            particle: "🌸",
            className: "petal",
            color: "#ff66b2",
            interval: 150,
            speed: 8,
            animation: "fallWithTwist",
            bgColor: "#fff5f7",
            themeColor: "#ff66b2"
        },
        {
            name: "summer",
            displayName: "夏季",
            particle: "💧",
            className: "raindrop",
            color: "#00a8ff",
            interval: 50,
            speed: 3,
            animation: "fallFast",
            bgColor: "#f0fff0",
            themeColor: "#00a8ff"
        },
        {
            name: "autumn",
            displayName: "秋季",
            particle: "🍂",
            className: "leaf",
            color: "#ff9900",
            interval: 200,
            speed: 6,
            animation: "fallWithDrift",
            bgColor: "#fff8f0",
            themeColor: "#ff9900"
        }
    ];
    
    let currentSeasonIndex = 1; // 默认春季
    let seasonInterval = null;
    let isDarkMode = false;
    let isMusicPlaying = false;
    const audio = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'); // 替换为您喜欢的音乐URL

    // 渲染时间轴
    function renderTimeline() {
        timelineContainer.innerHTML = '';
        timelineData.forEach((item, index) => {
            const timelineItem = document.createElement('div');
            timelineItem.className = 'timeline-item';
            timelineItem.innerHTML = `
                <div class="timeline-dot"></div>
                <div class="timeline-content collapsed">
                    <div class="timeline-date">${item.date}</div>
                    <div class="timeline-title">${item.title}</div>
                    <div class="timeline-description">${item.description}</div>
                </div>
            `;
            timelineContainer.appendChild(timelineItem);
        });

        toggleAllBtn.textContent = "全部展开";

        document.querySelectorAll('.timeline-content').forEach(content => {
            content.addEventListener('click', function() {
                this.classList.toggle('collapsed');
            });
        });
    }

    // 创建季节效果
    function createSeasonEffect(season) {
        clearSeasonEffect();
        
        bodyElement.className = season.name;
        titleElement.style.color = season.themeColor;
        
        document.querySelectorAll('.timeline-dot').forEach(dot => {
            dot.style.backgroundColor = season.themeColor;
        });
        
        document.querySelectorAll('.timeline-item::before').forEach(line => {
            line.style.backgroundColor = season.themeColor;
        });
        
        seasonInterval = setInterval(() => {
            const particle = document.createElement('div');
            particle.className = `season-particle ${season.className}`;
            particle.innerHTML = season.particle;
            particle.style.color = season.color;
            particle.style.left = Math.random() * 100 + 'vw';
            particle.style.top = '-20px';
            
            if(season.name === "winter") {
                const size = Math.random() * 20 + 15;
                particle.style.fontSize = size + 'px';
                particle.style.opacity = Math.random() * 0.7 + 0.3;
                particle.style.transform = `rotate(${Math.random() * 360}deg)`;
            } else {
                particle.style.fontSize = (Math.random() * 10 + 10) + 'px';
                particle.style.opacity = Math.random() * 0.5 + 0.5;
            }
            
            particle.style.animation = `${season.animation} ${Math.random() * season.speed + season.speed}s linear forwards`;
            seasonEffectsContainer.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, season.speed * 1000 + 1000);
        }, season.interval);
    }

    // 清除季节效果
    function clearSeasonEffect() {
        if (seasonInterval) {
            clearInterval(seasonInterval);
            seasonInterval = null;
        }
        seasonEffectsContainer.innerHTML = '';
    }

    // 切换季节
    function toggleSeason() {
        currentSeasonIndex = (currentSeasonIndex + 1) % seasons.length;
        const season = seasons[currentSeasonIndex];
        titleElement.textContent = `心路历程 - ${season.displayName}`;
        createSeasonEffect(season);
    }

    // 切换暗色/亮色模式
    function toggleDarkMode() {
        isDarkMode = !isDarkMode;
        bodyElement.classList.toggle('dark-mode');
    }

    // 切换音乐播放状态
    function toggleMusic() {
        if (isMusicPlaying) {
            audio.pause();
            musicPlayer.textContent = "🎵";
        } else {
            audio.play();
            musicPlayer.textContent = "🔊";
        }
        isMusicPlaying = !isMusicPlaying;
    }

    // 事件监听
    titleElement.addEventListener('click', toggleSeason);
    changeThemeBtn.addEventListener('click', toggleDarkMode);
    musicPlayer.addEventListener('click', toggleMusic);

    toggleAllBtn.addEventListener('click', function() {
        const allContents = document.querySelectorAll('.timeline-content');
        const isAnyCollapsed = Array.from(allContents).some(content => content.classList.contains('collapsed'));
        
        allContents.forEach(content => {
            if (isAnyCollapsed) {
                content.classList.remove('collapsed');
            } else {
                content.classList.add('collapsed');
            }
        });
        
        toggleAllBtn.textContent = isAnyCollapsed ? "全部折叠" : "全部展开";
    });

    // 初始渲染
    renderTimeline();
    createSeasonEffect(seasons[1]);
    
    // 添加动画效果
    document.querySelectorAll('.timeline-item').forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 100);
    });
});
