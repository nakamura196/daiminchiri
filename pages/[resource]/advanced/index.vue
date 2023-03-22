<script setup lang="ts">
import { mdiMagnet, mdiMagnify } from '@mdi/js';

const slug = useRoute().params.slug;
const { locale } = useI18n();

const { t } = useI18n();

const item = {
  title: "advanced",
};

const localePath = useLocalePath();

const bh = [
  {
    title: t("top"),
    disabled: false,
    to: localePath({ name: "index" }),
  },
  {
    title: t(item.title),
    disabled: false,
  },
];

const query = useRoute().query;

const aggs: any = {
  ne_class: [
    {
      label: "地名古名及説明",
      value: 1147,
    },
    {
      label: "県",
      value: 837,
    },
    {
      label: "河川",
      value: 445,
    },
    {
      label: "山",
      value: 388,
    },
    {
      label: "州",
      value: 197,
    },
    {
      label: "府",
      value: 152,
    },
    {
      label: "附郭県",
      value: 111,
    },
    {
      label: "島・洲",
      value: 102,
    },
    {
      label: "湖澤",
      value: 82,
    },
    {
      label: "祠",
      value: 42,
    },
    {
      label: "衛",
      value: 41,
    },
    {
      label: "関",
      value: 32,
    },
    {
      label: "図符",
      value: 32,
    },
    {
      label: "域外地名",
      value: 29,
    },
    {
      label: "古国名",
      value: 27,
    },
    {
      label: "衛所",
      value: 23,
    },
    {
      label: "土司等",
      value: 18,
    },
    {
      label: "寺",
      value: 16,
    },
    {
      label: "城",
      value: 15,
    },
    {
      label: "道（中国）",
      value: 15,
    },
    {
      label: "泉池",
      value: 11,
    },
    {
      label: "楼閣等",
      value: 9,
    },
    {
      label: "布政司",
      value: 9,
    },
    {
      label: "道（朝鮮）",
      value: 8,
    },
    {
      label: "道（日本）",
      value: 8,
    },
    {
      label: "印",
      value: 8,
    },
    {
      label: "船",
      value: 5,
    },
    {
      label: "五山",
      value: 5,
    },
    {
      label: "五嶽",
      value: 5,
    },
    {
      label: "京府",
      value: 5,
    },
    {
      label: "五嶺",
      value: 5,
    },
    {
      label: "方位",
      value: 4,
    },
    {
      label: "橋",
      value: 4,
    },
    {
      label: "廟",
      value: 4,
    },
    {
      label: "都司",
      value: 3,
    },
    {
      label: "県（朝鮮）",
      value: 3,
    },
    {
      label: "題・序跋",
      value: 3,
    },
    {
      label: "浦",
      value: 2,
    },
    {
      label: "海口",
      value: 2,
    },
    {
      label: "京府（域外）",
      value: 2,
    },
    {
      label: "両京",
      value: 2,
    },
    {
      label: "洞",
      value: 2,
    },
    {
      label: "書院",
      value: 2,
    },
    {
      label: "津",
      value: 2,
    },
    {
      label: "陣",
      value: 2,
    },
    {
      label: "湖",
      value: 2,
    },
    {
      label: "州（朝鮮）",
      value: 1,
    },
    {
      label: "鎮",
      value: 1,
    },
    {
      label: "北京（順天府）",
      value: 1,
    },
    {
      label: "郷",
      value: 1,
    },
    {
      label: "堰",
      value: 1,
    },
    {
      label: "国",
      value: 1,
    },
    {
      label: "道路",
      value: 1,
    },
    {
      label: "墓",
      value: 1,
    },
    {
      label: "駅",
      value: 1,
    },
  ],
  区域1: [
    {
      label: "湖廣道",
      value: 401,
    },
    {
      label: "陝西道",
      value: 401,
    },
    {
      label: "南直隸",
      value: 392,
    },
    {
      label: "北直隸",
      value: 308,
    },
    {
      label: "山西道",
      value: 295,
    },
    {
      label: "河南道",
      value: 285,
    },
    {
      label: "山東道",
      value: 279,
    },
    {
      label: "浙江道",
      value: 251,
    },
    {
      label: "江西道",
      value: 233,
    },
    {
      label: "廣東道",
      value: 220,
    },
    {
      label: "四川道",
      value: 205,
    },
    {
      label: "福建道",
      value: 181,
    },
    {
      label: "雲南道",
      value: 83,
    },
    {
      label: "廣西道",
      value: 75,
    },
    {
      label: "凡例等",
      value: 51,
    },
    {
      label: "遼東",
      value: 43,
    },
    {
      label: "朝鮮國",
      value: 40,
    },
    {
      label: "貴州道",
      value: 37,
    },
    {
      label: "西域",
      value: 30,
    },
    {
      label: "女直",
      value: 21,
    },
    {
      label: "日本國",
      value: 17,
    },
    {
      label: "琉球國",
      value: 17,
    },
    {
      label: "韃靼",
      value: 14,
    },
    {
      label: "安南",
      value: 8,
    },
    {
      label: "沙漠",
      value: 5,
    },
    {
      label: "東寧",
      value: 4,
    },
    {
      label: "北海",
      value: 1,
    },
  ],
  区域色: [
    {
      label: "黄",
      value: 811,
    },
    {
      label: "濃橙",
      value: 617,
    },
    {
      label: "白",
      value: 609,
    },
    {
      label: "桃",
      value: 557,
    },
    {
      label: "青",
      value: 502,
    },
    {
      label: "緑",
      value: 488,
    },
    {
      label: "茶",
      value: 137,
    },
    {
      label: "黒",
      value: 78,
    },
    {
      label: "地色",
      value: 51,
    },
    {
      label: "薄橙",
      value: 42,
    },
    {
      label: "濃紺",
      value: 5,
    },
  ],
  図符等: [
    {
      label: "県城",
      value: 856,
    },
    {
      label: "府城",
      value: 203,
    },
    {
      label: "州城",
      value: 196,
    },
    {
      label: "祠",
      value: 46,
    },
    {
      label: "域外地名",
      value: 29,
    },
    {
      label: "関",
      value: 27,
    },
    {
      label: "古国名",
      value: 27,
    },
    {
      label: "衛/鎮/所",
      value: 23,
    },
    {
      label: "古跡等",
      value: 19,
    },
    {
      label: "城",
      value: 16,
    },
    {
      label: "道額",
      value: 16,
    },
    {
      label: "寺",
      value: 13,
    },
    {
      label: "河",
      value: 12,
    },
    {
      label: "布政司",
      value: 9,
    },
    {
      label: "京府",
      value: 7,
    },
    {
      label: "五山",
      value: 5,
    },
    {
      label: "五嶽",
      value: 5,
    },
    {
      label: "五嶺",
      value: 5,
    },
    {
      label: "湖",
      value: 4,
    },
    {
      label: "橋",
      value: 3,
    },
    {
      label: "門",
      value: 2,
    },
    {
      label: "両京",
      value: 2,
    },
    {
      label: "陣",
      value: 2,
    },
    {
      label: "方位",
      value: 1,
    },
    {
      label: "府城 ",
      value: 1,
    },
  ],
  区域2: [
    {
      label: "平陽府",
      value: 89,
    },
    {
      label: "西安府",
      value: 89,
    },
    {
      label: "兗州府",
      value: 83,
    },
    {
      label: "順天府",
      value: 78,
    },
    {
      label: "開封府",
      value: 72,
    },
    {
      label: "太原府",
      value: 66,
    },
    {
      label: "廣州府",
      value: 65,
    },
    {
      label: "北衛",
      value: 64,
    },
    {
      label: "河南府",
      value: 62,
    },
    {
      label: "保定府",
      value: 59,
    },
    {
      label: "鳳陽府",
      value: 58,
    },
    {
      label: "濟南府",
      value: 56,
    },
    {
      label: "真定府",
      value: 50,
    },
    {
      label: "大同府",
      value: 49,
    },
    {
      label: "荊州府",
      value: 46,
    },
    {
      label: "青州府",
      value: 44,
    },
    {
      label: "淮安府",
      value: 43,
    },
    {
      label: "汝寧府",
      value: 42,
    },
    {
      label: "鞏昌府",
      value: 42,
    },
    {
      label: "漢中府",
      value: 42,
    },
    {
      label: "洮州府",
      value: 42,
    },
    {
      label: "福州府",
      value: 36,
    },
    {
      label: "南陽府",
      value: 36,
    },
    {
      label: "長沙府",
      value: 36,
    },
    {
      label: "登州府",
      value: 34,
    },
    {
      label: "東昌府",
      value: 33,
    },
    {
      label: "大名府",
      value: 33,
    },
    {
      label: "應天府",
      value: 33,
    },
    {
      label: "建寧府",
      value: 33,
    },
    {
      label: "寧波府",
      value: 32,
    },
    {
      label: "黃州府",
      value: 32,
    },
    {
      label: "延安府",
      value: 32,
    },
    {
      label: "台州府",
      value: 31,
    },
    {
      label: "鳳翔府",
      value: 31,
    },
    {
      label: "襄陽府",
      value: 31,
    },
    {
      label: "嘉興府",
      value: 30,
    },
    {
      label: "廬州府",
      value: 30,
    },
    {
      label: "武昌府",
      value: 30,
    },
    {
      label: "萊州府",
      value: 29,
    },
    {
      label: "泉州府",
      value: 29,
    },
    {
      label: "岳州府",
      value: 29,
    },
    {
      label: "潮州府",
      value: 29,
    },
    {
      label: "蘇州府",
      value: 28,
    },
    {
      label: "歸德府",
      value: 28,
    },
    {
      label: "杭州府",
      value: 28,
    },
    {
      label: "建昌府",
      value: 28,
    },
    {
      label: "衡州府",
      value: 27,
    },
    {
      label: "九江府",
      value: 26,
    },
    {
      label: "漳州府",
      value: 26,
    },
    {
      label: "慶陽府",
      value: 26,
    },
    {
      label: "平涼府",
      value: 26,
    },
    {
      label: "紹興府",
      value: 25,
    },
    {
      label: "揚州府",
      value: 24,
    },
    {
      label: "河間府",
      value: 24,
    },
    {
      label: "湖州府",
      value: 24,
    },
    {
      label: "南康府",
      value: 24,
    },
    {
      label: "惠州府",
      value: 24,
    },
    {
      label: "永州府",
      value: 23,
    },
    {
      label: "廣平府",
      value: 22,
    },
    {
      label: "安慶府",
      value: 22,
    },
    {
      label: "贛州府",
      value: 22,
    },
    {
      label: "永平府",
      value: 21,
    },
    {
      label: "順德府",
      value: 21,
    },
    {
      label: "饒州府",
      value: 21,
    },
    {
      label: "南昌府",
      value: 21,
    },
    {
      label: "潞安府",
      value: 21,
    },
    {
      label: "吉安府",
      value: 21,
    },
    {
      label: "郴州府",
      value: 21,
    },
    {
      label: "鎮江府",
      value: 20,
    },
    {
      label: "廣信府",
      value: 20,
    },
    {
      label: "處州府",
      value: 20,
    },
    {
      label: "温州府",
      value: 20,
    },
    {
      label: "德安府",
      value: 20,
    },
    {
      label: "衛輝府",
      value: 19,
    },
    {
      label: "嚴州府",
      value: 19,
    },
    {
      label: "延平府",
      value: 19,
    },
    {
      label: "汀州府",
      value: 19,
    },
    {
      label: "辰州府",
      value: 19,
    },
    {
      label: "肇慶府",
      value: 19,
    },
    {
      label: "高州府",
      value: 19,
    },
    {
      label: "徽州府",
      value: 18,
    },
    {
      label: "懷慶府",
      value: 18,
    },
    {
      label: "韶州府",
      value: 18,
    },
    {
      label: "池州府",
      value: 17,
    },
    {
      label: "澤州",
      value: 17,
    },
    {
      label: "常德府",
      value: 17,
    },
    {
      label: "南安府",
      value: 17,
    },
    {
      label: "太平府",
      value: 16,
    },
    {
      label: "承天府",
      value: 16,
    },
    {
      label: "雷州府",
      value: 16,
    },
    {
      label: "徐州",
      value: 15,
    },
    {
      label: "寧國府",
      value: 15,
    },
    {
      label: "撫州府",
      value: 15,
    },
    {
      label: "彰德府",
      value: 14,
    },
    {
      label: "常州府",
      value: 14,
    },
    {
      label: "汾州",
      value: 14,
    },
    {
      label: "廉州府",
      value: 14,
    },
    {
      label: "松江府",
      value: 13,
    },
    {
      label: "鄖陽府",
      value: 13,
    },
    {
      label: "金華府",
      value: 12,
    },
    {
      label: "遼州",
      value: 12,
    },
    {
      label: "汝州",
      value: 12,
    },
    {
      label: "寶慶府",
      value: 12,
    },
    {
      label: "滁州",
      value: 11,
    },
    {
      label: "邵武府",
      value: 11,
    },
    {
      label: "漢陽府",
      value: 11,
    },
    {
      label: "衢州府",
      value: 10,
    },
    {
      label: "永順衛",
      value: 10,
    },
    {
      label: "忠清道",
      value: 9,
    },
    {
      label: "沁州",
      value: 9,
    },
    {
      label: "瑞州府",
      value: 9,
    },
    {
      label: "袁州府",
      value: 9,
    },
    {
      label: "南雄府",
      value: 9,
    },
    {
      label: "和州",
      value: 8,
    },
    {
      label: "興化府",
      value: 8,
    },
    {
      label: "靖州",
      value: 8,
    },
    {
      label: "慶尚道",
      value: 7,
    },
    {
      label: "廣德州",
      value: 7,
    },
    {
      label: "沙州",
      value: 7,
    },
    {
      label: "咸鏡道",
      value: 6,
    },
    {
      label: "西海道",
      value: 6,
    },
    {
      label: "平安道",
      value: 5,
    },
    {
      label: "江源道",
      value: 4,
    },
    {
      label: "京畿道",
      value: 4,
    },
    {
      label: "瓊州",
      value: 4,
    },
    {
      label: "全羅道",
      value: 3,
    },
    {
      label: "黃海道",
      value: 2,
    },
    {
      label: "東山道",
      value: 2,
    },
    {
      label: "東海道",
      value: 2,
    },
    {
      label: "畿内",
      value: 2,
    },
    {
      label: "北陸道",
      value: 1,
    },
    {
      label: "山陰道",
      value: 1,
    },
    {
      label: "山陽道",
      value: 1,
    },
    {
      label: "五嶌",
      value: 1,
    },
    {
      label: "南海道",
      value: 1,
    },
    {
      label: "萬州",
      value: 1,
    },
    {
      label: "儋州",
      value: 1,
    },
    {
      label: "崖州",
      value: 1,
    },
  ],
};

