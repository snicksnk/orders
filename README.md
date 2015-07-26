#README

**Sski crm** - небольшая crm ориентированная на использование в интернет магазинах. 
В данный момент проект находится на ранней стадии разработки, но базовые возможности уже присутствуют. 


##Основные элементы: 

- ####Форма заказа
Содержит поля с информацией о клиенте 

- ####Форма добавления товара в заказ 
Предназначена для ввода url картинки с товаром для дальнейшего его отображения в списке товаров в заказе

- ####Список товаров в заказе
Прикрепленные к заказу товары, цена и количество для каждого. При прикреплении ранее добавляемого товара, цена подгружается автоматом. 

- ####Список заказов
Список ранее произведенных заказов
Для управления используется контроллер order


##Структура проекта: 
- https://github.com/snicksnk/orders/blob/orders/public/index.html - **index.html**
- https://github.com/snicksnk/orders/tree/orders/public/app - код веб приложения

- Для организации подгрузки скриптов используется библиотека **requirejs**, реализующая паттерн amd.
 Использовалась методология, описанная в этой статье, с некоторыми изменениями http://habrahabr.ru/post/225931/

- Подключение всех скриптов осуществляется одной строчкой 
https://github.com/snicksnk/orders/blob/orders/public/index.html#L109 

- Основным файлом проекта является **main.js**
https://github.com/snicksnk/orders/blob/orders/public/main.js
Содержащий конфиг requirejs - подключение всех библиотек проекта, их инициализацию, а так же подключение инициализатора самого веб приложения
https://github.com/snicksnk/orders/blob/orders/public/app/bootstrap.js#L12

- **app.js**  
https://github.com/snicksnk/orders/blob/orders/public/app/app.js 
обьявляет основной angular модуль приложение, подключает и инициализирует конфиг, сервисы и контроллеры 

 - **orders.ctrl**
https://github.com/snicksnk/orders/blob/orders/public/app/modules/orders/scripts/orders.ctrl.js
Контроллер, реализующий основной функционал веб приложения

 -  **Orders.svc**
https://github.com/snicksnk/orders/blob/orders/public/app/modules/orders/scripts/orders.svc.js
Сервис для работы с заказами
 - **GoodsInOrder.svc**
https://github.com/snicksnk/orders/blob/orders/public/app/modules/orders/scripts/goodsInOrder.svc.js
Сервис для работы с товарами внутри заказа

 - **Routes**
https://github.com/snicksnk/orders/blob/orders/public/app/config/routes.js
Содержит конфиги для общения с бэкендом 

 - **States**
https://github.com/snicksnk/orders/blob/orders/public/app/config/states.js
Используется для роутинга внутри angular приложение с использованием ui.route (пока не используется по причине того весь функционал пока реализуется на одной странице без необходимости переходов)


