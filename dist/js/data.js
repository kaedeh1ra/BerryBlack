/* Демонстрационные данные WB Select. Бренды, товары и цены вымышленные. */

const IMG = (id, w = 800) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

const GROUPS = [
  { id: 'fashion', name: 'Мода и аксессуары', note: 'Премиум-бренды, нишевые шоурумы, часы и украшения', cats: ['clothes', 'shoes', 'bags', 'accessories', 'watches', 'jewelry', 'beauty'] },
  { id: 'home', name: 'Дом и крупные покупки', note: 'Техника, мебель и спорт с доставкой, подъёмом и сборкой', cats: ['appliances', 'furniture', 'sport', 'tools'] },
  { id: 'tech', name: 'Техника', note: 'Электроника и профессиональная аппаратура', cats: ['tech', 'audio'] },
];

const CATS = {
  clothes: { name: 'Одежда', img: '1539109136881-3be0616acf4b' },
  shoes: { name: 'Обувь', img: '1543163521-1bf539c55dd2' },
  bags: { name: 'Сумки', img: '1584917865442-de89df76afd3' },
  accessories: { name: 'Аксессуары', img: '1511499767150-a48a237f0083' },
  watches: { name: 'Часы', img: '1587836374828-4dbafa94cf0e' },
  jewelry: { name: 'Ювелирные изделия', img: '1605100804763-247f67b3557e' },
  beauty: { name: 'Красота', img: '1556228578-8c89e6adf883' },
  appliances: { name: 'Крупная техника', img: '1571175443880-49e1d25b2bc5' },
  furniture: { name: 'Мебель', img: '1555041469-a586c61ea9bc' },
  sport: { name: 'Спорт', img: '1485965120184-e220f721d03e' },
  tools: { name: 'Инструменты', img: '1504148455328-c376907d081c' },
  tech: { name: 'Электроника', img: '1496181133206-80ce9b88a853' },
  audio: { name: 'Проф. аудио', img: '1598488035139-bdbb2231ce04' },
};

const SUPPLY = {
  official: { name: 'Официальный дистрибьютор', short: 'Официально' },
  parallel: { name: 'Параллельный импорт, проверено Select', short: 'Параллельный импорт' },
  showroom: { name: 'Нишевый бренд из шоурума', short: 'Шоурум' },
  ru: { name: 'Российский премиум-бренд', short: 'Российский бренд' },
};

const DELIVERY = {
  courier: 'Курьер ко времени',
  pvz: 'Select-пункт',
  fitting: 'С примеркой',
  install: 'С подъёмом и сборкой',
};

const BRANDS = [
  { id: 'maison-arlen', name: 'Maison Arlen', country: 'Франция', supply: 'official', since: 1987 },
  { id: 'sever-atelier', name: 'Sever Atelier', country: 'Россия', supply: 'ru', since: 2014 },
  { id: 'atelier-vass', name: 'Atelier Vass', country: 'Италия', supply: 'parallel', since: 1962 },
  { id: 'oriel', name: 'ORIEL', country: 'Италия', supply: 'official', since: 1971 },
  { id: 'kami', name: 'KAMI', country: 'Россия', supply: 'showroom', since: 2019 },
  { id: 'halden', name: 'Halden', country: 'Дания', supply: 'official', since: 2003 },
  { id: 'ferro', name: 'Ferro & Co', country: 'Италия', supply: 'parallel', since: 1954 },
  { id: 'nordvik', name: 'NORDVIK', country: 'Швеция', supply: 'official', since: 1998 },
  { id: 'aurele', name: 'Aurèle', country: 'Франция', supply: 'parallel', since: 1979 },
  { id: 'linea-passo', name: 'Linea Passo', country: 'Италия', supply: 'parallel', since: 1990 },
  { id: 'solare', name: 'SOLARE', country: 'Италия', supply: 'official', since: 1983 },
  { id: 'graal', name: 'Graal', country: 'Швейцария', supply: 'parallel', since: 1921 },
  { id: 'kronberg', name: 'Kronberg', country: 'Германия', supply: 'official', since: 1949 },
  { id: 'zolotnik', name: 'Золотник', country: 'Россия', supply: 'ru', since: 2008 },
  { id: 'perle', name: 'Perle Maison', country: 'Франция', supply: 'showroom', since: 2011 },
  { id: 'flora-lab', name: 'Flora Lab', country: 'Республика Корея', supply: 'official', since: 2012 },
  { id: 'vela-casa', name: 'Vela Casa', country: 'Италия', supply: 'official', since: 1966 },
  { id: 'frost-line', name: 'Frost Line', country: 'Германия', supply: 'parallel', since: 1958 },
  { id: 'dom-forma', name: 'Дом Форма', country: 'Россия', supply: 'ru', since: 2010 },
  { id: 'tervo', name: 'TERVO', country: 'Финляндия', supply: 'official', since: 1995 },
  { id: 'axis', name: 'Axis Tools', country: 'Германия', supply: 'official', since: 1936 },
  { id: 'monolith', name: 'Monolith', country: 'США', supply: 'parallel', since: 1984 },
  { id: 'orbit', name: 'ORBIT', country: 'Республика Корея', supply: 'parallel', since: 2001 },
  { id: 'lumen', name: 'Lumen Audio', country: 'Дания', supply: 'official', since: 1975 },
  { id: 'optika', name: 'Optika', country: 'Япония', supply: 'parallel', since: 1937 },
  { id: 'volna', name: 'Волна Про', country: 'Россия', supply: 'ru', since: 2016 },
];

