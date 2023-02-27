const productsData = [
    {
        id: 1,
        name: "ASUS X515",
        price: 150,
        category: "asus",
        specs: ["Procesador: Ryzer 5", "Ram: 8Gb", "S.O.: Windows 11"],
        img: "./assets/img/products/asus-x515.png",
    },
    {
        id: 2,
        name: "MACBOOK AIR M2",
        price: 280,
        category: "mac",
        specs: ["Procesador: M2", "Ram: 16Gb", "S.O.: MAC OS"],
        img: "./assets/img/products/mac2.png",
    },
    {
        id: 3,
        name: "ACER ASPIRE 3",
        price: 150,
        category: "otras",
        specs: ["Procesador: I5", "Ram: 8Gb", "S.O.: Windows 11"],
        img: "./assets/img/products/Acer-Aspire-3.png",

    },
    {
        id: 4,
        name: "LENOVO IDEAPAD 3",
        price: 140,
        category: "lenovo",
        specs: ["Procesador: I3", "Ram: 4Gb", "S.O.: Windows 11"],
        img: "./assets/img/products/lenovo-ideapad.png",
    },
    {
        id: 5,
        name: "HP 245",
        price: 130,
        category: "hp",
        specs: ["Procesador: I3", "Ram: 8Gb", "S.O.: Windows 11"],
        img: "./assets/img/products/hp245.png",
    },
    {
        id: 6,
        name: "HP 240",
        price: 125,
        category: "hp",
        specs: ["Procesador: I3", "Ram: 8Gb", "S.O.: Windows 11"],
        img: "./assets/img/products/hp240.png",
    },
    {
        id: 7,
        name: "DELL INSPIRION 3511",
        price: 160,
        category: "otras",
        specs: ["Procesador: Ryzer 5", "Ram: 8Gb", "S.O.: Linux"],
        img: "./assets/img/products/dell_inspirion3511.png",
    },
    {
        id: 8,
        name: "ASUS TUF DASH",
        price: 180,
        category: "asus",
        specs: ["Procesador: I5", "Ram: 16Gb", "S.O.: Windows 11"],
        img: "./assets/img/products/Asus-Gamer-Tuf.png",
    },
    {
        id: 9,
        name: "LENOVO V15 IGL",
        price: 120,
        category: "lenovo",
        specs: ["Procesador: I3", "Ram: 8Gb", "S.O.: Windows 11"],
        img: "./assets/img/products/lenovo-v15.png",
    },
    {
        id: 10,
        name: "HP GAMER OMEN",
        price: 140,
        category: "hp",
        specs: ["Procesador: I5", "Ram: 4Gb", "S.O.: Windows 11"],
        img: "./assets/img/products/hp-gamer-omen.png",
    },
    {
        id: 11,
        name: "ASUS VIVIBOOK 15'",
        price: 160,
        category: "asus",
        specs: ["Procesador: I5", "Ram: 8Gb", "S.O.: Windows 11"],
        img: "./assets/img/products/asus-vivobook15.png",

    },
    {
        id: 12,
        name: "MACBOOK M1 PRO",
        price: 300,
        category: "mac",
        specs: ["Procesador: M1", "Ram: 24Gb", "S.O.: MAC OS"],
        img: "./assets/img/products/macProM1.png",
    },
    {
        id: 13,
        name: "MSI MODERN 14",
        price: 150,
        category: "otras",
        specs: ["Procesador: Ryzer 3", "Ram: 16Gb", "S.O.: Windows 11"],
        img: "./assets/img/products/Msi-Modern14.png",
    },
    {
        id: 14,
        name: "ASUS ZENBOOK 14'",
        price: 200,
        category: "asus",
        specs: ["Procesador: I7", "Ram: 16Gb", "S.O.: Windows 11"],
        img: "./assets/img/products/asus-zenbook14.png",
    },
    {
        id: 15,
        name: "MACBOOK AIR M1",
        price: 250,
        category: "mac",
        specs: ["Procesador: M1", "Ram: 8Gb", "S.O.: MAC OS"],
        img: "./assets/img/products/mac_air_m1.png",
    },
    {
        id: 16,
        name: "LENOVO YOGA SLIM 7",
        price: 130,
        category: "lenovo",
        specs: ["Procesador: Ryzer 3", "Ram: 4Gb", "S.O.: Windows 11"],
        img: "./assets/img/products/Lenovo-Yoga-Slim.png",
    },
    {
        id: 17,
        name: "HP PAVILION 13",
        price: 130,
        category: "hp",
        specs: ["Procesador: I5", "Ram: 8Gb", "S.O.: Windows 11"],
        img: "./assets/img/products/hp-pavilion.png",
    },
    {
        id: 18,
        name: "EXO SMART QX3K",
        price: 120,
        category: "otras",
        specs: ["Procesador: I3", "Ram: 4Gb", "S.O.: Windows 11"],
        img: "./assets/img/products/exo-smart.png",
    },
    {
        id: 19,
        name: "LENOVO THRINKBOOK 15",
        price: 180,
        category: "lenovo",
        specs: ["Procesador: I7", "Ram: 16Gb", "S.O.: Windows 11"],
        img: "./assets/img/products/lenovo-thinkbook15.png",
    },
    {
        id: 20,
        name: "ASUS ROG ZEPHYRUS",
        price: 200,
        category: "asus",
        specs: ["Procesador: I7", "Ram: 16Gb", "S.O.: Windows 11"],
        img: "./assets/img/products/asus-Rog-Zephyrus.png",
    },
];


const splitProducts = (size) => {
    let dividedProducts = [];
    for (let i = 0; i < productsData.length; i += size) {
        dividedProducts.push(productsData.slice(i, i + size));
    }
    return dividedProducts;
};

const productsController = {
    dividedProducts: splitProducts(6),
    nextProductsIndex: 1,
    productsLimit: splitProducts(6).length,
};