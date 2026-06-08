const INDIA_STATES_DATA = [
  {
    state: "Andhra Pradesh",
    type: "State",
    lat: 15.9129,
    lon: 79.7400,
    capital: "Amaravati",
    cities: [
      { name: "Amaravati", lat: 16.5131, lon: 80.5168 },
      { name: "Visakhapatnam", lat: 17.6868, lon: 83.2185 },
      { name: "Vijayawada", lat: 16.5062, lon: 80.6480 },
      { name: "Guntur", lat: 16.3067, lon: 80.4365 },
      { name: "Nellore", lat: 14.4426, lon: 79.9865 },
      { name: "Tirupati", lat: 13.6288, lon: 79.4192 },
      { name: "Kurnool", lat: 15.8281, lon: 78.0373 }
    ]
  },
  {
    state: "Arunachal Pradesh",
    type: "State",
    lat: 28.2180,
    lon: 94.7278,
    capital: "Itanagar",
    cities: [
      { name: "Itanagar", lat: 27.0844, lon: 93.6053 },
      { name: "Tawang", lat: 27.5852, lon: 91.8595 },
      { name: "Ziro", lat: 27.5910, lon: 93.8378 },
      { name: "Pasighat", lat: 28.0620, lon: 95.3262 },
      { name: "Roing", lat: 28.1408, lon: 95.8421 }
    ]
  },
  {
    state: "Assam",
    type: "State",
    lat: 26.2006,
    lon: 92.9376,
    capital: "Dispur",
    cities: [
      { name: "Dispur", lat: 26.1433, lon: 91.7898 },
      { name: "Guwahati", lat: 26.1158, lon: 91.7086 },
      { name: "Dibrugarh", lat: 27.4728, lon: 94.9120 },
      { name: "Silchar", lat: 24.8333, lon: 92.7789 },
      { name: "Jorhat", lat: 26.7509, lon: 94.2037 },
      { name: "Tezpur", lat: 26.6338, lon: 92.7926 }
    ]
  },
  {
    state: "Bihar",
    type: "State",
    lat: 25.0961,
    lon: 85.3131,
    capital: "Patna",
    cities: [
      { name: "Patna", lat: 25.5941, lon: 85.1376 },
      { name: "Gaya", lat: 24.7955, lon: 84.9994 },
      { name: "Bhagalpur", lat: 25.2425, lon: 87.0145 },
      { name: "Muzaffarpur", lat: 26.1209, lon: 85.3647 },
      { name: "Darbhanga", lat: 26.1542, lon: 85.8918 },
      { name: "Bihar Sharif", lat: 25.1982, lon: 85.5149 }
    ]
  },
  {
    state: "Chhattisgarh",
    type: "State",
    lat: 21.2787,
    lon: 81.8661,
    capital: "Raipur",
    cities: [
      { name: "Raipur", lat: 21.2514, lon: 81.6296 },
      { name: "Bilaspur", lat: 22.0790, lon: 82.1391 },
      { name: "Bhilai", lat: 21.1938, lon: 81.3509 },
      { name: "Korba", lat: 22.3595, lon: 82.7501 },
      { name: "Jagdalpur", lat: 19.0740, lon: 82.0125 }
    ]
  },
  {
    state: "Goa",
    type: "State",
    lat: 15.2993,
    lon: 74.1240,
    capital: "Panaji",
    cities: [
      { name: "Panaji", lat: 15.4909, lon: 73.8278 },
      { name: "Margao", lat: 15.2736, lon: 73.9580 },
      { name: "Vasco da Gama", lat: 15.3959, lon: 73.8143 },
      { name: "Mapusa", lat: 15.5937, lon: 73.8142 },
      { name: "Ponda", lat: 15.3997, lon: 74.0124 }
    ]
  },
  {
    state: "Gujarat",
    type: "State",
    lat: 22.2587,
    lon: 71.1924,
    capital: "Gandhinagar",
    cities: [
      { name: "Gandhinagar", lat: 23.2156, lon: 72.6369 },
      { name: "Ahmedabad", lat: 23.0225, lon: 72.5714 },
      { name: "Surat", lat: 21.1702, lon: 72.8311 },
      { name: "Vadodara", lat: 22.3072, lon: 73.1812 },
      { name: "Rajkot", lat: 22.3039, lon: 70.8022 },
      { name: "Bhavnagar", lat: 21.7645, lon: 72.1519 },
      { name: "Jamnagar", lat: 22.4707, lon: 70.0577 }
    ]
  },
  {
    state: "Haryana",
    type: "State",
    lat: 29.0588,
    lon: 76.0856,
    capital: "Chandigarh",
    cities: [
      { name: "Gurugram", lat: 28.4595, lon: 77.0266 },
      { name: "Faridabad", lat: 28.4089, lon: 77.3178 },
      { name: "Panipat", lat: 29.3909, lon: 76.9635 },
      { name: "Ambala", lat: 30.3782, lon: 76.7767 },
      { name: "Hisar", lat: 29.1492, lon: 75.7217 }
    ]
  },
  {
    state: "Himachal Pradesh",
    type: "State",
    lat: 31.7836,
    lon: 76.9902,
    capital: "Shimla",
    cities: [
      { name: "Shimla", lat: 31.1048, lon: 77.1734 },
      { name: "Manali", lat: 32.2396, lon: 77.1887 },
      { name: "Dharamshala", lat: 32.2190, lon: 76.3234 },
      { name: "Solan", lat: 30.9045, lon: 77.0967 },
      { name: "Mandi", lat: 31.5892, lon: 76.9182 },
      { name: "Kullu", lat: 31.9579, lon: 77.1095 }
    ]
  },
  {
    state: "Jharkhand",
    type: "State",
    lat: 23.6102,
    lon: 85.2799,
    capital: "Ranchi",
    cities: [
      { name: "Ranchi", lat: 23.3441, lon: 85.3090 },
      { name: "Jamshedpur", lat: 22.8046, lon: 86.2029 },
      { name: "Dhanbad", lat: 23.7957, lon: 86.4304 },
      { name: "Bokaro", lat: 23.6693, lon: 86.1511 },
      { name: "Deoghar", lat: 24.4828, lon: 86.7003 },
      { name: "Hazaribagh", lat: 23.9925, lon: 85.3637 }
    ]
  },
  {
    state: "Karnataka",
    type: "State",
    lat: 15.3173,
    lon: 75.7139,
    capital: "Bengaluru",
    cities: [
      { name: "Bengaluru", lat: 12.9716, lon: 77.5946 },
      { name: "Mysore", lat: 12.2958, lon: 76.6394 },
      { name: "Hubli", lat: 15.3647, lon: 75.1240 },
      { name: "Mangalore", lat: 12.9141, lon: 74.8560 },
      { name: "Belgaum", lat: 15.8497, lon: 74.4977 },
      { name: "Shimoga", lat: 13.9299, lon: 75.5681 },
      { name: "Davanagere", lat: 14.4644, lon: 75.9218 }
    ]
  },
  {
    state: "Kerala",
    type: "State",
    lat: 10.8505,
    lon: 76.2711,
    capital: "Thiruvananthapuram",
    cities: [
      { name: "Thiruvananthapuram", lat: 8.5241, lon: 76.9366 },
      { name: "Kochi", lat: 9.9312, lon: 76.2673 },
      { name: "Kozhikode", lat: 11.2588, lon: 75.7804 },
      { name: "Thrissur", lat: 10.5276, lon: 76.2144 },
      { name: "Alappuzha", lat: 9.4981, lon: 76.3388 },
      { name: "Kollam", lat: 8.8932, lon: 76.6141 },
      { name: "Palakkad", lat: 10.7867, lon: 76.6548 }
    ]
  },
  {
    state: "Madhya Pradesh",
    type: "State",
    lat: 22.9734,
    lon: 78.6569,
    capital: "Bhopal",
    cities: [
      { name: "Bhopal", lat: 23.2599, lon: 77.4126 },
      { name: "Indore", lat: 22.7196, lon: 75.8577 },
      { name: "Jabalpur", lat: 22.1760, lon: 79.9300 },
      { name: "Gwalior", lat: 26.2183, stroke: "", lon: 78.1828 },
      { name: "Ujjain", lat: 23.1760, lon: 75.7885 },
      { name: "Sagar", lat: 23.8388, lon: 78.7378 },
      { name: "Satna", lat: 24.5774, lon: 80.8258 }
    ]
  },
  {
    state: "Maharashtra",
    type: "State",
    lat: 19.7515,
    lon: 75.7139,
    capital: "Mumbai",
    cities: [
      { name: "Mumbai", lat: 19.0760, lon: 72.8777 },
      { name: "Pune", lat: 18.5204, lon: 73.8567 },
      { name: "Nagpur", lat: 21.1458, lon: 79.0882 },
      { name: "Thane", lat: 19.2183, lon: 72.9781 },
      { name: "Nashik", lat: 19.9975, lon: 73.7898 },
      { name: "Aurangabad", lat: 19.8762, lon: 75.3433 },
      { name: "Solapur", lat: 17.6599, lon: 75.9064 },
      { name: "Kolhapur", lat: 16.7050, lon: 74.2433 }
    ]
  },
  {
    state: "Manipur",
    type: "State",
    lat: 24.6637,
    lon: 93.9063,
    capital: "Imphal",
    cities: [
      { name: "Imphal", lat: 24.8170, lon: 93.9368 },
      { name: "Churachandpur", lat: 24.3361, lon: 93.6841 },
      { name: "Ukhrul", lat: 25.1184, lon: 94.4372 },
      { name: "Senapati", lat: 25.2634, lon: 94.0178 }
    ]
  },
  {
    state: "Meghalaya",
    type: "State",
    lat: 25.4670,
    lon: 91.3662,
    capital: "Shillong",
    cities: [
      { name: "Shillong", lat: 25.5788, lon: 91.8933 },
      { name: "Tura", lat: 25.5144, lon: 90.2201 },
      { name: "Jowai", lat: 25.4376, lon: 92.1994 },
      { name: "Nongpoh", lat: 25.9038, lon: 91.8817 },
      { name: "Cherrapunji", lat: 25.2702, lon: 91.7323 }
    ]
  },
  {
    state: "Mizoram",
    type: "State",
    lat: 23.1645,
    lon: 92.9376,
    capital: "Aizawl",
    cities: [
      { name: "Aizawl", lat: 23.7271, lon: 92.7176 },
      { name: "Lunglei", lat: 22.8870, lon: 92.7351 },
      { name: "Champhai", lat: 23.4566, lon: 93.3282 },
      { name: "Kolasib", lat: 24.2238, lon: 92.6784 }
    ]
  },
  {
    state: "Nagaland",
    type: "State",
    lat: 26.1584,
    lon: 94.5624,
    capital: "Kohima",
    cities: [
      { name: "Kohima", lat: 25.6751, lon: 94.1086 },
      { name: "Dimapur", lat: 25.9064, lon: 93.7266 },
      { name: "Mokokchung", lat: 26.3262, lon: 94.5244 },
      { name: "Wokha", lat: 26.0888, lon: 94.2625 }
    ]
  },
  {
    state: "Odisha",
    type: "State",
    lat: 20.9517,
    lon: 85.0985,
    capital: "Bhubaneswar",
    cities: [
      { name: "Bhubaneswar", lat: 20.2961, lon: 85.8245 },
      { name: "Cuttack", lat: 20.4625, lon: 85.8830 },
      { name: "Rourkela", lat: 22.2604, lon: 84.8536 },
      { name: "Berhampur", lat: 19.3150, lon: 84.7941 },
      { name: "Sambalpur", lat: 21.4669, lon: 83.9812 },
      { name: "Puri", lat: 19.8134, lon: 85.8312 }
    ]
  },
  {
    state: "Punjab",
    type: "State",
    lat: 31.1471,
    lon: 75.3412,
    capital: "Chandigarh",
    cities: [
      { name: "Ludhiana", lat: 30.9010, lon: 75.8573 },
      { name: "Amritsar", lat: 31.6340, lon: 74.8723 },
      { name: "Jalandhar", lat: 31.3260, lon: 75.5762 },
      { name: "Patiala", lat: 30.3398, lon: 76.3869 },
      { name: "Bathinda", lat: 30.2110, lon: 74.9455 }
    ]
  },
  {
    state: "Rajasthan",
    type: "State",
    lat: 27.0238,
    lon: 74.2179,
    capital: "Jaipur",
    cities: [
      { name: "Jaipur", lat: 26.9124, lon: 75.7873 },
      { name: "Jodhpur", lat: 26.2389, lon: 73.0243 },
      { name: "Udaipur", lat: 24.5854, lon: 73.7125 },
      { name: "Kota", lat: 25.2138, lon: 75.8648 },
      { name: "Bikaner", lat: 28.0166, lon: 73.3119 },
      { name: "Ajmer", lat: 26.4499, lon: 74.6399 },
      { name: "Jaisalmer", lat: 26.9157, lon: 70.9083 }
    ]
  },
  {
    state: "Sikkim",
    type: "State",
    lat: 27.5330,
    lon: 88.5122,
    capital: "Gangtok",
    cities: [
      { name: "Gangtok", lat: 27.3314, lon: 88.6138 },
      { name: "Namchi", lat: 27.1682, lon: 88.3539 },
      { name: "Geyzing", lat: 27.2882, lon: 88.2618 },
      { name: "Mangan", lat: 27.5029, lon: 88.5298 }
    ]
  },
  {
    state: "Tamil Nadu",
    type: "State",
    lat: 11.1271,
    lon: 78.6569,
    capital: "Chennai",
    cities: [
      { name: "Chennai", lat: 13.0827, lon: 80.2707 },
      { name: "Coimbatore", lat: 11.0168, lon: 76.9558 },
      { name: "Madurai", lat: 9.9252, lon: 78.1198 },
      { name: "Trichy", lat: 10.7905, lon: 78.7047 },
      { name: "Salem", lat: 11.6643, lon: 78.1460 },
      { name: "Tirunelveli", lat: 8.7139, lon: 77.7567 },
      { name: "Ooty", lat: 11.4102, lon: 76.6950 }
    ]
  },
  {
    state: "Telangana",
    type: "State",
    lat: 18.1124,
    lon: 79.0193,
    capital: "Hyderabad",
    cities: [
      { name: "Hyderabad", lat: 17.3850, lon: 78.4867 },
      { name: "Warangal", lat: 17.9689, lon: 79.5941 },
      { name: "Nizamabad", lat: 18.6725, lon: 78.0941 },
      { name: "Karimnagar", lat: 18.4386, lon: 79.1288 },
      { name: "Ramagundam", lat: 18.7601, lon: 79.4674 }
    ]
  },
  {
    state: "Tripura",
    type: "State",
    lat: 23.9408,
    lon: 91.9882,
    capital: "Agartala",
    cities: [
      { name: "Agartala", lat: 23.8315, lon: 91.2868 },
      { name: "Dharmanagar", lat: 24.3667, lon: 92.1667 },
      { name: "Udaipur", lat: 23.5333, lon: 91.4833 },
      { name: "Ambassa", lat: 23.9113, lon: 91.8497 }
    ]
  },
  {
    state: "Uttar Pradesh",
    type: "State",
    lat: 26.8467,
    lon: 80.9462,
    capital: "Lucknow",
    cities: [
      { name: "Lucknow", lat: 26.8467, lon: 80.9462 },
      { name: "Kanpur", lat: 26.4499, lon: 80.3319 },
      { name: "Varanasi", lat: 25.3176, lon: 82.9739 },
      { name: "Agra", lat: 27.1767, lon: 78.0081 },
      { name: "Meerut", lat: 28.9845, lon: 77.7064 },
      { name: "Prayagraj", lat: 25.4358, lon: 81.8463 },
      { name: "Ghaziabad", lat: 28.6692, lon: 77.4538 },
      { name: "Noida", lat: 28.5355, lon: 77.3910 }
    ]
  },
  {
    state: "Uttarakhand",
    type: "State",
    lat: 30.0668,
    lon: 79.0193,
    capital: "Dehradun",
    cities: [
      { name: "Dehradun", lat: 30.3165, lon: 78.0322 },
      { name: "Haridwar", lat: 29.9457, lon: 78.1642 },
      { name: "Rishikesh", lat: 30.0869, lon: 78.2676 },
      { name: "Haldwani", lat: 29.2183, lon: 79.5131 },
      { name: "Roorkee", lat: 29.8543, lon: 77.8880 },
      { name: "Nainital", lat: 29.3803, lon: 79.4636 }
    ]
  },
  {
    state: "West Bengal",
    type: "State",
    lat: 22.9868,
    lon: 87.8550,
    capital: "Kolkata",
    cities: [
      { name: "Kolkata", lat: 22.5726, lon: 88.3639 },
      { name: "Darjeeling", lat: 27.0410, lon: 88.2627 },
      { name: "Siliguri", lat: 26.7271, lon: 88.3953 },
      { name: "Asansol", lat: 23.6889, lon: 86.9749 },
      { name: "Durgapur", lat: 23.5204, lon: 87.3119 },
      { name: "Howrah", lat: 22.5785, lon: 88.3178 },
      { name: "Kharagpur", lat: 22.3302, lon: 87.3237 }
    ]
  },
  
  // Union Territories
  {
    state: "Andaman and Nicobar Islands",
    type: "UT",
    lat: 11.7401,
    lon: 92.6586,
    capital: "Port Blair",
    cities: [
      { name: "Port Blair", lat: 11.6234, lon: 92.7265 },
      { name: "Havelock Island", lat: 12.0344, lon: 92.9790 },
      { name: "Car Nicobar", lat: 9.1764, lon: 92.7661 }
    ]
  },
  {
    state: "Chandigarh",
    type: "UT",
    lat: 30.7333,
    lon: 76.7794,
    capital: "Chandigarh",
    cities: [
      { name: "Chandigarh", lat: 30.7333, lon: 76.7794 }
    ]
  },
  {
    state: "Dadra and Nagar Haveli and Daman and Diu",
    type: "UT",
    lat: 20.3974,
    lon: 72.8328,
    capital: "Daman",
    cities: [
      { name: "Daman", lat: 20.3974, lon: 72.8328 },
      { name: "Silvassa", lat: 20.2766, lon: 73.0022 },
      { name: "Diu", lat: 20.7144, lon: 70.9822 }
    ]
  },
  {
    state: "Delhi",
    type: "UT",
    lat: 28.7041,
    lon: 77.1025,
    capital: "New Delhi",
    cities: [
      { name: "New Delhi", lat: 28.6139, lon: 77.2090 },
      { name: "Dwarka", lat: 28.5921, lon: 77.0460 },
      { name: "Rohini", lat: 28.7447, lon: 77.1188 }
    ]
  },
  {
    state: "Jammu and Kashmir",
    type: "UT",
    lat: 33.7780,
    lon: 76.5762,
    capital: "Srinagar",
    cities: [
      { name: "Srinagar", lat: 34.0837, lon: 74.7973 },
      { name: "Jammu", lat: 32.7266, lon: 74.8570 },
      { name: "Gulmarg", lat: 34.0494, lon: 74.3811 },
      { name: "Pahalgam", lat: 34.0161, lon: 75.3150 },
      { name: "Anantnag", lat: 33.7297, lon: 75.1498 }
    ]
  },
  {
    state: "Ladakh",
    type: "UT",
    lat: 34.1526,
    lon: 77.5771,
    capital: "Leh",
    cities: [
      { name: "Leh", lat: 34.1526, lon: 77.5771 },
      { name: "Kargil", lat: 34.5539, lon: 76.1349 },
      { name: "Nubra Valley", lat: 34.5828, lon: 77.5673 }
    ]
  },
  {
    state: "Lakshadweep",
    type: "UT",
    lat: 10.5667,
    lon: 72.6370,
    capital: "Kavaratti",
    cities: [
      { name: "Kavaratti", lat: 10.5667, lon: 72.6370 },
      { name: "Minicoy", lat: 8.2798, lon: 73.0487 },
      { name: "Agatti", lat: 10.8539, lon: 72.1915 }
    ]
  },
  {
    state: "Puducherry",
    type: "UT",
    lat: 11.9416,
    lon: 79.8083,
    capital: "Pondicherry",
    cities: [
      { name: "Pondicherry", lat: 11.9416, lon: 79.8083 },
      { name: "Karaikal", lat: 10.9254, lon: 79.8380 },
      { name: "Mahe", lat: 11.7002, lon: 75.5342 },
      { name: "Yanam", lat: 16.7333, lon: 82.2167 }
    ]
  }
];
