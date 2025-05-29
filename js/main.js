  document.addEventListener('DOMContentLoaded', function() {
      // Элементы DOM
      const clickBtn = document.querySelector('.btn_cat');
      const counter = document.querySelector('h1');
      const progressLine = document.querySelector('.lvl_info_line');
      const currentLevelSpan = document.querySelector('.lvl_info_prev span');
      const nextLevelSpan = document.querySelector('.lvl_info_next span');
      const currentProgress = document.querySelector('.bottom_progress span:first-child');
      const maxProgress = document.querySelector('.bottom_progress span:last-child');
      const btnContent = document.querySelector('.btn_content_index');

      // Начальные значения
      let clicks = 0;
      let level = 1;
      let requiredClicks = 1024; // Кликов нужно для следующего уровня
      let clickValue = 10; // Количество очков за клик

      // Обновление интерфейса
      function updateUI() {
          // Плавное изменение счетчика
          animateValue(counter, parseInt(counter.textContent), clicks, 500);

          // Расчет прогресса для текущего уровня
          const progressPercent = Math.min((clicks / requiredClicks) * 100, 100);
          progressLine.style.background = `linear-gradient(to right, #FFFFFF ${progressPercent}%, #3B3B3B ${progressPercent}%)`;

          // Обновление текста прогресса
          animateValue(currentProgress, parseInt(currentProgress.textContent), Math.min(clicks, requiredClicks), 500);
          maxProgress.textContent = requiredClicks;

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

      // Создание эффекта клика
      function createClickEffect(x, y, value) {
          const effect = document.createElement('div');
          effect.className = 'click-effect';
          effect.textContent = `+${value}`;
          effect.style.left = `${x}px`;
          effect.style.top = `${y}px`;
          document.body.appendChild(effect);

          // Удаление эффекта после завершения анимации
          setTimeout(() => {
              effect.remove();
          }, 1000);
      }

      // Эффект повышения уровня
      function createLevelUpEffect() {
          const effect = document.createElement('div');
          effect.className = 'level-up-effect';
          effect.textContent = `Level Up! ${level}`;
          document.body.appendChild(effect);

          // Удаление эффекта после завершения анимации
          setTimeout(() => {
              effect.remove();
          }, 1500);
      }

      // Обработчик клика
      clickBtn.addEventListener('click', function(e) {
          // Получаем координаты клика
          const rect = this.getBoundingClientRect();
          const x = rect.left + rect.width / 2;
          const y = rect.top + rect.height / 2;

          // Увеличиваем счетчик
          clicks += clickValue;

          // Создаем эффект клика
          createClickEffect(x, y, clickValue);

          // Проверка на переход на новый уровень
          if (clicks >= requiredClicks) {
              level++;
              clickValue += 1; // Увеличиваем значение клика
              requiredClicks = Math.floor(requiredClicks * 2.5); // Увеличиваем требуемое количество кликов
              clicks = 0; // Сбрасываем счетчик для нового уровня

              // Создаем эффект повышения уровня
              createLevelUpEffect();
          }

          updateUI();
      });

      // Обработчики для сенсорных устройств (предотвращаем задержку на мобильных)
      clickBtn.addEventListener('touchstart', function(e) {
          e.preventDefault();
          this.classList.add('active');
      }, { passive: false });

      clickBtn.addEventListener('touchend', function(e) {
          e.preventDefault();
          this.classList.remove('active');
      }, { passive: false });

      // Инициализация
      updateUI();
  });