const etc = {
  区域2: {
    北直隸: [
      {
        label: "順天府",
        value: 78,
      },
      {
        label: "保定府",
        value: 59,
      },
      {
        label: "真定府",
        value: 50,
      },
      {
        label: "大名府",
        value: 33,
      },
      {
        label: "河間府",
        value: 24,
      },
      {
        label: "廣平府",
        value: 22,
      },
      {
        label: "永平府",
        value: 21,
      },
      {
        label: "順德府",
        value: 21,
      },
    ],
    朝鮮國: [
      {
        label: "忠清道",
        value: 9,
      },
      {
        label: "慶尚道",
        value: 7,
      },
      {
        label: "咸鏡道",
        value: 6,
      },
      {
        label: "平安道",
        value: 5,
      },
      {
        label: "江源道",
        value: 4,
      },
      {
        label: "京畿道",
        value: 4,
      },
      {
        label: "全羅道",
        value: 3,
      },
      {
        label: "黃海道",
        value: 2,
      },
    ],
    山東道: [
      {
        label: "兗州府",
        value: 83,
      },
      {
        label: "濟南府",
        value: 56,
      },
      {
        label: "青州府",
        value: 44,
      },
      {
        label: "登州府",
        value: 34,
      },
      {
        label: "東昌府",
        value: 33,
      },
      {
        label: "萊州府",
        value: 29,
      },
    ],
    南直隸: [
      {
        label: "鳳陽府",
        value: 58,
      },
      {
        label: "淮安府",
        value: 43,
      },
      {
        label: "應天府",
        value: 33,
      },
      {
        label: "廬州府",
        value: 30,
      },
      {
        label: "蘇州府",
        value: 28,
      },
      {
        label: "揚州府",
        value: 24,
      },
      {
        label: "安慶府",
        value: 22,
      },
      {
        label: "鎮江府",
        value: 20,
      },
      {
        label: "徽州府",
        value: 18,
      },
      {
        label: "池州府",
        value: 17,
      },
      {
        label: "太平府",
        value: 16,
      },
      {
        label: "徐州",
        value: 15,
      },
      {
        label: "寧國府",
        value: 15,
      },
      {
        label: "常州府",
        value: 14,
      },
      {
        label: "松江府",
        value: 13,
      },
      {
        label: "滁州",
        value: 11,
      },
      {
        label: "和州",
        value: 8,
      },
      {
        label: "廣德州",
        value: 7,
      },
    ],
    日本國: [
      {
        label: "西海道",
        value: 6,
      },
      {
        label: "東山道",
        value: 2,
      },
      {
        label: "東海道",
        value: 2,
      },
      {
        label: "畿内",
        value: 2,
      },
      {
        label: "北陸道",
        value: 1,
      },
      {
        label: "山陰道",
        value: 1,
      },
      {
        label: "山陽道",
        value: 1,
      },
      {
        label: "五嶌",
        value: 1,
      },
      {
        label: "南海道",
        value: 1,
      },
    ],
    浙江道: [
      {
        label: "寧波府",
        value: 32,
      },
      {
        label: "台州府",
        value: 31,
      },
      {
        label: "嘉興府",
        value: 30,
      },
      {
        label: "杭州府",
        value: 28,
      },
      {
        label: "紹興府",
        value: 25,
      },
      {
        label: "湖州府",
        value: 24,
      },
      {
        label: "處州府",
        value: 20,
      },
      {
        label: "温州府",
        value: 20,
      },
      {
        label: "嚴州府",
        value: 19,
      },
      {
        label: "金華府",
        value: 12,
      },
      {
        label: "衢州府",
        value: 10,
      },
    ],
    山西道: [
      {
        label: "平陽府",
        value: 89,
      },
      {
        label: "太原府",
        value: 66,
      },
      {
        label: "大同府",
        value: 49,
      },
      {
        label: "潞安府",
        value: 21,
      },
      {
        label: "懷慶府",
        value: 18,
      },
      {
        label: "澤州",
        value: 17,
      },
      {
        label: "汾州",
        value: 14,
      },
      {
        label: "遼州",
        value: 12,
      },
      {
        label: "沁州",
        value: 9,
      },
    ],
    河南道: [
      {
        label: "開封府",
        value: 72,
      },
      {
        label: "河南府",
        value: 62,
      },
      {
        label: "汝寧府",
        value: 42,
      },
      {
        label: "南陽府",
        value: 36,
      },
      {
        label: "歸德府",
        value: 28,
      },
      {
        label: "衛輝府",
        value: 19,
      },
      {
        label: "彰德府",
        value: 14,
      },
      {
        label: "汝州",
        value: 12,
      },
    ],
    湖廣道: [
      {
        label: "荊州府",
        value: 46,
      },
      {
        label: "長沙府",
        value: 36,
      },
      {
        label: "黃州府",
        value: 32,
      },
      {
        label: "襄陽府",
        value: 31,
      },
      {
        label: "武昌府",
        value: 30,
      },
      {
        label: "岳州府",
        value: 29,
      },
      {
        label: "衡州府",
        value: 27,
      },
      {
        label: "永州府",
        value: 23,
      },
      {
        label: "郴州府",
        value: 21,
      },
      {
        label: "德安府",
        value: 20,
      },
      {
        label: "辰州府",
        value: 19,
      },
      {
        label: "常德府",
        value: 17,
      },
      {
        label: "承天府",
        value: 16,
      },
      {
        label: "鄖陽府",
        value: 13,
      },
      {
        label: "寶慶府",
        value: 12,
      },
      {
        label: "漢陽府",
        value: 11,
      },
      {
        label: "永順衛",
        value: 10,
      },
      {
        label: "靖州",
        value: 8,
      },
    ],
    江西道: [
      {
        label: "建昌府",
        value: 28,
      },
      {
        label: "九江府",
        value: 26,
      },
      {
        label: "南康府",
        value: 24,
      },
      {
        label: "贛州府",
        value: 22,
      },
      {
        label: "饒州府",
        value: 21,
      },
      {
        label: "南昌府",
        value: 21,
      },
      {
        label: "吉安府",
        value: 21,
      },
      {
        label: "廣信府",
        value: 20,
      },
      {
        label: "南安府",
        value: 17,
      },
      {
        label: "撫州府",
        value: 15,
      },
      {
        label: "瑞州府",
        value: 9,
      },
      {
        label: "袁州府",
        value: 9,
      },
    ],
    福建道: [
      {
        label: "福州府",
        value: 36,
      },
      {
        label: "建寧府",
        value: 33,
      },
      {
        label: "泉州府",
        value: 29,
      },
      {
        label: "漳州府",
        value: 26,
      },
      {
        label: "延平府",
        value: 19,
      },
      {
        label: "汀州府",
        value: 19,
      },
      {
        label: "邵武府",
        value: 11,
      },
      {
        label: "興化府",
        value: 8,
      },
    ],
    陝西道: [
      {
        label: "西安府",
        value: 89,
      },
      {
        label: "北衛",
        value: 64,
      },
      {
        label: "鞏昌府",
        value: 42,
      },
      {
        label: "漢中府",
        value: 42,
      },
      {
        label: "洮州府",
        value: 42,
      },
      {
        label: "延安府",
        value: 32,
      },
      {
        label: "鳳翔府",
        value: 31,
      },
      {
        label: "慶陽府",
        value: 26,
      },
      {
        label: "平涼府",
        value: 26,
      },
      {
        label: "沙州",
        value: 7,
      },
    ],
    廣東道: [
      {
        label: "廣州府",
        value: 65,
      },
      {
        label: "潮州府",
        value: 29,
      },
      {
        label: "惠州府",
        value: 24,
      },
      {
        label: "肇慶府",
        value: 19,
      },
      {
        label: "高州府",
        value: 19,
      },
      {
        label: "韶州府",
        value: 18,
      },
      {
        label: "雷州府",
        value: 16,
      },
      {
        label: "廉州府",
        value: 14,
      },
      {
        label: "南雄府",
        value: 9,
      },
      {
        label: "瓊州",
        value: 4,
      },
      {
        label: "萬州",
        value: 1,
      },
      {
        label: "儋州",
        value: 1,
      },
      {
        label: "崖州",
        value: 1,
      },
    ],
  },
};

