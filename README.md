Для запуска проекта нужно перейти в соответствующую папку (test_form), выполнить npm i для подкгрузки всех библиотек и запустить проект командой npm run dev
Проект откроется на локальном хосте (127.0.0.1:3000)

Реализован компонент выбора пары значений из двух выпадающих списков: категории и подкатегории.

Соблюденные требования:
1) Названия полей: category, subcategory 
2) Возможные значения для подкатегории зависят от выбранной категории. (не открывается второе поле без выбранного значения в первом)
3) При открытии селекта должна производиться разовая подгрузка возможных
значений из удалённого источника данных. (запрос на сервер)
ocalStorage)
5) При отправке формы сохранённые значения должны быть сброшены, а
пользователю показывается уведомление об успешной отправке.

Стек:
1) Next.js;
2) TypeScript;
3) Scss, modules;
4) gsap for success block animation;
5) axios for server requests.