const P = (o) => ({
  rating: 4.8, reviews: 24, stock: 5, isNew: false, has360: false, sizes: null,
  warranty: '1 год', returnDays: 30, delivery: ['courier', 'pvz'], ...o,
});

const PRODUCTS = [
  P({ id: 1, brand: 'maison-arlen', cat: 'clothes', title: 'Пальто из шерсти и кашемира', price: 89900, imgs: ['1539109136881-3be0616acf4b', '1490481651871-ab68de25d43d', '1445205170230-053b83016050'], material: 'Шерсть', rating: 4.9, reviews: 41, isNew: true, has360: true, sizes: ['XS', 'S', 'M', 'L'], delivery: ['courier', 'pvz', 'fitting'], specs: { 'Состав': '80% шерсть, 20% кашемир', 'Подкладка': 'Купро', 'Посадка': 'Свободная', 'Длина': 'Миди, 112 см', 'Уход': 'Только химчистка' } }),
  P({ id: 2, brand: 'sever-atelier', cat: 'clothes', title: 'Джемпер из мериноса ручной вязки', price: 24900, imgs: ['1434389677669-e08b4cac3105', '1620799140408-edc6dcb6d633'], material: 'Шерсть', rating: 4.9, reviews: 63, sizes: ['S', 'M', 'L', 'XL'], delivery: ['courier', 'pvz', 'fitting'], isNew: true, specs: { 'Состав': '100% меринос', 'Вязка': 'Ручная, косы', 'Производство': 'Санкт-Петербург', 'Уход': 'Ручная стирка 30°' } }),
  P({ id: 3, brand: 'atelier-vass', cat: 'clothes', title: 'Кожаная куртка-косуха', price: 112000, imgs: ['1551028719-00167b16eac5', '1591047139829-d91aecb6caea'], material: 'Кожа', rating: 4.7, reviews: 18, sizes: ['S', 'M', 'L'], delivery: ['courier', 'pvz', 'fitting'], specs: { 'Материал': 'Телячья кожа', 'Фурнитура': 'Латунь', 'Подкладка': 'Вискоза', 'Происхождение': 'Италия, ввезено по параллельному импорту' } }),
  P({ id: 4, brand: 'oriel', cat: 'clothes', title: 'Костюм-двойка из шерсти Super 120s', price: 134000, imgs: ['1507679799987-c73779587ccf', '1594938298603-c8148c4dae35', '1617137968427-85924c800a22'], material: 'Шерсть', rating: 4.9, reviews: 29, sizes: ['46', '48', '50', '52'], delivery: ['courier', 'pvz', 'fitting'], has360: true, specs: { 'Ткань': 'Шерсть Super 120s', 'Крой': 'Slim', 'Пиджак': 'Двубортный', 'Подгонка': 'Бесплатно в Select-пункте' } }),
  P({ id: 5, brand: 'kami', cat: 'clothes', title: 'Костюм оверсайз, лён', price: 38500, imgs: ['1515886657613-9f3515b0c78f'], material: 'Лён', rating: 4.8, reviews: 12, sizes: ['XS', 'S', 'M'], delivery: ['courier', 'pvz', 'fitting'], isNew: true, specs: { 'Состав': '100% лён', 'Тираж': 'Капсула 120 штук', 'Шоурум': 'Москва, Патриаршие' } }),
  P({ id: 6, brand: 'kami', cat: 'clothes', title: 'Платье-макси из шёлка', price: 46000, imgs: ['1595777457583-95e059d581b8', '1496747611176-843222e1e57c'], material: 'Шёлк', rating: 4.9, reviews: 22, sizes: ['XS', 'S', 'M', 'L'], delivery: ['courier', 'pvz', 'fitting'], specs: { 'Состав': '100% шёлк', 'Длина': 'Макси', 'Застёжка': 'Потайная молния' } }),
  P({ id: 7, brand: 'halden', cat: 'clothes', title: 'Бомбер из технологичного нейлона', price: 31900, imgs: ['1591047139829-d91aecb6caea'], material: 'Нейлон', rating: 4.6, reviews: 15, sizes: ['S', 'M', 'L', 'XL'], delivery: ['courier', 'pvz', 'fitting'], stock: 0, specs: { 'Материал': 'Переработанный нейлон', 'Утеплитель': 'Нет', 'Страна': 'Португалия' } }),
  P({ id: 8, brand: 'ferro', cat: 'bags', title: 'Сумка-тоут из зернистой кожи', price: 98000, imgs: ['1584917865442-de89df76afd3', '1590874103328-eac38a683ce7'], material: 'Кожа', rating: 4.9, reviews: 37, has360: true, specs: { 'Материал': 'Зернистая телячья кожа', 'Размер': '32 × 24 × 14 см', 'Фурнитура': 'Позолота', 'Комплект': 'Пыльник, карточка подлинности' } }),
  P({ id: 9, brand: 'ferro', cat: 'bags', title: 'Мини-сумка на цепочке', price: 64500, imgs: ['1566150905458-1bf1fc113f0d'], material: 'Кожа', rating: 4.8, reviews: 21, isNew: true, specs: { 'Материал': 'Наппа', 'Размер': '20 × 13 × 6 см', 'Ремень': 'Съёмная цепочка' } }),
  P({ id: 10, brand: 'nordvik', cat: 'bags', title: 'Рюкзак из вощёного хлопка', price: 27900, imgs: ['1553062407-98eeb64c6a62', '1622560480605-d83c853bc5c3'], material: 'Хлопок', rating: 4.7, reviews: 54, specs: { 'Материал': 'Вощёный хлопок, кожа', 'Объём': '18 л', 'Отделение': 'Для ноутбука 15"' } }),
  P({ id: 11, brand: 'nordvik', cat: 'accessories', title: 'Кошелёк из растительного дубления', price: 12900, imgs: ['1627123424574-724758594e93'], material: 'Кожа', rating: 4.8, reviews: 88, specs: { 'Материал': 'Кожа растительного дубления', 'Отделения': '8 карт, купюры' } }),
  P({ id: 12, brand: 'aurele', cat: 'shoes', title: 'Туфли из лакированной кожи', price: 54000, imgs: ['1543163521-1bf539c55dd2'], material: 'Кожа', rating: 4.7, reviews: 19, sizes: ['36', '37', '38', '39', '40'], delivery: ['courier', 'pvz', 'fitting'], specs: { 'Материал': 'Лакированная кожа', 'Каблук': '9 см', 'Подошва': 'Кожа' } }),
  P({ id: 13, brand: 'linea-passo', cat: 'shoes', title: 'Кеды из замши ручной работы', price: 42000, imgs: ['1549298916-b41d501d3772', '1600185365483-26d7a4cc7519'], material: 'Замша', rating: 4.8, reviews: 46, sizes: ['40', '41', '42', '43', '44'], delivery: ['courier', 'pvz', 'fitting'], isNew: true, specs: { 'Верх': 'Замша', 'Подошва': 'Резина, прошитая', 'Страна': 'Италия' } }),
  P({ id: 14, brand: 'linea-passo', cat: 'shoes', title: 'Кожаные кроссовки, белые', price: 39500, imgs: ['1608231387042-66d1773070a5'], material: 'Кожа', rating: 4.9, reviews: 102, sizes: ['39', '40', '41', '42', '43'], delivery: ['courier', 'pvz', 'fitting'], specs: { 'Верх': 'Гладкая кожа', 'Подкладка': 'Кожа', 'Стелька': 'Анатомическая' } }),
  P({ id: 15, brand: 'solare', cat: 'accessories', title: 'Солнцезащитные очки, ацетат', price: 28900, imgs: ['1511499767150-a48a237f0083', '1572635196237-14b3f281503f'], material: 'Ацетат', rating: 4.8, reviews: 33, specs: { 'Оправа': 'Ацетат целлюлозы', 'Линзы': 'Минеральное стекло, UV400', 'Комплект': 'Футляр, салфетка' } }),
  P({ id: 16, brand: 'graal', cat: 'watches', title: 'Часы механические, 40 мм', price: 465000, imgs: ['1587836374828-4dbafa94cf0e', '1547996160-81dfa63595aa', '1524592094714-0f0654e20314'], material: 'Сталь', rating: 5.0, reviews: 9, has360: true, warranty: '2 года', returnDays: 14, specs: { 'Механизм': 'Автоподзавод, 42 ч запаса хода', 'Корпус': 'Сталь 316L, 40 мм', 'Стекло': 'Сапфировое', 'Водозащита': '100 м', 'Документы': 'Паспорт, гарантийный талон, сертификат проверки Select' } }),
  P({ id: 17, brand: 'kronberg', cat: 'watches', title: 'Часы кварцевые, розовое золото', price: 74000, imgs: ['1522312346375-d1a52e2b99b3', '1524592094714-0f0654e20314'], material: 'Сталь', rating: 4.8, reviews: 27, warranty: '2 года', specs: { 'Механизм': 'Кварцевый, Швейцария', 'Корпус': 'Сталь, PVD-покрытие', 'Ремешок': 'Кожа аллигатора' } }),
  P({ id: 18, brand: 'kronberg', cat: 'watches', title: 'Смарт-часы в титановом корпусе', price: 52000, imgs: ['1523275335684-37898b6baf30'], material: 'Титан', rating: 4.6, reviews: 58, isNew: true, warranty: '2 года', specs: { 'Корпус': 'Титан, 42 мм', 'Экран': 'AMOLED, сапфир', 'Автономность': 'До 7 дней' } }),
  P({ id: 19, brand: 'zolotnik', cat: 'jewelry', title: 'Кольцо с бриллиантом 0,5 карата', price: 289000, imgs: ['1605100804763-247f67b3557e'], material: 'Золото', rating: 5.0, reviews: 14, sizes: ['16', '16.5', '17', '17.5', '18'], warranty: 'Пожизненная', returnDays: 14, has360: true, specs: { 'Металл': 'Белое золото 585', 'Вставка': 'Бриллиант 0,5 ct, 4/5', 'Сертификат': 'Гемологический, ГИА', 'Проба': 'Клеймо Пробирной палаты РФ' } }),
  P({ id: 20, brand: 'zolotnik', cat: 'jewelry', title: 'Подвеска с сапфиром', price: 86000, imgs: ['1599643478518-a784e5dc4c8f'], material: 'Золото', rating: 4.9, reviews: 11, warranty: 'Пожизненная', returnDays: 14, specs: { 'Металл': 'Жёлтое золото 585', 'Вставка': 'Сапфир 1,1 ct', 'Цепь': '45 см' } }),
  P({ id: 21, brand: 'perle', cat: 'jewelry', title: 'Колье из жемчуга Акойя', price: 148000, imgs: ['1515562141207-7a88fb7ce338'], material: 'Жемчуг', rating: 4.9, reviews: 7, returnDays: 14, specs: { 'Жемчуг': 'Акойя, 7–7,5 мм', 'Замок': 'Золото 750', 'Длина': '42 см' } }),
  P({ id: 22, brand: 'perle', cat: 'jewelry', title: 'Серьги с топазами', price: 72000, imgs: ['1535632066927-ab7c9ab60908'], material: 'Серебро', rating: 4.7, reviews: 16, isNew: true, returnDays: 14, specs: { 'Металл': 'Серебро 925, родирование', 'Вставка': 'Лондонский топаз' } }),
  P({ id: 23, brand: 'flora-lab', cat: 'beauty', title: 'Набор ухода за кожей, 4 средства', price: 18900, imgs: ['1556228578-8c89e6adf883', '1612817288484-6f916006741a'], material: '—', rating: 4.8, reviews: 140, returnDays: 14, specs: { 'Состав набора': 'Очищение, тонер, сыворотка, крем', 'Тип кожи': 'Все типы', 'Срок годности': '24 месяца' } }),
  P({ id: 24, brand: 'flora-lab', cat: 'beauty', title: 'Крем для лица с пептидами', price: 9400, imgs: ['1620916566398-39f1143ab7be'], material: '—', rating: 4.7, reviews: 96, returnDays: 14, specs: { 'Объём': '50 мл', 'Активы': 'Пептиды, ниацинамид' } }),
  P({ id: 25, brand: 'vela-casa', cat: 'appliances', title: 'Холодильник в стиле 50-х, мятный', price: 219000, imgs: ['1571175443880-49e1d25b2bc5', '1556911220-bff31c812dba'], material: 'Сталь', rating: 4.8, reviews: 23, delivery: ['courier', 'install'], warranty: '3 года', returnDays: 14, specs: { 'Объём': '281 л', 'Класс': 'A+++', 'Размеры': '60 × 65 × 153 см', 'Установка': 'Включена в стоимость' } }),
  P({ id: 26, brand: 'frost-line', cat: 'appliances', title: 'Холодильник Side-by-Side', price: 389000, imgs: ['1584568694244-14fbdf83bd30', '1556909114-f6e7ad7d3136'], material: 'Сталь', rating: 4.7, reviews: 12, delivery: ['courier', 'install'], warranty: '3 года', returnDays: 14, specs: { 'Объём': '614 л', 'No Frost': 'Да', 'Ввоз': 'Параллельный импорт, сервис партнёра Select' } }),
  P({ id: 27, brand: 'vela-casa', cat: 'appliances', title: 'Кофемашина с жерновой кофемолкой', price: 124000, imgs: ['1570222094114-d054a817e56b', '1517668808822-9ebb02f2a0e6'], material: 'Сталь', rating: 4.9, reviews: 51, isNew: true, warranty: '2 года', specs: { 'Тип': 'Рожковая, с кофемолкой', 'Давление': '15 бар', 'Бойлер': 'Двойной' } }),
  P({ id: 28, brand: 'dom-forma', cat: 'furniture', title: 'Диван из велюра, 3-местный', price: 196000, imgs: ['1555041469-a586c61ea9bc', '1493663284031-b7e3aefcae8e'], material: 'Велюр', rating: 4.8, reviews: 31, delivery: ['courier', 'install'], returnDays: 14, warranty: '5 лет', has360: true, specs: { 'Обивка': 'Велюр, 45 000 циклов Мартиндейла', 'Каркас': 'Массив берёзы', 'Размер': '228 × 96 × 82 см', 'Производство': 'Россия, Калуга' } }),
  P({ id: 29, brand: 'dom-forma', cat: 'furniture', title: 'Кресло с высокой спинкой', price: 84000, imgs: ['1586023492125-27b2c045efd7', '1567538096630-e0c55bd6374c'], material: 'Букле', rating: 4.9, reviews: 20, delivery: ['courier', 'install'], returnDays: 14, warranty: '5 лет', specs: { 'Обивка': 'Букле', 'Ножки': 'Дуб', 'Размер': '78 × 82 × 104 см' } }),
  P({ id: 30, brand: 'halden', cat: 'furniture', title: 'Стул обеденный, гнутая фанера', price: 36500, imgs: ['1592078615290-033ee584e267'], material: 'Дерево', rating: 4.7, reviews: 44, delivery: ['courier', 'pvz', 'install'], specs: { 'Сиденье': 'Литой пластик', 'Ножки': 'Бук', 'Нагрузка': 'до 120 кг' } }),
  P({ id: 31, brand: 'tervo', cat: 'sport', title: 'Шоссейный велосипед, карбон', price: 348000, imgs: ['1485965120184-e220f721d03e', '1532298229144-0ec0c57515c7'], material: 'Карбон', rating: 4.9, reviews: 17, delivery: ['courier', 'install'], warranty: '5 лет на раму', returnDays: 14, specs: { 'Рама': 'Карбон, 7,4 кг', 'Трансмиссия': '2 × 12', 'Тормоза': 'Гидравлические дисковые', 'Сборка': 'Настройка мастером при доставке' } }),
  P({ id: 32, brand: 'tervo', cat: 'sport', title: 'Набор гантелей с подставкой', price: 79000, imgs: ['1576678927484-cc907957088c', '1534438327276-14e5300c3a48'], material: 'Сталь', rating: 4.8, reviews: 26, delivery: ['courier', 'install'], specs: { 'Вес': '2,5–25 кг, 10 пар', 'Покрытие': 'Уретан', 'Стойка': 'В комплекте' } }),
  P({ id: 33, brand: 'axis', cat: 'tools', title: 'Дрель-шуруповёрт бесщёточная', price: 32900, imgs: ['1504148455328-c376907d081c', '1581244277943-fe4a9c777189'], material: 'Сталь', rating: 4.8, reviews: 73, warranty: '3 года', specs: { 'Крутящий момент': '120 Н·м', 'Аккумулятор': '18 В, 2 × 5 Ач', 'Кейс': 'Да' } }),
  P({ id: 34, brand: 'monolith', cat: 'tech', title: 'Ноутбук 14", 32 ГБ / 1 ТБ', price: 239000, imgs: ['1496181133206-80ce9b88a853', '1525547719571-a2d4ac8945e2'], material: 'Алюминий', rating: 4.8, reviews: 64, warranty: '1 год, сервис партнёра Select', returnDays: 14, specs: { 'Экран': '14,2", 120 Гц', 'Память': '32 ГБ / 1 ТБ', 'Ввоз': 'Параллельный импорт, IMEI/серийный номер проверен', 'Раскладка': 'RU/EN гравировка' } }),
  P({ id: 35, brand: 'monolith', cat: 'tech', title: 'Телевизор OLED 65"', price: 279000, imgs: ['1593359677879-a4bb92f829d1'], material: '—', rating: 4.7, reviews: 22, delivery: ['courier', 'install'], warranty: '2 года', returnDays: 14, specs: { 'Матрица': 'OLED, 120 Гц', 'Диагональ': '65"', 'Монтаж': 'Настенный монтаж при доставке' } }),
  P({ id: 36, brand: 'orbit', cat: 'tech', title: 'Смартфон 512 ГБ, лавандовый', price: 129000, imgs: ['1610945265064-0e34e5519bbf', '1511707171634-5f897ff02aa9'], material: '—', rating: 4.8, reviews: 119, isNew: true, returnDays: 14, specs: { 'Память': '12 / 512 ГБ', 'Ввоз': 'Параллельный импорт, IMEI проверен', 'Гарантия': '1 год, сервис партнёра Select' } }),
  P({ id: 37, brand: 'lumen', cat: 'tech', title: 'Наушники с активным шумоподавлением', price: 54900, imgs: ['1505740420928-5e560c06d30e', '1583394838336-acd977736f90'], material: 'Алюминий', rating: 4.9, reviews: 210, warranty: '2 года', specs: { 'Тип': 'Полноразмерные, закрытые', 'Шумоподавление': 'Адаптивное', 'Автономность': '40 ч' } }),
  P({ id: 38, brand: 'optika', cat: 'tech', title: 'Беззеркальная камера, полный кадр', price: 259000, imgs: ['1502920917128-1aa500764cbd', '1516035069371-29a1b244cc32'], material: 'Магниевый сплав', rating: 4.9, reviews: 31, has360: true, returnDays: 14, specs: { 'Матрица': '33 Мп, полный кадр', 'Видео': '4K 60p', 'Ввоз': 'Параллельный импорт, серийный номер проверен' } }),
  P({ id: 39, brand: 'volna', cat: 'audio', title: 'Студийный конденсаторный микрофон', price: 46500, imgs: ['1590602847861-f357a9332bbc'], material: 'Латунь', rating: 4.9, reviews: 38, warranty: '3 года', specs: { 'Капсюль': '1", кардиоида', 'Подключение': 'XLR', 'Производство': 'Россия, Зеленоград' } }),
  P({ id: 40, brand: 'volna', cat: 'audio', title: 'Студийные мониторы, пара', price: 118000, imgs: ['1598488035139-bdbb2231ce04', '1511379938547-c1f69419868d'], material: 'МДФ', rating: 4.8, reviews: 15, delivery: ['courier', 'pvz', 'install'], warranty: '3 года', specs: { 'Мощность': '2 × 110 Вт', 'НЧ-динамик': '8"', 'Настройка': 'Акустический замер при установке' } }),
  P({ id: 41, brand: 'volna', cat: 'audio', title: 'Синтезатор аналоговый, 61 клавиша', price: 164000, imgs: ['1598653222000-6b7b7a552625', '1520523839897-bd0b52f945a0'], material: 'Алюминий', rating: 5.0, reviews: 8, isNew: true, warranty: '3 года', specs: { 'Полифония': '8 голосов', 'Клавиатура': '61, с послекасанием' } }),
];