const items2 = computed(() => {
  //const items = options.value.find((o) => o.key === "区域1")?.items;
  // return items ? items : [];
  // const values1 = options.value.find((o) => o.key === "区域1")?.value;
  let target1: any = null;
  for (const o of options.value) {
    if (o.key === "区域1") {
      target1 = o;
      break;
    }
  }
  const values1 = target1.value || [];

  if (values1.length === 0) {
    return aggs["区域2"].map((item: any) => {
      return item.label;
    });
  }

  const children: any = etc["区域2"];

  const freqs: any = {};
  for (const value1 of values1) {
    const values2 = children[value1];
    for (const value2 of values2) {
      freqs[value2.label] = value2.value;
    }
  }

  var pairs: any = Object.entries(freqs);
  pairs.sort(function (p1: any, p2: any) {
    var p1Val = p1[1],
      p2Val = p2[1];
    return (p1Val - p2Val) * -1;
  });
  const fruits = Object.fromEntries(pairs);

  return Object.keys(fruits);
});

const aggs2: any = {};

for (const key in aggs) {
  aggs2[key] = aggs[key].map((item: any) => {
    return item.label;
  });
}

const toList = (value: any) => {
  if (Array.isArray(value)) {
    return value;
  } else {
    return value ? [value] : [];
  }
};

