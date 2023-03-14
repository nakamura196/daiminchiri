export default({
    "search": {
        "index_compressed": false,
        "fuse": {
            "search_all" : true
        },
        "no_image": "https://raw.githubusercontent.com/hi-ut/static_images/main/no_image.svg"
    },
    "t": {
        "all" : false
    },
  "env": {
    "dev": {
      "hostname": "",
      "baseUrl": ""
    },
    "stg": {
      "hostname": "https://map-app-daimin.vercel.app",
      "baseUrl": ""
    },
    "prod": {
      "hostname": "https://www.hi.u-tokyo.ac.jp",
      "baseUrl": "/collection/digitalgallery/glossary"
    }
  },
  "inherit_facet" : false,
  "title": "東洋文庫「大明地理之図」データベース",
  "description": "日本史用語翻訳グロッサリー・データベースです。",
  keywords: "本,書籍,作品,人物,検索,連想,書棚,知の世界",
  "image": "/home.jpg",
  "top_image_url": "/home.jpg",
  "show_top_div": true,
  "footer": {
    "ja": `東洋文庫`,
    "en": `Toyo Bunko`
  },
  "colSearch": 4,
  custom_search_label: "検索キーワードを入力",
  menu_mode: false,
  "menus": [
    {
      "title": "top",
      "to": { "name": "index" },
      "header": true
    },
    {
        "title": "search",
        "to": { "name": "resource", params: {resource : 'item'} },
      },
    {
      "title": "about",
      "to": {
        "name": "page-slug",
        "params": {
          "slug": "about"
        }
      },
      "top": true,
      "type": "about_this_site",
      "weight": 0
    },
    {
      "title": "利用条件",
      "to": {
        "name": "page-slug",
        "params": {
          "slug": "use"
        }
      }
    },  
    {
      "title": "東洋文庫",
      "href": "http://www.toyo-bunko.or.jp/",
      "target": "_blank"
    }
  ],
  "default": {
    "keys": [
      {
        title: "絵図",
        value: "description",
      },
      {
        title: "分類",
        value: "ne_class",
      },
    ],
    "advanced": [
      {
        "label": "見出し",
        "type": "text",
        "key": "label",
        "value": ""
      },
      {
        "label": "見出し読み",
        "type": "text",
        "key": "見出し読み",
        "value": ""
      },
      {
        "label": "ローマ字",
        "type": "text",
        "key": "ローマ字2",
        "value": ""
      },
      {
        "label": "対訳語",
        "type": "text",
        "key": "対訳語",
        "value": ""
      },
      {
        "label": "説明文",
        "type": "text",
        "key": "説明文",
        "value": ""
      }
    ],
    "perPageItems": [
      20,
      100,
      500
    ],
    "defaultPerPage": 100,
    "defaultSort": "_score:desc",
    "sorts": [
      {
        "label": "score",
        "key": "_score"
      },
      {
        "label": "見出し読み（50音順）",
        "key": "見出し読み"
      },
      {
        "label": "ローマ字",
        "key": "ローマ字1"
      }
    ],

    "defaultLayout": "list",
    "layouts": [
        {
          "title": "list",
          "value": "list"
        },
        {
          "title": "grid",
          "value": "grid"
        }
      ],

    "searchKeys": [
      "_id",
      {
        "name": "label",
        "weight": 10
      },
      "ne_class",
      "区域1",
      "区域2",
      "区域色",
      "区域番号",
      "図符等",
      "地名補足"
    ],
    "aggregations": [
      {
        "label": "地名・説明",
        "key": "label"
      },
      {
        "label": "地名種別",
        "key": "ne_class"
      },
      {
        "label": "区域1",
        "key": "区域1"
      },
      {
        "label": "区域2",
        "key": "区域2"
      },
      {
        "label": "区域色",
        "key": "区域色"
      },
      {
        "label": "区域番号",
        "key": "区域番号"
      }
      ,{
        "label": "図符等",
        "key": "図符等"
      }
    ]
  }
})