PRODUCTS.forEach((p) => {
  const b = BRANDS.find((x) => x.id === p.brand);
  p.brandName = b.name;
  p.country = b.country;
  p.supply = b.supply;
  p.article = String(18400000 + p.id * 7349);
  p.cert = `SEL-${2026}-${String(p.id * 389).padStart(5, '0')}`;
  p.added = 41 - p.id;
});

const PICKUP_POINTS = [
  { id: 'patr', name: 'Select-пункт · Патриаршие', address: 'Малая Бронная, 15', hours: '09:00–23:00', note: 'Примерочные, кофе, консультант-стилист' },
  { id: 'city', name: 'Select-пункт · Москва-Сити', address: 'Пресненская наб., 2', hours: '08:00–23:00', note: 'Отдельное окно без очереди' },
  { id: 'ostozh', name: 'Select-пункт · Остоженка', address: 'Остоженка, 7', hours: '10:00–22:00', note: 'Парковка, выдача крупных покупок' },
];

const STANDARDS = [
  { id: 'standards', title: 'Наши стандарты', img: '1441986300917-64674bd600d8', text: 'В Select попадают только бренды и продавцы, прошедшие отбор: документы на товар, качество контента, рейтинг не ниже 4,7 и скорость ответа покупателю.' },
  { id: 'original', title: 'Оригинальные товары', img: '1584917865442-de89df76afd3', text: 'Каждая партия проверяется: документы поставки, маркировка «Честный знак», серийные номера. Товары параллельного импорта дополнительно осматривает эксперт. Если окажется подделка, вернём двойную стоимость.' },
  { id: 'assortment', title: 'Отобранный ассортимент', img: '1490481651871-ab68de25d43d', text: 'Мировые премиум-бренды, нишевые шоурумы и российские дизайнеры. Без дублей, перекупов и случайных товаров.' },
  { id: 'package', title: 'Фирменная упаковка', img: '1441984904996-e0b6ba687e04', text: 'Плотная чёрная коробка Select, тканевый пыльник и карточка подлинности. Подарочная упаковка с открыткой — по желанию.' },
  { id: 'fitting', title: 'Примерка при получении', img: '1445205170230-053b83016050', text: 'Курьер подождёт 15 минут, пока вы примеряете. Платите только за то, что подошло. В Select-пунктах есть примерочные.' },
  { id: 'support', title: 'Поддержка 24/7', img: '1483985988355-763728e1935b', text: 'Отдельная линия для клиентов Select: отвечаем в течение 5 минут в любое время суток, помогаем с размером, подлинностью и возвратом.' },
];