const options = ref([
  {
    label: "地名・説明",
    key: "label",
    type: "text",
    value: query["q-label"],
  },
  {
    label: "地名種別",
    key: "ne_class",
    type: "select",
    items: aggs2["ne_class"],
    value: toList(query["f-ne_class"]),
  },
  {
    label: "区域1",
    key: "区域1",
    type: "select",
    items: aggs2["区域1"],
    value: toList(query["f-区域1"]),
  },
  {
    label: "区域2",
    key: "区域2",
    type: "select",
    // items: items2,
    items: items2, // aggs2["区域2"] ,
    value: toList(query["f-区域2"]),
  },
  {
    label: "区域色",
    key: "区域色",
    type: "select",
    items: aggs2["区域色"],
    value: toList(query["f-区域色"]),
  },
  {
    label: "図符等",
    key: "図符等",
    type: "select",
    items: aggs2["図符等"],
    value: toList(query["f-図符等"]),
  },
]);

const trigger = (event: any) => {
  // 日本語入力中のEnterキー操作は無効にする
  if (event.keyCode !== 13) return;
  search();
};

const search = () => {
  const options_ = options.value;

  const query = JSON.parse(JSON.stringify(useRoute().query));

  for (const option of options_) {
    const value = option.value;
    if (value) {
      const prefix = option.type === "text" ? "q-" : "f-";
      query[prefix + option.key] = value;
    }
  }

  const path: any = {
    name: "resource",
    params: useRoute().params,
    query,
  };

  useRouter().push(localePath(path));
};
</script>
<template>
  <LayoutsCommon :title="item.title" :items="bh">
    <h1>{{ $t(item.title) }}</h1>

    <div class="mt-5 text-center">
      <v-btn color="primary" flat @click="search()"><v-icon>{{ mdiMagnify }}</v-icon> {{ $t("search") }}</v-btn>
    </div>

    <ClientOnly>
      <v-row v-for="option in options" class="my-5" dense>
        <v-col cols="12" sm="3">
          {{ option.label }}
        </v-col>
        <v-col cols="12" sm="9">
          <template v-if="option.type === 'text'">
            <v-text-field
              v-model="option.value"
              hide-details
              single-line
              variant="outlined"
              density="compact"
              @keydown.enter="trigger"
              clearable
            ></v-text-field>
          </template>
          <template v-else-if="option.type === 'select'">
            <!--
            <v-combobox
              v-model="option.value"
              :items="option.items"
              label="Select a favorite activity or create a new one"
              multiple
            ></v-combobox>
            -->
            <v-select
              multiple
              v-model="option.value"
              :items="option.items"
              hide-details
              single-line
              variant="outlined"
              density="compact"
              @keydown.enter="trigger"
              clearable
            ></v-select>
          </template>
        </v-col>
      </v-row>
    </ClientOnly>

    <div class="mt-5 text-center">
      <v-btn color="primary" flat @click="search()">
        <v-icon>{{ mdiMagnify }}</v-icon> {{ $t("search") }}</v-btn>
    </div>
  </LayoutsCommon>
</template>
