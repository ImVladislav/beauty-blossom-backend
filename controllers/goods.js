// const wood = require("../WoodStorage/wood")

const { Goods } = require("../models/goods");
const { Parser } = require("json2csv"); // Пакет для перетворення JSON в CSV
const { HttpError, ctrlWrapper } = require("../helpers");
const xml2js = require("xml2js");
const {transliterate} = require("../utils/transliterate");


// const getAll = async (req, res) => {

  // const {_id: owner} = req.user;
  // const {page = 1, limit = 10} = req.query;
  // req.query обєкт параметрів пошуку
  // const skip = (page - 1) * limit;


  // const result = await Goods.find();

  const getAll = async (req, res) => {
    const { brand, category, sort = "default", page = 1, limit = 3000 } = req.query;
  
    const query = {};
    const normalize = (val) => val?.trim();
  
   
    if (brand) {
      const decodedBrand = decodeURIComponent(brand);
      query.brand = {
        $regex: new RegExp(`^${decodedBrand.trim()}$`, "i") // ← чутливість до регістру прибрана
      };
    }
  
    if (category) {
      const decoded = decodeURIComponent(category);
      const normalizedCategory = decoded.startsWith("/") ? decoded : `/${decoded}`;

    // 🪄 Розбиваємо шлях по слешах і прибираємо пусті
    let parts = normalizedCategory
      .split("/")
      .filter(Boolean) // прибирає порожні сегменти
      .map((str) => transliterate(str.trim(), true));
console.log(parts);

      // 🧠 Видаляємо "katehoriji", якщо вона є першою
      if (parts[0]) {
        parts = parts.slice(1);
      }
    
      if (parts[0]) {
        query.category = {
          $regex: new RegExp(`^${normalize(parts[0])}$`, "i"),
        };
      }
      if (parts[1]) {
        query.subCategory = {
          $regex: new RegExp(`^${normalize(parts[1])}$`, "i"),
        };
      }
      if (parts[2]) {
        query.subSubCategory = {
          $regex: new RegExp(`^${normalize(parts[2])}$`, "i"),
        };
      }
    }
    

    // ==== PAGINATION ====
    const skip = (parseInt(page) - 1) * parseInt(limit);
  
    // ==== SORTING ====
    let sortOptions = {};
    switch (sort) {
      case "nameABC":
        sortOptions = { name: 1 };
        break;
      case "nameCBA":
        sortOptions = { name: -1 };
        break;
      case "priceMin":
        sortOptions = { price: 1 };
        break;
      case "priceMax":
        sortOptions = { price: -1 };
        break;
      case "inStock":
        query.amount = { $gte: 1 };
        break;
      default:
        sortOptions = {}; // no sorting
    }
  
    const result = await Goods.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(parseInt(limit));
  
    const totalCount = await Goods.countDocuments(query);
  
    if (!result.length) {
      throw HttpError(404, "No goods found");
    }
  
    res.json({
      page: parseInt(page),
      limit: parseInt(limit),
      total: totalCount,
      totalPages: Math.ceil(totalCount / limit),
      goods: result,
    });
  };

  const getNews = async (req, res) => {
    const { page = 1, limit = 32 } = req.query;
    const skip = (+page - 1) * +limit;
  
    // 1. Загальна кількість товарів
    const totalItems = await Goods.countDocuments({ new: true });
  
    // 2. Список товарів з пагінацією
    const products = await Goods.find({ new: true }, "-createdAt -updatedAt", {
      skip,
      limit: +limit,
    });
  
    res.json({
      totalItems,
      totalPages: Math.ceil(products.length / +limit),
      currentPage: +page,
      items: products,
    });
  };


  // const result = await Wood.find({owner}, "-createdAt -updatedAt", {skip, limit}).populate("owner", "name email");

  // -createdAt -updatedAt поля які не треба брати з бази
  // populate бере айді знаходить овенра і вставляє обєкт з його данними
  // 2 арг список полів які треба повернути
  // skip скілеи пропустити обєктів в базі, limit скільки повернути

const getById = async (req, res) => {
  const { id } = req.params;
  // const result = await Book.findOne({_id: id})
  const result = await Goods.findById(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const add = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Goods.create({ ...req.body, owner });
  //  const result = await Wood.create({...req.body});
  res.status(201).json(result);
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const result = await Goods.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const updateCheked = async (req, res) => {
  const { id } = req.params;
  const result = await Goods.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const result = await Goods.findByIdAndRemove(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({
    message: "Delete success",
  });
};
const getCSV = async (req, res) => {
  try {
    const goods = await Goods.find(); // Отримати всі товари
    if (!goods.length) {
      return res.status(404).send("No goods found");
    }

    // Додаємо властивість 'link', 'availability' та 'condition' до кожного товару
    const updatedGoods = goods.map((item) => ({
      ...item.toObject(), // Перетворюємо товар на звичайний об'єкт
      link: `https://beautyblossom.com.ua/product/${item.id}`, // Використовуємо 'id'
      id: item._id,
      title: item.name,
      availability: item.amount > 0 ? "in stock" : "out of stock",
      condition: "new",
      image_link: item.images,
    }));

    // Визначаємо поля, які мають бути у CSV-файлі
    const fields = [
      "title",
      "condition",
      "id",
      "name",
      "article",
      "code",
      "amount",
      "description",
      "priceOPT",
      "price",
      "link",
      "brand",
      "image_link",
      "country",
      "new",
      "sale",
      "category",
      "subCategory",
      "subSubCategory",
      "availability",
    ];
    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(updatedGoods); // Перетворюємо дані у CSV

    res.header("Content-Type", "text/csv");
    res.attachment("products.csv");
    res.status(200).send(csv); // Відправляємо CSV-файл
  } catch (error) {
    console.error(error); // Логування помилок
    return res.status(500).send("Error generating CSV");
  }
};

// Функція генерації XML

const getXML = async (req, res) => {
  try {
    const goods = await Goods.find();
    if (!goods.length) {
      return res.status(404).send("No goods found");
    }

    const updatedGoods = goods.map((item) => ({
      "g:id": item._id ? String(item._id) : "N/A",
      "g:title": item.name || "No title",
      "g:description": item.description || "No description available",
      "g:link": `https://beautyblossom.com.ua/product/${item._id}`,
      "g:image_link": item.images || "",
      "g:condition": "new",
      "g:availability": item.amount > 0 ? "in stock" : "out of stock",
      "g:price": `${item.price} UAH`,
      "g:shipping": {
        "g:country": "UA",
        "g:service": "Standard",
        "g:price": "0.00 UAH",
      },
  
      "g:brand": item.brand || "Unknown",
      "g:mpn": item.article || "",
    }));
    

    const feed = {
      rss: {
        $: { "xmlns:g": "http://base.google.com/ns/1.0", version: "2.0" },
        channel: {
          title: "Beauty Blossom - Online Store",
          link: "https://beautyblossom.com.ua",
          description: "Google Shopping XML Feed",
          item: updatedGoods,
        },
      },
    };

    const builder = new xml2js.Builder({ headless: true, xmldec: { version: "1.0", encoding: "UTF-8" } });
    const xml = builder.buildObject(feed);

    // ✅ Оновлені заголовки для відкриття XML у новій вкладці
    res.setHeader("Content-Type", "application/xml");
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");

    res.status(200).send(xml);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error generating XML");
  }
};


module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  updateCheked: ctrlWrapper(updateCheked),
  deleteById: ctrlWrapper(deleteById),
  getCSV: ctrlWrapper(getCSV),
  getXML: ctrlWrapper(getXML), // Додаємо новий маршрут
  getNews: ctrlWrapper(getNews),
};
