document.addEventListener('DOMContentLoaded', function() {
    // Элементы DOM
    const clickBtn = document.querySelector('.btn_cat');
    const counter = document.querySelector('h1');
    const progressLine = document.querySelector('.lvl_info_line');
    const currentLevelSpan = document.querySelector('.lvl_info_prev span');
    const nextLevelSpan = document.querySelector('.lvl_info_next span');
    const currentProgress = document.querySelector('.bottom_progress span:first-child');
    const maxProgress = document.querySelector('.bottom_progress span:last-child');

    // Начальные значения
    let clicks = 0;
    let level = 1;
    let requiredClicks = 1024; // Кликов нужно для следующего уровня

    // Обновление интерфейса
    function updateUI() {
        // Плавное изменение счетчика
        animateValue(counter, parseInt(counter.textContent), clicks, 500);

        // Расчет прогресса для текущего уровня
        const progressPercent = Math.min((clicks / requiredClicks) * 100, 100);
        progressLine.style.background = `linear-gradient(to right, #FFFFFF ${progressPercent}%, #3B3B3B ${progressPercent}%)`;

        // Обновление текста прогресса
        animateValue(currentProgress, parseInt(currentProgress.textContent), clicks, 500);
        animateValue(maxProgress, parseInt(maxProgress.textContent), requiredClicks, 500);

        // Обновление уровней
        currentLevelSpan.textContent = level;
        nextLevelSpan.textContent = level + 1;
    }

    // Функция для плавной анимации чисел
    function animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            element.textContent = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // Обработчик клика
    clickBtn.addEventListener('click', function() {
        clicks += 10;

        // Проверка на переход на новый уровень
        if (clicks >= requiredClicks) {
            level++;
            requiredClicks *= 2; // Удваиваем требуемое количество кликов

            // Анимация перехода уровня
            progressLine.style.transition = 'background 0.5s ease';
            setTimeout(() => {
                progressLine.style.background = '#3B3B3B';
                progressLine.style.transition = 'background 0.1s ease';
                setTimeout(() => {
                    progressLine.style.background = `linear-gradient(to right, #FFFFFF 0%, #3B3B3B 0%)`;
                }, 100);
            }, 500);
        }

        updateUI();
    });

    // Инициализация
    updateUI();
});