const REVIEW_TEXT = [
  ['Качество выше ожиданий', 'Пришло в фирменной коробке, с карточкой подлинности. Всё аккуратно, без запаха и заломов.'],
  ['Совпало с описанием', 'Сверила серийный номер с сертификатом в карточке, всё сходится. Доставили ровно в выбранный час.'],
  ['Удобная примерка', 'Курьер подождал, пока я примерю. Один размер не подошёл, вернула сразу, деньги пришли на следующий день.'],
  ['Хороший сервис', 'Задавала вопрос в поддержку ночью, ответили за пару минут и помогли с размером.'],
  ['Есть нюанс', 'Сам товар отличный, но коробка пришла с небольшой вмятиной. Поддержка предложила компенсацию баллами.'],
  ['Забрала в Select-пункте', 'Без очереди, в отдельной зоне, можно спокойно всё рассмотреть. Консультант подсказал по уходу.'],
];
const REVIEW_NAMES = ['Анастасия', 'Илья', 'Марина', 'Дмитрий', 'Ксения', 'Артём', 'Вера', 'Максим'];

const SELLER = {
  name: 'Maison Arlen',
  manager: { name: 'Екатерина Лебедева', role: 'Персональный менеджер Select', reply: 'отвечает в среднем за 12 минут' },
  checklist: [
    { id: 'legal', title: 'Юридические документы', hint: 'Договор с правообладателем или дистрибьютором', done: true },
    { id: 'certs', title: 'Сертификаты подлинности', hint: 'Декларации соответствия и документы происхождения на каждую партию', done: true },
    { id: 'content', title: 'Контент карточек', hint: 'Фото от 2000 px, видео или 360° для ключевых позиций', done: false },
    { id: 'rating', title: 'Рейтинг магазина 4,7+', hint: 'Сейчас 4,86', done: true },
    { id: 'sla', title: 'Сборка заказа за 24 часа', hint: 'Сейчас 91% заказов, нужно 95%', done: false },
    { id: 'pack', title: 'Фирменная упаковка Select', hint: 'Закажите коробки и пыльники в разделе «Расходники»', done: false },
  ],
  cards: [
    { pid: 1, status: 'ok' },
    { pid: 4, status: 'ok' },
    { pid: 2, status: 'review' },
    { pid: 7, status: 'rejected', reason: 'Фото 900 × 1200 px — ниже минимума 2000 px по длинной стороне.', fix: 'Загрузите фото в исходном качестве или закажите съёмку в студии Select.' },
    { pid: 3, status: 'rejected', reason: 'Не приложен документ, подтверждающий происхождение партии.', fix: 'Добавьте ГТД или договор поставки в раздел «Сертификаты».' },
  ],
  orders: [
    { id: 'S-48213', pid: 1, buyer: 'Москва', status: 'new', due: 'сегодня до 18:00', sum: 89900 },
    { id: 'S-48207', pid: 4, buyer: 'Санкт-Петербург', status: 'new', due: 'сегодня до 18:00', sum: 134000 },
    { id: 'S-48199', pid: 2, buyer: 'Москва', status: 'packing', due: 'сегодня до 14:00', sum: 24900, late: true },
    { id: 'S-48180', pid: 6, buyer: 'Казань', status: 'shipped', due: 'передан 21.10', sum: 46000 },
    { id: 'S-48152', pid: 5, buyer: 'Москва', status: 'delivered', due: 'вручён 20.10', sum: 38500 },
    { id: 'S-48141', pid: 1, buyer: 'Екатеринбург', status: 'return', due: 'возврат 19.10', sum: 89900 },
  ],
};
