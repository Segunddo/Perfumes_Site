
import { Product, Category } from './types';

export const PRODUCTS: Product[] = [
  { 
    id: 1, 
    name: "Acoustic Pro Max", 
    price: "$299.00", 
    category: "Audio Electronics", 
    rating: 4.5, 
    reviews: 128,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCNwH07NL66abeGEOptCCYkCsqjxacnaB2XepBRgsqZc9UpLi9Xw-Bmy8i8SCnQRJx61FVKSl-QPy30X5m42OBSDdDzWAdw2AYGWcZ6ZuAFqGwns455nEWKVuHdjjgj9V_f5SaoWw45MW4pT-xdVwC2hScCe4btBHfZmfuPr3Lkj_pIJtFuuz5p_0lI85DxDV7IYWgNLbVnzoCwfguxBRXiaByNyiBsNgo6Q89nNvPCRbXeA-aaRx3tXDF7xolmz1oJkFdpfHVA9Xtv",
    description: "Experience high-fidelity audio with active noise cancellation and ergonomic comfort for all-day listening sessions."
  },
  { 
    id: 2, 
    name: "SleekTime V2", 
    price: "$149.00", 
    category: "Wearables", 
    rating: 5, 
    tag: "NEW", 
    reviews: 84,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCGfHsjNvf5wu5RntGHl503rOIv5cYsV6DjOeXHJtKcFRh5r9iBbBDEvN18btm6LiWBgFUe8Cg0J_WEaParwAxFStiXZojoSyBSTV3dJ7yziqqk4wgaK4muxHB_Aa16rPkoupzegLS9UNGB00puVwnVB3Lr0S2AW4pxRHjWfnzPmJYjzLufYUD_5GdtiLYil7iosggn_58RmpMoKJpgRqSz9O-NMKGfbrgcg4676CpQz-43DNp_nqwLKm5W6rzLQdjCZsTgVeVKQdto",
    description: "A smartwatch that blends elegance with performance. Track your health, notifications, and goals with a stunning AMOLED display."
  },
  { 
    id: 3, 
    name: "Nitro Run Red", 
    price: "$89.00", 
    oldPrice: "$110.00", 
    category: "Fashion Footwear", 
    rating: 5, 
    tag: "20% OFF", 
    reviews: 210,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBmuFiA__nNmNKcmw4Zea1olTJOPS4hpP5wRiYzJ4wf8OThWIOaB4CoEcja6grL3myesnxNdWa_JBGI9yIwaQghHCBgQcuLXUhl3NTb-ubTisLlyIJY5ZYs9p5Zmx5ciflBTKd-WiqbJ5gozKC5dRJNz1JbSR2Rzzx6SExfYhYTL2k8k4maYjkdeLSDvHnJZhnvPB8Oeiz-xXybNO3FxvzXTnNhRwCluOz-Y4EQ8aTz0jspcnENNdemrjD7aawVzXkrVZ9a8T0orFXU",
    description: "Lightweight performance running shoes designed for maximum energy return and breathability."
  },
  { 
    id: 4, 
    name: "Urban Nomad Bag", 
    price: "$75.00", 
    category: "Accessories", 
    rating: 4, 
    reviews: 45,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAQxi2KsB5akxo0x-vYfwXyCYeVsSp3kuoVrHm-CZwWvJitECFAvkK9xjHeWXWysNdU-wfGbqST3E2mxey25wxXF8NqCGP-J3TEJCELqrdKHV5ehRetdriSmi7VPOBahM2AGvrPvlZPnA_dh8Dk81iimzcis8At4zhfJgFn8NN8a8OEzEng9-5ZXRr-T3YCSTqsc1K4ysG_FwhixjzMuZMXO_9ITXueAB6P6GLErKfdCDOBesZul98pxm3J9_4yq0PoWJKbCQU5DXZ6",
    description: "Versatile, waterproof, and stylish. The perfect companion for your daily city commute or weekend adventures."
  },
  {
    id: 5,
    name: "IZ Laptop Pro",
    price: "$2,499.00",
    category: "Electronics",
    rating: 5,
    reviews: 320,
    tag: "PRO",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAwf0vLtP9hdx8wU6pdm9r7K_2a2D4r6vpgXGdSyiTdIwL_IhVVikamrPQpOc74CUk1Q4EicPLBq4by0w1NR57b7EbY_PdS8MXYNmDPWvd9gkgEtGOGnTjPvN_6iPSf6uPT5nttJpoiyaS_7FayhL43Pfo52VBlQcNulNV4s9GpXIaqm9AlL0Ea2Id0UpqhvhJg6kVEDkuvGTI4FRY7GXtBN-k6vz34rYL5zEaF_GP6oXIA17iJqwcZa43Lpq4vVBUwwfi6atZobCzl",
    description: "The ultimate power tool for creatives. 32GB RAM, 1TB SSD, and a stunning 16-inch liquid retina display."
  }
];

export const CATEGORIES: Category[] = [
  { title: 'Smartphones', count: '320', icon: 'devices', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD0KYutjwJyAFO7HpSRTNahVBUlp9rXIw1k9DOGWL9-HcgLXVDH2zakdlfM6nQP14UWfjtXn4B8JWSjLprkgA66lcZejv9ThuIxYb7EMTgZwb0kmelNdUfJAXVTVsVnKN2EIrPkGKNx_meu4OfJMP4VZvt9Ux4_6hqAXi2HvGaK_MMFAtr-MvrbykpaHkdwCZUUtsgmJX1oJujwE8joZtMXRPRPtwa6xX6dxX6VJiEodoTN-KV6pPX5jPEWGc5ZHzXU8FoCruV5GiXY' },
  { title: 'Laptops & PC', count: '145', icon: 'laptop_mac', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCXfNc2qrQ0ulFfW8agp167B5QmGPAN1LJmbnSONS6r2eU1H3_oFQtD1Xjbq2PixcZzPnS_9Y6wWyHA4gLWbC2zpxFO8qKoK0YnX5OxXY7N3tMeCiqtBvRtw7b4BQhilIk7BnvzFzMi8W9JIBYnjrDkR2XokMZskWZ3nDQMHVx3geA7-anAIcKHmOri7YRdUBkJncJv7Mx9DLPCSO-oTuTTkVgi6g4zVwI9lvwQjTcr246-j2mmX2t6y3qiZD7c6jn5nXoCSR8llGns' },
  { title: 'Wearables', count: '88', icon: 'watch', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCsj0XOi7hOXtzkUo5E_S_Enh_VQlBsbEQRbn27W-t5_oTPmO-1gZWhvVDzh4SRpych5IpSDCXDA9yrx_6qCuywEBVuaEss8HehthU-r3P-uT3jwihZwCn8hr2rOwFJCfwrSyX-3gGQPAVssxDrgBvnsLKmkFSDxn45S5_R7S_rXVSwoO3RgXbWV9N3HXcv2BluzMa3OBfbY9El3S5q-RvlOjPCBzLz2x-bfdLqwldIDBG5__SS2mNsTuAYXtJ1v0l6vPpZ-n2yNGZ8' }
];
